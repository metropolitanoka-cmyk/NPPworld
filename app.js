// ============================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================================
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
let currentLang = 'ru';

// Кэш для фото
const photoCache = new Map();

// ============================================================
// I18N — СЛОВАРЬ ПЕРЕВОДОВ
// ============================================================
const I18N = {
    ru: {
        // Статусы
        statusOperational: 'Работает',
        statusStopped: 'Остановлен',
        statusConstruction: 'Строится',
        statusClosed: 'Закрыт',
        statusAbandoned: 'Заброшена',
        statusAccident: 'Авария',

        // Легенда
        legendOperational: 'Работает',
        legendStopped: 'Остановлен',
        legendConstruction: 'Строится',
        legendClosed: 'Закрыт',
        legendAbandoned: 'Заброшена',
        legendAccident: 'Авария',

        // Фильтры
        filterCountries: 'СТРАНЫ',
        filterStatus: 'СТАТУС АЭС',
        filterType: 'ТИП РЕАКТОРА',
        resetFilters: 'СБРОСИТЬ ФИЛЬТРЫ',

        // Вкладки
        tabOverview: 'ОБЗОР',
        tabUnits: 'БЛОКИ',
        tabHistory: 'ИСТОРИЯ',
        tabFacts: 'ФАКТЫ',

        // Панель
        panelSelectStation: 'Выберите АЭС',
        statCapacity: 'Мощность, МВт',
        statUnits: 'Блоков',
        statCountry: 'Страна',
        statYear: 'Год пуска',
        aboutStation: 'О СТАНЦИИ',
        selectStationHint: 'Выберите атомную электростанцию на карте для просмотра подробной информации.',
        locationTitle: 'МЕСТОПОЛОЖЕНИЕ',
        locationUnknown: 'Информация о ближайшем населённом пункте отсутствует',

        // Блоки
        unitsHeader: 'ЭНЕРГОБЛОКИ СТАНЦИИ',
        unitsTotal: 'Всего блоков:',
        unitsOperational: 'Работает:',
        unitStartYear: 'Год пуска:',
        unitEndYear: 'Год остановки:',

        // История / факты
        historyHeader: 'ИСТОРИЯ СТАНЦИИ',
        historyEmpty: 'Историческая информация отсутствует',
        factsHeader: 'ИНТЕРЕСНЫЕ ФАКТЫ',
        factsEmpty: 'Интересные факты отсутствуют',

        // Подсказка
        tooltipClick: 'Нажмите на АЭС для просмотра информации',

        // Поиск
        searchPlaceholder: 'Поиск АЭС...',

        // Ошибки данных
        dataErrorCapacity: 'Мощность не указана',
        dataErrorUnits: 'Нет данных о блоках'
    },
    ja: {
        // Статусы
        statusOperational: '運転中',
        statusStopped: '停止中',
        statusConstruction: '建設中',
        statusClosed: '閉鎖',
        statusAbandoned: '放棄',
        statusAccident: '事故',

        // Легенда
        legendOperational: '運転中',
        legendStopped: '停止中',
        legendConstruction: '建設中',
        legendClosed: '閉鎖',
        legendAbandoned: '放棄',
        legendAccident: '事故',

        // Фильтры
        filterCountries: '国',
        filterStatus: '運転状況',
        filterType: '原子炉タイプ',
        resetFilters: 'フィルターをリセット',

        // Вкладки
        tabOverview: '概要',
        tabUnits: 'ユニット',
        tabHistory: '歴史',
        tabFacts: '豆知識',

        // Панель
        panelSelectStation: '原発を選択してください',
        statCapacity: '出力（MW）',
        statUnits: 'ユニット数',
        statCountry: '国',
        statYear: '運転開始年',
        aboutStation: '発電所について',
        selectStationHint: '地図上の原子力発電所を選ぶと、詳しい情報が表示されます。',
        locationTitle: '所在地',
        locationUnknown: '最寄りの自治体情報はありません',

        // Блоки
        unitsHeader: '発電所のユニット',
        unitsTotal: '総ユニット数：',
        unitsOperational: '運転中：',
        unitStartYear: '運転開始：',
        unitEndYear: '運転終了：',

        // История / факты
        historyHeader: '発電所の歴史',
        historyEmpty: '歴史情報はありません',
        factsHeader: '豆知識',
        factsEmpty: '豆知識はありません',

        // Подсказка
        tooltipClick: '原発をクリックすると情報が表示されます',

        // Поиск
        searchPlaceholder: '原発を検索...',

        // Ошибки данных
        dataErrorCapacity: '出力データなし',
        dataErrorUnits: 'ユニットデータなし'
    }
};

// ============================================================
// КОНФИГУРАЦИЯ СТАТУСОВ (с поддержкой перевода)
// ============================================================
if (typeof window.statusConfig === 'undefined') {
    window.statusConfig = {
        operational: {
            name: 'Работает',
            nameJa: '運転中',
            color: '#00FF88',
            gradient: 'linear-gradient(135deg, #00FF88, #00CCAA)',
            textColor: '#000000'
        },
        stopped: {
            name: 'Остановлен',
            nameJa: '停止中',
            color: '#FFCC00',
            gradient: 'linear-gradient(135deg, #FFCC00, #FFAA33)',
            textColor: '#000000'
        },
        construction: {
            name: 'Строится',
            nameJa: '建設中',
            color: '#00D1FF',
            gradient: 'linear-gradient(135deg, #00D1FF, #0088FF)',
            textColor: '#000000'
        },
        closed: {
            name: 'Закрыт',
            nameJa: '閉鎖',
            color: '#AAAAAA',
            gradient: 'linear-gradient(135deg, #AAAAAA, #777777)',
            textColor: '#000000'
        },
        abandoned: {
            name: 'Заброшена',
            nameJa: '放棄',
            color: '#8B4513',
            gradient: 'linear-gradient(135deg, #8B4513, #A0522D)',
            textColor: '#FFFFFF'
        },
        accident: {
            name: 'Авария',
            nameJa: '事故',
            color: '#FF3366',
            gradient: 'linear-gradient(135deg, #FF3366, #FF0055)',
            textColor: '#FFFFFF'
        }
    };
}

if (typeof window.reactorTypes === 'undefined') {
    window.reactorTypes = {
        vver: { name: 'ВВЭР', nameJa: 'VVER', color: '#00D1FF', shape: 'circle' },
        pwr: { name: 'PWR', nameJa: 'PWR', color: '#007BFF', shape: 'circle' },
        bwr: { name: 'BWR', nameJa: 'BWR', color: '#00FF88', shape: 'hexagon' },
        rbmk: { name: 'РБМК', nameJa: 'RBMK', color: '#FF3366', shape: 'square' },
        fast: { name: 'БН', nameJa: '高速炉', color: '#FFAA33', shape: 'pentagon' },
        graphite: { name: 'Графитовый', nameJa: '黒鉛型', color: '#AAAAAA', shape: 'square' }
    };
}

// ============================================================
// ФУНКЦИИ ЯЗЫКА
// ============================================================
function t(key) {
    const dict = I18N[currentLang] || I18N.ru;
    return dict[key] || I18N.ru[key] || key;
}

function getStatusText(status) {
    const cfg = window.statusConfig[status] || window.statusConfig.operational;
    return currentLang === 'ja' ? (cfg.nameJa || cfg.name) : cfg.name;
}

function getReactorTypeName(type) {
    const cfg = window.reactorTypes[type] || window.reactorTypes.vver;
    return currentLang === 'ja' ? (cfg.nameJa || cfg.name) : cfg.name;
}

function detectBrowserLang() {
    const langs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || 'ru'];
    for (const l of langs) {
        if (l && l.toLowerCase().startsWith('ja')) return 'ja';
    }
    return 'ru';
}

function applyLanguage(lang) {
    if (!I18N[lang]) lang = 'ru';
    currentLang = lang;
    document.documentElement.lang = lang;

    // Кнопка языка: показываем ЦЕЛЕВОЙ язык
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
        langLabel.textContent = lang === 'ru' ? 'JA' : 'RU';
    }

    // data-i18n атрибуты
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated) el.textContent = translated;
    });

    // Placeholder поиска
    const searchInput = document.getElementById('station-search');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');

    // Перерисовываем динамику, если панель открыта
    if (selectedStation) {
        // Обновляем заголовок панели и статус
        document.getElementById('panel-station-name').textContent = selectedStation.name;
        const statusBadge = document.getElementById('panel-status-badge');
        const cfg = window.statusConfig[selectedStation.status] || window.statusConfig.operational;
        statusBadge.textContent = getStatusText(selectedStation.status);
        statusBadge.style.background = cfg.gradient;
        statusBadge.style.color = cfg.textColor;

        // Перерисовываем вкладки
        updateUnitsTab(selectedStation);
        updateHistoryTab(selectedStation);
        updateFactsTab(selectedStation);
        // Описание и локация
        const descEl = document.getElementById('overview-description');
        if (descEl) descEl.textContent = (selectedStation.overview || '').replace(/\[citation:\d+\]/g, '');
        const locEl = document.getElementById('location-text');
        if (locEl) locEl.textContent = selectedStation.location || t('locationUnknown');
    } else {
        // Если панель пуста — обновляем подсказку
        const descEl = document.getElementById('overview-description');
        if (descEl) descEl.textContent = t('selectStationHint');
        const locEl = document.getElementById('location-text');
        if (locEl) locEl.textContent = '—';
    }

    // Обновляем фильтры (тексты опций статусов и типов)
    refreshFilterLabels();

    // Обновляем тултипы маркеров
    updateStationMarkers();
    updateUnitMarkers();

    localStorage.setItem('npp-lang', lang);
}

function refreshFilterLabels() {
    // Статусы
    document.querySelectorAll('#status-filters .filter-option').forEach(opt => {
        const statusId = opt.dataset.status;
        if (statusId && window.statusConfig[statusId]) {
            opt.textContent = getStatusText(statusId);
        }
    });
    // Типы
    document.querySelectorAll('#type-filters .filter-option').forEach(opt => {
        const typeId = opt.dataset.type;
        if (typeId && window.reactorTypes[typeId]) {
            opt.textContent = getReactorTypeName(typeId);
        }
    });
}

function initLanguageToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    const saved = localStorage.getItem('npp-lang');
    const lang = saved || detectBrowserLang();
    applyLanguage(lang);

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const next = currentLang === 'ru' ? 'ja' : 'ru';
        applyLanguage(next);
    });
}

// ============================================================
// ФУНКЦИИ СТАТУСОВ И ТИПОВ
// ============================================================
function getStatusConfig(status) {
    return window.statusConfig[status] || window.statusConfig.operational;
}

function getStatusGradient(status) {
    return getStatusConfig(status).gradient;
}

function getPinColor(status) {
    return getStatusConfig(status).color;
}

function getReactorType(type) {
    return window.reactorTypes[type] || window.reactorTypes.vver;
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

// ============================================================
// ИНИЦИАЛИЗАЦИЯ КАРТЫ
// ============================================================
function initMap() {
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

    map = L.map('map', mapOptions);

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

    const alternativeStreetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CARTO',
        maxZoom: 19,
        minZoom: 1,
        detectRetina: true,
        noWrap: true
    });

    streetLayer.addTo(map);
    document.getElementById('street-layer').classList.add('active');
    document.getElementById('satellite-layer').classList.remove('active');

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

    map.on('zoomend', function() {
        currentZoom = map.getZoom();
        updateAllMarkers();
    });

    let moveEndTimeout;
    map.on('moveend', function() {
        clearTimeout(moveEndTimeout);
        moveEndTimeout = setTimeout(() => {
            updateAllMarkers();
        }, 100);
    });

    const zoomControl = L.control.zoom({
        position: 'topright',
        zoomInTitle: currentLang === 'ja' ? '拡大' : 'Приблизить',
        zoomOutTitle: currentLang === 'ja' ? '縮小' : 'Отдалить'
    }).addTo(map);

    map.on('tileerror', function(e) {
        console.warn('Ошибка загрузки тайла:', e);
        if (map.hasLayer(streetLayer)) {
            map.removeLayer(streetLayer);
            alternativeStreetLayer.addTo(map);
        }
    });

    map.on('touchstart', function(e) {
        if (e.originalEvent.touches.length > 1) {
            e.originalEvent.preventDefault();
        }
    }, { passive: false });

    initStationMarkers();
    initFilters();
    initSearch();
    initTooltip();
}

// ============================================================
// МАРКЕРЫ
// ============================================================
function updateAllMarkers() {
    updateStationMarkers();
    if (currentZoom >= 6) {
        updateUnitMarkers();
    } else {
        clearUnitMarkers();
    }
}

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

function initStationMarkers() {
    updateStationMarkers();
}

function updateStationMarkers() {
    if (!map) return;
    stationMarkers.forEach(item => map.removeLayer(item.marker));
    stationMarkers = [];

    const bounds = map.getBounds();

    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
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

function clearUnitMarkers() {
    unitMarkers.forEach(item => map.removeLayer(item.marker));
    unitMarkers = [];
}

function updateUnitMarkers() {
    clearUnitMarkers();
    if (!map || currentZoom < 6) return;

    const bounds = map.getBounds();

    allStationsData.forEach(station => {
        if (!isStationVisible(station)) return;
        if (!bounds.contains(station.coords)) return;

        station.units.forEach((unit, index) => {
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
                <div>${getStatusText(unit.status)}</div>
                <div>${unit.capacity} ${currentLang === 'ja' ? 'MW' : 'МВт'}</div>
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
        if (!hasMatchingType) return false;
    }
    return true;
}

// ============================================================
// ФОТО
// ============================================================
function loadStationPhoto(stationId) {
    const photoContainer = document.getElementById('station-photo-container');
    const photoImg = document.getElementById('station-photo');

    if (photoCache.has(stationId)) {
        const exists = photoCache.get(stationId);
        if (exists) {
            photoImg.src = `PhotoNPP/${stationId}.jpg`;
            photoContainer.style.display = 'block';
        } else {
            photoContainer.style.display = 'none';
            photoImg.src = '';
        }
        return;
    }

    photoContainer.style.display = 'none';
    photoImg.src = '';

    const photoPath = `PhotoNPP/${stationId}.jpg`;

    const tempImg = new Image();
    tempImg.onload = function() {
        photoCache.set(stationId, true);
        photoImg.src = photoPath;
        photoContainer.style.display = 'block';
    };
    tempImg.onerror = function() {
        photoCache.set(stationId, false);
        photoContainer.style.display = 'none';
        photoImg.src = '';
    };
    tempImg.src = photoPath;
}

// ============================================================
// ВЫБОР СТАНЦИИ / БЛОКА
// ============================================================
function selectStation(station) {
    selectedStation = station;
    selectedUnit = null;

    document.getElementById('sidepanel').classList.add('open');

    document.getElementById('panel-station-name').textContent = station.name;
    document.getElementById('total-capacity').textContent = (station.totalCapacity || 0).toLocaleString();
    document.getElementById('units-count').textContent = station.units ? station.units.length : 0;
    document.getElementById('panel-country').textContent = station.country.name + ' ' + station.country.flag;
    document.getElementById('panel-year').textContent = station.startYear || '—';

    const cleanedDescription = (station.overview || '').replace(/\[citation:\d+\]/g, '');
    document.getElementById('overview-description').textContent = cleanedDescription || t('selectStationHint');

    let locationText = station.location || t('locationUnknown');
    document.getElementById('location-text').textContent = locationText;

    const statusBadge = document.getElementById('panel-status-badge');
    const statusConfig = getStatusConfig(station.status);
    statusBadge.textContent = getStatusText(station.status);
    statusBadge.style.background = statusConfig.gradient;
    statusBadge.style.color = statusConfig.textColor;

    loadStationPhoto(station.id);

    updateUnitsTab(station);
    updateHistoryTab(station);
    updateFactsTab(station);

    switchTab('overview');

    map.flyTo(station.coords, Math.max(currentZoom, 7), {
        duration: 0.5,
        easeLinearity: 0.25
    });

    updateAllMarkers();
    hideTooltip();
}

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

function updateUnitsTab(station) {
    const unitsList = document.getElementById('units-list');
    const totalUnits = document.getElementById('total-units');
    const operationalUnits = document.getElementById('operational-units');

    if (!unitsList) return;
    unitsList.innerHTML = '';

    let operationalCount = 0;

    if (!station.units || station.units.length === 0) {
        unitsList.innerHTML = `<div class="no-data-message"><i class="fas fa-info-circle"></i><span>${t('dataErrorUnits')}</span></div>`;
        if (totalUnits) totalUnits.textContent = '0';
        if (operationalUnits) operationalUnits.textContent = '0';
        return;
    }

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
                <span>${t('unitStartYear')} <strong>${unit.startYear || '—'}</strong></span>
                ${unit.endYear ? `
                    <i class="fas fa-stop-circle"></i>
                    <span>${t('unitEndYear')} <strong>${unit.endYear}</strong></span>
                ` : ''}
            </div>
            
            <div class="unit-details">
                <div class="unit-detail">
                    <i class="fas fa-bolt"></i>
                    <span>${unit.capacity || '—'} ${currentLang === 'ja' ? 'MW' : 'МВт'}</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-cube"></i>
                    <span>${getReactorTypeName(unit.type)}</span>
                </div>
                <div class="unit-detail">
                    <i class="fas fa-info-circle"></i>
                    <span style="color: ${statusConfig.textColor}; background: ${statusConfig.gradient}; padding: 2px 8px; border-radius: 10px; font-size: 11px;">
                        ${getStatusText(unit.status)}
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

    if (totalUnits) totalUnits.textContent = station.units.length;
    if (operationalUnits) operationalUnits.textContent = operationalCount;
}

function updateHistoryTab(station) {
    const timeline = document.getElementById('history-timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    if (!station.history || station.history.length === 0) {
        timeline.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-history"></i>
                <span>${t('historyEmpty')}</span>
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

        const cleanedTitle = ((event.title || event.event) || '').replace(/\[citation:\d+\]/g, '');
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

function updateFactsTab(station) {
    const factsList = document.getElementById('facts-list');
    if (!factsList) return;
    factsList.innerHTML = '';

    if (!station.facts || station.facts.length === 0) {
        factsList.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-info-circle"></i>
                <span>${t('factsEmpty')}</span>
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

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    const activePane = document.getElementById(`${tabName}-tab`);
    if (activeTab) activeTab.classList.add('active');
    if (activePane) activePane.classList.add('active');
}

// ============================================================
// ФИЛЬТРЫ
// ============================================================
function initFilters() {
    const countries = [...new Set(allStationsData.map(station => station.country.name))].sort();
    const countryFiltersContainer = document.getElementById('country-filters');

    if (countryFiltersContainer) {
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
    }

    const statuses = Object.keys(window.statusConfig);
    const statusFiltersContainer = document.getElementById('status-filters');

    if (statusFiltersContainer) {
        statusFiltersContainer.innerHTML = '';
        statuses.forEach(statusId => {
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = getStatusText(statusId);
            option.dataset.status = statusId;

            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                updateFilters();
            });

            statusFiltersContainer.appendChild(option);
        });
    }

    const types = Object.keys(window.reactorTypes);
    const typeFiltersContainer = document.getElementById('type-filters');

    if (typeFiltersContainer) {
        typeFiltersContainer.innerHTML = '';
        types.forEach(typeId => {
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = getReactorTypeName(typeId);
            option.dataset.type = typeId;

            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                updateFilters();
            });

            typeFiltersContainer.appendChild(option);
        });
    }

    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.querySelectorAll('.filter-option.active').forEach(option => {
                option.classList.remove('active');
            });
            updateFilters();
        });
    }

    const toggleBtn = document.getElementById('toggle-filters-btn');
    const filtersPanel = document.getElementById('filters-panel');

    if (toggleBtn && filtersPanel) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            filtersPanel.classList.toggle('open');
            toggleBtn.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!filtersPanel.contains(e.target) && !toggleBtn.contains(e.target) && e.target !== toggleBtn) {
                filtersPanel.classList.remove('open');
                toggleBtn.classList.remove('active');
            }
        });
    }
}

function updateFilters() {
    activeFilters.countries = Array.from(document.querySelectorAll('#country-filters .filter-option.active'))
        .map(option => option.dataset.country);

    activeFilters.statuses = Array.from(document.querySelectorAll('#status-filters .filter-option.active'))
        .map(option => option.dataset.status);

    activeFilters.types = Array.from(document.querySelectorAll('#type-filters .filter-option.active'))
        .map(option => option.dataset.type);

    updateAllMarkers();

    if (selectedStation && !isStationVisible(selectedStation)) {
        document.getElementById('sidepanel').classList.remove('open');
        selectedStation = null;
        selectedUnit = null;
        clearUnitMarkers();
    }
}

// ============================================================
// ПОИСК
// ============================================================
function initSearch() {
    const searchInput = document.getElementById('station-search');
    const searchResults = document.getElementById('search-results');
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

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    searchInput.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
}

// ============================================================
// ПОДСКАЗКА
// ============================================================
function initTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    const closeButton = document.getElementById('close-tooltip');
    if (!tooltip || !closeButton) return;

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

    map.on('click', () => {
        hideTooltip();
        clearTimeout(tooltipTimeout);
    });
}

function hideTooltip() {
    const tooltip = document.getElementById('floating-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

// ============================================================
// ЧАСЫ
// ============================================================
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

        const hoursEl = document.querySelector('.hours');
        const minutesEl = document.querySelector('.minutes');
        const secondsEl = document.querySelector('.seconds');
        const dateEl = document.getElementById('current-date');

        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
        if (dateEl) dateEl.textContent = dateStr;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// ============================================================
// ПРОВЕРКА ДАННЫХ (диагностика)
// ============================================================
function validateStationsData() {
    if (!Array.isArray(allStationsData) || allStationsData.length === 0) {
        console.error('[МИР АЭС] Данные станций пусты или не загружены. Проверь data.js');
        return;
    }

    let issues = 0;
    allStationsData.forEach(station => {
        if (!station.id) {
            console.warn('[МИР АЭС] Станция без id:', station.name);
            issues++;
        }
        if (!station.units || !Array.isArray(station.units)) {
            console.warn('[МИР АЭС] Нет массива units у станции:', station.name);
            issues++;
        }
        if (station.totalCapacity == null) {
            console.warn('[МИР АЭС] Нет totalCapacity у станции:', station.name);
            issues++;
        }
    });

    if (issues === 0) {
        console.log(`[МИР АЭС] Данные OK: ${allStationsData.length} станций`);
    } else {
        console.warn(`[МИР АЭС] Найдено ${issues} проблем в данных. Смотри предупреждения выше.`);
    }
}

// ============================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================
window.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные
    if (typeof stationsData !== 'undefined') {
        allStationsData = stationsData;
    } else {
        console.error('[МИР АЭС] stationsData не найдена. Проверь data.js');
        allStationsData = [];
    }

    // Пост-обработка
    allStationsData.forEach(station => {
        if (!station.locationCity) {
            station.locationCity = station.location ? station.location.split(',')[0] : '';
        }
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

    // Проверка данных
    validateStationsData();

    // Инициализация
    initLanguageToggle();   // ставит язык ПЕРЕД картой
    initMap();
    initClock();

    // Табы
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchTab(this.dataset.tab);
        });
    });

    // Закрытие панели
    const closePanel = document.getElementById('close-panel');
    if (closePanel) {
        closePanel.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('sidepanel').classList.remove('open');
            selectedStation = null;
            selectedUnit = null;
            clearUnitMarkers();
            updateUnitMarkers();
        });
    }

    // Режимы
    const mapMode = document.getElementById('map-mode');
    const statsMode = document.getElementById('stats-mode');

    if (mapMode) {
        mapMode.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('active');
            if (statsMode) statsMode.classList.remove('active');
        });
    }

    if (statsMode) {
        statsMode.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('active');
            if (mapMode) mapMode.classList.remove('active');
            window.location.href = 'statistics.html';
        });
    }

    console.log('[МИР АЭС] Карта загружена. Язык:', currentLang);
});
