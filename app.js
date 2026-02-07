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
let zoomUpdateTimeout = null;
let resizeTimeout = null;
let isMobile = false;
let clickTimeout = null;

// Определение мобильного устройства
function checkMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Оптимизированные функции (кешируем часто используемые элементы)
const statusCache = {};
const getStatusConfig = (status) => {
    if (!statusCache[status]) {
        statusCache[status] = statusConfig[status] || statusConfig.operational;
    }
    return statusCache[status];
};

const getStatusText = (status) => getStatusConfig(status).name;
const getStatusGradient = (status) => getStatusConfig(status).gradient;
const getPinColor = (status) => getStatusConfig(status).pinColor;

const reactorCache = {};
const getReactorType = (type) => {
    if (!reactorCache[type]) {
        reactorCache[type] = reactorTypes[type] || reactorTypes.vver;
    }
    return reactorCache[type];
};

const getReactorColor = (type) => getReactorType(type).color;

// Статичные функции для форм реакторов
const reactorShapes = {
    'vver': 'unit-vver',
    'pwr': 'unit-vver',
    'rbmk': 'unit-rbmk',
    'graphite': 'unit-rbmk',
    'bwr': 'unit-bwr',
    'fast': 'unit-fast'
};

function getReactorShapeClass(type) {
    return reactorShapes[type] || 'unit-vver';
}

// Инициализация карты с максимальной оптимизацией
function initMap() {
    checkMobile();
    
    // Оптимизированные настройки карты
    map = L.map('map', {
        center: [50, 30],
        zoom: isMobile ? 2 : 3,
        minZoom: 1,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true, // Используем Canvas для лучшей производительности
        fadeAnimation: false, // Отключаем анимации
        markerZoomAnimation: false,
        touchZoom: true,
        scrollWheelZoom: !isMobile,
        tap: !L.Browser.mobile,
        tapTolerance: 15
    });
    
    // Слой схемы
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CARTO',
        maxZoom: 19,
        minZoom: 1
    });
    
    // Слой спутниковых снимков
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
        minZoom: 1
    });
    
    // По умолчанию схема
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
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        updateStationMarkers();
    });
    
    // Оптимизированный слушатель изменения масштаба
    map.on('zoomend', function() {
        clearTimeout(zoomUpdateTimeout);
        zoomUpdateTimeout = setTimeout(() => {
            currentZoom = map.getZoom();
            updateUnitMarkersVisibility();
        }, 50);
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
    
    // Инициализация подсказки (только на десктопе)
    if (!isMobile) {
        initTooltip();
    }
    
    // Обработчик ресайза с троттлингом
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkMobile();
            map.invalidateSize();
            updateUnitMarkersVisibility();
        }, 100);
    });
}

// Создание HTML для пина станции (СТАТИЧНЫЙ, без анимаций)
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
    // Очищаем существующие маркеры
    stationMarkers.forEach(item => map.removeLayer(item.marker));
    stationMarkers = [];
    
    // Оптимизация для мобильных
    const markerSize = isMobile ? 36 : 48;
    const iconSize = isMobile ? [36, 36] : [48, 48];
    const iconAnchor = isMobile ? [18, 36] : [24, 48];
    
    // Создаем маркеры для каждой станции
    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        
        const markerHtml = createStationPinHTML(station.status);
        
        const icon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: iconSize,
            iconAnchor: iconAnchor
        });
        
        const marker = L.marker(station.coords, { 
            icon: icon,
            title: station.name
        })
        .addTo(map)
        .bindTooltip(`
            <div style="font-weight:bold; font-size:14px;">${station.name}</div>
            <div>${station.country.flag} ${station.country.name}</div>
            <div>${getStatusText(station.status)}</div>
        `, {
            direction: 'top',
            offset: [0, -15],
            className: 'custom-tooltip',
            sticky: isMobile
        });
        
        // Оптимизированный обработчик клика
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
    // Очищаем старые маркеры
    unitMarkers.forEach(item => map.removeLayer(item.marker));
    unitMarkers = [];
    
    // Показываем только при достаточном зуме
    const zoomThreshold = isMobile ? 7 : 6;
    
    if (currentZoom >= zoomThreshold) {
        const stationsToShow = selectedStation ? [selectedStation] : allStationsData;
        
        stationsToShow.forEach(station => {
            if (!isStationVisible(station)) return;
            
            station.units.forEach((unit, index) => {
                const offset = isMobile ? 0.012 : 0.025;
                const angle = (index * (360 / station.units.length)) * (Math.PI / 180);
                const unitCoords = [
                    station.coords[0] + Math.sin(angle) * offset,
                    station.coords[1] + Math.cos(angle) * offset
                ];
                
                const statusConfig = getStatusConfig(unit.status);
                const reactorType = getReactorType(unit.type);
                const shapeClass = getReactorShapeClass(unit.type);
                
                const markerSize = isMobile ? 40 : 52;
                const fontSize = isMobile ? 10 : 13;
                
                const markerHtml = `
                    <div class="unit-marker ${shapeClass}" style="
                        background: ${statusConfig.gradient};
                        border-color: ${reactorType.color};
                        font-size: ${fontSize}px;
                    ">
                        ${unit.model.split('-')[0]}
                    </div>
                `;
                
                const icon = L.divIcon({
                    html: markerHtml,
                    className: 'custom-marker',
                    iconSize: [markerSize, markerSize],
                    iconAnchor: [markerSize/2, markerSize/2]
                });
                
                const marker = L.marker(unitCoords, { 
                    icon: icon,
                    title: unit.name
                })
                .addTo(map)
                .bindTooltip(`
                    <div style="font-weight:bold;">${unit.name}</div>
                    <div>${statusConfig.name}</div>
                    <div>${unit.capacity} МВт</div>
                `, {
                    direction: 'right',
                    offset: [10, 0],
                    className: 'custom-tooltip',
                    sticky: isMobile
                });
                
                marker.on('click', function(e) {
                    e.originalEvent.stopPropagation();
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

// ВЫБОР СТАНЦИИ - ОПТИМИЗИРОВАНО ДЛЯ МОБИЛЬНЫХ
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    // СРАЗУ открываем панель на мобильных
    const sidepanel = document.getElementById('sidepanel');
    sidepanel.classList.add('open');
    
    // Заполняем информацию о станции
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
    
    // Активируем первую вкладку
    switchTab('overview');
    
    // Обновляем видимость маркеров энергоблоков
    updateUnitMarkersVisibility();
    
    // На мобильных - мгновенное центрирование без анимации
    if (isMobile) {
        map.setView(station.coords, Math.max(currentZoom, 8));
    } else {
        // На десктопе - плавный переход
        map.flyTo(station.coords, Math.max(currentZoom, 7), {
            duration: 1.0,
            easeLinearity: 0.25
        });
    }
    
    // Скрываем подсказку
    if (!isMobile) {
        hideTooltip();
    }
    
    // На мобильных скрываем фильтры
    if (isMobile) {
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
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            <div style="text-align:center; padding:20px; color:var(--text-tertiary);">
                <i class="fas fa-history"></i>
                <div>Историческая информация отсутствует</div>
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
        eventElement.className = 'timeline-item';
        
        const cleanedTitle = (event.title || event.event).replace(/\[citation:\d+\]/g, '');
        const cleanedDescription = event.description ? event.description.replace(/\[citation:\d+\]/g, '') : '';
        
        eventElement.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <strong>${cleanedTitle}</strong>
                ${cleanedDescription ? `<p style="margin-top:5px;">${cleanedDescription}</p>` : ''}
            </div>
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
                <div>Интересные факты отсутствуют</div>
            </div>
        `;
        return;
    }
    
    station.facts.forEach((fact, index) => {
        const factElement = document.createElement('div');
        factElement.className = 'fact-card';
        
        const cleanedFact = fact.replace(/\[citation:\d+\]/g, '');
        
        factElement.innerHTML = `
            <p>${index + 1}. ${cleanedFact}</p>
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
    
    // Фильтры по статусу
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
    
    // Фильтры по типу реактора
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
    
    // Кнопка сброса фильтров
    document.getElementById('reset-filters').addEventListener('click', function() {
        document.querySelectorAll('.filter-option.active').forEach(option => {
            option.classList.remove('active');
        });
        
        updateFilters();
    });
    
    // Кнопка переключения панели фильтров
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
            }).slice(0, 10); // Ограничиваем результаты
            
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
                        
                        // На мобильных скрываем клавиатуру
                        if (isMobile) {
                            searchInput.blur();
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

// Инициализация подсказки (только для десктопа)
function initTooltip() {
    if (isMobile) return;
    
    const tooltip = document.getElementById('floating-tooltip');
    const closeButton = document.getElementById('close-tooltip');
    
    setTimeout(() => {
        tooltip.style.display = 'flex';
    }, 2000);
    
    tooltipTimeout = setTimeout(() => {
        hideTooltip();
    }, 12000);
    
    closeButton.addEventListener('click', () => {
        hideTooltip();
        clearTimeout(tooltipTimeout);
    });
    
    map.on('click', () => {
        hideTooltip();
        clearTimeout(tooltipTimeout);
    });
}

// Скрытие подсказки
function hideTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    tooltip.style.display = 'none';
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

// Оптимизированные обработчики событий
function initEventListeners() {
    // Вкладки
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
}

// Оптимизация: предотвращение множественных кликов
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    // Копируем данные
    allStationsData = stationsData;
    
    // Предварительная обработка данных
    allStationsData.forEach(station => {
        // Добавляем город для поиска
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
    initEventListeners();
    
    // На мобильных сразу показываем карту в полном размере
    if (isMobile) {
        map.invalidateSize();
    }
});

// Удаляем ненужные события и оптимизируем
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    e.preventDefault();
}, { passive: false });
