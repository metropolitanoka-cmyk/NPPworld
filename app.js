// Глобальные переменные
let map, stationMarkers = [], unitMarkers = [], currentZoom = 3, selectedStation = null, selectedUnit = null;
let activeFilters = { countries: [], statuses: [], types: [] };
let isDarkTheme = true, allStationsData = [], searchTimeout = null, tooltipTimeout = null;
const photoCache = new Map();

// Конфигурации
window.statusConfig ??= {
    operational: { name: "Работает", color: "#00FF88", gradient: "linear-gradient(135deg, #00FF88, #00CCAA)", textColor: "#000000" },
    stopped: { name: "Остановлен", color: "#FFCC00", gradient: "linear-gradient(135deg, #FFCC00, #FFAA33)", textColor: "#000000" },
    construction: { name: "Строится", color: "#00D1FF", gradient: "linear-gradient(135deg, #00D1FF, #0088FF)", textColor: "#000000" },
    closed: { name: "Закрыт", color: "#AAAAAA", gradient: "linear-gradient(135deg, #AAAAAA, #777777)", textColor: "#000000" },
    abandoned: { name: "Заброшена", color: "#8B4513", gradient: "linear-gradient(135deg, #8B4513, #A0522D)", textColor: "#FFFFFF" },
    accident: { name: "Авария", color: "#FF3366", gradient: "linear-gradient(135deg, #FF3366, #FF0055)", textColor: "#FFFFFF" }
};
window.reactorTypes ??= {
    vver: { name: "ВВЭР", color: "#00D1FF", shape: 'circle' },
    pwr: { name: "PWR", color: "#007BFF", shape: 'circle' },
    bwr: { name: "BWR", color: "#00FF88", shape: 'hexagon' },
    rbmk: { name: "РБМК", color: "#FF3366", shape: 'square' },
    fast: { name: "БН", color: "#FFAA33", shape: 'pentagon' },
    graphite: { name: "Графитовый", color: "#AAAAAA", shape: 'square' }
};

function getStatusConfig(s) { return window.statusConfig[s] || window.statusConfig.operational; }
function getStatusText(s) { return getStatusConfig(s).name; }
function getStatusGradient(s) { return getStatusConfig(s).gradient; }
function getPinColor(s) { return getStatusConfig(s).color; }
function getReactorType(t) { return window.reactorTypes[t] || window.reactorTypes.vver; }
function getReactorShapeClass(t) {
    const shape = getReactorType(t).shape;
    return shape === 'circle' ? 'unit-vver' : shape === 'square' ? 'unit-rbmk' : shape === 'hexagon' ? 'unit-bwr' : shape === 'pentagon' ? 'unit-fast' : 'unit-vver';
}
function getReactorColor(t) { return getReactorType(t).color; }

function initMap() {
    map = L.map('map', {
        center: [50, 30], zoom: 3, minZoom: 1, maxZoom: 18, zoomControl: false,
        fadeAnimation: true, zoomAnimation: true, markerZoomAnimation: true, inertia: true, inertiaDeceleration: 3000
    });
    const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
    const altStreet = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 });
    street.addTo(map);
    document.getElementById('street-layer').classList.add('active');
    const toggleLayer = (btn, layer, others) => {
        btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); others.forEach(l => map.removeLayer(l)); layer.addTo(map); document.querySelectorAll('#street-layer, #satellite-layer').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
    };
    toggleLayer(document.getElementById('street-layer'), street, [satellite, altStreet]);
    toggleLayer(document.getElementById('satellite-layer'), satellite, [street, altStreet]);
    document.getElementById('theme-toggle').addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('light-theme', !isDarkTheme);
        document.body.classList.toggle('dark-theme', isDarkTheme);
        const icon = document.querySelector('#theme-toggle i');
        if (isDarkTheme) { icon.classList.replace('fa-sun', 'fa-moon'); } else { icon.classList.replace('fa-moon', 'fa-sun'); }
        updateStationMarkers(); updateUnitMarkers();
    });
    map.on('zoomend', () => { currentZoom = map.getZoom(); updateAllMarkers(); });
    let moveEndTimer;
    map.on('moveend', () => { clearTimeout(moveEndTimer); moveEndTimer = setTimeout(() => updateAllMarkers(), 100); });
    L.control.zoom({ position: 'topright' }).addTo(map);
    map.on('tileerror', () => { if (map.hasLayer(street)) { map.removeLayer(street); altStreet.addTo(map); } });
    map.on('touchstart', e => { if (e.originalEvent.touches.length > 1) e.originalEvent.preventDefault(); }, { passive: false });
    initFilters(); initSearch(); initTooltip();
    updateStationMarkers();
}

function updateAllMarkers() { updateStationMarkers(); if (currentZoom >= 6) updateUnitMarkers(); else clearUnitMarkers(); }

function createStationPinHTML(status) {
    const color = getPinColor(status);
    return `<div class="station-pin"><div class="pin-head" style="background:${color};"><div class="pin-atom"><div class="pin-core"></div></div></div><div class="pin-stem" style="background:${color};"></div></div>`;
}

function updateStationMarkers() {
    stationMarkers.forEach(item => map.removeLayer(item.marker));
    stationMarkers = [];
    const bounds = map.getBounds();
    allStationsData.forEach(station => {
        if (!isStationVisible(station) || !bounds.contains(station.coords)) return;
        const icon = L.divIcon({ html: createStationPinHTML(station.status), className: 'custom-marker', iconSize: [25, 40], iconAnchor: [12.5, 40] });
        const marker = L.marker(station.coords, { icon, title: station.name, riseOnHover: true }).addTo(map)
            .bindTooltip(`<div style="font-weight:bold;">${station.name}</div><div>${station.country.flag} ${station.country.name}</div><div>${getStatusText(station.status)}</div>`, { direction: 'top', offset: [0, -15], className: 'custom-tooltip', sticky: true });
        marker.on('click', e => { if (e.originalEvent) e.originalEvent.stopPropagation(); selectStation(station); });
        marker.on('touchstart', e => { if (e.originalEvent) e.originalEvent.preventDefault(); });
        stationMarkers.push({ stationId: station.id, marker });
    });
}

function clearUnitMarkers() { unitMarkers.forEach(item => map.removeLayer(item.marker)); unitMarkers = []; }

function updateUnitMarkers() {
    clearUnitMarkers();
    if (currentZoom < 6) return;
    const bounds = map.getBounds();
    allStationsData.forEach(station => {
        if (!isStationVisible(station) || !bounds.contains(station.coords)) return;
        station.units.forEach((unit, idx) => {
            const angle = (idx * (360 / station.units.length)) * Math.PI / 180;
            const offset = 0.015;
            const coords = [station.coords[0] + Math.sin(angle) * offset, station.coords[1] + Math.cos(angle) * offset];
            const status = getStatusConfig(unit.status);
            const reactor = getReactorType(unit.type);
            const html = `<div class="unit-marker ${getReactorShapeClass(unit.type)}" style="background:${status.color}; border-color:${reactor.color};">${unit.model}</div>`;
            const icon = L.divIcon({ html, className: 'custom-marker', iconSize: [45, 45], iconAnchor: [22.5, 22.5] });
            const marker = L.marker(coords, { icon, title: unit.name, riseOnHover: true }).addTo(map)
                .bindTooltip(`<div><b>${unit.name}</b></div><div>${unit.model}</div><div>${status.name}</div><div>${unit.capacity} МВт</div>`, { direction: 'right', offset: [5, 0], className: 'custom-tooltip' });
            marker.on('click', e => { if (e.originalEvent) e.originalEvent.stopPropagation(); selectStation(station); selectUnit(unit); });
            marker.on('touchstart', e => { if (e.originalEvent) e.originalEvent.preventDefault(); });
            unitMarkers.push({ unitId: unit.id, stationId: station.id, marker });
        });
    });
}

function isStationVisible(s) {
    if (activeFilters.countries.length && !activeFilters.countries.includes(s.country.name)) return false;
    if (activeFilters.statuses.length && !activeFilters.statuses.includes(s.status)) return false;
    if (activeFilters.types.length && !s.units.some(u => activeFilters.types.includes(u.type))) return false;
    return true;
}

function loadStationPhoto(id) {
    const container = document.getElementById('station-photo-container');
    const img = document.getElementById('station-photo');
    if (photoCache.has(id)) {
        if (photoCache.get(id)) { img.src = `PhotoNPP/${id}.jpg`; container.style.display = 'block'; }
        else container.style.display = 'none';
        return;
    }
    container.style.display = 'none';
    const temp = new Image();
    temp.onload = () => { photoCache.set(id, true); img.src = `PhotoNPP/${id}.jpg`; container.style.display = 'block'; };
    temp.onerror = () => { photoCache.set(id, false); container.style.display = 'none'; };
    temp.src = `PhotoNPP/${id}.jpg`;
}

function selectStation(station) {
    selectedStation = station; selectedUnit = null;
    document.getElementById('sidepanel').classList.add('open');
    document.getElementById('panel-station-name').textContent = station.name;
    document.getElementById('total-capacity').textContent = station.totalCapacity.toLocaleString();
    document.getElementById('units-count').textContent = station.units.length;
    document.getElementById('panel-country').textContent = `${station.country.name} ${station.country.flag}`;
    document.getElementById('panel-year').textContent = station.startYear;
    document.getElementById('overview-description').textContent = station.overview.replace(/\[citation:\d+\]/g, '');
    document.getElementById('location-text').textContent = station.location || "Информация о ближайшем населённом пункте отсутствует";
    const badge = document.getElementById('panel-status-badge');
    const cfg = getStatusConfig(station.status);
    badge.textContent = cfg.name; badge.style.background = cfg.gradient; badge.style.color = cfg.textColor;
    loadStationPhoto(station.id);
    updateUnitsTab(station); updateHistoryTab(station); updateFactsTab(station);
    switchTab('overview');
    map.flyTo(station.coords, Math.max(currentZoom, 7), { duration: 0.5 });
    updateAllMarkers();
    hideTooltip();
}

function selectUnit(unit) {
    selectedUnit = unit; switchTab('units');
    document.querySelectorAll('.unit-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.unitId === unit.id);
        if (card.dataset.unitId === unit.id) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

function updateUnitsTab(station) {
    const list = document.getElementById('units-list');
    list.innerHTML = '';
    let operational = 0;
    station.units.forEach(unit => {
        if (unit.status === 'operational') operational++;
        const status = getStatusConfig(unit.status);
        const reactor = getReactorType(unit.type);
        const shape = getReactorShapeClass(unit.type);
        const card = document.createElement('div');
        card.className = 'unit-card'; card.dataset.unitId = unit.id; card.style.setProperty('--unit-color', reactor.color);
        card.innerHTML = `<div class="unit-header"><div class="unit-name"><span class="unit-shape ${shape}"></span>${unit.name}</div><div class="unit-type-badge">${unit.model}</div></div>
            <div class="unit-years"><i class="fas fa-play-circle"></i><span>Год пуска: <strong>${unit.startYear}</strong></span>${unit.endYear ? `<i class="fas fa-stop-circle"></i><span>Год остановки: <strong>${unit.endYear}</strong></span>` : ''}</div>
            <div class="unit-details"><div class="unit-detail"><i class="fas fa-bolt"></i><span>${unit.capacity} МВт</span></div>
            <div class="unit-detail"><i class="fas fa-cube"></i><span>${reactor.name}</span></div>
            <div class="unit-detail"><i class="fas fa-info-circle"></i><span style="color:${status.textColor}; background:${status.gradient}; padding:2px 8px; border-radius:10px; font-size:11px;">${status.name}</span></div></div>
            ${unit.details ? `<div class="unit-description" style="margin-top:12px; padding-top:12px; border-top:1px solid var(--border-color); font-size:13px; color:var(--text-secondary);">${unit.details.replace(/\[citation:\d+\]/g, '')}</div>` : ''}`;
        card.addEventListener('click', () => selectUnit(unit));
        list.appendChild(card);
    });
    document.getElementById('total-units').textContent = station.units.length;
    document.getElementById('operational-units').textContent = operational;
}

function updateHistoryTab(station) {
    const timeline = document.getElementById('history-timeline');
    timeline.innerHTML = '';
    if (!station.history?.length) { timeline.innerHTML = `<div class="no-data-message"><i class="fas fa-history"></i><span>Историческая информация отсутствует</span></div>`; return; }
    [...station.history].sort((a,b) => (parseInt(a.year)||0) - (parseInt(b.year)||0)).forEach(e => {
        const el = document.createElement('div'); el.className = 'history-event';
        el.innerHTML = `<div class="event-year"><span class="year-highlight">${e.year}</span> <span class="event-title-highlight">${(e.title||e.event).replace(/\[citation:\d+\]/g, '')}</span></div>${e.description ? `<div class="event-description">${e.description.replace(/\[citation:\d+\]/g, '')}</div>` : ''}`;
        timeline.appendChild(el);
    });
}

function updateFactsTab(station) {
    const facts = document.getElementById('facts-list');
    facts.innerHTML = '';
    if (!station.facts?.length) { facts.innerHTML = `<div class="no-data-message"><i class="fas fa-info-circle"></i><span>Интересные факты отсутствуют</span></div>`; return; }
    station.facts.forEach(f => {
        const div = document.createElement('div'); div.className = 'fact-item';
        div.innerHTML = `<div class="fact-icon-atom"><div class="mini-atom-core"></div><div class="mini-electron"></div></div><div class="fact-text">${f.replace(/\[citation:\d+\]/g, '')}</div>`;
        facts.appendChild(div);
    });
}

function switchTab(name) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${name}"]`).classList.add('active');
    document.getElementById(`${name}-tab`).classList.add('active');
}

function initFilters() {
    const countryDiv = document.getElementById('country-filters');
    [...new Set(allStationsData.map(s => s.country.name))].sort().forEach(c => {
        const opt = document.createElement('div'); opt.className = 'filter-option'; opt.textContent = c; opt.dataset.country = c;
        opt.addEventListener('click', e => { e.stopPropagation(); opt.classList.toggle('active'); updateFilters(); });
        countryDiv.appendChild(opt);
    });
    const statusDiv = document.getElementById('status-filters');
    Object.entries(window.statusConfig).forEach(([id, cfg]) => {
        const opt = document.createElement('div'); opt.className = 'filter-option'; opt.textContent = cfg.name; opt.dataset.status = id;
        opt.addEventListener('click', e => { e.stopPropagation(); opt.classList.toggle('active'); updateFilters(); });
        statusDiv.appendChild(opt);
    });
    const typeDiv = document.getElementById('type-filters');
    Object.entries(window.reactorTypes).forEach(([id, cfg]) => {
        const opt = document.createElement('div'); opt.className = 'filter-option'; opt.textContent = cfg.name; opt.dataset.type = id;
        opt.addEventListener('click', e => { e.stopPropagation(); opt.classList.toggle('active'); updateFilters(); });
        typeDiv.appendChild(opt);
    });
    document.getElementById('reset-filters').addEventListener('click', e => {
        e.stopPropagation(); document.querySelectorAll('.filter-option.active').forEach(o => o.classList.remove('active')); updateFilters();
    });
    const toggle = document.getElementById('toggle-filters-btn'), panel = document.getElementById('filters-panel');
    toggle.addEventListener('click', e => { e.stopPropagation(); panel.classList.toggle('open'); toggle.classList.toggle('active'); });
    document.addEventListener('click', e => { if (!panel.contains(e.target) && !toggle.contains(e.target)) { panel.classList.remove('open'); toggle.classList.remove('active'); } });
}

function updateFilters() {
    activeFilters.countries = Array.from(document.querySelectorAll('#country-filters .filter-option.active')).map(o => o.dataset.country);
    activeFilters.statuses = Array.from(document.querySelectorAll('#status-filters .filter-option.active')).map(o => o.dataset.status);
    activeFilters.types = Array.from(document.querySelectorAll('#type-filters .filter-option.active')).map(o => o.dataset.type);
    updateAllMarkers();
    if (selectedStation && !isStationVisible(selectedStation)) { document.getElementById('sidepanel').classList.remove('open'); selectedStation = null; selectedUnit = null; clearUnitMarkers(); }
}

function initSearch() {
    const input = document.getElementById('station-search'), results = document.getElementById('search-results');
    input.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const q = input.value.trim().toLowerCase();
        results.innerHTML = ''; results.style.display = 'none';
        if (q.length < 2) return;
        searchTimeout = setTimeout(() => {
            const filtered = allStationsData.filter(s => s.name.toLowerCase().includes(q) || (s.locationCity?.toLowerCase().includes(q)));
            if (filtered.length) {
                filtered.forEach(s => {
                    const item = document.createElement('div'); item.className = 'search-result-item';
                    item.innerHTML = `<div class="search-result-name">${s.name}</div><div class="search-result-country">${s.country.flag} ${s.country.name}</div>`;
                    item.addEventListener('click', e => { e.stopPropagation(); selectStation(s); input.value = ''; results.innerHTML = ''; results.style.display = 'none'; });
                    results.appendChild(item);
                });
                results.style.display = 'block';
            }
        }, 300);
    });
    document.addEventListener('click', e => { if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none'; });
    input.addEventListener('touchstart', e => e.stopPropagation());
}

function initTooltip() {
    const tip = document.getElementById('floating-tooltip'), close = document.getElementById('close-tooltip');
    setTimeout(() => tip.style.display = 'flex', 2000);
    tooltipTimeout = setTimeout(hideTooltip, 12000);
    close.addEventListener('click', e => { e.stopPropagation(); hideTooltip(); clearTimeout(tooltipTimeout); });
    map.on('click', () => { hideTooltip(); clearTimeout(tooltipTimeout); });
}
function hideTooltip() { document.getElementById('floating-tooltip').style.display = 'none'; }

function initClock() {
    const update = () => {
        const now = new Date();
        document.querySelector('.hours').textContent = now.getHours().toString().padStart(2,'0');
        document.querySelector('.minutes').textContent = now.getMinutes().toString().padStart(2,'0');
        document.querySelector('.seconds').textContent = now.getSeconds().toString().padStart(2,'0');
        document.getElementById('current-date').textContent = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    };
    update(); setInterval(update, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    allStationsData = stationsData;
    allStationsData.forEach(s => {
        s.locationCity ??= s.location?.split(',')[0] || '';
        s.overview = s.overview?.replace(/\[citation:\d+\]/g, '') || '';
        s.facts = s.facts?.map(f => f.replace(/\[citation:\d+\]/g, '')) || [];
        s.history?.forEach(h => { if (h.title) h.title = h.title.replace(/\[citation:\d+\]/g, ''); if (h.event) h.event = h.event.replace(/\[citation:\d+\]/g, ''); if (h.description) h.description = h.description.replace(/\[citation:\d+\]/g, ''); });
        s.units?.forEach(u => { if (u.details) u.details = u.details.replace(/\[citation:\d+\]/g, ''); });
    });
    initMap(); initClock();
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', e => { e.stopPropagation(); switchTab(tab.dataset.tab); }));
    document.getElementById('close-panel').addEventListener('click', () => {
        document.getElementById('sidepanel').classList.remove('open'); selectedStation = null; selectedUnit = null; clearUnitMarkers(); updateUnitMarkers();
    });
    document.getElementById('map-mode').addEventListener('click', () => { document.getElementById('map-mode').classList.add('active'); document.getElementById('stats-mode').classList.remove('active'); });
    document.getElementById('stats-mode').addEventListener('click', () => { document.getElementById('stats-mode').classList.add('active'); document.getElementById('map-mode').classList.remove('active'); window.location.href = 'statistics.html'; });
});
