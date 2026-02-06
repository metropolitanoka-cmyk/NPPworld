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

// Инициализация карты
function initMap() {
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
        tap: isMobile,
        tapTolerance: 15
    });
    
    // Оптимизация для мобильных
    if (isMobile) {
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
    }
    
    // Слои карты
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CARTO',
        maxZoom: 19
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19
    });
    
    streetLayer.addTo(map);
    
    // Обработчики для слоев карты
    document.getElementById('street-layer')?.addEventListener('click', function() {
        map.removeLayer(satelliteLayer);
        streetLayer.addTo(map);
        updateLayerButtons('street');
    });
    
    document.getElementById('satellite-layer')?.addEventListener('click', function() {
        map.removeLayer(streetLayer);
        satelliteLayer.addTo(map);
        updateLayerButtons('satellite');
    });
    
    // Обработчики для мобильного меню слоев
    document.querySelectorAll('.layer-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const layer = this.dataset.layer;
            if (layer === 'street') {
                map.removeLayer(satelliteLayer);
                streetLayer.addTo(map);
            } else if (layer === 'satellite') {
                map.removeLayer(streetLayer);
                satelliteLayer.addTo(map);
            }
            updateLayerButtons(layer);
            closeModal('layers');
        });
    });
    
    // Переключение темы
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('menu-theme-btn')?.addEventListener('click', toggleTheme);
    
    function toggleTheme() {
        const icon = document.querySelector('#theme-toggle i') || document.querySelector('#menu-theme-btn i');
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
        
        // Обновляем кнопку в мобильном меню
        const mobileThemeBtn = document.querySelector('#menu-theme-btn span');
        if (mobileThemeBtn) {
            mobileThemeBtn.textContent = isDarkTheme ? 'Тёмная тема' : 'Светлая тема';
        }
        
        // Отложенное обновление маркеров для производительности
        setTimeout(updateStationMarkers, 100);
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
    
    // Инициализация с задержкой для производительности
    setTimeout(() => {
        initStationMarkers();
        initFilters();
        initSearch();
        initMobileMenu();
        initClock();
        initEventListeners();
    }, 500);
    
    // Предзагрузка данных
    preloadStationData();
}

// Предзагрузка данных
function preloadStationData() {
    allStationsData = stationsData;
    
    // Обработка данных
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
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Закрытие панели
    document.getElementById('panel-close-btn')?.addEventListener('click', closeStationPanel);
    document.getElementById('close-sidepanel-btn')?.addEventListener('click', closeStationPanel);
    
    // Переключение вкладок
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Обработчики для модальных окон
    document.getElementById('close-layers-modal')?.addEventListener('click', () => {
        closeModal('layers');
    });
    
    // Переключение режимов
    document.getElementById('map-mode')?.addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('stats-mode')?.classList.remove('active');
    });
    
    document.getElementById('stats-mode')?.addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('map-mode')?.classList.remove('active');
        window.location.href = 'statistics.html';
    });
    
    document.getElementById('mobile-stats-btn')?.addEventListener('click', function() {
        window.location.href = 'statistics.html';
    });
    
    // Обработка ресайза окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobile = window.innerWidth < 769;
            // Обновляем отображение при изменении размера
            updateStationMarkers();
        }, 250);
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menu = document.getElementById('mobile-menu');
    
    if (menuBtn && closeBtn && menu && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menu.classList.add('open');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
        
        // Обработчики для пунктов меню
        document.getElementById('menu-layers-btn')?.addEventListener('click', () => {
            closeMobileMenu();
            setTimeout(() => {
                openModal('layers');
            }, 300);
        });
    }
    
    // Кнопка фильтров на мобильных
    document.getElementById('mobile-filters-top-btn')?.addEventListener('click', () => {
        document.getElementById('filters-panel').classList.add('open');
    });
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('mobile-menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Управление модальными окнами
function openModal(modalId) {
    document.getElementById(`${modalId}-modal`).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(`${modalId}-modal`).classList.remove('active');
}

// Инициализация поиска
function initSearch() {
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
            mobileSearchModal.classList.add('active');
            setTimeout(() => {
                mobileSearchInput.focus();
            }, 100);
        });
        
        closeSearchModal.addEventListener('click', () => {
            mobileSearchModal.classList.remove('active');
            mobileSearchInput.value = '';
            mobileSearchResults.innerHTML = '';
        });
        
        clearMobileSearch.addEventListener('click', () => {
            mobileSearchInput.value = '';
            mobileSearchResults.innerHTML = '';
            mobileSearchInput.focus();
        });
        
        if (mobileSearchInput && mobileSearchResults) {
            setupSearch(mobileSearchInput, mobileSearchResults);
        }
        
        // Закрытие по клику вне поля поиска
        mobileSearchModal.addEventListener('click', (e) => {
            if (e.target === mobileSearchModal) {
                mobileSearchModal.classList.remove('active');
                mobileSearchInput.value = '';
                mobileSearchResults.innerHTML = '';
            }
        });
    }
}

function setupSearch(inputElement, resultsContainer) {
    inputElement.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            const results = allStationsData.filter(station => {
                return station.name.toLowerCase().includes(query) || 
                       (station.locationCity && station.locationCity.toLowerCase().includes(query)) ||
                       (station.country.name.toLowerCase().includes(query));
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
                        selectStation(station);
                        inputElement.value = '';
                        resultsContainer.innerHTML = '';
                        resultsContainer.style.display = 'none';
                        
                        // Закрываем модальное окно поиска на мобильных
                        document.getElementById('mobile-search-modal')?.classList.remove('active');
                        
                        // На мобильных скрываем клавиатуру
                        if (isMobile) {
                            inputElement.blur();
                        }
                    });
                    
                    resultsContainer.appendChild(resultItem);
                });
                
                resultsContainer.style.display = 'block';
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

// Создание маркеров станций
function initStationMarkers() {
    markersLayer = L.layerGroup().addTo(map);
    updateStationMarkers();
}

function updateStationMarkers() {
    markersLayer.clearLayers();
    stationMarkers = [];
    
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

// Выбор станции
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    const panel = document.getElementById('station-panel');
    panel.classList.add('open');
    panel.scrollTop = 0;
    
    // Обновление информации
    document.getElementById('panel-station-name').textContent = station.name;
    document.getElementById('total-capacity').textContent = station.totalCapacity.toLocaleString();
    document.getElementById('units-count').textContent = station.units.length;
    document.getElementById('panel-country').textContent = `${station.country.flag} ${station.country.name}`;
    document.getElementById('panel-year').textContent = station.startYear;
    
    const cleanedDescription = station.overview || "Описание отсутствует";
    document.getElementById('overview-description').textContent = cleanedDescription;
    
    let locationText = station.location || station.locationCity || "Информация отсутствует";
    document.getElementById('location-text').textContent = locationText;
    
    const statusBadge = document.getElementById('panel-status-badge');
    const statusConfig = getStatusConfig(station.status);
    statusBadge.textContent = statusConfig.name;
    statusBadge.style.background = statusConfig.gradient;
    
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
        document.getElementById('mobile-search-modal')?.classList.remove('active');
    }
}

function closeStationPanel() {
    document.getElementById('station-panel').classList.remove('open');
    selectedStation = null;
    selectedUnit = null;
    updateUnitMarkersVisibility();
}

// Переключение вкладок
function switchTab(tabName) {
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.panel-tab[data-tab="${tabName}"]`)?.classList.add('active');
    document.getElementById(`${tabName}-tab`)?.classList.add('active');
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
    
    totalUnits.textContent = station.units.length;
    operationalUnits.textContent = operationalCount;
}

// Выбор энергоблока
function selectUnit(unit) {
    selectedUnit = unit;
    switchTab('units');
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

// Инициализация фильтров
function initFilters() {
    const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
    const countryFiltersContainer = document.getElementById('country-filters');
    
    countryFiltersContainer.innerHTML = '';
    
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
    
    // Статусы
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
        });
        
        statusFiltersContainer.appendChild(option);
    });
    
    // Типы реакторов
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
        });
        
        typeFiltersContainer.appendChild(option);
    });
    
    // Кнопки фильтров
    document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
    document.getElementById('apply-filters')?.addEventListener('click', applyFilters);
    document.getElementById('close-filters')?.addEventListener('click', closeFilters);
    document.getElementById('toggle-filters-desktop')?.addEventListener('click', () => {
        document.getElementById('filters-panel').classList.toggle('open');
    });
}

function applyFilters() {
    const countryOptions = document.querySelectorAll('#country-filters .filter-option.active');
    const statusOptions = document.querySelectorAll('#status-filters .filter-option.active');
    const typeOptions = document.querySelectorAll('#type-filters .filter-option.active');
    
    activeFilters.countries = Array.from(countryOptions).map(opt => opt.dataset.country);
    activeFilters.statuses = Array.from(statusOptions).map(opt => opt.dataset.status);
    activeFilters.types = Array.from(typeOptions).map(opt => opt.dataset.type);
    
    updateStationMarkers();
    updateUnitMarkersVisibility();
    
    closeFilters();
    
    // Если выбранная станция не проходит фильтры, закрываем панель
    if (selectedStation && !isStationVisible(selectedStation)) {
        closeStationPanel();
    }
}

function resetFilters() {
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
    document.getElementById('filters-panel').classList.remove('open');
}

// Обновление видимости маркеров энергоблоков
function updateUnitMarkersVisibility() {
    unitMarkers.forEach(item => {
        if (item.marker) map.removeLayer(item.marker);
    });
    unitMarkers = [];
    
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
                    e.originalEvent.stopPropagation();
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
    }
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
        
        // Обновление всех часов на странице
        document.querySelector('.hours')?.textContent = hours;
        document.querySelector('.minutes')?.textContent = minutes;
        document.querySelector('.seconds')?.textContent = seconds;
        document.getElementById('current-date')?.textContent = dateStr;
        
        // Мобильные часы
        document.getElementById('mobile-time-small')?.textContent = `${hours}:${minutes}`;
        document.getElementById('menu-time')?.textContent = `${hours}:${minutes}:${seconds}`;
        document.getElementById('menu-date')?.textContent = dateStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Вспомогательные функции
function updateLayerButtons(activeLayer) {
    document.querySelectorAll('.layer-option').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.layer-option[data-layer="${activeLayer}"]`)?.classList.add('active');
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    setTimeout(initMap, 100);
    
    // Предотвращение масштабирования на мобильных
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

// Функции для работы со статусами (добавьте из вашего предыдущего кода)
function getStatusConfig(status) {
    return statusConfig[status] || statusConfig.operational;
}

function getPinColor(status) {
    return getStatusConfig(status).pinColor;
}

function getReactorType(type) {
    return reactorTypes[type] || reactorTypes.vver;
}
