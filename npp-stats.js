// ============ КОНФИГУРАЦИЯ ============
const CONFIG = {
    theme: 'dark',
    newsTickerSpeed: 30,
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

let charts = {};
let currentLang = 'ru';

// ============ I18N ============
const I18N = {
    ru: {
        langName: 'RU',
        brand: 'МИР АЭС',
        pageTitle: 'Мир АЭС | Цифровая панорама атомной энергетики',
        metaDesc: 'Цифровая панорама мировой атомной энергетики: 415 действующих реакторов, 398 ГВт мощности, прогнозы МАГАТЭ до 2050 года, сравнение ВВЭР и РБМК, история и новости отрасли.',
        mapBtn: 'ИНТЕРАКТИВНАЯ КАРТА',
        sectionTitle: 'ЦИФРОВАЯ ПАНОРАМА АТОМНОЙ ЭНЕРГЕТИКИ (2026)',
        tickerTitle: 'СВЕЖИЕ НОВОСТИ АТОМНОЙ ОТРАСЛИ',
        newsGridTitle: 'НОВОСТИ АТОМНОЙ ОТРАСЛИ: 2025–2026',
        worldStatsTitle: 'КЛЮЧЕВЫЕ ЦИФРЫ МИРА',
        progressTitle: 'ПОКАЗАТЕЛИ РАЗВИТИЯ АТОМНОЙ ЭНЕРГЕТИКИ',
        prog1: 'Глобальная мощность АЭС',
        prog2: 'Доля в мировой генерации',
        prog3: 'Реакторы в стадии строительства',
        prog4: 'Страны с ядерными программами',
        chartsTitle: 'ГРАФИКИ',
        chart1: 'ТОП-5 СТРАН ПО УСТАНОВЛЕННОЙ МОЩНОСТИ',
        chart2: 'ПРОГНОЗ РОСТА МОЩНОСТЕЙ К 2050 ГОДУ',
        reactorTitle: 'АРХИТЕКТУРА НАДЁЖНОСТИ: ВВЭР vs РБМК',
        historyTitle: 'ХРОНОЛОГИЯ: ОТ СЕКРЕТНОГО СЛОВА «РЕАКТОР»',
        sourcesTitle: 'ИСПОЛЬЗОВАННЫЕ АВТОРИТЕТНЫЕ ИСТОЧНИКИ',
        yAxisPower: 'Мощность, ГВт',
        yAxisPowerShort: 'Установленная мощность, ГВт',
        chartTopCountriesLabel: 'Мощность, ГВт',
        chartForecastConservative: 'Консервативный сценарий',
        chartForecastOptimistic: 'Оптимистичный сценарий МАГАТЭ',
        countries: { US: 'США', FR: 'Франция', CN: 'Китай', RU: 'Россия', KR: 'Южная Корея' },
        news: [
            'МАГАТЭ: в 2025 году АЭС мира выработали рекордные 2 703 ТВт·ч электроэнергии',
            '30 декабря 2025 года полностью остановлена Билибинская АЭС после 51 года работы',
            'Китай строит 39 энергоблоков — больше, чем любая другая страна',
            'Турция: АЭС «Аккую» готовится к пуску первого блока ВВЭР-1200',
            'Япония: реактор №6 АЭС «Касивадзаки-Карива» перезапущен впервые после Фукусимы',
            'Индонезия и Росатом подписали первое в мире соглашение на экспорт плавучих АЭС (200 МВт)',
            'МАГАТЭ: оптимистичный сценарий — 992 ГВт ядерных мощностей к 2050 году',
            'Бангладеш: первый блок АЭС «Руппур» (ВВЭР-1200) готовится к подключению к сети',
            'Россия: начато строительство энергоблока №3 Курской АЭС-2 (ВВЭР-ТОИ)',
            'Канада: стартовало строительство первого SMR Darlington (BWRX-300)'
        ],
        newsGrid: [
            {
                icon: 'fas fa-chart-line',
                year: '2025: РЕКОРД ВЫРАБОТКИ',
                text: 'Мировое производство атомной электроэнергии достигло <strong>2 703 ТВт·ч</strong> в 2025 году — исторический максимум. Однако весь прирост обеспечен Китаем (+7,6%), тогда как в остальном мире выработка снизилась на 0,2%. Доля атомной энергетики в мировой генерации составила <strong>8,8%</strong> (данные WNISR/IAEA).'
            },
            {
                icon: 'fas fa-flag',
                year: 'ДЕКАБРЬ 2025: ЗАКРЫТИЕ БИЛИБИНСКОЙ АЭС',
                text: '30 декабря 2025 года был остановлен последний энергоблок Билибинской АЭС на Чукотке. Станция проработала <strong>51 год</strong> в условиях вечной мерзлоты и стала первой в России полностью выведенной из промышленной эксплуатации. Энергоснабжение региона обеспечивает плавучая АТЭС «Академик Ломоносов».'
            },
            {
                icon: 'fas fa-hard-hat',
                year: '2026: СТРОИТЕЛЬСТВО В МИРЕ',
                text: 'По состоянию на начало 2026 года в 15 странах сооружается около <strong>80 энергоблоков</strong>. Китай лидирует с 39 блоками, за ним следуют Индия (7), Россия (7), Южная Корея (4), Турция (4) и Египет (4). Средний срок строительства превышает 5 лет (данные PRIS IAEA).'
            },
            {
                icon: 'fas fa-water',
                year: 'ОКТЯБРЬ 2026: ПЛАВУЧИЕ АЭС НА ЭКСПОРТ',
                text: 'Индонезия и Росатом подписали первое в мире соглашение об экспорте плавучих атомных энергоблоков. Две установки <strong>FPU-100</strong> суммарной мощностью <strong>200 МВт</strong> будут поставлены в провинцию Северная Малуку. Проект реализуется по схеме B2B без государственного финансирования.'
            },
            {
                icon: 'fas fa-sync-alt',
                year: 'ЯНВАРЬ 2026: ЯПОНИЯ ВОЗВРАЩАЕТСЯ',
                text: 'Tokyo Electric Power перезапустила реактор №6 АЭС «Касивадзаки-Карива» — первый перезапуск станции компании после аварии на Фукусиме в 2011 году. В октябре 2026 года на АЭС «Онагава» произошла утечка воды (0,2 т/ч), реактор №2 временно остановлен для ремонта; радиационный фон в норме.'
            },
            {
                icon: 'fas fa-bullseye',
                year: 'ПРОГНОЗ: 992 ГВт К 2050 ГОДУ',
                text: 'Согласно оптимистичному сценарию МАГАТЭ, установленная мощность мировой атомной энергетики достигнет <strong>992 ГВт</strong> к 2050 году (рост в 2,6 раза). WNA допускает утроение мощностей. Ключевая роль отводится малым модульным реакторам (SMR) и замкнутому топливному циклу.'
            }
        ],
        worldStats: [
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
                description: 'Установленная мощность-брутто всех действующих (OP) реакторов в мире. Без учёта 23 реакторов в статусе приостановленной эксплуатации (SO).',
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
        ],
        reactorHeaders: [
            'ХАРАКТЕРИСТИКА',
            '<span class="vver-badge">ВВЭР</span>',
            '<span class="rbmk-badge">РБМК</span>'
        ],
        reactorRows: [
            ['<strong>Принцип работы</strong>', 'Корпусной реактор. Вода — замедлитель и теплоноситель под давлением (аналог мирового PWR).', 'Канальный реактор. Замедлитель — графит, теплоноситель — кипящая вода в отдельных каналах.'],
            ['<strong>Ключевой коэффициент безопасности</strong>', '<span style="color: var(--accent-nuclear-green);"><strong>Отрицательный</strong></span>. При потере охлаждения и росте пара цепная реакция затухает (саморегуляция).', '<span style="color: var(--accent-critical-red);"><strong>Изначально положительный</strong></span> на некоторых режимах. После Чернобыля все РБМК прошли глубокую модернизацию для устранения этого недостатка.'],
            ['<strong>Защитная оболочка (контейнмент)</strong>', '<span style="color: var(--accent-nuclear-green);">Есть</span>. Прочная герметичная оболочка, сдерживающая выбросы в случае аварии.', '<span style="color: var(--accent-critical-red);">Нет</span> единой оболочки для всего контура. Есть локализующие системы для отдельных каналов.'],
            ['<strong>Перегрузка топлива</strong>', 'Требует остановки реактора.', 'Возможна <span style="color: var(--accent-hot-yellow);">«на ходу»</span> (без полной остановки), что повышает экономическую эффективность.'],
            ['<strong>Современный статус</strong>', 'Основа нового строительства в России и за рубежом (проекты ВВЭР-1200, ВВЭР-ТОИ).', 'Эксплуатируются последние действующие блоки (например, на Ленинградской АЭС). Новые не строятся.']
        ],
        historicalFacts: [
            {
                year: '1954: КОД «АТОМ МИРНЫЙ»',
                icon: 'fas fa-key',
                text: '26 июня 1954 года в 17:45 в Обнинске был подан пар на турбину от реактора АМ («Атом мирный»). Так начала работа <strong>первая в мире атомная электростанция</strong> мощностью 5 МВт. Сообщение ТАСС прозвучало только 30 июня, а место строительства было засекречено: уран в документах называли «оловом», реактор — «кристаллизатором».'
            },
            {
                year: '1970-е: ЭРА ГИГАНТОВ',
                icon: 'fas fa-user-astronaut',
                text: 'В это десятилетие началось строительство гигантов атомной энергетики. Например, канадская АЭС «Брюс» (первый блок — 1977 г.), которая сегодня с 8 реакторами PHWR и мощностью 6 478 МВт (нетто) является <strong>крупнейшей действующей АЭС мира</strong>. В СССР в это же время возводились первые энергоблоки с реакторами ВВЭР-1000 и РБМК-1000.'
            },
            {
                year: '2020-е: ВЕК ВОЗРОЖДЕНИЯ',
                icon: 'fas fa-satellite',
                text: 'После аварии на Фукусиме в 2011 году прогнозы были пессимистичными. Однако с 2021 года МАГАТЭ пять раз подряд повышало прогноз роста атомной энергетики. В 2025 году прошёл масштабный «Глобальный атомный форум» в Москве с участием более 40 тыс. гостей из 118 стран. Причина — растущий спрос на чистую и надёжную энергию, в том числе для дата-центров и новых технологий.'
            },
            {
                year: '2026+: ДОРОГА К 1000 ГВт',
                icon: 'fas fa-seedling',
                text: 'Согласно оптимистичному, но реализуемому сценарию МАГАТЭ, к 2050 году мировые мощности АЭС могут достичь <strong>992 ГВт</strong> (рост в 2,6 раза). Всемирная ядерная ассоциация также говорит об утроении мощностей. Ключевую роль должны сыграть <strong>малые модульные реакторы (ММР)</strong> и технологии замкнутого ядерного топливного цикла, которые разрабатываются в том числе в России (проект БРЕСТ-300).'
            }
        ],
        sources: [
            { name: 'PRIS (Power Reactor Information System) IAEA', text: 'база данных МАГАТЭ по всем ядерным реакторам мира. Данные на 1 января 2026 года.' },
            { name: 'МАГАТЭ (IAEA)', text: 'доклад «Оценки в области энергетики, электроэнергетики и ядерной энергетики на период до 2050 года» (45-е издание, сентябрь 2025).' },
            { name: 'НИЯУ МИФИ / Мемориальный сайт', text: 'исторические материалы о пуске и работе первой в мире Обнинской АЭС.' },
            { name: 'AtomInfo.Ru', text: 'независимый информационно-аналитический сайт, публикующий оперативные данные PRIS.' },
            { name: 'World Nuclear Association (WNA)', text: 'материалы и прогнозы, озвученные на Глобальном атомном форуме (WAW-2025).' }
        ]
    },
    ja: {
        langName: 'JA',
        brand: '世界の原子力発電所',
        pageTitle: '世界の原子力発電所 | 原子力エネルギーのデジタルパノラマ',
        metaDesc: '世界の原子力発電のデジタルパノラマ：稼働中の原子炉415基、設備容量398GW、2050年までのIAEA予測、VVERとRBMKの比較、歴史と業界ニュース。',
        mapBtn: 'インタラクティブマップ',
        sectionTitle: '原子力エネルギーのデジタルパノラマ（2026年）',
        tickerTitle: '原子力業界の最新ニュース',
        newsGridTitle: '原子力業界のニュース：2025–2026',
        worldStatsTitle: '世界の主要指標',
        progressTitle: '原子力発電開発の指標',
        prog1: '世界の原子力発電容量',
        prog2: '世界の発電量に占める割合',
        prog3: '建設中の原子炉',
        prog4: '原子力計画を有する国',
        chartsTitle: 'グラフ',
        chart1: '設備容量トップ5か国',
        chart2: '2050年までの容量予測',
        reactorTitle: '信頼性のアーキテクチャ：VVER vs RBMK',
        historyTitle: '年表：極秘用語「原子炉」から',
        sourcesTitle: '使用した権威ある情報源',
        yAxisPower: '容量（GW）',
        yAxisPowerShort: '設備容量（GW）',
        chartTopCountriesLabel: '容量（GW）',
        chartForecastConservative: '保守的シナリオ',
        chartForecastOptimistic: 'IAEA楽観的シナリオ',
        countries: { US: 'アメリカ', FR: 'フランス', CN: '中国', RU: 'ロシア', KR: '韓国' },
        news: [
            'IAEA：2025年の世界の原子力発電量は過去最高の2,703TWhに',
            '2025年12月30日、51年間運転したビリビノ原子力発電所が完全停止',
            '中国は39基の原子炉を建設中 — どの国よりも多い',
            'トルコ：アックユ原子力発電所、VVER-1200初号機の起動準備',
            '日本：柏崎刈羽原子力発電所6号機が福島事故後初めて再稼働',
            'インドネシアとロスアトム、浮体式原子力発電所（200MW）の世界初の輸出契約に署名',
            'IAEA：楽観的シナリオでは2050年までに原子力容量992GW',
            'バングラデシュ：ルプール原子力発電所1号機（VVER-1200）が系統連系準備',
            'ロシア：クルスク原子力発電所2の3号機（VVER-TOI）建設開始',
            'カナダ：初のSMR（BWRX-300）Darlington建設開始'
        ],
        newsGrid: [
            {
                icon: 'fas fa-chart-line',
                year: '2025年：発電量記録',
                text: '2025年の世界の原子力発電量は<strong>2,703TWh</strong>に達し、歴史的最高を記録しました。しかし増加分はすべて中国（+7.6%）によるもので、その他の地域では0.2%減少しました。世界の発電量に占める原子力の割合は<strong>8.8%</strong>でした（WNISR/IAEAデータ）。'
            },
            {
                icon: 'fas fa-flag',
                year: '2025年12月：ビリビノ原子力発電所の閉鎖',
                text: '2025年12月30日、チュクチ地方のビリビノ原子力発電所の最後のユニットが停止しました。永久凍土の中で<strong>51年間</strong>運転し、ロシアで初めて完全に産業運転から撤退した発電所となりました。地域の電力供給は浮体式原子力発電所「アカデミック・ロモノソフ」が担っています。'
            },
            {
                icon: 'fas fa-hard-hat',
                year: '2026年：世界の建設状況',
                text: '2026年初頭時点で、15か国で約<strong>80基の原子炉</strong>が建設中です。中国が39基で首位、インド（7）、ロシア（7）、韓国（4）、トルコ（4）、エジプト（4）が続きます。平均建設期間は5年を超えます（PRIS IAEAデータ）。'
            },
            {
                icon: 'fas fa-water',
                year: '2026年10月：浮体式原子力発電所の輸出',
                text: 'インドネシアとロスアトムは、浮体式原子力発電ユニットの輸出に関する世界初の契約に署名しました。合計出力<strong>200MW</strong>の<strong>FPU-100</strong>2基が北マルク州に供給されます。プロジェクトは政府資金なしのB2Bスキームで実施されます。'
            },
            {
                icon: 'fas fa-sync-alt',
                year: '2026年1月：日本の復帰',
                text: '東京電力は柏崎刈羽原子力発電所6号機を再稼働させました。これは2011年の福島事故後、同社として初の再稼働です。2026年10月、女川原子力発電所で水漏れ（0.2t/h）が発生し、2号機は修理のため一時停止しましたが、放射線量は正常範囲内です。'
            },
            {
                icon: 'fas fa-bullseye',
                year: '予測：2050年までに992GW',
                text: 'IAEAの楽観的シナリオによれば、世界の原子力設備容量は2050年までに<strong>992GW</strong>に達します（2.6倍の成長）。WNAは3倍の成長を許容しています。小型モジュール炉（SMR）と閉鎖型燃料サイクルが重要な役割を担います。'
            }
        ],
        worldStats: [
            {
                icon: 'fas fa-reactor',
                title: '稼働中の原子炉',
                value: '415',
                description: '2026年1月1日時点で、IAEAのPRISシステムにより<strong>OP（Operational）</strong>ステータスを持つユニット数。',
                source: '出典：PRIS IAEA'
            },
            {
                icon: 'fas fa-bolt',
                title: '総設備容量',
                value: '398 <span style="font-size: 30px; color: var(--text-secondary);">GW</span>',
                description: '世界の全稼働中（OP）原子炉の総設備容量（グロス）。一時停止中（SO）の23基は含みません。',
                source: '出典：PRIS IAEA、2026年1月'
            },
            {
                icon: 'fas fa-industry',
                title: '原子力発電所数',
                value: '172',
                description: 'OPステータスの原子炉を有する世界の原子力発電所数。SOステータスを含めると全発電所数は177になります。',
                source: ''
            },
            {
                icon: 'fas fa-hard-hat',
                title: '建設中',
                value: '63',
                description: '2026年1月13日時点で建設中（UC）のユニット数。中国が最多（29基）です。',
                source: '出典：AtomInfo.Ru / PRIS'
            },
            {
                icon: 'fas fa-globe-europe',
                title: '運営国数',
                value: '31',
                description: '原子力発電所を運転している国。約40か国が最初の原子力計画のさまざまな段階にあります。',
                source: ''
            },
            {
                icon: 'fas fa-chart-line',
                title: '世界の発電量に占める割合',
                value: '~9%',
                description: '2024年時点の世界の電力生産に占める原子力の概算割合。2024年、世界の原子力発電所は約<strong>2,667TWh</strong>を発電しました。',
                source: ''
            }
        ],
        reactorHeaders: [
            '特性',
            '<span class="vver-badge">VVER</span>',
            '<span class="rbmk-badge">RBMK</span>'
        ],
        reactorRows: [
            ['<strong>動作原理</strong>', '加圧水型原子炉。水が減速材と冷却材を兼ねる（世界のPWRに相当）。', 'チャンネル型原子炉。黒鉛が減速材、沸騰水が各チャンネルの冷却材。'],
            ['<strong>主要な安全係数</strong>', '<span style="color: var(--accent-nuclear-green);"><strong>負</strong></span>。冷却喪失と蒸気増加により連鎖反応は減衰する（自己制御）。', '一部の運転モードで<span style="color: var(--accent-critical-red);"><strong>初期は正</strong></span>。チェルノブイリ後、すべてのRBMKはこの欠陥を解消するため大幅な近代化を実施。'],
            ['<strong>格納容器</strong>', '<span style="color: var(--accent-nuclear-green);">あり</span>。事故時の放出を抑える堅牢な密閉容器。', '回路全体の<span style="color: var(--accent-critical-red);">単一の格納容器なし</span>。個別チャンネル用の局所化システムあり。'],
            ['<strong>燃料交換</strong>', '原子炉の停止が必要。', '<span style="color: var(--accent-hot-yellow);">「運転中」</span>の交換が可能（完全停止なし）で、経済効率が向上。'],
            ['<strong>現代の状況</strong>', 'ロシアおよび海外での新規建設の基盤（VVER-1200、VVER-TOIプロジェクト）。', '最後の稼働ユニット（例：レニングラード原子力発電所）が運転中。新規建設はなし。']
        ],
        historicalFacts: [
            {
                year: '1954年：「平和の原子」コード',
                icon: 'fas fa-key',
                text: '1954年6月26日17時45分、オブニンスクで原子炉AM（「平和の原子」）からタービンに蒸気が供給されました。こうして出力5MWの<strong>世界初の原子力発電所</strong>が運転を開始しました。タス通信の発表は6月30日になってからで、建設地は極秘でした。文書ではウランを「スズ」、原子炉を「結晶化装置」と呼んでいました。'
            },
            {
                year: '1970年代：巨人の時代',
                icon: 'fas fa-user-astronaut',
                text: 'この10年間に原子力発電の巨人の建設が始まりました。例えばカナダのブルース原子力発電所（1号機は1977年）は、現在8基のPHWRと6,478MW（ネット）の容量を持ち、<strong>世界最大の稼働中の原子力発電所</strong>です。ソ連では同時期にVVER-1000とRBMK-1000の初号機が建設されていました。'
            },
            {
                year: '2020年代：復活の世紀',
                icon: 'fas fa-satellite',
                text: '2011年の福島事故後、予測は悲観的でした。しかし2021年以降、IAEAは5回連続で原子力の成長予測を引き上げました。2025年にはモスクワで118か国から4万人以上が参加した大規模な「グローバル原子力フォーラム」が開催されました。理由は、データセンターや新技術を含むクリーンで信頼性の高いエネルギーへの需要の高まりです。'
            },
            {
                year: '2026年以降：1000GWへの道',
                icon: 'fas fa-seedling',
                text: 'IAEAの楽観的かつ実現可能なシナリオによれば、2050年までに世界の原子力容量は<strong>992GW</strong>（2.6倍）に達する可能性があります。世界原子力協会も3倍の容量を語っています。<strong>小型モジュール炉（SMR）</strong>と閉鎖型核燃料サイクル技術（ロシアのBREST-300プロジェクトを含む）が重要な役割を果たすはずです。'
            }
        ],
        sources: [
            { name: 'PRIS (Power Reactor Information System) IAEA', text: '世界中のすべての原子炉に関するIAEAデータベース。2026年1月1日時点のデータ。' },
            { name: 'IAEA（国際原子力機関）', text: '「2050年までのエネルギー、電力、原子力エネルギーに関する評価」報告書（第45版、2025年9月）。' },
            { name: 'MEPhI / 記念サイト', text: '世界初のオブニンスク原子力発電所の起動と運転に関する歴史資料。' },
            { name: 'AtomInfo.Ru', text: 'PRISの最新データを公開する独立した情報分析サイト。' },
            { name: 'World Nuclear Association (WNA)', text: 'グローバル原子力フォーラム（WAW-2025）で発表された資料と予測。' }
        ]
    }
};

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
    if (charts.topCountries) updateChartColors();
}

// ============ ЯЗЫК ============
function detectBrowserLang() {
    // Проверяем navigator.languages (массив) — надёжнее для японцев
    const langs = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || 'ru'];
    for (const l of langs) {
        if (l && l.toLowerCase().startsWith('ja')) return 'ja';
    }
    return 'ru';
}

function setLanguage(lang) {
    if (!I18N[lang]) lang = 'ru';
    currentLang = lang;
    const t = I18N[lang];

    // Документ
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Кнопка языка — показывает ЦЕЛЕВОЙ язык (на какой переключит)
    document.getElementById('langLabel').textContent = lang === 'ru' ? 'JA' : 'RU';

    // Динамический контент — перерисовываем
    renderNewsTicker();
    renderNewsGrid();
    renderWorldStats();
    renderReactorComparison();
    renderHistoricalFacts();
    renderSources();
    updateChartsLocale();

    localStorage.setItem('npp-lang', lang);
}

function initLanguage() {
    const saved = localStorage.getItem('npp-lang');
    const lang = saved || detectBrowserLang();
    setLanguage(lang);

    document.getElementById('langToggle').addEventListener('click', () => {
        const next = currentLang === 'ru' ? 'ja' : 'ru';
        setLanguage(next);
    });
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
        if (pattern[row][col] === 1) pixel.classList.add('active');
        else pixel.classList.remove('active');
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
function renderNewsTicker() {
    const t = I18N[currentLang];
    const tickerContainer = document.getElementById('newsTicker');
    if (!tickerContainer) return;
    const tickerContent = t.news.map(item => `<div class="ticker-item">${item}</div>`).join('');
    tickerContainer.innerHTML = tickerContent + tickerContent;
}

function initNewsTicker() {
    renderNewsTicker();
    const tickerContainer = document.getElementById('newsTicker');
    let position = 0;
    setInterval(() => {
        position -= 1;
        if (position <= -tickerContainer.scrollWidth / 2) position = 0;
        tickerContainer.style.transform = `translateX(${position}px)`;
    }, 50);
}

// ============ НОВОСТИ (КАРТОЧКИ) ============
function renderNewsGrid() {
    const t = I18N[currentLang];
    const html = t.newsGrid.map(item => `
        <div class="fact-card">
            <div class="fact-year"><i class="${item.icon}"></i> ${item.year}</div>
            <p class="fact-text">${item.text}</p>
        </div>
    `).join('');
    const el = document.getElementById('newsGrid');
    if (el) el.innerHTML = html;
}

// ============ КЛЮЧЕВЫЕ ЦИФРЫ МИРА ============
function renderWorldStats() {
    const t = I18N[currentLang];
    const html = t.worldStats.map(stat => `
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
    document.getElementById('worldStats').innerHTML = html;
}

// ============ СРАВНЕНИЕ РЕАКТОРОВ ============
function renderReactorComparison() {
    const t = I18N[currentLang];
    const html = `
        <thead>
            <tr>${t.reactorHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
            ${t.reactorRows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
    `;
    document.getElementById('reactorComparison').innerHTML = html;
}

// ============ ИСТОРИЧЕСКИЕ ФАКТЫ ============
function renderHistoricalFacts() {
    const t = I18N[currentLang];
    const html = t.historicalFacts.map(fact => `
        <div class="fact-card">
            <div class="fact-year"><i class="${fact.icon}"></i> ${fact.year}</div>
            <p class="fact-text">${fact.text}</p>
        </div>
    `).join('');
    document.getElementById('historicalFacts').innerHTML = html;
}

// ============ ИСТОЧНИКИ ============
function renderSources() {
    const t = I18N[currentLang];
    const html = t.sources.map(s => `
        <div class="source-item">
            <i class="fas fa-check-circle"></i>
            <span><strong>${s.name}</strong> — ${s.text}</span>
        </div>
    `).join('');
    document.getElementById('sourcesList').innerHTML = html;
}

// ============ ГРАФИКИ ============
function initCharts() {
    const t = I18N[currentLang];

    const topCtx = document.getElementById('topCountriesChart').getContext('2d');
    charts.topCountries = new Chart(topCtx, {
        type: 'bar',
        data: {
            labels: [t.countries.US, t.countries.FR, t.countries.CN, t.countries.RU, t.countries.KR],
            datasets: [{
                label: t.chartTopCountriesLabel,
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
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} GW`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: {
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        callback: v => v + ' GW'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' }
                    }
                }
            }
        }
    });

    const forecastCtx = document.getElementById('forecastChart').getContext('2d');
    charts.forecast = new Chart(forecastCtx, {
        type: 'line',
        data: {
            labels: ['2024', '2030', '2040', '2050'],
            datasets: [
                {
                    label: t.chartForecastConservative,
                    data: [377, 430, 500, 561],
                    borderColor: CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 0.6)' : 'rgba(0, 102, 204, 0.6)',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 1)' : 'rgba(0, 102, 204, 1)',
                    tension: 0.3
                },
                {
                    label: t.chartForecastOptimistic,
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
                        font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} GW`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: {
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        callback: v => v + ' GW'
                    },
                    title: {
                        display: true,
                        text: t.yAxisPowerShort,
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a'
                    }
                },
                x: {
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a',
                        font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' }
                    }
                }
            }
        }
    });
}

function updateChartsLocale() {
    const t = I18N[currentLang];
    if (charts.topCountries) {
        charts.topCountries.data.labels = [t.countries.US, t.countries.FR, t.countries.CN, t.countries.RU, t.countries.KR];
        charts.topCountries.data.datasets[0].label = t.chartTopCountriesLabel;
        charts.topCountries.options.scales.x.ticks.font.family = currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2';
        charts.topCountries.update();
    }
    if (charts.forecast) {
        charts.forecast.data.datasets[0].label = t.chartForecastConservative;
        charts.forecast.data.datasets[1].label = t.chartForecastOptimistic;
        charts.forecast.options.scales.y.title.text = t.yAxisPowerShort;
        charts.forecast.options.scales.x.ticks.font.family = currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2';
        charts.forecast.options.plugins.legend.labels.font.family = currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2';
        charts.forecast.update();
    }
}

function updateChartColors() {
    if (charts.topCountries) {
        charts.topCountries.options.scales.y.grid.color = CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        charts.topCountries.options.scales.y.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.topCountries.options.scales.x.ticks.color = CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a';
        charts.topCountries.update();
    }
    if (charts.forecast) {
        const bc1 = CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 0.6)' : 'rgba(0, 102, 204, 0.6)';
        const pc1 = CONFIG.theme === 'dark' ? 'rgba(0, 238, 255, 1)' : 'rgba(0, 102, 204, 1)';
        const bc2 = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.8)' : 'rgba(0, 153, 51, 0.8)';
        const pc2 = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 1)' : 'rgba(0, 153, 51, 1)';
        const bg = CONFIG.theme === 'dark' ? 'rgba(77, 255, 136, 0.1)' : 'rgba(0, 153, 51, 0.1)';
        charts.forecast.data.datasets[0].borderColor = bc1;
        charts.forecast.data.datasets[0].pointBackgroundColor = pc1;
        charts.forecast.data.datasets[1].borderColor = bc2;
        charts.forecast.data.datasets[1].backgroundColor = bg;
        charts.forecast.data.datasets[1].pointBackgroundColor = pc2;
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
        if (window.pageYOffset > 300) scrollTopBtn.classList.add('visible');
        else scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ АНИМАЦИЯ ============
function initAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

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
    initLanguage();   // ставит язык + рендерит весь динамический контент
    initNewsTicker();
    initCharts();     // графики создаём ПОСЛЕ initLanguage (чтобы язык был известен)
    initScrollTop();
    initAnimations();

    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 500);

    console.log('🌐 Digital NPP Panorama loaded. Lang:', currentLang);
});
