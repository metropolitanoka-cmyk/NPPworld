// Конфигурация статусов АЭС (без изменений)
const statusConfig = {
    operational: {
        name: 'Работает',
        gradient: 'linear-gradient(135deg, #00ff9d 0%, #00b894 100%)',
        textColor: '#000',
        pinColor: '#00ff9d'
    },
    stopped: {
        name: 'Остановлен',
        gradient: 'linear-gradient(135deg, #ffd32a 0%, #fdcb6e 100%)',
        textColor: '#000',
        pinColor: '#ffd32a'
    },
    construction: {
        name: 'Строится',
        gradient: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
        textColor: '#fff',
        pinColor: '#0984e3'
    },
    closed: {
        name: 'Закрыт',
        gradient: 'linear-gradient(135deg, #636e72 0%, #b2bec3 100%)',
        textColor: '#fff',
        pinColor: '#636e72'
    },
    abandoned: {
        name: 'Заброшена',
        gradient: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)',
        textColor: '#000',
        pinColor: '#e17055'
    },
    accident: {
        name: 'Авария',
        gradient: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)',
        textColor: '#fff',
        pinColor: '#ff4757'
    }
};

// Типы реакторов (расширенный список)
const reactorTypes = {
    vver: {
        name: 'ВВЭР',
        icon: '⚛',
        color: '#00c3ff',
        shape: 'circle'
    },
    rbmk: {
        name: 'РБМК',
        icon: '☢',
        color: '#ff4757',
        shape: 'square'
    },
    bwr: {
        name: 'BWR',
        icon: '💧',
        color: '#1e90ff',
        shape: 'hexagon'
    },
    pwr: {
        name: 'PWR',
        icon: '⚡',
        color: '#9c88ff',
        shape: 'circle'
    },
    fast: {
        name: 'БН',
        icon: '🚀',
        color: '#ff9f43',
        shape: 'pentagon'
    },
    candu: {
        name: 'CANDU',
        icon: '🇨🇦',
        color: '#00b894',
        shape: 'hexagon'
    },
    phwr: {
        name: 'PHWR',
        icon: '🇮🇳',
        color: '#8e44ad',
        shape: 'triangle'
    },
    gcr: {
        name: 'GCR',
        icon: '🇬🇧',
        color: '#34495e',
        shape: 'diamond'
    },
    ep_r: {
        name: 'EPR',
        icon: '🏗️',
        color: '#e74c3c',
        shape: 'star'
    },
    other: {
        name: 'Другой',
        icon: '🔬',
        color: '#95a5a6',
        shape: 'circle'
    }
};

// ОСНОВНЫЕ ДАННЫЕ АЭС (ПОЛНЫЙ ОБНОВЛЕННЫЙ МАССИВ - НАЧАЛО)
const stationsData = [
    // ==================== РОССИЯ ====================
    {
        id: 1,
        name: "Обнинская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [55.083884, 36.571231],
        status: "closed",
        totalCapacity: 6,
        startYear: 1954,
        overview: "Первая в мире атомная электростанция, подключенная к общей электросети. Работала с 1954 по 2002 год. Сейчас на ее базе создан музей и научно-исследовательский центр.",
        location: "г. Обнинск, Калужская область, Россия",
        city: "Обнинск",
        units: [
            { id: 1, name: "Обнинск-1", type: "other", model: "АМ-1", capacity: 6, status: "closed", startYear: 1954, endYear: 2002 }
        ],
        history: [
            { year: "1951", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой в мире АЭС" },
            { year: "1954", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Первая в мире АЭС подключена к энергосети" },
            { year: "2002", title: "ОСТАНОВКА", description: "Остановка станции после 48 лет работы" }
        ],
        facts: [
            "Первая в мире промышленная АЭС",
            "Мощность составляла всего 6 МВт",
            "Проработала 48 лет",
            "Сейчас является музеем и памятником науки и техники"
        ]
    },
    {
        id: 2,
        name: "Белоярская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [56.8425, 61.3244],
        status: "operational",
        totalCapacity: 1485,
        startYear: 1964,
        overview: "Уникальная атомная станция с реакторами на быстрых нейтронах (БН). Единственная в России и одна из немногих в мире, использующих эту передовую технологию.",
        location: "г. Заречный, Свердловская область, Россия",
        city: "Заречный",
        units: [
			{ id: 1, name: "Белоярская-1", type: "fast", model: "АМБ-100", capacity: 102, status: "closed", startYear: 1964, endYear: 1981 },
            { id: 2, name: "Белоярская-2", type: "fast", model: "АМБ-200", capacity: 160, status: "closed", startYear: 1967, endYear: 1990 },
            { id: 3, name: "Белоярская-3", type: "fast", model: "БН-600", capacity: 600, status: "operational", startYear: 1980 },
            { id: 4, name: "Белоярская-4", type: "fast", model: "БН-800", capacity: 885, status: "operational", startYear: 2015 }
        ],
        history: [
            { year: "1958", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой промышленной АЭС с быстрым реактором" },
            { year: "1964", title: "ПУСК ПЕРВОГО БЛОКА", description: "Запущен первый энергоблок АМБ-100" },
            { year: "2015", title: "НОВЫЙ РЕАКТОР", description: "Ввод в эксплуатацию энергоблока БН-800" }
        ],
        facts: [
            "Единственная в России АЭС с реакторами на быстрых нейтронах",
            "Реакторы БН-600 и БН-800 позволяют эффективно утилизировать отработанное ядерное топливо",
            "Станция является научно-исследовательской площадкой мирового значения"
        ]
    },
    {
        id: 3,
        name: "Нововоронежская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [51.2847, 39.2014],
        status: "operational",
        totalCapacity: 3800,
        startYear: 1964,
        overview: "Одна из старейших действующих атомных станций России, опытная площадка для реакторов ВВЭР. Здесь впервые в мире был запущен энергоблок с водо-водяным реактором.",
        location: "г. Нововоронеж, Воронежская область, Россия",
        city: "Нововоронеж",
        units: [
            { id: 1, name: "НВ-1", type: "vver", model: "ВВЭР-210", capacity: 200, status: "closed", startYear: 1964, endYear: 1984 },
            { id: 2, name: "НВ-2", type: "vver", model: "ВВЭР-365", capacity: 366, status: "closed", startYear: 1969, endYear: 1990 },
			{ id: 3, name: "НВ-3", type: "vver", model: "ВВЭР-440/179", capacity: 400, status: "closed", startYear: 1971, endYear: 2016 },
            { id: 4, name: "НВ-4", type: "vver", model: "ВВЭР-440/179", capacity: 400, status: "operational", startYear: 1972 },
			{ id: 5, name: "НВ-5", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1980 },
            { id: 6, name: "НВ-6", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2016 },
            { id: 7, name: "НВ-7", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2019 }
        ],
        history: [
            { year: "1957", title: "ПРОЕКТ", description: "Решение о строительстве первой промышленной АЭС с ВВЭР" },
            { year: "1964", title: "ПУСК ПЕРВОГО БЛОКА", description: "Запущен первый в мире энергоблок с реактором ВВЭР" },
            { year: "2016", title: "НОВОЕ ПОКОЛЕНИЕ", description: "Ввод в эксплуатацию блока ВВЭР-1200 — первого реактора поколения III+" }
        ],
        facts: [
            "На станции впервые в мире был запущен реактор типа ВВЭР",
            "Служит опытной площадкой для отработки новых технологий",
            "Блок НВ-6 (ВВЭР-1200) — головной в серии реакторов нового поколения"
        ]
    },
    {
        id: 4,
        name: "Кольская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [67.4658, 32.4711],
        status: "operational",
        totalCapacity: 1760,
        startYear: 1973,
        overview: "Самая северная атомная электростанция в Европе. Расположена за Полярным кругом и обеспечивает электроэнергией Мурманскую область.",
        location: "г. Полярные Зори, Мурманская область, Россия",
        city: "Полярные Зори",
        units: [
            { id: 1, name: "Кола-1", type: "vver", model: "ВВЭР-440/230", capacity: 440, status: "operational", startYear: 1973 },
            { id: 2, name: "Кола-2", type: "vver", model: "ВВЭР-440/230", capacity: 440, status: "operational", startYear: 1974 },
            { id: 3, name: "Кола-3", type: "vver", model: "ВВЭР-440/213", capacity: 440, status: "operational", startYear: 1981 },
            { id: 4, name: "Кола-4", type: "vver", model: "ВВЭР-440/213", capacity: 440, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1969", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой в мире АЭС за Полярным кругом" },
            { year: "1973", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2000-е", title: "МОДЕРНИЗАЦИЯ", description: "Проведена глубокая модернизация всех энергоблоков" }
        ],
        facts: [
            "Самая северная АЭС в Европе",
            "Работает в сложных климатических условиях",
            "Обеспечивает более 50% энергопотребления Мурманской области"
        ]
    },
    {
        id: 5,
        name: "Ленинградская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [59.8372, 29.0564],
        status: "operational",
        totalCapacity: 4200,
        startYear: 1973,
        overview: "Крупная атомная станция на берегу Финского залива, снабжающая электроэнергией Санкт-Петербург и Ленинградскую область. Начался процесс замещения старых реакторов РБМК на новые ВВЭР-1200.",
        location: "г. Сосновый Бор, Ленинградская область, Россия",
        city: "Сосновый Бор",
        units: [
            { id: 1, name: "Ленинград-1", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1973, endYear: 2018 },
            { id: 2, name: "Ленинград-2", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1975, endYear: 2020 },
            { id: 3, name: "Ленинград-3", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1979 },
            { id: 4, name: "Ленинград-4", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1981 },
            { id: 5, name: "Ленинград-5 (2-1)", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2018 },
            { id: 6, name: "Ленинград-6 (2-2)", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2022 },
            { id: 7, name: "Ленинград-7 (2-3)", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: undefined },
            { id: 8, name: "Ленинград-8 (2-4)", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: undefined }
        ],
        history: [
            { year: "1967", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой очереди" },
            { year: "1973", title: "ПУСК ПЕРВОГО БЛОКА", description: "Запущен первый реактор РБМК-1000" },
            { year: "2018", title: "ЗАМЕНА МОЩНОСТЕЙ", description: "Введен новый блок ВВЭР-1200 взамен выводимых РБМК" }
        ],
        facts: [
            "Первая в мире АЭС с реакторами РБМК-1000",
            "Блоки №1 и №2 уже выведены из эксплуатации",
            "Новые блоки ВВЭР-1200 соответствуют постфукусимским требованиям безопасности"
        ]
    },
    {
        id: 6,
        name: "Курская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [51.6756, 35.6064],
        status: "operational",
        totalCapacity: 3200,
        startYear: 1976,
        overview: "Крупная атомная электростанция, расположенная в Курчатове Курской области. Первая АЭС с реакторами РБМК-1000. Ведется строительство новой очереди (Курская АЭС-2).",
        location: "г. Курчатов, Курская область, Россия",
        city: "Курчатов",
        units: [
			{ id: 1, name: "Курск-1", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1976, endYear: 2021 },
            { id: 2, name: "Курск-2", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1979, endYear: 2024 },
            { id: 3, name: "Курск-3", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1983 },
            { id: 4, name: "Курск-4", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1985 },
			{ id: 4, name: "Курск-5", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 5, name: "Курск-6", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 6, name: "Курск-7 (2-1)", type: "vver", model: "ВВЭР-TOI", capacity: 1255, status: "operational", startYear: 2026 },
			{ id: 7, name: "Курск-8 (2-2)", type: "vver", model: "ВВЭР-TOI", capacity: 1255, status: "construction", startYear: 2027 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой очереди" },
            { year: "1976", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый энергоблок РБМК-1000 подключен к сети" },
			{ year: "1990-е", title: "ТЕНЬ ЧЕРНОБЫЛЯ", description: "Остановлено строительство 6 блока, строительство 5 - было почти полностью закончено (2012 год), но блок не запустили " },
            { year: "2018", title: "НАЧАЛО НОВОГО", description: "Начало строительства Курской АЭС-2" },
			{ year: "2026", title: "ПУСК", description: "Запущен первый блок Курской АЭС-2" }
        ],
        facts: [
            "Первая в мире АЭС, построенная с реакторами РБМК-1000",
            "Энергоблок №1 был остановлен в 2021 году после 45 лет работы",
            "Строится замена — Курская АЭС-2 с реакторами ВВЭР-TOI"
        ]
    },
    {
        id: 7,
        name: "Смоленская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [54.163760, 33.236344],
        status: "operational",
        totalCapacity: 3000,
        startYear: 1982,
        overview: "Крупная атомная электростанция, одна из последних в России с реакторами типа РБМК-1000. Обеспечивает электроэнергией Центральный регион, включая Москву.",
        location: "г. Десногорск, Смоленская область, Россия",
        city: "Десногорск",
        units: [
            { id: 1, name: "Смоленск-1", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1982 },
            { id: 2, name: "Смоленск-2", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1985 },
            { id: 3, name: "Смоленск-3", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "operational", startYear: 1990 },
			{ id: 4, name: "Смоленск-4", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1982", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока" },
            { year: "1990", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Запущен третий блок" },
			{ year: "1990-е", title: "ТЕНЬ ЧЕРНОБЫЛЯ", description: "Остановлено строительство 4 блока" },
        ],
        facts: [
            "Одна из последних АЭС в России с реакторами РБМК",
            "Прошла масштабную модернизацию безопасности после аварии на Чернобыльской АЭС",
            "Город Десногорск был построен для энергетиков станции"
        ]
    },
    {
        id: 8,
        name: "Калининская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [57.9025, 35.0647],
        status: "operational",
        totalCapacity: 4000,
        startYear: 1984,
        overview: "Калининская атомная электростанция — крупная АЭС в Тверской области, обеспечивающая электроэнергией Центральный регион России. В 2025 году лицензия блока №1 продлена на 19 лет.",
        location: "г. Удомля, Тверская область, Россия",
        city: "Удомля",
        units: [
            { id: 1, name: "Калинин-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1984 },
            { id: 2, name: "Калинин-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1986 },
            { id: 3, name: "Калинин-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2004 },
            { id: 4, name: "Калинин-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2011 }
        ],
        history: [
            { year: "1977", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Принято решение о строительстве Калининской АЭС" },
            { year: "1984", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый энергоблок подключен к единой энергосистеме СССР" },
            { year: "2025", title: "ПРОДЛЕНИЕ ЛИЦЕНЗИИ", description: "Лицензия блока №1 продлена на 19 лет до 2044 года" }
        ],
        facts: [
            "Обеспечивает электроэнергией Москву и Московскую область",
            "Первый блок введен в эксплуатацию в 1984 году",
            "Станция использует реакторы типа ВВЭР-1000",
            "В 2025 году лицензия 1-го блока продлена на 19 лет"
        ]
    },
    {
        id: 9,
        name: "Балаковская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [52.0833, 47.8000],
        status: "operational",
        totalCapacity: 4000,
        startYear: 1985,
        overview: "Крупнейшая атомная электростанция России по выработке электроэнергии. Расположена на левом берегу Саратовского водохранилища.",
        location: "г. Балаково, Саратовская область, Россия",
        city: "Балаково",
        units: [
            { id: 1, name: "Балаково-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1985 },
            { id: 2, name: "Балаково-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1987 },
            { id: 3, name: "Балаково-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1988 },
            { id: 4, name: "Балаково-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1993 }
        ],
        history: [
            { year: "1977", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Заложен первый энергоблок" },
            { year: "1985", title: "ПУСК ПЕРВОГО БЛОКА", description: "Блок №1 подключен к сети" },
            { year: "1993", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Введен в эксплуатацию четвертый блок" }
        ],
        facts: [
            "Вырабатывает более 30 млрд кВт·ч в год",
            "Обеспечивает около 20% электроэнергии Поволжья",
            "Первая АЭС в России, прошедшая международную проверку безопасности"
        ]
    },
    {
        id: 10,
        name: "Ростовская (Волгодонская) АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [47.5972, 42.3569],
        status: "operational",
        totalCapacity: 4030,
        startYear: 2001,
        overview: "Ростовская атомная электростанция — одна из новейших АЭС России, расположенная в Ростовской области на берегу Цимлянского водохранилища.",
        location: "г. Волгодонск, Ростовская область, Россия",
        city: "Волгодонск",
        units: [
            { id: 1, name: "Ростов-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2001 },
            { id: 2, name: "Ростов-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2010 },
            { id: 3, name: "Ростов-3", type: "vver", model: "ВВЭР-1000", capacity: 1015, status: "operational", startYear: 2015 },
            { id: 4, name: "Ростов-4", type: "vver", model: "ВВЭР-1000", capacity: 1015, status: "operational", startYear: 2018 }
        ],
        history: [
            { year: "1977", title: "ПОДГОТОВКА", description: "Начало проектных работ по строительству АЭС" },
            { year: "2001", title: "ПУСК ПЕРВОГО БЛОКА", description: "Введен в эксплуатацию первый энергоблок" },
            { year: "2018", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Запущен четвертый энергоблок, станция вышла на полную мощность" }
        ],
        facts: [
            "Самая южная атомная станция России",
            "Использует воду Цимлянского водохранилища для охлаждения",
            "Четвертый блок стал первым, введенным в эксплуатацию после 2014 года"
        ]
    },
    {
        id: 11,
        name: "Билибинская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [68.0511, 166.5389],
        status: "stopped",
        totalCapacity: 48,
        startYear: 1974,
        overview: "Самая северная и небольшая атомная станция в мире. Расположена в зоне вечной мерзлоты в Чукотском автономном округе. Находится в процессе вывода из эксплуатации.",
        location: "г. Билибино, Чукотский автономный округ, Россия",
        city: "Билибино",
        units: [
            { id: 1, name: "Билибино-1", type: "other", model: "ЭГП-6", capacity: 12, status: "stopped", startYear: 1974, endYear: 2024 },
            { id: 2, name: "Билибино-2", type: "other", model: "ЭГП-6", capacity: 12, status: "stopped", startYear: 1974, endYear: 2024 },
            { id: 3, name: "Билибино-3", type: "other", model: "ЭГП-6", capacity: 12, status: "stopped", startYear: 1975, endYear: 2025 },
            { id: 4, name: "Билибино-4", type: "other", model: "ЭГП-6", capacity: 12, status: "stopped", startYear: 1976, endYear: 2025 }
        ],
        history: [
            { year: "1966", title: "ПРОЕКТ", description: "Решение о строительстве АЭС в условиях вечной мерзлоты" },
            { year: "1974", title: "ПУСК ПЕРВЫХ БЛОКОВ", description: "Ввод в эксплуатацию первых энергоблоков" },
            { year: "2024-2025", title: "ОСТАНОВКА", description: "Поэтапная остановка всех энергоблоков" }
        ],
        facts: [
            "Самая северная и самая маленькая АЭС в мире",
            "Работала в экстремальных климатических условиях",
            "Обеспечивала до 40% электроэнергии изолированной Чаун-Билибинской энергосистемы"
        ]
    },
    {
        id: 12,
        name: "ПАТЭС «Академик Ломоносов»",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [69.7133, 170.3319],
        status: "operational",
        totalCapacity: 70,
        startYear: 2019,
        overview: "Первая в мире плавучая атомная теплоэлектростанция. Предназначена для энергоснабжения отдаленных районов Крайнего Севера и Дальнего Востока.",
        location: "г. Певек, Чукотский автономный округ, Россия",
        city: "Певек",
        units: [
            { id: 1, name: "ПЭБ-1", type: "other", model: "КЛТ-40С", capacity: 35, status: "operational", startYear: 2019 },
            { id: 2, name: "ПЭБ-2", type: "other", model: "КЛТ-40С", capacity: 35, status: "operational", startYear: 2019 }
        ],
        history: [
            { year: "2007", title: "ПРОЕКТ", description: "Начало разработки проекта плавучей АЭС" },
            { year: "2018", title: "СПУСК НА ВОДУ", description: "Плавучий энергоблок доставлен в Мурманск для загрузки топлива" },
            { year: "2019", title: "ПУСК", description: "ПАТЭС подключена к сети в Певеке" }
        ],
        facts: [
            "Первая в мире плавучая атомная электростанция",
            "Заменила выводимые из эксплуатации Билибинскую АЭС и Чаунскую ТЭЦ",
            "Может работать без перезагрузки топлива до 12 лет"
        ]
    },
    {
    id: 13, // Уникальный ID
    name: "Сибирская АЭС",
    country: { name: "Россия", flag: "🇷🇺" },
    coords: [56.647739, 84.904747], // Координаты г. Северск
    status: "closed",
    totalCapacity: 0,
    startYear: 1958,
    overview: "Вторая атомная электростанция в СССР и первая промышленная АЭС в стране. Находилась на промплощадке Сибирского химического комбината (г. Северск, Томская область). Реакторы имели двойное назначение: наработка оружейного плутония и выработка электроэнергии и тепла для Томска и Северска. Остановлена в 2008 году в соответствии с международным соглашением о прекращении производства оружейного плутония[citation:2][citation:10].",
    location: "г. Северск (Томск-7), Томская область, Россия",
    city: "Северск",
    units: [
        { id: 1, name: "ЭИ-2", type: "other", model: "ЭИ-2 (И-2)", capacity: 100, status: "closed", startYear: 1958, endYear: 1990 },
        { id: 2, name: "АДЭ-3", type: "other", model: "АДЭ-3", capacity: 100, status: "closed", startYear: 1961, endYear: 1992 },
        { id: 3, name: "АДЭ-4", type: "other", model: "АДЭ-4", capacity: 100, status: "closed", startYear: 1963, endYear: 2008 },
        { id: 4, name: "АДЭ-5", type: "other", model: "АДЭ-5", capacity: 100, status: "closed", startYear: 1965, endYear: 2008 }
    ],
    history: [
        { year: "1954", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Начало работ на промплощадке Сибирского химического комбината[citation:4]." },
        { year: "1958", title: "ПУСК ПЕРВОГО РЕАКТОРА", description: "В декабре запущен первый двухцелевой реактор ЭИ-2[citation:2]." },
        { year: "1961-1965", title: "ВВОД ОСТАЛЬНЫХ БЛОКОВ", description: "Последовательно введены в эксплуатацию реакторы АДЭ-3, АДЭ-4 и АДЭ-5[citation:7]." },
        { year: "1973", title: "ТЕПЛО ДЛЯ ТОМСКА", description: "Построена тепломагистраль для снабжения теплом города Томска[citation:10]." },
        { year: "2008", title: "ОКОНЧАНИЕ ЭКСПЛУАТАЦИИ", description: "Последние реакторы АДЭ-4 и АДЭ-5 остановлены в апреле и июне соответственно[citation:2]." }
    ],
    facts: [
        "Являлась крупнейшим в мире источником теплоснабжения от АЭС, обеспечивая до 35% тепла для Томска[citation:10].",
        "Прототипом для реакторов АДЭ-4 и АДЭ-5 стал ЭИ-2, они были размещены в одном здании, разделенном бетонной стеной[citation:7].",
        "Запуск первого реактора был показан в видеосюжете на Женевской конференции 1958 года еще до реального энергопуска[citation:4].",
        "Остановка реакторов была частью соглашения между Россией и США о прекращении производства оружейного плутония[citation:2]."
    ]
},
{
    "id": 16,
    "name": "ОДЭК с реактором БРЕСТ-ОД-300",
    "country": { "name": "Россия", "flag": "🇷🇺" },
    "coords": [56.658261, 84.950750],
    "status": "construction",
    "totalCapacity": 300,
    "startYear": 2021,
    "overview": "Первый в мире опытно-демонстрационный энергокомплекс (ОДЭК), призванный замкнуть ядерный топливный цикл на одной площадке. Включает модуль производства топлива (МФР), реактор на быстрых нейтронах БРЕСТ-ОД-300 со свинцовым теплоносителем и модуль переработки ОЯТ. Использует инновационное СНУП-топливо (нитридное уран-плутониевое), которое позволит перерабатывать отходы в новое топливо, исключая необходимость добычи свежего урана[citation:2][citation:3][citation:4].",
    "location": "г. Северск (Томск-7), Томская область, Россия (площадка Сибирского химического комбината)",
    "city": "Северск",
    "units": [
        {
            "id": 1,
            "name": "БРЕСТ-ОД-300",
            "type": "fast",
            "model": "БРЕСТ-ОД-300 (со свинцовым теплоносителем)",
            "capacity": 300,
            "status": "construction",
            "startYear": 2027,
            "endYear": null
        }
    ],
    "history": [
        {
            "year": "2021",
            "title": "НАЧАЛО СТРОИТЕЛЬСТВА",
            "description": "8 июня залит первый бетон в фундамент энергоблока БРЕСТ-ОД-300[citation:2]."
        },
        {
            "year": "2024",
            "title": "ЗАПУСК ТОПЛИВНОГО МОДУЛЯ (МФР)",
            "description": "Введён в эксплуатацию модуль фабрикации/рефабрикации для производства СНУП-топлива."
        },
        {
            "year": "2025",
            "title": "МОНТАЖ КОРПУСА РЕАКТОРА",
            "description": "Установлены все четыре оболочки периферийной полости (декабрь 2025). Корпус реактора собран на 70%[citation:1][citation:3][citation:4]."
        },
        {
            "year": "2027 (план)",
            "title": "ЗАВЕРШЕНИЕ СБОРКИ И ПУСК",
            "description": "Планируется завершить сборку корпуса реактора, сформировать контур циркуляции свинца и провести физпуск[citation:1][citation:3][citation:4]."
        }
    ],
    "facts": [
        "БРЕСТ-ОД-300 — первый в мире реактор на быстрых нейтронах со свинцовым теплоносителем, реализующий принципы естественной безопасности[citation:10].",
        "Корпус реактора собирается непосредственно на стройплощадке из модулей высотой более 15 метров, изготовленных на заводах «Атоммаш» и «Ижора». Общий вес металлоконструкций превышает 1000 тонн[citation:7].",
        "СНУП-топливо производится из обедненного урана и плутония — продуктов переработки отработавшего топлива других АЭС, что замыкает ядерный топливный цикл[citation:2][citation:7]."
    ]
},

    // ==================== ЗАБРОШЕННЫЕ АЭС РОССИИ ====================
    {
        id: 50,
        name: "Татарская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [55.451513, 51.290007],
        status: "abandoned",
        totalCapacity: 4000,
        startYear: null,
        overview: "Недостроенная атомная станция в Татарстане, строительство которой остановлено в 1990 году. Было запланировано 4 блока ВВЭР-1000. Город-спутник — Агидель.",
        location: "пос. Камские Поляны, Татарстан, Россия",
        city: "Агидель",
        units: [
            { id: 1, name: "Татарск-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 2, name: "Татарск-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 3, name: "Татарск-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 4, name: "Татарск-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1980", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Подготовка площадки и закладка первого блока" },
            { year: "1990", title: "ОСТАНОВКА", description: "Строительство заморожено после общественных протестов" },
            { year: "2000", title: "ОФИЦИАЛЬНОЕ ЗАКРЫТИЕ", description: "Проект окончательно отменен" }
        ],
        facts: [
            "На строительство было потрачено около $1,5 млрд в современном эквиваленте",
            "Город Агидель был построен как город-спутник для энергетиков",
            "Сейчас территория используется частично под промышленные нужды"
        ]
    },
    {
        id: 51,
        name: "Центральная (Костромская) АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [58.367034, 41.600118],
        status: "abandoned",
        totalCapacity: 6000,
        startYear: null,
        overview: "Недостроенная атомная станция в Костромской области, которую планировалось оснастить реакторами РБМК-1500. В официальных документах фигурирует как Центральная АЭС. Строительство остановлено в 1990 году.",
        location: "пос. Чистые Боры, Костромская область, Россия",
        city: "Чистые Боры",
        units: [
            { id: 1, name: "Кострома-1", type: "rbmk", model: "РБМК-1500", capacity: 1500, status: "abandoned", startYear: null },
            { id: 2, name: "Кострома-2", type: "rbmk", model: "РБМК-1500", capacity: 1500, status: "abandoned", startYear: null },
            { id: 3, name: "Кострома-3", type: "rbmk", model: "РБМК-1500", capacity: 1500, status: "abandoned", startYear: null },
            { id: 4, name: "Кострома-4", type: "rbmk", model: "РБМК-1500", capacity: 1500, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1979", title: "ПРОЕКТ", description: "Принято решение о строительстве АЭС с реакторами РБМК-1500" },
            { year: "1983", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Заложены первые фундаменты" },
            { year: "1990", title: "ОСТАНОВКА", description: "Работы прекращены после Чернобыльской аварии" }
        ],
        facts: [
            "Единственная АЭС в СССР, где планировались реакторы РБМК-1500 (мощнее чернобыльских)",
            "Город-спутник Чистые Боры до сих пор существует, но без градообразующего предприятия",
            "В 2000-х годах рассматривался проект возрождения станции с ВВЭР, но он не реализован"
        ]
    },
    {
        id: 52,
        name: "Башкирская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [55.884535, 53.994821],
        status: "abandoned",
        totalCapacity: 4000,
        startYear: null,
        overview: "Недостроенная атомная станция в Башкортостане. Строительство начато в 1980-х, остановлено в 1990 году. Планировалось 4 блока ВВЭР-1000.",
        location: "г. Агидель, Башкортостан, Россия",
        city: "Агидель",
        units: [
            { id: 1, name: "Башкирия-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 2, name: "Башкирия-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 3, name: "Башкирия-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 4, name: "Башкирия-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1982", title: "ПОДГОТОВКА", description: "Начало проектных работ и подготовка площадки" },
            { year: "1983", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Закладка первого энергоблока" },
            { year: "1990", title: "ОСТАНОВКА", description: "Строительство прекращено" }
        ],
        facts: [
            "Город Агидель строился как город-спутник для этой АЭС",
            "После остановки строительства город сохранился, но с меньшим населением",
            "Территория частично используется для промышленных нужд"
        ]
    },
    {
        id: 53,
        name: "Воронежская АСТ",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [51.561976, 39.147005],
        status: "abandoned",
        totalCapacity: 1000,
        startYear: null,
        overview: "Недостроенная атомная станция теплоснабжения в Воронеже. Предназначалась для отопления города. Строительство остановлено в 1990 году, сооружения демонтированы.",
        location: "г. Воронеж, Россия",
        city: "Воронеж",
        units: [
            { id: 1, name: "Воронеж АСТ-1", type: "other", model: "АСТ-500", capacity: 500, status: "abandoned", startYear: null },
            { id: 2, name: "Воронеж АСТ-2", type: "other", model: "АСТ-500", capacity: 500, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1983", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции теплоснабжения" },
            { year: "1990", title: "ОСТАНОВКА", description: "Строительство прекращено после общественных протестов" },
            { year: "2010", title: "ДЕМОНТАЖ", description: "Начало демонтажа сооружений станции" }
        ],
        facts: [
            "Первая в СССР АСТ (атомная станция теплоснабжения)",
            "Предназначалась для отопления Воронежа",
            "Вызвала массовые протесты местных жителей",
            "Корпуса реакторов были демонтированы в 2010-х годах"
        ]
    },
    {
        id: 54,
        name: "Горьковская АСТ",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [56.217899, 44.062023],
        status: "abandoned",
        totalCapacity: 1000,
        startYear: null,
        overview: "Недостроенная атомная станция теплоснабжения в Нижнем Новгороде (тогда Горький). Аналогична Воронежской АСТ. Строительство остановлено, сооружения находятся в процессе демонтажа.",
        location: "г. Нижний Новгород, Россия",
        city: "Нижний Новгород",
        units: [
            { id: 1, name: "Горький АСТ-1", type: "other", model: "АСТ-500", capacity: 500, status: "abandoned", startYear: null },
            { id: 2, name: "Горький АСТ-2", type: "other", model: "АСТ-500", capacity: 500, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1982", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции теплоснабжения" },
            { year: "1990", title: "ОСТАНОВКА", description: "Строительство прекращено" },
            { year: "2015", title: "ДЕМОНТАЖ", description: "Начало работ по демонтажу сооружений" }
        ],
        facts: [
            "Вторая АСТ в СССР после Воронежской",
            "Предназначалась для отопления Нижнего Новгорода",
            "Строительство остановлено на ранней стадии",
            "Сооружения постепенно демонтируются"
        ]
    },
    {
        id: 55,
        name: "Южно-Уральская АЭС",
        country: { name: "Россия", flag: "🇷🇺" },
        coords: [55.742489, 60.891124],
        status: "abandoned",
        totalCapacity: 2400,
        startYear: null,
        overview: "Недостроенная атомная станция в Челябинской области. Планировалась как первая АЭС с реакторами на быстрых нейтронах БН-800. Строительство остановлено в 1993 году.",
        location: "пос. Метлино, Челябинская область, Россия",
        city: "Озёрск",
        units: [
            { id: 1, name: "ЮУАЭС-1", type: "fast", model: "БН-800", capacity: 800, status: "abandoned", startYear: null },
            { id: 2, name: "ЮУАЭС-2", type: "fast", model: "БН-800", capacity: 800, status: "abandoned", startYear: null },
            { id: 3, name: "ЮУАЭС-3", type: "fast", model: "БН-800", capacity: 800, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1982", title: "ПРОЕКТ", description: "Принято решение о строительстве АЭС с реакторами БН-800" },
            { year: "1984", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Подготовка площадки" },
            { year: "1993", title: "ОСТАНОВКА", description: "Строительство прекращено из-за недостатка финансирования" }
        ],
        facts: [
            "Планировалась как первая АЭС с реакторами БН-800",
            "Реакторы на быстрых нейтронах позволяют эффективнее использовать ядерное топливо",
            "Технология БН-800 была позже реализована на Белоярской АЭС",
            "Планов по возобновлению строительства нет"
        ]
    },

 
    {
        id: 100,
        name: "Запорожская АЭС",
        country: { name: "-", flag: "-" },
        coords: [47.5106, 34.5856],
        status: "stopped",
        totalCapacity: 6000,
        startYear: 1984,
        overview: "Крупнейшая атомная электростанция в Европе. Из-за боевых действий временно оставновлены все блоки с 2022 года.",
        location: "г. Энергодар, Запорожская область",
        city: "Энергодар",
        units: [
            { id: 1, name: "Запорожье-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1984 },
            { id: 2, name: "Запорожье-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1985 },
            { id: 3, name: "Запорожье-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1986 },
            { id: 4, name: "Запорожье-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1987 },
            { id: 5, name: "Запорожье-5", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1989 },
            { id: 6, name: "Запорожье-6", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "stopped", startYear: 1995 }
        ],
        history: [
            { year: "1980", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1984", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый энергоблок подключен к сети" },
            { year: "2022", title: "ВОЕННЫЕ ДЕЙСТВИЯ", description: "Станция остановлена из-за военных действий." }
        ],
        facts: [
            "Крупнейшая АЭС в Европе по установленной мощности",
            "Производила около 20% электроэнергии Украины",
            "С 2022 года находится в зоне боевых действий",
            "Неоднократно отключалась от энергосистемы из-за повреждений ЛЭП"
        ]
    },
    {
        id: 101,
        name: "Южно-Украинская АЭС",
        country: { name: "Украина", flag: "🇺🇦" },
        coords: [47.8183, 31.2219],
        status: "operational",
        totalCapacity: 3000,
        startYear: 1982,
        overview: "Атомная электростанция на юге Украины, входит в состав Южно-Украинского энергетического комплекса вместе с гидроаккумулирующей и гидроэлектростанцией.",
        location: "г. Южноукраинск, Николаевская область, Украина",
        city: "Южноукраинск",
        units: [
            { id: 1, name: "ЮУАЭС-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1982 },
            { id: 2, name: "ЮУАЭС-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1985 },
            { id: 3, name: "ЮУАЭС-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1989 }
        ],
        history: [
            { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1982", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока" },
            { year: "1989", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Запущен третий блок" }
        ],
        facts: [
            "Входит в состав единого энергокомплекса с ГАЭС и ГЭС",
            "Обеспечивает электроэнергией южные регионы Украины",
            "Станция имеет современные системы безопасности"
        ]
    },
    {
        id: 102,
        name: "Ровенская АЭС",
        country: { name: "Украина", flag: "🇺🇦" },
        coords: [51.3269, 25.8919],
        status: "operational",
        totalCapacity: 2835,
        startYear: 1980,
        overview: "Атомная электростанция на северо-западе Украины, также известная как АЭС Кузнецовск.",
        location: "г. Кузнецовск, Ривненская область, Украина",
        city: "Кузнецовск",
        units: [
            { id: 1, name: "Ривне-1", type: "vver", model: "ВВЭР-440", capacity: 420, status: "operational", startYear: 1980 },
            { id: 2, name: "Ривне-2", type: "vver", model: "ВВЭР-440", capacity: 415, status: "operational", startYear: 1981 },
            { id: 3, name: "Ривне-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1986 },
            { id: 4, name: "Ривне-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2004 }
        ],
        history: [
            { year: "1973", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1980", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока ВВЭР-440" },
            { year: "2004", title: "ПУСК ЧЕТВЕРТОГО БЛОКА", description: "Четвертый блок подключен к сети" }
        ],
        facts: [
            "Первая АЭС с реакторами ВВЭР-440 в Украине",
            "Блок №4 был достроен и введен в 2004 году после долгого простоя",
            "Станция обеспечивает электроэнергией северо-западные регионы Украины"
        ]
    },
    {
        id: 103,
        name: "Хмельницкая АЭС",
        country: { name: "Украина", flag: "🇺🇦" },
        coords: [50.3078, 26.6425],
        status: "operational",
        totalCapacity: 2000,
        startYear: 1987,
        overview: "Атомная электростанция на западе Украины. Первые два блока введены в эксплуатацию, блоки 3-4 законсервированы.",
        location: "г. Нетешин, Хмельницкая область, Украина",
        city: "Нетешин",
        units: [
            { id: 1, name: "Хмельницкий-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 1987 },
            { id: 2, name: "Хмельницкий-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2004 },
            { id: 3, name: "Хмельницкий-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 4, name: "Хмельницкий-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1981", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1987", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока" },
            { year: "2004", title: "ПУСК ВТОРОГО БЛОКА", description: "Второй блок подключен к сети после долгого простоя" }
        ],
        facts: [
            "Блок №2 был достроен и введен в эксплуатацию только в 2004 году",
            "Блоки №3 и №4 законсервированы с готовностью 75% и 28%",
            "Станция обеспечивает электроэнергией западные регионы Украины"
        ]
    },
    {
        id: 104,
        name: "Крымская АЭС",
        country: { name: "-", flag: "" },
        coords: [45.390946, 35.803343],
        status: "abandoned",
        totalCapacity: 2000,
        startYear: null,
        overview: "Недостроенная атомная электростанция в Крыму, строительство которой было остановлено после Чернобыльской аварии. Готовность первого блока составляла около 80%. Ядерное топливо никогда не завозилось.",
        location: "г. Щёлкино, Крым",
        city: "Щёлкино",
        units: [
            { id: 1, name: "Крым-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 2, name: "Крым-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1975", title: "ПОДГОТОВКА", description: "Начало проектных работ" },
            { year: "1982", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Заложен первый энергоблок" },
            { year: "1987", title: "ОСТАНОВКА", description: "Строительство прекращено после Чернобыльской аварии" }
        ],
        facts: [
            "Самый известный «атомный призрак» СССР",
            "В 1990-х годах на территории станции проводился фестиваль «КаZантип»",
            "Ядерное топливо никогда не завозилось, радиационной опасности нет",
            "Оборудование постепенно разворовывалось на металлолом"
        ]
    },
    {
        id: 105,
        name: "Чернобыльская АЭС",
        country: { name: "Украина", flag: "🇺🇦" },
        coords: [51.389, 30.099],
        status: "accident",
        totalCapacity: 6000,
        startYear: 1977,
        overview: "Печально известная атомная станция, на которой в 1986 году произошла крупнейшая в истории авария. Четвертый блок был полностью разрушен, остальные остановлены в последующие годы.",
        location: "г. Припять, Киевская область, Украина",
        city: "Припять",
        units: [
            { id: 1, name: "Чернобыль-1", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1977, endYear: 1996 },
            { id: 2, name: "Чернобыль-2", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1978, endYear: 1991 },
            { id: 3, name: "Чернобыль-3", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "closed", startYear: 1981, endYear: 2000 },
            { id: 4, name: "Чернобыль-4", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "accident", startYear: 1983, endYear: 1986 },
	    { id: 5, name: "Чернобыль-5", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "abandoned", startYear: null },
            { id: 6, name: "Чернобыль-6", type: "rbmk", model: "РБМК-1000", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1977", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию блока №1" },
            { year: "1986", title: "КАТАСТРОФА", description: "Взрыв и пожар на четвертом блоке 26 апреля" },
            { year: "2016", title: "НОВЫЙ САРКОФАГ", description: "Установка нового защитного укрытия (Арка)" }
        ],
        facts: [
            "Авария 1986 года привела к выбросу радиоактивных материалов на огромную территорию",
            "Город Припять был полностью эвакуирован и остается заброшенным",
            "Саркофаг «Арка» — крупнейшая подвижная наземная конструкция в мире",
            "Зона отчуждения стала уникальным природным заповедником",
	    "Блоки 5 и 6 находились в стадии строительства на момент аварии"
        ]
    },

    // ==================== БЕЛАРУСЬ ====================
    {
        id: 150,
        name: "Белорусская АЭС",
        country: { name: "Беларусь", flag: "🇧🇾" },
        coords: [54.7622, 26.0942],
        status: "operational",
        totalCapacity: 2400,
        startYear: 2020,
        overview: "Первая атомная электростанция в Беларуси, построенная по российскому проекту. Состоит из двух блоков ВВЭР-1200.",
        location: "г. Островец, Гродненская область, Беларусь",
        city: "Островец",
        units: [
            { id: 1, name: "Беларусь-1", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2020 },
            { id: 2, name: "Беларусь-2", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "operational", startYear: 2023 }
        ],
        history: [
            { year: "2011", title: "СОГЛАШЕНИЕ", description: "Подписание межправительственного соглашения с Россией" },
            { year: "2013", title: "ПОДГОТОВКА ПЛОЩАДКИ", description: "Начало подготовительных работ" },
            { year: "2020", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока" },
            { year: "2023", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок подключен к сети" }
        ],
        facts: [
            "Первая АЭС в Беларуси",
            "Станция построена по российскому проекту ВВЭР-1200",
            "Покрывает около 40% потребностей страны в электроэнергии",
            "Проект вызвал обеспокоенность в Литве из-за близости к границе"
        ]
    },

    // ==================== АРМЕНИЯ ====================
    {
        id: 200,
        name: "Армянская АЭС",
        country: { name: "Армения", flag: "🇦🇲" },
        coords: [40.1825, 44.1428],
        status: "operational",
        totalCapacity: 815,
        startYear: 1976,
        overview: "Атомная электростанция в Армении. Первый блок закрыт после Спитакского землетрясения 1988 года. Второй блок модернизирован и продолжает работу.",
        location: "г. Мецамор, Армавирская область, Армения",
        city: "Мецамор",
        units: [
            { id: 1, name: "Армения-1", type: "vver", model: "ВВЭР-440", capacity: 407.5, status: "closed", startYear: 1976, endYear: 1989 },
            { id: 2, name: "Армения-2", type: "vver", model: "ВВЭР-440", capacity: 407.5, status: "operational", startYear: 1980 }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1976", title: "ПУСК ПЕРВОГО БЛОКА", description: "Ввод в эксплуатацию первого энергоблока" },
            { year: "1988", title: "ЗЕМЛЕТРЯСЕНИЕ", description: "Спитакское землетрясение, станция остановлена" },
            { year: "1995", title: "РЕСТАРТ", description: "Второй блок повторно введен в эксплуатацию после модернизации" }
        ],
        facts: [
            "Расположена в сейсмически активной зоне",
            "После землетрясения 1988 года была остановлена, но затем перезапущена",
            "Обеспечивает около 40% электроэнергии Армении",
            "Планируется строительство нового блока"
        ]
    },

    // ==================== ЛИТВА ====================
    {
        id: 250,
        name: "Игналинская АЭС",
        country: { name: "Литва", flag: "🇱🇹" },
        coords: [55.602, 26.557],
        status: "closed",
        totalCapacity: 2770,
        startYear: 1983,
        overview: "Крупная атомная электростанция в Литве с реакторами типа РБМК-1500 (модификация чернобыльских РБМК-1000). Закрыта по требованию Евросоюза при вступлении Литвы в ЕС.",
        location: "г. Висагинас, Литва",
        city: "Висагинас",
        units: [
            { id: 1, name: "Игналина-1", type: "rbmk", model: "РБМК-1500", capacity: 1385, status: "closed", startYear: 1983, endYear: 2004 },
            { id: 2, name: "Игналина-2", type: "rbmk", model: "РБМК-1500", capacity: 1385, status: "closed", startYear: 1987, endYear: 2009 }
        ],
        history: [
            { year: "1978", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1983", title: "ПУСК ПЕРВОГО БЛОКА", description: "Введен в эксплуатацию первый энергоблок" },
            { year: "2004", title: "ЗАКРЫТИЕ-1", description: "Закрытие первого блока по требованию ЕС" },
            { year: "2009", title: "ПОЛНОЕ ЗАКРЫТИЕ", description: "Закрытие второго блока, остановка станции" }
        ],
        facts: [
            "Имела самые мощные реакторы РБМК в мире (1500 МВт)",
            "Обеспечивала до 70% электроэнергии Литвы",
            "Закрыта по политическим причинам при вступлении в ЕС",
            "Демонтаж займет до 2038 года"
        ]
    },

    // ==================== ГЕРМАНИЯ ====================
        // ==================== ГЕРМАНИЯ ====================
    {
        id: 300,
        name: "АЭС Штендаль",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [52.723306, 12.018088],
        status: "abandoned",
        totalCapacity: 2600,
        startYear: null,
        overview: "Недостроенная атомная станция в бывшей ГДР. Строительство остановлено после объединения Германии из-за отказа от ядерной энергетики.",
        location: "г. Штендаль, земля Саксония-Анхальт, Германия",
        city: "Штендаль",
        units: [
            { id: 1, name: "Stendal-1", type: "vver", model: "ВВЭР-1000", capacity: 1300, status: "abandoned", startYear: null },
            { id: 2, name: "Stendal-2", type: "vver", model: "ВВЭР-1000", capacity: 1300, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1979", title: "ПЛАНИРОВАНИЕ", description: "Решение о строительстве АЭС в ГДР" },
            { year: "1982", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Заливка первого бетона" },
            { year: "1991", title: "ОСТАНОВКА", description: "Проект отменен после объединения Германии" }
        ],
        facts: [
            "Два недостроенных блока ВВЭР-1000 советского проекта",
            "Часть оборудования была демонтирована, часть продана в другие страны",
            "На месте станции сейчас расположена газовая электростанция"
        ]
    },

    // ==================== США ====================
    {
        id: 400,
        name: "АЭС Пало-Верде",
        country: { name: "США", flag: "🇺🇸" },
        coords: [33.3889, -112.8619],
        status: "operational",
        totalCapacity: 3937,
        startYear: 1986,
        overview: "Крупнейшая атомная электростанция в США по выработке электроэнергии и единственная, не расположенная рядом с крупным водоемом — использует очищенные сточные воды для охлаждения[citation:7].",
        location: "штат Аризона, США",
        city: "Уинтерсберг",
        units: [
            { id: 1, name: "Пало-Верде-1", type: "pwr", model: "M312", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 2, name: "Пало-Верде-2", type: "pwr", model: "M312", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 3, name: "Пало-Верде-3", type: "pwr", model: "M312", capacity: 1313, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1976", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Старт строительства в пустыне Сонора" },
            { year: "1986", title: "ПУСК ПЕРВЫХ БЛОКОВ", description: "Блоки 1 и 2 подключены к сети" },
            { year: "1988", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Третий блок введен в эксплуатацию" }
        ],
        facts: [
            "Самая мощная АЭС в США[citation:7]",
            "Работает в пустыне, используя очищенные сточные воды городов Феникс и Меса",
            "Вырабатывает электроэнергию для более чем 4 миллионов человек"
        ]
    },
    {
        id: 401,
        name: "АЭС Брейдвуд",
        country: { name: "США", flag: "🇺🇸" },
        coords: [41.2428, -88.2267],
        status: "operational",
        totalCapacity: 2360,
        startYear: 1988,
        overview: "Одна из новейших атомных станций в США, расположена в Иллинойсе.",
        location: "Брейдвуд, Иллинойс, США",
        city: "Брейдвуд",
        units: [
            { id: 1, name: "Брейдвуд-1", type: "pwr", model: "W 4-loop", capacity: 1180, status: "operational", startYear: 1988 },
            { id: 2, name: "Брейдвуд-2", type: "pwr", model: "W 4-loop", capacity: 1180, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1975", title: "ПРОЕКТ", description: "Начало планирования" },
            { year: "1988", title: "ПУСК", description: "Оба блока подключены к сети" }
        ],
        facts: [
            "Имеет разрешение на работу до 2046-2047 гг."
        ]
    },
    {
        id: 402,
        name: "АЭС Три-Майл-Айленд",
        country: { name: "США", flag: "🇺🇸" },
        coords: [40.1519, -76.7236],
        status: "accident",
        totalCapacity: 0,
        startYear: 1974,
        overview: "Печально известная аварией 1979 года. Блок 1 остановлен в 2019 году по экономическим причинам[citation:5][citation:6].",
        location: "штат Пенсильвания, США",
        city: "Лондондерри",
        units: [
            { id: 1, name: "TMI-1", type: "pwr", model: "B&W", capacity: 819, status: "closed", startYear: 1974, endYear: 2019 },
            { id: 2, name: "TMI-2", type: "pwr", model: "B&W", capacity: 906, status: "accident", startYear: 1978, endYear: 1979 }
        ],
        history: [
            { year: "1974", title: "ПУСК БЛОКА-1", description: "Блок 1 подключен к сети" },
            { year: "1979", title: "АВАРИЯ", description: "Частичное расплавление активной зоны на блоке 2 (уровень 5 по INES)[citation:5]" },
            { year: "2019", title: "ЗАКРЫТИЕ", description: "Остановка блока 1 по экономическим причинам" }
        ],
        facts: [
            "Крупнейшая авария в истории коммерческой атомной энергетики США",
            "Блок 2 выведен из эксплуатации, топливо выгружено",
            "Блок 1 остановлен досрочно из-за конкуренции с дешевым газом"
        ]
    },
    // ==================== КАНАДА ====================
    {
        id: 450,
        name: "АЭС Брюс",
        country: { name: "Канада", flag: "🇨🇦" },
        coords: [44.3269, -81.6008],
        status: "operational",
        totalCapacity: 4693,
        startYear: 1977,
        overview: "Крупнейшая атомная электростанция Канады и одна из самых мощных в мире по установленной мощности. Состоит из 8 реакторов типа CANDU[citation:7].",
        location: "озеро Гурон, Онтарио, Канада",
        city: "Брюс",
        units: [
            { id: 1, name: "Брюс-1", type: "candu", model: "CANDU 791", capacity: 786, status: "operational", startYear: 1977 },
            { id: 2, name: "Брюс-2", type: "candu", model: "CANDU 791", capacity: 786, status: "operational", startYear: 1977 },
            { id: 3, name: "Брюс-3", type: "candu", model: "CANDU 750A", capacity: 786, status: "operational", startYear: 1978 },
            { id: 4, name: "Брюс-4", type: "candu", model: "CANDU 750A", capacity: 786, status: "operational", startYear: 1979 },
            { id: 5, name: "Брюс-5", type: "candu", model: "CANDU 750B", capacity: 817, status: "operational", startYear: 1985 },
            { id: 6, name: "Брюс-6", type: "candu", model: "CANDU 750B", capacity: 817, status: "operational", startYear: 1984 },
            { id: 7, name: "Брюс-7", type: "candu", model: "CANDU 750B", capacity: 817, status: "operational", startYear: 1986 },
            { id: 8, name: "Брюс-8", type: "candu", model: "CANDU 750B", capacity: 817, status: "operational", startYear: 1987 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой очереди" },
            { year: "1977", title: "ПУСК", description: "Первые блоки подключены к сети" },
            { year: "2010-е", title: "МОДЕРНИЗАЦИЯ", description: "Масштабная программа модернизации и продления срока службы" }
        ],
        facts: [
            "Вторая по мощности АЭС в Северной Америке[citation:7]",
            "Производит около 30% электроэнергии Онтарио",
            "На станции проводится крупнейшая в мире программа модернизации ядерных реакторов"
        ]
    },
    {
        id: 451,
        name: "АЭС Пикеринг",
        country: { name: "Канада", flag: "🇨🇦" },
        coords: [43.8111, -79.0714],
        status: "operational",
        totalCapacity: 3100,
        startYear: 1971,
        overview: "Одна из старейших атомных станций Канады, расположенная на берегу озера Онтарио недалеко от Торонто.",
        location: "Пикеринг, Онтарио, Канада",
        city: "Пикеринг",
        units: [
            { id: 1, name: "Пикеринг-1", type: "candu", model: "CANDU 500", capacity: 515, status: "operational", startYear: 1971 },
            { id: 2, name: "Пикеринг-2", type: "candu", model: "CANDU 500", capacity: 515, status: "operational", startYear: 1971 },
            { id: 3, name: "Пикеринг-3", type: "candu", model: "CANDU 500", capacity: 515, status: "operational", startYear: 1972 },
            { id: 4, name: "Пикеринг-4", type: "candu", model: "CANDU 500", capacity: 515, status: "operational", startYear: 1973 },
            { id: 5, name: "Пикеринг-5", type: "candu", model: "CANDU 500", capacity: 516, status: "operational", startYear: 1983 },
            { id: 6, name: "Пикеринг-6", type: "candu", model: "CANDU 500", capacity: 516, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1966", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1971", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "1997", title: "ОСТАНОВКА", description: "Блоки 2 и 3 остановлены" },
            { year: "2003", title: "РЕСТАРТ", description: "Блоки 2 и 3 повторно введены в эксплуатацию" }
        ],
        facts: [
            "Обеспечивает около 15% потребностей Онтарио в электроэнергии",
            "Часть блоков была остановлена в 1997 г., но позже перезапущена",
            "Планируется постепенное закрытие в 2024-2026 гг."
        ]
    },
    // ==================== ФРАНЦИЯ ====================
    {
        id: 500,
        name: "АЭС Гравелин",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [51.0156, 2.1358],
        status: "operational",
        totalCapacity: 5460,
        startYear: 1980,
        overview: "Крупнейшая атомная электростанция Франции по установленной мощности[citation:7].",
        location: "Гравелин, О-де-Франс, Франция",
        city: "Гравелин",
        units: [
            { id: 1, name: "Гравелин-1", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1980 },
            { id: 2, name: "Гравелин-2", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1980 },
            { id: 3, name: "Гравелин-3", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1980 },
            { id: 4, name: "Гравелин-4", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1981 },
            { id: 5, name: "Гравелин-5", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1984 },
            { id: 6, name: "Гравелин-6", type: "pwr", model: "CP2", capacity: 910, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1980", title: "ПУСК", description: "Первые блоки подключены к сети" },
            { year: "1985", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Ввод последнего блока" }
        ],
        facts: [
            "Самая мощная АЭС Франции[citation:7]",
            "Расположена на берегу Северного моря, использует морскую воду для охлаждения",
            "Производит около 10% всей атомной электроэнергии Франции"
        ]
    },
    {
        id: 501,
        name: "АЭС Палюэль",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [49.8567, 0.6361],
        status: "operational",
        totalCapacity: 5320,
        startYear: 1984,
        overview: "Одна из крупнейших АЭС Франции, расположенная на побережье Ла-Манша[citation:7].",
        location: "Палюэль, Нормандия, Франция",
        city: "Палюэль",
        units: [
            { id: 1, name: "Палюэль-1", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1984 },
            { id: 2, name: "Палюэль-2", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1984 },
            { id: 3, name: "Палюэль-3", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1985 },
            { id: 4, name: "Палюэль-4", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1977", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1984", title: "ПУСК", description: "Ввод первых блоков" },
            { year: "1986", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Станция вышла на полную мощность" }
        ],
        facts: [
            "Одна из самых мощных АЭС Франции[citation:7]",
            "Градирни высотой 178 метров являются заметными ориентирами на побережье",
            "Обеспечивает электроэнергией около 2 миллионов домохозяйств"
        ]
    },
    {
        id: 502,
        name: "АЭС Каттеном",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [49.415, 6.2333],
        status: "operational",
        totalCapacity: 5200,
        startYear: 1986,
        overview: "Крупная атомная станция в Гранд-Эст, Франция. Знаменита использованием градирен, которые видны из соседних стран[citation:7].",
        location: "Каттеном, Гранд-Эст, Франция",
        city: "Каттеном",
        units: [
            { id: 1, name: "Каттеном-1", type: "pwr", model: "P4", capacity: 1300, status: "operational", startYear: 1986 },
            { id: 2, name: "Каттеном-2", type: "pwr", model: "P4", capacity: 1300, status: "operational", startYear: 1987 },
            { id: 3, name: "Каттеном-3", type: "pwr", model: "P4", capacity: 1300, status: "operational", startYear: 1990 },
            { id: 4, name: "Каттеном-4", type: "pwr", model: "P4", capacity: 1300, status: "operational", startYear: 1991 }
        ],
        history: [
            { year: "1979", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1986", title: "ПУСК", description: "Ввод первого блока" },
            { year: "1991", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Станция вышла на полную мощность" }
        ],
        facts: [
            "Одна из самых мощных АЭС Франции[citation:7]",
            "Градирни высотой 167 метров являются самыми высокими в Европе",
            "Вырабатывает около 40 млрд кВт·ч в год"
        ]
    },
    // ==================== ЯПОНИЯ ====================
    {
        id: 550,
        name: "АЭС Касивадзаки-Карива",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [37.4258, 138.6],
        status: "stopped",
        totalCapacity: 7965,
        startYear: 1985,
        overview: "Крупнейшая в мире атомная электростанция по установленной мощности. После аварии на Фукусиме все реакторы были остановлены и проходят проверки на соответствие новым стандартам безопасности[citation:1][citation:7].",
        location: "Касивадзаки, Ниигата, Япония",
        city: "Касивадзаки",
        units: [
            { id: 1, name: "Касивадзаки-1", type: "bwr", model: "BWR-5", capacity: 1067, status: "stopped", startYear: 1985 },
            { id: 2, name: "Касивадзаки-2", type: "bwr", model: "BWR-5", capacity: 1067, status: "stopped", startYear: 1990 },
            { id: 3, name: "Касивадзаки-3", type: "bwr", model: "BWR-5", capacity: 1067, status: "stopped", startYear: 1993 },
            { id: 4, name: "Касивадзаки-4", type: "bwr", model: "BWR-5", capacity: 1067, status: "stopped", startYear: 1994 },
            { id: 5, name: "Касивадзаки-5", type: "bwr", model: "BWR-5", capacity: 1067, status: "stopped", startYear: 1990 },
            { id: 6, name: "Касивадзаки-6", type: "bwr", model: "ABWR", capacity: 1315, status: "stopped", startYear: 1996 },
            { id: 7, name: "Касивадзаки-7", type: "bwr", model: "ABWR", capacity: 1315, status: "stopped", startYear: 1997 }
        ],
        history: [
            { year: "1977", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1985", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2007", title: "ЗЕМЛЕТРЯСЕНИЕ", description: "Сильное землетрясение, повреждения, временная остановка" },
            { year: "2011", title: "ФУКУСИМА", description: "Остановка всех блоков после аварии на Фукусиме" }
        ],
        facts: [
            "Крупнейшая АЭС в мире по установленной мощности[citation:1][citation:7]",
            "Первая станция с реакторами ABWR (усовершенствованный кипящий реактор)",
            "Пострадала от землетрясения в 2007 году, но была восстановлена",
            "В 2024 году получила разрешение на перезапуск блоков 6 и 7"
        ]
    },
    {
        id: 551,
        name: "АЭС Фукусима I",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [37.4214, 141.0325],
        status: "accident",
        totalCapacity: 8814,
        startYear: 1971,
        overview: "Печально известная аварией 2011 года, вызванной землетрясением и цунами. АЭС Фукусима I (4 из 6 реакторов сильно повреждены) и Фукусима II (4 реактора, остановлены)[citation:5][citation:7].",
        location: "Фукусима, Япония",
        city: "Окума и Футаба",
        units: [
            // Фукусима I
            { id: 1, name: "Фукусима I-1", type: "bwr", model: "BWR-3", capacity: 460, status: "accident", startYear: 1971, endYear: 2011 },
            { id: 2, name: "Фукусима I-2", type: "bwr", model: "BWR-4", capacity: 784, status: "accident", startYear: 1974, endYear: 2011 },
            { id: 3, name: "Фукусима I-3", type: "bwr", model: "BWR-4", capacity: 784, status: "accident", startYear: 1976, endYear: 2011 },
            { id: 4, name: "Фукусима I-4", type: "bwr", model: "BWR-4", capacity: 784, status: "accident", startYear: 1978, endYear: 2011 },
            { id: 5, name: "Фукусима I-5", type: "bwr", model: "BWR-4", capacity: 784, status: "stopped", startYear: 1978, endYear: 2014 },
            { id: 6, name: "Фукусима I-6", type: "bwr", model: "BWR-5", capacity: 1100, status: "stopped", startYear: 1979, endYear: 2014 },
            
        ],
        history: [
            { year: "1967", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства Фукусимы I" },
            { year: "1971", title: "ПУСК", description: "Первый блок Фукусимы I подключен к сети" },
            { year: "2011", title: "КАТАСТРОФА", description: "Землетрясение, цунами и авария на Фукусиме I (уровень 7 по INES)[citation:5]" },
            { year: "2013", title: "ОСТАНОВКА", description: "Остановка Фукусимы II" }
        ],
        facts: [
            "Крупнейшая ядерная авария после Чернобыля (уровень 7 по шкале INES)[citation:5]",
            "Привела к эвакуации около 160 000 человек",
            "Полная ликвидация последствий займет 30-40 лет",
            "На месте аварии ведутся работы по извлечению расплавленного топлива"
        ]
    },
    {
        id: 552,
        name: "АЭС Охи",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [35.5411, 135.6514],
        status: "operational",
        totalCapacity: 4494,
        startYear: 1979,
        overview: "Одна из немногих японских АЭС, перезапущенных после аварии на Фукусиме. Расположена на западном побережье, считается более защищенной от цунами[citation:7].",
        location: "Охи, Фукуи, Япония",
        city: "Охи",
        units: [
            { id: 1, name: "Охи-1", type: "pwr", model: "M (3-loop)", capacity: 1120, status: "closed", startYear: 1979 },
            { id: 2, name: "Охи-2", type: "pwr", model: "M (3-loop)", capacity: 1120, status: "closed", startYear: 1979 },
            { id: 3, name: "Охи-3", type: "pwr", model: "M (4-loop)", capacity: 1127, status: "operational", startYear: 1991 },
            { id: 4, name: "Охи-4", type: "pwr", model: "M (4-loop)", capacity: 1127, status: "operational", startYear: 1993 }
        ],
        history: [
            { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1979", title: "ПУСК", description: "Первые блоки подключены к сети" },
            { year: "2011", title: "ОСТАНОВКА", description: "Остановка после аварии на Фукусиме" },
            { year: "2018", title: "ПЕРЕЗАПУСК", description: "Перезапуск блоков 3 и 4 после проверок" }
        ],
        facts: [
            "Одна из первых крупных АЭС, перезапущенных после Фукусимы",
            "Расположена в сейсмически активном регионе, но имеет усиленные системы безопасности",
            "Блоки 1 и 2 планируется окончательно остановить"
        ]
    },
    // ==================== ЮЖНАЯ КОРЕЯ ====================
    {
        id: 600,
        name: "АЭС Кори",
        country: { name: "Южная Корея", flag: "🇰🇷" },
        coords: [35.3264, 129.2983],
        status: "operational",
        totalCapacity: 7847,
        startYear: 1978,
        overview: "Крупнейшая действующая атомная электростанция в мире по установленной мощности с 2019 года. Состоит из 7 энергоблоков[citation:1].",
        location: "Кори, Кёнсан-Намдо, Южная Корея",
        city: "Кори",
        units: [
            { id: 1, name: "Кори-1", type: "pwr", model: "Westinghouse", capacity: 587, status: "operational", startYear: 1978 },
            { id: 2, name: "Кори-2", type: "pwr", model: "Westinghouse", capacity: 650, status: "operational", startYear: 1983 },
            { id: 3, name: "Кори-3", type: "pwr", model: "OPR-1000", capacity: 1050, status: "operational", startYear: 1995 },
            { id: 4, name: "Кори-4", type: "pwr", model: "OPR-1000", capacity: 1050, status: "operational", startYear: 1996 },
            { id: 5, name: "Син-Кори-1", type: "pwr", model: "OPR-1000", capacity: 1050, status: "operational", startYear: 2011 },
            { id: 6, name: "Син-Кори-2", type: "pwr", model: "OPR-1000", capacity: 1050, status: "operational", startYear: 2012 },
            { id: 7, name: "Син-Кори-3", type: "pwr", model: "APR1400", capacity: 1400, status: "operational", startYear: 2016 },
            { id: 8, name: "Син-Кори-4", type: "pwr", model: "APR1400", capacity: 1400, status: "operational", startYear: 2019 }
        ],
        history: [
            { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого блока" },
            { year: "1978", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2019", title: "ЛИДЕРСТВО", description: "Станция стала крупнейшей действующей АЭС в мире" }
        ],
        facts: [
            "Крупнейшая действующая АЭС в мире[citation:1]",
            "Включает как старые блоки (Кори), так и новые (Син-Кори)",
            "Новые блоки используют корейскую технологию APR1400, экспортируемую в другие страны"
        ]
    },
    {
        id: 601,
        name: "АЭС Йонван",
        country: { name: "Южная Корея", flag: "🇰🇷" },
        coords: [35.4097, 126.425],
        status: "operational",
        totalCapacity: 5875,
        startYear: 1986,
        overview: "Одна из крупнейших атомных станций Южной Кореи, ранее известная как АЭС Йонгван[citation:7].",
        location: "Йонван, Чолла-Намдо, Южная Корея",
        city: "Йонван",
        units: [
            { id: 1, name: "Йонван-1", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 1986 },
            { id: 2, name: "Йонван-2", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 1987 },
            { id: 3, name: "Йонван-3", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 1995 },
            { id: 4, name: "Йонван-4", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 1996 },
            { id: 5, name: "Йонван-5", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 2002 },
            { id: 6, name: "Йонван-6", type: "pwr", model: "OPR-1000", capacity: 1000, status: "operational", startYear: 2002 }
        ],
        history: [
            { year: "1981", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1986", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2002", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Ввод последних блоков" }
        ],
        facts: [
            "Одна из самых мощных АЭС Южной Кореи[citation:7]",
            "Все блоки используют стандартизированную корейскую конструкцию OPR-1000",
            "Производит около 10% всей электроэнергии Южной Кореи"
        ]
    },
    // ==================== КИТАЙ ====================
    {
        id: 650,
        name: "АЭС Тайшань",
        country: { name: "Китай", flag: "🇨🇳" },
        coords: [21.9194, 112.9758],
        status: "operational",
        totalCapacity: 3320,
        startYear: 2018,
        overview: "Первая в мире АЭС с реакторами типа EPR (европейский водо-водяной реактор). Блок 1 стал первым в мире энергоблоком EPR, введенным в коммерческую эксплуатацию[citation:1].",
        location: "Тайшань, Гуандун, Китай",
        city: "Тайшань",
        units: [
            { id: 1, name: "Тайшань-1", type: "ep_r", model: "EPR", capacity: 1660, status: "operational", startYear: 2018 },
            { id: 2, name: "Тайшань-2", type: "ep_r", model: "EPR", capacity: 1660, status: "operational", startYear: 2019 }
        ],
        history: [
            { year: "2009", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "2018", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Первый в мире EPR подключен к сети" },
            { year: "2019", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок введен в эксплуатацию" }
        ],
        facts: [
            "Первый в мире энергоблок EPR, достигший коммерческой эксплуатации[citation:1]",
            "EPR — самый мощный тип реактора в мире (до 1660 МВт на блок)",
            "Строительство велось с участием французской компании Framatome и китайской CGN"
        ]
    },
    {
        id: 651,
        name: "АЭС Тяньвань",
        country: { name: "Китай", flag: "🇨🇳" },
        coords: [34.6881, 119.4594],
        status: "operational",
        totalCapacity: 5000,
        startYear: 2007,
        overview: "Крупная атомная станция, построенная при участии России. Первые два блока — ВВЭР-1000, последующие — ВВЭР-1200[citation:1][citation:8].",
        location: "Тяньвань, Цзянсу, Китай",
        city: "Ляньюньган",
        units: [
            { id: 1, name: "Тяньвань-1", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2007 },
            { id: 2, name: "Тяньвань-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "operational", startYear: 2007 },
            { id: 3, name: "Тяньвань-3", type: "vver", model: "ВВЭР-1200", capacity: 1000, status: "operational", startYear: 2018 },
            { id: 4, name: "Тяньвань-4", type: "vver", model: "ВВЭР-1200", capacity: 1000, status: "operational", startYear: 2018 },
            { id: 5, name: "Тяньвань-5", type: "vver", model: "ВВЭР-1200", capacity: 1000, status: "operational", startYear: 2021 },
            { id: 6, name: "Тяньвань-6", type: "vver", model: "ВВЭР-1200", capacity: 1000, status: "operational", startYear: 2022 },
            { id: 7, name: "Тяньвань-7", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2021, expectedYear: 2026 },
            { id: 8, name: "Тяньвань-8", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2022, expectedYear: 2027 }
        ],
        history: [
            { year: "1999", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первых блоков с российским участием" },
            { year: "2007", title: "ПУСК", description: "Первые блоки подключены к сети" },
            { year: "2018", title: "НОВОЕ ПОКОЛЕНИЕ", description: "Ввод блоков с реакторами ВВЭР-1200" },
            { year: "2024", title: "РАСШИРЕНИЕ", description: "Начало строительства блоков 7 и 8" }
        ],
        facts: [
            "Крупнейший российско-китайский проект в атомной энергетике",
            "Блоки 1 и 2 были первыми российскими ВВЭР, построенными за рубежом",
            "В 2018 году с подключением 4-го блока мировая мощность АЭС превысила 400 ГВт[citation:1]"
        ]
    },
    {
        id: 652,
        name: "АЭС Янцзян",
        country: { name: "Китай", flag: "🇨🇳" },
        coords: [21.7083, 112.2542],
        status: "operational",
        totalCapacity: 6000,
        startYear: 2014,
        overview: "Одна из крупнейших атомных станций Китая, использующая китайскую технологию CPR-1000 (на основе французской технологии).",
        location: "Янцзян, Гуандун, Китай",
        city: "Янцзян",
        units: [
            { id: 1, name: "Янцзян-1", type: "pwr", model: "CPR-1000", capacity: 1000, status: "operational", startYear: 2014 },
            { id: 2, name: "Янцзян-2", type: "pwr", model: "CPR-1000", capacity: 1000, status: "operational", startYear: 2015 },
            { id: 3, name: "Янцзян-3", type: "pwr", model: "CPR-1000", capacity: 1000, status: "operational", startYear: 2016 },
            { id: 4, name: "Янцзян-4", type: "pwr", model: "CPR-1000", capacity: 1000, status: "operational", startYear: 2017 },
            { id: 5, name: "Янцзян-5", type: "pwr", model: "ACPR1000", capacity: 1000, status: "operational", startYear: 2018 },
            { id: 6, name: "Янцзян-6", type: "pwr", model: "ACPR1000", capacity: 1000, status: "operational", startYear: 2019 }
        ],
        history: [
            { year: "2008", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "2014", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2019", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Шестой блок введен в эксплуатацию" }
        ],
        facts: [
            "Одна из самых мощных АЭС Китая",
            "Блоки 1-4 используют технологию CPR-1000, блоки 5-6 — более совершенную ACPR1000",
            "Расположена на побережье, использует морскую воду для охлаждения"
        ]
    },
// ==================== ВТОРОЙ ПАКЕТ: Германия, Великобритания, Швеция, Финляндия, Чехия, Словакия, Венгрия, Болгария ====================

    // ==================== ГЕРМАНИЯ (продолжение, действующие на момент до 2023 г.) ====================
    {
        id: 700,
        name: "АЭС Изар",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [48.6075, 12.2964],
        status: "closed",
        totalCapacity: 1410,
        startYear: 1979,
        overview: "Одна из последних остановленных немецких АЭС. Блок 2 (KKI 2) был одним из самых современных в Германии. Остановлена в рамках политики Energiewende (энергетического поворота).",
        location: "Эссенбах, Бавария, Германия",
        city: "Эссенбах",
        units: [
            { id: 1, name: "Изар-1", type: "bwr", model: "BWR-69", capacity: 912, status: "closed", startYear: 1979, endYear: 2011 },
            { id: 2, name: "Изар-2", type: "pwr", model: "Konvoi", capacity: 1485, status: "closed", startYear: 1988, endYear: 2023 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства блока 1" },
            { year: "1988", title: "ПУСК БЛОКА-2", description: "Ввод в эксплуатацию современного блока Konvoi" },
            { year: "2011", title: "ОСТАНОВКА-1", description: "Немедленная остановка блока 1 после аварии на Фукусиме" },
            { year: "2023", title: "ФИНАЛЬНАЯ ОСТАНОВКА", description: "Остановка блока 2 15 апреля в рамках отказа от атомной энергии" }
        ],
        facts: [
            "Блок 2 (Konvoi) имел самый высокий КИУМ (коэффициент использования установленной мощности) в Германии",
            "На месте блока 1 планируется строительство завода по производству водородных электролизеров",
            "Решение о досрочном закрытии в 2023 году было спорным и вызвало дискуссии о энергобезопасности"
        ]
    },
    {
        id: 701,
        name: "АЭС Неккарвестхайм",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [49.0408, 9.1758],
        status: "closed",
        totalCapacity: 1400,
        startYear: 1976,
        overview: "Последняя немецкая АЭС, остановленная в 2023 году. Считалась одной из самых безопасных и надежных в мире. Остановлена по политическим причинам.",
        location: "Неккарвестхайм, Баден-Вюртемберг, Германия",
        city: "Неккарвестхайм",
        units: [
            { id: 1, name: "GKN-1", type: "pwr", model: "Konvoi", capacity: 1400, status: "closed", startYear: 1976, endYear: 2023 }
        ],
        history: [
            { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1976", title: "ПУСК", description: "Подключение к сети" },
            { year: "2005", title: "РЕКОРД", description: "Установила мировой рекорд непрерывной работы (375 дней)" },
            { year: "2023", title: "ЗАКРЫТИЕ", description: "Окончательная остановка 15 апреля 2023 года" }
        ],
        facts: [
            "Имела исключительные показатели безопасности и надежности",
            "Производила около 11 млрд кВт·ч электроэнергии ежегодно",
            "Закрытие станции вызвало критику со стороны специалистов, считавших решение преждевременным"
        ]
    },
    // ==================== ВЕЛИКОБРИТАНИЯ ====================
    {
        id: 750,
        name: "АЭС Хейшем",
        country: { name: "Великобритания", flag: "🇬🇧" },
        coords: [54.0292, -2.9136],
        status: "operational",
        totalCapacity: 2400,
        startYear: 1983,
        overview: "Крупная атомная станция на северо-западе Англии, состоит из двух усовершенствованных газоохлаждаемых реакторов (AGR).",
        location: "Хейшем, Ланкашир, Великобритания",
        city: "Хейшем",
        units: [
            { id: 1, name: "Хейшем-1", type: "gcr", model: "AGR", capacity: 1200, status: "operational", startYear: 1983 },
            { id: 2, name: "Хейшем-2", type: "gcr", model: "AGR", capacity: 1200, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1983", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2024", title: "ПРОДЛЕНИЕ", description: "Срок эксплуатации продлен до 2026 года" }
        ],
        facts: [
            "Использует уникальную британскую технологию AGR (Advanced Gas-cooled Reactor)",
            "Теплоноситель — углекислый газ, замедлитель — графит",
            "Станция производит около 4% электроэнергии Великобритании"
        ]
    },
{
    id: 751,
    name: "АЭС Хинкли-Пойнт",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [51.2086, -3.1358],
    status: "construction", // Основное внимание на строящиеся блоки C
    totalCapacity: 4890, // Сумма: B (1200) + C (3260)
    startYear: 1965, // Пуск первого блока А
    overview: "Крупнейшая атомная площадка в Великобритании. Состоит из трех очередей: закрытых блоков А (1965-2000) и В (1976-2022), а также строящихся блоков С — первых новых реакторов в стране за 20 лет.",
    location: "Хинкли-Пойнт, Сомерсет, Великобритания",
    city: "Бриджуотер",
    units: [
        // Закрытые блоки (очередь A)
        { id: 1, name: "Hinkley A-1", type: "gcr", model: "Magnox", capacity: 300, status: "closed", startYear: 1965, endYear: 2000 },
        { id: 2, name: "Hinkley A-2", type: "gcr", model: "Magnox", capacity: 300, status: "closed", startYear: 1965, endYear: 2000 },
        // Закрытые блоки (очередь B)
        { id: 3, name: "Hinkley B-1", type: "gcr", model: "AGR", capacity: 600, status: "closed", startYear: 1976, endYear: 2022 },
        { id: 4, name: "Hinkley B-2", type: "gcr", model: "AGR", capacity: 600, status: "closed", startYear: 1976, endYear: 2022 },
        // Строящиеся блоки (очередь C)
        { id: 5, name: "Hinkley C-1", type: "ep_r", model: "EPR", capacity: 1630, status: "construction", startYear: 2023, expectedYear: 2027 },
        { id: 6, name: "Hinkley C-2", type: "ep_r", model: "EPR", capacity: 1630, status: "construction", startYear: 2024, expectedYear: 2028 }
    ],
    history: [
        { year: "1965", title: "ПУСК ОЧЕРЕДИ A", description: "Запущены два реактора Magnox (А-1 и А-2)." },
        { year: "1976", title: "ПУСК ОЧЕРЕДИ B", description: "Введены в эксплуатацию два усовершенствованных газоохлаждаемых реактора (AGR)." },
        { year: "2000", title: "ЗАКРЫТИЕ ОЧЕРЕДИ A", description: "Блоки Magnox остановлены после 35 лет работы." },
        { year: "2022", title: "ЗАКРЫТИЕ ОЧЕРЕДИ B", description: "Последний работающий блок B остановлен в июле после 46 лет эксплуатации." },
        { year: "2016", title: "РЕШЕНИЕ ПО C", description: "Окончательное инвестиционное решение по строительству двух EPR." },
        { year: "2023", title: "НАЧАЛО СТРОИТЕЛЬСТВА С-1", description: "Заливка первого бетона для первого блока EPR." }
    ],
    facts: [
        "Это первая АЭС в Великобритании, построенная с участием китайского капитала (компания CGN владеет 33,5%).",
        "Стоимость проекта оценивается в £25-26 млрд, что делает его самым дорогим объектом в стране.",
        "После ввода в эксплуатацию блоки C обеспечат около 7% потребностей Великобритании в электроэнергии.",
        "Блоки B были последними работавшими реакторами типа AGR в мире."
    ]
},
    {
        id: 752,
        name: "АЭС Сайзвелл",
        country: { name: "Великобритания", flag: "🇬🇧" },
        coords: [52.2139, 1.6186],
        status: "operational",
        totalCapacity: 1198,
        startYear: 1995,
        overview: "Атомная станция на восточном побережье Англии, единственная в Великобритании с легководными реакторами (PWR) американского дизайна.",
        location: "Сайзвелл, Суффолк, Великобритания",
        city: "Сайзвелл",
        units: [
            { id: 1, name: "Сайзвелл-1", type: "pwr", model: "Westinghouse 4-loop", capacity: 1198, status: "operational", startYear: 1995 }
        ],
        history: [
            { year: "1987", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1995", title: "ПУСК", description: "Подключение к сети" },
            { year: "2020", title: "ПРОДЛЕНИЕ", description: "Срок эксплуатации продлен до 2035 года" }
        ],
        facts: [
            "Единственный реактор PWR в Великобритании",
            "Построена по американскому проекту Westinghouse",
            "Расположена на берегу Северного моря, подверженного эрозии, что требует постоянных защитных мероприятий"
        ]
    },
    // ==================== ШВЕЦИЯ ====================
    {
        id: 800,
        name: "АЭС Форсмарк",
        country: { name: "Швеция", flag: "🇸🇪" },
        coords: [60.4069, 18.1706],
        status: "operational",
        totalCapacity: 3132,
        startYear: 1980,
        overview: "Крупнейшая атомная электростанция Швеции, расположенная на берегу Балтийского моря. Состоит из трех кипящих реакторов (BWR).",
        location: "Форсмарк, Уппланд, Швеция",
        city: "Форсмарк",
        units: [
            { id: 1, name: "Форсмарк-1", type: "bwr", model: "BWR-75", capacity: 1010, status: "operational", startYear: 1980 },
            { id: 2, name: "Форсмарк-2", type: "bwr", model: "BWR-75", capacity: 1010, status: "operational", startYear: 1981 },
            { id: 3, name: "Форсмарк-3", type: "bwr", model: "BWR-3000", capacity: 1190, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1980", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2006", title: "СОБЫТИЕ", description: "Авария в энергосистеме, вызвавшая остановку блока 1, но не приведшая к радиационным последствиям" }
        ],
        facts: [
            "Производит около 1/6 всей электроэнергии Швеции",
            "В 2006 году здесь произошел инцидент, который привел к усилению мер безопасности на всех шведских АЭС",
            "Планируется эксплуатация до 2040-х годов"
        ]
    },
    {
        id: 801,
        name: "АЭС Оскарсхамн",
        country: { name: "Швеция", flag: "🇸🇪" },
        coords: [57.2647, 16.4472],
        status: "closed",
        totalCapacity: 0,
        startYear: 1972,
        overview: "Бывшая атомная станция на юго-восточном побережье Швеции. Все три реактора выведены из эксплуатации, ведутся работы по демонтажу.",
        location: "Оскарсхамн, Кальмар, Швеция",
        city: "Оскарсхамн",
        units: [
            { id: 1, name: "Оскарсхамн-1", type: "bwr", model: "Asea-Atom BWR", capacity: 492, status: "closed", startYear: 1972, endYear: 2017 },
            { id: 2, name: "Оскарсхамн-2", type: "bwr", model: "Asea-Atom BWR", capacity: 661, status: "closed", startYear: 1974, endYear: 2015 },
            { id: 3, name: "Оскарсхамн-3", type: "bwr", model: "Asea-Atom BWR", capacity: 1450, status: "closed", startYear: 1985, endYear: 2020 }
        ],
        history: [
            { year: "1965", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого блока" },
            { year: "1972", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2020", title: "ЗАКРЫТИЕ", description: "Остановка последнего (третьего) блока" }
        ],
        facts: [
            "Блок 3 был крупнейшим кипящим реактором в мире на момент пуска",
            "Решение о досрочном закрытии было экономическим, а не политическим",
            "На площадке планируется создание центра по обращению с радиоактивными отходами"
        ]
    },
    // ==================== ФИНЛЯНДИЯ ====================
    {
        id: 850,
        name: "АЭС Олкилуото",
        country: { name: "Финляндия", flag: "🇫🇮" },
        coords: [61.2358, 21.4422],
        status: "operational",
        totalCapacity: 3380,
        startYear: 1978,
        overview: "Крупнейшая атомная станция Финляндии и одна из самых мощных в Северной Европе. Блок 3 — первый в мире реактор EPR, достигший коммерческой эксплуатации в Европе.",
        location: "Олкилуото, Похьянмаа, Финляндия",
        city: "Эурайоки",
        units: [
            { id: 1, name: "Олкилуото-1", type: "bwr", model: "Asea-Atom BWR", capacity: 890, status: "operational", startYear: 1978 },
            { id: 2, name: "Олкилуото-2", type: "bwr", model: "Asea-Atom BWR", capacity: 890, status: "operational", startYear: 1980 },
            { id: 3, name: "Олкилуото-3", type: "ep_r", model: "EPR", capacity: 1600, status: "operational", startYear: 2023 }
        ],
        history: [
            { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первых блоков" },
            { year: "2005", title: "НАЧАЛО СТРОИТЕЛЬСТВА ОЛ-3", description: "Заложен первый бетон блока EPR" },
            { year: "2023", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Блок 3 (EPR) вышел на коммерческую эксплуатацию после многолетних задержек" }
        ],
        facts: [
            "Блок 3 (EPR) строился 18 лет, что является рекордом для атомной энергетики",
            "Производит около 30% электроэнергии Финляндии",
            "На площадке Олкилуото также находится пункт окончательного захоронения отработавшего ядерного топлива (ONKALO)"
        ]
    },
    {
        id: 851,
        name: "АЭС Ловийса",
        country: { name: "Финляндия", flag: "🇫🇮" },
        coords: [60.3733, 26.3567],
        status: "operational",
        totalCapacity: 976,
        startYear: 1977,
        overview: "Атомная станция на южном побережье Финляндии, использующая советские реакторы ВВЭР-440, но с западными системами управления и безопасности.",
        location: "Ловийса, Уусимаа, Финляндия",
        city: "Ловийса",
        units: [
            { id: 1, name: "Ловийса-1", type: "vver", model: "ВВЭР-440", capacity: 488, status: "operational", startYear: 1977 },
            { id: 2, name: "Ловийса-2", type: "vver", model: "ВВЭР-440", capacity: 488, status: "operational", startYear: 1980 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства — уникальный советско-финско-шведский проект" },
            { year: "1977", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2020", title: "ПРОДЛЕНИЕ", description: "Срок эксплуатации продлен до 2050 года" }
        ],
        facts: [
            "Уникальный гибрид: советские реакторы с западными системами контроля и безопасности",
            "Имеет ледовый щит для защиты от обледенения в зимний период",
            "Считается одной из самых безопасных АЭС своего типа в мире"
        ]
    },
    // ==================== ЧЕХИЯ ====================
    {
        id: 900,
        name: "АЭС Дукованы",
        country: { name: "Чехия", flag: "🇨🇿" },
        coords: [49.0831, 16.1494],
        status: "operational",
        totalCapacity: 2040,
        startYear: 1985,
        overview: "Единственная атомная станция Чехии, обеспечивающая около 20% производства электроэнергии в стране. Состоит из четырех реакторов ВВЭР-440.",
        location: "Дукованы, Высочина, Чехия",
        city: "Дукованы",
        units: [
            { id: 1, name: "Дукованы-1", type: "vver", model: "ВВЭР-440/213", capacity: 510, status: "operational", startYear: 1985 },
            { id: 2, name: "Дукованы-2", type: "vver", model: "ВВЭР-440/213", capacity: 510, status: "operational", startYear: 1986 },
            { id: 3, name: "Дукованы-3", type: "vver", model: "ВВЭР-440/213", capacity: 510, status: "operational", startYear: 1986 },
            { id: 4, name: "Дукованы-4", type: "vver", model: "ВВЭР-440/213", capacity: 510, status: "operational", startYear: 1987 }
        ],
        history: [
            { year: "1970", title: "ПЛАНИРОВАНИЕ", description: "Принятие решения о строительстве" },
            { year: "1985", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2000-е", title: "МОДЕРНИЗАЦИЯ", description: "Комплексная модернизация всех блоков для продления срока службы" }
        ],
        facts: [
            "Чехия планирует построить новый блок (Дукованы-5) к 2036 году",
            "Станция прошла масштабную модернизацию, включая замену паровых генераторов",
            "Является ключевым источником базовой нагрузки для чешской энергосистемы"
        ]
    },
    {
        id: 901,
        name: "АЭС Темелин",
        country: { name: "Чехия", flag: "🇨🇿" },
        coords: [49.1808, 14.3769],
        status: "operational",
        totalCapacity: 2160,
        startYear: 2000,
        overview: "Вторая атомная станция Чехии, более современная, с реакторами ВВЭР-1000. Вызывала споры с соседней Австрией, выступающей против атомной энергетики.",
        location: "Темелин, Южночешский край, Чехия",
        city: "Темелин",
        units: [
            { id: 1, name: "Темелин-1", type: "vver", model: "ВВЭР-1000/320", capacity: 1080, status: "operational", startYear: 2000 },
            { id: 2, name: "Темелин-2", type: "vver", model: "ВВЭР-1000/320", capacity: 1080, status: "operational", startYear: 2002 }
        ],
        history: [
            { year: "1981", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "2000", title: "ПУСК", description: "Первый блок подключен к сети после долгих задержек" },
            { year: "2006", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок вышел на полную мощность" }
        ],
        facts: [
            "Изначально планировалось 4 блока, но построены только два",
            "Проект был значительно переработан после Чернобыльской аварии с учетом современных требований безопасности",
            "Австрия, граничащая с регионом, является постоянным критиком станции"
        ]
    },
    // ==================== СЛОВАКИЯ ====================
    {
        id: 950,
        name: "АЭС Богунице",
        country: { name: "Словакия", flag: "🇸🇰" },
        coords: [48.4931, 17.6486],
        status: "operational",
        totalCapacity: 2020,
        startYear: 1978,
        overview: "Крупнейшая атомная станция Словакии, обеспечивающая более 50% производства электроэнергии в стране.",
        location: "Богунице, Трнавский край, Словакия",
        city: "Богунице",
        units: [
            { id: 1, name: "Богунице-3", type: "vver", model: "ВВЭР-440/213", capacity: 505, status: "operational", startYear: 1984 },
            { id: 2, name: "Богунице-4", type: "vver", model: "ВВЭР-440/213", capacity: 505, status: "operational", startYear: 1985 },
            { id: 3, name: "Богунице-5", type: "vver", model: "ВВЭР-1000", capacity: 505, status: "operational", startYear: 1999 }
        ],
        history: [
            { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первых блоков" },
            { year: "1978", title: "ПУСК", description: "Блок 1 подключен к сети" },
            { year: "2006-2008", title: "ЗАКРЫТИЕ", description: "Блоки 1 и 2 остановлены в рамках вступления Словакии в ЕС" },
            { year: "1999", title: "НОВЫЙ БЛОК", description: "Ввод блока 3 (иногда нумеруется как 5)" }
        ],
        facts: [
            "Блоки 1 и 2 были остановлены в качестве условия вступления Словакии в Евросоюз",
            "Словакия компенсировала потерю мощности достройкой блоков в Моховце",
            "Является критически важным объектом для энергетической безопасности страны"
        ]
    },
    {
        id: 951,
        name: "АЭС Моховце",
        country: { name: "Словакия", flag: "🇸🇰" },
        coords: [48.2639, 18.4583],
        status: "operational",
        totalCapacity: 942,
        startYear: 1998,
        overview: "Вторая атомная станция Словакии, строительство которой было заморожено на десятилетия и завершено только в 2020-х годах.",
        location: "Моховце, Нитранский край, Словакия",
        city: "Моховце",
        units: [
            { id: 1, name: "Моховце-1", type: "vver", model: "ВВЭР-440/213", capacity: 471, status: "operational", startYear: 1998 },
            { id: 2, name: "Моховце-2", type: "vver", model: "ВВЭР-440/213", capacity: 471, status: "operational", startYear: 1999 },
            { id: 3, name: "Моховце-3", type: "vver", model: "ВВЭР-440/213", capacity: 471, status: "operational", startYear: 2023 },
            { id: 4, name: "Моховце-4", type: "vver", model: "ВВЭР-440/213", capacity: 471, status: "construction", startYear: 2024, expectedYear: 2025 }
        ],
        history: [
            { year: "1983", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1998", title: "ПУСК ПЕРВЫХ БЛОКОВ", description: "Блоки 1 и 2 подключены к сети после долгого перерыва" },
            { year: "2023", title: "ВОЗОБНОВЛЕНИЕ", description: "Блок 3, строившийся с 1987 года, наконец запущен" }
        ],
        facts: [
            "Строительство блоков 3 и 4 началось в 1987 году и было завершено только в 2020-х",
            "Проект стал одним из самых долгостроящихся в истории атомной энергетики",
            "Завершение строительства позволило Словакии стать нетто-экспортером электроэнергии"
        ]
    },
    // ==================== ВЕНГРИЯ ====================
    {
        id: 1000,
        name: "АЭС Пакш",
        country: { name: "Венгрия", flag: "🇭🇺" },
        coords: [46.5731, 18.8531],
        status: "operational",
        totalCapacity: 2000,
        startYear: 1982,
        overview: "Единственная атомная электростанция Венгрии, обеспечивающая около 50% производства электроэнергии в стране. Состоит из четырех советских реакторов ВВЭР-440.",
        location: "Пакш, Тольна, Венгрия",
        city: "Пакш",
        units: [
            { id: 1, name: "Пакш-1", type: "vver", model: "ВВЭР-440/213", capacity: 500, status: "operational", startYear: 1982 },
            { id: 2, name: "Пакш-2", type: "vver", model: "ВВЭР-440/213", capacity: 500, status: "operational", startYear: 1984 },
            { id: 3, name: "Пакш-3", type: "vver", model: "ВВЭР-440/213", capacity: 500, status: "operational", startYear: 1986 },
            { id: 4, name: "Пакш-4", type: "vver", model: "ВВЭР-440/213", capacity: 500, status: "operational", startYear: 1987 }
        ],
        history: [
            { year: "1974", title: "РЕШЕНИЕ", description: "Принято решение о строительстве АЭС" },
            { year: "1982", title: "ПУСК", description: "Первый блок подключен к сети" },
            { year: "2009", title: "ИНЦИДЕНТ", description: "Произошел инцидент с выбросом радиоактивной пыли на блоке 2 (уровень 3 по INES)" },
            { year: "2010-е", title: "МОДЕРНИЗАЦИЯ", description: "Проведена масштабная модернизация для продления срока службы" }
        ],
        facts: [
            "В 2009 году произошел серьезный инцидент при замене топлива, но без угрозы для населения",
            "Венгрия планирует строительство двух новых блоков (Пакш-5 и Пакш-6) с реакторами ВВЭР-1200",
            "Расширение АЭС является важным элементом венгерской энергетической стратегии"
        ]
    },
    // ==================== БОЛГАРИЯ ====================
    {
        id: 1050,
        name: "АЭС Козлодуй",
        country: { name: "Болгария", flag: "🇧🇬" },
        coords: [43.7439, 23.7714],
        status: "operational",
        totalCapacity: 2000,
        startYear: 1974,
        overview: "Единственная атомная станция Болгарии, играющая ключевую роль в энергосистеме страны и всего Балканского региона. Обеспечивает около 35% электроэнергии Болгарии.",
        location: "Козлодуй, Враца, Болгария",
        city: "Козлодуй",
        units: [
            { id: 1, name: "Козлодуй-5", type: "vver", model: "ВВЭР-1000/320", capacity: 1000, status: "operational", startYear: 1987 },
            { id: 2, name: "Козлодуй-6", type: "vver", model: "ВВЭР-1000/320", capacity: 1000, status: "operational", startYear: 1991 }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1974", title: "ПУСК", description: "Первый блок (ВВЭР-440) подключен к сети" },
            { year: "2007", title: "ЗАКРЫТИЕ", description: "Блоки 1-4 остановлены в качестве условия вступления Болгарии в ЕС" },
            { year: "2020", title: "ПРОДЛЕНИЕ", description: "Срок эксплуатации блоков 5 и 6 продлен до 2030 года" }
        ],
        facts: [
            "Блоки 1-4 (ВВЭР-440) были остановлены по политическим причинам при вступлении в ЕС, что нанесло серьезный удар по экономике Болгарии",
            "Станция является крупным экспортером электроэнергии в регионе",
            "Болгария планирует строительство новой АЭС «Белене», но проект постоянно откладывается"
        ]
    },
   // ==================== ТРЕТИЙ ПАКЕТ: Испания, Бельгия, Швейцария, Нидерланды, Румыния, Словения ====================

    // ==================== ИСПАНИЯ ====================
    {
        id: 1100,
        name: "АЭС Альмарас",
        country: { name: "Испания", flag: "🇪🇸" },
        coords: [39.8092, -5.6789],
        status: "operational",
        totalCapacity: 2093,
        startYear: 1983,
        overview: "Одна из действующих атомных станций Испании. Состоит из двух реакторов, которые обеспечивают стабильной электроэнергией западную часть страны.",
        location: "муниципалитет Альмарас, провинция Касерес, Испания",
        city: "Пласенсия",
        units: [
            { id: 1, name: "Альмарас-1", type: "pwr", model: "PWR (Westinghouse)", capacity: 1046.5, status: "operational", startYear: 1983 },
            { id: 2, name: "Альмарас-2", type: "pwr", model: "PWR (Westinghouse)", capacity: 1046.5, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1973", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
            { year: "1983", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый энергоблок подключен к сети[citation:1]" },
            { year: "1984", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок введен в эксплуатацию[citation:1]" }
        ],
        facts: [
            "Станция работает на водо-водяных реакторах (PWR) американской компании Westinghouse[citation:1]",
            "Входит в число пяти действующих АЭС Испании, обеспечивающих около 20% электроэнергии страны[citation:1]",
            "Согласно государственной политике, Испания планирует поэтапный отказ от атомной энергетики к 2035 году[citation:7]"
        ]
    },
    {
        id: 1101,
        name: "АЭС Аско",
        country: { name: "Испания", flag: "🇪🇸" },
        coords: [41.1989, 0.5714],
        status: "operational",
        totalCapacity: 2010,
        startYear: 1984,
        overview: "Крупная атомная станция в Каталонии, играющая важную роль в энергоснабжении промышленного северо-востока Испании.",
        location: "муниципалитет Аско, провинция Таррагона, Испания",
        city: "Лерида",
        units: [
            { id: 1, name: "Аско-1", type: "pwr", model: "PWR (Westinghouse)", capacity: 1005, status: "operational", startYear: 1984 },
            { id: 2, name: "Аско-2", type: "pwr", model: "PWR (Westinghouse)", capacity: 1005, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1984", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый блок подключен к сети[citation:1]" },
            { year: "1986", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок введен в эксплуатацию[citation:1]" }
        ],
        facts: [
            "Одна из самых мощных АЭС в Испании",
            "Использует воду из реки Эбро для охлаждения",
            "В феврале 2025 года нижняя палата парламента Испании проголосовала за призыв пересмотреть политику отказа от атомной энергетики[citation:7]"
        ]
    },
    {
        id: 1102,
        name: "АЭС Вандельос",
        country: { name: "Испания", flag: "🇪🇸" },
        coords: [40.9528, 0.8767],
        status: "operational",
        totalCapacity: 1087,
        startYear: 1972,
        overview: "Атомная станция в Каталонии, известная тем, что её первый блок был остановлен после пожара в 1990 году. Второй блок продолжает работу.",
        location: "Вандельос, провинция Таррагона, Испания",
        city: "Вандельос",
        units: [
            { id: 1, name: "Вандельос-1", type: "gcr", model: "UNGG (Графито-газовый)", capacity: 0, status: "closed", startYear: 1972, endYear: 1990 },
            { id: 2, name: "Вандельос-2", type: "pwr", model: "PWR (Westinghouse)", capacity: 1087, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1972", title: "ПУСК БЛОКА-1", description: "Первый графито-газовый реактор подключен к сети[citation:1]" },
            { year: "1990", title: "ПОЖАР И ЗАКРЫТИЕ", description: "Пожар на первом блоке привел к его окончательной остановке[citation:1]" },
            { year: "1988", title: "ПУСК БЛОКА-2", description: "Второй блок (PWR) введен в эксплуатацию[citation:1]" }
        ],
        facts: [
            "Блок 1 был одним из последних графито-газовых реакторов (UNGG) в Испании",
            "Авария 1990 года не привела к радиационным выбросам, но сделала восстановление блока экономически нецелесообразным",
            "Блок 2 использует современную технологию PWR"
        ]
    },
    {
        id: 1103,
        name: "АЭС Кофрентес",
        country: { name: "Испания", flag: "🇪🇸" },
        coords: [39.2192, -0.7725],
        status: "operational",
        totalCapacity: 1092,
        startYear: 1985,
        overview: "Единственная атомная станция в регионе Валенсия. Состоит из одного энергоблока, являющегося важным источником базовой нагрузки для восточного побережья Испании.",
        location: "Кофрентес, провинция Валенсия, Испания",
        city: "Валенсия",
        units: [
            { id: 1, name: "Кофрентес-1", type: "bwr", model: "BWR-6", capacity: 1092, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1985", title: "ПУСК", description: "Энергоблок подключен к сети[citation:1]" }
        ],
        facts: [
            "Единственный кипящий водо-водяной реактор (BWR) в Испании",
            "Расположена на берегу реки Хукар",
            "Обеспечивает электроэнергией крупный город Валенсию и его промышленность"
        ]
    },
    {
        id: 1104,
        name: "АЭС Трильо",
        country: { name: "Испания", flag: "🇪🇸" },
        coords: [40.6992, -2.6236],
        status: "operational",
        totalCapacity: 1003,
        startYear: 1988,
        overview: "Современная атомная станция, расположенная ближе всего к столице Испании — Мадриду. Обеспечивает стабильное энергоснабжение центрального региона.",
        location: "Трильо, провинция Гвадалахара, Испания",
        city: "Мадрид",
        units: [
            { id: 1, name: "Трильо-1", type: "pwr", model: "PWR (Siemens/KWU)", capacity: 1003, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1979", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1988", title: "ПУСК", description: "Энергоблок подключен к сети[citation:1]" }
        ],
        facts: [
            "Единственная АЭС в Испании с реактором немецкой компании Siemens/KWU",
            "Имеет самую высокую тепловую эффективность среди испанских АЭС",
            "Критически важный источник энергии для столичного региона Мадрида[citation:1]"
        ]
    },
    // ==================== БЕЛЬГИЯ ====================
    {
        id: 1150,
        name: "АЭС Тианж",
        country: { name: "Бельгия", flag: "🇧🇪" },
        coords: [50.5342, 5.2744],
        status: "operational",
        totalCapacity: 1038,
        startYear: 1975,
        overview: "Одна из двух атомных электростанций Бельгии, расположенная в Валлонии. В 2022 году планы по полному отказу от атомной энергии были пересмотрены, и работа новейших реакторов продлена.",
        location: "Тианж, провинция Льеж, Бельгия",
        city: "Юи",
        units: [
            { id: 1, name: "Тианж-1", type: "pwr", model: "PWR Framatome", capacity: 962, status: "closed", startYear: 1975, endYear: 2025 },
            { id: 2, name: "Тианж-2", type: "pwr", model: "PWR Westinghouse", capacity: 1008, status: "closed", startYear: 1983, endYear: 2023 },
            { id: 3, name: "Тианж-3", type: "pwr", model: "PWR Westinghouse", capacity: 1038, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства блока 1[citation:10]" },
            { year: "2003", title: "ЗАКОН ОБ ОТКАЗЕ", description: "Принят закон о поэтапном отказе от атомной энергии к 2025 году[citation:8]" },
            { year: "2022", title: "ПЕРЕСМОТР ПОЛИТИКИ", description: "Решение о продлении работы новейших блоков (Тианж-3 и Дул-4) до 2035 года на фоне энергокризиса[citation:8]" },
            { year: "2025", title: "ОТМЕНА ЗАКОНА", description: "Парламент Бельгии отменил закон 2003 года об отказе от атомной энергии[citation:8]" }
        ],
        facts: [
            "Блок Тианж-2 был досрочно закрыт в 2023 году из-за многочисленных трещин в корпусе реактора, обнаруженных еще в 2014 году[citation:10]",
            "В мае 2025 года бельгийский парламент полностью отменил закон об отказе от атомной энергии[citation:8]",
            "Правительство намерено продлить лицензии блоков Тианж-3 и Дул-4 до 2045 года и построить новые реакторы[citation:8]",
            "В 2024 году атомная энергетика обеспечила около 41% электроэнергии Бельгии[citation:8]"
        ]
    },
    {
        id: 1151,
        name: "АЭС Дул",
        country: { name: "Бельгия", flag: "🇧🇪" },
        coords: [51.3247, 4.2589],
        status: "operational",
        totalCapacity: 1038,
        startYear: 1974,
        overview: "Вторая атомная станция Бельгии, расположенная во Фландрии. Совместно с Тианжем обеспечивает значительную долю базовой нагрузки в энергосистеме страны.",
        location: "Дул, провинция Восточная Фландрия, Бельгия",
        city: "Антверпен",
        units: [
            { id: 1, name: "Дул-1", type: "pwr", model: "PWR", capacity: 433, status: "closed", startYear: 1974, endYear: 2025 },
            { id: 2, name: "Дул-2", type: "pwr", model: "PWR", capacity: 433, status: "closed", startYear: 1975, endYear: 2025 },
            { id: 3, name: "Дул-3", type: "pwr", model: "PWR", capacity: 1006, status: "closed", startYear: 1982, endYear: 2022 },
            { id: 4, name: "Дул-4", type: "pwr", model: "PWR", capacity: 1038, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1969", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первых блоков" },
            { year: "1974", title: "ПУСК ДУЛ-1", description: "Первый коммерческий реактор Бельгии подключен к сети" },
            { year: "2012", title: "ПРОБЛЕМЫ С КОРПУСОМ", description: "Блоки Дул-3 и Тианж-2 остановлены из-за обнаружения трещин в корпусах реакторов[citation:8]" },
            { year: "2023", title: "СДЕЛКА О ПРОДЛЕНИИ", description: "Правительство и компания Engie заключили соглашение о продлении работы Дул-4 и Тианж-3 на 10 лет[citation:8]" }
        ],
        facts: [
            "Вместе со станцией Тианж обеспечивает около 40% электроэнергии Бельгии[citation:8]",
            "Блок Дул-3 был остановлен в 2022 году после 40 лет работы",
            "Все бельгийские АЭС эксплуатирует компания Engie Electrabel[citation:8]",
            "Бельгия стала первой страной в Европе, построившей водо-водяной реактор (PWR) в 1962 году (экспериментальный BR-3)[citation:8]"
        ]
    },
    // ==================== ШВЕЙЦАРИЯ ====================
    {
        id: 1200,
        name: "АЭС Гёсген",
        country: { name: "Швейцария", flag: "🇨🇭" },
        coords: [47.3667, 7.9667],
        status: "operational",
        totalCapacity: 1060,
        startYear: 1979,
        overview: "Одна из четырех атомных электростанций Швейцарии, обеспечивающих около 35% потребления электроэнергии в стране. Известна высокой надежностью.",
        location: "Гёсген, кантон Золотурн, Швейцария",
        city: "Гёсген",
        units: [
            { id: 1, name: "Гёсген", type: "pwr", model: "PWR (Siemens/KWU)", capacity: 1060, status: "operational", startYear: 1979 }
        ],
        history: [
            { year: "1973", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1979", title: "ПУСК", description: "Подключение к сети" },
            { year: "2025", title: "ПЛАНОВЫЙ РЕМОНТ", description: "Остановка на плановый ремонт в мае, перезапуск отложен до конца февраля 2026 года[citation:3]" }
        ],
        facts: [
            "Владельцами станции являются компании Axpo (37.5%) и Alpiq (40%)[citation:3]",
            "Задержка перезапуска в 2025 году связана с подготовкой документации по новым методам расчета для системы питательной воды[citation:3]",
            "Ожидается, что задержка перезапуска сократит прибыль группы Axpo примерно на 150-170 млн швейцарских франков[citation:3]"
        ]
    },
    {
        id: 1201,
        name: "АЭС Бецнау",
        country: { name: "Швейцария", flag: "🇨🇭" },
        coords: [47.5519, 8.2286],
        status: "operational",
        totalCapacity: 750,
        startYear: 1969,
        overview: "Старейшая действующая атомная электростанция Швейцарии. Состоит из двух блоков, которые сыграли ключевую роль в развитии атомной энергетики страны.",
        location: "Бецнау, кантон Аргау, Швейцария",
        city: "Дёттинген",
        units: [
            { id: 1, name: "Бецнау-1", type: "pwr", model: "PWR (Westinghouse)", capacity: 365, status: "operational", startYear: 1969 },
            { id: 2, name: "Бецнау-2", type: "pwr", model: "PWR (Westinghouse)", capacity: 365, status: "operational", startYear: 1971 }
        ],
        history: [
            { year: "1965", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого блока" },
            { year: "1969", title: "ПУСК БЛОКА-1", description: "Первый коммерческий реактор Швейцарии подключен к сети" },
            { year: "1971", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Запуск второго блока" }
        ],
        facts: [
            "Блок 1 — первый коммерческий атомный реактор в Швейцарии",
            "Оба блока прошли масштабную модернизацию для продления срока службы",
            "Станция расположена на берегу реки Ааре"
        ]
    },
    {
        id: 1202,
        name: "АЭС Лайбштадт",
        country: { name: "Швейцария", flag: "🇨🇭" },
        coords: [47.6019, 8.1847],
        status: "operational",
        totalCapacity: 1275,
        startYear: 1984,
        overview: "Самый мощный энергоблок в Швейцарии. Крупнейший производитель атомной электроэнергии в стране.",
        location: "Лайбштадт, кантон Аргау, Швейцария",
        city: "Лайбштадт",
        units: [
            { id: 1, name: "Лайбштадт", type: "bwr", model: "BWR (General Electric)", capacity: 1275, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
            { year: "1984", title: "ПУСК", description: "Подключение к сети" },
            { year: "2000-е", title: "МОДЕРНИЗАЦИЯ", description: "Крупная модернизация с увеличением мощности" }
        ],
        facts: [
            "Единственный кипящий водо-водяной реактор (BWR) в Швейцарии",
            "После модернизации мощность увеличена с первоначальных 1065 МВт до 1275 МВт",
            "Является ключевым элементом энергосистемы северной Швейцарии"
        ]
    },
    // ==================== НИДЕРЛАНДЫ ====================
    {
        id: 1250,
        name: "АЭС Борселе",
        country: { name: "Нидерланды", flag: "🇳🇱" },
        coords: [51.4306, 3.7169],
        status: "operational",
        totalCapacity: 515,
        startYear: 1973,
        overview: "Единственная действующая атомная электростанция в Нидерландах. Несмотря на политические дебаты об отказе от атомной энергии, её работа продлена до 2033 года.",
        location: "Борселе, провинция Зеландия, Нидерланды",
        city: "Борселе",
        units: [
            { id: 1, name: "Борселе", type: "pwr", model: "PWR (Siemens/KWU)", capacity: 515, status: "operational", startYear: 1973 }
        ],
        history: [
            { year: "1969", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства[citation:4]" },
            { year: "1973", title: "ПУСК", description: "Ввод в эксплуатацию[citation:4]" },
            { year: "1994", title: "РЕШЕНИЕ О ЗАКРЫТИИ", description: "Правительство и парламент решили закрыть АЭС, но решение было оспорено[citation:4]" },
            { year: "2006", title: "ПРОДЛЕНИЕ", description: "Принято решение о продлении работы до 2033 года[citation:4]" },
            { year: "2011", title: "MOX-ТОПЛИВО", description: "Получено разрешение на использование смешанного оксидного топлива (MOX)[citation:4]" }
        ],
        facts: [
            "Первоначальная мощность составляла 449 МВт, после модернизации в 2006 году увеличена до 485 МВт (нетто)[citation:4]",
            "Управляется компанией EPZ, акционерами которой являются RWE и Delta[citation:4]",
            "Использует уран из Казахстана[citation:4]",
            "За время эксплуатации зафиксировано сотни инцидентов и нарушений, большинство из которых незначительны[citation:4]",
            "Первая голландская АЭС в Додеварде была закрыта в 1997 году после 28 лет службы[citation:4]"
        ]
    },
    // ==================== РУМЫНИЯ ====================
    {
        id: 1300,
        name: "АЭС Чернаводэ",
        country: { name: "Румыния", flag: "🇷🇴" },
        coords: [44.3172, 28.0575],
        status: "operational",
        totalCapacity: 1400,
        startYear: 1996,
        overview: "Единственная атомная электростанция Румынии, крупнейший производитель электроэнергии в стране. Использует канадские тяжеловодные реакторы CANDU (тип PHWR).",
        location: "Чернаводэ, жудец Констанца, Румыния",
        city: "Чернаводэ",
        units: [
            { id: 1, name: "Чернаводэ-1", type: "phwr", model: "CANDU-6", capacity: 706, status: "operational", startYear: 1996 },
            { id: 2, name: "Чернаводэ-2", type: "phwr", model: "CANDU-6", capacity: 706, status: "operational", startYear: 2007 },
            { id: 3, name: "Чернаводэ-3", type: "phwr", model: "CANDU-6", capacity: 740, status: "construction", startYear: 1984, expectedYear: 2030 },
            { id: 4, name: "Чернаводэ-4", type: "phwr", model: "CANDU-6", capacity: 740, status: "construction", startYear: 1985, expectedYear: 2031 }
        ],
        history: [
            { year: "1980-е", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Старт проекта при Николае Чаушеску, планировалось 5 блоков[citation:5]" },
            { year: "1989", title: "ПРИОСТАНОВКА", description: "Строительство заморожено после революции и Чернобыльской аварии[citation:5]" },
            { year: "1996", title: "ПУСК БЛОКА-1", description: "Первый блок достроен и введен в эксплуатацию[citation:5]" },
            { year: "2007", title: "ПУСК БЛОКА-2", description: "Второй блок подключен к сети[citation:5]" },
            { year: "2022", title: "СОГЛАШЕНИЕ С США", description: "Подписано соглашение о строительстве двух новых энергоблоков[citation:5]" }
        ],
        facts: [
            "Производит около 18-20% электроэнергии Румынии[citation:5]",
            "Использует тяжелую воду в качестве замедлителя и обычную воду для охлаждения[citation:5]",
            "Тяжелая вода производится в Румынии, в городах Дробета-Турну-Северин и Турну-Мэгуреле[citation:5]",
            "Блоки 3 и 4 строятся с 1980-х годов, их достройка ведется с участием канадской Candu Energy и американского финансирования[citation:5]",
            "Пятый блок был запланирован, но планов по его завершению пока нет[citation:5]"
        ]
    },
    // ==================== СЛОВЕНИЯ ====================
    {
        id: 1350,
        name: "АЭС Кршко",
        country: { name: "Словения", flag: "🇸🇮" },
        coords: [45.9358, 15.5139],
        status: "operational",
        totalCapacity: 730,
        startYear: 1983,
        overview: "Единственная атомная электростанция в Словении, построенная как совместное предприятие Словении и Хорватии во времена Югославии. Обеспечивает значительную долю электроэнергии обеих стран.",
        location: "Кршко, Нижняя Посавска, Словения",
        city: "Кршко",
        units: [
            { id: 1, name: "Кршко", type: "pwr", model: "PWR (Westinghouse)", capacity: 730, status: "operational", startYear: 1983 }
        ],
        history: [
            { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства[citation:6]" },
            { year: "1981", title: "ПОДКЛЮЧЕНИЕ К СЕТИ", description: "Первая синхронизация с энергосистемой[citation:6]" },
            { year: "1983", title: "КОММЕРЧЕСКИЙ ПУСК", description: "Официальный ввод в эксплуатацию[citation:6]" },
            { year: "2008", title: "ИНЦИДЕНТ", description: "Утечка охлаждающей жидкости, вызвавшая предупреждение ЕС (позже угроза не подтвердилась)[citation:6]" },
            { year: "2023", title: "ПРОДЛЕНИЕ", description: "Получено разрешение на продление срока эксплуатации до 2043 года" }
        ],
        facts: [
            "Станция принадлежит совместно словенской компании GEN Energija (50%) и хорватской Hrvatska elektroprivreda (50%)[citation:6]",
            "Обеспечивает около 25% потребностей Словении и 15% Хорватии в электроэнергии[citation:6]",
            "Построена по американскому проекту Westinghouse, аналогичному АЭС Ангра в Бразилии[citation:6]",
            "В 2013 году при перегрузке топлива было выявлено разрушение топливных стержней из-за «усталости материала»[citation:6]"
        ]
    },
// ==================== ЧЕТВЕРТЫЙ ПАКЕТ: Индия, Пакистан, Бангладеш, Турция, ОАЭ, Иран, Египет ====================

    // ==================== ИНДИЯ ====================
    {
        id: 1400,
        name: "АЭС Куданкулам",
        country: { name: "Индия", flag: "🇮🇳" },
        coords: [8.1706, 77.7147],
        status: "operational",
        totalCapacity: 2000,
        startYear: 2013,
        overview: "Крупнейшая атомная электростанция в Индии, построенная при сотрудничестве с Россией. Находится в штате Тамилнад на самом юге полуострова Индостан.",
        location: "Куданкулам, Тамилнад, Индия",
        city: "Куданкулам",
        units: [
            { id: 1, name: "Куданкулам-1", type: "vver", model: "ВВЭР-1000/412", capacity: 1000, status: "operational", startYear: 2013 },
            { id: 2, name: "Куданкулам-2", type: "vver", model: "ВВЭР-1000/412", capacity: 1000, status: "operational", startYear: 2016 },
            { id: 3, name: "Куданкулам-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2021, expectedYear: 2027 },
            { id: 4, name: "Куданкулам-4", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2022, expectedYear: 2028 },
            { id: 5, name: "Куданкулам-5", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2024, expectedYear: 2030 },
            { id: 6, name: "Куданкулам-6", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2025, expectedYear: 2031 }
        ],
        history: [
            { year: "1988", title: "СОГЛАШЕНИЕ", description: "Советско-индийское межправительственное соглашение о строительстве АЭС" },
            { year: "2002", title: "СТРОИТЕЛЬСТВО", description: "Закладка первого блока" },
            { year: "2013", title: "ПУСК ПЕРВОГО БЛОКА", description: "Блок 1 подключен к сети после длительных задержек из-за протестов" },
            { year: "2024", title: "СТАРТ СТРОИТЕЛЬСТВА", description: "Начало работ по блокам 5 и 6" }
        ],
        facts: [
            "Первый в Индии проект с легководными реакторами ВВЭР российского дизайна",
            "Блоки спроектированы с учетом защиты от цунами и землетрясений после Фукусимы",
            "Проект сталкивался с протестами местных жителей и активистов по соображениям безопасности",
            "В будущем станция станет одной из крупнейших в мире после завершения всех шести блоков"
        ]
    },
    {
        id: 1401,
        name: "АЭС Тарапур",
        country: { name: "Индия", flag: "🇮🇳" },
        coords: [19.8333, 72.6667],
        status: "operational",
        totalCapacity: 1400,
        startYear: 1969,
        overview: "Первая атомная электростанция в Индии, расположенная в штате Махараштра. Исторически использовала кипящие водо-водяные реакторы (BWR) американской поставки, сейчас также включает тяжеловодные реакторы индийского дизайна.",
        location: "Тарапур, Махараштра, Индия",
        city: "Тарапур",
        units: [
            { id: 1, name: "Тарапур-1", type: "bwr", model: "BWR (GE)", capacity: 160, status: "operational", startYear: 1969 },
            { id: 2, name: "Тарапур-2", type: "bwr", model: "BWR (GE)", capacity: 160, status: "operational", startYear: 1969 },
            { id: 3, name: "Тарапур-3", type: "phwr", model: "PHWR-540", capacity: 540, status: "operational", startYear: 2006 },
            { id: 4, name: "Тарапур-4", type: "phwr", model: "PHWR-540", capacity: 540, status: "operational", startYear: 2005 }
        ],
        history: [
            { year: "1964", title: "СОГЛАШЕНИЕ", description: "Индийско-американское соглашение о строительстве" },
            { year: "1969", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Пуск первых двух блоков — начало атомной энергетики Индии" },
            { year: "2005", title: "РАСШИРЕНИЕ", description: "Ввод тяжеловодных блоков индийского производства" }
        ],
        facts: [
            "Первая АЭС в Азии за пределами СССР",
            "Первоначальные реакторы BWR поставлялись США по программе «Атом для мира»",
            "Несмотря на истечение первоначального проектного срока, блоки 1 и 2 продолжают работу после модернизации",
            "Блоки 3 и 4 — тяжеловодные реакторы индийского дизайна"
        ]
    },
    {
        id: 1402,
        name: "АЭС Раджастан",
        country: { name: "Индия", flag: "🇮🇳" },
        coords: [24.8722, 75.5861],
        status: "operational",
        totalCapacity: 1180,
        startYear: 1973,
        overview: "Первая АЭС в Индии, построенная с использованием тяжеловодных реакторов канадского типа CANDU. Стала основой для развития собственного индийского направления PHWR.",
        location: "Раватбхата, Раджастан, Индия",
        city: "Раватбхата",
        units: [
            { id: 1, name: "RAPS-1", type: "phwr", model: "CANDU", capacity: 100, status: "closed", startYear: 1973, endYear: 2004 },
            { id: 2, name: "RAPS-2", type: "phwr", model: "CANDU", capacity: 200, status: "operational", startYear: 1981 },
            { id: 3, name: "RAPS-3", type: "phwr", model: "PHWR-220", capacity: 220, status: "operational", startYear: 2000 },
            { id: 4, name: "RAPS-4", type: "phwr", model: "PHWR-220", capacity: 220, status: "operational", startYear: 2000 },
            { id: 5, name: "RAPS-5", type: "phwr", model: "PHWR-220", capacity: 220, status: "operational", startYear: 2010 },
            { id: 6, name: "RAPS-6", type: "phwr", model: "PHWR-220", capacity: 220, status: "operational", startYear: 2010 },
            { id: 7, name: "RAPS-7", type: "phwr", model: "PHWR-700", capacity: 700, status: "construction", startYear: 2021, expectedYear: 2027 },
            { id: 8, name: "RAPS-8", type: "phwr", model: "PHWR-700", capacity: 700, status: "construction", startYear: 2022, expectedYear: 2028 }
        ],
        history: [
            { year: "1965", title: "СОГЛАШЕНИЕ", description: "Индийско-канадское соглашение о сотрудничестве" },
            { year: "1973", title: "ПУСК ПЕРВОГО БЛОКА", description: "Пуск первого канадского реактора CANDU" },
            { year: "1990-е", title: "САНКЦИИ", description: "Замораживание сотрудничества после ядерных испытаний Индии в 1974 и 1998 гг." },
            { year: "2010", title: "РАСШИРЕНИЕ", description: "Ввод блоков 5 и 6 собственной индийской разработки" }
        ],
        facts: [
            "Плутоний, полученный на первом блоке, был использован в первом индийском ядерном испытании 1974 года («Улыбающийся Будда»)",
            "После испытаний Канада прекратила ядерное сотрудничество, что подтолкнуло Индию к созданию собственной программы PHWR",
            "Станция является полигоном для развития национальных ядерных технологий"
        ]
    },
    // ==================== ПАКИСТАН ====================
    {
        id: 1450,
        name: "АЭС Чашма",
        country: { name: "Пакистан", flag: "🇵🇰" },
        coords: [32.3889, 71.4625],
        status: "operational",
        totalCapacity: 1330,
        startYear: 2000,
        overview: "Атомная электростанция в Пакистане, построенная при тесном сотрудничестве с Китаем. Состоит из нескольких блоков с реакторами CNP-300 китайского дизайна.",
        location: "Чашма, Пенджаб, Пакистан",
        city: "Чашма",
        units: [
            { id: 1, name: "Чашма-1", type: "pwr", model: "CNP-300", capacity: 325, status: "operational", startYear: 2000 },
            { id: 2, name: "Чашма-2", type: "pwr", model: "CNP-300", capacity: 325, status: "operational", startYear: 2011 },
            { id: 3, name: "Чашма-3", type: "pwr", model: "HPR-1000 (Hualong One)", capacity: 340, status: "operational", startYear: 2022 },
            { id: 4, name: "Чашма-4", type: "pwr", model: "HPR-1000 (Hualong One)", capacity: 340, status: "operational", startYear: 2023 }
        ],
        history: [
            { year: "1993", title: "СОГЛАШЕНИЕ", description: "Пакистано-китайское соглашение о строительстве" },
            { year: "2000", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый блок, построенный Китаем за рубежом, подключен к сети" },
            { year: "2022", title: "НОВОЕ ПОКОЛЕНИЕ", description: "Пуск блока 3 с реактором Hualong One" }
        ],
        facts: [
            "Первый проект экспорта китайских ядерных технологий",
            "Блоки 1 и 2 — модель CNP-300, блоки 3 и 4 — более современные HPR-1000 (Hualong One)",
            "Станция является краеугольным камнем китайско-пакистанского экономического сотрудничества"
        ]
    },
    {
        id: 1451,
        name: "АЭС Карачи",
        country: { name: "Пакистан", flag: "🇵🇰" },
        coords: [24.8472, 66.7944],
        status: "operational",
        totalCapacity: 2330,
        startYear: 1972,
        overview: "Первая атомная электростанция Пакистана, расположенная недалеко от крупнейшего города страны. Включает старый блок канадского типа и новые блоки с китайскими реакторами Hualong One.",
        location: "Карачи, Синд, Пакистан",
        city: "Карачи",
        units: [
            { id: 1, name: "Карачи-1", type: "phwr", model: "CANDU-137", capacity: 137, status: "operational", startYear: 1972 },
            { id: 2, name: "Карачи-2", type: "pwr", model: "HPR-1000 (Hualong One)", capacity: 1100, status: "operational", startYear: 2021 },
            { id: 3, name: "Карачи-3", type: "pwr", model: "HPR-1000 (Hualong One)", capacity: 1100, status: "operational", startYear: 2022 }
        ],
        history: [
            { year: "1965", title: "СОГЛАШЕНИЕ", description: "Пакистано-канадское соглашение о строительстве первого блока" },
            { year: "1972", title: "ПУСК К-1", description: "Пуск первого энергоблока Пакистана" },
            { year: "2021", title: "НОВАЯ ЭРА", description: "Пуск первого блока Hualong One в Пакистане (К-2)" }
        ],
        facts: [
            "Блок К-1 — тяжеловодный реактор CANDU, поставленный Канадой до ядерных испытаний Индии в 1974 году",
            "Блоки К-2 и К-3 — крупнейшие энергоблоки в Пакистане, использующие современную китайскую технологию",
            "Строительство новых блоков велось в рамках масштабного китайского инвестиционного плата «Один пояс, один путь»"
        ]
    },
    // ==================== БАНГЛАДЕШ ====================
    {
        id: 1500,
        name: "АЭС Руппур",
        country: { name: "Бангладеш", flag: "🇧🇩" },
        coords: [24.0667, 89.0417],
        status: "construction",
        totalCapacity: 2400,
        startYear: 2027,
        overview: "Первая атомная электростанция в Бангладеш, строящаяся при участии России. Проект реализуется по модели «строй-владей-эксплуатируй» и станет крупнейшим энергетическим объектом страны.",
        location: "Руппур, Пабна, Бангладеш",
        city: "Ишварди",
        units: [
            { id: 1, name: "Руппур-1", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2024 },
            { id: 2, name: "Руппур-2", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2025 }
        ],
        history: [
            { year: "2009", title: "СОГЛАШЕНИЕ", description: "Межправительственное соглашение между Бангладеш и Россией" },
            { year: "2017", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Церемония заливки первого бетона для блока 1" },
            { year: "2023", title: "ПОДКЛЮЧЕНИЕ К СЕТИ", description: "Ожидается подключение первого блока к национальной сети" }
        ],
        facts: [
            "Первый проект АЭС в Бангладеш, реализуемый «Росатомом»",
            "Финансирование осуществляется через российский государственный кредит",
            "Проект сталкивается с критикой из-за высокой стоимости и вопросов безопасности в плотно населенной дельте Ганга",
            "После ввода в строй станция обеспечит около 10% потребностей страны в электроэнергии"
        ]
    },
    // ==================== ТУРЦИЯ ====================
    {
        id: 1550,
        name: "АЭС Аккую",
        country: { name: "Турция", flag: "🇹🇷" },
        coords: [36.1447, 33.5417],
        status: "construction",
        totalCapacity: 4800,
        startYear: 2026,
        overview: "Первая атомная электростанция Турции, строящаяся на побережье Средиземного моря. Проект реализуется российским «Росатомом» по модели BOO (строй-владей-эксплуатируй).",
        location: "Аккую, провинция Мерсин, Турция",
        city: "Гюльнар",
        units: [
            { id: 1, name: "Аккую-1", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2026, expectedYear: 2025 },
            { id: 2, name: "Аккую-2", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2026 },
            { id: 3, name: "Аккую-3", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2027 },
            { id: 4, name: "Аккую-4", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2028, expectedYear: 2028 }
        ],
        history: [
            { year: "2010", title: "СОГЛАШЕНИЕ", description: "Межправительственное соглашение между Турцией и Россией" },
            { year: "2018", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Церемония заливки первого бетона для блока 1" },
            { year: "2027", title: "ПУСК ПЕРВОГО БЛОКА", description: "Запуск первого энергоблока в тестовом режиме ожидается в 2025 году" }
        ],
        facts: [
            "Первый в мире проект АЭС, реализуемый по модели BOO (Build-Own-Operate), когда поставщик строит, владеет и управляет станцией",
            "Проект стоимостью около 20 млрд долларов",
            "Вызывает обеспокоенность в связи с расположением в сейсмически активной зоне",
            "После завершения обеспечит около 10% потребностей Турции в электроэнергии"
        ]
    },
    // ==================== ОАЭ ====================
    {
        id: 1600,
        name: "АЭС Барака",
        country: { name: "ОАЭ", flag: "🇦🇪" },
        coords: [23.9728, 52.2369],
        status: "operational",
        totalCapacity: 5380,
        startYear: 2020,
        overview: "Первая атомная электростанция в Объединенных Арабских Эмиратах и на Аравийском полуострове. Построена южнокорейским консорциумом во главе с Korea Electric Power Corporation (KEPCO).",
        location: "Барака, эмират Абу-Даби, ОАЭ",
        city: "Эр-Рувайс",
        units: [
            { id: 1, name: "Барака-1", type: "pwr", model: "APR-1400", capacity: 1345, status: "operational", startYear: 2020 },
            { id: 2, name: "Барака-2", type: "pwr", model: "APR-1400", capacity: 1345, status: "operational", startYear: 2021 },
            { id: 3, name: "Барака-3", type: "pwr", model: "APR-1400", capacity: 1345, status: "operational", startYear: 2022 },
            { id: 4, name: "Барака-4", type: "pwr", model: "APR-1400", capacity: 1345, status: "operational", startYear: 2023 }
        ],
        history: [
            { year: "2009", title: "СОГЛАШЕНИЕ", description: "ОАЭ выбирают южнокорейский консорциум для строительства АЭС" },
            { year: "2012", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Выдача лицензии на строительство" },
            { year: "2020", title: "ПУСК ПЕРВОГО БЛОКА", description: "Первый блок подключен к сети, знаменуя начало атомной эры в арабском мире" },
            { year: "2023", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Все четыре блока введены в коммерческую эксплуатацию" }
        ],
        facts: [
            "Крупнейший в мире одноплощадочный ядерный парк",
            "Первый проект экспорта южнокорейской технологии APR-1400",
            "ОАЭ обязались не обогащать уран и не перерабатывать отработавшее топливо, установив стандарты «мирной атомной энергии» для региона",
            "Станция обеспечивает до 25% потребностей ОАЭ в электроэнергии и позволяет экономить миллионы тонн выбросов CO2 ежегодно"
        ]
    },
    // ==================== ИРАН ====================
    {
        id: 1650,
        name: "АЭС Бушер",
        country: { name: "Иран", flag: "🇮🇷" },
        coords: [28.8306, 50.8919],
        status: "stopped",
        totalCapacity: 1000,
        startYear: 2011,
        overview: "Первая и единственная атомная электростанция в Иране. Расположена на побережье Персидского залива. Строительство началось при шахе Мохаммеде Реза Пехлеви с участием Германии, но было завершено Россией после многолетнего перерыва.",
        location: "Бушер, провинция Бушер, Иран",
        city: "Бушер",
        units: [
            { id: 1, name: "Бушер-1", type: "vver", model: "ВВЭР-1000/446", capacity: 1000, status: "operational", startYear: 2011 },
            { id: 2, name: "Бушер-2", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2019, expectedYear: 2026 },
            { id: 3, name: "Бушер-3", type: "vver", model: "ВВЭР-1000", capacity: 1000, status: "construction", startYear: 2024, expectedYear: 2030 }
        ],
        history: [
            { year: "1975", title: "СТАРТ ПРОЕКТА", description: "Контракт с немецкой компанией Kraftwerk Union (Siemens) на строительство двух блоков" },
            { year: "1979", title: "ЗАМОРАЖИВАНИЕ", description: "Проект заморожен после Исламской революции и начала ирано-иракской войны" },
            { year: "1995", title: "ВОЗОБНОВЛЕНИЕ", description: "Россия берется за завершение строительства первого блока" },
            { year: "2011", title: "ПУСК", description: "Бушер-1 подключен к сети после более чем 35 лет строительства" },
            { year: "2026", title: "АВАРИЙНАЯ ОСТАНОВКА", description: "Аварийная остановка АЭС и строительства новых блоков из-за ударов." }
        ],
        facts: [
            "Один из самых долгостроящихся проектов в истории атомной энергетики",
            "Первый блок был поврежден во время ирано-иракской войны (бомбардировки)",
            "Станция находится под гарантиями МАГАТЭ, топливо поставляется Россией с обязательством возврата отработавшего топлива",
            "Проект окружен геополитическими спорами в связи с иранской ядерной программой"
        ]
    },
    // ==================== ЕГИПЕТ ====================
    {
        id: 1700,
        name: "АЭС Эль-Дабаа",
        country: { name: "Египет", flag: "🇪🇬" },
        coords: [31.0464, 28.4764],
        status: "construction",
        totalCapacity: 4800,
        startYear: 2027,
        overview: "Первая атомная электростанция в Египте, строящаяся на средиземноморском побережье. Проект реализуется российским «Росатомом» и станет крупнейшим энергетическим объектом в стране.",
        location: "Эль-Дабаа, мухафаза Матрух, Египет",
        city: "Эль-Дабаа",
        units: [
            { id: 1, name: "Эль-Дабаа-1", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2028 },
            { id: 2, name: "Эль-Дабаа-2", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2029 },
            { id: 3, name: "Эль-Дабаа-3", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2030 },
            { id: 4, name: "Эль-Дабаа-4", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2027, expectedYear: 2031 }
        ],
        history: [
            { year: "2015", title: "СОГЛАШЕНИЕ", description: "Египетско-российское межправительственное соглашение о сотрудничестве в мирном использовании атомной энергии" },
            { year: "2017", title: "КОНТРАКТ", description: "Подписание контракта на строительство" },
            { year: "2022", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Церемония заливки первого бетона для блока 1" }
        ],
        facts: [
            "Проект стоимостью около 30 млрд долларов, финансируемый в основном за счет российского кредита",
            "Площадка была выбрана еще в 1980-х годах, но проект много раз откладывался",
            "Станция станет ключевым элементом для удовлетворения растущего спроса Египта на электроэнергию и опреснение воды",
            "Проект включает обучение египетских специалистов и создание необходимой инфраструктуры"
        ]
    },
// ==================== ПЯТЫЙ ПАКЕТ: Аргентина, Бразилия, Мексика, ЮАР ====================

    // ==================== АРГЕНТИНА ====================
    {
        id: 1750,
        name: "АЭС Атуча",
        country: { name: "Аргентина", flag: "🇦🇷" },
        coords: [-34.0000, -58.8833],
        status: "operational",
        totalCapacity: 1209,
        startYear: 1974,
        overview: "Первая атомная электростанция в Латинской Америке. Отличается использованием тяжеловодного реактора собственной разработки, что позволяет работать на природном уране.",
        location: "Лима, провинция Буэнос-Айрес, Аргентина",
        city: "Буэнос-Айрес",
        units: [
            { id: 1, name: "Атуча-1", type: "phwr", model: "PHWR CANDU-6 (Siemens)", capacity: 362, status: "operational", startYear: 1974 },
            { id: 2, name: "Атуча-2", type: "phwr", model: "PHWR (Siemens)", capacity: 745, status: "operational", startYear: 2014 }
        ],
        history: [
            { year: "1968", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства Атуча-1 при сотрудничестве с Siemens (Германия)" },
            { year: "1974", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Атуча-1 стала первой АЭС в Латинской Америке" },
            { year: "1981", title: "НАЧАЛО СТРОИТЕЛЬСТВА АТУЧА-2", description: "Заложен второй блок" },
            { year: "2014", title: "ЗАВЕРШЕНИЕ ДОЛГОСТРОЯ", description: "Атуча-2, строительство которого несколько раз замораживалось, наконец введена в эксплуатацию" }
        ],
        facts: [
            "Обе станции используют тяжеловодные реакторы (PHWR) на природном (необогащенном) уране",
            "Строительство Атуча-2 было одним из самых долгих в истории атомной энергетики — более 33 лет",
            "Аргентина обладает полным топливным циклом, от добычи урана до производства топлива для своих реакторов"
        ]
    },
    {
        id: 1751,
        name: "АЭС Эмбальсе",
        country: { name: "Аргентина", flag: "🇦🇷" },
        coords: [-32.2333, -64.4333],
        status: "operational",
        totalCapacity: 648,
        startYear: 1984,
        overview: "Вторая атомная электростанция Аргентины, расположенная на берегу искусственного водохранилища Рио-Терсеро. Использует тяжеловодный реактор канадского типа CANDU.",
        location: "Эмбальсе, провинция Кордова, Аргентина",
        city: "Эмбальсе",
        units: [
            { id: 1, name: "Эмбальсе", type: "candu", model: "CANDU-6", capacity: 648, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства с канадским участием" },
            { year: "1984", title: "ПУСК", description: "Ввод в коммерческую эксплуатацию" },
            { year: "2015", title: "МОДЕРНИЗАЦИЯ", description: "Начало масштабной модернизации и продления срока службы на 30 лет" },
            { year: "2019", title: "РЕСТАРТ", description: "Перезапуск после модернизации" }
        ],
        facts: [
            "Использует тяжелую воду в качестве замедлителя и теплоносителя, что позволяет применять природный уран",
            "Единственная АЭС в Аргентине, использующая канадскую технологию CANDU",
            "Во время модернизации мощность была увеличена с первоначальных 600 МВт до 648 МВт"
        ]
    },
    // ==================== БРАЗИЛИЯ ====================
    {
        id: 1800,
        name: "АЭС Ангра",
        country: { name: "Бразилия", flag: "🇧🇷" },
        coords: [-23.0081, -44.4725],
        status: "operational",
        totalCapacity: 2007,
        startYear: 1985,
        overview: "Единственный атомный энергетический комплекс в Бразилии. Расположен на побережье Атлантического океана недалеко от Рио-де-Жанейро и Сан-Паулу.",
        location: "Ангра-дус-Рейс, штат Рио-де-Жанейро, Бразилия",
        city: "Ангра-дус-Рейс",
        units: [
            { id: 1, name: "Ангра-1", type: "pwr", model: "PWR (Westinghouse)", capacity: 640, status: "operational", startYear: 1985 },
            { id: 2, name: "Ангра-2", type: "pwr", model: "PWR (Siemens/KWU)", capacity: 1350, status: "operational", startYear: 2001 },
            { id: 3, name: "Ангра-3", type: "pwr", model: "PWR (Siemens/KWU)", capacity: 1405, status: "construction", startYear: 2010, expectedYear: 2028 }
        ],
        history: [
            { year: "1971", title: "ПЛАНИРОВАНИЕ", description: "Правительство Бразилии одобрило строительство АЭС" },
            { year: "1976", title: "НАЧАЛО СТРОИТЕЛЬСТВА АНГРА-1", description: "Старт работ по первому блоку" },
            { year: "1985", title: "ПУСК АНГРА-1", description: "Первый реактор подключен к сети" },
            { year: "2001", title: "ПУСК АНГРА-2", description: "Второй блок введен в эксплуатацию после долгой задержки" },
            { year: "2010", title: "ВОЗОБНОВЛЕНИЕ АНГРА-3", description: "Возобновление строительства третьего блока" }
        ],
        facts: [
            "Ангра-1 и Ангра-2 обеспечивают около 3% электроэнергии Бразилии",
            "Ангра-3 станет первым реактором с почти полным национальным участием в строительстве",
            "Комплекс расположен в живописной бухте Илья-Гранди, что вызывает экологические споры",
            "Бразилия обладает шестыми в мире запасами урана и развивает собственный топливный цикл"
        ]
    },
    // ==================== МЕКСИКА ====================
    {
        id: 1850,
        name: "АЭС Лагуна-Верде",
        country: { name: "Мексика", flag: "🇲🇽" },
        coords: [19.7203, -96.4058],
        status: "operational",
        totalCapacity: 1600,
        startYear: 1990,
        overview: "Единственная атомная электростанция в Мексике. Расположена на побережье Мексиканского залива и играет важную роль в энергоснабжении восточной части страны.",
        location: "Альто-Лусеро, штат Веракрус, Мексика",
        city: "Альто-Лусеро",
        units: [
            { id: 1, name: "Лагуна-Верде-1", type: "bwr", model: "BWR-5", capacity: 800, status: "operational", startYear: 1990 },
            { id: 2, name: "Лагуна-Верде-2", type: "bwr", model: "BWR-5", capacity: 800, status: "operational", startYear: 1995 }
        ],
        history: [
            { year: "1976", title: "ПРОЕКТ", description: "Принятие решения о строительстве АЭС" },
            { year: "1989", title: "ПУСК ПЕРВОГО БЛОКА", description: "Лагуна-Верде-1 подключен к сети" },
            { year: "1995", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Второй блок введен в эксплуатацию" },
            { year: "2010-е", title: "МОДЕРНИЗАЦИЯ", description: "Проведена масштабная модернизация с увеличением мощности каждого блока на 20%" }
        ],
        facts: [
            "Использует кипящие водо-водяные реакторы (BWR) американской компании General Electric",
            "После модернизации мощность каждого блока увеличилась с 682 МВт до 800 МВт",
            "Станция производит около 4-5% электроэнергии Мексики",
            "Расположена в зоне, подверженной ураганам, что потребовало специальных мер защиты"
        ]
    },
    // ==================== ЮАР ====================
    {
        id: 1900,
        name: "АЭС Кёберг",
        country: { name: "ЮАР", flag: "🇿🇦" },
        coords: [-33.6764, 18.4328],
        status: "operational",
        totalCapacity: 1940,
        startYear: 1984,
        overview: "Единственная атомная электростанция в Африке. Расположена на берегу Атлантического океана недалеко от Кейптауна и обеспечивает электроэнергией Западно-Капскую провинцию.",
        location: "Между Мелькбосстрандом и Ду-Нуф, Западно-Капская провинция, ЮАР",
        city: "Кейптаун",
        units: [
            { id: 1, name: "Кёберг-1", type: "pwr", model: "CP1 (Framatome)", capacity: 970, status: "operational", startYear: 1984 },
            { id: 2, name: "Кёберг-2", type: "pwr", model: "CP1 (Framatome)", capacity: 970, status: "operational", startYear: 1985 }
        ],
        history: [
            { year: "1976", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства при участии французской Framatome" },
            { year: "1984", title: "ПУСК ПЕРВОГО БЛОКА", description: "Кёберг-1 подключен к сети" },
            { year: "1985", title: "ПОЛНАЯ МОЩНОСТЬ", description: "Запуск второго блока" },
            { year: "2010", title: "ПРОДЛЕНИЕ СРОКА СЛУЖБЫ", description: "Начало программы по продлению эксплуатации на 20 лет" },
            { year: "2022", title: "ТОПЛИВНЫЙ КРИЗИС", description: "Отложена загрузка топлива из-за российско-украинского конфликта" }
        ],
        facts: [
            "Обеспечивает около 5% электроэнергии ЮАР, но до 50% для Западно-Капской провинции",
            "Реакторы используют низкообогащенный уран, поставляемый в основном из России",
            "Станция расположена в сейсмически стабильном районе, но подвержена сильным ветрам",
            "ЮАР разрабатывала собственную ядерную технологию PBMR (реактор с шаровой засыпкой), но проект был заморожен"
        ]
    },
// ==================== ШЕСТОЙ ПАКЕТ: Действующие, строящиеся и закрытые АЭС (продолжение) ====================

    // ==================== БОЛГАРИЯ (дополнение) ====================
    {
        id: 2200,
        name: "АЭС Белене",
        country: { name: "Болгария", flag: "🇧🇬" },
        coords: [43.6333, 25.1833],
        status: "abandoned",
        totalCapacity: 2000,
        startYear: null,
        overview: "Недостроенная атомная электростанция, один из самых долгих и спорных энергетических проектов в Европе. Строительство началось в 1980-х, затем неоднократно замораживалось и возобновлялось. Окончательно остановлено в 2012 году.",
        location: "Белене, Плевенская область, Болгария",
        city: "Белене",
        units: [
            { id: 1, name: "Белене-1", type: "vver", model: "ВВЭР-1000/320", capacity: 1000, status: "abandoned", startYear: null },
            { id: 2, name: "Белене-2", type: "vver", model: "ВВЭР-1000/320", capacity: 1000, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1981", title: "НАЧАЛО ПРОЕКТА", description: "Начало проектирования и подготовка площадки" },
            { year: "1987", title: "ЗАМОРОЗКА", description: "Строительство приостановлено из-за протестов и изменения экологических норм" },
            { year: "2008", title: "ВОЗОБНОВЛЕНИЕ", description: "Подписание контракта с российским «Атомстройэкспортом» на завершение строительства" },
            { year: "2012", title: "ОКОНЧАТЕЛЬНАЯ ОСТАНОВКА", description: "Правительство Болгарии принимает решение об отказе от проекта" }
        ],
        facts: [
            "Затраты на проект составили более 1 млрд евро без ввода в эксплуатацию",
            "Оборудование для станции (реакторы, турбины) было изготовлено и хранится на складах",
            "В 2022 году, на фоне энергетического кризиса, в Болгарии вновь заговорили о возможном возобновлении проекта"
        ]
    },
    // ==================== ВЕНГРИЯ (строящийся блок) ====================
    {
        id: 2250,
        name: "АЭС Пакш (расширение)",
        country: { name: "Венгрия", flag: "🇭🇺" },
        coords: [46.5731, 18.8531],
        status: "construction",
        totalCapacity: 2400,
        startYear: 2036,
        overview: "Проект расширения действующей АЭС Пакш двумя новыми энергоблоками. Новые блоки планируется построить по российскому проекту ВВЭР-1200. Проект имеет стратегическое значение для энергобезопасности Венгрии.",
        location: "Пакш, Тольна, Венгрия",
        city: "Пакш",
        units: [
            { id: 3, name: "Пакш-5", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2036, expectedYear: 2032 },
            { id: 4, name: "Пакш-6", type: "vver", model: "ВВЭР-1200", capacity: 1200, status: "construction", startYear: 2036, expectedYear: 2033 }
        ],
        history: [
            { year: "2014", title: "СОГЛАШЕНИЕ", description: "Подписание межправительственного соглашения с Россией о строительстве новых блоков" },
            { year: "2022", title: "ПОЛУЧЕНИЕ ЛИЦЕНЗИИ", description: "Управление по атомной энергии Венгрии выдало лицензию на строительство" },
            { year: "2024", title: "НАЧАЛО РАБОТ", description: "Начало основных строительных работ на площадке" }
        ],
        facts: [
            "Это будет первый в ЕС проект строительства АЭС по российской технологии после введения санкций",
            "Проект финансируется за счет российского кредита",
            "Новые блоки позволят увеличить долю атомной энергетики в Венгрии до 70%"
        ]
    },
    // ==================== ЧЕХИЯ (строящийся блок) ====================
    {
        id: 2300,
        name: "АЭС Дукованы (новый блок)",
        country: { name: "Чехия", flag: "🇨🇿" },
        coords: [49.0831, 16.1494],
        status: "construction",
        totalCapacity: 1200,
        startYear: 2029,
        overview: "Проект строительства нового энергоблока на площадке действующей АЭС Дукованы. Цель — замена выводимых из эксплуатации старых блоков и сохранение доли атомной энергии в энергобалансе страны.",
        location: "Дукованы, Высочина, Чехия",
        city: "Дукованы",
        units: [
            { id: 5, name: "Дукованы-5", type: "pwr", model: "AP1000 или EPR", capacity: 1200, status: "construction", startYear: 2029, expectedYear: 2036 }
        ],
        history: [
            { year: "2015", title: "ПЛАНИРОВАНИЕ", description: "Чехия объявляет тендер на строительство нового блока" },
            { year: "2022", title: "ВЫБОР ПОДРЯДЧИКА", description: "В тендере участвуют Westinghouse (AP1000), EDF (EPR) и KHNP (APR1400)" },
            { year: "2024", title: "ПОДПИСАНИЕ ДОГОВОРА", description: "Ожидается подписание контракта с победителем тендера" }
        ],
        facts: [
            "Это один из крупнейших инфраструктурных проектов в истории Чехии",
            "Правительство гарантирует закупку электроэнергии с нового блока по фиксированной цене",
            "Проект поддерживается на государственном уровне как элемент энергетической независимости"
        ]
    },
    // ==================== ФРАНЦИЯ (закрытая АЭС) ====================
    {
        id: 2350,
        name: "АЭС Фессенхайм",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.9022, 7.5622],
        status: "closed",
        totalCapacity: 1800,
        startYear: 1977,
        overview: "Старейшая атомная электростанция Франции, окончательно остановленная в 2020 году. Её закрытие стало результатом политического решения, принятого после аварии на Фукусиме, и стало символом начала сокращения доли атомной энергетики в стране.",
        location: "Фессенхайм, Гранд-Эст, Франция",
        city: "Фессенхайм",
        units: [
            { id: 1, name: "Фессенхайм-1", type: "pwr", model: "CP0", capacity: 900, status: "closed", startYear: 1977, endYear: 2020 },
            { id: 2, name: "Фессенхайм-2", type: "pwr", model: "CP0", capacity: 900, status: "closed", startYear: 1977, endYear: 2020 }
        ],
        history: [
            { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первых блоков Франции" },
            { year: "1977", title: "ПУСК", description: "Оба блока введены в эксплуатацию" },
            { year: "2011", title: "РЕШЕНИЕ О ЗАКРЫТИИ", description: "Президент Франсуа Олланд объявляет о планах закрыть АЭС к 2016 году" },
            { year: "2020", title: "ОКОНЧАТЕЛЬНАЯ ОСТАНОВКА", description: "Блоки остановлены в феврале и июне соответственно" }
        ],
        facts: [
            "Несмотря на протесты местных жителей, выступавших за сохранение рабочих мест, станция была закрыта",
            "Вывод из эксплуатации займет не менее 15 лет",
            "Закрытие АЭС привело к потере около 2 тыс. рабочих мест в регионе"
        ]
    },
    // ==================== США (закрытая АЭС) ====================
    {
        id: 2400,
        name: "АЭС Индиан-Пойнт",
        country: { name: "США", flag: "🇺🇸" },
        coords: [41.2681, -73.9456],
        status: "closed",
        totalCapacity: 2075,
        startYear: 1962,
        overview: "Крупная атомная станция, расположенная всего в 40 км от центра Нью-Йорка. Её закрытие в 2021 году стало результатом многолетних протестов общественности и властей штата, требовавших её закрытия из-за близости к мегаполису.",
        location: "Бьюкенен, штат Нью-Йорк, США",
        city: "Нью-Йорк",
        units: [
            { id: 1, name: "Indian Point-1", type: "pwr", model: "PWR", capacity: 275, status: "closed", startYear: 1962, endYear: 1974 },
            { id: 2, name: "Indian Point-2", type: "pwr", model: "Westinghouse 4-loop", capacity: 1020, status: "closed", startYear: 1974, endYear: 2020 },
            { id: 3, name: "Indian Point-3", type: "pwr", model: "Westinghouse 4-loop", capacity: 1030, status: "closed", startYear: 1976, endYear: 2021 }
        ],
        history: [
            { year: "1956", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого блока" },
            { year: "1962", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети" },
            { year: "2017", title: "СОГЛАШЕНИЕ О ЗАКРЫТИИ", description: "Компания-оператор Entergy заключает соглашение с властями штата о досрочном закрытии" },
            { year: "2021", title: "ПОЛНОЕ ЗАКРЫТИЕ", description: "Остановка последнего работающего блока" }
        ],
        facts: [
            "Обеспечивала до 25% электроэнергии Нью-Йорка и его пригородов",
            "Закрытие станции привело к увеличению использования газа для выработки электроэнергии в регионе",
            "После закрытия начат многолетний процесс вывода из эксплуатации"
        ]
    },
// ==================== ВЕЛИКОБРИТАНИЯ (дополнение) ====================
{
    id: 2500,
    name: "АЭС Хантерстон",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [55.722, -4.889],
    status: "closed",
    totalCapacity: 985,
    startYear: 1964,
    overview: "Крупная атомная станция в Шотландии с двумя усовершенствованными газоохлаждаемыми реакторами (AGR). Была остановлена в 2021-2022 годах, завершив почти 50 лет эксплуатации. Находится в процессе вывода из эксплуатации[citation:7].",
    location: "Хантерстон, Северный Эйршир, Шотландия, Великобритания",
    city: "Ларгс",
    units: [
        { id: 1, name: "Хантерстон B-1", type: "gcr", model: "AGR", capacity: 492, status: "closed", startYear: 1976, endYear: 2021 },
        { id: 2, name: "Хантерстон B-2", type: "gcr", model: "AGR", capacity: 493, status: "closed", startYear: 1977, endYear: 2022 }
    ],
    history: [
        { year: "1964", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства площадки Хантерстон" },
        { year: "1976", title: "ПУСК БЛОКА B-1", description: "Первый реактор AGR на площадке B подключен к сети" },
        { year: "2022", title: "ОКОНЧАТЕЛЬНАЯ ОСТАНОВКА", description: "Последний реактор (B-2) остановлен 7 января 2022 года" }
    ],
    facts: [
        "Станция состояла из двух разных комплексов: Hunterston A (реакторы Magnox, закрыты в 1990) и Hunterston B (AGR)",
        "Реакторы AGR позволяли перегружать топливо без остановки реактора",
        "После закрытия стала одним из крупнейших проектов по выводу из эксплуатации в Великобритании"
    ]
},
{
    id: 2501,
    name: "АЭС Хейшам",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [54.029, -2.914],
    status: "operational",
    totalCapacity: 2400,
    startYear: 1983,
    overview: "Крупная атомная станция на северо-западе Англии, состоит из двух усовершенствованных газоохлаждаемых реакторов (AGR). Важный источник энергии для региона, срок эксплуатации продлен.",
    location: "Хейшам, Ланкашир, Англия, Великобритания",
    city: "Хейшам",
    units: [
        { id: 1, name: "Хейшам-1", type: "gcr", model: "AGR", capacity: 1200, status: "operational", startYear: 1983 },
        { id: 2, name: "Хейшам-2", type: "gcr", model: "AGR", capacity: 1200, status: "operational", startYear: 1984 }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции" },
        { year: "1983", title: "ПУСК ПЕРВОГО БЛОКА", description: "Блок 1 подключен к сети" },
        { year: "2024", title: "ПРОДЛЕНИЕ", description: "Срок эксплуатации продлен до 2026 года" }
    ],
    facts: [
        "Использует уникальную британскую технологию AGR (Advanced Gas-cooled Reactor)",
        "Теплоноситель — углекислый газ, замедлитель — графит",
        "Станция производит около 4% электроэнергии Великобритании"
    ]
},
{
    id: 2502,
    name: "АЭС Дангеннесс",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [50.915, 0.962],
    status: "closed",
    totalCapacity: 1110,
    startYear: 1965,
    overview: "Прибрежная атомная станция в графстве Кент, состоявшая из двух очередей: Дангеннесс A (реакторы Magnox) и Дангеннесс B (реакторы AGR). Обе очереди полностью выведены из эксплуатации.",
    location: "Дангеннесс, Кент, Англия, Великобритания",
    city: "Лидд",
    units: [
        // Дангеннесс A
        { id: 1, name: "Дангеннесс A-1", type: "gcr", model: "Magnox", capacity: 230, status: "closed", startYear: 1965, endYear: 2006 },
        { id: 2, name: "Дангеннесс A-2", type: "gcr", model: "Magnox", capacity: 230, status: "closed", startYear: 1965, endYear: 2006 },
        // Дангеннесс B
        { id: 3, name: "Дангеннесс B-1", type: "gcr", model: "AGR", capacity: 520, status: "closed", startYear: 1983, endYear: 2021 },
        { id: 4, name: "Дангеннесс B-2", type: "gcr", model: "AGR", capacity: 520, status: "closed", startYear: 1985, endYear: 2021 }
    ],
    history: [
        { year: "1960", title: "СТРОИТЕЛЬСТВО А", description: "Начало строительства первой очереди (Magnox)" },
        { year: "1965", title: "ПУСК ДАНГЕННЕСС А", description: "Оба реактора Magnox подключены к сети" },
        { year: "1983", title: "ПУСК ДАНГЕННЕСС B", description: "Запуск первой очереди с реакторами AGR" },
        { year: "2021", title: "ПОЛНОЕ ЗАКРЫТИЕ", description: "Остановка последних реакторов B-1 и B-2" }
    ],
    facts: [
        "Расположена на крупнейшей в Европе галечной косе",
        "Дангеннесс B была последней работавшей станцией с реакторами AGR в Великобритании",
        "Станция известна характерными белыми градирнями, видными с Ла-Манша"
    ]
},
{
    id: 2503,
    name: "АЭС Беркли",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [51.692, -2.452],
    status: "closed",
    totalCapacity: 276,
    startYear: 1962,
    overview: "Одна из первых коммерческих атомных станций Великобритании с реакторами типа Magnox. Закрыта в 1989 году, стала первой британской АЭС, прошедшей полный процесс вывода из эксплуатации (до стадии «коричневой лужайки»).",
    location: "Беркли, Глостершир, Англия, Великобритания",
    city: "Беркли",
    units: [
        { id: 1, name: "Беркли-1", type: "gcr", model: "Magnox", capacity: 138, status: "closed", startYear: 1962, endYear: 1989 },
        { id: 2, name: "Беркли-2", type: "gcr", model: "Magnox", capacity: 138, status: "closed", startYear: 1962, endYear: 1989 }
    ],
    history: [
        { year: "1957", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства на берегу реки Северн" },
        { year: "1962", title: "ПУСК", description: "Оба реактора подключены к сети с разницей в несколько месяцев" },
        { year: "1989", title: "ЗАКРЫТИЕ", description: "Остановка по экономическим причинам после 27 лет работы" },
        { year: "2020", title: "ЗАВЕРШЕНИЕ ВЫВОДА", description: "Завершены основные работы по выводу из эксплуатации" }
    ],
    facts: [
        "Была пионером в разработке методов безопасного вывода АЭС из эксплуатации",
        "На площадке остаются только промежуточные хранилища отходов, остальные сооружения снесены",
        "Служила испытательным полигоном для технологий демонтажа"
    ]
},
{
    id: 2504,
    name: "АЭС Олдбери",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [51.641, -2.562],
    status: "closed",
    totalCapacity: 434,
    startYear: 1967,
    overview: "Еще одна ранняя британская АЭС с реакторами Magnox, расположенная на берегу реки Северн. Проработала более 40 лет, сейчас находится на продвинутой стадии вывода из эксплуатации.",
    location: "Олдбери-он-Северн, Саут-Глостершир, Англия, Великобритания",
    city: "Олдбери",
    units: [
        { id: 1, name: "Олдбери-1", type: "gcr", model: "Magnox", capacity: 217, status: "closed", startYear: 1967, endYear: 2012 },
        { id: 2, name: "Олдбери-2", type: "gcr", model: "Magnox", capacity: 217, status: "closed", startYear: 1968, endYear: 2011 }
    ],
    history: [
        { year: "1962", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1967", title: "ПУСК БЛОКА-1", description: "Первый реактор подключен к сети" },
        { year: "2012", title: "ПОЛНОЕ ЗАКРЫТИЕ", description: "Остановка последнего реактора" }
    ],
    facts: [
        "Корпуса реакторов выполнены из предварительно напряженного бетона",
        "На площадке планируется строительство новой АЭС с малыми модульными реакторами (SMR)",
        "Соседствует с недостроенной АЭС Олдбери B, где планировались реакторы AGR"
    ]
},
{
    id: 2505,
    name: "АЭС Уилфа",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [53.416574, -4.482580],
    status: "closed",
    totalCapacity: 990,
    startYear: 1971,
    overview: "Крупнейшая в мире АЭС с реакторами типа Magnox, расположенная на острове Англси в Уэльсе. Состояла из двух мощных реакторов и проработала более 40 лет.",
    location: "Уилфа, Англси, Уэльс, Великобритания",
    city: "Холихед",
    units: [
        { id: 1, name: "Уилфа-1", type: "gcr", model: "Magnox", capacity: 495, status: "closed", startYear: 1971, endYear: 2015 },
        { id: 2, name: "Уилфа-2", type: "gcr", model: "Magnox", capacity: 495, status: "closed", startYear: 1971, endYear: 2012 }
    ],
    history: [
        { year: "1963", title: "СТРОИТЕЛЬСТВО", description: "Начало масштабного строительства" },
        { year: "1971", title: "ПУСК", description: "Оба реактора подключены к сети в течение года" },
        { year: "2015", title: "ЗАВЕРШЕНИЕ", description: "Остановка последнего реактора (Уилфа-1)" }
    ],
    facts: [
        "Имела самые мощные реакторы Magnox в мире",
        "Выработка за всю историю превысила 230 ТВт·ч",
        "На площадке планируется строительство новой АЭС «Уилфа Ньюидд» с реакторами BWRX-300"
    ]
},
// ==================== ГЕРМАНИЯ (закрытые АЭС) ====================
{
    id: 2550,
    name: "АЭС Брокдорф",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [53.85, 9.35],
    status: "closed",
    totalCapacity: 1440,
    startYear: 1986,
    overview: "Одна из последних немецких АЭС, остановленных в 2021 году в рамках поэтапного отказа от атомной энергетики (Atomausstieg). Считалась одной из самых современных и безопасных станций в Германии[citation:9].",
    location: "Брокдорф, Шлезвиг-Гольштейн, Германия",
    city: "Эльмсхорн",
    units: [
        { id: 1, name: "Брокдорф", type: "pwr", model: "Konvoi", capacity: 1440, status: "closed", startYear: 1986, endYear: 2021 }
    ],
    history: [
        { year: "1976", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1986", title: "ПУСК", description: "Подключение к сети в год аварии на Чернобыльской АЭС" },
        { year: "2011", title: "ПОВОРОТ", description: "Решение о досрочном закрытии после аварии на Фукусиме" },
        { year: "2021", title: "ОСТАНОВКА", description: "Окончательное отключение от сети 31 декабря" }
    ],
    facts: [
        "Относилась к серии реакторов Konvoi — третьему и последнему поколению немецких PWR",
        "Имела высочайшие показатели безопасности и КИУМ (коэффициент использования установленной мощности)",
        "Решение о закрытии вызвало споры, так как станция могла работать еще много лет[citation:9]"
    ]
},
{
    id: 2551,
    name: "АЭС Гундремминген",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [48.511, 10.401],
    status: "closed",
    totalCapacity: 2688,
    startYear: 1984,
    overview: "Крупный атомный энергетический комплекс в Баварии, полностью остановленный в 2021 году. Состоял из блоков разных поколений: кипящего водо-водяного реактора (BWR) и двух усовершенствованных кипящих реакторов (SWR).",
    location: "Гундремминген, Бавария, Германия",
    city: "Гюнцбург",
    units: [
        { id: 1, name: "Gundremmingen A", type: "bwr", model: "BWR", capacity: 250, status: "closed", startYear: 1966, endYear: 1977 },
        { id: 2, name: "Gundremmingen B", type: "bwr", model: "SWR-72", capacity: 1344, status: "closed", startYear: 1984, endYear: 2021 },
        { id: 3, name: "Gundremmingen C", type: "bwr", model: "SWR-72", capacity: 1344, status: "closed", startYear: 1984, endYear: 2021 }
    ],
    history: [
        { year: "1962", title: "СТРОИТЕЛЬСТВО БЛОКА А", description: "Начало строительства первого немецкого коммерческого кипящего реактора" },
        { year: "1977", title: "АВАРИЯ НА БЛОКЕ А", description: "Серьезная авария привела к полному разрушению блока А" },
        { year: "1984", title: "ПУСК БЛОКОВ B И C", description: "Ввод в эксплуатацию современных блоков" },
        { year: "2021", title: "ЗАКРЫТИЕ", description: "Остановка блоков B и C 31 декабря" }
    ],
    facts: [
        "Блок А был полностью разрушен в 1977 году из-за аварии, вызванной человеческим фактором",
        "Блоки B и C были идентичными и самыми мощными кипящими реакторами в Германии",
        "На площадке планируются проекты в области термоядерного синтеза[citation:9]"
    ]
},
{
    id: 2552,
    name: "АЭС Графенрайнфельд",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [49.983, 10.183],
    status: "closed",
    totalCapacity: 1345,
    startYear: 1981,
    overview: "Крупная атомная станция в Баварии, остановленная в 2015 году. Стала первой жертвой немецкого Atomausstieg среди действующих современных АЭС. Её досрочное закрытие вызвало много споров.",
    location: "Графенрайнфельд, Бавария, Германия",
    city: "Швайнфурт",
    units: [
        { id: 1, name: "Графенрайнфельд", type: "pwr", model: "Konvoi", capacity: 1345, status: "closed", startYear: 1981, endYear: 2015 }
    ],
    history: [
        { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1981", title: "ПУСК", description: "Подключение к сети" },
        { year: "2011", title: "РЕШЕНИЕ О ЗАКРЫТИИ", description: "Включена в список АЭС для немедленного закрытия после Фукусимы" },
        { year: "2015", title: "ОСТАНОВКА", description: "Окончательное отключение 27 июня" }
    ],
    facts: [
        "Была самой новой из восьми АЭС, закрытых в 2011 году",
        "Оператор подал иск о компенсации убытков из-за досрочного закрытия",
        "После остановки Бавария столкнулась с необходимостью импортировать электроэнергию"
    ]
},
{
    id: 2553,
    name: "АЭС Филиппсбург",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [49.253, 8.436],
    status: "closed",
    totalCapacity: 2268,
    startYear: 1979,
    overview: "Крупная атомная станция на Рейне, состоявшая из двух блоков разных поколений. Блок 1 (BWR) закрыт в 2011 году, блок 2 (PWR) — в 2019 году. Полностью выведена из эксплуатации.",
    location: "Филиппсбург, Баден-Вюртемберг, Германия",
    city: "Карлсруэ",
    units: [
        { id: 1, name: "Филиппсбург-1", type: "bwr", model: "BWR-69", capacity: 926, status: "closed", startYear: 1979, endYear: 2011 },
        { id: 2, name: "Филиппсбург-2", type: "pwr", model: "Konvoi", capacity: 1468, status: "closed", startYear: 1984, endYear: 2019 }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства кипящего реактора" },
        { year: "1984", title: "ПУСК БЛОКА-2", description: "Ввод в эксплуатацию современного водо-водяного реактора" },
        { year: "2019", title: "ФИНАЛ", description: "Остановка блока 2 в декабре, завершение истории станции" }
    ],
    facts: [
        "Блок 2 был одним из самых современных и мощных в Германии",
        "Станция расположена в густонаселенном регионе, что вызывало обеспокоенность",
        "Градирни станции были заметными ориентирами на Рейне"
    ]
},
{
    id: 2554,
    name: "АЭС Библис",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [49.711, 8.415],
    status: "closed",
    totalCapacity: 2524,
    startYear: 1974,
    overview: "Крупнейший атомный энергетический комплекс в Германии, состоявший из двух блоков. Закрыта в 2011 году (блок A) и 2017 году (блок B) в рамках отказа от атомной энергии. Символизировала эпоху немецкой атомной энергетики[citation:7].",
    location: "Библис, Гессен, Германия",
    city: "Вормс",
    units: [
        { id: 1, name: "Библис A", type: "pwr", model: "PWR", capacity: 1204, status: "closed", startYear: 1974, endYear: 2011 },
        { id: 2, name: "Библис B", type: "pwr", model: "PWR", capacity: 1300, status: "closed", startYear: 1976, endYear: 2017 }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало масштабного проекта" },
        { year: "1974", title: "ПУСК БЛОКА А", description: "Самый мощный на тот момент реактор в мире подключен к сети" },
        { year: "2011", title: "ОСТАНОВКА БЛОКА А", description: "Немедленное закрытие после решения правительства" },
        { year: "2017", title: "КОНЕЦ ЭПОХИ", description: "Остановка блока B 31 декабря" }
    ],
    facts: [
        "Блок A был крупнейшим реактором в мире на момент пуска",
        "Станция стала символом как мощи немецкой атомной энергетики, так и её заката",
        "Процесс вывода из эксплуатации займет десятилетия"
    ]
},
{
    id: 2555,
    name: "АЭС Унтервезер",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [53.433, 8.467],
    status: "closed",
    totalCapacity: 1410,
    startYear: 1978,
    overview: "Прибрежная атомная станция на берегу реки Везер, закрытая в 2011 году. Работала более 30 лет и была важным источником энергии для северной Германии.",
    location: "Штадтланд, Нижняя Саксония, Германия",
    city: "Бремерхафен",
    units: [
        { id: 1, name: "Унтервезер", type: "pwr", model: "PWR", capacity: 1410, status: "closed", startYear: 1978, endYear: 2011 }
    ],
    history: [
        { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1978", title: "ПУСК", description: "Подключение к сети" },
        { year: "2011", title: "ВНЕЗАПНОЕ ЗАКРЫТИЕ", description: "Остановка в августе после решения об Atomausstieg" }
    ],
    facts: [
        "Использовала воду реки Везер для охлаждения",
        "Была одной из восьми АЭС, немедленно закрытых после Фукусимы",
        "Решение о закрытии было политическим, а не техническим"
    ]
},
{
    id: 2556,
    name: "АЭС Крюммель",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [53.417, 10.4],
    status: "closed",
    totalCapacity: 1402,
    startYear: 1983,
    overview: "Кипящий водо-водяной реактор в Шлезвиг-Гольштейне, печально известный частыми техническими проблемами и инцидентами. Окончательно закрыт в 2011 году после серии аварий и общественного давления.",
    location: "Гайстахт, Шлезвиг-Гольштейн, Германия",
    city: "Гамбург",
    units: [
        { id: 1, name: "Крюммель", type: "bwr", model: "BWR-69", capacity: 1402, status: "closed", startYear: 1983, endYear: 2011 }
    ],
    history: [
        { year: "1974", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1983", title: "ПУСК", description: "Подключение к сети" },
        { year: "2007", title: "ПОЖАР", description: "Серьезный пожар в трансформаторе, приведший к долгому простою" },
        { year: "2011", title: "ОКОНЧАТЕЛЬНОЕ ЗАКРЫТИЕ", description: "Остановка после решения об Atomausstieg" }
    ],
    facts: [
        "Неоднократно останавливалась из-за технических проблем",
        "Расположена в сейсмически спокойном регионе",
        "После закрытия начат долгий процесс вывода из эксплуатации"
    ]
},
{
    id: 2557,
    name: "АЭС Брунсбюттель",
    country: { name: "Германия", flag: "🇩🇪" },
    coords: [53.9, 9.183],
    status: "closed",
    totalCapacity: 806,
    startYear: 1976,
    overview: "Еще один проблемный кипящий реактор в Шлезвиг-Гольштейне, известный многочисленными инцидентами и низкой надежностью. Окончательно закрыт в 2011 году.",
    location: "Брунсбюттель, Шлезвиг-Гольштейн, Германия",
    city: "Брунсбюттель",
    units: [
        { id: 1, name: "Брунсбюттель", type: "bwr", model: "BWR-69", capacity: 806, status: "closed", startYear: 1976, endYear: 2011 }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1976", title: "ПУСК", description: "Подключение к сети" },
        { year: "2007", title: "ДЛИТЕЛЬНЫЙ ПРОСТОЙ", description: "Остановка после землетрясения в Японии, выявившего проблемы с сейсмостойкостью" },
        { year: "2011", title: "ОФИЦИАЛЬНОЕ ЗАКРЫТИЕ", description: "Остановка в рамках Atomausstieg" }
    ],
    facts: [
        "Имела один из самых низких КИУМ среди немецких АЭС",
        "Часто критиковалась антиатомным движением",
        "Закрытие было встречено с облегчением местными жителями"
    ]
},
// ==================== ЯПОНИЯ (дополнение) ====================
{
    id: 2600,
    name: "АЭС Гэнкай",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [33.516, 129.837],
    status: "operational",
    totalCapacity: 3468,
    startYear: 1975,
    overview: "Атомная станция на западном побережье острова Кюсю. Блоки 1 и 2 закрыты, блоки 3 и 4 перезапущены после Фукусимы и продолжают работу. Известна тем, что стала первой станцией, перезапущенной после введения новых правил безопасности[citation:3][citation:8].",
    location: "Гэнкай, префектура Сага, Япония",
    city: "Гэнкай",
    units: [
        { id: 1, name: "Гэнкай-1", type: "pwr", model: "M (2-loop)", capacity: 559, status: "closed", startYear: 1975, endYear: 2015 },
        { id: 2, name: "Гэнкай-2", type: "pwr", model: "M (2-loop)", capacity: 559, status: "closed", startYear: 1980, endYear: 2019 },
        { id: 3, name: "Гэнкай-3", type: "pwr", model: "M (4-loop)", capacity: 1180, status: "operational", startYear: 1994 },
        { id: 4, name: "Гэнкай-4", type: "pwr", model: "M (4-loop)", capacity: 1180, status: "operational", startYear: 1997 }
    ],
    history: [
        { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого блока" },
        { year: "1975", title: "ПУСК БЛОКА-1", description: "Первый реактор на Кюсю подключен к сети" },
        { year: "2011", title: "ОСТАНОВКА", description: "Все блоки остановлены после аварии на Фукусиме" },
        { year: "2018", title: "ПЕРВЫЙ ПЕРЕЗАПУСК", description: "Блок 3 перезапущен первым среди остановленных АЭС Японии" }
    ],
    facts: [
        "Блок 3 стал первым реактором в Японии, перезапущенным после ужесточения правил безопасности",
        "Станция снабжает электроэнергией крупный промышленный регион Китакюсю-Фукуока",
        "Местные власти активно поддерживали перезапуск для экономического развития региона[citation:8]"
    ]
},
{
    id: 2601,
    name: "АЭС Сэндай",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [31.834, 130.190],
    status: "operational",
    totalCapacity: 1780,
    startYear: 1984,
    overview: "Первая атомная станция в Японии, получившая разрешение на перезапуск после аварии на Фукусиме в 2014 году. Оба блока были перезапущены в 2015 году и с тех пор стабильно работают[citation:3][citation:8].",
    location: "Сатсумасендай, префектура Кагосима, Япония",
    city: "Сатсумасендай",
    units: [
        { id: 1, name: "Сэндай-1", type: "pwr", model: "M (3-loop)", capacity: 890, status: "operational", startYear: 1984 },
        { id: 2, name: "Сэндай-2", type: "pwr", model: "M (3-loop)", capacity: 890, status: "operational", startYear: 1985 }
    ],
    history: [
        { year: "1979", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1984", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети" },
        { year: "2014", title: "ИСТОРИЧЕСКОЕ РЕШЕНИЕ", description: "Получено первое в Японии разрешение на перезапуск по новым правилам" },
        { year: "2015", title: "ПЕРЕЗАПУСК", description: "Блоки 1 и 2 перезапущены в августе и октябре" }
    ],
    facts: [
        "Станция сыграла ключевую роль в восстановлении доверия к атомной энергетике Японии",
        "Расположена в относительно малонаселенном районе, что облегчило получение согласия местных жителей",
        "Стала образцом для других японских АЭС, стремящихся к перезапуску[citation:8]"
    ]
},
{
    id: 2602,
    name: "АЭС Михама",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [35.703, 135.964],
    status: "operational",
    totalCapacity: 1666,
    startYear: 1970,
    overview: "Одна из старейших действующих АЭС Японии. Блоки 1 и 2 закрыты, блок 3 продолжает работу после модернизации и получил разрешение на эксплуатацию сверх 40-летнего срока[citation:3][citation:8].",
    location: "Михама, префектура Фукуи, Япония",
    city: "Михама",
    units: [
        { id: 1, name: "Михама-1", type: "pwr", model: "WH 2-loop", capacity: 340, status: "closed", startYear: 1970, endYear: 2015 },
        { id: 2, name: "Михама-2", type: "pwr", model: "WH 2-loop", capacity: 500, status: "closed", startYear: 1972, endYear: 2015 },
        { id: 3, name: "Михама-3", type: "pwr", model: "WH 3-loop", capacity: 826, status: "operational", startYear: 1976 }
    ],
    history: [
        { year: "1967", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства первой очереди" },
        { year: "1970", title: "ПУСК БЛОКА-1", description: "Запуск одного из первых коммерческих реакторов Японии" },
        { year: "2004", title: "АВАРИЯ", description: "Смертельная авария на блоке 3 из-за разрыва трубы второго контура" },
        { year: "2016", title: "ПРОДЛЕНИЕ СРОКА", description: "Блоку 3 разрешена работа сверх 40 лет после модернизации" },
        { year: "2021", title: "ПЕРЕЗАПУСК БЛОКА-3", description: "Перезапуск после модернизации безопасности" }
    ],
    facts: [
        "Блок 3 — старейший действующий коммерческий реактор в Японии",
        "Авария 2004 года привела к гибели 5 рабочих и ужесточению правил инспекции трубопроводов",
        "Демонстрирует возможность безопасной эксплуатации реакторов старше 40 лет при должной модернизации[citation:8]"
    ]
},
{
    id: 2603,
    name: "АЭС Такахама",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [35.522, 135.505],
    status: "operational",
    totalCapacity: 3392,
    startYear: 1974,
    overview: "Крупная атомная станция на западном побережье Японии. Все четыре блока были перезапущены после Фукусимы и продолжают работу. Известна использованием MOX-топлива (смешанного оксидного топлива) в некоторых блоках[citation:3][citation:8].",
    location: "Такахама, префектура Фукуи, Япония",
    city: "Такахама",
    units: [
        { id: 1, name: "Такахама-1", type: "pwr", model: "M (3-loop)", capacity: 826, status: "operational", startYear: 1974 },
        { id: 2, name: "Такахама-2", type: "pwr", model: "M (3-loop)", capacity: 826, status: "operational", startYear: 1975 },
        { id: 3, name: "Такахама-3", type: "pwr", model: "M (4-loop)", capacity: 870, status: "operational", startYear: 1985 },
        { id: 4, name: "Такахама-4", type: "pwr", model: "M (4-loop)", capacity: 870, status: "operational", startYear: 1985 }
    ],
    history: [
        { year: "1967", title: "СТРОИТЕЛЬСТВО БЛОКОВ 1-2", description: "Начало строительства первых блоков" },
        { year: "1974", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети" },
        { year: "2011", title: "ОСТАНОВКА", description: "Все блоки остановлены после Фукусимы" },
        { year: "2016-2023", title: "ПОЭТАПНЫЙ ПЕРЕЗАПУСК", description: "Блоки 3, 4, 1 и 2 перезапущены после модернизации" }
    ],
    facts: [
        "Блоки 3 и 4 — одни из первых в Японии, использующих MOX-топливо",
        "Станция расположена в регионе с высокой концентрацией атомных мощностей (префектура Фукуи)",
        "Имеет современные системы безопасности, включая пассивные фильтровентиляционные установки[citation:8]"
    ]
},
{
    id: 2604,
    name: "АЭС Симанэ",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [35.538, 132.999],
    status: "stopped",
    totalCapacity: 1498,
    startYear: 1974,
    overview: "Атомная станция на западном побережлении Японии, известная тем, что имеет единственный в Японии кипящий водо-водяной реактор (BWR), построенный не компанией Toshiba или Hitachi. Блок 3 находится в стадии строительства[citation:3][citation:8].",
    location: "Мацуэ, префектура Симанэ, Япония",
    city: "Мацуэ",
    units: [
        { id: 1, name: "Симанэ-1", type: "bwr", model: "BWR-3", capacity: 460, status: "closed", startYear: 1974, endYear: 2015 },
        { id: 2, name: "Симанэ-2", type: "bwr", model: "BWR-5", capacity: 820, status: "stopped", startYear: 1989 },
        { id: 3, name: "Симанэ-3", type: "bwr", model: "ABWR", capacity: 1373, status: "construction", startYear: 2007, expectedYear: "неопределенно" }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства" },
        { year: "1974", title: "ПУСК БЛОКА-1", description: "Первый коммерческий реактор Chugoku Electric подключен к сети" },
        { year: "2007", title: "НАЧАЛО СТРОИТЕЛЬСТВА БЛОКА-3", description: "Заложен третий блок с реактором ABWR" },
        { year: "2011", title: "ОСТАНОВКА", description: "Блок 2 остановлен после Фукусимы, строительство блока 3 приостановлено" }
    ],
    facts: [
        "Блок 2 — единственный BWR в Японии, построенный компанией Mitsubishi",
        "Строительство блока 3 было заморожено на несколько лет после Фукусимы",
        "В 2024 году блок 2 получил разрешение на перезапуск, но дата не определена[citation:8]"
    ]
},
{
    id: 2605,
    name: "АЭС Томари",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [43.036, 140.512],
    status: "stopped",
    totalCapacity: 2070,
    startYear: 1989,
    overview: "Единственная атомная станция на острове Хоккайдо, самой северной префектуре Японии. Все три блока остановлены после Фукусимы. Играет критически важную роль в энергоснабжении изолированного острова, но их перезапуск задерживается[citation:3][citation:8].",
    location: "Томари, префектура Хоккайдо, Япония",
    city: "Томари",
    units: [
        { id: 1, name: "Томари-1", type: "pwr", model: "M (2-loop)", capacity: 579, status: "stopped", startYear: 1989 },
        { id: 2, name: "Томари-2", type: "pwr", model: "M (2-loop)", capacity: 579, status: "stopped", startYear: 1991 },
        { id: 3, name: "Томари-3", type: "pwr", model: "M (4-loop)", capacity: 912, status: "stopped", startYear: 2009 }
    ],
    history: [
        { year: "1985", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства первой АЭС на Хоккайдо" },
        { year: "1989", title: "ПУСК БЛОКА-1", description: "Первый реактор подключен к сети" },
        { year: "2009", title: "ПУСК БЛОКА-3", description: "Запуск самого нового блока за несколько лет до Фукусимы" },
        { year: "2012", title: "ОСТАНОВКА", description: "Блок 3 остановлен для планового обслуживания и больше не перезапускался" }
    ],
    facts: [
        "Блок 3 был последним реактором, построенным в Японии до аварии на Фукусиме",
        "Остановка АЭС вынудила Хоккайдо увеличить импорт ископаемого топлива",
        "Вопрос перезапуска является политически sensitive на Хоккайдо[citation:8]"
    ]
},
{
    id: 2606,
    name: "АЭС Хамаока",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [34.624, 138.142],
    status: "stopped",
    totalCapacity: 3617,
    startYear: 1976,
    overview: "Печально известная атомная станция, расположенная в сейсмически опасной зоне, где, по прогнозам, в ближайшие 30 лет может произойти мощное землетрясение. Была остановлена в 2011 году по требованию правительства, и её будущее остается неопределенным[citation:3][citation:8].",
    location: "Омаэдзаки, префектура Сидзуока, Япония",
    city: "Омаэдзаки",
    units: [
        { id: 1, name: "Хамаока-1", type: "bwr", model: "BWR-4", capacity: 540, status: "closed", startYear: 1976, endYear: 2009 },
        { id: 2, name: "Хамаока-2", type: "bwr", model: "BWR-4", capacity: 840, status: "closed", startYear: 1978, endYear: 2009 },
        { id: 3, name: "Хамаока-3", type: "bwr", model: "BWR-5", capacity: 1100, status: "stopped", startYear: 1987 },
        { id: 4, name: "Хамаока-4", type: "bwr", model: "BWR-5", capacity: 1137, status: "stopped", startYear: 1993 },
        { id: 5, name: "Хамаока-5", type: "bwr", model: "ABWR", capacity: 1267, status: "stopped", startYear: 2005 }
    ],
    history: [
        { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства в регионе с высокой сейсмической активностью" },
        { year: "1976", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети" },
        { year: "2011", title: "ТРЕБОВАНИЕ О ЗАКРЫТИИ", description: "Правительство потребовало остановить станцию из-за риска цунами" },
        { year: "2013", title: "ОТКАЗ ОТ ПЕРЕЗАПУСКА", description: "Компания-оператор заявила, что не будет добиваться перезапуска блоков 1 и 2" }
    ],
    facts: [
        "Расположена всего в 200 км от Токио, что вызывает особую обеспокоенность",
        "Перед остановкой были построены огромные морские стены для защиты от цунами",
        "Рассматривается как возможный кандидат на полный вывод из эксплуатации[citation:8]"
    ]
},
{
    id: 2607,
    name: "АЭС Токай",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [36.467, 140.607],
    status: "closed",
    totalCapacity: 1100,
    startYear: 1966,
    overview: "Первая коммерческая атомная электростанция в Японии. Блок 1 (газоохлаждаемый реактор Magnox британского производства) уже выведен из эксплуатации. Блок 2 (BWR) остановлен после Фукусимы, и ведутся дебаты о его возможном перезапуске[citation:3][citation:8].",
    location: "Токай, префектура Ибараки, Япония",
    city: "Токай",
    units: [
        { id: 1, name: "Токай-1", type: "gcr", model: "Magnox", capacity: 166, status: "closed", startYear: 1966, endYear: 1998 },
        { id: 2, name: "Токай-2", type: "bwr", model: "BWR-5", capacity: 1100, status: "stopped", startYear: 1978 }
    ],
    history: [
        { year: "1961", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства первого японского коммерческого реактора" },
        { year: "1966", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Токай-1 подключен к сети, началась японская атомная эра" },
        { year: "1998", title: "ЗАКРЫТИЕ БЛОКА-1", description: "Остановка устаревшего газоохлаждаемого реактора" },
        { year: "2011", title: "ОСТАНОВКА БЛОКА-2", description: "Остановка после Фукусимы" },
        { year: "2018", title: "РАЗРЕШЕНИЕ НА ПРОДЛЕНИЕ", description: "Блоку 2 разрешена работа до 60 лет (до 2038)" }
    ],
    facts: [
        "Токай-1 был первым и единственным газоохлаждаемым реактором в Японии",
        "Блок 2 получил разрешение на работу до 60 лет, но его перезапуск откладывается",
        "Станция символизирует всю историю японской атомной энергетики — от начала до текущих проблем[citation:8]"
    ]
},
{
    id: 2608,
 name: "АЭС Онагава",
    country: { name: "Япония", flag: "🇯🇵" },
    coords: [38.401, 141.500],
    status: "operational",
    totalCapacity: 2174,
    startYear: 1984,
    overview: "Атомная станция, наиболее близкая к эпицентру землетрясения 2011 года. Несмотря на сильнейшие толчки и цунами, успешно выдержала стихию благодаря инженерным защитам, став примером «устойчивой АЭС». Блок 2 перезапущен в 2024 году[citation:3][citation:8].",
    location: "Онагава, префектура Мияги, Япония",
    city: "Онагава",
    units: [
        { id: 1, name: "Онагава-1", type: "bwr", model: "BWR-4", capacity: 524, status: "closed", startYear: 1984, endYear: 2018 },
        { id: 2, name: "Онагава-2", type: "bwr", model: "BWR-4", capacity: 825, status: "operational", startYear: 1995 },
        { id: 3, name: "Онагава-3", type: "bwr", model: "BWR-5", capacity: 825, status: "stopped", startYear: 2002 }
    ],
    history: [
        { year: "1980", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства" },
        { year: "2011", title: "ИСПЫТАНИЕ СТИХИЕЙ", description: "Выдержала землетрясение магнитудой 9.0 и 13-метровое цунами" },
        { year: "2018", title: "ЗАКРЫТИЕ БЛОКА-1", description: "Принято решение не перезапускать самый старый блок" },
        { year: "2024", title: "ПЕРЕЗАПУСК БЛОКА-2", description: "Блок 2 перезапущен в октябре после 13-летнего простоя" }
    ],
    facts: [
        "Находилась всего в 80 км от эпицентра Великого землетрясения Восточной Японии",
        "Защитная стена высотой 14 метров спасла станцию от разрушительного цунами",
        "Её относительно успешное поведение во время катастрофы 2011 года изучается во всем мире[citation:8]"
    ]
},
// ==================== ЭКСПЕРИМЕНТАЛЬНЫЕ И ПРОТОТИПНЫЕ АЭС (важные исторически) ====================
{
    id: 2650,
    name: "АЭС Шиппингпорт",
    country: { name: "США", flag: "🇺🇸" },
    coords: [40.62, -80.43],
    status: "closed",
    totalCapacity: 68,
    startYear: 1958,
    overview: "Первая в мире полноценная атомная электростанция с водо-водяным реактором (PWR) и первая гражданская АЭС в США. Построена как демонстрационный проект и проработала 25 лет[citation:1].",
    location: "Шиппингпорт, Пенсильвания, США",
    city: "Шиппингпорт",
    units: [
        { id: 1, name: "Шиппингпорт", type: "pwr", model: "PWR (первый коммерческий)", capacity: 68, status: "closed", startYear: 1958, endYear: 1982 }
    ],
    history: [
        { year: "1954", title: "РЕШЕНИЕ", description: "Президент Эйзенхауэр объявляет о строительстве как части программы «Атом для мира»" },
        { year: "1958", title: "ИСТОРИЧЕСКИЙ ПУСК", description: "Подключена к сети, став первой в мире АЭС с PWR[citation:1]" },
        { year: "1982", title: "ЗАКРЫТИЕ", description: "Остановлена по экономическим причинам" },
        { year: "1989", title: "ВЫВОД", description: "Завершен вывод из эксплуатации, площадка очищена" }
    ],
    facts: [
        "Реактор изначально разрабатывался для авианосца, но был адаптирован для гражданского использования",
        "Доказала коммерческую жизнеспособность атомной энергетики",
        "Стоимость строительства составила $72,5 млн"
    ]
},
{
    id: 2651,
 name: "АЭС Калдер-Холл",
    country: { name: "Великобритания", flag: "🇬🇧" },
    coords: [54.418, -3.496],
    status: "closed",
    totalCapacity: 240,
    startYear: 1956,
    overview: "Первая в мире промышленная атомная электростанция, подключенная к национальной энергосистеме. Имела двойное назначение: производство электроэнергии и наработка оружейного плутония. Символ начала мирной атомной эры[citation:1].",
    location: "Селлафилд, Камбрия, Англия, Великобритания",
    city: "Селлафилд",
    units: [
        { id: 1, name: "Calder Hall-1", type: "gcr", model: "Magnox", capacity: 60, status: "closed", startYear: 1956, endYear: 2003 },
        { id: 2, name: "Calder Hall-2", type: "gcr", model: "Magnox", capacity: 60, status: "closed", startYear: 1957, endYear: 2003 },
        { id: 3, name: "Calder Hall-3", type: "gcr", model: "Magnox", capacity: 60, status: "closed", startYear: 1958, endYear: 2003 },
        { id: 4, name: "Calder Hall-4", type: "gcr", model: "Magnox", capacity: 60, status: "closed", startYear: 1959, endYear: 2003 }
    ],
    history: [
        { year: "1953", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства на площадке Селлафилд" },
        { year: "1956", title: "МИРОВАЯ ПРЕМЬЕРА", description: "Королева Елизавета II официально открыла станцию, подключив ее к сети[citation:1]" },
        { year: "2003", title: "ЗАКРЫТИЕ ЭПОХИ", description: "После 47 лет работы все четыре реактора остановлены" }
    ],
    facts: [
        "Именно её открытие считается началом коммерческой атомной энергетики в мире",
        "Производила плутоний для британской ядерной программы до 1995 года",
        "Дизайн Magnox, отработанный здесь, лег в основу первой серии британских АЭС"
    ]
},
{
    id: 2652,
    name: "Атомная электростанция Ролфтон (NPD)",
    country: { name: "Канада", flag: "🇨🇦" },
    coords: [46.186495840054555, -77.65794734118224],
    status: "closed",
    totalCapacity: 25,
    startYear: 1962,
    overview: "Первая в Канаде атомная электростанция и прототип будущих тяжеловодных реакторов CANDU. Небольшая демонстрационная станция доказала жизнеспособность канадского ядерного направления и позволила отработать ключевые технологии[citation:5].",
    location: "Ролфтон, Онтарио, Канада",
    city: "Ролфтон",
    units: [
        { id: 1, name: "NPD", type: "phwr", model: "CANDU prototype", capacity: 25, status: "closed", startYear: 1962, endYear: 1987 }
    ],
    history: [
        { year: "1958", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства прототипа" },
        { year: "1962", title: "ПУСК", description: "Подключена к сети, стала первой в мире АЭС с тяжеловодным реактором, построенной за полярным кругом[citation:1]" },
        { year: "1987", title: "ЗАКРЫТИЕ", description: "Остановлена после 25 лет успешной работы" }
    ],
    facts: [
        "Доказала концепцию канального тяжеловодного реактора, охлаждаемого обычной водой",
        "Отработала технологию перегрузки топлива на работающем реакторе, ставшую визитной карточкой CANDU",
        "Малая мощность (25 МВт) позволяла экспериментировать с минимальным риском[citation:5]"
    ]
},
{
    id: 2653,
    name: "Атомная электростанция Дуглас-Пойнт",
    country: { name: "Канада", flag: "🇨🇦" },
    coords: [44.33, -81.60],
    status: "closed",
    totalCapacity: 218,
    startYear: 1968,
    overview: "Первый коммерческий тяжеловодный реактор CANDU и вторая атомная станция Канады. Увеличила масштаб технологии, отработанной на NPD, и стала моделью для будущих крупных АЭС[citation:5].",
    location: "Кинкардин, Онтарио, Канада",
    city: "Кинкардин",
    units: [
        { id: 1, name: "Дуглас-Пойнт", type: "candu", model: "CANDU 200", capacity: 218, status: "closed", startYear: 1968, endYear: 1984 }
    ],
    history: [
        { year: "1960", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первого коммерческого CANDU" },
        { year: "1968", title: "ПУСК", description: "Подключение к сети" },
        { year: "1984", title: "ЗАКРЫТИЕ", description: "Остановлена для планового ремонта, но не перезапущена из-за экономических причин" }
    ],
    facts: [
        "Мощность была почти в 10 раз больше, чем у прототипа NPD",
        "Отработала многие системы, которые позже использовались на АЭС Пикеринг и Брюс",
        "На момент закрытия выработала 36.3 ТВт·ч электроэнергии[citation:5]"
    ]
},
{
    id: 2654,
    name: "АЭС Дрезден",
    country: { name: "США", flag: "🇺🇸" },
    coords: [41.383, -88.267],
    status: "operational",
    totalCapacity: 953,
    startYear: 1960,
    overview: "Первая в мире коммерческая атомная электростанция с кипящим водо-водяным реактором (BWR), построенная полностью на частные инвестиции. Доказала экономическую целесообразность крупномасштабной ядерной энергетики[citation:1].",
    location: "Моррис, Иллинойс, США",
    city: "Моррис",
    units: [
        { id: 1, name: "Дрезден-1", type: "bwr", model: "BWR-1", capacity: 210, status: "closed", startYear: 1960, endYear: 1978 },
        { id: 2, name: "Дрезден-2", type: "bwr", model: "BWR-3", capacity: 894, status: "operational", startYear: 1970 },
        { id: 3, name: "Дрезден-3", type: "bwr", model: "BWR-3", capacity: 894, status: "operational", startYear: 1971 }
    ],
    history: [
        { year: "1956", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства новаторского проекта" },
        { year: "1960", title: "МИРОВОЙ ПРИОРИТЕТ", description: "Дрезден-1 стал первым в мире коммерческим BWR, подключенным к сети[citation:1]" },
        { year: "1970-е", title: "РАСШИРЕНИЕ", description: "Ввод более мощных блоков 2 и 3" },
        { year: "1978", title: "ЗАКРЫТИЕ БЛОКА-1", description: "Остановлен по экономическим причинам" }
    ],
    facts: [
        "Блок 1 был построен всего за 4 года",
        "Успех Дрездена привел к массовому заказу реакторов BWR в 1960-х годах",
        "Станция до сих пор производит электроэнергию, демонстрируя долговечность технологии"
    ]
},
// ==================== ВОСЬМОЙ ПАКЕТ: Критические дополнения (Япония, исторические, экспериментальные) ====================

    // ==================== ЯПОНИЯ (КРИТИЧЕСКИЕ ДОПОЛНЕНИЯ) ====================
    {
        id: 2700,
        name: "АЭС Цуруга",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [35.7517, 136.0181],
        status: "stopped",
        totalCapacity: 1517,
        startYear: 1970,
        overview: "Атомная станция на западном побережье Японии. Блок 1 — старейший коммерческий реактор, эксплуатировавшийся компанией Japan Atomic Power Company (JAPC). В 2015 году регулятор постановил, что Блок 1, расположенный над активным геологическим разломом, не должен перезапускаться, что предопределило его закрытие.",
        location: "Цуруга, префектура Фукуи, Япония",
        city: "Цуруга",
        units: [
            { id: 1, name: "Цуруга-1", type: "bwr", model: "BWR-2", capacity: 357, status: "closed", startYear: 1970, endYear: 2015 },
            { id: 2, name: "Цуруга-2", type: "pwr", model: "M (4-loop)", capacity: 1160, status: "stopped", startYear: 1987 }
        ],
        history: [
            { year: "1966", title: "СТРОИТЕЛЬСТВО БЛОКА-1", description: "Начало строительства первого блока JAPC." },
            { year: "1970", title: "ПУСК БЛОКА-1", description: "Пуск первого коммерческого реактора JAPC." },
            { year: "2015", title: "ВЕРДИКТ ПО БЛОКУ-1", description: "NRA постановил, что реактор расположен над активным разломом, и его нельзя перезапускать." },
            { year: "2021", title: "ОФИЦИАЛЬНОЕ РЕШЕНИЕ", description: "JAPC приняла решение вывести из эксплуатации Блок 1." }
        ],
        facts: [
            "Блок 1 стал первым коммерческим реактором, выведенным из эксплуатации из-за геологических рисков (активного разлома).",
            "Блок 2 — один из первых в Японии, планировавших использование MOX-топлива.",
            "Решение по Блоку 1 стало прецедентом в японском регулировании."
        ]
    },
    {
        id: 2701,
        name: "АЭС Фукусима II (Фукусима Дайичи)",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [37.3181, 141.0228],
        status: "closed",
        totalCapacity: 4400,
        startYear: 1982,
        overview: "Вторая атомная станция компании TEPCO в префектуре Фукусима, расположенная примерно в 12 км к югу от печально известной АЭС Фукусима I. Хотя во время землетрясения и цунами 2011 года она также пострадала, персоналу удалось добиться холодной остановки реакторов. Все четыре блока были окончательно закрыты.",
        location: "Нараха и Томиока, префектура Фукусима, Япония",
        city: "Томиока",
        units: [
            { id: 1, name: "Фукусима II-1", type: "bwr", model: "BWR-5", capacity: 1100, status: "closed", startYear: 1982, endYear: 2019 },
            { id: 2, name: "Фукусима II-2", type: "bwr", model: "BWR-5", capacity: 1100, status: "closed", startYear: 1984, endYear: 2019 },
            { id: 3, name: "Фукусима II-3", type: "bwr", model: "BWR-5", capacity: 1100, status: "closed", startYear: 1985, endYear: 2019 },
            { id: 4, name: "Фукусима II-4", type: "bwr", model: "BWR-5", capacity: 1100, status: "closed", startYear: 1987, endYear: 2019 }
        ],
        history: [
            { year: "1975", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства станции." },
            { year: "1982", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети." },
            { year: "2011", title: "БОРЬБА С ПОСЛЕДСТВИЯМИ", description: "Цунами вывело из строя системы охлаждения, но персонал смог восстановить питание и добиться холодной остановки." },
            { year: "2019", title: "ОКОНЧАТЕЛЬНОЕ ЗАКРЫТИЕ", description: "TEPCO официально объявила о решении вывести из эксплуатации все четыре блока." }
        ],
        facts: [
            "Успешная холодная остановка в условиях катастрофы сделала её примером эффективного управления тяжёлой аварией.",
            "Решение о закрытии было в основном политическим и экономическим, а не техническим.",
            "Часто остаётся в тени аварии на соседней АЭС Фукусима I."
        ]
    },
    {
        id: 2702,
        name: "АЭС Хамаока",
        country: { name: "Япония", flag: "🇯🇵" },
        coords: [34.6242, 138.1425],
        status: "stopped",
        totalCapacity: 3617,
        startYear: 1976,
        overview: "Одна из самых спорных АЭС Японии, расположенная в районе с высокой вероятностью мощного землетрясения в ближайшие десятилетия (зона Токай). В 2011 году правительство потребовало её остановки до сооружения усиленных защитных средств от цунами. Будущее станции неопределенно.",
        location: "Омаэдзаки, префектура Сидзуока, Япония",
        city: "Омаэдзаки",
        units: [
            { id: 1, name: "Хамаока-1", type: "bwr", model: "BWR-4", capacity: 540, status: "closed", startYear: 1976, endYear: 2009 },
            { id: 2, name: "Хамаока-2", type: "bwr", model: "BWR-4", capacity: 840, status: "closed", startYear: 1978, endYear: 2009 },
            { id: 3, name: "Хамаока-3", type: "bwr", model: "BWR-5", capacity: 1100, status: "stopped", startYear: 1987 },
            { id: 4, name: "Хамаока-4", type: "bwr", model: "BWR-5", capacity: 1137, status: "stopped", startYear: 1993 },
            { id: 5, name: "Хамаока-5", type: "bwr", model: "ABWR", capacity: 1267, status: "stopped", startYear: 2005 }
        ],
        history: [
            { year: "1971", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства в сейсмически активной зоне." },
            { year: "1976", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети." },
            { year: "2011", title: "ПРИКАЗ ОБ ОСТАНОВКЕ", description: "Правительство Японии потребовало остановить работу станции ввиду прогноза сильного землетрясения." },
            { year: "2013", title: "ОТКАЗ ОТ СТАРЫХ БЛОКОВ", description: "Компания Chubu Electric заявила об отказе от перезапуска блоков 1 и 2." }
        ],
        facts: [
            "Расположена всего в ~200 км от Токио, что вызывает особую обеспокоенность.",
            "После остановки были построены гигантские волнорезы и стены высотой до 22 метров.",
            "Станция является наглядным примером конфликта между энергетическими потребностями и сейсмическими рисками."
        ]
    },

    // ==================== США (ЭКСПЕРИМЕНТАЛЬНЫЕ И ИСТОРИЧЕСКИЕ) ====================
    {
        id: 2750,
        name: "SL-1 (Stationary Low-Power Reactor Number One)",
        country: { name: "США", flag: "🇺🇸" },
        coords: [43.516, -112.817],
        status: "accident",
        totalCapacity: 0.2,
        startYear: 1958,
        overview: "Экспериментальный армейский кипящий водо-водяной реактор, печально известный взрывом 3 января 1961 года, в результате которого погибли три оператора. Это первая и единственная авария со смертельным исходом на атомной электростанции в США. Привела к серьёзным изменениям в проектировании органов управления реактором и процедурах безопасности.",
        location: "Национальная лаборатория Айдахо, Айдахо, США",
        city: "Айдахо-Фолс",
        units: [
            { id: 1, name: "SL-1", type: "bwr", model: "экспериментальный BWR", capacity: 0.2, status: "accident", startYear: 1958, endYear: 1961 }
        ],
        history: [
            { year: "1957", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства для армейской программы по созданию удалённых АЭС." },
            { year: "1958", title: "ПУСК", description: "Реактор достиг критичности." },
            { year: "1961", title: "КАТАСТРОФА", description: "Критическая авария во время плановых работ по повторному подключению стержня ручного управления. Взрыв и выброс радиоактивности." },
            { year: "1962", title: "ЗАХОРОНЕНИЕ", description: "Обеззараженный корпус реактора захоронен на территории полигона." }
        ],
        facts: [
            "Мощность — всего 200 кВт (эл.), предназначался для отопления и электроснабжения удалённых арктических баз.",
            "Причина аварии — слишком быстрое и чрезмерное извлечение центрального стержня ручного управления одним оператором.",
            "Авария привела к введению принципа «двух человек» для критических операций и изменению конструкции органов управления."
        ]
    },
    {
        id: 2751,
        name: "Виндскейль (Windscale Piles)",
        country: { name: "Великобритания", flag: "🇬🇧" },
        coords: [54.424, -3.497],
        status: "accident",
        totalCapacity: 0,
        startYear: 1950,
        overview: "Два воздушного охлаждения графитовых реактора (Pile 1 и Pile 2) на площадке Селлафилд, построенные для производства плутония. Реактор Pile 1 был уничтожен пожаром в октябре 1957 года — самой серьёзной ядерной аварией в истории Великобритании (уровень 5 по INES). Пожар привёл к значительному выбросу радиоактивных материалов, включая йод-131.",
        location: "Селлафилд, Камбрия, Великобритания",
        city: "Селлафилд",
        units: [
            { id: 1, name: "Windscale Pile 1", type: "gcr", model: "Графито-воздушный", capacity: 0, status: "accident", startYear: 1950, endYear: 1957 },
            { id: 2, name: "Windscale Pile 2", type: "gcr", model: "Графито-воздушный", capacity: 0, status: "closed", startYear: 1951, endYear: 1957 }
        ],
        history: [
            { year: "1947", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства в условиях холодной войны." },
            { year: "1950", title: "ПУСК PILE 1", description: "Первый реактор достиг критичности." },
            { year: "1957", title: "ПОЖАР", description: "7-11 октября: неконтролируемый пожар в активной зоне Pile 1 из-за выделения энергии Вигнера." },
            { year: "1970-е", title: "КОНСЕРВАЦИЯ", description: "Разрушенный реактор законсервирован, работы по выводу продолжаются десятилетиями." }
        ],
        facts: [
            "Имели горизонтальные каналы для уранового топлива, охлаждались воздухом, подаваемым гигантскими вентиляторами.",
            "Пожар тушили, в том числе, перекрыв воздух и заливая воду, что было крайне рискованно.",
            "Авария привела к созданию в Великобритании Комитета по ядерной установке (Nuclear Installations Inspectorate)."
        ]
    },
    {
        id: 2753,
        name: "АЭС Сакстон (Saxton)",
        country: { name: "США", flag: "🇺🇸" },
        coords: [39.92, -78.24],
        status: "closed",
        totalCapacity: 3.5,
        startYear: 1962,
        overview: "Маленькая экспериментальная атомная электростанция, построенная для испытаний различных типов ядерного топлива и конструкционных материалов. Представляла собой уменьшенную версию корпусного водо-водяного реактора (PWR). Не использовалась для коммерческого производства электроэнергии, а исключительно в исследовательских целях.",
        location: "Сакстон, Пенсильвания, США",
        city: "Сакстон",
        units: [
            { id: 1, name: "Saxton", type: "pwr", model: "Экспериментальный PWR", capacity: 3.5, status: "closed", startYear: 1962, endYear: 1972 }
        ],
        history: [
            { year: "1960", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства как совместного проекта компаний и регулирующих органов." },
            { year: "1962", title: "ПУСК", description: "Реактор достиг критичности." },
            { year: "1972", title: "ЗАКРЫТИЕ", description: "Остановка после выполнения основной исследовательской программы." },
            { year: "2005", title: "ВЫВОД", description: "Завершён вывод из эксплуатации, площадка освобождена." }
        ],
        facts: [
            "Мощность — всего 3.5 МВт (тепл.) / 0.7 МВт (эл.).",
            "Служила тестовым стендом для топлива Westinghouse, которое позже использовалось на крупных коммерческих АЭС.",
            "Пример чисто исследовательского ядерного объекта, не ставившего экономических целей."
        ]
    },

    // ==================== ФРАНЦИЯ (ДОПОЛНЕНИЯ) ====================
    {
        id: 2800,
        name: "АЭС Шуз (Chooz)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [50.0906, 4.7931],
        status: "operational",
        totalCapacity: 3130,
        startYear: 1967,
        overview: "Знаковая атомная станция, первый блок которой (Chooz A) был первым реактором PWR во Франции, построенным в сотрудничестве с Бельгией. Современные блоки Chooz B (1 и 2) — это реакторы серии N4, самые мощные во Франции на момент ввода. Расположена в пещере, вырубленной в скале, что уникально для французских АЭС.",
        location: "Шуз, департамент Арденны, Франция",
        city: "Шуз",
        units: [
            { id: 1, name: "Chooz A", type: "pwr", model: "PWR (прототип)", capacity: 320, status: "closed", startYear: 1967, endYear: 1991 },
            { id: 2, name: "Chooz B-1", type: "pwr", model: "N4", capacity: 1560, status: "operational", startYear: 2000 },
            { id: 3, name: "Chooz B-2", type: "pwr", model: "N4", capacity: 1560, status: "operational", startYear: 2000 }
        ],
        history: [
            { year: "1960", title: "СТРОИТЕЛЬСТВО CHOZ A", description: "Начало строительства первого франко-бельгийского PWR." },
            { year: "1967", title: "ПУСК CHOZ A", description: "Пуск реактора, ставшего прототипом для французской программы PWR." },
            { year: "1991", title: "ЗАКРЫТИЕ CHOZ A", description: "Остановка прототипа после 24 лет эксплуатации." },
            { year: "2000", title: "ПУСК БЛОКОВ B", description: "Ввод в эксплуатацию двух современных реакторов N4." }
        ],
        facts: [
            "Chooz A располагался в подземной пещере для минимизации визуального и экологического воздействия.",
            "Реакторы N4 (1500 МВт) — вершина развития французской технологии PWR перед переходом к EPR.",
            "Chooz B также частично расположена под землёй, продолжая традицию площадки."
        ]
    },
    {
        id: 2801,
        name: "АЭС Сен-Лоран (Saint-Laurent)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.7211, 1.5786],
        status: "closed",
        totalCapacity: 1840,
        startYear: 1969,
        overview: "Одна из первых промышленных АЭС Франции. Состояла из двух разных очередей: Сен-Лоран A (два газоохлаждаемых реактора с графитовым замедлителем, UNGG) и Сен-Лоран B (два водо-водяных реактора PWR). Станция стала местом двух серьёзных инцидентов (в 1969 и 1980 годах), связанных с частичным расплавлением топлива.",
        location: "Сен-Лоран-Нуан, департамент Луар и Шер, Франция",
        city: "Сен-Лоран-Нуан",
        units: [
            { id: 1, name: "St-Laurent A-1", type: "gcr", model: "UNGG", capacity: 500, status: "closed", startYear: 1969, endYear: 1990 },
            { id: 2, name: "St-Laurent A-2", type: "gcr", model: "UNGG", capacity: 530, status: "closed", startYear: 1971, endYear: 1992 },
            { id: 3, name: "St-Laurent B-1", type: "pwr", model: "CP2", capacity: 915, status: "closed", startYear: 1983, endYear: 2020 },
            { id: 4, name: "St-Laurent B-2", type: "pwr", model: "CP2", capacity: 985, status: "closed", startYear: 1981, endYear: 2022 }
        ],
        history: [
            { year: "1963", title: "СТРОИТЕЛЬСТВО А", description: "Начало строительства реакторов UNGG." },
            { year: "1969", title: "ИНЦИДЕНТ НА A-1", description: "Частичное расплавление топливных элементов из-за ошибки при перегрузке (уровень 4 по INES)." },
            { year: "1980", title: "ИНЦИДЕНТ НА A-2", description: "Второй инцидент с расплавлением топлива из-за засорения каналов охлаждения (уровень 4 по INES)." },
            { year: "2022", title: "ЗАКРЫТИЕ ЭПОХИ", description: "Остановка последнего блока B-2." }
        ],
        facts: [
            "Единственная АЭС во Франции, где произошли два инцидента 4-го уровня по шкале INES.",
            "Инциденты на UNGG ускорили решение Франции отказаться от этой технологии в пользу PWR.",
            "Блоки B были одними из последних действовавших реакторов серии CP2."
        ]
    },

    // ==================== ГЕРМАНИЯ (ДОПОЛНЕНИЯ) ====================
    {
        id: 2850,
        name: "МЗФР (Многоцелевой исследовательский реактор) Юлих",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [50.905, 6.413],
        status: "closed",
        totalCapacity: 0,
        startYear: 1967,
        overview: "Высокообогащённый ураном (HEU) реактор с гелиевым охлаждением и графитовым замедлителем (тип AVR — Arbeitsgemeinschaft Versuchsreaktor), являвшийся прототипом высокотемпературных реакторов (HTR). Известен передовой технологией, но также и серьёзными проблемами с радиоактивным загрязнением из-за дисперсионного топлива. Остановлен и находится в процессе сложного вывода из эксплуатации.",
        location: "Юлих, земля Северный Рейн-Вестфалия, Германия",
        city: "Юлих",
        units: [
            { id: 1, name: "AVR Jülich", type: "other", model: "HTR (газоохлаждаемый, графитовый)", capacity: 15, status: "closed", startYear: 1967, endYear: 1988 }
        ],
        history: [
            { year: "1961", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства экспериментального высокотемпературного реактора." },
            { year: "1967", title: "ПУСК", description: "Реактор достиг критичности." },
            { year: "1974", title: "ТЕМПЕРАТУРНЫЙ РЕКОРД", description: "Температура теплоносителя на выходе достигла 950°C — рекорд для энергетических реакторов." },
            { year: "1988", title: "ОСТАНОВКА", description: "Остановка после экспериментальной эксплуатации." }
        ],
        facts: [
            "Использовал микротвэлы (шариковое топливо), которые должны были удерживать продукты деления, но на практике привели к сильному загрязнению контура.",
            "Являлся технологическим предшественником китайского HTR-10 и строящегося HTR-PM.",
            "Вывод из эксплуатации крайне сложен и дорог из-за распространённого радиоактивного загрязнения графитовых конструкций."
        ]
    },
    {
        id: 2851,
        name: "АЭС Обригхайм (Obrigheim)",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [49.3639, 9.0722],
        status: "closed",
        totalCapacity: 357,
        startYear: 1968,
        overview: "Первая коммерческая атомная электростанция в Западной Германии с водо-водяным реактором (PWR). Построена по лицензии американской компании Westinghouse. Несмотря на небольшую мощность, сыграла ключевую роль в освоении технологии PWR в Германии. Остановлена в 2005 году в рамках соглашения между правительством и энергокомпаниями.",
        location: "Обригхайм, земля Баден-Вюртемберг, Германия",
        city: "Обригхайм",
        units: [
            { id: 1, name: "Obrigheim (KWO)", type: "pwr", model: "PWR (Westinghouse)", capacity: 357, status: "closed", startYear: 1968, endYear: 2005 }
        ],
        history: [
            { year: "1965", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства пионерского проекта." },
            { year: "1968", title: "ПУСК", description: "Первый немецкий коммерческий PWR подключён к сети." },
            { year: "2001", title: "СОГЛАШЕНИЕ", description: "Включена в список АЭС для досрочного закрытия по соглашению с правительством." },
            { year: "2005", title: "ОСТАНОВКА", description: "Окончательное отключение от сети 11 мая." }
        ],
        facts: [
            "Отработала 37 лет с высоким коэффициентом использования установленной мощности.",
            "Станция стала учебным полигоном для целого поколения немецких атомщиков.",
            "Находится в процессе вывода из эксплуатации, демонтаж реактора ожидается после 2030 года."
        ]
    },
    {
        id: 2852,
        name: "АЭС Вюргассен (Würgassen)",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [51.6403, 9.4258],
        status: "closed",
        totalCapacity: 670,
        startYear: 1971,
        overview: "Единственный в Германии коммерческий кипящий водо-водяной реактор (BWR) западногерманской постройки (остальные BWR были достроены в ГДР или имели иностранные корни). Известен многочисленными техническими проблемами, включая коррозионное растрескивание под напряжением в корпусе реактора. Остановлен по экономическим соображениям.",
        location: "Беверунген, земля Северный Рейн-Вестфалия, Германия",
        city: "Беверунген",
        units: [
            { id: 1, name: "Würgassen (KWW)", type: "bwr", model: "BWR-69", capacity: 670, status: "closed", startYear: 1971, endYear: 1994 }
        ],
        history: [
            { year: "1968", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства." },
            { year: "1971", title: "ПУСК", description: "Подключение к сети." },
            { year: "1991", title: "ПРОБЛЕМЫ С КОРПУСОМ", description: "Обнаружены серьёзные трещины в корпусе реактора." },
            { year: "1994", title: "ДОСРОЧНОЕ ЗАКРЫТИЕ", description: "Остановка по экономическим причинам, ремонт признан нецелесообразным." }
        ],
        facts: [
            "Первый в мире реактор, на котором были обнаружены трещины в корпусе из-за коррозии под напряжением.",
            "Его проблемы привели к усилению контроля за целостностью корпусов реакторов по всему миру.",
            "Вывод из эксплуатации и демонтаж были в основном завершены, градирня снесена в 2019 году."
        ]
    },
    {
        id: 2853,
        name: "АЭС Райнсберг (Rheinsberg)",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [53.133, 12.883],
        status: "closed",
        totalCapacity: 70,
        startYear: 1966,
        overview: "Первая коммерческая атомная электростанция в Германской Демократической Республике (ГДР). Использовала советский водо-водяной реактор ВВЭР-70, прототип более крупных ВВЭР-440. Имела двойное назначение: выработка электроэнергии и опреснение воды. Закрыта после объединения Германии.",
        location: "Райнсберг, земля Бранденбург, Германия",
        city: "Нойруппин",
        units: [
            { id: 1, name: "Rheinsberg (KKR)", type: "vver", model: "ВВЭР-70", capacity: 70, status: "closed", startYear: 1966, endYear: 1990 }
        ],
        history: [
            { year: "1960", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства по советскому проекту." },
            { year: "1966", title: "ПУСК", description: "Первый энергоблок в ГДР подключен к сети." },
            { year: "1990", title: "ОСТАНОВКА", description: "Остановлена после объединения Германии в соответствии с решением о выводе из эксплуатации советских реакторов." },
            { year: "1995", title: "НАЧАЛО ВЫВОДА", description: "Начало работ по выводу из эксплуатации." }
        ],
        facts: [
            "Прототип для серии реакторов ВВЭР-440, широко распространённых в Восточной Европе.",
            "В отличие от других советских АЭС в ГДР, не была остановлена сразу после объединения, а работала ещё несколько лет.",
            "На её площадке сейчас находится Центр вывода из эксплуатации ядерных объектов."
        ]
    },
    {
        id: 2854,
        name: "АЭС Штаде (Stade)",
        country: { name: "Германия", flag: "🇩🇪" },
        coords: [53.6158, 9.5283],
        status: "closed",
        totalCapacity: 672,
        startYear: 1972,
        overview: "Одна из первых коммерческих АЭС в Западной Германии с водо-водяным реактором (PWR). Известна тем, что была первой немецкой АЭС, окончательно остановленной в рамках политики отказа от атомной энергии (Atomausstieg) в 2003 году. Также на её площадке располагалась установка по опреснению воды.",
        location: "Штаде, земля Нижняя Саксония, Германия",
        city: "Штаде",
        units: [
            { id: 1, name: "Stade (KKS)", type: "pwr", model: "PWR (Siemens)", capacity: 672, status: "closed", startYear: 1972, endYear: 2003 }
        ],
        history: [
            { year: "1967", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства." },
            { year: "1972", title: "ПУСК", description: "Подключение к сети." },
            { year: "2003", title: "ИСТОРИЧЕСКАЯ ОСТАНОВКА", description: "Остановлена 14 ноября, став первой жертвой нового Atomausstieg." },
            { year: "2005", title: "НАЧАЛО ДЕМОНТАЖА", description: "Начало активных работ по демонтажу." }
        ],
        facts: [
            "Первая АЭС в Германии, демонтированная до состояния «зелёного луга» (окончательная ликвидация всех сооружений).",
            "Её досрочное закрытие стало символом реализации политического решения об отказе от атомной энергии.",
            "Площадка после очистки была возвращена для промышленного использования."
        ]
    },

    // ==================== ЭКСПЕРИМЕНТАЛЬНЫЕ (РАЗНЫЕ СТРАНЫ) ====================
    {
        id: 2900,
        name: "АЭС БОНУС (BONUS)",
        country: { name: "Пуэрто-Рико", flag: "🇵🇷" },
        coords: [18.42, -67.15],
        status: "closed",
        totalCapacity: 17,
        startYear: 1964,
        overview: "BONUS (Boiling Nuclear Superheater) — экспериментальная атомная электростанция в Пуэрто-Рико, построенная для испытаний концепции кипящего реактора с интегральным пароперегревателем. Целью было повышение тепловой эффективности. Проект столкнулся с техническими трудностями и был закрыт после короткого периода испытаний.",
        location: "Ринкон, Пуэрто-Рико",
        city: "Ринкон",
        units: [
            { id: 1, name: "BONUS", type: "bwr", model: "Экспериментальный BWR", capacity: 17, status: "closed", startYear: 1964, endYear: 1968 }
        ],
        history: [
            { year: "1960", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства уникального экспериментального реактора." },
            { year: "1964", title: "ПУСК", description: "Реактор достиг критичности." },
            { year: "1968", title: "ЗАКРЫТИЕ", description: "Досрочное закрытие из-за технических проблем и высокой стоимости." },
            { year: "1970", title: "КОНСЕРВАЦИЯ", description: "Реактор законсервирован, позже превращён в музей." }
        ],
        facts: [
            "Единственная атомная электростанция, построенная в Пуэрто-Рико.",
            "Концепция интегрального пароперегрева так и не была реализована в коммерческих масштабах.",
            "Здание реактора сохранилось и известно как «Дом в куполе» (Dome House), являясь местной достопримечательностью."
        ]
    },
// ==================== ДЕВЯТЫЙ ПАКЕТ: ПОЛНЫЙ СПИСОК АЭС ФРАНЦИИ И США ====================

    // ==================== ФРАНЦИЯ (ДЕЙСТВУЮЩИЕ И ЗАКРЫТЫЕ) ====================
    // Примечание: Станции с несколькими блоками объединены в один объект.
    {
        id: 2950,
        name: "АЭС Бельвиль",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.510534, 2.876186],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1987,
        overview: "Атомная станция на берегу Луары. Состоит из двух реакторов серии P4 мощностью 1300 МВт каждый, введенных в эксплуатацию в конце 1980-х годов[citation:1][citation:2].",
        location: "Бельвиль-сюр-Луар, Центр — Долина Луары, Франция",
        city: "Бельвиль-сюр-Луар",
        units: [
            { id: 1, name: "Belleville-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1987 },
            { id: 2, name: "Belleville-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1987", title: "ПУСК", description: "Блок 1 подключен к сети[citation:1]." }
        ],
        facts: [
            "Один из примеров стандартизированных французских АЭС второго поколения."
        ]
    },
    {
        id: 2951,
        name: "АЭС Блайе",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.255833, -0.693056],
        status: "operational",
        totalCapacity: 3640,
        startYear: 1981,
        overview: "Станция в департаменте Жиронда, состоящая из четырех реакторов CP1 мощностью 910 МВт. Расположена в эстуарии Жиронды[citation:1][citation:2].",
        location: "Бро-э-Сен-Луи, Новая Аквитания, Франция",
        city: "Блай",
        units: [
            { id: 1, name: "Blayais-1", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1981 },
            { id: 2, name: "Blayais-2", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1982 },
            { id: 3, name: "Blayais-3", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1983 },
            { id: 4, name: "Blayais-4", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1983 }
        ],
        history: [
            { year: "1981", title: "ПУСК", description: "Первый блок подключен к сети[citation:1]." }
        ],
        facts: [
            "В 1999 году пострадала от сильного шторма, что привело к частичному затоплению площадки и ужесточению требований к защите от паводков."
        ]
    },
    {
        id: 2952,
        name: "АЭС Бюже",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.798333, 5.270833],
        status: "operational", // Блок 1 закрыт, но остальные 4 действуют.
        totalCapacity: 3580,
        startYear: 1972,
        overview: "Одна из старейших атомных станций Франции. Первый блок был газоохлаждаемым реактором (UNGG), остальные четыре — водо-водяные (PWR). Блок 1 закрыт в 1994 году[citation:1][citation:2][citation:5].",
        location: "Сен-Вюльба, Овернь — Рона — Альпы, Франция",
        city: "Сен-Вюльба",
        units: [
            { id: 1, name: "Bugey-1", type: "gcr", model: "UNGG", capacity: 555, status: "closed", startYear: 1972, endYear: 1994 },
            { id: 2, name: "Bugey-2", type: "pwr", model: "CP0", capacity: 945, status: "operational", startYear: 1978 },
            { id: 3, name: "Bugey-3", type: "pwr", model: "CP0", capacity: 945, status: "operational", startYear: 1978 },
            { id: 4, name: "Bugey-4", type: "pwr", model: "CP0", capacity: 917, status: "operational", startYear: 1979 },
            { id: 5, name: "Bugey-5", type: "pwr", model: "CP0", capacity: 917, status: "operational", startYear: 1979 }
        ],
        history: [
            { year: "1972", title: "ПУСК UNGG", description: "Запущен первый газоохлаждаемый реактор на площадке[citation:1]." },
            { year: "1994", title: "ЗАКРЫТИЕ БЛОКА-1", description: "Остановка устаревшего реактора UNGG[citation:1]." }
        ],
        facts: [
            "Блок 1 — один из последних газоохлаждаемых реакторов (UNGG) Франции.",
            "Символизирует переход страны с технологии GCR на стандартизированные PWR."
        ]
    },
    {
        id: 2953,
        name: "АЭС Дампьер",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.733681, 2.517285],
        status: "operational",
        totalCapacity: 3560,
        startYear: 1980,
        overview: "Атомная станция в центральной Франции, состоящая из четырех идентичных реакторов CP1 мощностью 890 МВт каждый[citation:2][citation:5].",
        location: "Дампьер-ан-Бюрли, Центр — Долина Луары, Франция",
        city: "Дампьер-ан-Бюрли",
        units: [
            { id: 1, name: "Dampierre-1", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1980 },
            { id: 2, name: "Dampierre-2", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1980 },
            { id: 3, name: "Dampierre-3", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1981 },
            { id: 4, name: "Dampierre-4", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1981 }
        ],
        history: [
            { year: "1980", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков[citation:5]." }
        ],
        facts: [
            "Одна из многих станций, построенных в рамках масштабной атомной программы Франции 1970-х годов."
        ]
    },
    {
        id: 2954,
        name: "АЭС Сиво",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [46.456667, 0.652778],
        status: "operational",
        totalCapacity: 2990,
        startYear: 1997,
        overview: "Современная атомная станция с двумя реакторами типа N4 — самыми мощными в парке EDF (1495 МВт каждый). Это последние реакторы второго поколения, построенные во Франции[citation:2][citation:5].",
        location: "Сиво, Новая Аквитания, Франция",
        city: "Сиво",
        units: [
            { id: 1, name: "Civaux-1", type: "pwr", model: "N4", capacity: 1495, status: "operational", startYear: 1997 },
            { id: 2, name: "Civaux-2", type: "pwr", model: "N4", capacity: 1495, status: "operational", startYear: 1999 }
        ],
        history: [
            { year: "1997", title: "ПУСК", description: "Ввод в эксплуатацию первого блока серии N4[citation:5]." }
        ],
        facts: [
            "Реакторы N4 имеют мощность около 1500 МВт и представляют собой вершину развития французских PWR второго поколения.",
            "Станция имеет высокие показатели эффективности и безопасности."
        ]
    },
    {
        id: 2955,
        name: "АЭС Крюа",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.633056, 4.756667],
        status: "operational",
        totalCapacity: 3660,
        startYear: 1983,
        overview: "Станция на берегу реки Роны, известная своими градирнями, украшенными монументальными фресками. Состоит из четырех реакторов CP2[citation:2][citation:5].",
        location: "Крюа, Овернь — Рона — Альпы, Франция",
        city: "Крюа",
        units: [
            { id: 1, name: "Cruas-1", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1983 },
            { id: 2, name: "Cruas-2", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 },
            { id: 3, name: "Cruas-3", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 },
            { id: 4, name: "Cruas-4", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1983", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Градирни станции известны как «Сикстинская капелла атомной эры» благодаря гигантским фрескам художника Жана-Мария Пьерра."
        ]
    },
    {
        id: 2956,
        name: "АЭС Гольфеш",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.1067, 0.8453],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1990,
        overview: "Атомная станция на юго-западе Франции, использующая воду реки Гаронны для охлаждения. Состоит из двух реакторов P4[citation:2][citation:5].",
        location: "Гольфеш, Окситания, Франция",
        city: "Гольфеш",
        units: [
            { id: 1, name: "Golfech-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1990 },
            { id: 2, name: "Golfech-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1993 }
        ],
        history: [
            { year: "1990", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Одна из станций, вызвавших активные протесты экологов во Франции в 1980-х годах."
        ]
    },
    {
        id: 2957,
        name: "АЭС Ножан",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [48.515278, 3.517778],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1987,
        overview: "Станция, расположенная ближе всего к Парижу (около 100 км). Состоит из двух реакторов P4, обеспечивающих энергоснабжение столичного региона[citation:2][citation:5].",
        location: "Ножан-сюр-Сен, Гранд-Эст, Франция",
        city: "Ножан-сюр-Сен",
        units: [
            { id: 1, name: "Nogent-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1987 },
            { id: 2, name: "Nogent-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1987", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Играет критически важную роль в энергоснабжении региона Иль-де-Франс с населением более 12 миллионов человек."
        ]
    },
    {
        id: 2958,
        name: "АЭС Пенли",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [49.976667, -1.211944],
        status: "operational",
        totalCapacity: 2660,
        startYear: 1990,
        overview: "Атомная станция на побережье Ла-Манша в Нормандии. Состоит из двух реакторов P4[citation:2][citation:5].",
        location: "Пенли, Нормандия, Франция",
        city: "Дьеп",
        units: [
            { id: 1, name: "Penly-1", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1990 },
            { id: 2, name: "Penly-2", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1992 }
        ],
        history: [
            { year: "1990", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "На площадке Пенли планируется строительство новых реакторов (в т.ч. EPR2) в рамках программы обновления парка Франции."
        ]
    },
    {
        id: 2959,
        name: "АЭС Сент-Альбан",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.404296, 4.755535],
        status: "operational",
        totalCapacity: 2670,
        startYear: 1985,
        overview: "Станция на берегу Роны, состоящая из двух реакторов P4 мощностью 1335 МВт каждый[citation:2][citation:5].",
        location: "Сент-Альбан-дю-Рон, Овернь — Рона — Альпы, Франция",
        city: "Сент-Альбан-дю-Рон",
        units: [
            { id: 1, name: "St. Alban-1", type: "pwr", model: "P4", capacity: 1335, status: "operational", startYear: 1985 },
            { id: 2, name: "St. Alban-2", type: "pwr", model: "P4", capacity: 1335, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1985", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Известна архитектурным решением машинного зала, вписанного в склон холма."
        ]
    },
    {
        id: 2960,
        name: "АЭС Трикастен",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.329722, 4.732222],
        status: "operational",
        totalCapacity: 3660,
        startYear: 1980,
        overview: "Крупный атомный энергокомплекс на юго-востоке Франции, включающий саму АЭС и объекты топливного цикла. АЭС состоит из четырех реакторов CP1[citation:2][citation:5].",
        location: "Пьерлатт, Овернь — Рона — Альпы, Франция",
        city: "Пьерлатт",
        units: [
            { id: 1, name: "Tricastin-1", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1980 },
            { id: 2, name: "Tricastin-2", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1980 },
            { id: 3, name: "Tricastin-3", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1981 },
            { id: 4, name: "Tricastin-4", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1981 }
        ],
        history: [
            { year: "1980", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков[citation:5]." }
        ],
        facts: [
            "Площадка Трикастен — один из ключевых центров французской ядерной промышленности, где расположены заводы по обогащению урана (Georges Besse)."
        ]
    },
    {
        id: 2961,
        name: "АЭС Бреннилис",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [48.3533, -3.872203],
        status: "closed",
        totalCapacity: 70,
        startYear: 1967,
        overview: "Экспериментальная тяжеловодная газоохлаждаемая АЭС (HWGCR). Единственный реактор такого типа во Франции. Остановлен в 1985 году, с тех пор идет сложный процесс вывода из эксплуатации[citation:2][citation:5].",
        location: "Бреннилис, Бретань, Франция",
        city: "Бреннилис",
        units: [
            { id: 1, name: "Brennilis (EL-4)", type: "other", model: "HWGCR", capacity: 70, status: "closed", startYear: 1967, endYear: 1985 }
        ],
        history: [
            { year: "1967", title: "ПУСК", description: "Запуск экспериментального тяжеловодного реактора[citation:2]." },
            { year: "1985", title: "ОСТАНОВКА", description: "Окончание эксплуатации[citation:2]." }
        ],
        facts: [
            "Процесс вывода из эксплуатации («разборка до зеленой лужайки») стал первым подобным проектом во Франции и сопряжен со многими техническими сложностями.",
            "Станция стала символом проблем и высокой стоимости полного демонтажа АЭС."
        ]
    },
    {
        id: 2962,
        name: "АЭС Фессенхайм",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.903225, 7.562306],
        status: "closed",
        totalCapacity: 1760,
        startYear: 1977,
        overview: "Старейшая атомная электростанция Франции с реакторами PWR. Её закрытие в 2020 году стало результатом многолетних политических дебатов и обещаний президентов. Работала 43 года[citation:2][citation:7].",
        location: "Фессенхайм, Гранд-Эст, Франция",
        city: "Фессенхайм",
        units: [
            { id: 1, name: "Fessenheim-1", type: "pwr", model: "CP0", capacity: 880, status: "closed", startYear: 1977, endYear: 2020 },
            { id: 2, name: "Fessenheim-2", type: "pwr", model: "CP0", capacity: 880, status: "closed", startYear: 1977, endYear: 2020 }
        ],
        history: [
            { year: "1977", title: "ПУСК", description: "Ввод в эксплуатацию. Стала старейшей действующей АЭС Франции[citation:2]." },
            { year: "2020", title: "ЗАКРЫТИЕ", description: "Поэтапная остановка двух блоков в феврале и июне[citation:2]." }
        ],
        facts: [
            "Закрытие станции стало символом начала сокращения доли атомной энергетики во Франции, хотя позже планы были пересмотрены.",
            "Вызывала особую озабоченность у Германии и Швейцарии из-за своего расположения в сейсмической зоне."
        ]
    },
    {
        id: 2963,
        name: "АЭС Суперфеникс (Крей-Мальвиль)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.758333, 5.472222],
        status: "closed",
        totalCapacity: 1242,
        startYear: 1986,
        overview: "Крупнейший в мире промышленный реактор-размножитель на быстрых нейтронах (FBR). Проект столкнулся с огромными техническими сложностями, политическими протестами и экономической нецелесообразностью. Фактически проработал очень мало времени и был закрыт в 1998 году[citation:2].",
        location: "Крей-Мепьё, Овернь — Рона — Альпы, Франция",
        city: "Крей-Мепьё",
        units: [
            { id: 1, name: "Superphénix", type: "fast", model: "FBR", capacity: 1242, status: "closed", startYear: 1986, endYear: 1998 }
        ],
        history: [
            { year: "1986", title: "ПУСК", description: "Формальное начало эксплуатации[citation:2]." },
            { year: "1998", title: "ОКОНЧАТЕЛЬНОЕ РЕШЕНИЕ", description: "Правительство Франции приняло решение о закрытии станции[citation:2]." }
        ],
        facts: [
            "Самый дорогой и спорный ядерный объект в истории Франции.",
            "Символизировал как амбиции замкнутого ядерного топливного цикла, так и его практические трудности.",
            "Стал центральным объектом антиатомного движения в Европе."
        ]
    },
    {
        id: 2964,
        name: "АЭС Феникс (Маркуль)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.143333, 4.709444],
        status: "closed",
        totalCapacity: 250,
        startYear: 1973,
        overview: "Экспериментальный реактор-размножитель на быстрых нейтронах (FBR), предшественник Суперфеникса. Работал значительно успешнее своего преемника, внеся важный вклад в исследования. Остановлен в 2009 году[citation:2].",
        location: "Маркуль, Окситания, Франция",
        city: "Баньоль-сюр-Сез",
        units: [
            { id: 1, name: "Phénix", type: "fast", model: "FBR", capacity: 250, status: "closed", startYear: 1973, endYear: 2009 }
        ],
        history: [
            { year: "1973", title: "ПУСК", description: "Ввод в эксплуатацию[citation:2]." },
            { year: "2009", title: "ОСТАНОВКА", description: "Окончание исследовательской программы и остановка реактора[citation:2]." }
        ],
        facts: [
            "Успешно проработал более 35 лет, доказав работоспособность технологии быстрых реакторов.",
            "На площадке Маркуль также работали первые французские промышленные реакторы G1, G2, G3 (закрыты ранее)[citation:2]."
        ]
    },

    // ==================== США (ОСНОВНЫЕ ДЕЙСТВУЮЩИЕ АЭС - ВЫБОРКА) ====================
    // Примечание: Здесь представлена выборка из 94 действующих реакторов США для иллюстрации формата.
    // Полный список всех станций с данными NRC доступен по ссылке[citation:3].
    {
        id: 3000,
        name: "Beaver Valley Nuclear Power Station",
        country: { name: "США", flag: "🇺🇸" },
        coords: [40.62, -80.43], // Приблизительные
        status: "operational",
        totalCapacity: 1850, // Примерная сумма
        startYear: 1976,
        overview: "Атомная электростанция в Пенсильвании, состоящая из двух водо-водяных реакторов (PWR). Эксплуатируется компанией Vistra Corporation[citation:3].",
        location: "Шиппингпорт, Пенсильвания, США",
        city: "Шиппингпорт",
        units: [
            { id: 1, name: "Beaver Valley-1", type: "pwr", model: "PWR", capacity: 925, status: "operational", startYear: 1976 },
            { id: 2, name: "Beaver Valley-2", type: "pwr", model: "PWR", capacity: 925, status: "operational", startYear: 1987 }
        ],
        history: [
            { year: "1976", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети." }
        ],
        facts: [
            "Расположена на месте первой в США коммерческой АЭС «Шиппингпорт»."
        ]
    },
    {
        id: 3001,
        name: "Browns Ferry Nuclear Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [34.70, -87.12], // Приблизительные
        status: "operational",
        totalCapacity: 3494,
        startYear: 1974,
        overview: "Крупнейшая атомная станция на юго-востоке США, управляемая Tennessee Valley Authority (TVA). Имеет три кипящих водо-водяных реактора (BWR)[citation:3].",
        location: "Декейтер, Алабама, США",
        city: "Декейтер",
        units: [
            { id: 1, name: "Browns Ferry-1", type: "bwr", model: "BWR", capacity: 1164, status: "operational", startYear: 1974 },
            { id: 2, name: "Browns Ferry-2", type: "bwr", model: "BWR", capacity: 1165, status: "operational", startYear: 1975 },
            { id: 3, name: "Browns Ferry-3", type: "bwr", model: "BWR", capacity: 1165, status: "operational", startYear: 1977 }
        ],
        history: [
            { year: "1974", title: "ПУСК", description: "Запуск первого блока." }
        ],
        facts: [
            "В 1975 году на станции произошел серьезный пожар, приведший к созданию новых национальных стандартов пожарной безопасности на АЭС."
        ]
    },
    {
        id: 3002,
        name: "Diablo Canyon Power Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [35.21, -120.86],
        status: "operational",
        totalCapacity: 2236,
        startYear: 1985,
        overview: "Единственная действующая атомная станция в Калифорнии. Расположена на побережье Тихого океана. Два реактора PWR. Планировалась к закрытию, но в 2022 году получила продление лицензии[citation:3].",
        location: "Авила-Бич, Калифорния, США",
        city: "Сан-Луис-Обиспо",
        units: [
            { id: 1, name: "Diablo Canyon-1", type: "pwr", model: "PWR", capacity: 1118, status: "operational", startYear: 1985 },
            { id: 2, name: "Diablo Canyon-2", type: "pwr", model: "PWR", capacity: 1118, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1985", title: "ПУСК", description: "Ввод в эксплуатацию после длительных споров о сейсмической безопасности." }
        ],
        facts: [
            "Строительство вызвало масштабные протесты экологов. Станция находится вблизи нескольких геологических разломов.",
            "Её возможное закрытие было главной темой энергетической политики Калифорнии."
        ]
    },
    {
        id: 3003,
        name: "Vogtle Electric Generating Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [33.14, -81.76],
        status: "operational",
        totalCapacity: 2500, // Блоки 1&2: 2500 МВт, блоки 3&4: ~2200 МВт (в процессе)
        startYear: 1987,
        overview: "Крупная атомная станция в Джорджии. Блоки 1 и 2 работают с 1980-х. Блоки 3 и 4 — первые новые реакторы (AP1000), построенные в США за последние десятилетия. Блок 3 введен в 2023 году, блок 4 — в 2024[citation:6].",
        location: "Уэйнесборо, Джорджия, США",
        city: "Уэйнесборо",
        units: [
            { id: 1, name: "Vogtle-1", type: "pwr", model: "PWR", capacity: 1250, status: "operational", startYear: 1987 },
            { id: 2, name: "Vogtle-2", type: "pwr", model: "PWR", capacity: 1250, status: "operational", startYear: 1989 },
            { id: 3, name: "Vogtle-3", type: "pwr", model: "AP1000", capacity: 1100, status: "operational", startYear: 2023 },
            { id: 4, name: "Vogtle-4", type: "pwr", model: "AP1000", capacity: 1100, status: "operational", startYear: 2024 }
        ],
        history: [
            { year: "1987", title: "ПУСК ПЕРВЫХ БЛОКОВ", description: "Ввод в эксплуатацию блоков 1 и 2." },
            { year: "2023", title: "НОВАЯ ЭРА", description: "Ввод блока 3 — первого нового реактора в США за много лет[citation:6]." }
        ],
        facts: [
            "Строительство новых блоков 3 и 4 столкнулось с многолетними задержками и значительным перерасходом бюджета.",
            "Проект стал тестом на жизнеспособность нового строительства АЭС в США."
        ]
    },
    {
        id: 3004,
        name: "Palo Verde Nuclear Generating Station",
        country: { name: "США", flag: "🇺🇸" },
        coords: [33.3889, -112.8619],
        status: "operational",
        totalCapacity: 3937,
        startYear: 1986,
        overview: "Крупнейшая атомная электростанция в США по выработке электроэнергии. Уникальна тем, что расположена в пустыне Аризоны и использует для охлаждения очищенные сточные воды близлежащих городов[citation:3].",
        location: "Уинтерсберг, Аризона, США",
        city: "Финикс (регион)",
        units: [
            { id: 1, name: "Palo Verde-1", type: "pwr", model: "PWR", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 2, name: "Palo Verde-2", type: "pwr", model: "PWR", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 3, name: "Palo Verde-3", type: "pwr", model: "PWR", capacity: 1313, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1986", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков." }
        ],
        facts: [
            "Единственная крупная АЭС в мире, не расположенная рядом с крупным естественным водоемом.",
            "Является ключевым источником базовой нагрузки для юго-запада США."
        ]
    },
    {
        id: 3006,
        name: "SM-1 (Army Nuclear Power Plant)",
        country: { name: "США", flag: "🇺🇸" },
        coords: [38.71, -77.15], // Форт-Белвуар, приблизительно
        status: "closed",
        totalCapacity: 2, // Производил электричество для базы
        startYear: 1957,
        overview: "Первая атомная электростанция в США, подключенная к энергосети (апрель 1957 года). Была построена Армией США в Форт-Белвуар, Вирджиния, для снабжения энергией военной базы. Доказала практическую возможность использования атомной энергии в удаленных районах[citation:6].",
        location: "Форт-Белвуар, Вирджиния, США",
        city: "Форт-Белвуар",
        units: [
            { id: 1, name: "SM-1", type: "pwr", model: "Army PWR", capacity: 2, status: "closed", startYear: 1957, endYear: 1973 }
        ],
        history: [
            { year: "1957", title: "ПЕРВОЕ ПОДКЛЮЧЕНИЕ", description: "Стал первым реактором в США, подавшим электричество в сеть[citation:6]." },
            { year: "1973", title: "ЗАКРЫТИЕ", description: "Остановлен после 16 лет эксплуатации." }
        ],
        facts: [
            "Был частью программы Армии США по созданию мобильных и стационарных атомных источников энергии.",
            "Пионерский проект, за которым последовали другие военные и гражданские АЭС."
        ]
    },
// ==================== ДЕВЯТЫЙ ПАКЕТ: ПОЛНЫЙ СПИСОК АЭС ФРАНЦИИ И США ====================

    // ==================== ФРАНЦИЯ (ДЕЙСТВУЮЩИЕ И ЗАКРЫТЫЕ) ====================
    // Примечание: Станции с несколькими блоками объединены в один объект.
    {
        id: 2950,
        name: "АЭС Бельвиль",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.510534, 2.876186],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1987,
        overview: "Атомная станция на берегу Луары. Состоит из двух реакторов серии P4 мощностью 1300 МВт каждый, введенных в эксплуатацию в конце 1980-х годов[citation:1][citation:2].",
        location: "Бельвиль-сюр-Луар, Центр — Долина Луары, Франция",
        city: "Бельвиль-сюр-Луар",
        units: [
            { id: 1, name: "Belleville-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1987 },
            { id: 2, name: "Belleville-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1987", title: "ПУСК", description: "Блок 1 подключен к сети[citation:1]." }
        ],
        facts: [
            "Один из примеров стандартизированных французских АЭС второго поколения."
        ]
    },
    {
        id: 2951,
        name: "АЭС Блайе",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.255833, -0.693056],
        status: "operational",
        totalCapacity: 3640,
        startYear: 1981,
        overview: "Станция в департаменте Жиронда, состоящая из четырех реакторов CP1 мощностью 910 МВт. Расположена в эстуарии Жиронды[citation:1][citation:2].",
        location: "Бро-э-Сен-Луи, Новая Аквитания, Франция",
        city: "Блай",
        units: [
            { id: 1, name: "Blayais-1", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1981 },
            { id: 2, name: "Blayais-2", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1982 },
            { id: 3, name: "Blayais-3", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1983 },
            { id: 4, name: "Blayais-4", type: "pwr", model: "CP1", capacity: 910, status: "operational", startYear: 1983 }
        ],
        history: [
            { year: "1981", title: "ПУСК", description: "Первый блок подключен к сети[citation:1]." }
        ],
        facts: [
            "В 1999 году пострадала от сильного шторма, что привело к частичному затоплению площадки и ужесточению требований к защите от паводков."
        ]
    },
    {
        id: 2952,
        name: "АЭС Бюже",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.798333, 5.270833],
        status: "operational", // Блок 1 закрыт, но остальные 4 действуют.
        totalCapacity: 3580,
        startYear: 1972,
        overview: "Одна из старейших атомных станций Франции. Первый блок был газоохлаждаемым реактором (UNGG), остальные четыре — водо-водяные (PWR). Блок 1 закрыт в 1994 году[citation:1][citation:2][citation:5].",
        location: "Сен-Вюльба, Овернь — Рона — Альпы, Франция",
        city: "Сен-Вюльба",
        units: [
            { id: 1, name: "Bugey-1", type: "gcr", model: "UNGG", capacity: 555, status: "closed", startYear: 1972, endYear: 1994 },
            { id: 2, name: "Bugey-2", type: "pwr", model: "CP0", capacity: 945, status: "operational", startYear: 1978 },
            { id: 3, name: "Bugey-3", type: "pwr", model: "CP0", capacity: 945, status: "operational", startYear: 1978 },
            { id: 4, name: "Bugey-4", type: "pwr", model: "CP0", capacity: 917, status: "operational", startYear: 1979 },
            { id: 5, name: "Bugey-5", type: "pwr", model: "CP0", capacity: 917, status: "operational", startYear: 1979 }
        ],
        history: [
            { year: "1972", title: "ПУСК UNGG", description: "Запущен первый газоохлаждаемый реактор на площадке[citation:1]." },
            { year: "1994", title: "ЗАКРЫТИЕ БЛОКА-1", description: "Остановка устаревшего реактора UNGG[citation:1]." }
        ],
        facts: [
            "Блок 1 — один из последних газоохлаждаемых реакторов (UNGG) Франции.",
            "Символизирует переход страны с технологии GCR на стандартизированные PWR."
        ]
    },
    {
        id: 2953,
        name: "АЭС Дампьер",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.733681, 2.517285],
        status: "operational",
        totalCapacity: 3560,
        startYear: 1980,
        overview: "Атомная станция в центральной Франции, состоящая из четырех идентичных реакторов CP1 мощностью 890 МВт каждый[citation:2][citation:5].",
        location: "Дампьер-ан-Бюрли, Центр — Долина Луары, Франция",
        city: "Дампьер-ан-Бюрли",
        units: [
            { id: 1, name: "Dampierre-1", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1980 },
            { id: 2, name: "Dampierre-2", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1980 },
            { id: 3, name: "Dampierre-3", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1981 },
            { id: 4, name: "Dampierre-4", type: "pwr", model: "CP1", capacity: 890, status: "operational", startYear: 1981 }
        ],
        history: [
            { year: "1980", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков[citation:5]." }
        ],
        facts: [
            "Одна из многих станций, построенных в рамках масштабной атомной программы Франции 1970-х годов."
        ]
    },
    {
        id: 2954,
        name: "АЭС Сиво",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [46.456667, 0.652778],
        status: "operational",
        totalCapacity: 2990,
        startYear: 1997,
        overview: "Современная атомная станция с двумя реакторами типа N4 — самыми мощными в парке EDF (1495 МВт каждый). Это последние реакторы второго поколения, построенные во Франции[citation:2][citation:5].",
        location: "Сиво, Новая Аквитания, Франция",
        city: "Сиво",
        units: [
            { id: 1, name: "Civaux-1", type: "pwr", model: "N4", capacity: 1495, status: "operational", startYear: 1997 },
            { id: 2, name: "Civaux-2", type: "pwr", model: "N4", capacity: 1495, status: "operational", startYear: 1999 }
        ],
        history: [
            { year: "1997", title: "ПУСК", description: "Ввод в эксплуатацию первого блока серии N4[citation:5]." }
        ],
        facts: [
            "Реакторы N4 имеют мощность около 1500 МВт и представляют собой вершину развития французских PWR второго поколения.",
            "Станция имеет высокие показатели эффективности и безопасности."
        ]
    },
    {
        id: 2955,
        name: "АЭС Крюа",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.633056, 4.756667],
        status: "operational",
        totalCapacity: 3660,
        startYear: 1983,
        overview: "Станция на берегу реки Роны, известная своими градирнями, украшенными монументальными фресками. Состоит из четырех реакторов CP2[citation:2][citation:5].",
        location: "Крюа, Овернь — Рона — Альпы, Франция",
        city: "Крюа",
        units: [
            { id: 1, name: "Cruas-1", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1983 },
            { id: 2, name: "Cruas-2", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 },
            { id: 3, name: "Cruas-3", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 },
            { id: 4, name: "Cruas-4", type: "pwr", model: "CP2", capacity: 915, status: "operational", startYear: 1984 }
        ],
        history: [
            { year: "1983", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Градирни станции известны как «Сикстинская капелла атомной эры» благодаря гигантским фрескам художника Жана-Мария Пьерра."
        ]
    },
    {
        id: 2956,
        name: "АЭС Гольфеш",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.1067, 0.8453],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1990,
        overview: "Атомная станция на юго-западе Франции, использующая воду реки Гаронны для охлаждения. Состоит из двух реакторов P4[citation:2][citation:5].",
        location: "Гольфеш, Окситания, Франция",
        city: "Гольфеш",
        units: [
            { id: 1, name: "Golfech-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1990 },
            { id: 2, name: "Golfech-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1993 }
        ],
        history: [
            { year: "1990", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Одна из станций, вызвавших активные протесты экологов во Франции в 1980-х годах."
        ]
    },
    {
        id: 2957,
        name: "АЭС Ножан",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [48.515278, 3.517778],
        status: "operational",
        totalCapacity: 2620,
        startYear: 1987,
        overview: "Станция, расположенная ближе всего к Парижу (около 100 км). Состоит из двух реакторов P4, обеспечивающих энергоснабжение столичного региона[citation:2][citation:5].",
        location: "Ножан-сюр-Сен, Гранд-Эст, Франция",
        city: "Ножан-сюр-Сен",
        units: [
            { id: 1, name: "Nogent-1", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1987 },
            { id: 2, name: "Nogent-2", type: "pwr", model: "P4", capacity: 1310, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1987", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Играет критически важную роль в энергоснабжении региона Иль-де-Франс с населением более 12 миллионов человек."
        ]
    },
    {
        id: 2958,
        name: "АЭС Пенли",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [49.976667, -1.211944],
        status: "operational",
        totalCapacity: 2660,
        startYear: 1990,
        overview: "Атомная станция на побережье Ла-Манша в Нормандии. Состоит из двух реакторов P4[citation:2][citation:5].",
        location: "Пенли, Нормандия, Франция",
        city: "Дьеп",
        units: [
            { id: 1, name: "Penly-1", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1990 },
            { id: 2, name: "Penly-2", type: "pwr", model: "P4", capacity: 1330, status: "operational", startYear: 1992 }
        ],
        history: [
            { year: "1990", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "На площадке Пенли планируется строительство новых реакторов (в т.ч. EPR2) в рамках программы обновления парка Франции."
        ]
    },
    {
        id: 2959,
        name: "АЭС Сент-Альбан",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.404296, 4.755535],
        status: "operational",
        totalCapacity: 2670,
        startYear: 1985,
        overview: "Станция на берегу Роны, состоящая из двух реакторов P4 мощностью 1335 МВт каждый[citation:2][citation:5].",
        location: "Сент-Альбан-дю-Рон, Овернь — Рона — Альпы, Франция",
        city: "Сент-Альбан-дю-Рон",
        units: [
            { id: 1, name: "St. Alban-1", type: "pwr", model: "P4", capacity: 1335, status: "operational", startYear: 1985 },
            { id: 2, name: "St. Alban-2", type: "pwr", model: "P4", capacity: 1335, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1985", title: "ПУСК", description: "Ввод в эксплуатацию первого блока[citation:5]." }
        ],
        facts: [
            "Известна архитектурным решением машинного зала, вписанного в склон холма."
        ]
    },
    {
        id: 2960,
        name: "АЭС Трикастен",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.329722, 4.732222],
        status: "operational",
        totalCapacity: 3660,
        startYear: 1980,
        overview: "Крупный атомный энергокомплекс на юго-востоке Франции, включающий саму АЭС и объекты топливного цикла. АЭС состоит из четырех реакторов CP1[citation:2][citation:5].",
        location: "Пьерлатт, Овернь — Рона — Альпы, Франция",
        city: "Пьерлатт",
        units: [
            { id: 1, name: "Tricastin-1", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1980 },
            { id: 2, name: "Tricastin-2", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1980 },
            { id: 3, name: "Tricastin-3", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1981 },
            { id: 4, name: "Tricastin-4", type: "pwr", model: "CP1", capacity: 915, status: "operational", startYear: 1981 }
        ],
        history: [
            { year: "1980", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков[citation:5]." }
        ],
        facts: [
            "Площадка Трикастен — один из ключевых центров французской ядерной промышленности, где расположены заводы по обогащению урана (Georges Besse)."
        ]
    },
    {
        id: 2961,
        name: "АЭС Бреннилис",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [48.3533, -3.872203],
        status: "closed",
        totalCapacity: 70,
        startYear: 1967,
        overview: "Экспериментальная тяжеловодная газоохлаждаемая АЭС (HWGCR). Единственный реактор такого типа во Франции. Остановлен в 1985 году, с тех пор идет сложный процесс вывода из эксплуатации[citation:2][citation:5].",
        location: "Бреннилис, Бретань, Франция",
        city: "Бреннилис",
        units: [
            { id: 1, name: "Brennilis (EL-4)", type: "other", model: "HWGCR", capacity: 70, status: "closed", startYear: 1967, endYear: 1985 }
        ],
        history: [
            { year: "1967", title: "ПУСК", description: "Запуск экспериментального тяжеловодного реактора[citation:2]." },
            { year: "1985", title: "ОСТАНОВКА", description: "Окончание эксплуатации[citation:2]." }
        ],
        facts: [
            "Процесс вывода из эксплуатации («разборка до зеленой лужайки») стал первым подобным проектом во Франции и сопряжен со многими техническими сложностями.",
            "Станция стала символом проблем и высокой стоимости полного демонтажа АЭС."
        ]
    },
    {
        id: 2962,
        name: "АЭС Фессенхайм",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [47.903225, 7.562306],
        status: "closed",
        totalCapacity: 1760,
        startYear: 1977,
        overview: "Старейшая атомная электростанция Франции с реакторами PWR. Её закрытие в 2020 году стало результатом многолетних политических дебатов и обещаний президентов. Работала 43 года[citation:2][citation:7].",
        location: "Фессенхайм, Гранд-Эст, Франция",
        city: "Фессенхайм",
        units: [
            { id: 1, name: "Fessenheim-1", type: "pwr", model: "CP0", capacity: 880, status: "closed", startYear: 1977, endYear: 2020 },
            { id: 2, name: "Fessenheim-2", type: "pwr", model: "CP0", capacity: 880, status: "closed", startYear: 1977, endYear: 2020 }
        ],
        history: [
            { year: "1977", title: "ПУСК", description: "Ввод в эксплуатацию. Стала старейшей действующей АЭС Франции[citation:2]." },
            { year: "2020", title: "ЗАКРЫТИЕ", description: "Поэтапная остановка двух блоков в феврале и июне[citation:2]." }
        ],
        facts: [
            "Закрытие станции стало символом начала сокращения доли атомной энергетики во Франции, хотя позже планы были пересмотрены.",
            "Вызывала особую озабоченность у Германии и Швейцарии из-за своего расположения в сейсмической зоне."
        ]
    },
    {
        id: 2963,
        name: "АЭС Суперфеникс (Крей-Мальвиль)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [45.758333, 5.472222],
        status: "closed",
        totalCapacity: 1242,
        startYear: 1986,
        overview: "Крупнейший в мире промышленный реактор-размножитель на быстрых нейтронах (FBR). Проект столкнулся с огромными техническими сложностями, политическими протестами и экономической нецелесообразностью. Фактически проработал очень мало времени и был закрыт в 1998 году[citation:2].",
        location: "Крей-Мепьё, Овернь — Рона — Альпы, Франция",
        city: "Крей-Мепьё",
        units: [
            { id: 1, name: "Superphénix", type: "fast", model: "FBR", capacity: 1242, status: "closed", startYear: 1986, endYear: 1998 }
        ],
        history: [
            { year: "1986", title: "ПУСК", description: "Формальное начало эксплуатации[citation:2]." },
            { year: "1998", title: "ОКОНЧАТЕЛЬНОЕ РЕШЕНИЕ", description: "Правительство Франции приняло решение о закрытии станции[citation:2]." }
        ],
        facts: [
            "Самый дорогой и спорный ядерный объект в истории Франции.",
            "Символизировал как амбиции замкнутого ядерного топливного цикла, так и его практические трудности.",
            "Стал центральным объектом антиатомного движения в Европе."
        ]
    },
    {
        id: 2964,
        name: "АЭС Феникс (Маркуль)",
        country: { name: "Франция", flag: "🇫🇷" },
        coords: [44.143333, 4.709444],
        status: "closed",
        totalCapacity: 250,
        startYear: 1973,
        overview: "Экспериментальный реактор-размножитель на быстрых нейтронах (FBR), предшественник Суперфеникса. Работал значительно успешнее своего преемника, внеся важный вклад в исследования. Остановлен в 2009 году[citation:2].",
        location: "Маркуль, Окситания, Франция",
        city: "Баньоль-сюр-Сез",
        units: [
            { id: 1, name: "Phénix", type: "fast", model: "FBR", capacity: 250, status: "closed", startYear: 1973, endYear: 2009 }
        ],
        history: [
            { year: "1973", title: "ПУСК", description: "Ввод в эксплуатацию[citation:2]." },
            { year: "2009", title: "ОСТАНОВКА", description: "Окончание исследовательской программы и остановка реактора[citation:2]." }
        ],
        facts: [
            "Успешно проработал более 35 лет, доказав работоспособность технологии быстрых реакторов.",
            "На площадке Маркуль также работали первые французские промышленные реакторы G1, G2, G3 (закрыты ранее)[citation:2]."
        ]
    },

    // ==================== США (ОСНОВНЫЕ ДЕЙСТВУЮЩИЕ АЭС - ВЫБОРКА) ====================
    // Примечание: Здесь представлена выборка из 94 действующих реакторов США для иллюстрации формата.
    // Полный список всех станций с данными NRC доступен по ссылке[citation:3].
    {
        id: 3000,
        name: "Beaver Valley Nuclear Power Station",
        country: { name: "США", flag: "🇺🇸" },
        coords: [40.62, -80.43], // Приблизительные
        status: "operational",
        totalCapacity: 1850, // Примерная сумма
        startYear: 1976,
        overview: "Атомная электростанция в Пенсильвании, состоящая из двух водо-водяных реакторов (PWR). Эксплуатируется компанией Vistra Corporation[citation:3].",
        location: "Шиппингпорт, Пенсильвания, США",
        city: "Шиппингпорт",
        units: [
            { id: 1, name: "Beaver Valley-1", type: "pwr", model: "PWR", capacity: 925, status: "operational", startYear: 1976 },
            { id: 2, name: "Beaver Valley-2", type: "pwr", model: "PWR", capacity: 925, status: "operational", startYear: 1987 }
        ],
        history: [
            { year: "1976", title: "ПУСК БЛОКА-1", description: "Первый блок подключен к сети." }
        ],
        facts: [
            "Расположена на месте первой в США коммерческой АЭС «Шиппингпорт»."
        ]
    },
    {
        id: 3001,
        name: "Browns Ferry Nuclear Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [34.70, -87.12], // Приблизительные
        status: "operational",
        totalCapacity: 3494,
        startYear: 1974,
        overview: "Крупнейшая атомная станция на юго-востоке США, управляемая Tennessee Valley Authority (TVA). Имеет три кипящих водо-водяных реактора (BWR)[citation:3].",
        location: "Декейтер, Алабама, США",
        city: "Декейтер",
        units: [
            { id: 1, name: "Browns Ferry-1", type: "bwr", model: "BWR", capacity: 1164, status: "operational", startYear: 1974 },
            { id: 2, name: "Browns Ferry-2", type: "bwr", model: "BWR", capacity: 1165, status: "operational", startYear: 1975 },
            { id: 3, name: "Browns Ferry-3", type: "bwr", model: "BWR", capacity: 1165, status: "operational", startYear: 1977 }
        ],
        history: [
            { year: "1974", title: "ПУСК", description: "Запуск первого блока." }
        ],
        facts: [
            "В 1975 году на станции произошел серьезный пожар, приведший к созданию новых национальных стандартов пожарной безопасности на АЭС."
        ]
    },
    {
        id: 3002,
        name: "Diablo Canyon Power Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [35.21, -120.86],
        status: "operational",
        totalCapacity: 2236,
        startYear: 1985,
        overview: "Единственная действующая атомная станция в Калифорнии. Расположена на побережье Тихого океана. Два реактора PWR. Планировалась к закрытию, но в 2022 году получила продление лицензии[citation:3].",
        location: "Авила-Бич, Калифорния, США",
        city: "Сан-Луис-Обиспо",
        units: [
            { id: 1, name: "Diablo Canyon-1", type: "pwr", model: "PWR", capacity: 1118, status: "operational", startYear: 1985 },
            { id: 2, name: "Diablo Canyon-2", type: "pwr", model: "PWR", capacity: 1118, status: "operational", startYear: 1986 }
        ],
        history: [
            { year: "1985", title: "ПУСК", description: "Ввод в эксплуатацию после длительных споров о сейсмической безопасности." }
        ],
        facts: [
            "Строительство вызвало масштабные протесты экологов. Станция находится вблизи нескольких геологических разломов.",
            "Её возможное закрытие было главной темой энергетической политики Калифорнии."
        ]
    },
    {
        id: 3003,
        name: "Vogtle Electric Generating Plant",
        country: { name: "США", flag: "🇺🇸" },
        coords: [33.14, -81.76],
        status: "operational",
        totalCapacity: 2500, // Блоки 1&2: 2500 МВт, блоки 3&4: ~2200 МВт (в процессе)
        startYear: 1987,
        overview: "Крупная атомная станция в Джорджии. Блоки 1 и 2 работают с 1980-х. Блоки 3 и 4 — первые новые реакторы (AP1000), построенные в США за последние десятилетия. Блок 3 введен в 2023 году, блок 4 — в 2024[citation:6].",
        location: "Уэйнесборо, Джорджия, США",
        city: "Уэйнесборо",
        units: [
            { id: 1, name: "Vogtle-1", type: "pwr", model: "PWR", capacity: 1250, status: "operational", startYear: 1987 },
            { id: 2, name: "Vogtle-2", type: "pwr", model: "PWR", capacity: 1250, status: "operational", startYear: 1989 },
            { id: 3, name: "Vogtle-3", type: "pwr", model: "AP1000", capacity: 1100, status: "operational", startYear: 2023 },
            { id: 4, name: "Vogtle-4", type: "pwr", model: "AP1000", capacity: 1100, status: "operational", startYear: 2024 }
        ],
        history: [
            { year: "1987", title: "ПУСК ПЕРВЫХ БЛОКОВ", description: "Ввод в эксплуатацию блоков 1 и 2." },
            { year: "2023", title: "НОВАЯ ЭРА", description: "Ввод блока 3 — первого нового реактора в США за много лет[citation:6]." }
        ],
        facts: [
            "Строительство новых блоков 3 и 4 столкнулось с многолетними задержками и значительным перерасходом бюджета.",
            "Проект стал тестом на жизнеспособность нового строительства АЭС в США."
        ]
    },
    {
        id: 3004,
        name: "Palo Verde Nuclear Generating Station",
        country: { name: "США", flag: "🇺🇸" },
        coords: [33.3889, -112.8619],
        status: "operational",
        totalCapacity: 3937,
        startYear: 1986,
        overview: "Крупнейшая атомная электростанция в США по выработке электроэнергии. Уникальна тем, что расположена в пустыне Аризоны и использует для охлаждения очищенные сточные воды близлежащих городов[citation:3].",
        location: "Уинтерсберг, Аризона, США",
        city: "Финикс (регион)",
        units: [
            { id: 1, name: "Palo Verde-1", type: "pwr", model: "PWR", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 2, name: "Palo Verde-2", type: "pwr", model: "PWR", capacity: 1312, status: "operational", startYear: 1986 },
            { id: 3, name: "Palo Verde-3", type: "pwr", model: "PWR", capacity: 1313, status: "operational", startYear: 1988 }
        ],
        history: [
            { year: "1986", title: "ПУСК", description: "Ввод в эксплуатацию первых блоков." }
        ],
        facts: [
            "Единственная крупная АЭС в мире, не расположенная рядом с крупным естественным водоемом.",
            "Является ключевым источником базовой нагрузки для юго-запада США."
        ]
    },
    {
        id: 3005,
        name: "Experimental Breeder Reactor I (EBR-I)",
        country: { name: "США", flag: "🇺🇸" },
        coords: [43.51144967638011, -113.00654104232788], // Национальная лаборатория Айдахо
        status: "closed",
        totalCapacity: 0.2, // Производил около 200 кВт электроэнергии
        startYear: 1951,
        overview: "Первый в мире ядерный реактор, выработавший электричество (20 декабря 1951 года), и первый реактор-размножитель. Экспериментальный объект, доказавший возможность создания цепной реакции деления и генерации электроэнергии[citation:6].",
        location: "Национальная лаборатория Айдахо, Айдахо, США",
        city: "Айдахо-Фолс",
        units: [
            { id: 1, name: "EBR-I", type: "fast", model: "Experimental Breeder", capacity: 0.2, status: "closed", startYear: 1951, endYear: 1964 }
        ],
        history: [
            { year: "1951", title: "ИСТОРИЧЕСКОЕ СОБЫТИЕ", description: "Впервые в мире электричество, полученное от деления атома, зажгло ряд лампочек[citation:6]." },
            { year: "1964", title: "ЗАКРЫТИЕ", description: "Остановка после выполнения исследовательской программы." }
        ],
        facts: [
            "В 1953 году доказал принцип расширенного воспроизводства ядерного топлива («размножения»).",
            "Сейчас является национальным историческим памятником и музеем."
        ]
    },
    {
        id: 3006,
        name: "SM-1 (Army Nuclear Power Plant)",
        country: { name: "США", flag: "🇺🇸" },
        coords: [38.71, -77.15], // Форт-Белвуар, приблизительно
        status: "closed",
        totalCapacity: 2, // Производил электричество для базы
        startYear: 1957,
        overview: "Первая атомная электростанция в США, подключенная к энергосети (апрель 1957 года). Была построена Армией США в Форт-Белвуар, Вирджиния, для снабжения энергией военной базы. Доказала практическую возможность использования атомной энергии в удаленных районах[citation:6].",
        location: "Форт-Белвуар, Вирджиния, США",
        city: "Форт-Белвуар",
        units: [
            { id: 1, name: "SM-1", type: "pwr", model: "Army PWR", capacity: 2, status: "closed", startYear: 1957, endYear: 1973 }
        ],
        history: [
            { year: "1957", title: "ПЕРВОЕ ПОДКЛЮЧЕНИЕ", description: "Стал первым реактором в США, подавшим электричество в сеть[citation:6]." },
            { year: "1973", title: "ЗАКРЫТИЕ", description: "Остановлен после 16 лет эксплуатации." }
        ],
        facts: [
            "Был частью программы Армии США по созданию мобильных и стационарных атомных источников энергии.",
            "Пионерский проект, за которым последовали другие военные и гражданские АЭС."
        ]
    },
{
    id: 3100,
    name: "АЭС Жарновец (проект)",
    country: { name: "Польша", flag: "🇵🇱" },
    coords: [54.8, 18.1],
    status: "construction",
    totalCapacity: 3750,
    startYear: 2024,
    overview: "Первая атомная электростанция в Польше. Планируется строительство 3 блоков AP1000 американской компании Westinghouse. Проект является частью польской стратегии отказа от угля.",
    location: "Жарновец, Поморское воеводство, Польша",
    city: "Гданьск",
    units: [
        { id: 1, name: "Жарновец-1", type: "pwr", model: "AP1000", capacity: 1250, status: "construction", startYear: 2024, expectedYear: 2033 },
        { id: 2, name: "Жарновец-2", type: "pwr", model: "AP1000", capacity: 1250, status: "construction", startYear: 2025, expectedYear: 2034 },
        { id: 3, name: "Жарновец-3", type: "pwr", model: "AP1000", capacity: 1250, status: "planning", startYear: 2026, expectedYear: 2035 }
    ],
    history: [
        { year: "2021", title: "ВЫБОР ТЕХНОЛОГИИ", description: "Польша выбрала технологию AP1000 компании Westinghouse" },
        { year: "2023", title: "СОГЛАШЕНИЕ", description: "Подписание контракта на строительство" },
        { year: "2024", title: "НАЧАЛО РАБОТ", description: "Начало подготовительных работ на площадке" }
    ],
    facts: [
        "Первая АЭС в Польше",
        "Часть национальной энергетической трансформации",
        "Планируется строительство второй АЭС в Пётркув-Трыбунальски"
    ]
},
{
    id: 3200,
    name: "АЭС Каорсо",
    country: { name: "Италия", flag: "🇮🇹" },
    coords: [45.0586, 8.5192],
    status: "closed",
    totalCapacity: 882,
    startYear: 1981,
    overview: "Крупнейшая атомная электростанция Италии, закрытая после референдума 1987 года. Расположена в регионе Пьемонт. Станция была остановлена в 1990 году, с тех пор идет процесс вывода из эксплуатации.",
    location: "Каорсо, Пьемонт, Италия",
    city: "Верчелли",
    units: [
        { id: 1, name: "Каорсо", type: "bwr", model: "BWR-4", capacity: 882, status: "closed", startYear: 1981, endYear: 1990 }
    ],
    history: [
        { year: "1970", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1981", title: "ПУСК", description: "Ввод в эксплуатацию" },
        { year: "1987", title: "РЕФЕРЕНДУМ", description: "Итальянцы проголосовали за отказ от атомной энергии после Чернобыля" },
        { year: "1990", title: "ОСТАНОВКА", description: "Окончательное закрытие станции" }
    ],
    facts: [
        "Крупнейшая АЭС Италии",
        "Вывод из эксплуатации займет до 2028 года",
        "На площадке хранится около 1000 тонн радиоактивных отходов"
    ]
},
{
    id: 3201,
    name: "АЭС Латина",
    country: { name: "Италия", flag: "🇮🇹" },
    coords: [41.4289, 12.8728],
    status: "closed",
    totalCapacity: 160,
    startYear: 1963,
    overview: "Первая атомная электростанция в Италии, использовала британский газоохлаждаемый реактор Magnox. Закрыта в 1987 году после референдума.",
    location: "Латина, Лацио, Италия",
    city: "Латина",
    units: [
        { id: 1, name: "Латина", type: "gcr", model: "Magnox", capacity: 160, status: "closed", startYear: 1963, endYear: 1987 }
    ],
    history: [
        { year: "1958", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства первой итальянской АЭС" },
        { year: "1963", title: "ПУСК", description: "Ввод в эксплуатацию" },
        { year: "1987", title: "ЗАКРЫТИЕ", description: "Остановка после референдума" }
    ],
    facts: [
        "Первая АЭС Италии",
        "Использовала британскую технологию Magnox",
        "Проработала 24 года"
    ]
},
{
    id: 3202,
    name: "АЭС Трино-Верчеллезе",
    country: { name: "Италия", flag: "🇮🇹" },
    coords: [45.1931, 8.2828],
    status: "closed",
    totalCapacity: 270,
    startYear: 1964,
    overview: "Первая итальянская АЭС с водо-водяным реактором (PWR) американского дизайна. Закрыта в 1987 году.",
    location: "Трино, Пьемонт, Италия",
    city: "Трино",
    units: [
        { id: 1, name: "Трино", type: "pwr", model: "Westinghouse PWR", capacity: 270, status: "closed", startYear: 1964, endYear: 1987 }
    ],
    history: [
        { year: "1961", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1964", title: "ПУСК", description: "Ввод в эксплуатацию" },
        { year: "1987", title: "ЗАКРЫТИЕ", description: "Остановка после референдума" }
    ],
    facts: [
        "Первая итальянская АЭС с реактором PWR",
        "Имела самую высокую тепловую эффективность среди итальянских АЭС",
        "Станция полностью выведена из эксплуатации"
    ]
},
{
    id: 3300,
    name: "АЭС Цвентендорф",
    country: { name: "Австрия", flag: "🇦🇹" },
    coords: [48.3528, 15.8872],
    status: "abandoned",
    totalCapacity: 732,
    startYear: null,
    overview: "Единственная атомная электростанция в Австрии, полностью построенная, но никогда не вводившаяся в эксплуатацию. Была готова к пуску в 1978 году, но после референдума австрийцы проголосовали против запуска. С тех пор станция законсервирована.",
    location: "Цвентендорф, Нижняя Австрия",
    city: "Цвентендорф",
    units: [
        { id: 1, name: "Цвентендорф", type: "bwr", model: "BWR-69", capacity: 732, status: "abandoned", startYear: null }
    ],
    history: [
        { year: "1972", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1978", title: "ГОТОВНОСТЬ", description: "Станция полностью построена, готовится к пуску" },
        { year: "1978", title: "РЕФЕРЕНДУМ", description: "50.5% австрийцев проголосовали против запуска АЭС" },
        { year: "1978", title: "ОТКАЗ", description: "Правительство приняло закон о запрете атомной энергии" }
    ],
    facts: [
        "Единственная полностью построенная АЭС в мире, никогда не работавшая",
        "Стала символом антиядерного движения в Европе",
        "Сейчас используется как тренировочный центр и съемочная площадка",
        "В 2005 году был снят закон о запрете, но станцию решили не запускать"
    ]
},
{
    id: 3400,
    name: "АЭС БН-350",
    country: { name: "Казахстан", flag: "🇰🇿" },
    coords: [43.6056, 51.2744],
    status: "closed",
    totalCapacity: 150,
    startYear: 1973,
    overview: "Промышленный реактор на быстрых нейтронах, расположенный в городе Актау (бывший Шевченко). Использовался для выработки электроэнергии и опреснения морской воды. Остановлен в 1999 году.",
    location: "Актау, Мангистауская область, Казахстан",
    city: "Актау",
    units: [
        { id: 1, name: "БН-350", type: "fast", model: "БН-350", capacity: 150, status: "closed", startYear: 1973, endYear: 1999 }
    ],
    history: [
        { year: "1964", title: "СТРОИТЕЛЬСТВО", description: "Начало строительства" },
        { year: "1973", title: "ПУСК", description: "Ввод в эксплуатацию" },
        { year: "1999", title: "ОСТАНОВКА", description: "Остановка по экономическим причинам" },
        { year: "2010", title: "ВЫВОД", description: "Начало вывода из эксплуатации" }
    ],
    facts: [
        "Первый в мире промышленный реактор на быстрых нейтронах",
        "Обеспечивал город Актау пресной водой (120 000 м³/сутки)",
        "Сейчас находится в процессе вывода из эксплуатации",
        "Казахстан планирует построить новые АЭС к 2035 году"
    ]
},
{
  "id": 3400,
  "name": "Научно-исследовательский центр в Йонбёне",
  "country": { "name": "КНДР", "flag": "🇰🇵" },
  "coords": [39.79724290525627, 125.75488633496094],
  "status": "operational",
  "totalCapacity": 5,
  "startYear": 1986,
  "overview": "Экспериментальный ядерный комплекс, являющийся центром северокорейской ядерной программы. Основной реактор типа Magnox (графито-газовый) имеет двойное назначение - производство электроэнергии и наработка оружейного плутония.",
  "location": "Йонбён, провинция Пхёнан-Пукто, КНДР",
  "city": "Йонбён",
  "units": [
    { "id": 1, "name": "Экспериментальный реактор", "type": "vver", "model": "ИРТ-2000", "capacity": 2, "status": "operational", "startYear": 1965 },
    { "id": 2, "name": "Экспериментальный реактор", "type": "gcr", "model": "Magnox", "capacity": 5, "status": "closed", "startYear": 1985, "endYear": 2007 }
  ],
  "history": [
    { "year": "1963", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства экспериментального реактора" },
    { "year": "1965", "title": "ПУСК", "description": "В 1965 году введен в действие советский ядерный реактор ИРТ-2000 мощностью 2 мегаватта." },
    { "year": "1985", "title": "ПУСК РЕАКТОРА MAGNOX", "description": "Запущен второй реактор по английскому проекту Magnox." },
    { "year": "1994", "title": "ЗАМОРОЗКА", "description": "Реактор законсервирован по Рамочному соглашению с США" },
    { "year": "2003", "title": "ВОЗОБНОВЛЕНИЕ", "description": "КНДР вышла из ДНЯО и возобновила работу реактора" }
  ],
  "facts": [
    "Центр северокорейской ядерной программы",
    "Реактор может производить электроэнергию и оружейный плутоний",
    "Объект находится под международными санкциями",
    "В центре также расположены объекты по переработке топлива"
  ]
},
  {
    "id": 3401,
    "name": "АЭС Грайфсвальд (Kernkraftwerk Greifswald)",
    "country": { "name": "Германия", "flag": "🇩🇪" },
    "coords": [54.1375, 13.6583],
    "status": "closed",
    "totalCapacity": 2200,
    "startYear": 1974,
    "overview": "Крупнейшая атомная электростанция Восточной Германии с реакторами советского типа ВВЭР. Была закрыта вскоре после объединения Германии, так как старые энергоблоки не соответствовали стандартам безопасности ФРГ.",
    "location": "Грайфсвальд (Любмин), Мекленбург-Передняя Померания, Германия",
    "city": "Грайфсвальд",
    "units": [
      { "id": 1, "name": "Грайфсвальд-1", "type": "wwer", "model": "ВВЭР-440/230", "capacity": 408, "status": "closed", "startYear": 1974, "endYear": 1990 },
      { "id": 2, "name": "Грайфсвальд-2", "type": "wwer", "model": "ВВЭР-440/230", "capacity": 408, "status": "closed", "startYear": 1975, "endYear": 1990 },
      { "id": 3, "name": "Грайфсвальд-3", "type": "wwer", "model": "ВВЭР-440/230", "capacity": 408, "status": "closed", "startYear": 1978, "endYear": 1990 },
      { "id": 4, "name": "Грайфсвальд-4", "type": "wwer", "model": "ВВЭР-440/230", "capacity": 408, "status": "closed", "startYear": 1979, "endYear": 1990 },
      { "id": 5, "name": "Грайфсвальд-5", "type": "wwer", "model": "ВВЭР-440/213", "capacity": 408, "status": "closed", "startYear": 1989, "endYear": 1989 },
      { "id": 6, "name": "Грайфсвальд-6", "type": "wwer", "model": "ВВЭР-440/213", "capacity": 408, "status": "closed", "startYear": null }
    ],
    "history": [
      { "year": "1970", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства атомной электростанции" },
      { "year": "1974", "title": "ПУСК", "description": "Ввод первого энергоблока в эксплуатацию" },
      { "year": "1990", "title": "ЗАКРЫТИЕ", "description": "Остановка всех энергоблоков после объединения Германии" },
      { "year": "1995", "title": "ВЫВОД", "description": "Начало полномасштабных работ по выводу из эксплуатации" }
    ],
    "facts": [
      "Крупнейшая АЭС в Восточной Германии",
      "Использовала советские реакторы ВВЭР",
      "Энергоблок №6 был полностью построен, но никогда не запускался",
      "Сейчас часть объектов используется как информационный центр"
    ]
  },

    {
        "id": 3100,
        "name": "ANO (Arkansas Nuclear One)",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [35.309444, -93.231111],
        "status": "operational",
        "totalCapacity": 1968,
        "startYear": 1974,
        "overview": "Крупнейший генератор электроэнергии в Арканзасе. Состоит из двух водо-водяных реакторов (PWR).",
        "location": "Лондон, Арканзас, США",
        "city": "Расселвилл",
        "units": [
            {"id": 1, "name": "ANO-1", "type": "pwr", "model": "B&W (L-loop)", "capacity": 836, "status": "operational", "startYear": 1974},
            {"id": 2, "name": "ANO-2", "type": "pwr", "model": "CE (2-loop)", "capacity": 1132, "status": "operational", "startYear": 1980}
        ],
        "history": [
            {"year": "1968", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства первого блока ANO-1."},
            {"year": "1974", "title": "ПУСК", "description": "ANO-1 подключен к сети 17 августа 1974 года."},
            {"year": "1978", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства второго блока ANO-2."},
            {"year": "1980", "title": "ПУСК", "description": "ANO-2 подключен к сети 26 марта 1980 года."}
        ],
        "facts": ["Потребляет воду из озера Дарданеллы для охлаждения.", "В 2013 году произошла авария с падением турбогенератора, погиб 1 человек.", "Станция обеспечивает около 30% электроэнергии штата Арканзас."]
    },
    {
        "id": 3101,
        "name": "Brunswick Nuclear Generating Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [33.958889, -77.962778],
        "status": "operational",
        "totalCapacity": 1910,
        "startYear": 1975,
        "overview": "Атомная станция в Северной Каролине с двумя кипящими водо-водяными реакторами (BWR).",
        "location": "Саутпорт, Северная Каролина, США",
        "city": "Саутпорт",
        "units": [
            {"id": 1, "name": "Brunswick-1", "type": "bwr", "model": "BWR-4 (Mark-1)", "capacity": 955, "status": "operational", "startYear": 1975},
            {"id": 2, "name": "Brunswick-2", "type": "bwr", "model": "BWR-4 (Mark-1)", "capacity": 955, "status": "operational", "startYear": 1975}
        ],
        "history": [
            {"year": "1970", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства обоих блоков."},
            {"year": "1975", "title": "ПУСК", "description": "Brunswick-1 подключен к сети 8 сентября 1975, Brunswick-2 - 29 апреля 1975."},
            {"year": "2002", "title": "МОДЕРНИЗАЦИЯ", "description": "Повышение мощности обоих блоков на 1.7%."}
        ],
        "facts": ["Расположена на берегу Атлантического океана в устье реки Кейп-Фир.", "Одна из немногих АЭС в США, расположенных на уровне моря.", "В 2010 году продлены лицензии до 2036 и 2034 годов соответственно."]
    },
    {
        "id": 3102,
        "name": "Byron Nuclear Generating Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [42.073333, -89.282222],
        "status": "operational",
        "totalCapacity": 2348,
        "startYear": 1985,
        "overview": "Станция в Иллинойсе с двумя водо-водяными реакторами (PWR). Важный источник энергии для Чикаго.",
        "location": "Байрон, Иллинойс, США",
        "city": "Байрон",
        "units": [
            {"id": 1, "name": "Byron-1", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1174, "status": "operational", "startYear": 1985},
            {"id": 2, "name": "Byron-2", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1174, "status": "operational", "startYear": 1987}
        ],
        "history": [
            {"year": "1975", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства первого блока."},
            {"year": "1985", "title": "ПУСК", "description": "Byron-1 подключен к сети 1 марта 1985 года."},
            {"year": "1987", "title": "ПУСК", "description": "Byron-2 подключен к сети 2 февраля 1987 года."}
        ],
        "facts": ["Имеет собственное искусственное озеро площадся 162 гектара для охлаждения.", "Производит около 20% электроэнергии штата Иллинойс.", "Высота градирен - 149 метров."]
    },
    {
        "id": 3103,
        "name": "Callaway Nuclear Generating Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [38.758889, -91.778333],
        "status": "operational",
        "totalCapacity": 1235,
        "startYear": 1984,
        "overview": "Единственная атомная станция в Миссури. Состоит из одного водо-водяного реактора (PWR).",
        "location": "Каллавей, Миссури, США",
        "city": "Каллавей",
        "units": [
            {"id": 1, "name": "Callaway-1", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1235, "status": "operational", "startYear": 1984}
        ],
        "history": [
            {"year": "1975", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 1 сентября 1975 года."},
            {"year": "1984", "title": "ПУСК", "description": "Реактор подключен к сети 11 октября 1984 года."},
            {"year": "2019", "title": "МОДЕРНИЗАЦИЯ", "description": "Повышение мощности на 1.4%."}
        ],
        "facts": ["Обеспечивает около 20% электроэнергии штата Миссури.", "Использует воду из озера Каллавей площадью 2800 гектаров.", "Получила продление лицензии до 2044 года."]
    },
    {
        "id": 3104,
        "name": "Calvert Cliffs Nuclear Power Plant",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [38.426944, -76.438333],
        "status": "operational",
        "totalCapacity": 1750,
        "startYear": 1975,
        "overview": "Атомная станция на берегу Чесапикского залива в Мэриленде. Имеет два водо-водяных реактора (PWR).",
        "location": "Лусай, Мэриленд, США",
        "city": "Лусай",
        "units": [
            {"id": 1, "name": "Calvert Cliffs-1", "type": "pwr", "model": "CE (2-loop)", "capacity": 875, "status": "operational", "startYear": 1975},
            {"id": 2, "name": "Calvert Cliffs-2", "type": "pwr", "model": "CE (2-loop)", "capacity": 875, "status": "operational", "startYear": 1977}
        ],
        "history": [
            {"year": "1968", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства первого блока."},
            {"year": "1975", "title": "ПУСК", "description": "Calvert Cliffs-1 подключен к сети 8 мая 1975 года."},
            {"year": "1977", "title": "ПУСК", "description": "Calvert Cliffs-2 подключен к сети 1 апреля 1977 года."}
        ],
        "facts": ["Известна высокими скалами (cliffs), в честь которых названа.", "Первая АЭС на восточном побережье США, получившая продление лицензии на 20 лет.", "Обеспечивает около 20% электроэнергии штата Мэриленд."]
    },
    {
        "id": 3105,
        "name": "Catawba Nuclear Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [35.038889, -81.065278],
        "status": "operational",
        "totalCapacity": 2320,
        "startYear": 1985,
        "overview": "Станция на берегу озера Уайли в Южной Каролине. Состоит из двух водо-водяных реакторов (PWR).",
        "location": "Лейк-Уайли, Южная Каролина, США",
        "city": "Лейк-Уайли",
        "units": [
            {"id": 1, "name": "Catawba-1", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1160, "status": "operational", "startYear": 1985},
            {"id": 2, "name": "Catawba-2", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1160, "status": "operational", "startYear": 1986}
        ],
        "history": [
            {"year": "1974", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 1 мая 1974 года."},
            {"year": "1985", "title": "ПУСК", "description": "Catawba-1 подключен к сети 22 июня 1985 года."},
            {"year": "1986", "title": "ПУСК", "description": "Catawba-2 подключен к сети 19 августа 1986 года."}
        ],
        "facts": ["Обеспечивает энергией более 1.5 миллионов домов.", "Расположена на искусственном полуострове на озере Уайли.", "В 2003 году мощность была увеличена на 1.6%."]
    },
    {
        "id": 3106,
        "name": "Clinton Nuclear Generating Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [40.173056, -88.836111],
        "status": "operational",
        "totalCapacity": 1065,
        "startYear": 1987,
        "overview": "Единственная атомная станция в Иллинойсе с одним кипящим водо-водяным реактором (BWR). Расположена рядом с искусственным озером.",
        "location": "Клинтон, Иллинойс, США",
        "city": "Клинтон",
        "units": [
            {"id": 1, "name": "Clinton-1", "type": "bwr", "model": "BWR-6 (Mark-3)", "capacity": 1065, "status": "operational", "startYear": 1987}
        ],
        "history": [
            {"year": "1973", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 1 октября 1973 года."},
            {"year": "1987", "title": "ПУСК", "description": "Реактор подключен к сети 24 ноября 1987 года."},
            {"year": "2016", "title": "МОДЕРНИЗАЦИЯ", "description": "Повышение мощности на 20 МВт."}
        ],
        "facts": ["Для охлаждения использует озеро Клинтон площадью 2000 гектаров.", "Первоначально планировалось строительство двух блоков, но второй был отменен.", "Обеспечивает электроэнергией около 1 миллиона домов."]
    },
    {
        "id": 3107,
        "name": "Columbia Generating Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [46.468889, -119.336111],
        "status": "operational",
        "totalCapacity": 1201,
        "startYear": 1984,
        "overview": "Единственная коммерческая АЭС на северо-западе США. Кипящий водо-водяной реактор (BWR) в штате Вашингтон.",
        "location": "Ричленд, Вашингтон, США",
        "city": "Ричленд",
        "units": [
            {"id": 1, "name": "Columbia-1", "type": "bwr", "model": "BWR-5 (Mark-2)", "capacity": 1201, "status": "operational", "startYear": 1984}
        ],
        "history": [
            {"year": "1972", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 1 августа 1972 года как WNP-2."},
            {"year": "1984", "title": "ПУСК", "description": "Реактор подключен к сети 13 мая 1984 года."},
            {"year": "2003", "title": "МОДЕРНИЗАЦИЯ", "description": "Повышение мощности на 1.6%."}
        ],
        "facts": ["Расположена недалеко от комплекса Хэнфорд, известного по Манхэттенскому проекту.", "Обеспечивает около 10% электроэнергии штата Вашингтон.", "Использует воду из реки Колумбия для охлаждения."]
    },
    {
        "id": 3108,
        "name": "Comanche Peak Nuclear Power Plant",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [32.298056, -97.791111],
        "status": "operational",
        "totalCapacity": 2400,
        "startYear": 1990,
        "overview": "Атомная станция в Техасе с двумя водо-водяными реакторами (PWR). Расположена рядом с водохранилищем.",
        "location": "Глен-Роуз, Техас, США",
        "city": "Глен-Роуз",
        "units": [
            {"id": 1, "name": "Comanche Peak-1", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1200, "status": "operational", "startYear": 1990},
            {"id": 2, "name": "Comanche Peak-2", "type": "pwr", "model": "Westinghouse 4-loop", "capacity": 1200, "status": "operational", "startYear": 1993}
        ],
        "history": [
            {"year": "1974", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 19 декабря 1974 года."},
            {"year": "1990", "title": "ПУСК", "description": "Comanche Peak-1 подключен к сети 13 августа 1990 года."},
            {"year": "1993", "title": "ПУСК", "description": "Comanche Peak-2 подключен к сети 3 апреля 1993 года."}
        ],
        "facts": ["Использует воду из водохранилища Сквав-Крик для охлаждения.", "Обеспечивает электроэнергией около 1.2 миллиона домов.", "Строительство заняло 16 лет из-за изменений в нормативных требованиях."]
    },
    {
        "id": 3109,
        "name": "Cooper Nuclear Station",
        "country": {"name": "США", "flag": "🇺🇸"},
        "coords": [40.365556, -95.6375],
        "status": "operational",
        "totalCapacity": 810,
        "startYear": 1974,
        "overview": "Единственная АЭС в Небраске. Кипящий водо-водяной реактор (BWR) на берегу реки Миссури.",
        "location": "Браунинг, Небраска, США",
        "city": "Браунинг",
        "units": [
            {"id": 1, "name": "Cooper", "type": "bwr", "model": "BWR-4 (Mark-1)", "capacity": 810, "status": "operational", "startYear": 1974}
        ],
        "history": [
            {"year": "1968", "title": "СТРОИТЕЛЬСТВО", "description": "Начало строительства 1 июня 1968 года."},
            {"year": "1974", "title": "ПУСК", "description": "Реактор подключен к сети 10 июля 1974 года."},
            {"year": "2011", "title": "НАВОДНЕНИЕ", "description": "Станция была окружена паводковыми водами реки Миссури, но продолжала работу."}
        ],
        "facts": ["Названа в честь сенатора США Джона Шермана Купера.", "Обеспечивает около 20% электроэнергии штата Небраска.", "Одна из старейших действующих АЭС в США."]
    },

  {
    "id": 3500,
    "name": "АЭС Дэвис-Бесс",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.596667, -83.086389],
    "status": "operational",
    "totalCapacity": 894,
    "startYear": 1977,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR), расположенная на берегу озера Эри в Огайо.",
    "location": "Оук-Харбор, Огайо, США",
    "city": "Оук-Харбор",
    "units": [
      { "id": 1, "name": "Davis-Besse-1", "type": "pwr", "model": "B&W (R-loop)", "capacity": 894, "status": "operational", "startYear": 1977 }
    ],
    "history": ["Строительство начато 1 сентября 1970 г., коммерческая эксплуатация с 31 июля 1978 г.", "Планировались два дополнительных блока, отменены в 1981 г.", "После инцидента 2002 г. реактор был остановлен до марта 2004 г. для ремонта.", "В 2019 г. получила субсидии по закону Ohio House Bill 6."],
    "facts": ["Единственный реактор PWR производства Babcock & Wilcox.", "В 2002 г. обнаружена сильная коррозия крышки реактора, проделавшая в ней большую дыру.", "В 2003 г. компьютерный вирус Slammer нарушил работу системы безопасности на 5 часов.", "Расположена на территории заповедника Ottawa National Wildlife Refuge."]
  },
  {
    "id": 3501,
    "name": "АЭС Дональд К. Кук",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.975278, -86.565833],
    "status": "operational",
    "totalCapacity": 2198,
    "startYear": 1975,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) на берегу озера Мичиган.",
    "location": "Бриджман, Мичиган, США",
    "city": "Бриджман",
    "units": [
      { "id": 1, "name": "Donald C. Cook-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1030, "status": "operational", "startYear": 1975 },
      { "id": 2, "name": "Donald C. Cook-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1168, "status": "operational", "startYear": 1978 }
    ],
    "history": ["Строительство начато в 1969 г.", "Блок 1 введён в эксплуатацию в 1975 г., блок 2 — в 1978 г.", "В 2005 г. лицензии обоих блоков были продлены на 20 лет."],
    "facts": ["Одна из трёх АЭС в США, имеющая собственную пожарную бригаду.", "В 1990 г. произошёл взрыв в распределительном устройстве, приведший к гибели человека.", "В 1997–2000 гг. оба блока были остановлены для устранения проблем с системой аварийного охлаждения."]
  },
  {
    "id": 3502,
    "name": "АЭС Эдвин Ай. Хэтч",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [31.934167, -82.343889],
    "status": "operational",
    "totalCapacity": 1759,
    "startYear": 1975,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) в Джорджии.",
    "location": "Апплинг, Джорджия, США",
    "city": "Баксли",
    "units": [
      { "id": 1, "name": "Edwin I. Hatch-1", "type": "bwr", "model": "BWR-4", "capacity": 876, "status": "operational", "startYear": 1975 },
      { "id": 2, "name": "Edwin I. Hatch-2", "type": "bwr", "model": "BWR-4", "capacity": 883, "status": "operational", "startYear": 1979 }
    ],
    "history": ["Строительство блока 1 начато в 1968 г., ввод в эксплуатацию — 1975 г.", "Блок 2 введён в эксплуатацию в 1979 г.", "В 2002 и 2005 гг. блоки получили лицензии на продлённую эксплуатацию до 2034 и 2038 гг. соответственно."],
    "facts": ["Названа в честь Эдвина Ай. Хэтча, бывшего члена Комиссии по атомной энергии США.", "В 2011 г. в результате торнадо была повреждена линия электропередачи, что привело к отключению станции.", "Использует воду из реки Альтамаха для охлаждения."]
  },
  {
    "id": 3503,
    "name": "АЭС Энрико Ферми",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.962778, -83.2575],
    "status": "operational",
    "totalCapacity": 1115,
    "startYear": 1986,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) на берегу озера Эри в Мичигане.",
    "location": "Ньюпорт, Мичиган, США",
    "city": "Монро",
    "units": [
      { "id": 1, "name": "Enrico Fermi-2", "type": "bwr", "model": "BWR-4", "capacity": 1115, "status": "operational", "startYear": 1986 }
    ],
    "history": ["Строительство начато в 1972 г.", "Введена в коммерческую эксплуатацию в январе 1988 г.", "Изначально планировался второй блок (Fermi-3), но проект был отменён."],
    "facts": ["Названа в честь физика Энрико Ферми.", "На этой площадке ранее работал экспериментальный реактор на быстрых нейтронах Fermi-1, на котором в 1966 г. произошла частичная расплавление активной зоны.", "Fermi-2 — один из крупнейших кипящих водо-водяных реакторов в США."]
  },
  {
    "id": 3504,
    "name": "АЭС Джинна (R. E. Ginna)",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [43.277778, -77.31],
    "status": "operational",
    "totalCapacity": 560,
    "startYear": 1970,
    "overview": "Небольшая одноблочная атомная станция с водо-водяным реактором (PWR) на южном берегу озера Онтарио.",
    "location": "Онтарио, Нью-Йорк, США",
    "city": "Онтарио",
    "units": [
      { "id": 1, "name": "Ginna", "type": "pwr", "model": "W (2-loop)", "capacity": 560, "status": "operational", "startYear": 1970 }
    ],
    "history": ["Строительство начато в 1966 г.", "Введена в эксплуатацию в 1970 г.", "В 2004 г. получила лицензию на продление срока эксплуатации до 2029 г."],
    "facts": ["Названа в честь Роберта Э. Джинны, бывшего президента Rochester Gas & Electric.", "В 1982 г. произошла утечка радиоактивного пара, что привело к эвакуации части персонала.", "Одна из старейших действующих АЭС в США."]
  },
  {
    "id": 3505,
    "name": "АЭС Гранд-Галф",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [32.006667, -91.048333],
    "status": "operational",
    "totalCapacity": 1401,
    "startYear": 1985,
    "overview": "Крупная одноблочная атомная станция с кипящим водо-водяным реактором (BWR) на реке Миссисипи.",
    "location": "Порт-Гибсон, Миссисипи, США",
    "city": "Порт-Гибсон",
    "units": [
      { "id": 1, "name": "Grand Gulf-1", "type": "bwr", "model": "BWR-6", "capacity": 1401, "status": "operational", "startYear": 1985 }
    ],
    "history": ["Строительство начато в 1974 г.", "Введена в коммерческую эксплуатацию в 1985 г.", "Планировался второй блок, но строительство было остановлено в 1990 г."],
    "facts": ["Самый мощный кипящий водо-водяной реактор в США.", "Использует воду из реки Миссисипи для охлаждения через градирню.", "В 2012 г. получила лицензию на продление эксплуатации до 2044 г."]
  },
  {
    "id": 3506,
    "name": "АЭС Х. Б. Робинсон",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [34.402778, -80.158333],
    "status": "operational",
    "totalCapacity": 741,
    "startYear": 1971,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Южной Каролине.",
    "location": "Хартсвилл, Южная Каролина, США",
    "city": "Хартсвилл",
    "units": [
      { "id": 1, "name": "H. B. Robinson-2", "type": "pwr", "model": "W (3-loop)", "capacity": 741, "status": "operational", "startYear": 1971 }
    ],
    "history": ["Строительство начато в 1967 г.", "Введена в эксплуатацию в 1971 г.", "В 2010 г. получила лицензию на продление эксплуатации до 2030 г."],
    "facts": ["Названа в честь Х. Бертона Робинсона, основателя Carolina Power & Light Company.", "На площадке также работал небольшой экспериментальный реактор Robinson-1 с 1958 по 1961 гг.", "В 2010 г. произошла утечка охлаждающей воды, но без последствий для безопасности."]
  },
  {
    "id": 3507,
    "name": "АЭС Харрис",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [35.636667, -78.876944],
    "status": "operational",
    "totalCapacity": 964,
    "startYear": 1987,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Северной Каролине.",
    "location": "Нью-Хилл, Северная Каролина, США",
    "city": "Роли",
    "units": [
      { "id": 1, "name": "Harris-1", "type": "pwr", "model": "W (3-loop)", "capacity": 964, "status": "operational", "startYear": 1987 }
    ],
    "history": ["Строительство начато в 1978 г.", "Введена в коммерческую эксплуатацию в 1987 г.", "В 2011 г. получила лицензию на продление эксплуатации до 2046 г."],
    "facts": ["Первоначально называлась АЭС Широн Харрис в честь бывшего губернатора Северной Каролины.", "Охлаждающая вода поступает из водохранилища Харрис.", "В 2002 г. реактор был остановлен на несколько месяцев из-за трещин в трубопроводах."]
  },
  {
    "id": 3508,
    "name": "АЭС Хоуп-Крик",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [39.469167, -75.541944],
    "status": "operational",
    "totalCapacity": 1172,
    "startYear": 1986,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) в Нью-Джерси.",
    "location": "Салем, Нью-Джерси, США",
    "city": "Салем",
    "units": [
      { "id": 1, "name": "Hope Creek-1", "type": "bwr", "model": "BWR-4", "capacity": 1172, "status": "operational", "startYear": 1986 }
    ],
    "history": ["Строительство начато в 1976 г.", "Введена в коммерческую эксплуатацию в 1986 г.", "В 2011 г. получила лицензию на продление эксплуатации до 2046 г."],
    "facts": ["Имеет градирню естественной тяги высотой 150 метров, являющуюся заметным ориентиром.", "Расположена на одной площадке с АЭС Сейлем и использует общие вспомогательные системы.", "В 1990-х гг. была проведена крупная модернизация для увеличения мощности."]
  },
  {
    "id": 3509,
    "name": "АЭС Джеймс А. ФитцПатрик",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [43.525556, -76.392222],
    "status": "operational",
    "totalCapacity": 813,
    "startYear": 1975,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) на берегу озера Онтарио.",
    "location": "Скриба, Нью-Йорк, США",
    "city": "Освего",
    "units": [
      { "id": 1, "name": "James A. FitzPatrick", "type": "bwr", "model": "BWR-4", "capacity": 813, "status": "operational", "startYear": 1975 }
    ],
    "history": ["Строительство начато в 1968 г.", "Введена в эксплуатацию в 1975 г.", "В 2008 г. получила лицензию на продление эксплуатации до 2034 г."],
    "facts": ["Названа в честь Джеймса А. ФитцПатрика, бывшего председателя New York Power Authority.", "В 2016 г. владелец объявил о закрытии станции, но в 2017 г. она была продана компании Exelon, и решение было отменено.", "Расположена рядом с АЭС Найн-Майл-Пойнт."]
  },
  {
    "id": 3510,
    "name": "АЭС Джозеф М. Фарли",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [31.2225, -85.116389],
    "status": "operational",
    "totalCapacity": 1757,
    "startYear": 1977,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Алабаме.",
    "location": "Дотан, Алабама, США",
    "city": "Дотан",
    "units": [
      { "id": 1, "name": "Joseph M. Farley-1", "type": "pwr", "model": "W (3-loop)", "capacity": 874, "status": "operational", "startYear": 1977 },
      { "id": 2, "name": "Joseph M. Farley-2", "type": "pwr", "model": "W (3-loop)", "capacity": 883, "status": "operational", "startYear": 1981 }
    ],
    "history": ["Строительство блока 1 начато в 1970 г., ввод в эксплуатацию — 1977 г.", "Блок 2 введён в 1981 г.", "В 2005 и 2006 гг. блоки получили лицензии на продление эксплуатации до 2037 и 2041 гг."],
    "facts": ["Названа в честь Джозефа М. Фарли, бывшего президента Alabama Power Company.", "В 2004 г. ураган «Айван» повредил линии электропередачи, но станция продолжила работу.", "Использует градирни для охлаждения."]
  },
  {
    "id": 3511,
    "name": "АЭС Ла-Саль",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.285833, -88.675],
    "status": "operational",
    "totalCapacity": 2277,
    "startYear": 1984,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) в Иллинойсе.",
    "location": "Марсель, Иллинойс, США",
    "city": "Оттава",
    "units": [
      { "id": 1, "name": "LaSalle-1", "type": "bwr", "model": "BWR-5", "capacity": 1137, "status": "operational", "startYear": 1984 },
      { "id": 2, "name": "LaSalle-2", "type": "bwr", "model": "BWR-5", "capacity": 1140, "status": "operational", "startYear": 1984 }
    ],
    "history": ["Строительство начато в 1973 г.", "Оба блока введены в коммерческую эксплуатацию в 1984 г.", "В 2006 и 2007 гг. блоки получили лицензии на продление эксплуатации до 2042 и 2043 гг."],
    "facts": ["Названа в честь французского исследователя Рене-Робера Кавелье де Ла Саля.", "В 2012 г. произошла потеря внешнего электропитания, но станция была безопасно остановлена.", "Использует воду из озера Мичиган для охлаждения."]
  },
  {
    "id": 3512,
    "name": "АЭС Лимерик",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [40.229444, -75.566389],
    "status": "operational",
    "totalCapacity": 2268,
    "startYear": 1986,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) в Пенсильвании.",
    "location": "Лаймар-Хилл, Пенсильвания, США",
    "city": "Финиксвилл",
    "units": [
      { "id": 1, "name": "Limerick-1", "type": "bwr", "model": "BWR-4", "capacity": 1134, "status": "operational", "startYear": 1986 },
      { "id": 2, "name": "Limerick-2", "type": "bwr", "model": "BWR-4", "capacity": 1134, "status": "operational", "startYear": 1990 }
    ],
    "history": ["Строительство начато в 1974 г.", "Блок 1 введён в эксплуатацию в 1986 г., блок 2 — в 1990 г.", "В 2014 и 2015 гг. блоки получили лицензии на продление эксплуатации до 2044 и 2049 гг."],
    "facts": ["Названа в честь округа Лимерик в Ирландии, откуда родом многие ранние поселенцы региона.", "Имеет две высокие градирни, которые видны из многих точек округа.", "Охлаждающая вода поступает из реки Шуйлкилл."]
  },
  {
    "id": 3513,
    "name": "АЭС МакГвайр",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [35.431389, -80.946111],
    "status": "operational",
    "totalCapacity": 2316,
    "startYear": 1981,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Северной Каролине.",
    "location": "Корнелиус, Северная Каролина, США",
    "city": "Хантерсвилл",
    "units": [
      { "id": 1, "name": "McGuire-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1158, "status": "operational", "startYear": 1981 },
      { "id": 2, "name": "McGuire-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1158, "status": "operational", "startYear": 1984 }
    ],
    "history": ["Строительство начато в 1975 г.", "Блок 1 введён в эксплуатацию в 1981 г., блок 2 — в 1984 г.", "В 2016 и 2017 гг. блоки получили лицензии на продление эксплуатации до 2041 и 2043 гг."],
    "facts": ["Названа в честь Уильяма МакГвайра, бывшего председателя Duke Power.", "Охлаждающая вода поступает из озера Норман.", "В 2003 г. ураган «Изабель» вызвал отключение внешнего питания, но аварийные дизель-генераторы обеспечили безопасную остановку."]
  },
  {
    "id": 3514,
    "name": "АЭС Миллстоун",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.315278, -72.170556],
    "status": "operational",
    "totalCapacity": 2079,
    "startYear": 1975,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) на побережье Коннектикута.",
    "location": "Уотерфорд, Коннектикут, США",
    "city": "Нью-Лондон",
    "units": [
      { "id": 1, "name": "Millstone-2", "type": "pwr", "model": "CE (2-loop)", "capacity": 869, "status": "operational", "startYear": 1975 },
      { "id": 2, "name": "Millstone-3", "type": "pwr", "model": "W (4-loop)", "capacity": 1210, "status": "operational", "startYear": 1986 }
    ],
    "history": ["Первый блок (Millstone-1, BWR) был закрыт в 1998 г.", "Millstone-2 введён в 1975 г., Millstone-3 — в 1986 г.", "В 2005 и 2008 гг. блоки 2 и 3 получили лицензии на продление эксплуатации до 2035 и 2045 гг."],
    "facts": ["Единственная атомная станция в штате Коннектикут.", "Использует воду из пролива Лонг-Айленд для охлаждения.", "В 1990-х гг. станция столкнулась с серьёзными проблемами управления, что привело к смене руководства и значительным улучшениям в культуре безопасности."]
  },
  {
    "id": 3515,
    "name": "АЭС Монтиселло",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [45.410833, -93.999722],
    "status": "operational",
    "totalCapacity": 628,
    "startYear": 1971,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) в Миннесоте.",
    "location": "Монтиселло, Миннесота, США",
    "city": "Монтиселло",
    "units": [
      { "id": 1, "name": "Monticello", "type": "bwr", "model": "BWR-3", "capacity": 628, "status": "operational", "startYear": 1971 }
    ],
    "history": ["Строительство начато в 1966 г.", "Введена в эксплуатацию в 1971 г.", "В 2006 г. получила лицензию на продление эксплуатации до 2030 г."],
    "facts": ["Названа в честь города Монтиселло, который, в свою очередь, назван в честь поместья Томаса Джефферсона.", "Использует воду из реки Миссисипи для охлаждения.", "В 2011 г. произошла утечка радиоактивной воды, но она была локализована на территории станции."]
  },
  {
    "id": 3516,
    "name": "АЭС Найн-Майл-Пойнт",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [43.525556, -76.392222],
    "status": "operational",
    "totalCapacity": 1890,
    "startYear": 1969,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) на берегу озера Онтарио.",
    "location": "Скриба, Нью-Йорк, США",
    "city": "Освего",
    "units": [
      { "id": 1, "name": "Nine Mile Point-1", "type": "bwr", "model": "BWR-2", "capacity": 613, "status": "operational", "startYear": 1969 },
      { "id": 2, "name": "Nine Mile Point-2", "type": "bwr", "model": "BWR-5", "capacity": 1277, "status": "operational", "startYear": 1988 }
    ],
    "history": ["Блок 1 — старейший действующий реактор BWR в США (1969 г.).", "Блок 2 введён в эксплуатацию в 1988 г.", "Планировался блок 3, но проект был отменён."],
    "facts": ["Названа по названию мыса на озере Онтарио.", "В 1991 г. на блоке 2 произошла необъяснённая потеря мощности, что привело к автоматическому срабатыванию аварийной защиты.", "Расположена рядом с АЭС Джеймс А. ФитцПатрик."]
  },
  {
    "id": 3517,
    "name": "АЭС Норт-Анна",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [38.061389, -77.790556],
    "status": "operational",
    "totalCapacity": 1892,
    "startYear": 1978,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Вирджинии.",
    "location": "Минерал, Вирджиния, США",
    "city": "Минерал",
    "units": [
      { "id": 1, "name": "North Anna-1", "type": "pwr", "model": "W (3-loop)", "capacity": 948, "status": "operational", "startYear": 1978 },
      { "id": 2, "name": "North Anna-2", "type": "pwr", "model": "W (3-loop)", "capacity": 944, "status": "operational", "startYear": 1980 }
    ],
    "history": ["Строительство начато в 1971 г.", "Блок 1 введён в 1978 г., блок 2 — в 1980 г.", "В 2003 и 2005 гг. блоки получили лицензии на продление эксплуатации до 2038 и 2040 гг."],
    "facts": ["Расположена на искусственном озере Анна, созданном для охлаждения реакторов.", "В 2011 г. землетрясение магнитудой 5,8 вызвало отключение реакторов; станция выдержала толчки без повреждений.", "На площадке хранится значительное количество отработавшего топлива."]
  },
  {
    "id": 3518,
    "name": "АЭС Окони",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [34.791667, -82.897222],
    "status": "operational",
    "totalCapacity": 2554,
    "startYear": 1973,
    "overview": "Атомная станция с тремя водо-водяными реакторами (PWR) в Южной Каролине.",
    "location": "Сенека, Южная Каролина, США",
    "city": "Сенека",
    "units": [
      { "id": 1, "name": "Oconee-1", "type": "pwr", "model": "B&W (L-loop)", "capacity": 847, "status": "operational", "startYear": 1973 },
      { "id": 2, "name": "Oconee-2", "type": "pwr", "model": "B&W (L-loop)", "capacity": 848, "status": "operational", "startYear": 1974 },
      { "id": 3, "name": "Oconee-3", "type": "pwr", "model": "B&W (L-loop)", "capacity": 859, "status": "operational", "startYear": 1974 }
    ],
    "history": ["Первая АЭС Duke Energy и одна из первых крупных станций с тремя блоками.", "Все три блока введены в эксплуатацию в 1973–1974 гг.", "В 2000-х гг. получили лицензии на продление эксплуатации до 2033–2034 гг."],
    "facts": ["Названа по названию округа Окони.", "Реакторы охлаждаются водой из водохранилища Киови, созданного Duke Energy.", "В 2013 г. на станции был введён в эксплуатацию крупный центр обработки данных для анализа работы оборудования."]
  },
  {
    "id": 3519,
    "name": "АЭС Перри",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.798611, -81.145833],
    "status": "operational",
    "totalCapacity": 1240,
    "startYear": 1987,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) на берегу озера Эри в Огайо.",
    "location": "Норт-Перри, Огайо, США",
    "city": "Норт-Перри",
    "units": [
      { "id": 1, "name": "Perry-1", "type": "bwr", "model": "BWR-6", "capacity": 1240, "status": "operational", "startYear": 1987 }
    ],
    "history": ["Строительство начато в 1974 г.", "Введена в коммерческую эксплуатацию в 1987 г.", "В 2006 г. получила лицензию на продление эксплуатации до 2026 г., а затем до 2046 г."],
    "facts": ["Названа по названию близлежащего города Перри.", "Изначально планировались два блока, но блок 2 был отменён в 1994 г.", "В 1986 г. во время строительства произошёл сильный пожар, задержавший ввод в эксплуатацию."]
  },
  {
    "id": 3520,
    "name": "АЭС Пойнт-Бич",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [44.283611, -87.533611],
    "status": "operational",
    "totalCapacity": 1182,
    "startYear": 1970,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) на западном берегу озера Мичиган.",
    "location": "Ту-Риверс, Висконсин, США",
    "city": "Манитовок",
    "units": [
      { "id": 1, "name": "Point Beach-1", "type": "pwr", "model": "W (2-loop)", "capacity": 591, "status": "operational", "startYear": 1970 },
      { "id": 2, "name": "Point Beach-2", "type": "pwr", "model": "W (2-loop)", "capacity": 591, "status": "operational", "startYear": 1972 }
    ],
    "history": ["Строительство начато в 1967 г.", "Блок 1 введён в эксплуатацию в 1970 г., блок 2 — в 1972 г.", "В 2005 и 2007 гг. блоки получили лицензии на продление эксплуатации до 2030 и 2033 гг."],
    "facts": ["Одна из старейших действующих АЭС в США.", "Использует воду из озера Мичиган для охлаждения.", "В 2003 г. ураганные ветры повредили часть внешнего оборудования, но реакторы работали стабильно."]
  },
  {
    "id": 3521,
    "name": "АЭС Прери-Айленд",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [44.628611, -92.638889],
    "status": "operational",
    "totalCapacity": 1041,
    "startYear": 1973,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Миннесоте.",
    "location": "Ред-Уинг, Миннесота, США",
    "city": "Ред-Уинг",
    "units": [
      { "id": 1, "name": "Prairie Island-1", "type": "pwr", "model": "W (2-loop)", "capacity": 521, "status": "operational", "startYear": 1973 },
      { "id": 2, "name": "Prairie Island-2", "type": "pwr", "model": "W (2-loop)", "capacity": 520, "status": "operational", "startYear": 1974 }
    ],
    "history": ["Строительство начато в 1968 г.", "Блок 1 введён в эксплуатацию в 1973 г., блок 2 — в 1974 г.", "В 2003 и 2006 гг. блоки получили лицензии на продление эксплуатации до 2033 и 2034 гг."],
    "facts": ["Названа по названию близлежащего острова Прери-Айленд.", "Расположена рядом с индейской резервацией Prairie Island Indian Community, что вызывало споры по поводу хранения отработавшего топлива.", "Использует воду из реки Миссисипи для охлаждения."]
  },
  {
    "id": 3522,
    "name": "АЭС Сейлем (PSEG)",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [39.469167, -75.541944],
    "status": "operational",
    "totalCapacity": 2327,
    "startYear": 1977,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Нью-Джерси.",
    "location": "Салем, Нью-Джерси, США",
    "city": "Салем",
    "units": [
      { "id": 1, "name": "Salem-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1164, "status": "operational", "startYear": 1977 },
      { "id": 2, "name": "Salem-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1163, "status": "operational", "startYear": 1981 }
    ],
    "history": ["Строительство начато в 1968 г.", "Блок 1 введён в эксплуатацию в 1977 г., блок 2 — в 1981 г.", "В 2011 и 2016 гг. блоки получили лицензии на продление эксплуатации до 2036 и 2040 гг."],
    "facts": ["Расположена на одной площадке с АЭС Хоуп-Крик и использует общие вспомогательные системы.", "Использует воду из залива Делавэр для охлаждения.", "В 1980-х и 1990-х гг. станция сталкивалась с проблемами управления, но с тех пор значительно улучшила показатели безопасности."]
  },
  {
    "id": 3523,
    "name": "АЭС Куод-Ситиз",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.723333, -90.316667],
    "status": "operational",
    "totalCapacity": 1819,
    "startYear": 1973,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) на реке Миссисипи.",
    "location": "Кордова, Иллинойс, США",
    "city": "Кордова",
    "units": [
      { "id": 1, "name": "Quad Cities-1", "type": "bwr", "model": "BWR-4", "capacity": 909, "status": "operational", "startYear": 1973 },
      { "id": 2, "name": "Quad Cities-2", "type": "bwr", "model": "BWR-4", "capacity": 910, "status": "operational", "startYear": 1973 }
    ],
    "history": ["Строительство начато в 1967 г.", "Оба блока введены в коммерческую эксплуатацию в 1973 г.", "В 2003 и 2004 гг. блоки получили лицензии на продление эксплуатации до 2032 г."],
    "facts": ["Названа в честь четырёх соседних городов: Давенпорт и Беттендорф (Айова), Рок-Айленд и Молин (Иллинойс).", "Использует воду из реки Миссисипи для охлаждения.", "В 1990-х гг. была проведена крупная модернизация для увеличения мощности и надёжности."]
  },
  {
    "id": 3524,
    "name": "АЭС Ривер-Бенд",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [30.717222, -91.252778],
    "status": "operational",
    "totalCapacity": 967,
    "startYear": 1986,
    "overview": "Одноблочная атомная станция с кипящим водо-водяным реактором (BWR) в Луизиане.",
    "location": "Сент-Фрэнсисвилл, Луизиана, США",
    "city": "Сент-Фрэнсисвилл",
    "units": [
      { "id": 1, "name": "River Bend-1", "type": "bwr", "model": "BWR-6", "capacity": 967, "status": "operational", "startYear": 1986 }
    ],
    "history": ["Строительство начато в 1977 г.", "Введена в коммерческую эксплуатацию в 1986 г.", "В 2011 г. получила лицензию на продление эксплуатации до 2045 г."],
    "facts": ["Расположена на реке Миссисипи.", "Имеет градирню естественной тяги.", "В 1990-х гг. станция столкнулась с проблемами производительности, но после модернизации улучшила свои показатели."]
  },
  {
    "id": 3525,
    "name": "АЭС Сибрук",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [42.899722, -70.849722],
    "status": "operational",
    "totalCapacity": 1246,
    "startYear": 1990,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Нью-Гэмпшире.",
    "location": "Сибрук, Нью-Гэмпшире, США",
    "city": "Сибрук",
    "units": [
      { "id": 1, "name": "Seabrook-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1246, "status": "operational", "startYear": 1990 }
    ],
    "history": ["Строительство начато в 1976 г.", "Введена в коммерческую эксплуатацию в 1990 г.", "В 2012 г. получила лицензию на продление эксплуатации до 2050 г."],
    "facts": ["Строительство сопровождалось крупными протестами анти-ядерных активистов в конце 1970-х гг.", "Расположена на побережье Атлантического океана, использует морскую воду для охлаждения.", "В 2007 г. были обнаружены проблемы с бетоном в туннелях, что потребовало дорогостоящего ремонта."]
  },
  {
    "id": 3526,
    "name": "АЭС Секвойя",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [35.225833, -85.090556],
    "status": "operational",
    "totalCapacity": 2291,
    "startYear": 1981,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Теннесси.",
    "location": "Содази-Дейзи, Теннесси, США",
    "city": "Чаттануга",
    "units": [
      { "id": 1, "name": "Sequoyah-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1145, "status": "operational", "startYear": 1981 },
      { "id": 2, "name": "Sequoyah-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1146, "status": "operational", "startYear": 1982 }
    ],
    "history": ["Строительство начато в 1970 г.", "Блок 1 введён в эксплуатацию в 1981 г., блок 2 — в 1982 г.", "В 2015 и 2019 гг. блоки получили лицензии на продление эксплуатации до 2040 и 2041 гг."],
    "facts": ["Названа в честь Секвойи, создателя письменности чероки.", "Использует воду из водохранилища Чикамауга на реке Теннесси для охлаждения.", "В 1985 г. на блоке 1 произошла небольшая утечка радиоактивного пара, но без последствий для населения."]
  },
  {
    "id": 3527,
    "name": "АЭС Саут-Техас",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [28.796389, -96.045833],
    "status": "operational",
    "totalCapacity": 2560,
    "startYear": 1988,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Техасе.",
    "location": "Бей-Сити, Техас, США",
    "city": "Бей-Сити",
    "units": [
      { "id": 1, "name": "South Texas-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1280, "status": "operational", "startYear": 1988 },
      { "id": 2, "name": "South Texas-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1280, "status": "operational", "startYear": 1989 }
    ],
    "history": ["Строительство начато в 1975 г.", "Блок 1 введён в эксплуатацию в 1988 г., блок 2 — в 1989 г.", "В 2012 и 2013 гг. блоки получили лицензии на продление эксплуатации до 2047 и 2048 гг."],
    "facts": ["Одна из самых мощных АЭС в США.", "Использует воду из водохранилища Колорадо-Бенд.", "В 2005 г. ураган «Рита» вызвал эвакуацию персонала, но станция работала стабильно."]
  },
  {
    "id": 3528,
    "name": "АЭС Сент-Люси",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [27.353611, -80.246389],
    "status": "operational",
    "totalCapacity": 1968,
    "startYear": 1976,
    "overview": "Атомная станция с двумя водо-водяными реакторов (PWR) на побережье Флориды.",
    "location": "Форт-Пирс, Флорида, США",
    "city": "Форт-Пирс",
    "units": [
      { "id": 1, "name": "St. Lucie-1", "type": "pwr", "model": "CE (2-loop)", "capacity": 984, "status": "operational", "startYear": 1976 },
      { "id": 2, "name": "St. Lucie-2", "type": "pwr", "model": "CE (2-loop)", "capacity": 984, "status": "operational", "startYear": 1983 }
    ],
    "history": ["Строительство блока 1 начато в 1970 г., ввод в эксплуатацию — 1976 г.", "Блок 2 введён в 1983 г.", "В 2003 и 2016 гг. блоки получили лицензии на продление эксплуатации до 2036 и 2043 гг."],
    "facts": ["Расположена на барьерном острове, использует воду из Атлантического океана для охлаждения.", "В 2004 г. ураганы «Фрэнсис» и «Джинн» вызвали повреждения вспомогательных зданий, но реакторы не пострадали.", "На станции есть образовательный центр для посетителей."]
  },
  {
    "id": 3529,
    "name": "АЭС Вирджил К. Саммер",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [33.616667, -80.9925],
    "status": "operational",
    "totalCapacity": 973,
    "startYear": 1984,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Южной Каролине.",
    "location": "Дженкинсвилл, Южная Каролина, США",
    "city": "Дженкинсвилл",
    "units": [
      { "id": 1, "name": "Virgil C. Summer-1", "type": "pwr", "model": "W (3-loop)", "capacity": 973, "status": "operational", "startYear": 1984 }
    ],
    "history": ["Строительство начато в 1973 г.", "Введена в коммерческую эксплуатацию в 1984 г.", "В 2004 г. получила лицензию на продление эксплуатации до 2042 г."],
    "facts": ["Названа в честь Вирджила К. Саммера, бывшего председателя South Carolina Electric & Gas.", "Использует воду из озера Монтичелло для охлаждения.", "На площадке началось строительство блоков 2 и 3 по проекту AP1000, но оно было прекращено в 2017 г. после банкротства Westinghouse и значительного перерасхода средств."]
  },
  {
    "id": 3530,
    "name": "АЭС Серри",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [37.165278, -76.898889],
    "status": "operational",
    "totalCapacity": 1676,
    "startYear": 1972,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Вирджинии.",
    "location": "Серри, Вирджиния, США",
    "city": "Серри",
    "units": [
      { "id": 1, "name": "Surry-1", "type": "pwr", "model": "W (3-loop)", "capacity": 838, "status": "operational", "startYear": 1972 },
      { "id": 2, "name": "Surry-2", "type": "pwr", "model": "W (3-loop)", "capacity": 838, "status": "operational", "startYear": 1973 }
    ],
    "history": ["Строительство начато в 1968 г.", "Блок 1 введён в эксплуатацию в 1972 г., блок 2 — в 1973 г.", "В 2003 и 2013 гг. блоки получили лицензии на продление эксплуатации до 2032 и 2033 гг."],
    "facts": ["Первая АЭС, построенная компанией Dominion Energy.", "Расположена на берегу реки Джеймс.", "В 1986 г. на блоке 1 произошла авария с разрывом трубы, приведшая к гибели четырёх работников."]
  },
  {
    "id": 3531,
    "name": "АЭС Саскуэханна",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [41.069444, -76.146389],
    "status": "operational",
    "totalCapacity": 2514,
    "startYear": 1983,
    "overview": "Атомная станция с двумя кипящими водо-водяными реакторами (BWR) в Пенсильвании.",
    "location": "Салем, Пенсильвания, США",
    "city": "Бервик",
    "units": [
      { "id": 1, "name": "Susquehanna-1", "type": "bwr", "model": "BWR-4", "capacity": 1257, "status": "operational", "startYear": 1983 },
      { "id": 2, "name": "Susquehanna-2", "type": "bwr", "model": "BWR-4", "capacity": 1257, "status": "operational", "startYear": 1985 }
    ],
    "history": ["Строительство начато в 1973 г.", "Блок 1 введён в эксплуатацию в 1983 г., блок 2 — в 1985 г.", "В 2009 и 2012 гг. блоки получили лицензии на продление эксплуатации до 2042 и 2044 гг."],
    "facts": ["Расположена на берегу реки Саскуэханна.", "Имеет две градирни высотой 145 метров.", "В 2008 г. на блоке 1 произошла утечка радиоактивной воды, но она была локализована внутри здания."]
  },
  {
    "id": 3532,
    "name": "АЭС Тёрки-Пойнт",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [25.436667, -80.33],
    "status": "operational",
    "totalCapacity": 1658,
    "startYear": 1972,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) во Флориде.",
    "location": "Флорида-Сити, Флорида, США",
    "city": "Флорида-Сити",
    "units": [
      { "id": 1, "name": "Turkey Point-3", "type": "pwr", "model": "W (3-loop)", "capacity": 829, "status": "operational", "startYear": 1972 },
      { "id": 2, "name": "Turkey Point-4", "type": "pwr", "model": "W (3-loop)", "capacity": 829, "status": "operational", "startYear": 1973 }
    ],
    "history": ["Строительство начато в 1967 г.", "Блок 3 введён в эксплуатацию в 1972 г., блок 4 — в 1973 г.", "В 2002 и 2019 гг. блоки получили лицензии на продление эксплуатации до 2032 и 2033 гг."],
    "facts": ["Расположена в национальном парке Эверглейдс, что вызывает экологические споры.", "Использует уникальную систему охлаждающих каналов длиной 268 км, интегрированную в природную среду.", "На площадке также работают два старых газо- и нефтяных блока и строятся два новых блока AP1000."]
  },
  {
    "id": 3533,
    "name": "АЭС Уотерфорд",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [29.996944, -90.486111],
    "status": "operational",
    "totalCapacity": 1168,
    "startYear": 1985,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Луизиане.",
    "location": "Тэфт, Луизиана, США",
    "city": "Киллоне",
    "units": [
      { "id": 1, "name": "Waterford-3", "type": "pwr", "model": "CE (2-loop)", "capacity": 1168, "status": "operational", "startYear": 1985 }
    ],
    "history": ["Строительство начато в 1974 г.", "Введена в коммерческую эксплуатацию в 1985 г.", "В 2010 г. получила лицензию на продление эксплуатации до 2044 г."],
    "facts": ["Расположена на берегу реки Миссисипи.", "В 1988 г. ураган «Эндрю» вызвал повреждения, но реактор был безопасно остановлен.", "Станция сыграла важную роль в восстановлении энергоснабжения после урагана «Катрина»."]
  },
  {
    "id": 3534,
    "name": "АЭС Уоттс-Бар",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [35.603056, -84.789444],
    "status": "operational",
    "totalCapacity": 2321,
    "startYear": 1996,
    "overview": "Атомная станция с двумя водо-водяными реакторами (PWR) в Теннесси.",
    "location": "Спринг-Сити, Теннесси, США",
    "city": "Спринг-Сити",
    "units": [
      { "id": 1, "name": "Watts Bar-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1160, "status": "operational", "startYear": 1996 },
      { "id": 2, "name": "Watts Bar-2", "type": "pwr", "model": "W (4-loop)", "capacity": 1161, "status": "operational", "startYear": 2016 }
    ],
    "history": ["Строительство начато в 1973 г.", "Блок 1 введён в эксплуатацию в 1996 г. после длительных задержек.", "Блок 2, строительство которого было возобновлено в 2007 г., введён в 2016 г., став первым новым реактором в США в XXI веке."],
    "facts": ["Расположена на водохранилище Уоттс-Бар на реке Теннесси.", "Блок 2 стал первым реактором, построенным в США после аварии на Три-Майл-Айленд (1979 г.).", "На станции также производится тритий для ядерного оружия США."]
  },
  {
    "id": 3536,
    "name": "АЭС Вулф-Крик",
    "country": { "name": "США", "flag": "🇺🇸" },
    "coords": [38.236944, -95.681667],
    "status": "operational",
    "totalCapacity": 1266,
    "startYear": 1985,
    "overview": "Одноблочная атомная станция с водо-водяным реактором (PWR) в Канзасе.",
    "location": "Берлингтон, Канзас, США",
    "city": "Берлингтон",
    "units": [
      { "id": 1, "name": "Wolf Creek-1", "type": "pwr", "model": "W (4-loop)", "capacity": 1266, "status": "operational", "startYear": 1985 }
    ],
    "history": ["Строительство начато в 1973 г.", "Введена в коммерческую эксплуатацию в 1985 г.", "В 2010 г. получила лицензию на продление эксплуатации до 2045 г."],
    "facts": ["Единственная атомная станция в штате Канзас.", "Расположена на берегу озера Коффи.", "В 2008 г. была вынуждена снизить мощность из-за необычно высокой температуры воды в озере, что вызвало дебаты о влиянии изменения климата на работу АЭС."]
  },
  {
    "id": 3600,
    "name": "АЭС Даявань",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [22.598889, 114.548616],
    "status": "operational",
    "totalCapacity": 1968,
    "startYear": 1993,
    "overview": "Первая крупная коммерческая атомная электростанция в континентальном Китае, построенная с иностранным (французским) участием. Обеспечивает электроэнергией Гонконг и Гуандун.",
    "location": "Шэньчжэнь, Гуандун, Китай",
    "city": "Шэньчжэнь",
    "units": [
      { "id": 1, "name": "Даявань-1", "type": "pwr", "model": "M310", "capacity": 984, "status": "operational", "startYear": 1993 },
      { "id": 2, "name": "Даявань-2", "type": "pwr", "model": "M310", "capacity": 984, "status": "operational", "startYear": 1994 }
    ],
    "history": [
      { "year": "1980", "title": "Планирование и протесты", "description": "Планы строительства вызвали протесты более миллиона жителей Гонконга, обеспокоенных безопасностью." },
      { "year": "1987", "title": "Начало строительства", "description": "Строительство первого энергоблока началось 7 августа 1987 года." },
      { "year": "1988", "title": "Строительство второго блока", "description": "Строительство второго энергоблока началось 7 апреля 1988 года." },
      { "year": "1993", "title": "Пуск первого блока", "description": "Первый энергоблок физически запущен 28 июля 1993 года, подключён к сети 31 августа 1993 года." },
      { "year": "1994", "title": "Коммерческая эксплуатация", "description": "Первый блок введён в коммерческую эксплуатацию 1 февраля 1994 года, второй — 6 мая 1994 года." },
      { "year": "2011", "title": "Модернизация безопасности", "description": "После аварии на Фукусиме проведена переоценка безопасности, установлены дополнительные дизель-генераторы и мобильные насосы." }
    ],
    "facts": [
      "Это вторая атомная электростанция в истории Китая и первая, построенная с крупным иностранным участием (Framatome).",
      "Более 70% электроэнергии станции закупает Гонконг.",
      "В 1987 году обнаружена пропажа 316 арматурных стержней, что потребовало дополнительного армирования.",
      "В октябре 2010 года на первом блоке зафиксирован инцидент уровня 1 по INES из-за течи борной кислоты.",
      "На площадке проводится международный нейтринный эксперимент Daya Bay Reactor Neutrino Experiment.",
      "С 2006 года станция открыта для туристических экскурсий."
    ]
  },
  {
    "id": 3601,
    "name": "АЭС Линьао",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [22.606760, 114.555972],
    "status": "operational",
    "totalCapacity": 3934,
    "startYear": 2002,
    "overview": "Атомная электростанция, расположенная рядом с АЭС Даявань. Первые блоки использовали французскую технологию, последующие — её китайскую адаптацию CPR-1000.",
    "location": "Шэньчжэнь, Гуандун, Китай",
    "city": "Шэньчжэнь",
    "units": [
      { "id": 1, "name": "Линьао-1", "type": "pwr", "model": "M310", "capacity": 990, "status": "operational", "startYear": 2002 },
      { "id": 2, "name": "Линьао-2", "type": "pwr", "model": "M310", "capacity": 990, "status": "operational", "startYear": 2002 },
      { "id": 3, "name": "Линьао-3", "type": "pwr", "model": "CPR-1000", "capacity": 1086, "status": "operational", "startYear": 2010 },
      { "id": 4, "name": "Линьао-4", "type": "pwr", "model": "CPR-1000", "capacity": 1086, "status": "operational", "startYear": 2011 }
    ],
    "history": [
      { "year": "1997", "title": "Начало строительства", "description": "Строительство первых двух блоков (М310) началось в 1997 году." },
      { "year": "2002", "title": "Ввод первых блоков", "description": "Блоки 1 и 2 введены в коммерческую эксплуатацию в 2002 году." },
      { "year": "2005", "title": "Начало второй очереди", "description": "Стартовало строительство блоков 3 и 4 по технологии CPR-1000, первой локализованной китайской версии." },
      { "year": "2010", "title": "Ввод блока 3", "description": "Третий блок введён в эксплуатацию в 2010 году." },
      { "year": "2011", "title": "Ввод блока 4", "description": "Четвёртый блок введён в эксплуатацию в 2011 году." },
      { "year": "2011", "title": "Постфукусимская модернизация", "description": "Проведена переоценка безопасности и внедрены дополнительные меры защиты." }
    ],
    "facts": [
      "АЭС Линьао расположена непосредственно рядом с АЭС Даявань, образуя крупнейшую в Китае базу атомной энергетики площадью 10 кв. км.",
      "Вторая очередь (блоки 3 и 4) ознаменовала переход от французских реакторов M310 к китайской модели CPR-1000.",
      "Блоки Линьао-3 и -4 первыми в Китае получили систему цифрового управления (DCS) собственной разработки."
    ]
  },
  {
    "id": 3602,
    "name": "АЭС Ниндэ",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [26.666667, 119.516667],
    "status": "operational",
    "totalCapacity": 4356,
    "startYear": 2012,
    "overview": "Крупная прибрежная АЭС, изначально использовавшая реакторы CPR-1000. На площадке ведётся строительство блока нового поколения HPR1000.",
    "location": "Ниндэ, Фуцзянь, Китай",
    "city": "Ниндэ",
    "units": [
      { "id": 1, "name": "Ниндэ-1", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2012 },
      { "id": 2, "name": "Ниндэ-2", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2014 },
      { "id": 3, "name": "Ниндэ-3", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2015 },
      { "id": 4, "name": "Ниндэ-4", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2016 },
      { "id": 5, "name": "Ниндэ-5", "type": "pwr", "model": "HPR1000", "capacity": 1200, "status": "construction", "startYear": 2024, "expectedYear": 2029 }
    ],
    "history": [
      { "year": "2008", "title": "Начало строительства", "description": "Строительство первого блока началось в феврале 2008 года. Ниндэ стала первой АЭС в провинции Фуцзянь." },
      { "year": "2012", "title": "Пуск блока 1", "description": "Первый блок подключён к сети в декабре 2012 года, коммерческая эксплуатация с апреля 2013 года." },
      { "year": "2014", "title": "Ввод блока 2", "description": "Блок 2 введён в эксплуатацию в 2014 году." },
      { "year": "2015", "title": "Ввод блока 3", "description": "Блок 3 введён в эксплуатацию в 2015 году." },
      { "year": "2016", "title": "Ввод блока 4", "description": "Блок 4 введён в эксплуатацию в 2016 году." },
      { "year": "2024", "title": "Начало строительства блока 5", "description": "Стартовало строительство пятого блока по технологии HPR1000." }
    ],
    "facts": [
      "Первая АЭС в провинции Фуцзянь, снизившая зависимость региона от угля.",
      "Станция проектировалась с учётом сейсмической активности региона.",
      "Блок 5 (HPR1000) станет одним из первых, строящихся после возобновления одобрения новых проектов в Китае."
    ]
  },
  {
    "id": 3603,
    "name": "АЭС Саньмэнь",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [29.099, 121.649],
    "status": "operational",
    "totalCapacity": 2502,
    "startYear": 2018,
    "overview": "Первая в мире атомная электростанция, где были введены в коммерческую эксплуатацию реакторы AP1000. Знаковый проект для китайской и мировой атомной энергетики.",
    "location": "Саньмэнь, Чжэцзян, Китай",
    "city": "Саньмэнь",
    "units": [
      { "id": 1, "name": "Саньмэнь-1", "type": "pwr", "model": "AP1000", "capacity": 1251, "status": "operational", "startYear": 2018 },
      { "id": 2, "name": "Саньмэнь-2", "type": "pwr", "model": "AP1000", "capacity": 1251, "status": "operational", "startYear": 2018 },
      { "id": 3, "name": "Саньмэнь-3", "type": "pwr", "model": "CAP1000", "capacity": 1251, "status": "construction", "startYear": 2022, "expectedYear": 2027 },
      { "id": 4, "name": "Саньмэнь-4", "type": "pwr", "model": "CAP1000", "capacity": 1251, "status": "construction", "startYear": 2023, "expectedYear": 2028 }
    ],
    "history": [
      { "year": "2004", "title": "Одобрение проекта", "description": "Проект одобрен в рамках стратегии внедрения передовых зарубежных технологий третьего поколения." },
      { "year": "2009", "title": "Начало строительства", "description": "Заливка первого бетона для блока 1 в апреле 2009 года." },
      { "year": "2018", "title": "Коммерческая эксплуатация", "description": "Блоки 1 и 2 стали первыми в мире реакторами AP1000, достигшими коммерческой эксплуатации." },
      { "year": "2022", "title": "Начало строительства блока 3", "description": "Стартовало строительство третьего блока по локализованному проекту CAP1000." },
      { "year": "2023", "title": "Начало строительства блока 4", "description": "Строительство четвёртого блока по проекту CAP1000." }
    ],
    "facts": [
      "Саньмэнь стала пилотной площадкой для технологии AP1000, позже локализованной как CAP1000.",
      "Реакторы AP1000 оснащены пассивной системой безопасности, работающей без внешнего питания 72 часа.",
      "Стоимость строительства первых двух блоков превысила 40 млрд юаней (около 6 млрд долларов)."
    ]
  },
  {
    "id": 3604,
    "name": "АЭС Сюйдапу",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [40.333, 120.567],
    "status": "construction",
    "totalCapacity": 5004,
    "startYear": null,
    "overview": "Строящаяся атомная станция, являющаяся примером широкого международного сотрудничества Китая в атомной сфере. На площадке будут соседствовать китайские реакторы CAP1000 и российские ВВЭР-1200.",
    "location": "Хулудао, Ляонин, Китай",
    "city": "Хулудао",
    "units": [
      { "id": 1, "name": "Сюйдапу-1", "type": "pwr", "model": "CAP1000", "capacity": 1251, "status": "construction", "startYear": 2023, "expectedYear": 2028 },
      { "id": 2, "name": "Сюйдапу-2", "type": "pwr", "model": "CAP1000", "capacity": 1251, "status": "construction", "startYear": 2024, "expectedYear": 2029 },
      { "id": 3, "name": "Сюйдапу-3", "type": "vver", "model": "ВВЭР-1200", "capacity": 1251, "status": "construction", "startYear": 2021, "expectedYear": 2026 },
      { "id": 4, "name": "Сюйдапу-4", "type": "vver", "model": "ВВЭР-1200", "capacity": 1251, "status": "construction", "startYear": 2022, "expectedYear": 2027 }
    ],
    "history": [
      { "year": "2010", "title": "Начало подготовительных работ", "description": "Предварительные работы на площадке начались в 2010 году." },
      { "year": "2018", "title": "Соглашение с Россией", "description": "Подписано межправительственное соглашение о строительстве двух блоков ВВЭР-1200." },
      { "year": "2021", "title": "Старт блока 3", "description": "Заливка первого бетона для блока 3 (российского) в мае 2021 года." },
      { "year": "2022", "title": "Старт блока 4", "description": "Заливка первого бетона для блока 4 (российского) в мае 2022 года." },
      { "year": "2023", "title": "Старт блока 1", "description": "Начало строительства блока 1 с CAP1000 в 2023 году." },
      { "year": "2024", "title": "Старт блока 2", "description": "Начало строительства блока 2 с CAP1000 в 2024 году." }
    ],
    "facts": [
      "Единственная АЭС в Китае, где одновременно строятся блоки российского (ВВЭР-1200) и китайского (CAP1000) дизайна.",
      "Российские блоки строятся «под ключ» с поставкой ядерного топлива.",
      "Станция расположена в сейсмоактивной зоне, применены специальные антисейсмические решения."
    ]
  },
  {
    "id": 3605,
    "name": "АЭС Тайпинлин (Хойэоу)",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [23.227, 114.627],
    "status": "construction",
    "totalCapacity": 2402,
    "startYear": null,
    "overview": "Новая атомная станция с реакторами поколения III+ HPR1000 (Hualong One). Один из ключевых проектов по локализации и продвижению собственной китайской технологии.",
    "location": "Хойян, Гуандун, Китай",
    "city": "Хойян",
    "units": [
      { "id": 1, "name": "Тайпинлин-1", "type": "pwr", "model": "HPR1000", "capacity": 1200, "status": "construction", "startYear": 2019, "expectedYear": 2025 },
      { "id": 2, "name": "Тайпинлин-2", "type": "pwr", "model": "HPR1000", "capacity": 1202, "status": "construction", "startYear": 2020, "expectedYear": 2026 }
    ],
    "history": [
      { "year": "2000-е", "title": "Планирование", "description": "Начало планирования площадки как части развития ядерной энергетики Гуандуна." },
      { "year": "2019", "title": "Начало строительства блока 1", "description": "Заливка первого бетона в декабре 2019 года." },
      { "year": "2020", "title": "Начало строительства блока 2", "description": "Заливка первого бетона в октябре 2020 года." }
    ],
    "facts": [
      "Первая станция, построенная по унифицированному проекту HPR1000 с полностью китайской цепочкой поставок.",
      "Реакторы оснащены двойной защитной оболочкой, способной выдержать удар коммерческого авиалайнера.",
      "Станция снабжает электроэнергией дельту Жемчужной реки, снижая нагрузку на угольные ТЭС."
    ]
  },
  {
    "id": 3606,
    "name": "АЭС Фанцзяшань",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [30.438, 120.954],
    "status": "operational",
    "totalCapacity": 2178,
    "startYear": 2014,
    "overview": "Атомная электростанция, построенная как расширение площадки Циньшань. Использует усовершенствованные реакторы типа CPR-1000.",
    "location": "Цзясин, Чжэцзян, Китай",
    "city": "Хайянь",
    "units": [
      { "id": 1, "name": "Фанцзяшань-1", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2014 },
      { "id": 2, "name": "Фанцзяшань-2", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2015 }
    ],
    "history": [
      { "year": "2008", "title": "Начало строительства блока 1", "description": "Строительство первого блока началось в декабре 2008 года." },
      { "year": "2009", "title": "Начало строительства блока 2", "description": "Строительство второго блока началось в июле 2009 года." },
      { "year": "2014", "title": "Пуск блока 1", "description": "Первый блок подключён к сети в декабре 2014 года, коммерческая эксплуатация с января 2015 года." },
      { "year": "2015", "title": "Пуск блока 2", "description": "Второй блок введён в коммерческую эксплуатацию в феврале 2015 года." }
    ],
    "facts": [
      "Фанцзяшань — третья очередь базы Циньшань, которая вместе с соседними блоками образует одну из крупнейших ядерных площадок мира (9 блоков).",
      "Станция расположена на побережье залива Ханчжоу, обеспечивая энергией Шанхай и Ханчжоу.",
      "При строительстве впервые в Китае применена BIM-технология управления проектом."
    ]
  },
  {
    "id": 3607,
    "name": "АЭС Фанчэнган",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [21.656, 108.548],
    "status": "operational",
    "totalCapacity": 3622,
    "startYear": 2015,
    "overview": "Ключевая площадка для развёртывания национальной реакторной технологии HPR1000 (Hualong One). Первые два блока используют усовершенствованные модели CPR-1000.",
    "location": "Фанчэн, Гуанси-Чжуанский автономный район, Китай",
    "city": "Фанчэн",
    "units": [
      { "id": 1, "name": "Фанчэнган-1", "type": "pwr", "model": "CPR-1000", "capacity": 1086, "status": "operational", "startYear": 2015 },
      { "id": 2, "name": "Фанчэнган-2", "type": "pwr", "model": "CPR-1000", "capacity": 1086, "status": "operational", "startYear": 2016 },
      { "id": 3, "name": "Фанчэнган-3", "type": "pwr", "model": "HPR1000", "capacity": 1188, "status": "operational", "startYear": 2022 },
      { "id": 4, "name": "Фанчэнган-4", "type": "pwr", "model": "HPR1000", "capacity": 1188, "status": "operational", "startYear": 2024 }
    ],
    "history": [
      { "year": "2010", "title": "Начало строительства блока 1", "description": "Строительство первого блока (CPR-1000) началось в июле 2010 года." },
      { "year": "2010", "title": "Начало строительства блока 2", "description": "Строительство второго блока (CPR-1000) началось в декабре 2010 года." },
      { "year": "2016", "title": "Ввод блоков 1 и 2", "description": "Блок 1 введён в январе 2016 года, блок 2 — в октябре 2016 года." },
      { "year": "2015", "title": "Начало строительства блока 3", "description": "Строительство третьего блока (HPR1000) началось в декабре 2015 года." },
      { "year": "2016", "title": "Начало строительства блока 4", "description": "Строительство четвёртого блока (HPR1000) началось в декабре 2016 года." },
      { "year": "2022", "title": "Ввод блока 3", "description": "Блок 3 введён в эксплуатацию в 2022 году, став первым HPR1000 от CGN." },
      { "year": "2024", "title": "Ввод блока 4", "description": "Блок 4 введён в эксплуатацию в 2024 году." }
    ],
    "facts": [
      "Первая АЭС в Гуанси-Чжуанском автономном районе.",
      "Блоки 3 и 4 — флагманские проекты CGN по продвижению HPR1000 на экспорт.",
      "Станция расположена недалеко от границы с Вьетнамом."
    ]
  },
  {
    "id": 3608,
    "name": "АЭС Фуцин",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [25.447, 119.444],
    "status": "operational",
    "totalCapacity": 5438,
    "startYear": 2014,
    "overview": "Одна из крупнейших атомных электростанций в Китае. Первые четыре блока оснащены реакторами CPR-1000, пятый и шестой — новейшими HPR1000 (Hualong One).",
    "location": "Фуцин, Фуцзянь, Китай",
    "city": "Фуцин",
    "units": [
      { "id": 1, "name": "Фуцин-1", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2014 },
      { "id": 2, "name": "Фуцин-2", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2015 },
      { "id": 3, "name": "Фуцин-3", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2016 },
      { "id": 4, "name": "Фуцин-4", "type": "pwr", "model": "CPR-1000", "capacity": 1089, "status": "operational", "startYear": 2017 },
      { "id": 5, "name": "Фуцин-5", "type": "pwr", "model": "HPR1000", "capacity": 1150, "status": "operational", "startYear": 2020 },
      { "id": 6, "name": "Фуцин-6", "type": "pwr", "model": "HPR1000", "capacity": 1150, "status": "operational", "startYear": 2021 }
    ],
    "history": [
      { "year": "2008", "title": "Начало строительства первой очереди", "description": "Строительство блоков 1-4 (CPR-1000) велось с 2008 по 2012 годы." },
      { "year": "2014", "title": "Ввод блока 1", "description": "Первый блок введён в коммерческую эксплуатацию в 2014 году." },
      { "year": "2015", "title": "Ввод блока 2", "description": "Второй блок введён в 2015 году." },
      { "year": "2016", "title": "Ввод блока 3", "description": "Третий блок введён в 2016 году." },
      { "year": "2017", "title": "Ввод блока 4", "description": "Четвёртый блок введён в 2017 году." },
      { "year": "2015", "title": "Начало строительства блоков 5 и 6", "description": "Старт строительства первых в мире блоков Hualong One (HPR1000)." },
      { "year": "2020", "title": "Ввод блока 5", "description": "Пятый блок подключён к сети в ноябре 2020 года, став первым в мире Hualong One." },
      { "year": "2022", "title": "Ввод блока 6", "description": "Шестой блок введён в коммерческую эксплуатацию в январе 2022 года." }
    ],
    "facts": [
      "Фуцин стала первой станцией, где был введён в эксплуатацию реактор Hualong One (блок 5).",
      "Общая мощность 5438 МВт сопоставима с крупнейшими ГЭС мира.",
      "Станция — ключевой элемент энергосистемы провинции Фуцзянь."
    ]
  },
  {
    "id": 3609,
    "name": "АЭС Хайян",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [36.705, 121.382],
    "status": "operational",
    "totalCapacity": 2500,
    "startYear": 2018,
    "overview": "Ещё одна ключевая площадка с реакторами AP1000. Наряду с Саньмэнь, сыграла важную роль в освоении и локализации этой технологии в Китае.",
    "location": "Яньтай, Шаньдун, Китай",
    "city": "Хайян",
    "units": [
      { "id": 1, "name": "Хайян-1", "type": "pwr", "model": "AP1000", "capacity": 1250, "status": "operational", "startYear": 2018 },
      { "id": 2, "name": "Хайян-2", "type": "pwr", "model": "AP1000", "capacity": 1250, "status": "operational", "startYear": 2018 },
      { "id": 3, "name": "Хайян-3", "type": "pwr", "model": "CAP1000", "capacity": 1250, "status": "construction", "startYear": 2022, "expectedYear": 2027 },
      { "id": 4, "name": "Хайян-4", "type": "pwr", "model": "CAP1000", "capacity": 1250, "status": "construction", "startYear": 2023, "expectedYear": 2028 }
    ],
    "history": [
      { "year": "2009", "title": "Начало строительства", "description": "Строительство первых двух блоков AP1000 началось в сентябре 2009 года." },
      { "year": "2018", "title": "Ввод блоков 1 и 2", "description": "После многолетних задержек блоки 1 и 2 введены в коммерческую эксплуатацию в 2018 году." },
      { "year": "2021", "title": "Запуск ядерного теплоснабжения", "description": "Начало первой в Китае системы централизованного теплоснабжения на остаточном ядерном тепле." },
      { "year": "2022", "title": "Старт блока 3", "description": "Начало строительства третьего блока по проекту CAP1000." },
      { "year": "2023", "title": "Старт блока 4", "description": "Начало строительства четвёртого блока по проекту CAP1000." }
    ],
    "facts": [
      "Первая в мире АЭС, обеспечивающая централизованное теплоснабжение города (с 2021 года).",
      "Хайян и Саньмэнь стали основой для локализации AP1000 в проект CAP1000.",
      "Станция находится в провинции Шаньдун — крупнейшем энергопотребляющем регионе Китая."
    ]
  },
  {
    "id": 3610,
    "name": "АЭС Сяпу (CFR-600)",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [26.833, 120.167],
    "status": "construction",
    "totalCapacity": 1200,
    "startYear": null,
    "overview": "Пилотный демонстрационный проект китайского быстрого реактора на быстрых нейтронах CFR-600. Важный этап в развитии замкнутого ядерного топливного цикла в Китае.",
    "location": "Сяпу, Фуцзянь, Китай",
    "city": "Сяпу",
    "units": [
      { "id": 1, "name": "Сяпу CFR-600-1", "type": "fast", "model": "CFR-600", "capacity": 600, "status": "construction", "startYear": 2017, "expectedYear": 2025 },
      { "id": 2, "name": "Сяпу CFR-600-2", "type": "fast", "model": "CFR-600", "capacity": 600, "status": "construction", "startYear": 2020, "expectedYear": 2026 }
    ],
    "history": [
      { "year": "2015", "title": "Одобрение проекта", "description": "Проект CFR-600 официально одобрен как следующий этап после экспериментального реактора CEFR." },
      { "year": "2017", "title": "Начало строительства блока 1", "description": "Заливка первого бетона для первого блока CFR-600 в декабре 2017 года." },
      { "year": "2020", "title": "Начало строительства блока 2", "description": "Строительство второго блока началось в декабре 2020 года." }
    ],
    "facts": [
      "CFR-600 — натриевый быстрый реактор, предназначенный для замыкания ядерного топливного цикла.",
      "Проект — ключевой элемент стратегии Китая по самообеспеченности ядерным топливом.",
      "Сяпу станет первым в мире коммерческим быстрым реактором большой мощности."
    ]
  },
  {
    "id": 3611,
    "name": "АЭС Хунъяньхэ",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [39.799, 121.472],
    "status": "operational",
    "totalCapacity": 5594,
    "startYear": 2013,
    "overview": "Крупная атомная электростанция на северо-востоке Китая. Поэтапно оснащалась реакторами CPR-1000 и их более совершенной версией ACPR-1000.",
    "location": "Вафандянь, Ляонин, Китай",
    "city": "Далянь",
    "units": [
      { "id": 1, "name": "Хунъяньхэ-1", "type": "pwr", "model": "CPR-1000", "capacity": 1119, "status": "operational", "startYear": 2013 },
      { "id": 2, "name": "Хунъяньхэ-2", "type": "pwr", "model": "CPR-1000", "capacity": 1119, "status": "operational", "startYear": 2013 },
      { "id": 3, "name": "Хунъяньхэ-3", "type": "pwr", "model": "CPR-1000", "capacity": 1119, "status": "operational", "startYear": 2015 },
      { "id": 4, "name": "Хунъяньхэ-4", "type": "pwr", "model": "CPR-1000", "capacity": 1119, "status": "operational", "startYear": 2016 },
      { "id": 5, "name": "Хунъяньхэ-5", "type": "pwr", "model": "ACPR-1000", "capacity": 1119, "status": "operational", "startYear": 2021 },
      { "id": 6, "name": "Хунъяньхэ-6", "type": "pwr", "model": "ACPR-1000", "capacity": 1119, "status": "operational", "startYear": 2022 }
    ],
    "history": [
      { "year": "2007", "title": "Начало строительства первой очереди", "description": "Строительство блоков 1-4 (CPR-1000) началось в 2007-2009 годах." },
      { "year": "2013", "title": "Ввод блоков 1 и 2", "description": "Первые два блока введены в эксплуатацию в 2013 году." },
      { "year": "2015", "title": "Ввод блока 3", "description": "Третий блок введён в 2015 году." },
      { "year": "2016", "title": "Ввод блока 4", "description": "Четвёртый блок введён в 2016 году." },
      { "year": "2015", "title": "Начало строительства второй очереди", "description": "Старт строительства блоков 5 и 6 по проекту ACPR-1000." },
      { "year": "2021", "title": "Ввод блока 5", "description": "Пятый блок введён в 2021 году." },
      { "year": "2022", "title": "Ввод блока 6", "description": "Шестой блок введён в 2022 году." }
    ],
    "facts": [
      "Первая АЭС на северо-востоке Китая, снизившая зависимость региона от угля.",
      "Блоки 5 и 6 — первые в Китае, построенные по проекту ACPR-1000 (эволюция CPR-1000).",
      "Станция расположена недалеко от Даляня, важного промышленного центра."
    ]
  },
  {
    "id": 3612,
    "name": "АЭС Циньшань",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [30.438, 120.954],
    "status": "operational",
    "totalCapacity": 4299,
    "startYear": 1991,
    "overview": "Исторически первая атомная электростанция Китая, построенная собственными силами. Состоит из трёх очередей с разными технологиями: CNP-300, CNP-600 и канадскими тяжеловодными CANDU-6.",
    "location": "Цзясин, Чжэцзян, Китай",
    "city": "Хайянь",
    "units": [
      { "id": 1, "name": "Циньшань-1", "type": "pwr", "model": "CNP-300", "capacity": 310, "status": "operational", "startYear": 1991 },
      { "id": 2, "name": "Циньшань-2-1", "type": "pwr", "model": "CNP-600", "capacity": 650, "status": "operational", "startYear": 2002 },
      { "id": 3, "name": "Циньшань-2-2", "type": "pwr", "model": "CNP-600", "capacity": 650, "status": "operational", "startYear": 2004 },
      { "id": 4, "name": "Циньшань-2-3", "type": "pwr", "model": "CNP-600", "capacity": 660, "status": "operational", "startYear": 2010 },
      { "id": 5, "name": "Циньшань-2-4", "type": "pwr", "model": "CNP-600", "capacity": 660, "status": "operational", "startYear": 2011 },
      { "id": 6, "name": "Циньшань-3-1", "type": "phwr", "model": "CANDU-6", "capacity": 728, "status": "operational", "startYear": 2002 },
      { "id": 7, "name": "Циньшань-3-2", "type": "phwr", "model": "CANDU-6", "capacity": 728, "status": "operational", "startYear": 2003 }
    ],
    "history": [
      { "year": "1985", "title": "Начало строительства блока 1", "description": "Строительство первого китайского коммерческого атомного блока CNP-300." },
      { "year": "1991", "title": "Пуск блока 1", "description": "Подключение к сети в декабре 1991 года. Китай стал седьмой ядерной державой." },
      { "year": "1996", "title": "Начало второй очереди", "description": "Строительство блоков 2-5 (CNP-600) началось в 1996-2006 годах." },
      { "year": "2002", "title": "Ввод блока 2", "description": "Блок 2 (CNP-600) введён в эксплуатацию в 2002 году." },
      { "year": "1998", "title": "Начало третьей очереди", "description": "Строительство блоков 6-7 (CANDU-6) по контракту с AECL." },
      { "year": "2002", "title": "Ввод блока 6", "description": "Первый тяжеловодный блок введён в 2002 году." },
      { "year": "2003", "title": "Ввод блока 7", "description": "Второй тяжеловодный блок введён в 2003 году." },
      { "year": "2011", "title": "Завершение второй очереди", "description": "Последний блок CNP-600 введён в 2011 году." }
    ],
    "facts": [
      "Единственная в мире АЭС, где одновременно работают PWR и PHWR разных поколений.",
      "Блоки CANDU-6 адаптированы под китайское топливо и отличаются высокой эффективностью.",
      "Циньшань-1 стал базой для всей серии CNP."
    ]
  },
  {
    "id": 3613,
    "name": "АЭС Чанцзян",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [19.418, 108.858],
    "status": "operational",
    "totalCapacity": 1300,
    "startYear": 2015,
    "overview": "Первая атомная электростанция на острове Хайнань. Первоначально оснащалась реакторами CNP-600, в дальнейшем планируется расширение блоками HPR1000 и небольшим модульным реактором ACP100.",
    "location": "Чанцзян-Лиский автономный уезд, Хайнань, Китай",
    "city": "Чанцзян",
    "units": [
      { "id": 1, "name": "Чанцзян-1", "type": "pwr", "model": "CNP-600", "capacity": 650, "status": "operational", "startYear": 2015 },
      { "id": 2, "name": "Чанцзян-2", "type": "pwr", "model": "CNP-600", "capacity": 650, "status": "operational", "startYear": 2016 },
      { "id": 3, "name": "Чанцзян-3", "type": "pwr", "model": "HPR1000", "capacity": 1197, "status": "construction", "startYear": 2021, "expectedYear": 2026 },
      { "id": 4, "name": "Чанцзян-4", "type": "pwr", "model": "HPR1000", "capacity": 1197, "status": "construction", "startYear": 2021, "expectedYear": 2027 },
      { "id": 5, "name": "Чанцзян SMR", "type": "smr", "model": "ACP100", "capacity": 125, "status": "construction", "startYear": 2021, "expectedYear": 2026 }
    ],
    "history": [
      { "year": "2010", "title": "Начало строительства", "description": "Строительство блоков 1 и 2 (CNP-600) началось в 2010 году." },
      { "year": "2015", "title": "Ввод блока 1", "description": "Первый блок введён в декабре 2015 года." },
      { "year": "2016", "title": "Ввод блока 2", "description": "Второй блок введён в августе 2016 года." },
      { "year": "2021", "title": "Начало расширения", "description": "Старт строительства блоков 3 и 4 (HPR1000) и малого модульного реактора ACP100." }
    ],
    "facts": [
      "Единственная АЭС на острове Хайнань, позволившая отказаться от новых угольных ТЭС.",
      "На станции строится первый в мире коммерческий наземный SMR ACP100 (Linglong One).",
      "Станция адаптирована к тропическому климату и тайфунам."
    ]
  },
  {
    "id": 3614,
    "name": "АЭС Чжанчжоу",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [23.850, 117.500],
    "status": "construction",
    "totalCapacity": 4848,
    "startYear": null,
    "overview": "Новая крупная атомная станция, полностью строящаяся на основе национальной технологии HPR1000 (Hualong One). Ожидается, что станет одной из самых мощных АЭС с этим типом реакторов.",
    "location": "Чжанчжоу, Фуцзянь, Китай",
    "city": "Чжанчжоу",
    "units": [
      { "id": 1, "name": "Чжанчжоу-1", "type": "pwr", "model": "HPR1000", "capacity": 1212, "status": "construction", "startYear": 2019, "expectedYear": 2024 },
      { "id": 2, "name": "Чжанчжоу-2", "type": "pwr", "model": "HPR1000", "capacity": 1212, "status": "construction", "startYear": 2020, "expectedYear": 2025 },
      { "id": 3, "name": "Чжанчжоу-3", "type": "pwr", "model": "HPR1000", "capacity": 1214, "status": "construction", "startYear": 2024, "expectedYear": 2029 },
      { "id": 4, "name": "Чжанчжоу-4", "type": "pwr", "model": "HPR1000", "capacity": 1214, "status": "construction", "startYear": 2024, "expectedYear": 2029 }
    ],
    "history": [
      { "year": "2008", "title": "Подготовительные работы", "description": "Начало подготовительных работ на площадке." },
      { "year": "2019", "title": "Начало строительства блока 1", "description": "Заливка первого бетона в октябре 2019 года." },
      { "year": "2020", "title": "Начало строительства блока 2", "description": "Строительство второго блока началось в сентябре 2020 года." },
      { "year": "2024", "title": "Начало строительства блоков 3 и 4", "description": "Старт строительства третьего и четвёртого блоков." }
    ],
    "facts": [
      "Первая АЭС, на которой будут эксплуатироваться четыре блока HPR1000 в рамках одной очереди.",
      "Локализация оборудования превышает 90%.",
      "Станция входит в ядерный кластер провинции Фуцзянь."
    ]
  },
  {
    "id": 3615,
    "name": "АЭС Шидаовань",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [36.978, 122.525],
    "status": "operational",
    "totalCapacity": 211,
    "startYear": 2021,
    "overview": "Уникальная площадка, объединяющая два прорывных проекта: первый в мире коммерческий высокотемпературный газоохлаждаемый реактор (HTR-PM) и крупнейшие в Китае реакторы CAP1400 (развитие технологии AP1000).",
    "location": "Жунчэн, Шаньдун, Китай",
    "city": "Жунчэн",
    "units": [
      { "id": 1, "name": "Шидаовань HTR-PM", "type": "htgr", "model": "HTR-PM", "capacity": 211, "status": "operational", "startYear": 2021 },
      { "id": 2, "name": "Шидаовань CAP1400-1", "type": "pwr", "model": "CAP1400", "capacity": 1500, "status": "construction", "startYear": 2019, "expectedYear": 2024 },
      { "id": 3, "name": "Шидаовань CAP1400-2", "type": "pwr", "model": "CAP1400", "capacity": 1500, "status": "construction", "startYear": 2020, "expectedYear": 2025 },
      { "id": 4, "name": "Шидаовань HPR1000-1", "type": "pwr", "model": "HPR1000", "capacity": 1500, "status": "construction", "startYear": 2024, "expectedYear": 2029 }
    ],
    "history": [
      { "year": "2012", "title": "Начало строительства HTR-PM", "description": "Строительство высокотемпературного реактора HTR-PM." },
      { "year": "2021", "title": "Пуск HTR-PM", "description": "Первый в мире коммерческий высокотемпературный газоохлаждаемый реактор подключён к сети." },
      { "year": "2019", "title": "Начало строительства CAP1400-1", "description": "Старт первого блока CAP1400." },
      { "year": "2020", "title": "Начало строительства CAP1400-2", "description": "Старт второго блока CAP1400." },
      { "year": "2024", "title": "Начало строительства HPR1000", "description": "Начало строительства четвёртого блока (HPR1000)." }
    ],
    "facts": [
      "HTR-PM — первый в мире коммерческий высокотемпературный реактор с шаровой засыпкой, топливо выдерживает 1600°C.",
      "CAP1400 — самый мощный коммерческий реактор китайской разработки (1500 МВт).",
      "Площадка объединяет три разные технологии поколения III/IV."
    ]
  },
  {
    "id": 3616,
    "name": "CEFR (Китайский экспериментальный быстрый реактор)",
    "country": { "name": "Китай", "flag": "🇨🇳" },
    "coords": [39.827, 115.942],
    "status": "operational",
    "totalCapacity": 20,
    "startYear": 2010,
    "overview": "Первый в Китае реактор на быстрых нейтронах, важный исследовательский объект для отработки технологий будущего замкнутого ядерного топливного цикла.",
    "location": "Пекин / Институт атомной энергии, Китай",
    "city": "Пекин",
    "units": [
      { "id": 1, "name": "CEFR", "type": "fast", "model": "Experimental Fast Reactor", "capacity": 20, "status": "operational", "startYear": 2010 }
    ],
    "history": [
      { "year": "1990-е", "title": "Разработка", "description": "Начало разработки CEFR при поддержке российских специалистов (опыт БН-600)." },
      { "year": "2000", "title": "Начало строительства", "description": "Строительство реактора велось с 2000 по 2010 год." },
      { "year": "2010", "title": "Физический пуск", "description": "Физический пуск состоялся в июле 2010 года." },
      { "year": "2011", "title": "Подключение к сети", "description": "Реактор подключён к сети, став первым быстрым реактором Китая." }
    ],
    "facts": [
      "CEFR стал основой для разработки CFR-600 и всей китайской программы быстрых реакторов.",
      "Реактор использует натриевый теплоноситель и способен воспроизводить топливо (бридер).",
      "Находится всего в 40 км от центра Пекина — уникальный случай для ядерной установки."
    ]
  },
	{
        id: 403,
        name: "АЭС Цзиньшань",
        country: { name: "Тайвань", flag: "🇹🇼" },
        coords: [25.2883, 121.5944],
        status: "closed",
        totalCapacity: 1272,
        startYear: 1978,
        overview: "Первая коммерческая атомная электростанция на Тайване. Остановлена после 40 лет эксплуатации[citation:2][citation:9].",
        location: "поселок Шимэнь, Новый Тайбэй, Тайвань",
        city: "Шимэнь",
        units: [
            { id: 1, name: "Цзиньшань-1", type: "bwr", model: "BWR-4 (Mark 1)", capacity: 636, status: "closed", startYear: 1978, endYear: 2018 },
            { id: 2, name: "Цзиньшань-2", type: "bwr", model: "BWR-4 (Mark 1)", capacity: 636, status: "closed", startYear: 1979, endYear: 2019 }
        ],
        history: [
            { year: "1972", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Начало строительства блока 1 (июнь 1972) и блока 2 (декабрь 1973)[citation:2]" },
            { year: "1978", title: "ПУСК ПЕРВОГО БЛОКА", description: "Блок 1 подключен к сети в ноябре 1978 года[citation:2]" },
            { year: "2019", title: "ОКОНЧАТЕЛЬНАЯ ОСТАНОВКА", description: "Блок 2 выведен из эксплуатации в июле 2019 года[citation:2][citation:9]" }
        ],
        facts: [
            "Первая АЭС на Тайване, введена в коммерческую эксплуатацию в 1978 году[citation:8]",
            "Остановлена в рамках политики отказа от ядерной энергетики к 2025 году[citation:3]",
            "Процесс вывода из эксплуатации рассчитан на 25 лет[citation:9]"
        ]
    },
    {
        id: 404,
        name: "АЭС Гошэн (Куошэн)",
        country: { name: "Тайвань", flag: "tw" },
        coords: [25.2078, 121.6603],
        status: "closed",
        totalCapacity: 1970,
        startYear: 1981,
        overview: "Крупнейшая из остановленных АЭС Тайваня. Второй блок остановлен досрочно из-за нехватки места в бассейне выдержки отработанного топлива[citation:2][citation:9].",
        location: "поселок Ваньли, Новый Тайбэй, Тайвань",
        city: "Ваньли",
        units: [
            { id: 1, name: "Гошэн-1", type: "bwr", model: "BWR-6", capacity: 985, status: "closed", startYear: 1981, endYear: 2021 },
            { id: 2, name: "Гошэн-2", type: "bwr", model: "BWR-6", capacity: 985, status: "closed", startYear: 1983, endYear: 2023 }
        ],
        history: [
            { year: "1975", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Начало строительства блоков (ноябрь 1975 и март 1976)[citation:2]" },
            { year: "1981", title: "ПУСК ПЕРВОГО БЛОКА", description: "Блок 1 подключен к сети в мае 1981 года[citation:2]" },
            { year: "2023", title: "ОКОНЧАТЕЛЬНАЯ ОСТАНОВКА", description: "Блок 2 остановлен в марте 2023 года[citation:2][citation:3]" }
        ],
        facts: [
            "Блок 1 остановлен досрочно в июле 2021 года из-за переполненного бассейна выдержки[citation:3][citation:9]",
            "Блок 2 остановлен в марте 2023 года[citation:2]",
            "Оборудована реакторами BWR-6 производства General Electric[citation:6]"
        ]
    },
    {
        id: 405,
        name: "АЭС Мааншань (Мааньшань)",
        country: { name: "Тайвань", flag: "🇹🇼" },
        coords: [21.9625, 120.7583],
        status: "closed",
        totalCapacity: 1874,
        startYear: 1984,
        overview: "Последняя действовавшая АЭС на Тайване. Остановлена в мае 2025 года после истечения 40-летнего срока эксплуатации, что ознаменовало полный отказ региона от ядерной энергетики[citation:3][citation:7].",
        location: "город Хэнчунь, уезд Пиндун, Тайвань",
        city: "Хэнчунь",
        units: [
            { id: 1, name: "Мааншань-1", type: "pwr", model: "WH 3LP (WE 312)", capacity: 936, status: "closed", startYear: 1984, endYear: 2024 },
            { id: 2, name: "Мааншань-2", type: "pwr", model: "WH 3LP (WE 312)", capacity: 938, status: "closed", startYear: 1985, endYear: 2025 }
        ],
        history: [
            { year: "1978", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Старт строительства (август 1978 и февраль 1979)[citation:2]" },
            { year: "1985", title: "ПУСК БЛОКОВ", description: "Коммерческая эксплуатация блока 2 началась в мае 1985 года[citation:2]" },
            { year: "2025", title: "ПОЛНАЯ ОСТАНОВКА", description: "Блок 2 отключен от сети 17 мая 2025 года[citation:3][citation:7]" }
        ],
        facts: [
            "Единственная АЭС на Тайване с реакторами типа PWR (Westinghouse)[citation:6]",
            "Выработала более 526 ТВт·ч за 40 лет эксплуатации[citation:2]",
            "Остановка блока 2 17 мая 2025 года ознаменовала полный отказ Тайваня от ядерной энергетики[citation:3][citation:8]"
        ]
    },
    {
        id: 406,
        name: "АЭС Лунмэнь",
        country: { name: "Тайвань", flag: "🇹🇼" },
        coords: [25.0353, 121.9242],
        status: "abandoned",
        totalCapacity: 0,
        startYear: null,
        overview: "Проект АЭС с двумя передовыми кипящими реакторами (ABWR) мощностью 1350 МВт каждый. Строительство заморожено в 2014 году, окончательно отменено в 2019-м[citation:3][citation:9].",
        location: "поселок Гунляо, Новый Тайбэй, Тайвань",
        city: "Гунляо",
        units: [
            { id: 1, name: "Лунмэнь-1", type: "bwr", model: "ABWR", capacity: 1350, status: "abandoned", startYear: null },
            { id: 2, name: "Лунмэнь-2", type: "bwr", model: "ABWR", capacity: 1350, status: "abandoned", startYear: null }
        ],
        history: [
            { year: "1999", title: "НАЧАЛО СТРОИТЕЛЬСТВА", description: "Старт строительства обоих блоков (март и август 1999)[citation:2][citation:9]" },
            { year: "2014", title: "ЗАМОРОЗКА ПРОЕКТА", description: "Строительство приостановлено, блок 2 законсервирован[citation:3][citation:9]" },
            { year: "2019", title: "ОКОНЧАТЕЛЬНАЯ ОТМЕНА", description: "Taipower объявила о невозможности запуска станции[citation:9]" }
        ],
        facts: [
            "Суммарные затраты на проект составили около 300 млрд тайваньских долларов (~$9.9 млрд)[citation:9]",
            "На референдуме в декабре 2021 года большинство избирателей отвергло возможность возобновления строительства[citation:9]",
            "Проект включал реакторы ABWR производства General Electric и Toshiba[citation:10]"
        ]
    }





// КОНЕЦ ДЕВЯТОГО ПАКЕТА
];

// Обновленная глобальная статистика (ДОЛЖНА БЫТЬ ТОЛЬКО ОДИН РАЗ, ВНЕ МАССИВА)
const globalStats = {
    totalPlants: stationsData.length,
    totalCapacity: stationsData.reduce((sum, station) => sum + (station.totalCapacity || 0), 0),
    operationalStations: stationsData.filter(s => s.status === 'operational').length,
    constructionStations: stationsData.filter(s => s.status === 'construction').length,
    closedStations: stationsData.filter(s => s.status === 'closed').length,
    abandonedStations: stationsData.filter(s => s.status === 'abandoned').length,
    accidentStations: stationsData.filter(s => s.status === 'accident').length,
    stoppedStations: stationsData.filter(s => s.status === 'stopped').length
};

// Для удобства можно добавить функцию фильтрации по стране
function getStationsByCountry(countryName) {
    return stationsData.filter(station => station.country.name === countryName);
}

console.log(`Всего АЭС в базе данных: ${globalStats.totalPlants}`);
console.log(`Действующие АЭС: ${globalStats.operationalStations}`);
console.log(`Заброшенные АЭС: ${globalStats.abandonedStations}`);
console.log(`Закрытые АЭС: ${globalStats.closedStations}`);
console.log(`Аварийные АЭС: ${globalStats.accidentStations}`);
// Экспорт (если используется в модульной системе)
// export { statusConfig, reactorTypes, stationsData, globalStats, getStationsByCountry };










