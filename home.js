const featuredProducts = [
    {
        id: "minecraft",
        name: "Minecraft",
        image: "store/img game/minecraft.png",
        libraryImage: "store/img game/minecraft.png",
        category: "game",
        description: {
            en: "Build anything you can imagine, explore a world that never ends, and make every adventure your own.",
            ar: "ابنِ ما تتخيله، واستكشف عالماً لا ينتهي، واجعل كل مغامرة تعبر عنك."
        }
    },
    {
        id: "valorant",
        name: "Valorant",
        image: "store/img game/valorant.png",
        libraryImage: "store/img game/valorant.png",
        category: "game",
        description: {
            en: "Team up, master unique agents, and outplay the competition in this tactical 5v5 shooter.",
            ar: "كوّن فريقك، وأتقن مهارات العملاء، وتفوّق على منافسيك في لعبة التصويب التكتيكية 5 ضد 5."
        }
    },
    {
        id: "geometry-dash",
        name: "Geometry Dash",
        image: "store/img game/geometry dash.jpg",
        libraryImage: "store/img game/geometry dash.jpg",
        category: "game",
        description: {
            en: "Jump, fly, and dash through rhythm-packed levels where every move follows the beat.",
            ar: "اقفز وحلّق وانطلق عبر مراحل مليئة بالإيقاع، حيث تتحرك كل خطوة على نغمة الموسيقى."
        }
    },
    {
        id: "mechcha-chameleon",
        name: "MECCHA CHAMELEON",
        image: "store/img game/MECCHA CHAMELEON.jpg",
        libraryImage: "store/img game/MECCHA CHAMELEON.jpg",
        category: "game",
        description: {
            en: "Take on a colorful arcade adventure packed with quick challenges and bold style.",
            ar: "انطلق في مغامرة أركيد ملونة مليئة بالتحديات السريعة والأسلوب المميز."
        }
    },
    {
        id: "hollow-knight",
        name: "Hollow Knight Silksong",
        image: "store/img game/hollow.png",
        libraryImage: "store/img game/hollow.png",
        category: "game",
        description: {
            en: "Explore a haunting new kingdom, master Hornet's acrobatic combat, and uncover its hidden paths.",
            ar: "استكشف مملكة غامضة، وأتقن أسلوب هورنت القتالي السريع، واكشف أسرار طرقها الخفية."
        }
    },
    {
        id: "among-us",
        name: "Among Us",
        image: "store/img game/among us.jpg",
        libraryImage: "store/img game/among us.jpg",
        category: "game",
        description: {
            en: "Work together to prepare the ship, share clues, and find the impostor before it is too late.",
            ar: "تعاونوا لتجهيز السفينة وتبادل الأدلة واكتشاف المخادع قبل فوات الأوان."
        }
    },
    {
        id: "steam",
        name: "Steam",
        image: "store/img game/Steam.jpg",
        libraryImage: "store/img game/Steam.jpg",
        category: "app",
        description: {
            en: "Discover new games, browse your collection, and find your next favorite on PC.",
            ar: "اكتشف ألعاباً جديدة وتصفح مجموعتك واعثر على لعبتك المفضلة القادمة على الحاسوب."
        }
    },
    {
        id: "tlauncher",
        name: "TLauncher",
        image: "store/img game/TLauncher.png",
        libraryImage: "store/img game/TLauncher.png",
        category: "game",
        description: {
            en: "Browse Minecraft versions and launch your favorite block-building adventures.",
            ar: "تصفح إصدارات ماينكرافت وشغّل مغامراتك المفضلة في عالم المكعبات."
        }
    },
    {
        id: "vscode",
        name: "VScode",
        image: "store/img apps/vscode.png",
        libraryImage: "store/img apps/vscode.png",
        category: "app",
        description: {
            en: "Write, debug, and shape your next project with a flexible code editor built for developers.",
            ar: "اكتب وصحح وطوّر مشروعك القادم باستخدام محرر أكواد مرن صُمم للمطورين."
        }
    },
    {
        id: "virtualbox",
        name: "VirtualBox",
        image: "store/img apps/VirtualBox.png",
        libraryImage: "store/img apps/VirtualBox.png",
        category: "app",
        description: {
            en: "Run virtual computers on your desktop and explore different operating systems in one place.",
            ar: "شغّل حواسيب افتراضية على جهازك واستكشف أنظمة تشغيل مختلفة من مكان واحد."
        }
    },
    {
        id: "chrome",
        name: "Google Chrome",
        image: "store/img apps/googel.png",
        libraryImage: "store/img apps/googel.png",
        category: "app",
        description: {
            en: "Browse the web with speed, keep your favorite sites close, and pick up where you left off.",
            ar: "تصفح الإنترنت بسرعة، واحتفظ بمواقعك المفضلة، وتابع من حيث توقفت."
        }
    },
    {
        id: "epic-games",
        name: "Epic Games",
        image: "store/img apps/epic.png",
        libraryImage: "store/img apps/epic.png",
        category: "app",
        description: {
            en: "Discover a world of PC games, find something new to play, and keep your collection together.",
            ar: "اكتشف مجموعة واسعة من ألعاب الحاسوب، واعثر على لعبة جديدة، واجمع مكتبتك في مكان واحد."
        }
    },
    {
        id: "unity",
        name: "Unity Hub",
        image: "store/img apps/unity.png",
        libraryImage: "store/img apps/unity.png",
        category: "app",
        description: {
            en: "Organize Unity projects, manage editor versions, and bring interactive ideas to life.",
            ar: "نظّم مشاريع Unity وأدر إصدارات المحرر وحوّل أفكارك إلى تجارب تفاعلية."
        }
    },
    {
        id: "krita",
        name: "Krita",
        image: "store/img apps/krita.png",
        libraryImage: "store/img apps/krita.png",
        category: "app",
        description: {
            en: "Sketch, paint, and illustrate with a creative toolkit made for digital artists.",
            ar: "ارسم ولوّن وصمّم باستخدام أدوات إبداعية مخصصة للفنانين الرقميين."
        }
    },
    {
        id: "hydra-launcher",
        name: "Hydra Launcher",
        image: "store/img apps/Hydra launche.jpg",
        libraryImage: "store/img apps/Hydra launche.jpg",
        category: "app",
        description: {
            en: "Keep your PC games organized and make it easier to find what you want to play.",
            ar: "نظّم ألعاب الحاسوب واجعل العثور على لعبتك التالية أسهل."
        }
    },
    {
        id: "discord",
        name: "Discord",
        image: "store/img apps/discord.jpg",
        libraryImage: "store/img apps/discord.jpg",
        category: "app",
        description: {
            en: "Talk, share, and play with friends in a community space that brings everyone together.",
            ar: "تحدث وشارك والعب مع أصدقائك في مساحة تجمع أفراد مجتمعك."
        }
    },
];

const localizedProductDescriptions = {
    fr: {
        minecraft: "Construisez tout ce que vous imaginez, explorez un monde sans fin et vivez chaque aventure à votre façon.",
        valorant: "Formez une équipe, maîtrisez des agents uniques et prenez l'avantage dans ce jeu tactique en 5 contre 5.",
        "geometry-dash": "Sautez, volez et foncez à travers des niveaux rythmés où chaque mouvement suit la musique.",
        "mechcha-chameleon": "Partez à l'aventure dans un jeu d'arcade coloré rempli de défis rapides et de style.",
        "hollow-knight": "Explorez un royaume mystérieux, maîtrisez le combat acrobatique de Hornet et découvrez ses passages secrets.",
        "among-us": "Préparez le vaisseau ensemble, partagez vos indices et démasquez l'imposteur à temps.",
        steam: "Découvrez des jeux, parcourez votre collection et trouvez votre prochain favori sur PC.",
        tlauncher: "Parcourez les versions de Minecraft et lancez vos aventures préférées dans un monde de blocs.",
        vscode: "Écrivez, déboguez et réalisez vos projets avec un éditeur de code flexible conçu pour les développeurs.",
        virtualbox: "Exécutez des ordinateurs virtuels sur votre bureau et découvrez plusieurs systèmes d'exploitation.",
        chrome: "Naviguez rapidement sur le Web, retrouvez vos sites favoris et reprenez là où vous en étiez.",
        "epic-games": "Découvrez des jeux PC, trouvez votre prochaine partie et rassemblez votre collection.",
        unity: "Organisez vos projets Unity, gérez les versions de l'éditeur et donnez vie à vos idées interactives.",
        krita: "Dessinez, peignez et illustrez avec une boîte à outils créative conçue pour les artistes numériques.",
        "hydra-launcher": "Organisez vos jeux PC et trouvez plus facilement celui auquel vous voulez jouer.",
        discord: "Discutez, partagez et jouez avec vos amis dans un espace communautaire qui rassemble tout le monde."
    },
    es: {
        minecraft: "Construye todo lo que imagines, explora un mundo infinito y vive cada aventura a tu manera.",
        valorant: "Forma equipo, domina agentes únicos y supera a tus rivales en este juego táctico de 5 contra 5.",
        "geometry-dash": "Salta, vuela y corre por niveles llenos de ritmo donde cada movimiento sigue la música.",
        "mechcha-chameleon": "Disfruta de una colorida aventura arcade repleta de desafíos rápidos y mucho estilo.",
        "hollow-knight": "Explora un reino misterioso, domina el combate acrobático de Hornet y descubre caminos ocultos.",
        "among-us": "Preparad la nave en equipo, compartid pistas y encontrad al impostor antes de que sea tarde.",
        steam: "Descubre juegos, explora tu colección y encuentra tu próximo favorito para PC.",
        tlauncher: "Explora versiones de Minecraft e inicia tus aventuras favoritas en un mundo de bloques.",
        vscode: "Escribe, depura y crea tu próximo proyecto con un editor flexible diseñado para desarrolladores.",
        virtualbox: "Ejecuta ordenadores virtuales en tu escritorio y descubre distintos sistemas operativos.",
        chrome: "Navega por Internet rápidamente, guarda tus sitios favoritos y continúa donde lo dejaste.",
        "epic-games": "Descubre juegos de PC, encuentra algo nuevo y reúne tu colección en un solo lugar.",
        unity: "Organiza proyectos de Unity, administra versiones del editor y da vida a ideas interactivas.",
        krita: "Dibuja, pinta e ilustra con herramientas creativas diseñadas para artistas digitales.",
        "hydra-launcher": "Organiza tus juegos de PC y encuentra más fácilmente lo que quieres jugar.",
        discord: "Habla, comparte y juega con tus amigos en un espacio comunitario que los reúne."
    },
    de: {
        minecraft: "Baue alles, was du dir vorstellen kannst, erkunde eine endlose Welt und gestalte jedes Abenteuer selbst.",
        valorant: "Spiele im Team, meistere einzigartige Agenten und überliste die Konkurrenz im taktischen 5-gegen-5.",
        "geometry-dash": "Springe, fliege und rase durch rhythmische Level, in denen jede Bewegung dem Beat folgt.",
        "mechcha-chameleon": "Erlebe ein farbenfrohes Arcade-Abenteuer voller schneller Herausforderungen und auffälligem Stil.",
        "hollow-knight": "Erkunde ein geheimnisvolles Königreich, meistere Hornets akrobatischen Kampf und entdecke verborgene Wege.",
        "among-us": "Bereitet gemeinsam das Raumschiff vor, teilt Hinweise und findet rechtzeitig den Hochstapler.",
        steam: "Entdecke neue Spiele, durchstöbere deine Sammlung und finde deinen nächsten PC-Favoriten.",
        tlauncher: "Entdecke Minecraft-Versionen und starte deine liebsten Abenteuer in der Welt der Blöcke.",
        vscode: "Schreibe, debugge und entwickle dein nächstes Projekt mit einem flexiblen Editor für Entwickler.",
        virtualbox: "Führe virtuelle Computer auf deinem Desktop aus und entdecke verschiedene Betriebssysteme.",
        chrome: "Surfe schnell im Web, behalte deine Lieblingsseiten im Blick und mach dort weiter, wo du aufgehört hast.",
        "epic-games": "Entdecke PC-Spiele, finde etwas Neues zum Spielen und verwalte deine Sammlung an einem Ort.",
        unity: "Organisiere Unity-Projekte, verwalte Editor-Versionen und erwecke interaktive Ideen zum Leben.",
        krita: "Skizziere, male und illustriere mit einem kreativen Werkzeugkasten für digitale Künstler.",
        "hydra-launcher": "Organisiere deine PC-Spiele und finde leichter, worauf du Lust hast.",
        discord: "Sprich, teile Inhalte und spiele mit Freunden in einer Community, die alle zusammenbringt."
    },
    ru: {
        minecraft: "Стройте всё, что можете представить, исследуйте бесконечный мир и создавайте собственные приключения.",
        valorant: "Соберите команду, освойте уникальных агентов и обыграйте соперников в тактическом матче 5 на 5.",
        "geometry-dash": "Прыгайте, летите и мчитесь по музыкальным уровням, где каждое движение следует ритму.",
        "mechcha-chameleon": "Отправляйтесь в яркое аркадное приключение с быстрыми испытаниями и необычным стилем.",
        "hollow-knight": "Исследуйте таинственное королевство, освойте акробатичный бой Хорнет и найдите скрытые пути.",
        "among-us": "Вместе подготовьте корабль, поделитесь уликами и найдите самозванца, пока не стало поздно.",
        steam: "Открывайте новые игры, просматривайте свою коллекцию и находите следующую любимую игру для ПК.",
        tlauncher: "Выбирайте версии Minecraft и отправляйтесь в любимые приключения в мире кубов.",
        vscode: "Пишите код, находите ошибки и создавайте проекты в гибком редакторе для разработчиков.",
        virtualbox: "Запускайте виртуальные компьютеры на рабочем столе и знакомьтесь с разными операционными системами.",
        chrome: "Быстро просматривайте веб-страницы, сохраняйте любимые сайты и продолжайте с того места, где остановились.",
        "epic-games": "Открывайте игры для ПК, находите новые и собирайте свою коллекцию в одном месте.",
        unity: "Управляйте проектами Unity и версиями редактора, воплощая интерактивные идеи в жизнь.",
        krita: "Рисуйте, раскрашивайте и создавайте иллюстрации с инструментами для цифровых художников.",
        "hydra-launcher": "Упорядочьте игры на ПК и быстрее находите, во что хотите сыграть.",
        discord: "Общайтесь, делитесь и играйте с друзьями в сообществе, которое объединяет всех."
    },
    tr: {
        minecraft: "Hayal ettiğin her şeyi inşa et, sonsuz bir dünyayı keşfet ve her macerayı kendi tarzında yaşa.",
        valorant: "Takım kur, benzersiz ajanlarda ustalaş ve taktiksel 5'e 5 mücadelede rakiplerini alt et.",
        "geometry-dash": "Her hareketin ritmi takip ettiği müzik dolu bölümlerde zıpla, uç ve hızla ilerle.",
        "mechcha-chameleon": "Hızlı mücadeleler ve çarpıcı tarzla dolu renkli bir arcade macerasına atıl.",
        "hollow-knight": "Gizemli bir krallığı keşfet, Hornet'in akrobatik dövüşünde ustalaş ve gizli yolları bul.",
        "among-us": "Gemiyi birlikte hazırlayın, ipuçlarını paylaşın ve çok geç olmadan sahtekârı bulun.",
        steam: "Yeni oyunlar keşfet, koleksiyonuna göz at ve PC'deki yeni favorini bul.",
        tlauncher: "Minecraft sürümlerine göz at ve bloklarla dolu dünyadaki maceralarını başlat.",
        vscode: "Geliştiriciler için tasarlanmış esnek bir düzenleyiciyle kod yaz, hata ayıkla ve projeni geliştir.",
        virtualbox: "Masaüstünde sanal bilgisayarlar çalıştır ve farklı işletim sistemlerini keşfet.",
        chrome: "Web'de hızla gezin, sevdiğin siteleri yanında tut ve kaldığın yerden devam et.",
        "epic-games": "PC oyunlarını keşfet, oynayacak yeni bir şey bul ve koleksiyonunu bir arada tut.",
        unity: "Unity projelerini düzenle, düzenleyici sürümlerini yönet ve etkileşimli fikirlerini hayata geçir.",
        krita: "Dijital sanatçılar için hazırlanan yaratıcı araçlarla çizim yap, boya ve illüstrasyon oluştur.",
        "hydra-launcher": "PC oyunlarını düzenle ve oynamak istediklerini daha kolay bul.",
        discord: "Herkesi bir araya getiren topluluk alanında arkadaşlarınla konuş, paylaş ve oyna."
    },
    zh: {
        minecraft: "建造想象中的一切，探索无尽的世界，创造属于自己的冒险。",
        valorant: "组建队伍，掌握独特特工，在战术 5 对 5 对战中击败对手。",
        "geometry-dash": "在节奏感十足的关卡中跳跃、飞行、冲刺，让每个动作都跟随音乐节拍。",
        "mechcha-chameleon": "踏上色彩缤纷的街机冒险，迎接快速挑战，感受独特风格。",
        "hollow-knight": "探索神秘王国，掌握大黄蜂灵巧的战斗方式，并发现隐藏道路。",
        "among-us": "一起准备飞船、分享线索，并在太迟之前找出冒名顶替者。",
        steam: "发现新游戏，浏览你的收藏，并找到下一款喜爱的 PC 游戏。",
        tlauncher: "浏览 Minecraft 版本，开启你最喜欢的方块世界冒险。",
        vscode: "使用为开发者打造的灵活代码编辑器编写、调试并开发项目。",
        virtualbox: "在桌面运行虚拟电脑，并体验不同的操作系统。",
        chrome: "快速浏览网页，收藏常用网站，并从上次离开的地方继续。",
        "epic-games": "探索 PC 游戏，发现新作品，并在一处管理你的收藏。",
        unity: "整理 Unity 项目、管理编辑器版本，让互动创意成为现实。",
        krita: "使用专为数字艺术家打造的创作工具进行素描、绘画和插画创作。",
        "hydra-launcher": "整理 PC 游戏，更轻松地找到想玩的内容。",
        discord: "在汇聚朋友与社区的空间中聊天、分享并一起游戏。"
    },
    ja: {
        minecraft: "想像したものを何でも作り、終わりのない世界を探検して、自分だけの冒険を楽しもう。",
        valorant: "チームを組み、個性豊かなエージェントを使いこなし、戦術的な5対5で勝利をつかもう。",
        "geometry-dash": "音楽に合わせて動きながら、リズムあふれるステージをジャンプし、飛び越え、駆け抜けよう。",
        "mechcha-chameleon": "スピーディーなチャレンジと個性的なスタイルが詰まった、カラフルなアーケードの冒険へ。",
        "hollow-knight": "不思議な王国を探検し、ホーネットのアクロバティックな戦闘を極め、隠された道を見つけよう。",
        "among-us": "仲間と宇宙船を準備し、手がかりを共有して、手遅れになる前に偽物を見つけよう。",
        steam: "新しいゲームを見つけ、コレクションを閲覧して、次のお気に入りを探そう。",
        tlauncher: "Minecraftのバージョンを選び、ブロックの世界でお気に入りの冒険を始めよう。",
        vscode: "開発者向けの柔軟なコードエディターで、次のプロジェクトを作成・デバッグしよう。",
        virtualbox: "デスクトップで仮想マシンを動かし、さまざまなオペレーティングシステムを体験しよう。",
        chrome: "ウェブをすばやく閲覧し、お気に入りのサイトを保存して、前回の続きから再開しよう。",
        "epic-games": "PCゲームを探し、新しい作品を見つけて、コレクションをひとまとめにしよう。",
        unity: "Unityプロジェクトとエディターのバージョンを管理し、インタラクティブなアイデアを形にしよう。",
        krita: "デジタルアーティスト向けの創作ツールで、スケッチや彩色、イラスト制作を楽しもう。",
        "hydra-launcher": "PCゲームを整理して、遊びたいゲームを簡単に見つけよう。",
        discord: "友達と話し、共有し、一緒に遊べるコミュニティスペース。"
    },
    ko: {
        minecraft: "상상하는 모든 것을 만들고 끝없는 세계를 탐험하며 나만의 모험을 즐겨 보세요.",
        valorant: "팀을 이루고 개성 있는 요원을 익혀 전술적인 5대5 전투에서 상대를 압도하세요.",
        "geometry-dash": "음악의 박자에 맞춰 움직이며 리듬 가득한 레벨에서 점프하고 날고 질주하세요.",
        "mechcha-chameleon": "빠른 도전과 개성 있는 스타일로 가득한 다채로운 아케이드 모험을 즐기세요.",
        "hollow-knight": "신비로운 왕국을 탐험하고 호넷의 곡예 전투를 익혀 숨겨진 길을 발견하세요.",
        "among-us": "함께 우주선을 준비하고 단서를 나누며 너무 늦기 전에 사기꾼을 찾아내세요.",
        steam: "새로운 게임을 발견하고 컬렉션을 둘러보며 다음 PC 최애 게임을 찾아보세요.",
        tlauncher: "Minecraft 버전을 둘러보고 블록 세계에서 좋아하는 모험을 시작하세요.",
        vscode: "개발자를 위한 유연한 코드 편집기로 작성하고 디버깅하며 프로젝트를 만들어 보세요.",
        virtualbox: "데스크톱에서 가상 컴퓨터를 실행하고 다양한 운영 체제를 경험하세요.",
        chrome: "웹을 빠르게 탐색하고 즐겨찾는 사이트를 저장해 이전에 보던 곳부터 이어 보세요.",
        "epic-games": "PC 게임을 발견하고 새로운 게임을 찾아 컬렉션을 한곳에 모아 보세요.",
        unity: "Unity 프로젝트와 에디터 버전을 관리하고 인터랙티브한 아이디어를 실현하세요.",
        krita: "디지털 아티스트를 위한 창작 도구로 스케치하고 채색하며 일러스트를 그려 보세요.",
        "hydra-launcher": "PC 게임을 정리하고 플레이하고 싶은 게임을 더 쉽게 찾아보세요.",
        discord: "친구들과 이야기하고 공유하며 함께 게임을 즐기는 커뮤니티 공간입니다."
    },
    nk: {
        minecraft: "상상하는 모든 것을 만들고 끝없는 세계를 탐험하며 나만의 모험을 즐기십시오.",
        valorant: "팀을 이루고 개성 있는 요원을 익혀 전술적인 5대5 전투에서 상대를 이기십시오.",
        "geometry-dash": "음악의 박자에 맞춰 움직이며 리듬 가득한 레벨에서 뛰고 날고 달리십시오.",
        "mechcha-chameleon": "빠른 도전과 개성 있는 스타일로 가득한 다채로운 아케이드 모험을 즐기십시오.",
        "hollow-knight": "신비로운 왕국을 탐험하고 호넷의 곡예 전투를 익혀 숨겨진 길을 찾으십시오.",
        "among-us": "함께 우주선을 준비하고 단서를 나누며 늦기 전에 사기꾼을 찾으십시오.",
        steam: "새로운 게임을 발견하고 소장품을 살펴보며 다음에 즐길 게임을 찾으십시오.",
        tlauncher: "Minecraft 판본을 살펴보고 블록 세계에서 좋아하는 모험을 시작하십시오.",
        vscode: "개발자를 위한 유연한 코드 편집기로 작성하고 오류를 찾으며 계획을 실현하십시오.",
        virtualbox: "탁상에서 가상 컴퓨터를 실행하고 여러 운영 체제를 체험하십시오.",
        chrome: "인터네트를 빠르게 열람하고 즐겨찾는 싸이트를 보관하며 하던 곳부터 계속하십시오.",
        "epic-games": "콤퓨터 게임을 발견하고 새 게임을 찾아 소장품을 한곳에 모으십시오.",
        unity: "Unity 계획과 편집기 판본을 관리하고 쌍방향 아이디어를 실현하십시오.",
        krita: "디지털 예술가를 위한 창작 도구로 그림을 그리고 색칠하며 삽화를 만드십시오.",
        "hydra-launcher": "콤퓨터 게임을 정리하고 하고 싶은 게임을 더 쉽게 찾으십시오.",
        discord: "친구들과 이야기하고 자료를 나누며 함께 놀 수 있는 공동체 공간입니다."
    }
};

featuredProducts.forEach(product => {
    Object.entries(localizedProductDescriptions).forEach(([language, descriptions]) => {
        product.description[language] = descriptions[product.id];
    });
});

const featuredImageByProduct = {
    minecraft: "store/pingi/Minecraft Bedrock.jpg",
    valorant: "store/pingi/valorant.jpg",
    "hollow-knight": "store/pingi/Hollow knight s.jpg",
    steam: "store/pingi/Steam.jpg",
    tlauncher: "store/pingi/TLauncher.png",
    vscode: "store/pingi/VScode.jpg",
    chrome: "store/pingi/Googel.jpg",
    "epic-games": "store/pingi/Epic games.jpg",
    unity: "store/pingi/Unity Hub.jpg",
    "hydra-launcher": "store/pingi/hydra launcher.jpg",
    discord: "store/pingi/discord.png"
};
const promoImageByProduct = {
    minecraft: "store/hingi/minecraft.png",
    valorant: "store/hingi/valorant.png",
    "geometry-dash": "store/hingi/geometry dash",
    "mechcha-chameleon": "store/hingi/MECCHA CHAMELEON.jpg",
    "hollow-knight": "store/hingi/hollow.png",
    "among-us": "store/hingi/among us.jpg",
    steam: "store/hingi/Steam.jpg",
    tlauncher: "store/hingi/TLauncher.png",
    vscode: "store/hingi/vscode.png",
    virtualbox: "store/hingi/VirtualBox.png",
    chrome: "store/hingi/googel.png",
    "epic-games": "store/hingi/epic.png",
    unity: "store/hingi/unity.png",
    krita: "store/hingi/krita.png",
    "hydra-launcher": "store/hingi/Hydra launche.jpg"
};

featuredProducts.forEach(product => {
    product.featuredImage = featuredImageByProduct[product.id] || "";
    product.promoImage = promoImageByProduct[product.id] || "";
});

document.addEventListener("DOMContentLoaded", () => {
    const homeGrid = document.getElementById("gamesGrid");
    if (homeGrid) randomizeHomeCards(homeGrid);

    const carousel = document.getElementById("featuredCarousel");
    const pagination = document.getElementById("carouselPagination");
    const promoColumn = document.getElementById("promoColumn");
    if (!carousel || !pagination || !promoColumn) return;

    const previousButton = carousel.querySelector('[data-carousel-step="-1"]');
    const nextButton = carousel.querySelector('[data-carousel-step="1"]');
    const previouslyFeatured = readPreviousSelection();
    const mix = localStorage.getItem("brickStoreHomeMix") || "balanced";
    const featuredGameCount = mix === "games" ? 3 : mix === "apps" ? 1 : 2;
    const promoGameCount = mix === "games" ? 2 : 1;
    const featuredPool = shuffleWithPreviousFallback(
        featuredProducts.filter(product => product.featuredImage),
        previouslyFeatured
    );
    const selectedGames = takeProducts(featuredPool, "game", featuredGameCount);
    const selectedApps = takeProducts(featuredPool, "app", 3 - featuredGameCount);
    const featured = [...selectedGames, ...selectedApps];
    while (featured.length < 3 && featuredPool.length) featured.push(featuredPool.shift());

    const featuredIds = new Set(featured.map(product => product.id));
    const promoPool = shuffleWithPreviousFallback(
        featuredProducts.filter(product => product.promoImage && !featuredIds.has(product.id)),
        previouslyFeatured
    );
    const promo = [
        ...takeProducts(promoPool, "game", promoGameCount),
        ...takeProducts(promoPool, "app", 3 - promoGameCount)
    ];
    while (promo.length < 3 && promoPool.length) promo.push(promoPool.shift());

    if (!featured.length) return;
    localStorage.setItem("brickStoreHomeFeaturedIds", JSON.stringify([...featured, ...promo].map(product => product.id)));

    let activeIndex = 0;
    let rotationTimer;
    const slides = featured.map((product, index) => createFeaturedSlide(product, index, featured.length));
    slides.forEach(slide => carousel.insertBefore(slide, previousButton));

    const dots = featured.map((product, index) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `${translate("goToFeatured")} ${product.name}`);
        dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
        dot.addEventListener("click", () => showSlide(index));
        pagination.appendChild(dot);
        return dot;
    });

    promoColumn.innerHTML = "";
    promo.forEach((product, index) => {
        const card = createPromoCard(product);
        if (index === 0) {
            card.classList.add("promo-primary");
            promoColumn.appendChild(card);
        } else {
            let row = promoColumn.querySelector(".promo-card-row");
            if (!row) {
                row = document.createElement("div");
                row.className = "promo-card-row";
                promoColumn.appendChild(row);
            }
            row.appendChild(card);
        }
    });

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
        restartRotation();
    }

    function restartRotation() {
        window.clearInterval(rotationTimer);
        if (localStorage.getItem("brickStoreReduceMotion") !== "true" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            rotationTimer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
        }
    }

    document.addEventListener("brickStoreLanguageChanged", updateFeaturedLanguage);

    previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
    nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
    carousel.addEventListener("mouseenter", () => window.clearInterval(rotationTimer));
    carousel.addEventListener("mouseleave", restartRotation);
    carousel.addEventListener("focusin", () => window.clearInterval(rotationTimer));
    carousel.addEventListener("focusout", event => {
        if (!carousel.contains(event.relatedTarget)) restartRotation();
    });

    showSlide(activeIndex);

    function updateFeaturedLanguage() {
        const language = getCurrentLanguage();
        slides.forEach((slide, index) => {
            const product = featured[index];
            slide.querySelector(".featured-kicker").textContent = translate(product.category === "game" ? "featuredGame" : "featuredApp");
            slide.querySelector(".featured-slide-content p").textContent = product.description[language] || product.description.en;
            slide.querySelector(".featured-cta").textContent = translate("addToLibrary");
        });
        dots.forEach((dot, index) => {
            dot.setAttribute("aria-label", `${translate("goToFeatured")} ${featured[index].name}`);
        });
        promo.forEach((product, index) => {
            const card = promoColumn.querySelectorAll(".promo-card")[index];
            card.querySelector(".promo-category").textContent = translate(product.category === "game" ? "featuredGame" : "featuredApp");
            card.querySelector(".promo-copy > span:last-child").textContent = product.description[language] || product.description.en;
        });
    }
});

function randomizeHomeCards(grid) {
    const shuffledCards = shuffle(Array.from(grid.querySelectorAll(".game-card")));
    const visibleCards = shuffledCards.slice(0, 20);
    const currentOrder = visibleCards.map(card => card.querySelector("h3")?.textContent.trim() || "");
    let previousOrder = [];

    try {
        const savedOrder = JSON.parse(localStorage.getItem("brickStoreHomeCardOrder") || "[]");
        if (Array.isArray(savedOrder) && savedOrder.every(name => typeof name === "string")) {
            previousOrder = savedOrder;
        }
    } catch (error) {
        console.error("Could not read the previous home card order.", error);
    }

    if (currentOrder.length > 1 && currentOrder.length === previousOrder.length
        && currentOrder.every((name, index) => name === previousOrder[index])) {
        visibleCards.push(visibleCards.shift());
        currentOrder.push(currentOrder.shift());
    }

    const visibleCardSet = new Set(visibleCards);
    shuffledCards.forEach(card => {
        if (!visibleCardSet.has(card)) card.remove();
    });
    visibleCards.forEach(card => grid.appendChild(card));
    localStorage.setItem("brickStoreHomeCardOrder", JSON.stringify(currentOrder));
}

function readPreviousSelection() {
    try {
        const previous = JSON.parse(localStorage.getItem("brickStoreHomeFeaturedIds") || "[]");
        return Array.isArray(previous) ? previous : [];
    } catch (error) {
        console.error("Could not read the previous featured items.", error);
        return [];
    }
}

function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
}

function takeProducts(products, category, count) {
    const matches = products.filter(product => product.category === category).slice(0, count);
    matches.forEach(product => products.splice(products.indexOf(product), 1));
    return matches;
}

function shuffleWithPreviousFallback(products, previouslyFeatured) {
    return [
        ...shuffle(products.filter(product => !previouslyFeatured.includes(product.id))),
        ...shuffle(products.filter(product => previouslyFeatured.includes(product.id)))
    ];
}

function createFeaturedSlide(product, index, total) {
    const slide = document.createElement("article");
    slide.className = `featured-slide${index === 0 ? " is-active" : ""}`;
    slide.style.setProperty("--slide-image", `url("${product.featuredImage}")`);
    slide.setAttribute("aria-hidden", String(index !== 0));

    const content = document.createElement("div");
    content.className = "featured-slide-content";

    const kicker = document.createElement("span");
    kicker.className = "featured-kicker";
    kicker.textContent = translate(product.category === "game" ? "featuredGame" : "featuredApp");

    const title = document.createElement("h1");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = getProductDescription(product);

    const button = document.createElement("a");
    button.className = "featured-cta btn-download";
    if (product.id === "discord") {
        button.href = "apps.html";
        button.textContent = translate("apps");
    } else {
        button.href = `store/downloads/${encodeURIComponent(product.name + ".zip")}`;
        button.download = product.name + ".zip";
        button.textContent = translate("download");
    }

    content.append(kicker, title, description, button);

    const slideIndex = document.createElement("span");
    slideIndex.className = "featured-slide-index";
    slideIndex.dir = "ltr";
    slideIndex.innerHTML = `${String(index + 1).padStart(2, "0")} <span>/ ${String(total).padStart(2, "0")}</span>`;

    slide.append(content, slideIndex);
    return slide;
}

function createPromoCard(product) {
    const card = document.createElement("a");
    card.className = `promo-card promo-${product.id}`;
    card.href = product.category === "game" ? "games.html" : "apps.html";

    const image = document.createElement("img");
    image.src = product.promoImage;
    image.alt = "";

    const copy = document.createElement("span");
    copy.className = "promo-copy";

    const category = document.createElement("span");
    category.className = "promo-category";
    category.textContent = translate(product.category === "game" ? "featuredGame" : "featuredApp");

    const title = document.createElement("strong");
    title.textContent = product.name;

    const description = document.createElement("span");
    description.textContent = getProductDescription(product);

    copy.append(category, title, description);
    card.append(image, copy);
    return card;
}

function getProductDescription(product) {
    const language = getCurrentLanguage();
    return product.description[language] || product.description.en;
}
