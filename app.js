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

// Проверяем наличие конфигурации статусов
if (typeof window.statusConfig === 'undefined') {
    window.statusConfig = {
        operational: {
            name: "Работает",
            color: "#00FF88",
            gradient: "linear-gradient(135deg, #00FF88, #00CCAA)",
            textColor: "#000000"
        },
        stopped: {
            name: "Остановлен",
            color: "#FFCC00",
            gradient: "linear-gradient(135deg, #FFCC00, #FFAA33)",
            textColor: "#000000"
        },
        construction: {
            name: "Строится",
            color: "#00D1FF",
            gradient: "linear-gradient(135deg, #00D1FF, #0088FF)",
            textColor: "#000000"
        },
        closed: {
            name: "Закрыт",
            color: "#AAAAAA",
            gradient: "linear-gradient(135deg, #AAAAAA, #777777)",
            textColor: "#000000"
        },
        abandoned: {
            name: "Заброшена",
            color: "#8B4513",
            gradient: "linear-gradient(135deg, #8B4513, #A0522D)",
            textColor: "#FFFFFF"
        },
        accident: {
            name: "Авария",
            color: "#FF3366",
            gradient: "linear-gradient(135deg, #FF3366, #FF0055)",
            textColor: "#FFFFFF"
        }
    };
}

// Проверяем наличие типов реакторов
if (typeof window.reactorTypes === 'undefined') {
    window.reactorTypes = {
        vver: { name: "ВВЭР", color: "#00D1FF", shape: 'circle' },
        pwr: { name: "PWR", color: "#007BFF", shape: 'circle' },
        bwr: { name: "BWR", color: "#00FF88", shape: 'hexagon' },
        rbmk: { name: "РБМК", color: "#FF3366", shape: 'square' },
        fast: { name: "БН", color: "#FFAA33", shape: 'pentagon' },
        graphite: { name: "Графитовый", color: "#AAAAAA", shape: 'square' }
    };
}

// Функции для работы со статусами
function getStatusConfig(status) {
    return window.statusConfig[status] || window.statusConfig.operational;
}

function getStatusText(status) {
    return getStatusConfig(status).name;
}

function getStatusGradient(status) {
    return getStatusConfig(status).gradient;
}

function getPinColor(status) {
    return getStatusConfig(status).color;
}

// Функции для работы с типами реакторов
function getReactorType(type) {
    return window.reactorTypes[type] || window.reactorTypes.vver;
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

// Инициализация карты Leaflet
function initMap() {
    // Оптимизированные настройки
    const mapOptions = {
        center: [50, 30],
        zoom: 3,
        minZoom: 1,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: true,
        tap: true,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        dragging: true,
        keyboard: false,
        fadeAnimation: true,
        zoomAnimation: true,
        markerZoomAnimation: true,
        bounceAtZoomLimits: true,
        inertia: true,
        inertiaDeceleration: 3000,
        inertiaMaxSpeed: 1500,
        easeLinearity: 0.2,
        worldCopyJump: false,
        maxBoundsViscosity: 1.0,
        preferCanvas: false,
        renderer: L.svg()
    };
    
    // Создаем карту
    map = L.map('map', mapOptions);
    
    // ФИКС: Исправляем тайлы - используем стабильные источники
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 1,
        detectRetina: true,
        noWrap: true,
        bounds: [[-90, -180], [90, 180]]
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19,
        minZoom: 1,
        detectRetina: true,
        noWrap: true,
        bounds: [[-90, -180], [90, 180]]
    });
    
    // Альтернативный слой на случай проблем
    const alternativeStreetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CARTO',
        maxZoom: 19,
        minZoom: 1,
        detectRetina: true,
        noWrap: true
    });
    
    // По умолчанию показываем схему
    streetLayer.addTo(map);
    document.getElementById('street-layer').classList.add('active');
    document.getElementById('satellite-layer').classList.remove('active');
    
    // Управление слоями
    document.getElementById('street-layer').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        map.removeLayer(satelliteLayer);
        map.removeLayer(alternativeStreetLayer);
        streetLayer.addTo(map);
        document.getElementById('street-layer').classList.add('active');
        document.getElementById('satellite-layer').classList.remove('active');
    });
    
    document.getElementById('satellite-layer').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        map.removeLayer(streetLayer);
        map.removeLayer(alternativeStreetLayer);
        satelliteLayer.addTo(map);
        document.getElementById('satellite-layer').classList.add('active');
        document.getElementById('street-layer').classList.remove('active');
    });
    
    // Переключение темы
    document.getElementById('theme-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
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
        updateUnitMarkers();
    });
    
    // Слушатель изменения масштаба
    map.on('zoomend', function() {
        currentZoom = map.getZoom();
        updateAllMarkers();
    });
    
    // Дебаунс для событий движения карты
    let moveEndTimeout;
    map.on('moveend', function() {
        clearTimeout(moveEndTimeout);
        moveEndTimeout = setTimeout(() => {
            updateAllMarkers();
        }, 100);
    });
    
    // Кастомный контрол zoom
    const zoomControl = L.control.zoom({
        position: 'topright',
        zoomInTitle: 'Приблизить',
        zoomOutTitle: 'Отдалить'
    }).addTo(map);
    
    // Обработка ошибок загрузки тайлов
    map.on('tileerror', function(e) {
        console.warn('Ошибка загрузки тайла:', e);
        // Пробуем переключиться на альтернативный слой
        if (map.hasLayer(streetLayer)) {
            map.removeLayer(streetLayer);
            alternativeStreetLayer.addTo(map);
        }
    });
    
    // Оптимизация для мобильных
    map.on('touchstart', function(e) {
        if (e.originalEvent.touches.length > 1) {
            e.originalEvent.preventDefault();
        }
    }, { passive: false });
    
    // Инициализация
    initStationMarkers();
    initFilters();
    initSearch();
    initTooltip();
}

// Обновление всех маркеров
function updateAllMarkers() {
    updateStationMarkers();
    if (currentZoom >= 6) {
        updateUnitMarkers();
    } else {
        clearUnitMarkers();
    }
}

// Создание HTML для пина станции
function createStationPinHTML(status) {
    const statusConfig = getStatusConfig(status);
    const pinColor = statusConfig.color;
    
    return `
        <div class="station-pin">
            <div class="pin-head" style="background: ${pinColor};">
                <div class="pin-atom">
                    <div class="pin-core"></div>
                </div>
            </div>
            <div class="pin-stem" style="background: ${pinColor};"></div>
        </div>
    `;
}

// Инициализация маркеров станций
function initStationMarkers() {
    updateStationMarkers();
}

// Функция обновления маркеров станций
function updateStationMarkers() {
    // Очищаем существующие маркеры
    stationMarkers.forEach(item => map.removeLayer(item.marker));
    stationMarkers = [];
    
    // Получаем границы карты для оптимизации
    const bounds = map.getBounds();
    
    // Создаем маркеры для каждой видимой станции
    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        
        // Проверяем, находится ли станция в видимой области
        if (!bounds.contains(station.coords)) return;
        
        const markerHtml = createStationPinHTML(station.status);
        
        const icon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: [25, 40],
            iconAnchor: [12.5, 40]
        });
        
        const marker = L.marker(station.coords, { 
            icon: icon,
            title: station.name,
            alt: station.name,
            riseOnHover: true,
            bubblingMouseEvents: false,
            autoPanOnFocus: false
        })
        .addTo(map)
        .bindTooltip(`
            <div style="font-weight:bold; font-size:12px;">${station.name}</div>
            <div>${station.country.flag} ${station.country.name}</div>
            <div>${getStatusText(station.status)}</div>
        `, {
            direction: 'top',
            offset: [0, -15],
            className: 'custom-tooltip',
            sticky: true
        });
        
        marker.on('click', function(e) {
            if (e.originalEvent) {
                e.originalEvent.preventDefault();
                e.originalEvent.stopPropagation();
            }
            selectStation(station);
        });
        
        // Оптимизация для мобильных
        marker.on('touchstart', function(e) {
            if (e.originalEvent) {
                e.originalEvent.preventDefault();
                e.originalEvent.stopPropagation();
            }
        });
        
        stationMarkers.push({
            stationId: station.id,
            marker: marker
        });
    });
}

// Очистка маркеров энергоблоков
function clearUnitMarkers() {
    unitMarkers.forEach(item => map.removeLayer(item.marker));
    unitMarkers = [];
}

// Обновление маркеров энергоблоков
function updateUnitMarkers() {
    clearUnitMarkers();
    
    if (currentZoom < 6) return;
    
    // Получаем границы карты для оптимизации
    const bounds = map.getBounds();
    
    // Для всех станций в области видимости показываем энергоблоки
    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        if (!bounds.contains(station.coords)) return;
        
        station.units.forEach((unit, index) => {
            // Рассчитываем координаты с небольшим смещением
            const offset = 0.015;
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
                    background: ${statusConfig.color};
                    border-color: ${reactorType.color};
                    font-size: 8px;
                ">
                    ${unit.model}
                </div>
            `;
            
            const icon = L.divIcon({
                html: markerHtml,
                className: 'custom-marker',
                iconSize: [45, 45],
                iconAnchor: [22.5, 22.5]
            });
            
            const marker = L.marker(unitCoords, { 
                icon: icon,
                title: unit.name,
                alt: unit.name,
                zIndexOffset: 1000,
                riseOnHover: true,
                bubblingMouseEvents: false
            })
            .addTo(map)
            .bindTooltip(`
                <div style="font-weight:bold;">${unit.name}</div>
                <div>${unit.model}</div>
                <div>${statusConfig.name}</div>
                <div>${unit.capacity} МВт</div>
            `, {
                direction: 'right',
                offset: [5, 0],
                className: 'custom-tooltip'
            });
            
            marker.on('click', function(e) {
                if (e.originalEvent) {
                    e.originalEvent.stopPropagation();
                    e.originalEvent.preventDefault();
                }
                selectStation(station);
                selectUnit(unit);
            });
            
            // Оптимизация для мобильных
            marker.on('touchstart', function(e) {
                if (e.originalEvent) {
                    e.originalEvent.preventDefault();
                    e.originalEvent.stopPropagation();
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

// Выбор станции
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    // Открываем панель
    document.getElementById('sidepanel').classList.add('open');
    
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
    
    updateUnitsTab(station);
    updateHistoryTab(station);
    updateFactsTab(station);
    
    switchTab('overview');
    
    // Центрируем карту на выбранной станции
    map.flyTo(station.coords, Math.max(currentZoom, 7), {
        duration: 0.5,
        easeLinearity: 0.25
    });
    
    // Обновляем маркеры
    updateAllMarkers();
    
    // Скрываем подсказку
    hideTooltip();
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
    
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Инициализация фильтров
function initFilters() {
    // Собираем уникальные страны
    const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
    const countryFiltersContainer = document.getElementById('country-filters');
    
    countryFiltersContainer.innerHTML = '';
    
    countries.forEach(country => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = country;
        option.dataset.country = country;
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            updateFilters();
        });
        
        countryFiltersContainer.appendChild(option);
    });
    
    // Фильтры по статусу
    const statuses = Object.keys(window.statusConfig);
    const statusFiltersContainer = document.getElementById('status-filters');
    
    statuses.forEach(statusId => {
        const status = window.statusConfig[statusId];
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = status.name;
        option.dataset.status = statusId;
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            updateFilters();
        });
        
        statusFiltersContainer.appendChild(option);
    });
    
    // Фильтры по типу реактора
    const types = Object.keys(window.reactorTypes);
    const typeFiltersContainer = document.getElementById('type-filters');
    
    types.forEach(typeId => {
        const type = window.reactorTypes[typeId];
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.textContent = type.name;
        option.dataset.type = typeId;
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            updateFilters();
        });
        
        typeFiltersContainer.appendChild(option);
    });
    
    // Кнопка сброса фильтров
    document.getElementById('reset-filters').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.filter-option.active').forEach(option => {
            option.classList.remove('active');
        });
        updateFilters();
    });
    
    // Кнопка переключения панели фильтров
    const toggleBtn = document.getElementById('toggle-filters-btn');
    const filtersPanel = document.getElementById('filters-panel');
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        filtersPanel.classList.toggle('open');
        toggleBtn.classList.toggle('active');
    });
    
    // Закрытие фильтров при клике вне панели
    document.addEventListener('click', function(e) {
        if (!filtersPanel.contains(e.target) && !toggleBtn.contains(e.target) && e.target !== toggleBtn) {
            filtersPanel.classList.remove('open');
            toggleBtn.classList.remove('active');
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
    
    updateAllMarkers();
    
    // Если выбранная станция не проходит фильтры, закрываем панель
    if (selectedStation && !isStationVisible(selectedStation)) {
        document.getElementById('sidepanel').classList.remove('open');
        selectedStation = null;
        selectedUnit = null;
        clearUnitMarkers();
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
                    
                    resultItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        selectStation(station);
                        searchInput.value = '';
                        searchResults.innerHTML = '';
                        searchResults.style.display = 'none';
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
    
    // Предотвращаем всплытие для поиска
    searchInput.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
}

// Инициализация подсказки
function initTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    const closeButton = document.getElementById('close-tooltip');
    
    setTimeout(() => {
        tooltip.style.display = 'flex';
    }, 2000);
    
    tooltipTimeout = setTimeout(() => {
        hideTooltip();
    }, 12000);
    
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideTooltip();
        clearTimeout(tooltipTimeout);
    });
    
    // Закрытие по клику на карту
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

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    allStationsData = stationsData;
    
    // Добавляем поле locationCity для поиска по городу
    allStationsData.forEach(station => {
        if (!station.locationCity) {
            station.locationCity = station.location ? station.location.split(',')[0] : '';
        }
        
        // Удаляем цитаты из всех текстов
        if (station.overview) station.overview = station.overview.replace(/\[citation:\d+\]/g, '');
        if (station.facts) station.facts = station.facts.map(fact => fact.replace(/\[citation:\d+\]/g, ''));
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
                if (unit.details) unit.details = unit.details.replace(/\[citation:\d+\]/g, '');
                return unit;
            });
        }
    });
    
    initMap();
    initClock();
    
    // Обработчики событий
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Закрытие панели
    document.getElementById('close-panel').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('sidepanel').classList.remove('open');
        selectedStation = null;
        selectedUnit = null;
        clearUnitMarkers();
        updateUnitMarkers(); // Обновляем блоки на карте
    });
    
    // Переключение режимов
    document.getElementById('map-mode').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('active');
        document.getElementById('stats-mode').classList.remove('active');
    });
    
    document.getElementById('stats-mode').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('active');
        document.getElementById('map-mode').classList.remove('active');
        window.location.href = 'statistics.html';
    });
});
