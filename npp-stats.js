// ============ КОНФИГУРАЦИЯ ============
const CONFIG = {
    theme: 'dark',
    newsTickerSpeed: 30, // секунд для полного цикла
    matrixDigits: {
        0: [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
        1: [[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
        2: [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
        3: [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
        4: [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
        5: [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
        6: [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
        7: [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
        8: [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
        9: [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]]
    }
};

// ============ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ============
let charts = {};

// ============ ТЕМА ============
function initTheme() {
    const savedTheme = localStorage.getItem('npp-theme') || 'dark';
    CONFIG.theme = savedTheme;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    if (CONFIG.theme === 'dark') {
        document.body.classList.add('light-theme');
        CONFIG.theme = 'light';
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('npp-theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        CONFIG.theme = 'dark';
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('npp-theme', 'dark');
    }
    
    // Обновляем цвета графиков
    if (charts.topCountries) updateChartColors();
}

// ============ МАТРИЧНЫЕ ЧАСЫ ============
function initMatrixClock() {
    document.querySelectorAll('.digit').forEach(digit => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
                const pixel = document.createElement('div');
                pixel.className = 'dot-pixel';
                pixel.dataset.row = row;
                pixel.dataset.col = col;
                digit.appendChild(pixel);
            }
        }
    });
    updateMatrixClock();
    setInterval(updateMatrixClock, 1000);
}

function updateMatrixDigit(digitId, number) {
    const digit = document.querySelector(`.digit-${digitId}`);
    if (!digit) return;
    const pattern = CONFIG.matrixDigits[parseInt(number)] || CONFIG.matrixDigits[0];
    
    digit.querySelectorAll('.dot-pixel').forEach(pixel => {
        const row = parseInt(pixel.dataset.row);
        const col = parseInt(pixel.dataset.col);
        
        if (pattern[row][col] === 1) {
            pixel.classList.add('active');
        } else {
            pixel.classList.remove('active');
        }
    });
}

function updateMatrixClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    updateMatrixDigit('hours-tens', hours[0]);
    updateMatrixDigit('hours-ones', hours[1]);
    updateMatrixDigit('minutes-tens', minutes[0]);
    updateMatrixDigit('minutes-ones', minutes[1]);
    updateMatrixDigit('seconds-tens', seconds[0]);
    updateMatrixDigit('seconds-ones', seconds[1]);
}

// ============ НОВОСТНАЯ ЛЕНТА ============
function initNewsTicker() {
    const news = [
        "После 51 года работы З1 декабря 2025 года была полностью остановлена Билибинская АЭС",
        "Россия начала строительство БРЕСТ-300 — реактора на быстрых нейтронах",
        "Франция объявила о планах по строительству 6 новых реакторов EPR2",
        "США утвердили проект малого модульного реактора NuScale",
        "ОАЭ подключили к сети третий блок АЭС Барака",
        "Великобритания одобрила финансирование Sizewell C",
        "Индия ввела в эксплуатацию реактор PFBR мощностью 500 МВт",
        "Турция готовится к запуску первого блока АЭС Аккую",
        "Казахстан планирует строительство первой АЭС к 2035 году",
        "Египет начал строительство АЭС Эль-Дабаа с российскими реакторами ВВЭР-1200"
    ];
    
    const tickerContainer = document.getElementById('newsTicker');
    const tickerContent = news.map(item => 
        `<div class="ticker-item">${item}</div>`
    ).join('');
    
    // Дублируем контент для бесшовной анимации
    tickerContainer.innerHTML = tickerContent + tickerContent;
    
    // Анимация
    let position = 0;
    setInterval(() => {
        position -= 1;
        if (position <= -tickerContainer.scrollWidth / 2) {
            position = 0;
        }
        tickerContainer.style.transform = `translateX(${position}px)`;
    }, 50);
}

// ============ ДИНАМИЧЕСКИЙ КОНТЕНТ ============
function initDynamicContent() {
    // Ключевые цифры мира
    const worldStats = [
        {
            icon: 'fas fa-reactor',
            title: 'ЯДЕРНЫЕ РЕАКТОРЫ В РАБОТЕ',
            value: '415',
            description: 'Энергоблоков имеют статус <strong>OP (Operational)</strong> по данным системы PRIS МАГАТЭ на 1 января 2026 года.',
            source: 'Источник: PRIS IAEA'
        },
        {
            icon: 'fas fa-bolt',
            title: 'СУММАРНАЯ МОЩНОСТЬ',
            value: '398 <span style="font-size: 30px; color: var(--text-secondary);">ГВт</span>',
            description: 'Установленная мощность-брутто всех действующих (OP) реакторов в мире. Без учета 23 реакторов в статусе приостановленной эксплуатации (SO).',
            source: 'Источник: PRIS IAEA, январь 2026'
        },
        {
            icon: 'fas fa-industry',
            title: 'АТОМНЫХ СТАНЦИЙ',
            value: '172',
            description: 'Количество атомных электростанций в мире, на которых расположены реакторы в статусе OP. Если учесть станции с реакторами в статусе SO, общее число АЭС — 177.',
            source: ''
        },
        {
            icon: 'fas fa-hard-hat',
            title: 'НА СТАДИИ СТРОИТЕЛЬСТВА',
            value: '63',
            description: 'Энергоблока находились в стадии строительства (UC) по данным на 13 января 2026 года. Больше всего строятся в Китае (29 блоков).',
            source: 'Источник: AtomInfo.Ru / PRIS'
        },
        {
            icon: 'fas fa-globe-europe',
            title: 'СТРАН-ОПЕРАТОРОВ',
            value: '31',
            description: 'Страна эксплуатирует атомные энергоблоки. Около 40 стран находятся на разных этапах разработки своих первых ядерных программ.',
            source: ''
        },
        {
            icon: 'fas fa-chart-line',
            title: 'ДОЛЯ В МИРОВОЙ ГЕНЕРАЦИИ',
            value: '~9%',
            description: 'Примерная доля атомной энергетики в мировом производстве электроэнергии по итогам 2024 года. В 2024 году АЭС мира произвели около <strong>2667 ТВт·ч</strong> электроэнергии.',
            source: ''
        }
    ];
    
    const worldStatsHTML = worldStats.map(stat => `
        <div class="stat-card">
            <div class="stat-header">
                <i class="${stat.icon}"></i>
                <h3>${stat.title}</h3>
            </div>
            <div class="stat-value">${stat.value}</div>
            <p>${stat.description}</p>
            ${stat.source ? `<div class="stat-source">${stat.source}</div>` : ''}
        </div>
    `).join('');
    
    document.getElementById('worldStats').innerHTML = worldStatsHTML;
    
    // Сравнение Россия vs Украина
    const countryComparison = [
        {
            icon: 'fas fa-flag',
            title: 'РОССИЯ: СТАБИЛЬНЫЙ СТОЛП',
            value: '~18%',
            color: 'var(--accent-nuclear-green)',
            description: '<strong>Доля в выработке электроэнергии в стране (2024 г.)</strong>. АЭС — основа безуглеродной генерации в европейской части России. Суммарная выработка в 2024 году составила <strong>более 200 ТВт·ч</strong>.',
            details: 'Россия обладает полным циклом компетенций в атомной отрасли и является лидером по строительству АЭС за рубежом.'
        },
        {
            icon: 'fas fa-flag',
            title: 'УКРАИНА: КРИТИЧЕСКАЯ ОСНОВА',
            value: '~55%',
            color: 'var(--accent-hot-yellow)',
            description: '<strong>Оценочная доля в общегодовой выработке</strong>. Одна из самых высоких в мире. После 2014 и особенно 2022 года АЭС стали краеугольным камнем энергобезопасности страны.',
            details: 'Атомная генерация компенсирует потерю угольных и части тепловых мощностей, оставаясь главным стабильным источником электроэнергии.'
        }
    ];
    
    const countryComparisonHTML = countryComparison.map(country => `
        <div class="stat-card">
            <div class="stat-header">
                <i class="${country.icon}"></i>
                <h3>${country.title}</h3>
            </div>
            <div class="stat-value" style="color: ${country.color};">${country.value}</div>
            <p>${country.description}</p>
            <p style="margin-top: 10px;">${country.details}</p>
        </div>
    `).join('');
    
    document.getElementById('countryComparison').innerHTML = countryComparisonHTML;
    
    // Сравнение реакторов
    const reactorComparison = {
        headers: ['ХАРАКТЕРИСТИКА', 'ВВЭР (Водо-Водяной Энергетический Реактор)', 'РБМК (Реактор Большой Мощности Канальный)'],
        rows: [
            ['<strong>Принцип работы</strong>', 'Корпусной реактор. Вода — замедлитель и теплоноситель под давлением (аналог мирового PWR).', 'Канальный реактор. Замедлитель — графит, теплоноситель — кипящая вода в отдельных каналах.'],
            ['<strong>Ключевой коэффициент безопасности</strong>', '<span style="color: var(--accent-nuclear-green);"><strong>Отрицательный</strong></span>. При потере охлаждения и росте пара цепная реакция затухает (саморегуляция).', '<span style="color: var(--accent-critical-red);"><strong>Изначально положительный</strong></span> на некоторых режимах. После Чернобыля все РБМК прошли глубокую модернизацию для устранения этого недостатка.'],
            ['<strong>Защитная оболочка (контейнмент)</strong>', '<span style="color: var(--accent-nuclear-green);">Есть</span>. Прочная герметичная оболочка, сдерживающая выбросы в случае аварии.', '<span style="color: var(--accent-critical-red);">Нет</span> единой оболочки для всего контура. Есть локализующие системы для отдельных каналов.'],
            ['<strong>Перегрузка топлива</strong>', 'Требует остановки реактора.', 'Возможна <span style="color: var(--accent-hot-yellow);">«на ходу»</span> (без полной остановки), что повышает экономическую эффективность.'],
            ['<strong>Современный статус</strong>', 'Основа нового строительства в России и за рубежом (проекты ВВЭР-1200, ВВЭР-ТОИ).', 'Эксплуатируются последние действующие блоки (например, на Ленинградской АЭС). Новые не строятся.']
        ]
    };
    
    const reactorComparisonHTML = `
        <thead>
            <tr>
                ${reactorComparison.headers.map(header => 
                    `<th>${header.includes('ВВЭР') ? '<span class="vver-badge">ВВЭР</span>' : header.includes('РБМК') ? '<span class="rbmk-badge">РБМК</span>' : header}</th>`
                ).join('')}
            </tr>
        </thead>
        <tbody>
            ${reactorComparison.rows.map(row => `
                <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;
    
    document.getElementById('reactorComparison').innerHTML = reactorComparisonHTML;
    
    // Исторические факты
    const historicalFacts = [
        {
            year: '1954: КОД «АТОМ МИРНЫЙ»',
            icon: 'fas fa-key',
            text: '26 июня 1954 года в 17:45 в Обнинске был подан пар на турбину от реактора АМ («Атом мирный»). Так начала работа <strong>первая в мире атомная электростанция</strong> мощностью 5 МВт. Сообщение ТАСС прозвучало только 30 июня, а место строительства было засекречено: уран в документах называли «оловом», реактор — «кристаллизатором».'
        },
        {
            year: '1970-е: ЭРА ГИГАНТОВ',
            icon: 'fas fa-user-astronaut',
            text: 'В это десятилетие началось строительство гигантов атомной энергетики. Например, канадская АЭС «Брюс» (первый блок — 1977 г.), которая сегодня с 8 реакторами PHWR и мощностью 6,478 МВт (нетто) является <strong>крупнейшей действующей АЭС мира</strong>. В СССР в это же время возводились первые энергоблоки с реакторами ВВЭР-1000 и РБМК-1000.'
        },
        {
            year: '2020-е: ВЕК ВОЗРОЖДЕНИЯ',
            icon: 'fas fa-satellite',
            text: 'После аварии на Фукусиме в 2011 году прогнозы были пессимистичными. Однако с 2021 года МАГАТЭ пять раз подряд повышало прогноз роста атомной энергетики. В 2025 году прошел масштабный «Глобальный атомный форум» в Москве с участием более 40 тыс. гостей из 118 стран. Причина — растущий спрос на чистую и надёжную энергию, в том числе для дата-центров и новых технологий.'
        },
        {
            year: '2026+: ДОРОГА К 1000 ГВт',
            icon: 'fas fa-seedling',
            text: 'Согласно оптимистичному, но реализуемому сценарию МАГАТЭ, к 2050 году мировые мощности АЭС могут достичь <strong>992 ГВт</strong> (рост в 2.6 раза). Всемирная ядерная ассоциация также говорит об утроении мощностей. Ключевую роль должны сыграть <strong>малые модульные реакторы (ММР)</strong> и технологии замкнутого ядерного топливного цикла, которые разрабатываются в том числе в России (проект БРЕСТ-300).'
        }
    ];
    
    const historicalFactsHTML = historicalFacts.map(fact => `
        <div class="fact-card">
            <div class="fact-year"><i class="${fact.icon}"></i> ${fact.year}</div>
            <p class="fact-text">${fact.text}</p>
        </div>
    `).join('');
    
    document.getElementById('historicalFacts').innerHTML = historicalFactsHTML;
    
    // Источники
    const sources = [
        'PRIS (Power Reactor Information System) IAEA — база данных МАГАТЭ по всем ядерным реакторам мира. Данные на 1 января 2026 года.',
        'МАГАТЭ (IAEA) — доклад «Оценки в области энергетики, электроэнергетики и ядерной энергетики на период до 2050 года» (45-е издание, сентябрь 2025).',
        'НИЯУ МИФИ / Мемориальный сайт — исторические материалы о пуске и работе первой в мире Обнинской АЭС.',
        'AtomInfo.Ru — независимый информационно-аналитический сайт, публикующий оперативные данные PRIS.',
        'World Nuclear Association (WNA) — материалы и прогнозы, озвученные на Глобальном атомном форуме (WAW-2025).'
    ];
    
    const sourcesHTML = sources.map(source => `
        <div class="source-item">
            <i class="fas fa-check-circle"></i>
            <strong>${source.split(' — ')[0]}</strong> — ${source.split(' — ')[1]}
        </div>
    `).join('');
    
    document.getElementById('sourcesList').innerHTML = sourcesHTML;
}

// ============ ГРАФИКИ ============
function initCharts() {
    // Топ-5 стран по мощности
    const topCtx = document.getElementById('topCountriesChart').getContext('2d');
    charts.topCountries = new Chart(topCtx, {
        type: 'bar',
        data: {
            labels: ['США', 'Франция', 'Китай', 'Россия', 'Южная Корея'],
            datasets: [{
                label: 'Мощность, ГВт',
                data: [94.7, 61.4, 53.2, 29.5, 23.2],
                backgroundColor: [
                    'rgba(255, 204, 0, 0.7)',
                    'rgba(0, 119, 190, 0.7)',
                    'rgba(255, 51, 51, 0.7)',
                    'rgba(77, 255, 136, 0.7)',
                    'rgba(157, 78, 221, 0.7)'
                ],
                borderColor: '#fff',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} ГВт`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: { 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        callback: function(value) { return value + ' ГВт'; } 
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        font: { family: 'Exo 2' } 
                    }
                }
            }
        }
    });
    
    // Прогноз роста мощностей
    const forecastCtx = document.getElementById('forecastChart').getContext('2d');
    charts.forecast = new Chart(forecastCtx, {
        type: 'line',
        data: {
            labels: ['2024', '2030', '2040', '2050'],
            datasets: [
                {
                    label: 'Консервативный сценарий',
                    data: [377, 430, 500, 561],
                    borderColor: CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 0.6)' : 'rgba(0, 102, 204, 0.6)',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 1)' : 'rgba(0, 102, 204, 1)',
                    tension: 0.3
                },
                {
                    label: 'Оптимистичный сценарий МАГАТЭ',
                    data: [377, 520, 780, 992],
                    borderColor: CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.8)' : 'rgba(0, 153, 51, 0.8)',
                    backgroundColor: CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.1)' : 'rgba(0, 153, 51, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    pointBackgroundColor: CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 1)' : 'rgba(0, 153, 51, 1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        font: { family: 'Exo 2' } 
                    } 
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} ГВт`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: { 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        callback: function(value) { return value + ' ГВт'; } 
                    },
                    title: { 
                        display: true, 
                        text: 'Установленная мощность, ГВт', 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a' 
                    }
                },
                x: {
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
                    ticks: { 
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        font: { family: 'Exo 2' } 
                    }
                }
            }
        }
    });
}

function updateChartColors() {
    // Обновляем цвета графиков при смене темы
    if (charts.topCountries) {
        charts.topCountries.options.scales.y.grid.color = CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        charts.topCountries.options.scales.y.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.topCountries.options.scales.x.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.topCountries.update();
    }
    
    if (charts.forecast) {
        const borderColor1 = CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 0.6)' : 'rgba(0, 102, 204, 0.6)';
        const pointColor1 = CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 1)' : 'rgba(0, 102, 204, 1)';
        const borderColor2 = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.8)' : 'rgba(0, 153, 51, 0.8)';
        const pointColor2 = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 1)' : 'rgba(0, 153, 51, 1)';
        const bgColor = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.1)' : 'rgba(0, 153, 51, 0.1)';
        
        charts.forecast.data.datasets[0].borderColor = borderColor1;
        charts.forecast.data.datasets[0].pointBackgroundColor = pointColor1;
        charts.forecast.data.datasets[1].borderColor = borderColor2;
        charts.forecast.data.datasets[1].backgroundColor = bgColor;
        charts.forecast.data.datasets[1].pointBackgroundColor = pointColor2;
        
        charts.forecast.options.scales.y.grid.color = CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        charts.forecast.options.scales.y.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.forecast.options.scales.y.title.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.forecast.options.scales.x.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.forecast.options.scales.x.grid.color = CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        charts.forecast.options.plugins.legend.labels.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        
        charts.forecast.update();
    }
}

// ============ ПРОКРУТКА ============
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ АНИМАЦИЯ ПРИ ЗАГРУЗКЕ ============
function initAnimations() {
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.stat-card, .fact-card, .chart-container').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMatrixClock();
    initNewsTicker();
    initDynamicContent();
    initCharts();
    initScrollTop();
    initAnimations();
    
    // Показываем прогресс-бары с анимацией
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 500);
    
    console.log('🌐 Цифровая панорама АЭС загружена успешно!');
});