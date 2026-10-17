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

// ============ I18N — ЖИВОЙ ПЕРЕВОД ДЛЯ ВСЕХ ============
const I18N = {
    ru: {
        langName: 'RU',
        brand: 'МИР АЭС',
        pageTitle: 'Мир АЭС | Цифровая панорама атомной энергетики',
        metaDesc: 'Всё о мировой атомной энергетике в цифрах: сколько реакторов работает, сколько строится, прогнозы МАГАТЭ до 2050 года, чем ВВЭР отличается от РБМК и как отрасль прошла путь от первой АЭС до наших дней.',
        mapBtn: 'КАРТА',
        sectionTitle: 'МИР АТОМНОЙ ЭНЕРГЕТИКИ В ЦИФРАХ (2026)',
        tickerTitle: 'ЧТО ПРОИСХОДИТ В ОТРАСЛИ ПРЯМО СЕЙЧАС',
        newsGridTitle: 'ГЛАВНЫЕ СОБЫТИЯ 2025–2026 ГОДОВ',
        worldStatsTitle: 'ГЛАВНЫЕ ЦИФРЫ',
        progressTitle: 'ГДЕ МЫ СЕЙЧАС И КУДА ДВИЖЕМСЯ',
        prog1: 'Общая мощность всех АЭС мира',
        prog2: 'Доля атома в мировой выработке',
        prog3: 'Энергоблоки, которые строятся',
        prog4: 'Страны с ядерными программами',
        chartsTitle: 'СРАВНЕНИЕ И ПРОГНОЗЫ',
        chart1: 'ПЯТЁРКА ЛИДЕРОВ ПО МОЩНОСТИ АЭС',
        chart2: 'СКОЛЬКО МОЩНОСТЕЙ БУДЕТ К 2050 ГОДУ',
        reactorTitle: 'ДВА ТИПА РЕАКТОРОВ: ВВЭР И РБМК',
        historyTitle: 'КАК ВСЁ НАЧИНАЛОСЬ И ЧЕМ ЗАКОНЧИТСЯ',
        sourcesTitle: 'ОТКУДА ВЗЯТЫ ДАННЫЕ',
        chartTopCountriesLabel: 'Мощность (ГВт)',
        chartForecastConservative: 'Осторожный прогноз',
        chartForecastOptimistic: 'Оптимистичный прогноз МАГАТЭ',
        countries: { US: 'США', FR: 'Франция', CN: 'Китай', RU: 'Россия', KR: 'Южная Корея' },
        news: [
            'В 2025 году АЭС мира выработали рекордные 2 703 ТВт·ч — больше, чем когда-либо',
            'Билибинская АЭС на Чукотке остановлена 30 декабря 2025 года — она проработала 51 год',
            'Китай строит 39 энергоблоков — больше, чем любая другая страна мира',
            'В Турции вот-вот запустят первый блок АЭС «Аккую»',
            'В Японии впервые после Фукусимы перезапустили реактор на АЭС «Касивадзаки-Карива»',
            'Индонезия и Росатом договорились о поставке плавучих АЭС — это первый такой контракт в мире',
            'МАГАТЭ: к 2050 году мощности мировой атомной энергетики могут вырасти до 992 ГВт',
            'В Бангладеш готовят к подключению первый блок АЭС «Руппур»',
            'В России начали строить третий блок Курской АЭС-2',
            'В Канаде стартовало строительство первого малого модульного реактора Darlington'
        ],
        newsGrid: [
            {
                icon: 'fas fa-chart-line',
                year: '2025: РЕКОРД ВЫРАБОТКИ',
                text: 'Атомные станции мира выработали за год <strong>2 703 ТВт·ч</strong> — это исторический максимум. Правда, почти весь прирост дал Китай (+7,6%), а в остальных странах выработка даже немного снизилась. В общей сложности атом дал <strong>8,8%</strong> мировой электроэнергии — данные WNISR и МАГАТЭ.'
            },
            {
                icon: 'fas fa-flag',
                year: 'ДЕКАБРЬ 2025: БИЛИБИНСКАЯ АЭС ЗАКРЫТА',
                text: '30 декабря 2025 года остановили последний блок Билибинской АЭС на Чукотке. Станция проработала <strong>51 год</strong> в условиях вечной мерзлоты и стала первой в России, полностью выведенной из работы. Теперь регион снабжает электричеством плавучая станция «Академик Ломоносов».'
            },
            {
                icon: 'fas fa-hard-hat',
                year: '2026: ЧТО СТРОЯТ В МИРЕ',
                text: 'Сейчас в 15 странах строится около <strong>80 энергоблоков</strong>. Больше всех — Китай (39 блоков), дальше идут Индия и Россия (по 7), Южная Корея, Турция и Египет (по 4). В среднем стройка занимает больше 5 лет — данные PRIS МАГАТЭ.'
            },
            {
                icon: 'fas fa-water',
                year: 'ОКТЯБРЬ 2026: ПЛАВУЧИЕ АЭС ИДУТ НА ЭКСПОРТ',
                text: 'Индонезия и Росатом подписали первый в мире контракт на поставку плавучих атомных энергоблоков. Две установки <strong>FPU-100</strong> общей мощностью <strong>200 МВт</strong> отправятся в провинцию Северная Малуку. Сделка коммерческая — без государственных денег.'
            },
            {
                icon: 'fas fa-sync-alt',
                year: 'ЯНВАРЬ 2026: ЯПОНИЯ ВОЗВРАЩАЕТСЯ',
                text: 'Tokyo Electric Power снова запустила шестой реактор АЭС «Касивадзаки-Карива» — впервые после аварии на Фукусиме в 2011 году. А в октябре 2026-го на АЭС «Онагава» случилась небольшая утечка воды (0,2 тонны в час): второй реактор временно остановили на ремонт. Радиационный фон остался в норме.'
            },
            {
                icon: 'fas fa-bullseye',
                year: 'ПРОГНОЗ: 992 ГВт К 2050 ГОДУ',
                text: 'По оптимистичному сценарию МАГАТЭ, к 2050 году мощность всех АЭС мира вырастет до <strong>992 ГВт</strong> — почти в 2,6 раза. Всемирная ядерная ассоциация допускает и утроение. Главную роль сыграют малые модульные реакторы и технологии замкнутого топливного цикла.'
            }
        ],
        worldStats: [
            {
                icon: 'fas fa-reactor',
                title: 'СКОЛЬКО РЕАКТОРОВ РАБОТАЕТ',
                value: '415',
                description: 'Столько энергоблоков в мире имеют статус «действующий» (OP) по базе PRIS МАГАТЭ на 1 января 2026 года.',
                source: 'Источник: PRIS IAEA'
            },
            {
                icon: 'fas fa-bolt',
                title: 'ОБЩАЯ МОЩНОСТЬ',
                value: '398 <span style="font-size: 30px; color: var(--text-secondary);">ГВт</span>',
                description: 'Суммарная мощность всех работающих реакторов мира. Сюда не входят 23 блока, которые временно приостановлены (статус SO).',
                source: 'Источник: PRIS IAEA, январь 2026'
            },
            {
                icon: 'fas fa-industry',
                title: 'СКОЛЬКО ВСЕГО АЭС',
                value: '172',
                description: 'Столько атомных станций в мире имеют хотя бы один работающий реактор. Если считать и станции с приостановленными блоками, получится 177.',
                source: ''
            },
            {
                icon: 'fas fa-hard-hat',
                title: 'СТРОИТСЯ ПРЯМО СЕЙЧАС',
                value: '63',
                description: 'Столько энергоблоков находится в стадии строительства по данным на 13 января 2026 года. Больше всего строят в Китае — 29 блоков.',
                source: 'Источник: AtomInfo.Ru / PRIS'
            },
            {
                icon: 'fas fa-globe-europe',
                title: 'СТРАН-ОПЕРАТОРОВ',
                value: '31',
                description: 'Столько стран сегодня эксплуатируют атомные энергоблоки. Ещё около 40 стран находятся на разных этапах запуска своих первых ядерных программ.',
                source: ''
            },
            {
                icon: 'fas fa-chart-line',
                title: 'ДОЛЯ В МИРОВОЙ ГЕНЕРАЦИИ',
                value: '~9%',
                description: 'Примерно столько мировой электроэнергии даёт атом. За 2024 год все АЭС мира вместе произвели около <strong>2 667 ТВт·ч</strong>.',
                source: ''
            }
        ],
        reactorHeaders: [
            'ХАРАКТЕРИСТИКА',
            '<span class="vver-badge">ВВЭР</span>',
            '<span class="rbmk-badge">РБМК</span>'
        ],
        reactorRows: [
            ['<strong>Как устроен</strong>', 'Корпусной реактор: вода под давлением работает и как замедлитель, и как теплоноситель. Такой же принцип у большинства реакторов мира (PWR).', 'Канальный реактор: графит замедляет нейтроны, а вода кипит прямо в отдельных каналах.'],
            ['<strong>Главный показатель безопасности</strong>', '<span style="color: var(--accent-nuclear-green);"><strong>Отрицательный</strong></span>. Если охлаждение пропадёт и пара станет больше, реакция сама затухнет.', '<span style="color: var(--accent-critical-red);"><strong>Изначально положительный</strong></span> на некоторых режимах. После Чернобыля все РБМК серьёзно модернизировали, чтобы убрать этот недостаток.'],
            ['<strong>Защитная оболочка</strong>', '<span style="color: var(--accent-nuclear-green);">Есть</span>. Прочный герметичный купол, который не даёт радиоактивным веществам вырваться при аварии.', '<span style="color: var(--accent-critical-red);">Нет</span> единой оболочки на весь контур. Есть только локальные системы для отдельных каналов.'],
            ['<strong>Перегрузка топлива</strong>', 'Нужно останавливать реактор.', 'Можно делать <span style="color: var(--accent-hot-yellow);">прямо на ходу</span>, не останавливая реактор — это выгоднее экономически.'],
            ['<strong>Что сегодня</strong>', 'На этом типе строят новые блоки в России и за рубежом — проекты ВВЭР-1200 и ВВЭР-ТОИ.', 'Работают последние блоки (например, на Ленинградской АЭС). Новые уже не строят.']
        ],
        historicalFacts: [
            {
                year: '1954: ПЕРВАЯ В МИРЕ АЭС',
                icon: 'fas fa-key',
                text: '26 июня 1954 года в 17:45 в Обнинске на турбину впервые подали пар от реактора АМ — «Атом мирный». Так заработала <strong>первая в мире атомная электростанция</strong> мощностью 5 МВт. Сообщение ТАСС вышло только 30 июня, а место строительства держали в секрете: в документах уран называли «оловом», а реактор — «кристаллизатором».'
            },
            {
                year: '1970-е: ЭПОХА ГИГАНТОВ',
                icon: 'fas fa-user-astronaut',
                text: 'Именно в эти годы начали строить атомные гиганты. Например, канадскую АЭС «Брюс» (первый блок — 1977 год). Сегодня у неё 8 реакторов PHWR и мощность 6 478 МВт — это <strong>крупнейшая действующая АЭС в мире</strong>. В СССР тогда же возводили первые блоки с ВВЭР-1000 и РБМК-1000.'
            },
            {
                year: '2020-е: ВТОРОЕ ДЫХАНИЕ',
                icon: 'fas fa-satellite',
                text: 'После Фукусимы в 2011 году казалось, что атом ждёт упадок. Но с 2021 года МАГАТЭ пять раз подряд повышало прогноз роста. В 2025 году в Москве прошёл «Глобальный атомный форум» — больше 40 тысяч гостей из 118 стран. Причина простая: миру нужна чистая и надёжная энергия — в том числе для дата-центров и новых технологий.'
            },
            {
                year: '2026+: КУРС НА 1000 ГВт',
                icon: 'fas fa-seedling',
                text: 'По оптимистичному сценарию МАГАТЭ к 2050 году мощность АЭС в мире достигнет <strong>992 ГВт</strong> — почти втрое больше, чем сейчас. Всемирная ядерная ассоциация тоже говорит об утроении. Главные надежды — на <strong>малые модульные реакторы</strong> и замкнутый топливный цикл, который разрабатывают в том числе в России (проект БРЕСТ-300).'
            }
        ],
        sources: [
            { name: 'PRIS (Power Reactor Information System) IAEA', text: 'база МАГАТЭ по всем реакторам мира. Данные на 1 января 2026 года.' },
            { name: 'МАГАТЭ (IAEA)', text: 'доклад «Оценки в области энергетики, электроэнергетики и ядерной энергетики до 2050 года» (45-е издание, сентябрь 2025).' },
            { name: 'НИЯУ МИФИ / Мемориальный сайт', text: 'исторические материалы о первой в мире Обнинской АЭС.' },
            { name: 'AtomInfo.Ru', text: 'независимый аналитический сайт, публикующий свежие данные PRIS.' },
            { name: 'World Nuclear Association (WNA)', text: 'материалы и прогнозы с Глобального атомного форума (WAW-2025).' }
        ]
    },
    ja: {
        langName: 'JA',
        brand: '世界の原子力発電所',
        pageTitle: '世界の原子力発電所 | 原子力エネルギーのデジタルパノラマ',
        metaDesc: '世界の原子力発電を数字でわかりやすく。稼働中の原子炉の数、建設中の数、2050年までのIAEA予測、VVERとRBMKの違い、そして最初の原発から現在までの歴史をまとめました。',
        mapBtn: 'マップ',
        sectionTitle: '数字で見る世界の原子力（2026年）',
        tickerTitle: '業界で今起きていること',
        newsGridTitle: '2025〜2026年の主な出来事',
        worldStatsTitle: '主な数字',
        progressTitle: '現状とこれからの道のり',
        prog1: '世界の原子力発電の総容量',
        prog2: '世界の発電量に占める原子力の割合',
        prog3: '建設中の原子炉',
        prog4: '原子力計画を持つ国',
        chartsTitle: '比較と予測',
        chart1: '設備容量トップ5か国',
        chart2: '2050年までの容量予測',
        reactorTitle: '2つの原子炉タイプ：VVERとRBMK',
        historyTitle: 'はじまりから未来まで',
        sourcesTitle: 'データの出典',
        chartTopCountriesLabel: '設備容量（GW）',
        chartForecastConservative: '慎重な予測',
        chartForecastOptimistic: 'IAEAの楽観的予測',
        countries: { US: 'アメリカ', FR: 'フランス', CN: '中国', RU: 'ロシア', KR: '韓国' },
        news: [
            '2025年、世界の原発の発電量は過去最高の2,703TWhに',
            'チュクチのビリビノ原発が2025年12月30日に運転終了——51年間の運転でした',
            '中国は39基の原子炉を建設中——どの国よりも多い',
            'トルコのアックユ原発で1号機の運転開始が間近に',
            '日本では福島事故後初めて柏崎刈羽原発の原子炉が再稼働',
            'インドネシアとロスアトムが浮体式原発の契約に合意——世界初の案件です',
            'IAEA：2050年までに世界の原子力容量は992GWまで拡大する可能性',
            'バングラデシュのルプール原発1号機が送電開始へ',
            'ロシアでクルスク原発2の3号機が着工',
            'カナダで初の小型モジュール炉ダーリントンが着工'
        ],
        newsGrid: [
            {
                icon: 'fas fa-chart-line',
                year: '2025年：発電量が過去最高に',
                text: '2025年、世界の原発は年間<strong>2,703TWh</strong>を発電し、過去最高を記録しました。ただし増えた分のほとんどは中国（+7.6%）によるもので、他の国ではむしろ少し減っています。世界の発電量に占める原子力の割合は<strong>8.8%</strong>でした（WNISR・IAEA調べ）。'
            },
            {
                icon: 'fas fa-flag',
                year: '2025年12月：ビリビノ原発が運転終了',
                text: '2025年12月30日、チュクチのビリビノ原発の最後のユニットが停止しました。永久凍土の中で<strong>51年間</strong>働き続け、ロシアで初めて完全に運転を終えた原発になりました。地域の電力は今、浮体式原発「アカデミック・ロモノソフ」が支えています。'
            },
            {
                icon: 'fas fa-hard-hat',
                year: '2026年：世界で何が建っているか',
                text: '今、15か国で約<strong>80基の原子炉</strong>が建設中です。最も多いのは中国（39基）、次いでインドとロシア（各7基）、韓国・トルコ・エジプト（各4基）が続きます。建設には平均5年以上かかります（IAEAのPRISより）。'
            },
            {
                icon: 'fas fa-water',
                year: '2026年10月：浮体式原発の輸出へ',
                text: 'インドネシアとロスアトムが、浮体式原子力ユニットの輸出について世界初の契約を結びました。合計出力<strong>200MW</strong>の<strong>FPU-100</strong>2基が北マルク州に送られます。政府の資金は使わない、民間ベースの取引です。'
            },
            {
                icon: 'fas fa-sync-alt',
                year: '2026年1月：日本が戻ってきた',
                text: '東京電力が柏崎刈羽原発6号機を再稼働させました。2011年の福島事故後、同社として初めてのことです。一方、2026年10月には女川原発で少量の水漏れ（毎時0.2トン）があり、2号機は修理のため一時停止しました。放射線量は正常でした。'
            },
            {
                icon: 'fas fa-bullseye',
                year: '予測：2050年までに992GW',
                text: 'IAEAの楽観的シナリオでは、2050年までに世界の原子力設備容量は<strong>992GW</strong>に達し、今の約2.6倍になります。世界原子力協会は3倍になる可能性も指摘しています。カギを握るのは小型モジュール炉と、閉じた燃料サイクルです。'
            }
        ],
        worldStats: [
            {
                icon: 'fas fa-reactor',
                title: '稼働中の原子炉の数',
                value: '415',
                description: '2026年1月1日時点で、IAEAのPRISで「稼働中（OP）」とされている原子炉の数です。',
                source: '出典：PRIS IAEA'
            },
            {
                icon: 'fas fa-bolt',
                title: '合計設備容量',
                value: '398 <span style="font-size: 30px; color: var(--text-secondary);">GW</span>',
                description: '世界で動いているすべての原子炉を合わせた設備容量です。一時停止中（SO）の23基は含みません。',
                source: '出典：PRIS IAEA、2026年1月'
            },
            {
                icon: 'fas fa-industry',
                title: '原発の数',
                value: '172',
                description: '稼働中の原子炉を1基以上持つ原子力発電所の数です。一時停止中のものを含めると177か所になります。',
                source: ''
            },
            {
                icon: 'fas fa-hard-hat',
                title: '今、建設中',
                value: '63',
                description: '2026年1月13日時点で建設中のユニット数です。中国が最も多く29基を建設しています。',
                source: '出典：AtomInfo.Ru / PRIS'
            },
            {
                icon: 'fas fa-globe-europe',
                title: '原発を運転している国',
                value: '31',
                description: '現在、原子力発電所を動かしている国の数です。さらに約40か国が、初の原子力計画をさまざまな段階で進めています。',
                source: ''
            },
            {
                icon: 'fas fa-chart-line',
                title: '世界の発電量に占める割合',
                value: '~9%',
                description: '世界の電気のうち、およそこれだけを原子力がまかなっています。2024年には世界の原発が合計約<strong>2,667TWh</strong>を発電しました。',
                source: ''
            }
        ],
        reactorHeaders: [
            '特徴',
            '<span class="vver-badge">VVER</span>',
            '<span class="rbmk-badge">RBMK</span>'
        ],
        reactorRows: [
            ['<strong>しくみ</strong>', '加圧水型原子炉。水が減速材と冷却材の両方の役割をします。世界の多くの原発（PWR）と同じ方式です。', 'チャンネル型原子炉。黒鉛が中性子を減速し、水は各チャンネルの中で沸騰します。'],
            ['<strong>安全のカギとなる性質</strong>', '<span style="color: var(--accent-nuclear-green);"><strong>負</strong></span>。冷却が止まって蒸気が増えると、反応は自然に収まります。', '一部の運転モードで<span style="color: var(--accent-critical-red);"><strong>もともと正</strong></span>。チェルノブイリ事故後、すべてのRBMKはこの弱点をなくすため大規模な改良を受けました。'],
            ['<strong>格納容器</strong>', '<span style="color: var(--accent-nuclear-green);">あり</span>。事故のとき放射性物質を外に出さない、丈夫で密閉されたドームがあります。', '回路全体を覆う<span style="color: var(--accent-critical-red);">単一の格納容器はなし</span>。チャンネルごとの局部システムだけがあります。'],
            ['<strong>燃料交換</strong>', '原子炉を止める必要があります。', '<span style="color: var(--accent-hot-yellow);">運転したまま</span>交換できます。そのぶん経済的に有利です。'],
            ['<strong>現在の状況</strong>', 'ロシア国内外の新規建設はこのタイプ（VVER-1200、VVER-TOI）です。', '最後の数基（例：レニングラード原発）が稼働中です。新規の建設はありません。']
        ],
        historicalFacts: [
            {
                year: '1954年：世界初の原発',
                icon: 'fas fa-key',
                text: '1954年6月26日17時45分、オブニンスクで原子炉AM（「平和の原子」）からタービンに蒸気が送られました。こうして出力5MWの<strong>世界初の原子力発電所</strong>が動き始めました。タス通信の発表は6月30日になってからで、建設地は極秘でした。書類の上ではウランを「スズ」、原子炉を「結晶化装置」と呼んでいました。'
            },
            {
                year: '1970年代：巨大原発の時代',
                icon: 'fas fa-user-astronaut',
                text: 'この10年で巨大な原発が次々と建てられました。たとえばカナダのブルース原発（1号機は1977年）。今では8基のPHWRと6,478MWの容量を持ち、<strong>世界最大の稼働中の原発</strong>です。ソ連でも同時期にVVER-1000とRBMK-1000の最初のユニットが建設されました。'
            },
            {
                year: '2020年代：再び動き出す',
                icon: 'fas fa-satellite',
                text: '2011年の福島事故のあと、原子力は衰退すると思われていました。しかし2021年以降、IAEAは5回続けて成長予測を引き上げています。2025年にはモスクワで「グローバル原子力フォーラム」が開かれ、118か国から4万人以上が参加しました。理由はシンプルです。世界がクリーンで安定した電力を必要としているからです——データセンターや新しい技術のためにも。'
            },
            {
                year: '2026年以降：1000GWへ',
                icon: 'fas fa-seedling',
                text: 'IAEAの楽観的シナリオでは、2050年までに世界の原子力容量は<strong>992GW</strong>に達し、今のおよそ3倍になります。世界原子力協会も同じような見方をしています。期待が集まるのは<strong>小型モジュール炉</strong>と、閉じた核燃料サイクル。ロシアのBREST-300計画などもそのひとつです。'
            }
        ],
        sources: [
            { name: 'PRIS（Power Reactor Information System）IAEA', text: '世界のすべての原子炉をまとめたIAEAのデータベース。2026年1月1日時点のデータです。' },
            { name: 'IAEA（国際原子力機関）', text: '「2050年までのエネルギー・電力・原子力エネルギーに関する評価」報告書（第45版、2025年9月）。' },
            { name: 'MEPhI / 記念サイト', text: '世界初のオブニンスク原発の起動と運転についての歴史資料。' },
            { name: 'AtomInfo.Ru', text: 'PRISの最新データを公開している独立系の情報分析サイト。' },
            { name: 'World Nuclear Association（WNA）', text: 'グローバル原子力フォーラム（WAW-2025）で発表された資料と予測。' }
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
    const langs = (navigator.languages && navigator.languages.length)
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

    document.documentElement.lang = lang;
    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Кнопка: флаг + название целевого языка
    const flagEl = document.getElementById('langFlag');
    const labelEl = document.getElementById('langLabel');
    if (flagEl && labelEl) {
        if (lang === 'ru') {
            // Сейчас RU → предлагаем JA
            flagEl.textContent = '🇯🇵';
            labelEl.textContent = '日本語';
        } else {
            // Сейчас JA → предлагаем RU
            flagEl.textContent = '🇷🇺';
            labelEl.textContent = 'Русский';
        }
    }

    // Перерисовка динамики
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

// ============ ЖЁЛТОЕ УВЕДОМЛЕНИЕ ============
function initUpdateNotice() {
    const notice = document.getElementById('updateNotice');
    if (!notice) return;

    // Если пользователь уже закрыл — не показываем
    if (localStorage.getItem('npp-notice-closed') === '1') {
        notice.classList.add('hidden');
        return;
    }

    // Плавное появление через 600 мс после загрузки
    setTimeout(() => notice.classList.add('visible'), 600);

    document.getElementById('updateNoticeClose').addEventListener('click', () => {
        notice.classList.remove('visible');
        setTimeout(() => notice.classList.add('hidden'), 400);
        localStorage.setItem('npp-notice-closed', '1');
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
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} GW` } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: { color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a', callback: v => v + ' GW' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a', font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' } }
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
                legend: { labels: { color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a', font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' } } },
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} GW` } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                    ticks: { color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a', callback: v => v + ' GW' }
                },
                x: {
                    grid: { color: CONFIG.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: CONFIG.theme === 'dark' ? '#b0b6d0' : '#4a4a4a', font: { family: currentLang === 'ja' ? 'Noto Sans JP' : 'Exo 2' } }
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
    initLanguage();      // ставит язык + рендерит весь динамический контент
    initUpdateNotice();  // жёлтое уведомление
    initNewsTicker();    // тикер запускаем ПОСЛЕ рендера языка
    initCharts();        // графики создаём после того, как язык определён
    initScrollTop();
    initAnimations();

    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 500);

    console.log('🌐 Digital NPP Panorama loaded. Lang:', currentLang);
});
