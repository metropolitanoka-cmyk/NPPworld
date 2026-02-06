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
let isMobile = window.innerWidth < 768;

// Инициализация карты с оптимизацией для мобильных
function initMap() {
    // Определяем центр в зависимости от устройства
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
    
    // Обработчики для мобильных
    if (isMobile) {
        // На мобильных показываем улицы по умолчанию для лучшей читаемости
        document.getElementById('street-layer').classList.add('active');
    }
    
    // Управление слоями
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
    document.querySelectorAll('.layer-btn[data-layer]').forEach(btn => {
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
    document.getElementById('toggle-theme-btn')?.addEventListener('click', toggleTheme);
    
    function toggleTheme() {
        const icon = document.querySelector('#theme-toggle i') || document.querySelector('#toggle-theme-btn i');
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
        const mobileThemeBtn = document.querySelector('#toggle-theme-btn span');
        if (mobileThemeBtn) {
            mobileThemeBtn.textContent = isDarkTheme ? 'Тёмная тема' : 'Светлая тема';
        }
        
        // Отложенное обновление маркеров для производительности
        setTimeout(updateStationMarkers, 100);
    }
    
    // Слушатель изменения масштаба с троттлингом
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
            case "KURSK": station.locationCity = "Курчатов"; break;
            case "KALININ": station.locationCity = "Удомля"; break;
            case "ZAPOROZHYE": station.locationCity = "Энергодар"; break;
            case "OLKILUOTO": station.locationCity = "Олкилуото"; break;
            case "FUKUSHIMA": station.locationCity = "Футаба"; break;
            case "BELOYARSK": station.locationCity = "Заречный"; break;
            case "CHERNOBYL": station.locationCity = "Припять"; break;
            case "AKKUYU": station.locationCity = "Мерсин"; break;
            case "LNPP": station.locationCity = "Сосновый Бор"; break;
            case "IGNALINA": station.locationCity = "Висагинас"; break;
        }
        
        // Очистка текстов от ссылок
        if (station.overview) {
            station.overview = station.overview.replace(/\[citation:\d+\]/g, '');
        }
        
        if (station.facts) {
            station.facts = station.facts.map(fact => fact.replace(/\[citation:\d+\]/g, ''));
        }
    });
}

// Создание маркеров с оптимизацией
function initStationMarkers() {
    markersLayer = L.layerGroup().addTo(map);
    updateStationMarkers();
}

function updateStationMarkers() {
    // Очистка старых маркеров
    markersLayer.clearLayers();
    stationMarkers = [];
    
    // Ограничение количества одновременно отображаемых маркеров
    const maxMarkers = isMobile ? 50 : 100;
    let markerCount = 0;
    
    // Получаем границы карты для отсечения невидимых маркеров
    const bounds = map.getBounds();
    
    allStationsData.forEach(station => {
        if (markerCount >= maxMarkers) return;
        
        if (!isStationVisible(station)) return;
        
        // Проверка видимости в текущих границах карты
        if (!bounds.contains(station.coords)) return;
        
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
        markerCount++;
    });
}

// Обновление видимости маркеров энергоблоков с оптимизацией
function updateUnitMarkersVisibility() {
    // Удаляем старые маркеры
    unitMarkers.forEach(item => {
        if (item.marker) map.removeLayer(item.marker);
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

// Выбор станции с оптимизацией для мобильных
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;
    
    const sidepanel = document.getElementById('sidepanel');
    sidepanel.classList.add('open');
    sidepanel.scrollTop = 0;
    
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
        closeSearch();
    }
}

// Обновление вкладок с оптимизацией
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
                    <i class="fas fa-calendar-alt"></i>
                    <span>${unit.startYear}</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-circle" style="color: ${statusConfig.pinColor}"></i>
                    <span>${statusConfig.name}</span>
                </div>
            </div>
        `;
        
        unitCard.addEventListener('click', () => {
            selectUnit(unit);
            unitCard.classList.add('selected');
        });
        
        unitsList.appendChild(unitCard);
    });
    
    totalUnits.textContent = station.units.length;
    operationalUnits.textContent = operationalCount;
}

// Инициализация мобильного меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('mobile-menu');
    
    if (menuBtn && closeBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.add('open');
        });
        
        closeBtn.addEventListener('click', closeMobileMenu);
        
        // Закрытие по клику вне меню
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                closeMobileMenu();
            }
        });
    }
    
    // Обработчики для пунктов меню
    document.getElementById('mobile-filters-btn')?.addEventListener('click', () => {
        closeMobileMenu();
        setTimeout(() => {
            document.getElementById('filters-panel').classList.add('open');
        }, 300);
    });
    
    document.getElementById('mobile-layers-btn')?.addEventListener('click', () => {
        closeMobileMenu();
        openModal('layers');
    });
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
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
    const searchInput = document.getElementById('station-search') || document.getElementById('desktop-search');
    const searchResults = document.getElementById('search-results') || document.getElementById('desktop-search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim().toLowerCase();
        
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            const results = allStationsData.filter(station => {
                return station.name.toLowerCase().includes(query) || 
                       (station.locationCity && station.locationCity.toLowerCase().includes(query));
            }).slice(0, 10); // Ограничиваем количество результатов
            
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
                            closeSearch();
                        }
                    });
                    
                    searchResults.appendChild(resultItem);
                });
                
                searchResults.style.display = 'block';
            }
        }, 300);
    });
    
    // Обработчики для мобильного поиска
    if (isMobile) {
        const searchBtn = document.getElementById('mobile-search-btn');
        const closeSearchBtn = document.getElementById('close-search');
        const searchContainer = document.getElementById('mobile-search-container');
        
        if (searchBtn && closeSearchBtn && searchContainer) {
            searchBtn.addEventListener('click', () => {
                searchContainer.classList.add('active');
                searchInput.focus();
            });
            
            closeSearchBtn.addEventListener('click', closeSearch);
            
            // Закрытие по клику вне поиска
            searchContainer.addEventListener('click', (e) => {
                if (e.target === searchContainer) {
                    closeSearch();
                }
            });
        }
    }
}

function closeSearch() {
    document.getElementById('mobile-search-container').classList.remove('active');
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
    
    // Закрываем фильтры на мобильных
    if (isMobile) {
        closeFilters();
        
        // Если выбранная станция не проходит фильтры, закрываем панель
        if (selectedStation && !isStationVisible(selectedStation)) {
            document.getElementById('sidepanel').classList.remove('open');
            selectedStation = null;
        }
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
        
        // Обновление десктопных часов
        document.querySelector('.hours')?.textContent = hours;
        document.querySelector('.minutes')?.textContent = minutes;
        document.querySelector('.seconds')?.textContent = seconds;
        document.getElementById('current-date')?.textContent = dateStr;
        
        // Обновление мобильных часов
        document.getElementById('mobile-time')?.textContent = `${hours}:${minutes}`;
        document.getElementById('mobile-date')?.textContent = dateStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Вспомогательные функции
function updateLayerButtons(activeLayer) {
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.layer-btn[data-layer="${activeLayer}"]`)?.classList.add('active');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    document.querySelector(`.tab[data-tab="${tabName}"]`)?.classList.add('active');
    document.getElementById(`${tabName}-tab`)?.classList.add('active');
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    setTimeout(initMap, 100);
    
    // Закрытие панели
    document.getElementById('close-panel')?.addEventListener('click', function() {
        document.getElementById('sidepanel').classList.remove('open');
        selectedStation = null;
        selectedUnit = null;
        updateUnitMarkersVisibility();
    });
    
    // Обработчики вкладок
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
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
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Обработка ресайза окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobile = window.innerWidth < 768;
            // Обновляем отображение маркеров при изменении размера
            updateStationMarkers();
        }, 250);
    });
    
    // Предотвращение масштабирования на мобильных
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});
