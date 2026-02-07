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
let isMobile = false;

// Проверка мобильного устройства
function checkMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Оптимизация: throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Функции для работы со статусами
function getStatusConfig(status) {
    return statusConfig[status] || statusConfig.operational;
}

function getStatusText(status) {
    return getStatusConfig(status).name;
}

function getPinColor(status) {
    return getStatusConfig(status).pinColor;
}

// Функции для работы с типами реакторов
function getReactorType(type) {
    return reactorTypes[type] || reactorTypes.vver;
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
    isMobile = checkMobile();
    
    // Оптимизированные настройки для мобильных
    const mapConfig = {
        center: [50, 30],
        zoom: isMobile ? 2 : 3,
        minZoom: isMobile ? 1 : 2,
        maxZoom: 18,
        zoomControl: true,
        zoomControlOptions: {
            position: isMobile ? 'bottomright' : 'topright'
        },
        attributionControl: false,
        touchZoom: true,
        scrollWheelZoom: !isMobile,
        doubleClickZoom: true,
        boxZoom: !isMobile,
        keyboard: true,
        dragging: true,
        tap: false, // Отключаем для лучшей производительности на мобильных
        tapTolerance: 15
    };
    
    map = L.map('map', mapConfig);
    
    // Оптимизированные тайлы
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '© CARTO',
        maxZoom: 19,
        subdomains: 'abcd'
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19
    });
    
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
    map.on('zoomend', throttle(function() {
        currentZoom = map.getZoom();
        updateUnitMarkersVisibility();
    }, 250));
    
    // Инициализация маркеров станций
    initStationMarkers();
    
    // Инициализация фильтров
    initFilters();
    
    // Инициализация поиска
    initSearch();
    
    // Подсказка только на десктопе
    if (!isMobile) {
        setTimeout(() => {
            const tooltip = document.getElementById('floating-tooltip');
            if (tooltip) tooltip.style.display = 'flex';
            
            setTimeout(() => {
                if (tooltip) tooltip.style.display = 'none';
            }, 8000);
        }, 1500);
        
        document.getElementById('close-tooltip').addEventListener('click', function() {
            document.getElementById('floating-tooltip').style.display = 'none';
        });
    } else {
        document.getElementById('floating-tooltip').style.display = 'none';
    }
    
    // Оптимизация: batch rendering маркеров
    map.on('moveend', throttle(function() {
        if (isMobile) {
            updateStationMarkers();
        }
    }, 500));
}

// Создание HTML для пина станции (полностью статичный)
function createStationPinHTML(status) {
    const pinColor = getPinColor(status);
    
    return `
        <div class="station-pin">
            <div class="pin-body" style="background: ${pinColor};">
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

// Оптимизированное создание маркеров
function initStationMarkers() {
    updateStationMarkers();
}

function updateStationMarkers() {
    // Быстрая очистка
    if (stationMarkers.length > 0) {
        stationMarkers.forEach(item => map.removeLayer(item.marker));
        stationMarkers = [];
    }
    
    // Фильтрация и создание маркеров
    const visibleStations = allStationsData.filter(station => isStationVisible(station));
    
    // Batch processing для производительности
    const processBatch = (stations) => {
        stations.forEach(station => {
            createStationMarker(station);
        });
    };
    
    // Если много станций, разбиваем на батчи
    if (visibleStations.length > 30) {
        const batchSize = isMobile ? 10 : 20;
        for (let i = 0; i < visibleStations.length; i += batchSize) {
            const batch = visibleStations.slice(i, i + batchSize);
            setTimeout(() => processBatch(batch), 0);
        }
    } else {
        processBatch(visibleStations);
    }
}

function createStationMarker(station) {
    const markerHtml = createStationPinHTML(station.status);
    
    const iconSize = isMobile ? [52, 52] : [48, 48];
    const iconAnchor = isMobile ? [26, 52] : [24, 48];
    
    const icon = L.divIcon({
        html: markerHtml,
        className: 'custom-marker',
        iconSize: iconSize,
        iconAnchor: iconAnchor
    });
    
    const marker = L.marker(station.coords, { icon: icon })
        .addTo(map)
        .bindTooltip(`
            <div style="font-weight:bold; font-size:13px;">${station.name}</div>
            <div>${station.country.flag} ${station.country.name}</div>
            <div>${getStatusText(station.status)}</div>
            <div>${station.units.length} блоков</div>
        `, {
            direction: 'top',
            offset: [0, -20],
            className: 'custom-tooltip',
            opacity: 0.9
        });
    
    // Оптимизированный обработчик клика
    const clickHandler = isMobile ? 
        function(e) {
            e.originalEvent.preventDefault();
            selectStation(station);
            map.flyTo(station.coords, Math.max(currentZoom, 6), {
                duration: 0.5
            });
        } : 
        function() {
            selectStation(station);
        };
    
    marker.on('click', clickHandler);
    
    stationMarkers.push({
        stationId: station.id,
        marker: marker
    });
}

// Проверка видимости станции
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
    // Быстрая очистка
    if (unitMarkers.length > 0) {
        unitMarkers.forEach(item => map.removeLayer(item.marker));
        unitMarkers = [];
    }
    
    const zoomThreshold = isMobile ? 7 : 6;
    if (currentZoom < zoomThreshold) return;
    
    const stationsToShow = selectedStation ? [selectedStation] : allStationsData;
    
    stationsToShow.forEach(station => {
        if (!isStationVisible(station)) return;
        
        station.units.forEach((unit, index) => {
            const offset = isMobile ? 0.035 : 0.025;
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
                    font-size: ${isMobile ? '10px' : '12px'};
                ">
                    ${unit.model.split('-')[0]}
                </div>
            `;
            
            const iconSize = isMobile ? [44, 44] : [48, 48];
            const iconAnchor = isMobile ? [22, 22] : [24, 24];
            
            const icon = L.divIcon({
                html: markerHtml,
                className: 'custom-marker',
                iconSize: iconSize,
                iconAnchor: iconAnchor
            });
            
            const marker = L.marker(unitCoords, { icon: icon })
                .addTo(map)
                .bindTooltip(`
                    <div style="font-weight:bold;">${unit.name}</div>
                    <div>${unit.model}</div>
                    <div>${statusConfig.name}</div>
                    <div>${unit.capacity} МВт</div>
                `, {
                    direction: 'right',
                    offset: [8, 0],
                    className: 'custom-tooltip'
                });
            
            marker.on('click', function(e) {
                e.originalEvent.stopPropagation();
                selectStation(station);
                selectUnit(unit);
                
                if (isMobile) {
                    map.flyTo(unitCoords, Math.max(currentZoom, 7), {
                        duration: 0.5
                    });
                }
            });
            
            unitMarkers.push({
                unitId: unit.id,
                stationId: station.id,
                marker: marker
            });
        });
    });
}

// Выбор станции
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    // Открываем панель
    const sidepanel = document.getElementById('sidepanel');
    sidepanel.classList.add('open');
    
    // Заполняем информацию
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
    
    // Заполняем вкладки
    updateUnitsTab(station);
    updateHistoryTab(station);
    updateFactsTab(station);
    
    switchTab('overview');
    
    // Обновляем маркеры
    updateUnitMarkersVisibility();
    
    // Центрируем карту
    const targetZoom = isMobile ? Math.max(currentZoom, 6) : Math.max(currentZoom, 7);
    map.flyTo(station.coords, targetZoom, {
        duration: isMobile ? 0.5 : 1
    });
    
    // Скрываем подсказку
    if (!isMobile) {
        document.getElementById('floating-tooltip').style.display = 'none';
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
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
                <span>Пуск: <strong>${unit.startYear}</strong></span>
                ${unit.endYear ? `
                    <i class="fas fa-stop-circle"></i>
                    <span>Останов: <strong>${unit.endYear}</strong></span>
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
                    <span style="color: ${statusConfig.textColor}; background: ${statusConfig.gradient}; padding: 2px 6px; border-radius: 8px; font-size: 10px;">
                        ${statusConfig.name}
                    </span>
                </div>
            </div>
            
            ${cleanedDetails ? `
                <div class="unit-description">
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
            <div style="text-align:center; padding:20px; color:var(--text-tertiary);">
                <i class="fas fa-history"></i>
                <div style="margin-top:8px; font-size:13px;">Историческая информация отсутствует</div>
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
        eventElement.style.marginBottom = '15px';
        
        const cleanedTitle = (event.title || event.event).replace(/\[citation:\d+\]/g, '');
        const cleanedDescription = event.description ? event.description.replace(/\[citation:\d+\]/g, '') : '';
        
        eventElement.innerHTML = `
            <div style="display:flex; align-items:baseline; margin-bottom:5px;">
                <span style="color:var(--accent-blue); font-weight:bold; font-size:14px; margin-right:10px;">
                    ${event.year}
                </span>
                <span style="font-weight:600; color:var(--text-primary); font-size:13px;">
                    ${cleanedTitle}
                </span>
            </div>
            ${cleanedDescription ? `
                <div style="color:var(--text-secondary); font-size:12px; line-height:1.4;">
                    ${cleanedDescription}
                </div>
            ` : ''}
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
            <div style="text-align:center; padding:20px; color:var(--text-tertiary);">
                <i class="fas fa-info-circle"></i>
                <div style="margin-top:8px; font-size:13px;">Интересные факты отсутствуют</div>
            </div>
        `;
        return;
    }
    
    station.facts.forEach((fact) => {
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
    
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Инициализация фильтров
function initFilters() {
    const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
    const countryFiltersContainer = document.getElementById('country-filters');
    
    countryFiltersContainer.innerHTML = '';
    
    const scrollContainer = document.createElement('div');
    scrollContainer.style.maxHeight = '180px';
    scrollContainer.style.overflowY = 'auto';
    
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
        document.getElementById('filters-panel').classList.toggle('open');
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
                        
                        if (isMobile) {
                            document.getElementById('filters-panel').classList.remove('open');
                        }
                    });
                    
                    searchResults.appendChild(resultItem);
                });
                
                searchResults.style.display = 'block';
            }
        }, 300);
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Инициализация часов
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

// Обработчик изменения размера окна
window.addEventListener('resize', throttle(function() {
    isMobile = checkMobile();
    
    if (isMobile) {
        document.getElementById('floating-tooltip').style.display = 'none';
    }
    
    // Пересоздаем маркеры при изменении размера
    updateStationMarkers();
    updateUnitMarkersVisibility();
}, 250));

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    allStationsData = stationsData;
    
    // Оптимизация: подготовка данных
    allStationsData.forEach(station => {
        // Заполняем locationCity и location
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
        
        // Удаляем цитаты
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
    
    // Оптимизация: отложенная загрузка
    setTimeout(() => {
        updateStationMarkers();
    }, 100);
});
