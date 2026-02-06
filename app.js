// Глобальные переменные
let map;
let stationMarkers = [];
let unitMarkers = [];
let currentZoom = 3;
let selectedStation = null;
let selectedUnit = null;
let activeFilters = {
    countries: [],
    statuses: [],
    types: []
};
let isDarkTheme = true;
let allStationsData = [];
let searchTimeout = null;
let tooltipTimeout = null;

// Функции для работы со статусами
function getStatusConfig(status) {
    return statusConfig[status] || statusConfig.operational;
}

function getStatusText(status) {
    return getStatusConfig(status).name;
}

function getStatusGradient(status) {
    return getStatusConfig(status).gradient;
}

function getPinColor(status) {
    return getStatusConfig(status).pinColor;
}

// Функции для работы с типами реакторов
function getReactorType(type) {
    return reactorTypes[type] || reactorTypes.vver;
}

function getReactorIcon(type) {
    return getReactorType(type).icon;
}

function getReactorShapeClass(type) {
    const shape = getReactorType(type).shape;
    switch(shape) {
        case 'circle': return 'unit-vver';
        case 'square': return 'unit-rbmk';
        case 'hexagon': return 'unit-bwr';
        case 'pentagon': return 'unit-fast';
        default: return 'unit-vver';
    }
}

function getReactorColor(type) {
    return getReactorType(type).color;
}

// Инициализация карты
function initMap() {
    map = L.map('map', {
        center: [50, 30],
        zoom: 3,
        minZoom: 2,
        zoomControl: false,
        attributionControl: false,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true
    });
    
    // Слой схемы (светлая карта)
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CARTO',
        maxZoom: 19
    });
    
    // Слой спутниковых снимков
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19
    });
    
    // По умолчанию в тёмной теме показываем СХЕМУ
    streetLayer.addTo(map);
    document.getElementById('street-layer').classList.add('active');
    document.getElementById('satellite-layer').classList.remove('active');
    
    // Управление слоями
    document.getElementById('street-layer').addEventListener('click', function() {
        map.removeLayer(satelliteLayer);
        streetLayer.addTo(map);
        document.getElementById('street-layer').classList.add('active');
        document.getElementById('satellite-layer').classList.remove('active');
    });
    
    document.getElementById('satellite-layer').addEventListener('click', function() {
        map.removeLayer(streetLayer);
        satelliteLayer.addTo(map);
        document.getElementById('satellite-layer').classList.add('active');
        document.getElementById('street-layer').classList.remove('active');
    });
    
    // Переключение темы
    document.getElementById('theme-toggle').addEventListener('click', function() {
        const icon = this.querySelector('i');
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        updateStationMarkers();
    });
    
    // Слушатель изменения масштаба
    map.on('zoomend', function() {
        currentZoom = map.getZoom();
        updateUnitMarkersVisibility();
    });
    
    // Добавляем кастомный контрол zoom
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    
    // Инициализация маркеров станций
    initStationMarkers();
    
    // Инициализация фильтров
    initFilters();
    
    // Инициализация поиска
    initSearch();
    
    // Инициализация подсказки
    initTooltip();
}

// Создание HTML для пина станции (СТАТИЧНЫЙ АТОМ)
function createStationPinHTML(status) {
    const pinColor = getPinColor(status);
    
    return `
        <div class="station-pin">
            <div class="pin-body" style="--pin-color: ${pinColor};">
                <div class="atom">
                    <div class="atom-core"></div>
                    <div class="electron electron-1"></div>
                    <div class="electron electron-2"></div>
                    <div class="electron electron-3"></div>
                </div>
            </div>
            <div class="pin-stem" style="background: ${pinColor};"></div>
            <div class="pin-shadow"></div>
        </div>
    `;
}

// Создание маркеров для станций
function initStationMarkers() {
    updateStationMarkers();
}

function updateStationMarkers() {
    stationMarkers.forEach(item => map.removeLayer(item.marker));
    stationMarkers = [];
    
    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        
        const markerHtml = createStationPinHTML(station.status);
        
        const icon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: [48, 48],
            iconAnchor: [24, 48],
            popupAnchor: [0, -48]
        });
        
        const marker = L.marker(station.coords, { icon: icon })
            .addTo(map)
            .bindTooltip(`
                <div style="font-weight:bold; font-size:14px;">${station.name}</div>
                <div>${station.country.flag} ${station.country.name}</div>
                <div>${getStatusText(station.status)}</div>
                <div>${station.units.length} энергоблоков</div>
            `, {
                direction: 'top',
                offset: [0, -20],
                className: 'custom-tooltip',
                sticky: true
            });
        
        marker.on('click', function() {
            selectStation(station);
        });
        
        stationMarkers.push({
            stationId: station.id,
            marker: marker
        });
    });
}

// Проверка видимости станции по фильтрам
function isStationVisible(station) {
    if (activeFilters.countries.length > 0 && !activeFilters.countries.includes(station.country.name)) {
        return false;
    }
    
    if (activeFilters.statuses.length > 0 && !activeFilters.statuses.includes(station.status)) {
        return false;
    }
    
    if (activeFilters.types.length > 0) {
        const stationTypes = station.units.map(unit => unit.type);
        const hasMatchingType = stationTypes.some(type => activeFilters.types.includes(type));
        if (!hasMatchingType) {
            return false;
        }
    }
    
    return true;
}

// Показать/скрыть маркеры энергоблоков
function updateUnitMarkersVisibility() {
    unitMarkers.forEach(item => map.removeLayer(item.marker));
    unitMarkers = [];
    
    if (currentZoom >= 6) {
        const stationsToShow = selectedStation ? [selectedStation] : allStationsData;
        
        stationsToShow.forEach(station => {
            if (!isStationVisible(station)) return;
            
            station.units.forEach((unit, index) => {
                const offset = 0.025;
                const angle = (index * (360 / station.units.length)) * (Math.PI / 180);
                const unitCoords = [
                    station.coords[0] + Math.sin(angle) * offset,
                    station.coords[1] + Math.cos(angle) * offset
                ];
                
                const statusConfig = getStatusConfig(unit.status);
                const reactorType = getReactorType(unit.type);
                const shapeClass = getReactorShapeClass(unit.type);
                
                const markerHtml = `
                    <div class="unit-marker ${shapeClass}" style="
                        background: ${statusConfig.gradient};
                        border-color: ${reactorType.color};
                        font-size: 13px;
                    ">
                        ${unit.model.split('-')[0]}
                    </div>
                `;
                
                const icon = L.divIcon({
                    html: markerHtml,
                    className: 'custom-marker',
                    iconSize: [52, 52],
                    iconAnchor: [26, 26],
                    popupAnchor: [0, -26]
                });
                
                const marker = L.marker(unitCoords, { icon: icon })
                    .addTo(map)
                    .bindTooltip(`
                        <div style="font-weight:bold;">${unit.name}</div>
                        <div>${unit.model}</div>
                        <div>${statusConfig.name}</div>
                        <div>${unit.capacity} МВт</div>
                        <div>Год пуска: ${unit.startYear}</div>
                        ${unit.endYear ? `<div>Год остановки: ${unit.endYear}</div>` : ''}
                    `, {
                        direction: 'right',
                        offset: [10, 0],
                        className: 'custom-tooltip',
                        sticky: true
                    });
                
                marker.on('click', function(e) {
                    if (e.originalEvent) e.originalEvent.stopPropagation();
                    selectStation(station);
                    selectUnit(unit);
                });
                
                unitMarkers.push({
                    unitId: unit.id,
                    stationId: station.id,
                    marker: marker
                });
            });
        });
    }
}

// Выбор станции
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    const sidepanel = document.getElementById('sidepanel');
    sidepanel.classList.add('open');
    sidepanel.scrollTop = 0;
    
    document.getElementById('panel-station-name').textContent = station.name;
    document.getElementById('total-capacity').textContent = station.totalCapacity.toLocaleString();
    document.getElementById('units-count').textContent = station.units.length;
    document.getElementById('panel-country').textContent = station.country.name + ' ' + station.country.flag;
    document.getElementById('panel-year').textContent = station.startYear;
    
    const cleanedDescription = station.overview.replace(/\[citation:\d+\]/g, '');
    document.getElementById('overview-description').textContent = cleanedDescription;
    
    let locationText = station.location || "Информация о ближайшем населённом пункте отсутствует";
    document.getElementById('location-text').textContent = locationText;
    
    const statusBadge = document.getElementById('panel-status-badge');
    const statusConfig = getStatusConfig(station.status);
    statusBadge.textContent = statusConfig.name;
    statusBadge.style.background = statusConfig.gradient;
    statusBadge.style.color = statusConfig.textColor;
    
    updateUnitsTab(station);
    updateHistoryTab(station);
    updateFactsTab(station);
    
    switchTab('overview');
    updateUnitMarkersVisibility();
    
    // Плавное перемещение к выбранной станции
    map.flyTo(station.coords, Math.max(currentZoom, 7), {
        duration: 1.2,
        easeLinearity: 0.25,
        animate: true
    });
    
    hideTooltip();
    
    // На мобильных устройствах скрываем фильтры при открытии панели
    if (window.innerWidth <= 768) {
        document.getElementById('filters-panel').classList.remove('open');
    }
}

// Выбор энергоблока
function selectUnit(unit) {
    selectedUnit = unit;
    
    switchTab('units');
    
    document.querySelectorAll('.unit-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.unitId === unit.id) {
            card.classList.add('selected');
            // Плавная прокрутка к выбранному элементу
            const container = document.getElementById('units-list');
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (cardRect.top < containerRect.top || cardRect.bottom > containerRect.bottom) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Обновление вкладки "Энергоблоки"
function updateUnitsTab(station) {
    const unitsList = document.getElementById('units-list');
    const totalUnits = document.getElementById('total-units');
    const operationalUnits = document.getElementById('operational-units');
    
    unitsList.innerHTML = '';
    
    let operationalCount = 0;
    
    station.units.forEach(unit => {
        if (unit.status === 'operational') operationalCount++;
        
        const statusConfig = getStatusConfig(unit.status);
        const reactorType = getReactorType(unit.type);
        const shapeClass = getReactorShapeClass(unit.type);
        
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card';
        unitCard.dataset.unitId = unit.id;
        unitCard.style.setProperty('--unit-color', reactorType.color);
        
        const cleanedDetails = unit.details ? unit.details.replace(/\[citation:\d+\]/g, '') : '';
        
        unitCard.innerHTML = `
            <div class="unit-header">
                <div class="unit-name">
                    <span class="unit-shape ${shapeClass}"></span>
                    ${unit.name}
                </div>
                <div class="unit-type-badge">${unit.model}</div>
            </div>
            
            <div class="unit-years">
                <i class="fas fa-play-circle"></i>
                <span>Год пуска: <strong>${unit.startYear}</strong></span>
                ${unit.endYear ? `
                    <i class="fas fa-stop-circle"></i>
                    <span>Год остановки: <strong>${unit.endYear}</strong></span>
                ` : ''}
            </div>
            
            <div class="unit-details">
                <div class="unit-detail">
                    <i class="fas fa-bolt"></i>
                    <span>${unit.capacity} МВт</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-cube"></i>
                    <span>${reactorType.name}</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-info-circle"></i>
                    <span style="color: ${statusConfig.textColor}; background: ${statusConfig.gradient}; padding: 2px 8px; border-radius: 10px; font-size: 11px;">
                        ${statusConfig.name}
                    </span>
                </div>
            </div>
            
            ${cleanedDetails ? `
                <div class="unit-description" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color); font-size: 13px; color: var(--text-secondary);">
                    ${cleanedDetails}
                </div>
            ` : ''}
        `;
        
        unitCard.addEventListener('click', () => {
            selectUnit(unit);
        });
        
        unitsList.appendChild(unitCard);
    });
    
    totalUnits.textContent = station.units.length;
    operationalUnits.textContent = operationalCount;
}

// Обновление вкладки "История"
function updateHistoryTab(station) {
    const timeline = document.getElementById('history-timeline');
    timeline.innerHTML = '';
    
    if (!station.history || station.history.length === 0) {
        timeline.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-history"></i>
                <span>Историческая информация отсутствует</span>
            </div>
        `;
        return;
    }
    
    const sortedHistory = [...station.history].sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearA - yearB;
    });
    
    sortedHistory.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'history-event';
        
        const cleanedTitle = (event.title || event.event).replace(/\[citation:\d+\]/g, '');
        const cleanedDescription = event.description ? event.description.replace(/\[citation:\d+\]/g, '') : '';
        
        eventElement.innerHTML = `
            <div class="event-year">
                <span class="year-highlight">${event.year}</span>
                <span class="event-title-highlight">${cleanedTitle}</span>
            </div>
            ${cleanedDescription ? `<div class="event-description">${cleanedDescription}</div>` : ''}
        `;
        
        timeline.appendChild(eventElement);
    });
}

// Обновление вкладки "Факты"
function updateFactsTab(station) {
    const factsList = document.getElementById('facts-list');
    factsList.innerHTML = '';
    
    if (!station.facts || station.facts.length === 0) {
        factsList.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-info-circle"></i>
                <span>Интересные факты отсутствуют</span>
            </div>
        `;
        return;
    }
    
    station.facts.forEach((fact, index) => {
        const factElement = document.createElement('div');
        factElement.className = 'fact-item';
        
        const cleanedFact = fact.replace(/\[citation:\d+\]/g, '');
        
        factElement.innerHTML = `
            <div class="fact-icon-atom">
                <div class="mini-atom-core"></div>
                <div class="mini-electron"></div>
            </div>
            <div class="fact-text">${cleanedFact}</div>
        `;
        
        factsList.appendChild(factElement);
    });
}

// Переключение вкладок
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    const activePane = document.getElementById(`${tabName}-tab`);
    
    if (activeTab && activePane) {
        activeTab.classList.add('active');
        activePane.classList.add('active');
        activePane.scrollTop = 0;
    }
}

// Инициализация фильтров
function initFilters() {
    const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
    const countryFiltersContainer = document.getElementById('country-filters');
    
    countryFiltersContainer.innerHTML = '';
    
    const scrollContainer = document.createElement('div');
    scrollContainer.style.maxHeight = '200px';
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.paddingRight = '5px';
    
    countryFiltersContainer.appendChild(scrollContainer);
    
    countries.forEach(country => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = country;
        option.dataset.country = country;
        
        option.addEventListener('click', function() {
            this.classList.toggle('active');
            updateFilters();
        });
        
        scrollContainer.appendChild(option);
    });
    
    const statuses = Object.keys(statusConfig);
    const statusFiltersContainer = document.getElementById('status-filters');
    
    statuses.forEach(statusId => {
        const status = statusConfig[statusId];
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = status.name;
        option.dataset.status = statusId;
        
        option.addEventListener('click', function() {
            this.classList.toggle('active');
            updateFilters();
        });
        
        statusFiltersContainer.appendChild(option);
    });
    
    const types = Object.keys(reactorTypes);
    const typeFiltersContainer = document.getElementById('type-filters');
    
    types.forEach(typeId => {
        const type = reactorTypes[typeId];
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = type.name;
        option.dataset.type = typeId;
        
        option.addEventListener('click', function() {
            this.classList.toggle('active');
            updateFilters();
        });
        
        typeFiltersContainer.appendChild(option);
    });
    
    document.getElementById('reset-filters').addEventListener('click', function() {
        document.querySelectorAll('.filter-option.active').forEach(option => {
            option.classList.remove('active');
        });
        
        updateFilters();
    });
    
    document.getElementById('toggle-filters-btn').addEventListener('click', function() {
        const filtersPanel = document.getElementById('filters-panel');
        filtersPanel.classList.toggle('open');
        
        if (window.innerWidth <= 768 && filtersPanel.classList.contains('open') && selectedStation) {
            document.getElementById('sidepanel').classList.remove('open');
        }
    });
    
    // Закрытие фильтров при клике вне их области
    document.addEventListener('click', function(e) {
        const filtersPanel = document.getElementById('filters-panel');
        const toggleBtn = document.getElementById('toggle-filters-btn');
        
        if (filtersPanel.classList.contains('open') && 
            !filtersPanel.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            filtersPanel.classList.remove('open');
        }
    });
}

// Обновление фильтров
function updateFilters() {
    activeFilters.countries = Array.from(document.querySelectorAll('#country-filters .filter-option.active'))
        .map(option => option.dataset.country);
    
    activeFilters.statuses = Array.from(document.querySelectorAll('#status-filters .filter-option.active'))
        .map(option => option.dataset.status);
    
    activeFilters.types = Array.from(document.querySelectorAll('#type-filters .filter-option.active'))
        .map(option => option.dataset.type);
    
    updateStationMarkers();
    updateUnitMarkersVisibility();
    
    if (selectedStation && !isStationVisible(selectedStation)) {
        document.getElementById('sidepanel').classList.remove('open');
        selectedStation = null;
        selectedUnit = null;
    }
}

// Инициализация поиска
function initSearch() {
    const searchInput = document.getElementById('station-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            const results = allStationsData.filter(station => {
                return station.name.toLowerCase().includes(query) || 
                       station.locationCity?.toLowerCase().includes(query);
            });
            
            if (results.length > 0) {
                results.forEach(station => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <div class="search-result-name">${station.name}</div>
                        <div class="search-result-country">${station.country.flag} ${station.country.name}</div>
                    `;
                    
                    resultItem.addEventListener('click', () => {
                        selectStation(station);
                        searchInput.value = '';
                        searchResults.innerHTML = '';
                        searchResults.style.display = 'none';
                        
                        // На мобильных скрываем клавиатуру после выбора
                        if (window.innerWidth <= 768) {
                            searchInput.blur();
                        }
                    });
                    
                    searchResults.appendChild(resultItem);
                });
                
                searchResults.style.display = 'block';
            }
        }, 300);
    });
    
    // Закрываем результаты при клике вне поля поиска
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // На мобильных устройствах добавляем кнопку очистки
    if ('ontouchstart' in window) {
        const clearBtn = document.createElement('button');
        clearBtn.innerHTML = '<i class="fas fa-times"></i>';
        clearBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-tertiary);
            font-size: 16px;
            cursor: pointer;
            display: none;
            z-index: 3;
        `;
        
        searchInput.parentNode.appendChild(clearBtn);
        
        searchInput.addEventListener('input', function() {
            clearBtn.style.display = this.value ? 'block' : 'none';
        });
        
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            clearBtn.style.display = 'none';
            searchInput.focus();
        });
    }
}

// Инициализация подсказки
function initTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    const closeButton = document.getElementById('close-tooltip');
    
    // Показываем подсказку только на десктопах
    if (window.innerWidth > 768) {
        setTimeout(() => {
            tooltip.style.display = 'flex';
        }, 2000);
        
        tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 12000);
    }
    
    closeButton.addEventListener('click', () => {
        hideTooltip();
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
    });
    
    map.on('click', () => {
        hideTooltip();
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
    });
}

// Скрытие подсказки
function hideTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    tooltip.style.display = 'none';
}

// Инициализация часов (только смена цифр)
function initClock() {
    function updateClock() {
        const now = new Date();
        
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}/${month}/${year}`;
        
        document.querySelector('.hours').textContent = hours;
        document.querySelector('.minutes').textContent = minutes;
        document.querySelector('.seconds').textContent = seconds;
        document.getElementById('current-date').textContent = dateStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Обработчики событий
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        switchTab(tabName);
    });
});

// Закрытие панели
document.getElementById('close-panel').addEventListener('click', function() {
    document.getElementById('sidepanel').classList.remove('open');
    selectedStation = null;
    selectedUnit = null;
    updateUnitMarkersVisibility();
});

// Переключение режимов
document.getElementById('map-mode').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('stats-mode').classList.remove('active');
});

document.getElementById('stats-mode').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('map-mode').classList.remove('active');
    window.location.href = 'statistics.html';
});

// Закрытие панели при клике вне ее на мобильных
if (window.innerWidth <= 768) {
    document.addEventListener('click', function(e) {
        const sidepanel = document.getElementById('sidepanel');
        const panelHeader = document.querySelector('.panel-header');
        
        if (sidepanel.classList.contains('open') && 
            !sidepanel.contains(e.target) && 
            !panelHeader.contains(e.target)) {
            sidepanel.classList.remove('open');
            selectedStation = null;
            selectedUnit = null;
            updateUnitMarkersVisibility();
        }
    });
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    allStationsData = stationsData;
    
    allStationsData.forEach(station => {
        switch(station.id) {
            case "KURSK": 
                station.locationCity = "Курчатов";
                station.location = "г. Курчатов, Курская область, Россия";
                break;
            case "KALININ": 
                station.locationCity = "Удомля";
                station.location = "г. Удомля, Тверская область, Россия";
                break;
            case "ZAPOROZHYE": 
                station.locationCity = "Энергодар";
                station.location = "г. Энергодар, Запорожская область, Украина";
                break;
            case "OLKILUOTO": 
                station.locationCity = "Олкилуото";
                station.location = "о. Олкилуото, Ботнический залив, Финляндия";
                break;
            case "FUKUSHIMA": 
                station.locationCity = "Футаба";
                station.location = "г. Футаба, префектура Фукусима, Япония";
                break;
            case "BELOYARSK": 
                station.locationCity = "Заречный";
                station.location = "г. Заречный, Свердловская область, Россия";
                break;
            case "CHERNOBYL": 
                station.locationCity = "Припять";
                station.location = "г. Припять, Киевская область, Украина";
                break;
            case "AKKUYU": 
                station.locationCity = "Мерсин";
                station.location = "провинция Мерсин, Средиземноморское побережье, Турция";
                break;
            case "LNPP": 
                station.locationCity = "Сосновый Бор";
                station.location = "г. Сосновый Бор, Ленинградская область, Россия";
                break;
            case "IGNALINA": 
                station.locationCity = "Висагинас";
                station.location = "г. Висагинас, Игналинский район, Литва";
                break;
            default:
                if (!station.location) {
                    station.location = "Информация о ближайшем населённом пункте отсутствует";
                }
        }
        
        if (station.overview) {
            station.overview = station.overview.replace(/\[citation:\d+\]/g, '');
        }
        
        if (station.facts) {
            station.facts = station.facts.map(fact => fact.replace(/\[citation:\d+\]/g, ''));
        }
        
        if (station.history) {
            station.history = station.history.map(event => {
                if (event.title) event.title = event.title.replace(/\[citation:\d+\]/g, '');
                if (event.event) event.event = event.event.replace(/\[citation:\d+\]/g, '');
                if (event.description) event.description = event.description.replace(/\[citation:\d+\]/g, '');
                return event;
            });
        }
        
        if (station.units) {
            station.units = station.units.map(unit => {
                if (unit.details) {
                    unit.details = unit.details.replace(/\[citation:\d+\]/g, '');
                }
                return unit;
            });
        }
    });
    
    initMap();
    initClock();
    
    // Оптимизация для мобильных устройств
    if ('ontouchstart' in window) {
        // Улучшаем обработку касаний
        document.documentElement.style.touchAction = 'manipulation';
        
        // Предотвращаем масштабирование при двойном тапе
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Скрываем адресную строку на мобильных устройствах
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 1);
        }, 0);
    });
});
