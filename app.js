// Глобальные переменные
let map;
let stationMarkers = [];
let unitMarkers = [];
let markersLayer;
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
let isMobile = window.innerWidth < 769;
let streetLayer, satelliteLayer;

// Проверка загрузки необходимых данных
function checkDataAvailability() {
    console.log('Проверка данных...');
    console.log('stationsData:', typeof stationsData !== 'undefined' ? 'загружены' : 'отсутствуют');
    console.log('statusConfig:', typeof statusConfig !== 'undefined' ? 'загружены' : 'отсутствуют');
    console.log('reactorTypes:', typeof reactorTypes !== 'undefined' ? 'загружены' : 'отсутствуют');
    
    if (typeof stationsData === 'undefined') {
        console.error('Ошибка: stationsData не загружены!');
        return false;
    }
    return true;
}

// Функции для работы со статусами
function getStatusConfig(status) {
    if (typeof statusConfig !== 'undefined' && statusConfig[status]) {
        return statusConfig[status];
    }
    return {
        name: 'Неизвестно',
        gradient: 'linear-gradient(135deg, #aaaaaa, #777777)',
        pinColor: '#aaaaaa',
        textColor: '#ffffff'
    };
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
    if (typeof reactorTypes !== 'undefined' && reactorTypes[type]) {
        return reactorTypes[type];
    }
    return {
        name: 'Неизвестно',
        color: '#00a8ff',
        icon: 'fa-cube',
        shape: 'circle'
    };
}

function getReactorIcon(type) {
    return getReactorType(type).icon;
}

function getReactorColor(type) {
    return getReactorType(type).color;
}

// Инициализация карты
function initMap() {
    console.log('Инициализация карты...');
    
    try {
        const center = isMobile ? [50, 30] : [40, 20];
        const zoom = isMobile ? 3 : 3;
        
        map = L.map('map', {
            center: center,
            zoom: zoom,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: !isMobile,
            attributionControl: false,
            touchZoom: true,
            scrollWheelZoom: !isMobile,
            doubleClickZoom: true,
            boxZoom: !isMobile,
            keyboard: true,
            dragging: true,
            tap: true,
            tapTolerance: 15
        });
        
        console.log('Карта успешно создана');
        
        // Создаем слои
        streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© CARTO',
            maxZoom: 19
        });
        
        satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 19
        });
        
        // Добавляем слой по умолчанию
        streetLayer.addTo(map);
        console.log('Слой карты добавлен');
        
        // Обработчики для слоев карты
        const streetLayerBtn = document.getElementById('street-layer');
        const satelliteLayerBtn = document.getElementById('satellite-layer');
        
        if (streetLayerBtn) {
            streetLayerBtn.addEventListener('click', function() {
                if (satelliteLayer && map.hasLayer(satelliteLayer)) {
                    map.removeLayer(satelliteLayer);
                }
                if (streetLayer && !map.hasLayer(streetLayer)) {
                    streetLayer.addTo(map);
                }
                updateLayerButtons('street');
            });
        }
        
        if (satelliteLayerBtn) {
            satelliteLayerBtn.addEventListener('click', function() {
                if (streetLayer && map.hasLayer(streetLayer)) {
                    map.removeLayer(streetLayer);
                }
                if (satelliteLayer && !map.hasLayer(satelliteLayer)) {
                    satelliteLayer.addTo(map);
                }
                updateLayerButtons('satellite');
            });
        }
        
        // Переключение темы
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
        
        // Слушатель изменения масштаба
        let zoomEndTimeout;
        map.on('zoomend', function() {
            clearTimeout(zoomEndTimeout);
            zoomEndTimeout = setTimeout(() => {
                currentZoom = map.getZoom();
                updateUnitMarkersVisibility();
            }, 200);
        });
        
        // Инициализация остальных компонентов
        setTimeout(() => {
            initStationMarkers();
            initFilters();
            initSearch();
            initMobileMenu();
            initClock();
            initEventListeners();
            console.log('Все компоненты инициализированы');
        }, 500);
        
    } catch (error) {
        console.error('Ошибка при инициализации карты:', error);
        alert('Не удалось загрузить карту. Пожалуйста, обновите страницу.');
    }
}

// Обновление кнопок слоев
function updateLayerButtons(activeLayer) {
    // Десктопные кнопки
    const streetBtn = document.getElementById('street-layer');
    const satelliteBtn = document.getElementById('satellite-layer');
    
    if (streetBtn) streetBtn.classList.remove('active');
    if (satelliteBtn) satelliteBtn.classList.remove('active');
    
    if (activeLayer === 'street' && streetBtn) streetBtn.classList.add('active');
    if (activeLayer === 'satellite' && satelliteBtn) satelliteBtn.classList.add('active');
}

// Переключение темы
function toggleTheme() {
    console.log('Переключение темы');
    const icon = document.querySelector('#theme-toggle i');
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Обновляем маркеры
    setTimeout(updateStationMarkers, 100);
}

// Подготовка данных станций
function prepareStationData() {
    console.log('Подготовка данных станций...');
    
    if (typeof stationsData === 'undefined') {
        console.error('Данные станций не загружены!');
        allStationsData = [];
        return;
    }
    
    allStationsData = stationsData;
    
    // Обработка данных станций
    allStationsData.forEach(station => {
        // Добавляем город местоположения
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
        
        // Очистка текстов от ссылок
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
    
    console.log('Данные подготовлены, всего станций:', allStationsData.length);
}

// Создание маркеров станций
function initStationMarkers() {
    console.log('Инициализация маркеров станций...');
    
    markersLayer = L.layerGroup().addTo(map);
    updateStationMarkers();
}

function updateStationMarkers() {
    console.log('Обновление маркеров станций...');
    
    // Очищаем старые маркеры
    markersLayer.clearLayers();
    stationMarkers = [];
    
    // Проверяем есть ли данные
    if (!allStationsData || allStationsData.length === 0) {
        console.warn('Нет данных для отображения маркеров');
        return;
    }
    
    // Создаем новые маркеры
    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        
        const markerHtml = createStationPinHTML(station.status);
        
        const icon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        const marker = L.marker(station.coords, { icon: icon });
        
        marker.on('click', function() {
            selectStation(station);
        });
        
        marker.addTo(markersLayer);
        stationMarkers.push({ stationId: station.id, marker: marker });
    });
    
    console.log('Создано маркеров:', stationMarkers.length);
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

// Создание HTML для пина станции
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

// Выбор станции
function selectStation(station) {
    console.log('Выбор станции:', station.name);
    
    selectedStation = station;
    selectedUnit = null;
    
    const panel = document.getElementById('station-panel');
    if (panel) {
        panel.classList.add('open');
        panel.scrollTop = 0;
    }
    
    // Обновление информации
    const panelStationName = document.getElementById('panel-station-name');
    const totalCapacity = document.getElementById('total-capacity');
    const unitsCount = document.getElementById('units-count');
    const panelCountry = document.getElementById('panel-country');
    const panelYear = document.getElementById('panel-year');
    const overviewDescription = document.getElementById('overview-description');
    const locationText = document.getElementById('location-text');
    
    if (panelStationName) panelStationName.textContent = station.name;
    if (totalCapacity) totalCapacity.textContent = station.totalCapacity.toLocaleString();
    if (unitsCount) unitsCount.textContent = station.units.length;
    if (panelCountry) panelCountry.textContent = `${station.country.flag} ${station.country.name}`;
    if (panelYear) panelYear.textContent = station.startYear;
    
    const cleanedDescription = station.overview || "Описание отсутствует";
    if (overviewDescription) overviewDescription.textContent = cleanedDescription;
    
    let locationTextContent = station.location || station.locationCity || "Информация отсутствует";
    if (locationText) locationText.textContent = locationTextContent;
    
    const statusBadge = document.getElementById('panel-status-badge');
    if (statusBadge) {
        const statusConfig = getStatusConfig(station.status);
        statusBadge.textContent = statusConfig.name;
        statusBadge.style.background = statusConfig.gradient;
    }
    
    updateUnitsTab(station);
    updateHistoryTab(station);
    updateFactsTab(station);
    switchTab('overview');
    updateUnitMarkersVisibility();
    
    // Плавное перемещение к станции
    const zoomLevel = isMobile ? 8 : 7;
    map.flyTo(station.coords, Math.max(currentZoom, zoomLevel), {
        duration: 1,
        easeLinearity: 0.25
    });
    
    // На мобильных скрываем меню и поиск
    if (isMobile) {
        closeMobileMenu();
        const searchModal = document.getElementById('mobile-search-modal');
        if (searchModal) searchModal.classList.remove('active');
    }
}

// Закрытие панели станции
function closeStationPanel() {
    console.log('Закрытие панели станции');
    const panel = document.getElementById('station-panel');
    if (panel) {
        panel.classList.remove('open');
    }
    selectedStation = null;
    selectedUnit = null;
    updateUnitMarkersVisibility();
}

// Переключение вкладок
function switchTab(tabName) {
    console.log('Переключение на вкладку:', tabName);
    
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.panel-tab[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// Обновление вкладки "Энергоблоки"
function updateUnitsTab(station) {
    console.log('Обновление вкладки энергоблоков для станции:', station.name);
    
    const unitsList = document.getElementById('units-list');
    const totalUnits = document.getElementById('total-units');
    const operationalUnits = document.getElementById('operational-units');
    
    if (!unitsList) {
        console.error('Элемент units-list не найден');
        return;
    }
    
    unitsList.innerHTML = '';
    
    let operationalCount = 0;
    
    station.units.forEach(unit => {
        if (unit.status === 'operational') operationalCount++;
        
        const statusConfig = getStatusConfig(unit.status);
        const reactorType = getReactorType(unit.type);
        
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card';
        unitCard.dataset.unitId = unit.id;
        
        unitCard.innerHTML = `
            <div class="unit-header">
                <div class="unit-name">${unit.name}</div>
                <div class="unit-type-badge">${unit.model}</div>
            </div>
            <div class="unit-info">
                <div class="unit-detail">
                    <i class="fas fa-bolt"></i>
                    <span>${unit.capacity} МВт</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-cube"></i>
                    <span>${reactorType.name}</span>
                </div>
            </div>
            <div class="unit-footer">
                <div class="unit-year">Год пуска: ${unit.startYear}</div>
                <div class="unit-status" style="background: ${statusConfig.gradient}; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px;">
                    ${statusConfig.name}
                </div>
            </div>
        `;
        
        unitCard.addEventListener('click', () => {
            selectUnit(unit);
            document.querySelectorAll('.unit-card').forEach(card => {
                card.classList.remove('selected');
            });
            unitCard.classList.add('selected');
        });
        
        unitsList.appendChild(unitCard);
    });
    
    if (totalUnits) totalUnits.textContent = station.units.length;
    if (operationalUnits) operationalUnits.textContent = operationalCount;
    
    console.log('Обновлено энергоблоков:', station.units.length);
}

// Выбор энергоблока
function selectUnit(unit) {
    console.log('Выбор энергоблока:', unit.name);
    selectedUnit = unit;
    switchTab('units');
}

// Обновление вкладки "История"
function updateHistoryTab(station) {
    console.log('Обновление истории станции:', station.name);
    
    const timeline = document.getElementById('history-timeline');
    if (!timeline) return;
    
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
    console.log('Обновление фактов станции:', station.name);
    
    const factsList = document.getElementById('facts-list');
    if (!factsList) return;
    
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

// Обновление видимости маркеров энергоблоков
function updateUnitMarkersVisibility() {
    console.log('Обновление видимости маркеров энергоблоков, текущий зум:', currentZoom);
    
    // Удаляем старые маркеры
    unitMarkers.forEach(item => {
        if (item.marker && map.hasLayer(item.marker)) {
            map.removeLayer(item.marker);
        }
    });
    unitMarkers = [];
    
    // Показываем только при достаточном зуме
    if (currentZoom >= 6) {
        const stationsToShow = selectedStation ? [selectedStation] : allStationsData;
        
        stationsToShow.forEach(station => {
            if (!isStationVisible(station)) return;
            
            station.units.forEach((unit, index) => {
                const offset = 0.02;
                const angle = (index * (360 / station.units.length)) * (Math.PI / 180);
                const unitCoords = [
                    station.coords[0] + Math.sin(angle) * offset,
                    station.coords[1] + Math.cos(angle) * offset
                ];
                
                const statusConfig = getStatusConfig(unit.status);
                const reactorType = getReactorType(unit.type);
                
                const markerHtml = `
                    <div class="unit-marker" style="
                        background: ${statusConfig.gradient};
                        border-color: ${reactorType.color};
                        font-size: 11px;
                    ">
                        ${unit.model.split('-')[0]}
                    </div>
                `;
                
                const icon = L.divIcon({
                    html: markerHtml,
                    className: 'custom-marker',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                });
                
                const marker = L.marker(unitCoords, { icon: icon });
                
                marker.on('click', function(e) {
                    if (e.originalEvent) e.originalEvent.stopPropagation();
                    selectStation(station);
                    selectUnit(unit);
                });
                
                marker.addTo(map);
                unitMarkers.push({
                    unitId: unit.id,
                    stationId: station.id,
                    marker: marker
                });
            });
        });
        
        console.log('Создано маркеров энергоблоков:', unitMarkers.length);
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    console.log('Инициализация обработчиков событий...');
    
    // Закрытие панели станции
    const panelCloseBtn = document.getElementById('panel-close-btn');
    const closeSidepanelBtn = document.getElementById('close-sidepanel-btn');
    
    if (panelCloseBtn) {
        panelCloseBtn.addEventListener('click', closeStationPanel);
    }
    
    if (closeSidepanelBtn) {
        closeSidepanelBtn.addEventListener('click', closeStationPanel);
    }
    
    // Переключение вкладок в панели
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Переключение режимов карта/статистика
    const mapModeBtn = document.getElementById('map-mode');
    const statsModeBtn = document.getElementById('stats-mode');
    const mobileStatsBtn = document.getElementById('mobile-stats-btn');
    
    if (mapModeBtn) {
        mapModeBtn.addEventListener('click', function() {
            this.classList.add('active');
            const statsMode = document.getElementById('stats-mode');
            if (statsMode) statsMode.classList.remove('active');
        });
    }
    
    if (statsModeBtn) {
        statsModeBtn.addEventListener('click', function() {
            this.classList.add('active');
            const mapMode = document.getElementById('map-mode');
            if (mapMode) mapMode.classList.remove('active');
            window.location.href = 'statistics.html';
        });
    }
    
    if (mobileStatsBtn) {
        mobileStatsBtn.addEventListener('click', function() {
            window.location.href = 'statistics.html';
        });
    }
    
    // Кнопка фильтров на десктопе
    const desktopFiltersBtn = document.getElementById('toggle-filters-desktop');
    if (desktopFiltersBtn) {
        desktopFiltersBtn.addEventListener('click', () => {
            console.log('Переключение фильтров на десктопе');
            const filtersPanel = document.getElementById('filters-panel');
            if (filtersPanel) filtersPanel.classList.toggle('open');
        });
    }
    
    // Обработчики для модальных окон
    const closeLayersModalBtn = document.getElementById('close-layers-modal');
    if (closeLayersModalBtn) {
        closeLayersModalBtn.addEventListener('click', () => {
            const layersModal = document.getElementById('layers-modal');
            if (layersModal) layersModal.classList.remove('active');
        });
    }
    
    // Обработчики для мобильного меню слоев
    document.querySelectorAll('.layer-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const layer = this.dataset.layer;
            if (layer === 'street') {
                if (satelliteLayer && map.hasLayer(satelliteLayer)) {
                    map.removeLayer(satelliteLayer);
                }
                if (streetLayer && !map.hasLayer(streetLayer)) {
                    streetLayer.addTo(map);
                }
            } else if (layer === 'satellite') {
                if (streetLayer && map.hasLayer(streetLayer)) {
                    map.removeLayer(streetLayer);
                }
                if (satelliteLayer && !map.hasLayer(satelliteLayer)) {
                    satelliteLayer.addTo(map);
                }
            }
            updateLayerButtons(layer);
            const layersModal = document.getElementById('layers-modal');
            if (layersModal) layersModal.classList.remove('active');
        });
    });
    
    // Меню слоев для мобильных
    const menuLayersBtn = document.getElementById('menu-layers-btn');
    if (menuLayersBtn) {
        menuLayersBtn.addEventListener('click', () => {
            closeMobileMenu();
            setTimeout(() => {
                const layersModal = document.getElementById('layers-modal');
                if (layersModal) layersModal.classList.add('active');
            }, 300);
        });
    }
    
    // Обработка ресайза окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobile = window.innerWidth < 769;
            updateStationMarkers();
        }, 250);
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    console.log('Инициализация мобильного меню...');
    
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menu = document.getElementById('mobile-menu');
    
    if (menuBtn && closeBtn && menu && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            console.log('Открытие мобильного меню');
            menu.classList.add('open');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Кнопка фильтров на мобильных
    const mobileFiltersBtn = document.getElementById('mobile-filters-top-btn');
    if (mobileFiltersBtn) {
        mobileFiltersBtn.addEventListener('click', () => {
            console.log('Открытие фильтров на мобильном');
            const filtersPanel = document.getElementById('filters-panel');
            if (filtersPanel) filtersPanel.classList.add('open');
        });
    }
}

function closeMobileMenu() {
    console.log('Закрытие мобильного меню');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Инициализация поиска
function initSearch() {
    console.log('Инициализация поиска...');
    
    // Поиск для десктопа
    const desktopSearchInput = document.getElementById('desktop-search');
    const desktopSearchResults = document.getElementById('desktop-search-results');
    
    if (desktopSearchInput && desktopSearchResults) {
        setupSearch(desktopSearchInput, desktopSearchResults);
    }
    
    // Поиск для мобильных
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const mobileSearchModal = document.getElementById('mobile-search-modal');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchResults = document.getElementById('mobile-search-results');
    const closeSearchModal = document.getElementById('close-search-modal');
    const clearMobileSearch = document.getElementById('clear-mobile-search');
    
    if (mobileSearchBtn && mobileSearchModal) {
        mobileSearchBtn.addEventListener('click', () => {
            console.log('Открытие мобильного поиска');
            mobileSearchModal.classList.add('active');
            setTimeout(() => {
                if (mobileSearchInput) mobileSearchInput.focus();
            }, 100);
        });
        
        if (closeSearchModal) {
            closeSearchModal.addEventListener('click', () => {
                console.log('Закрытие мобильного поиска');
                mobileSearchModal.classList.remove('active');
                if (mobileSearchInput) mobileSearchInput.value = '';
                if (mobileSearchResults) mobileSearchResults.innerHTML = '';
            });
        }
        
        if (clearMobileSearch && mobileSearchInput) {
            clearMobileSearch.addEventListener('click', () => {
                if (mobileSearchInput) mobileSearchInput.value = '';
                if (mobileSearchResults) mobileSearchResults.innerHTML = '';
                mobileSearchInput.focus();
            });
        }
        
        if (mobileSearchInput && mobileSearchResults) {
            setupSearch(mobileSearchInput, mobileSearchResults);
        }
        
        // Закрытие по клику вне поля поиска
        mobileSearchModal.addEventListener('click', (e) => {
            if (e.target === mobileSearchModal) {
                mobileSearchModal.classList.remove('active');
                if (mobileSearchInput) mobileSearchInput.value = '';
                if (mobileSearchResults) mobileSearchResults.innerHTML = '';
            }
        });
    }
}

function setupSearch(inputElement, resultsContainer) {
    console.log('Настройка поиска для:', inputElement.id);
    
    inputElement.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        if (!resultsContainer) {
            console.error('Контейнер результатов поиска не найден');
            return;
        }
        
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            const results = allStationsData.filter(station => {
                return station.name.toLowerCase().includes(query) || 
                       (station.locationCity && station.locationCity.toLowerCase().includes(query)) ||
                       (station.country && station.country.name && station.country.name.toLowerCase().includes(query));
            }).slice(0, 10);
            
            if (results.length > 0) {
                results.forEach(station => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    
                    const statusConfig = getStatusConfig(station.status);
                    
                    resultItem.innerHTML = `
                        <div class="search-result-name">${station.name}</div>
                        <div class="search-result-details">
                            <span class="search-result-country">${station.country.flag} ${station.country.name}</span>
                            <span class="search-result-status" style="background: ${statusConfig.gradient}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px;">
                                ${statusConfig.name}
                            </span>
                        </div>
                        <div class="search-result-info">
                            ${station.units.length} энергоблоков · ${station.totalCapacity.toLocaleString()} МВт
                        </div>
                    `;
                    
                    resultItem.addEventListener('click', () => {
                        console.log('Выбор станции из результатов поиска:', station.name);
                        selectStation(station);
                        inputElement.value = '';
                        resultsContainer.innerHTML = '';
                        resultsContainer.style.display = 'none';
                        
                        // Закрываем модальное окно поиска на мобильных
                        const searchModal = document.getElementById('mobile-search-modal');
                        if (searchModal) searchModal.classList.remove('active');
                        
                        // На мобильных скрываем клавиатуру
                        if (isMobile) {
                            inputElement.blur();
                        }
                    });
                    
                    resultsContainer.appendChild(resultItem);
                });
                
                resultsContainer.style.display = 'block';
                console.log('Найдено результатов:', results.length);
            } else {
                resultsContainer.innerHTML = `
                    <div class="no-results" style="text-align: center; padding: 20px; color: var(--text-tertiary);">
                        <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px;"></i>
                        <div>АЭС не найдена</div>
                    </div>
                `;
                resultsContainer.style.display = 'block';
            }
        }, 300);
    });
}

// Инициализация фильтров
function initFilters() {
    console.log('Инициализация фильтров...');
    
    // Проверяем наличие контейнеров
    const countryFiltersContainer = document.getElementById('country-filters');
    const statusFiltersContainer = document.getElementById('status-filters');
    const typeFiltersContainer = document.getElementById('type-filters');
    
    if (!countryFiltersContainer || !statusFiltersContainer || !typeFiltersContainer) {
        console.error('Контейнеры фильтров не найдены');
        return;
    }
    
    // Очищаем контейнеры
    countryFiltersContainer.innerHTML = '';
    statusFiltersContainer.innerHTML = '';
    typeFiltersContainer.innerHTML = '';
    
    // Фильтры по странам
    if (allStationsData.length > 0) {
        const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
        
        countries.forEach(country => {
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = country;
            option.dataset.country = country;
            
            option.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            countryFiltersContainer.appendChild(option);
        });
    }
    
    // Фильтры по статусам
    if (typeof statusConfig !== 'undefined') {
        const statuses = Object.keys(statusConfig);
        
        statuses.forEach(statusId => {
            const status = statusConfig[statusId];
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = status.name;
            option.dataset.status = statusId;
            
            option.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            statusFiltersContainer.appendChild(option);
        });
    }
    
    // Фильтры по типам реакторов
    if (typeof reactorTypes !== 'undefined') {
        const types = Object.keys(reactorTypes);
        
        types.forEach(typeId => {
            const type = reactorTypes[typeId];
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = type.name;
            option.dataset.type = typeId;
            
            option.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            typeFiltersContainer.appendChild(option);
        });
    }
    
    // Кнопки фильтров
    const resetBtn = document.getElementById('reset-filters');
    const applyBtn = document.getElementById('apply-filters');
    const closeBtn = document.getElementById('close-filters');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFilters);
    }
    
    console.log('Фильтры инициализированы');
}

function applyFilters() {
    console.log('Применение фильтров...');
    
    const countryOptions = document.querySelectorAll('#country-filters .filter-option.active');
    const statusOptions = document.querySelectorAll('#status-filters .filter-option.active');
    const typeOptions = document.querySelectorAll('#type-filters .filter-option.active');
    
    activeFilters.countries = Array.from(countryOptions).map(opt => opt.dataset.country);
    activeFilters.statuses = Array.from(statusOptions).map(opt => opt.dataset.status);
    activeFilters.types = Array.from(typeOptions).map(opt => opt.dataset.type);
    
    console.log('Активные фильтры:', activeFilters);
    
    updateStationMarkers();
    updateUnitMarkersVisibility();
    
    closeFilters();
    
    // Если выбранная станция не проходит фильтры, закрываем панель
    if (selectedStation && !isStationVisible(selectedStation)) {
        closeStationPanel();
    }
}

function resetFilters() {
    console.log('Сброс фильтров');
    
    document.querySelectorAll('.filter-option.active').forEach(opt => {
        opt.classList.remove('active');
    });
    
    activeFilters.countries = [];
    activeFilters.statuses = [];
    activeFilters.types = [];
    
    updateStationMarkers();
    updateUnitMarkersVisibility();
}

function closeFilters() {
    console.log('Закрытие панели фильтров');
    const filtersPanel = document.getElementById('filters-panel');
    if (filtersPanel) {
        filtersPanel.classList.remove('open');
    }
}

// Инициализация часов
function initClock() {
    console.log('Инициализация часов...');
    
    function updateClock() {
        const now = new Date();
        
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const dateStr = `${day}/${month}/${year}`;
        
        // Обновление десктопных часов
        const hoursEl = document.querySelector('.hours');
        const minutesEl = document.querySelector('.minutes');
        const secondsEl = document.querySelector('.seconds');
        const dateEl = document.getElementById('current-date');
        
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
        if (dateEl) dateEl.textContent = dateStr;
        
        // Мобильные часы
        const mobileTimeSmall = document.getElementById('mobile-time-small');
        const menuTime = document.getElementById('menu-time');
        const menuDate = document.getElementById('menu-date');
        
        if (mobileTimeSmall) mobileTimeSmall.textContent = `${hours}:${minutes}`;
        if (menuTime) menuTime.textContent = `${hours}:${minutes}:${seconds}`;
        if (menuDate) menuDate.textContent = dateStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
    
    console.log('Часы инициализированы');
}

// Основная функция инициализации
function initializeApp() {
    console.log('Инициализация приложения...');
    
    // Проверяем загрузку необходимых данных
    if (!checkDataAvailability()) {
        console.error('Не удалось загрузить необходимые данные!');
        alert('Ошибка загрузки данных. Пожалуйста, обновите страницу.');
        return;
    }
    
    // Подготавливаем данные станций
    prepareStationData();
    
    // Инициализируем карту
    initMap();
}

// Запуск приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, запуск приложения...');
    
    // Инициализируем приложение
    setTimeout(initializeApp, 100);
    
    // Предотвращаем масштабирование на мобильных
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});
