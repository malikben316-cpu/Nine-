(() => {
    const preferenceKeys = [
        "brickStoreLang",
        "brickStoreBackgroundMode",
        "brickStoreBackgroundSource",
        "brickStoreTextScale",
        "brickStoreHighContrast",
        "brickStoreReduceMotion",
        "brickStoreDownloadConcurrency",
        "brickStoreLargeDownloadThreshold",
        "brickStoreCompletionNotifications",
        "brickStoreNotificationSound",
        "brickStoreSaveActivity",
        "brickStoreSort",
        "brickStoreHomeCategory",
        "brickStoreHomeMix",
        "brickStoreStartupPage"
    ];
    const defaults = {
        brickStoreTextScale: "1",
        brickStoreHighContrast: "false",
        brickStoreReduceMotion: "false",
        brickStoreDownloadConcurrency: "1",
        brickStoreLargeDownloadThreshold: "100",
        brickStoreCompletionNotifications: "false",
        brickStoreNotificationSound: "false",
        brickStoreSaveActivity: "true",
        brickStoreSort: "recommended",
        brickStoreHomeCategory: "all",
        brickStoreHomeMix: "balanced",
        brickStoreStartupPage: "index.html"
    };
    const sharedPreferenceKeys = [
        "brickStoreTextScale",
        "brickStoreHighContrast",
        "brickStoreReduceMotion",
        "brickStoreDownloadConcurrency",
        "brickStoreLargeDownloadThreshold",
        "brickStoreCompletionNotifications",
        "brickStoreNotificationSound",
        "brickStoreSaveActivity",
        "brickStoreSort",
        "brickStoreHomeCategory",
        "brickStoreHomeMix",
        "brickStoreStartupPage",
        "brickStoreBackgroundMode",
        "brickStoreBackgroundSource"
    ];
    const sharedPreferenceValues = {
        brickStoreTextScale: ["1", "1.1", "1.2"],
        brickStoreHighContrast: ["true", "false"],
        brickStoreReduceMotion: ["true", "false"],
        brickStoreDownloadConcurrency: ["1", "2", "3"],
        brickStoreLargeDownloadThreshold: ["0", "50", "100", "200"],
        brickStoreCompletionNotifications: ["true", "false"],
        brickStoreNotificationSound: ["true", "false"],
        brickStoreSaveActivity: ["true", "false"],
        brickStoreSort: ["recommended", "alphabetical"],
        brickStoreHomeCategory: ["all", "games", "apps"],
        brickStoreHomeMix: ["balanced", "games", "apps"],
        brickStoreStartupPage: ["index.html", "games.html", "apps.html", "Library.html", "Brick.html"],
        brickStoreBackgroundMode: ["animated", "custom"]
    };
    const archiveSizes = {
        "Among Us": 22,
        "Epic Games": 210161753,
        "Geometry Dash": 22,
        "Google Chrome": 6041280,
        "Hollow Knight Silksong": 22,
        "Hydra Launcher": 22,
        "Krita": 22,
        "MECCHA CHAMELEON": 22,
        "MediBang Paint Pro": 43366544,
            "Minecraft": 22, // Keeping the original line for context
        Photopea: 3235182,
        "Poki JP": 3242605,
        Steam: 2323005,
        Terraria: 695213934,
        TLauncher: 60360546,
        Twitch: 3210153,
        "Unity Hub": 192126690,
        Valorant: 68055396,
        VirtualBox: 173722117,
        VScode: 234619014
    };
    const archiveFiles = {
        "Among Us": "Among Us.zip",
        "Geometry Dash": "Geometry Dash.zip",
        "Google Chrome": "Google Chrome.zip",
        "Hollow Knight Silksong": "Hollow Knight Silksong.zip",
        "Hydra Launcher": "Hydra Launcher.zip",
        "Krita": "Krita.zip",
        "MECCHA CHAMELEON": "MECCHA CHAMELEON.zip",
        "MediBang Paint Pro": "MediBang Paint Pro.zip",
            Minecraft: "Minecraft.zip",
        Photopea: "Photopea.zip",
        "Poki JP": "Poki JP.zip",
        Steam: "Steam.zip",
        Terraria: "Terraria.zip",
        TLauncher: "TLauncher.zip",
        Twitch: "Twitch.zip",
        "Unity Hub": "Unity Hub.zip",
        Valorant: "Valorant.zip",
        VirtualBox: "VirtualBox.zip",
        VScode: "VScode.zip"
    };
    const preferenceStyle = document.createElement("style");
    preferenceStyle.textContent = `
        html { font-size: calc(16px * var(--brick-store-text-scale, 1)); }
        .preference-hidden { display: none !important; }
        .reduce-motion *, .reduce-motion *::before, .reduce-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
        }
        .sidebar {
            display: flex;
            min-height: 0;
            height: 100%;
            flex-direction: column;
            transition: width .22s ease, padding .22s ease;
        }
        .app-container {
            min-width: 0;
            min-height: 0;
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
        }
        .main-content {
            min-width: 0;
            min-height: 0;
            flex: 1 1 0;
        }
        .top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        .about-button {
            display: inline-flex;
            min-width: 42px;
            min-height: 42px;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px 12px;
            border: 1px solid rgba(167, 139, 250, .25);
            border-radius: 12px;
            background: rgba(167, 139, 250, .08);
            color: #ddd6fe;
            cursor: pointer;
            transition: background .2s ease, border-color .2s ease;
        }
        .about-button:hover {
            border-color: rgba(167, 139, 250, .6);
            background: rgba(124, 58, 237, .2);
        }
        .about-button:focus-visible,
        .about-dialog-close:focus-visible {
            outline: 2px solid #c4b5fd;
            outline-offset: 3px;
        }
        .about-button img {
            width: 22px;
            height: 22px;
            filter: invert(83%) sepia(13%) saturate(1046%) hue-rotate(207deg) brightness(102%) contrast(96%);
        }
        .about-overlay {
            position: fixed;
            inset: 0;
            z-index: 6000;
            display: grid;
            place-items: center;
            padding: 20px;
            background: rgba(5, 3, 10, .72);
            backdrop-filter: blur(8px);
        }
        .about-overlay[hidden] { display: none; }
        .about-dialog {
            position: relative;
            width: min(100%, 520px);
            padding: 30px;
            border: 1px solid rgba(196, 181, 253, .3);
            border-radius: 20px;
            background: linear-gradient(145deg, rgba(35, 25, 55, .98), rgba(15, 11, 24, .98));
            box-shadow: 0 24px 80px rgba(0, 0, 0, .55), 0 0 36px rgba(124, 58, 237, .16);
            color: #f5f3ff;
        }
        .about-dialog h2 {
            margin: 0 42px 16px 0;
            color: #ddd6fe;
            font-size: 1.4rem;
        }
        .about-dialog p {
            margin: 0;
            color: rgba(245, 243, 255, .86);
            font-size: 1rem;
            line-height: 1.8;
        }
        .about-dialog-close {
            display: inline-flex;
            min-width: 88px;
            min-height: 40px;
            align-items: center;
            justify-content: center;
            margin-top: 24px;
            padding: 8px 16px;
            border: 0;
            border-radius: 9px;
            background: #7c3aed;
            color: #fff;
            cursor: pointer;
        }
        .about-dialog-close:hover { background: #8b5cf6; }
        .about-dialog-x {
            position: absolute;
            top: 16px;
            right: 16px;
            display: grid;
            width: 36px;
            height: 36px;
            place-items: center;
            border: 1px solid rgba(255, 255, 255, .12);
            border-radius: 9px;
            background: rgba(255, 255, 255, .06);
            color: #fff;
            cursor: pointer;
            font-size: 1.25rem;
        }
        body[dir="rtl"] .about-dialog h2 { margin-right: 0; margin-left: 42px; }
        body[dir="rtl"] .about-dialog-x { right: auto; left: 16px; }
        @media (max-width: 420px) {
            .about-button { padding: 8px; }
            .about-button span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
            .about-dialog { padding: 24px 20px; }
        }
        .sidebar .nav-menu {
            width: 100%;
        }
        .sidebar .nav-menu a {
            display: flex;
            min-height: 42px;
            align-items: center;
            gap: 12px;
            padding: 9px 8px;
            border-radius: 8px;
            text-decoration: none;
        }
        .sidebar .nav-icon {
            display: block;
            width: 24px;
            height: 24px;
            flex: 0 0 24px;
            object-fit: contain;
            filter: invert(83%) sepia(13%) saturate(1046%) hue-rotate(207deg) brightness(102%) contrast(96%);
        }
        .sidebar .nav-menu a:hover,
        .sidebar .nav-menu a.active {
            background: rgba(167, 139, 250, .12);
        }
        .sidebar .nav-label {
            min-width: 0;
        }
        .sidebar-toggle {
            display: grid;
            width: 44px;
            height: 44px;
            margin: auto auto 0;
            padding: 11px 9px;
            align-content: center;
            gap: 5px;
            border: 1px solid rgba(255, 255, 255, .12);
            border-radius: 10px;
            background: rgba(255, 255, 255, .06);
            cursor: pointer;
            transition: background .2s ease, border-color .2s ease;
        }
        .sidebar-toggle:hover {
            border-color: rgba(167, 139, 250, .55);
            background: rgba(124, 58, 237, .2);
        }
        .sidebar-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            border-radius: 2px;
            background: #ddd6fe;
        }
        .sidebar .nav-menu a:focus-visible,
        .sidebar-toggle:focus-visible {
            outline: 2px solid #c4b5fd;
            outline-offset: 2px;
        }
        body.sidebar-collapsed .sidebar {
            width: 76px;
            padding-right: 12px;
            padding-left: 12px;
        }
        body.sidebar-collapsed .sidebar .logo {
            justify-content: center;
        }
        body.sidebar-collapsed .sidebar .logo-name {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }
        body.sidebar-collapsed .sidebar .nav-menu a {
            justify-content: center;
            padding-right: 0;
            padding-left: 0;
        }
        body.sidebar-collapsed .sidebar .nav-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
            white-space: nowrap;
        }
        body.sidebar-collapsed .sidebar-toggle {
            margin-right: auto;
            margin-left: auto;
        }
        @media (max-width: 650px) {
            body:not(.sidebar-collapsed) .app-container > .sidebar,
            body.sidebar-collapsed .app-container > .sidebar {
                width: 76px;
                padding: 12px 10px;
            }
            .sidebar .logo {
                justify-content: center;
            }
            .sidebar .logo-name {
                position: absolute;
                width: 1px;
                height: 1px;
                overflow: hidden;
                clip-path: inset(50%);
                white-space: nowrap;
            }
            .sidebar .nav-menu a {
                justify-content: center;
                padding-right: 0;
                padding-left: 0;
            }
            .sidebar .nav-label {
                position: absolute;
                width: 1px;
                height: 1px;
                overflow: hidden;
                clip-path: inset(50%);
                white-space: nowrap;
            }
            .sidebar-toggle {
                margin-right: auto;
                margin-left: auto;
            }
            .app-container > .main-content {
                padding: 16px 12px;
            }
        }
        .high-contrast .setting-card, .high-contrast .game-card, .high-contrast .sidebar {
            border: 2px solid #fff !important;
        }
        .high-contrast .setting-card p, .high-contrast .nav-menu a { color: #fff !important; }
        .high-contrast :focus-visible { outline: 3px solid #ffeb3b !important; outline-offset: 3px; }
        .nine-store-intro {
            position: fixed;
            inset: 0;
            z-index: 5000;
            display: grid;
            place-content: center;
            justify-items: center;
            gap: 12px;
            background: radial-gradient(circle at center, rgba(38, 22, 68, .97), rgba(9, 6, 17, .99) 68%);
            color: #fff;
            animation: nine-store-intro-fade .4s ease 4.6s forwards;
        }
        .nine-store-intro-emblem {
            position: relative;
            display: grid;
            width: 176px;
            height: 176px;
            place-items: center;
        }
        .nine-store-intro-ring {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        .nine-store-intro-ring-track,
        .nine-store-intro-ring-progress {
            fill: none;
            stroke-linecap: round;
            transform: rotate(-90deg);
            transform-origin: 90px 90px;
        }
        .nine-store-intro-ring-track {
            stroke: rgba(167, 139, 250, .2);
            stroke-width: 3px;
        }
        .nine-store-intro-ring-progress {
            stroke: #a78bfa;
            stroke-width: 3.5px;
            stroke-dasharray: 339.3;
            stroke-dashoffset: 339.3;
            filter: drop-shadow(0 0 5px rgba(167, 139, 250, .9));
            animation: nine-store-intro-progress 5s linear forwards;
        }
        .nine-store-intro-mark {
            display: grid;
            width: 76px;
            height: 76px;
            place-items: center;
            border: 1px solid rgba(221, 214, 254, .55);
            border-radius: 24px;
            background: linear-gradient(145deg, #a78bfa, #6d28d9 72%);
            box-shadow: 0 0 42px rgba(124, 58, 237, .42);
            color: #fff;
            font-size: 2.8rem;
            font-weight: 800;
            animation: nine-store-intro-pop .68s cubic-bezier(.2, .8, .2, 1) both;
            z-index: 1;
        }
        .nine-store-intro-name {
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: .12em;
            animation: nine-store-intro-rise .5s .12s both;
        }
        .nine-store-intro-countdown {
            display: flex;
            min-width: 92px;
            margin-top: 3px;
            align-items: baseline;
            justify-content: center;
            gap: 6px;
            color: #ddd6fe;
            font-variant-numeric: tabular-nums;
        }
        .nine-store-intro-count {
            min-width: 1.25em;
            font-size: 1.3rem;
            font-weight: 750;
            text-align: center;
        }
        .nine-store-intro-seconds {
            color: rgba(221, 214, 254, .76);
            font-size: .82rem;
        }
        @keyframes nine-store-intro-pop {
            from { opacity: 0; transform: scale(.72) rotate(-8deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes nine-store-intro-rise {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nine-store-intro-progress {
            to { stroke-dashoffset: 0; }
        }
        @keyframes nine-store-intro-fade {
            to { opacity: 0; visibility: hidden; }
        }
        .brick-store-notification-stack {
            position: fixed;
            top: max(18px, env(safe-area-inset-top));
            right: max(18px, env(safe-area-inset-right));
            z-index: 3000;
            display: grid;
            width: min(390px, calc(100vw - 36px));
            gap: 12px;
            pointer-events: none;
        }
        .brick-store-notification {
            overflow: hidden;
            border: 1px solid rgba(167, 139, 250, .55);
            border-radius: 14px;
            background: linear-gradient(145deg, rgba(25, 34, 48, .98), rgba(13, 20, 31, .98));
            box-shadow: 0 16px 42px rgba(0, 0, 0, .48), 0 0 22px rgba(124, 58, 237, .18);
            color: #fff;
            direction: inherit;
            pointer-events: auto;
            animation: brick-store-notification-enter .28s ease-out both;
        }
        .brick-store-notification-header {
            display: flex;
            min-height: 37px;
            padding: 8px 13px;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, .08);
            color: #ddd6fe;
            direction: ltr;
            font-size: .76rem;
            font-weight: 700;
            letter-spacing: .04em;
        }
        .brick-store-notification-header::before {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #a78bfa;
            box-shadow: 0 0 10px rgba(167, 139, 250, .8);
            content: "";
        }
        .brick-store-notification-content {
            display: flex;
            padding: 13px;
            align-items: center;
            gap: 13px;
        }
        .brick-store-notification-image {
            width: 62px;
            height: 62px;
            flex: 0 0 62px;
            border: 1px solid rgba(255, 255, 255, .13);
            border-radius: 10px;
            background: #101722;
            object-fit: cover;
        }
        .brick-store-notification-copy {
            min-width: 0;
            flex: 1;
        }
        .brick-store-notification-title {
            margin: 0 0 4px;
            color: #fff;
            font-size: .98rem;
            font-weight: 700;
            overflow-wrap: anywhere;
        }
        .brick-store-notification-message {
            margin: 0;
            color: #b7c1ce;
            font-size: .84rem;
            line-height: 1.45;
        }
        .brick-store-notification-close {
            width: 30px;
            height: 30px;
            flex: 0 0 30px;
            align-self: flex-start;
            border: 0;
            border-radius: 7px;
            background: transparent;
            color: #aeb8c5;
            cursor: pointer;
            font: inherit;
            font-size: 1.25rem;
            line-height: 1;
        }
        .brick-store-notification-close:hover { background: rgba(255, 255, 255, .1); color: #fff; }
        .brick-store-notification.is-leaving { animation: brick-store-notification-leave .2s ease-in both; }
        @keyframes brick-store-notification-enter {
            from { opacity: 0; transform: translateX(18px) translateY(-8px); }
            to { opacity: 1; transform: translateX(0) translateY(0); }
        }
        @keyframes brick-store-notification-leave {
            to { opacity: 0; transform: translateX(18px); }
        }
        @media (prefers-reduced-motion: reduce) {
            .brick-store-notification, .brick-store-notification.is-leaving { animation: none; }
        }
    `;
    document.head.appendChild(preferenceStyle);

    function setting(key) {
        const value = localStorage.getItem(key);
        return value === null ? defaults[key] : value;
    }

    function maybeRedirectToStartupPage() {
        if (window.location.protocol !== "file:" || document.body.dataset.pageTitle !== "homeTitle") return;
        const currentUrl = new URL(window.location.href);
        const launchedFromStoreLink = currentUrl.searchParams.get("brickStoreNavigate") === "1";
        const navigationEntry = performance.getEntriesByType("navigation")[0];
        const returningToPage = navigationEntry && navigationEntry.type === "back_forward";
        if (launchedFromStoreLink || returningToPage) {
            currentUrl.searchParams.delete("brickStoreNavigate");
            window.history.replaceState(null, "", currentUrl.href);
            return;
        }

        const startupPage = setting("brickStoreStartupPage");
        if (!sharedPreferenceValues.brickStoreStartupPage.includes(startupPage) || startupPage === "index.html") {
            currentUrl.searchParams.set("nineStoreWelcome", "1");
            window.history.replaceState(null, "", currentUrl.href);
            return;
        }
        const targetUrl = new URL(startupPage, window.location.href);
        targetUrl.searchParams.set("lang", getCurrentLanguage());
        targetUrl.searchParams.set("bs", serializeSharedPreferences());
        targetUrl.searchParams.set("nineStoreWelcome", "1");
        window.location.replace(targetUrl.href);
    }

    function initializeWelcomeAnimation() {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.get("nineStoreWelcome") !== "1") return;
        currentUrl.searchParams.delete("nineStoreWelcome");
        window.history.replaceState(null, "", currentUrl.href);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            localStorage.getItem("brickStoreReduceMotion") === "true") return;

        const intro = document.createElement("div");
        intro.className = "nine-store-intro";
        intro.setAttribute("role", "status");
        intro.setAttribute("aria-label", translate("storeName"));

        const emblem = document.createElement("div");
        emblem.className = "nine-store-intro-emblem";
        emblem.setAttribute("aria-hidden", "true");

        const progressRing = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        progressRing.classList.add("nine-store-intro-ring");
        progressRing.setAttribute("viewBox", "0 0 180 180");

        const progressTrack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progressTrack.classList.add("nine-store-intro-ring-track");
        progressTrack.setAttribute("cx", "90");
        progressTrack.setAttribute("cy", "90");
        progressTrack.setAttribute("r", "54");

        const progressLine = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progressLine.classList.add("nine-store-intro-ring-progress");
        progressLine.setAttribute("cx", "90");
        progressLine.setAttribute("cy", "90");
        progressLine.setAttribute("r", "54");
        progressRing.append(progressTrack, progressLine);

        const mark = document.createElement("div");
        mark.className = "nine-store-intro-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = "9";
        emblem.append(progressRing, mark);

        const name = document.createElement("div");
        name.className = "nine-store-intro-name";
        name.dataset.i18n = "storeName";
        name.textContent = translate("storeName");

        const countdown = document.createElement("div");
        countdown.className = "nine-store-intro-countdown";
        const count = document.createElement("span");
        count.className = "nine-store-intro-count";
        count.textContent = "5";
        const seconds = document.createElement("span");
        seconds.className = "nine-store-intro-seconds";
        seconds.textContent = translate("seconds");
        countdown.append(count, seconds);

        intro.append(emblem, name, countdown);
        document.body.appendChild(intro);
        const endTime = Date.now() + 5000;
        const countdownTimer = window.setInterval(() => {
            const remainingSeconds = Math.ceil(Math.max(0, endTime - Date.now()) / 1000);
            count.textContent = String(remainingSeconds);
            if (remainingSeconds === 0) window.clearInterval(countdownTimer);
        }, 250);
        window.setTimeout(() => {
            window.clearInterval(countdownTimer);
            intro.remove();
        }, 5000);
    }

    function playNotificationSound() {
        if (!notificationAudioContext || notificationAudioContext.state !== "running") return;
        const oscillator = notificationAudioContext.createOscillator();
        const gain = notificationAudioContext.createGain();
        oscillator.frequency.value = 880;
        gain.gain.setValueAtTime(0.08, notificationAudioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, notificationAudioContext.currentTime + 0.16);
        oscillator.connect(gain);
        gain.connect(notificationAudioContext.destination);
        oscillator.start();
        oscillator.stop(notificationAudioContext.currentTime + 0.16);
    }

    async function unlockNotificationSound() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error("Audio notifications are not supported.");
        notificationAudioContext = notificationAudioContext || new AudioContext();
        await notificationAudioContext.resume();
    }

    function activityList(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
        } catch (error) {
            console.error(`Could not read ${key}.`, error);
            return [];
        }
    }

    function recordActivity(key, value) {
        if (setting("brickStoreSaveActivity") !== "true" || !value) return;
        const entries = activityList(key).filter(item => item !== value);
        entries.unshift(value);
        localStorage.setItem(key, JSON.stringify(entries.slice(0, 20)));
    }

    function applyPreferences() {
        const root = document.documentElement;
        root.style.setProperty("--brick-store-text-scale", setting("brickStoreTextScale"));
        document.body.classList.toggle("high-contrast", setting("brickStoreHighContrast") === "true");
        document.body.classList.toggle("reduce-motion", setting("brickStoreReduceMotion") === "true");
        applyStorePreferences();
        updateActiveNavigationLink();
        updateSidebarToggle();
        syncNavigationLinks();
        document.dispatchEvent(new CustomEvent("brickStorePreferencesChanged"));
    }

    function updateActiveNavigationLink() {
        const currentPath = window.location.pathname.toLowerCase();
        document.querySelectorAll(".nav-menu a[href]").forEach(link => {
            const linkPath = new URL(link.getAttribute("href"), window.location.href).pathname.toLowerCase();
            const isCurrentPage = linkPath === currentPath;
            link.classList.toggle("active", isCurrentPage);
            if (isCurrentPage) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
    }

    function updateSidebarToggle() {
        const toggle = document.querySelector(".sidebar-toggle");
        if (!toggle) return;
        const isCollapsed = document.body.classList.contains("sidebar-collapsed");
        const label = translate(isCollapsed ? "expandSidebar" : "collapseSidebar");
        toggle.setAttribute("aria-expanded", String(!isCollapsed));
        toggle.setAttribute("aria-label", label);
        toggle.title = label;
        document.querySelectorAll(".sidebar .nav-menu a[data-nav-icon]").forEach(link => {
            const labelElement = link.querySelector(".nav-label");
            if (!labelElement) return;
            link.setAttribute("aria-label", labelElement.textContent.trim());
            link.title = labelElement.textContent.trim();
        });
    }

    function initializeSidebar() {
        if (!document.querySelector(".sidebar-toggle")) return;
        document.body.classList.toggle("sidebar-collapsed", localStorage.getItem("nineStoreSidebarCollapsed") === "true");
        updateSidebarToggle();
        document.querySelector(".sidebar-toggle").addEventListener("click", () => {
            const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
            localStorage.setItem("nineStoreSidebarCollapsed", String(isCollapsed));
            updateSidebarToggle();
        });
    }

    function initializeAboutDialog() {
        const topBar = document.querySelector(".top-bar");
        if (!topBar) return;

        const button = document.createElement("button");
        button.className = "about-button";
        button.type = "button";
        button.dataset.i18nAttr = "aria-label:about,title:about";
        button.setAttribute("aria-label", translate("about"));
        button.title = translate("about");

        const icon = document.createElement("img");
        icon.src = "store/svg/about.svg";
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");

        const label = document.createElement("span");
        label.dataset.i18n = "about";
        label.textContent = translate("about");
        button.append(icon, label);

        const overlay = document.createElement("div");
        overlay.className = "about-overlay";
        overlay.hidden = true;
        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeDialog();
        });

        const dialog = document.createElement("section");
        dialog.className = "about-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-labelledby", "aboutDialogTitle");
        dialog.setAttribute("aria-describedby", "aboutDialogMessage");

        const closeIcon = document.createElement("button");
        closeIcon.className = "about-dialog-x";
        closeIcon.type = "button";
        closeIcon.textContent = "×";
        closeIcon.dataset.i18nAttr = "aria-label:closeAbout";
        closeIcon.setAttribute("aria-label", translate("closeAbout"));

        const title = document.createElement("h2");
        title.id = "aboutDialogTitle";
        title.dataset.i18n = "aboutTitle";
        title.textContent = translate("aboutTitle");

        const message = document.createElement("p");
        message.id = "aboutDialogMessage";
        message.dataset.i18n = "aboutMessage";
        message.textContent = translate("aboutMessage");

        const closeButton = document.createElement("button");
        closeButton.className = "about-dialog-close";
        closeButton.type = "button";
        closeButton.dataset.i18n = "closeAbout";
        closeButton.textContent = translate("closeAbout");

        dialog.append(closeIcon, title, message, closeButton);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        topBar.appendChild(button);

        function closeDialog() {
            overlay.hidden = true;
            button.focus();
        }

        function openDialog() {
            overlay.hidden = false;
            closeButton.focus();
        }

        button.addEventListener("click", openDialog);
        closeIcon.addEventListener("click", closeDialog);
        closeButton.addEventListener("click", closeDialog);
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && !overlay.hidden) closeDialog();
        });
    }

    function readSharedPreferencesFromUrl() {
        if (window.location.protocol !== "file:") return;
        const serialized = new URLSearchParams(window.location.search).get("bs");
        if (!serialized) return;
        try {
            const shared = JSON.parse(serialized);
            if (!shared || typeof shared !== "object" || Array.isArray(shared)) return;
            Object.entries(shared).forEach(([key, value]) => {
                if (typeof value !== "string") return;
                if (sharedPreferenceValues[key] && !sharedPreferenceValues[key].includes(value)) return;
                if (key === "brickStoreBackgroundSource" && !isValidSharedBackgroundSource(value)) return;
                localStorage.setItem(key, value);
            });
            if (localStorage.getItem("brickStoreBackgroundMode") === "custom" &&
                !localStorage.getItem("brickStoreBackgroundSource")) {
                localStorage.setItem("brickStoreBackgroundMode", "animated");
            }
        } catch (error) {
            console.error("Could not read shared Nine Store preferences from the page link.", error);
        }
    }

    function isValidBackgroundUrl(value) {
        try {
            const source = JSON.parse(value);
            const sourceUrl = new URL(source.url);
            return source.kind === "url" && ["video", "gif"].includes(source.type) &&
                ["http:", "https:"].includes(sourceUrl.protocol);
        } catch (error) {
            return false;
        }
    }

    function isValidSharedBackgroundSource(value) {
        try {
            const source = JSON.parse(value);
            return source.kind === "upload"
                ? ["video", "gif"].includes(source.type)
                : isValidBackgroundUrl(value);
        } catch (error) {
            return false;
        }
    }

    function syncNavigationLinks() {
        if (window.location.protocol !== "file:") return;
        const serialized = serializeSharedPreferences();
        document.querySelectorAll("a[href]").forEach(link => {
            const targetUrl = new URL(link.getAttribute("href"), window.location.href);
            if (targetUrl.protocol !== "file:" || !/\.html$/i.test(targetUrl.pathname)) return;
            targetUrl.searchParams.set("lang", getCurrentLanguage());
            targetUrl.searchParams.set("brickStoreNavigate", "1");
            if (serialized.length < 4000) targetUrl.searchParams.set("bs", serialized);
            else targetUrl.searchParams.delete("bs");
            link.href = targetUrl.href;
        });
    }

    document.addEventListener("click", event => {
        if (!(event.target instanceof Element) || !event.target.closest("a[href]")) return;
        syncNavigationLinks();
    }, true);

    function serializeSharedPreferences() {
        const shared = {};
        sharedPreferenceKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value === null) return;
            if (sharedPreferenceValues[key] && !sharedPreferenceValues[key].includes(value)) return;
            if (key === "brickStoreBackgroundSource" && !isValidSharedBackgroundSource(value)) return;
            shared[key] = value;
        });
        if (shared.brickStoreBackgroundMode === "custom" && !shared.brickStoreBackgroundSource) {
            shared.brickStoreBackgroundMode = "animated";
        }
        return JSON.stringify(shared);
    }

    function applyStorePreferences() {
        const grid = document.getElementById("gamesGrid");
        if (!grid) return;
        const cards = Array.from(grid.querySelectorAll(".game-card"));
        const category = setting("brickStoreHomeCategory");
        cards.forEach(card => {
            const imagePath = card.querySelector("img")?.getAttribute("src") || "";
            const cardCategory = card.dataset.category
                || (imagePath.toLowerCase().includes("img game/") ? "games" : "apps");
            card.classList.toggle("preference-hidden", category !== "all" && category !== cardCategory);
        });
        if (setting("brickStoreSort") === "alphabetical" && document.body.dataset.pageTitle !== "homeTitle") {
            cards.sort((left, right) => {
                const leftName = left.querySelector("h3")?.textContent.trim() || "";
                const rightName = right.querySelector("h3")?.textContent.trim() || "";
                return leftName.localeCompare(rightName, getCurrentLanguage());
            }).forEach(card => grid.appendChild(card));
        }
    }

    function notify(title, name, imageUrl) {
        if (setting("brickStoreCompletionNotifications") !== "true") return;
        showInAppNotification(title, name, imageUrl);
        if ("Notification" in window && Notification.permission === "granted") {
            try {
                new Notification(title, { body: name, icon: imageUrl });
            } catch (error) {
                console.error("Could not display the desktop completion notification.", error);
            }
        }
        if (setting("brickStoreNotificationSound") === "true") {
            try {
                playNotificationSound();
            } catch (error) {
                console.error("Could not play the completion sound.", error);
            }
        }
    }

    function showInAppNotification(title, name, imageUrl) {
        let stack = document.querySelector(".brick-store-notification-stack");
        if (!stack) {
            stack = document.createElement("div");
            stack.className = "brick-store-notification-stack";
            stack.setAttribute("aria-live", "polite");
            stack.setAttribute("aria-relevant", "additions");
            document.body.appendChild(stack);
        }

        const notification = document.createElement("section");
        notification.className = "brick-store-notification";
        notification.setAttribute("role", "status");

        const header = document.createElement("div");
        header.className = "brick-store-notification-header";
        header.textContent = translate("storeName");

        const content = document.createElement("div");
        content.className = "brick-store-notification-content";

        const image = document.createElement("img");
        image.className = "brick-store-notification-image";
        image.alt = name;
        const hasImage = typeof imageUrl === "string" && imageUrl.trim().length > 0;
        if (hasImage) {
            image.src = imageUrl;
            image.addEventListener("error", () => image.remove(), { once: true });
        }

        const copy = document.createElement("div");
        copy.className = "brick-store-notification-copy";
        const productName = document.createElement("h2");
        productName.className = "brick-store-notification-title";
        productName.textContent = name;
        const message = document.createElement("p");
        message.className = "brick-store-notification-message";
        message.textContent = title;
        copy.append(productName, message);

        const close = document.createElement("button");
        close.className = "brick-store-notification-close";
        close.type = "button";
        close.textContent = "×";
        close.setAttribute("aria-label", translate("dismissNotification"));
        close.addEventListener("click", () => dismissNotification(notification), { once: true });

        if (hasImage) content.appendChild(image);
        content.append(copy, close);
        notification.append(header, content);
        stack.appendChild(notification);

        const timeout = window.setTimeout(() => dismissNotification(notification), 6500);
        notification.addEventListener("pointerenter", () => window.clearTimeout(timeout), { once: true });
    }

    function dismissNotification(notification) {
        if (!notification.isConnected) return;
        notification.classList.add("is-leaving");
        notification.addEventListener("animationend", () => notification.remove(), { once: true });
        window.setTimeout(() => notification.remove(), 250);
    }

    const downloadQueue = [];
    let activeDownloads = 0;
    let notificationAudioContext = null;
    function pumpDownloadQueue() {
        const limit = Math.max(1, Math.min(3, Number(setting("brickStoreDownloadConcurrency")) || 1));
        while (activeDownloads < limit && downloadQueue.length) {
            const next = downloadQueue.shift();
            activeDownloads++;
            next().finally(() => {
                activeDownloads--;
                pumpDownloadQueue();
            });
        }
    }

    window.BrickStorePreferences = { recordActivity, notify, applyPreferences, unlockNotificationSound };
    window.BrickStoreDownloads = {
        enqueue(task) {
            return new Promise((resolve, reject) => {
                downloadQueue.push(() => Promise.resolve().then(task).then(resolve, reject));
                pumpDownloadQueue();
            });
        },
        get activeCount() {
            return activeDownloads;
        },
        getArchiveSize(name) {
            return archiveSizes[name] || 0;
        },
        getArchiveUrl(name) {
            const fileName = archiveFiles[name];
            return fileName
                ? new URL(`store/downloads/${encodeURIComponent(fileName)}`, document.baseURI).href
                : null;
        },
        get queuedCount() {
            return downloadQueue.length;
        }
    };

    readSharedPreferencesFromUrl();
    const savedStartupPage = localStorage.getItem("brickStoreStartupPage");
    if (savedStartupPage === "Games.html" || savedStartupPage === "Apps.html") {
        localStorage.setItem("brickStoreStartupPage", savedStartupPage.toLowerCase());
    }
    maybeRedirectToStartupPage();
    initializeWelcomeAnimation();

    document.addEventListener("DOMContentLoaded", () => {
        initializeSidebar();
        initializeAboutDialog();
        applyPreferences();
        document.addEventListener("brickStoreLanguageChanged", applyPreferences);

        document.addEventListener("click", event => {
            const card = event.target.closest?.(".game-card");
            const title = card?.querySelector("h3")?.textContent.trim();
            if (title) recordActivity("brickStoreRecentlyViewed", title);
        });

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            let searchTimer;
            searchInput.addEventListener("input", () => {
                window.clearTimeout(searchTimer);
                searchTimer = window.setTimeout(() => {
                    recordActivity("brickStoreSearchHistory", searchInput.value.trim());
                }, 500);
            });
        }

        initializeSettings();
    });

    function initializeSettings() {
        const textScaleSelect = document.getElementById("textScaleSelect");
        const highContrastToggle = document.getElementById("highContrastToggle");
        const reduceMotionToggle = document.getElementById("reduceMotionToggle");
        const downloadConcurrency = document.getElementById("downloadConcurrency");
        const largeDownloadThreshold = document.getElementById("largeDownloadThreshold");
        const completionNotificationsToggle = document.getElementById("completionNotificationsToggle");
        const notificationSoundToggle = document.getElementById("notificationSoundToggle");
        const saveActivityToggle = document.getElementById("saveActivityToggle");
        const storeSortSelect = document.getElementById("storeSortSelect");
        const storeCategorySelect = document.getElementById("storeCategorySelect");
        const storeMixSelect = document.getElementById("storeMixSelect");
        const startupPageSelect = document.getElementById("startupPageSelect");

        if (!textScaleSelect) return;

        textScaleSelect.value = setting("brickStoreTextScale");
        highContrastToggle.checked = setting("brickStoreHighContrast") === "true";
        reduceMotionToggle.checked = setting("brickStoreReduceMotion") === "true";
        downloadConcurrency.value = setting("brickStoreDownloadConcurrency");
        largeDownloadThreshold.value = setting("brickStoreLargeDownloadThreshold");
        completionNotificationsToggle.checked = setting("brickStoreCompletionNotifications") === "true";
        notificationSoundToggle.checked = setting("brickStoreNotificationSound") === "true";
        saveActivityToggle.checked = setting("brickStoreSaveActivity") === "true";
        storeSortSelect.value = setting("brickStoreSort");
        storeCategorySelect.value = setting("brickStoreHomeCategory");
        storeMixSelect.value = setting("brickStoreHomeMix");
        startupPageSelect.value = setting("brickStoreStartupPage");

        textScaleSelect.addEventListener("change", () => savePreference("brickStoreTextScale", textScaleSelect.value));
        highContrastToggle.addEventListener("change", () => savePreference("brickStoreHighContrast", String(highContrastToggle.checked)));
        reduceMotionToggle.addEventListener("change", () => savePreference("brickStoreReduceMotion", String(reduceMotionToggle.checked)));
        downloadConcurrency.addEventListener("change", () => savePreference("brickStoreDownloadConcurrency", downloadConcurrency.value));
        largeDownloadThreshold.addEventListener("change", () => savePreference("brickStoreLargeDownloadThreshold", largeDownloadThreshold.value));
        storeSortSelect.addEventListener("change", () => savePreference("brickStoreSort", storeSortSelect.value));
        storeCategorySelect.addEventListener("change", () => savePreference("brickStoreHomeCategory", storeCategorySelect.value));
        storeMixSelect.addEventListener("change", () => savePreference("brickStoreHomeMix", storeMixSelect.value));
        startupPageSelect.addEventListener("change", () => savePreference("brickStoreStartupPage", startupPageSelect.value));

        saveActivityToggle.addEventListener("change", () => {
            savePreference("brickStoreSaveActivity", String(saveActivityToggle.checked));
            if (!saveActivityToggle.checked) {
                localStorage.removeItem("brickStoreSearchHistory");
                localStorage.removeItem("brickStoreRecentlyViewed");
            }
            renderActivityHistory();
        });

        completionNotificationsToggle.addEventListener("change", () => {
            savePreference("brickStoreCompletionNotifications", String(completionNotificationsToggle.checked));
            showSettingsFeedback("notificationFeedback", completionNotificationsToggle.checked
                ? translate("inAppNotificationsEnabled")
                : translate("inAppNotificationsDisabled"));
        });
        notificationSoundToggle.addEventListener("change", async () => {
            if (notificationSoundToggle.checked) {
                try {
                    await unlockNotificationSound();
                } catch (error) {
                    notificationSoundToggle.checked = false;
                    console.error("Could not enable notification sounds.", error);
                    showSettingsFeedback("notificationFeedback", translate("notificationSoundUnsupported"), true);
                    return;
                }
            }
            savePreference("brickStoreNotificationSound", String(notificationSoundToggle.checked));
        });

        document.getElementById("enableNotificationsBtn").addEventListener("click", async () => {
            if (!("Notification" in window)) {
                showSettingsFeedback("notificationFeedback", translate("notificationsUnsupported"), true);
                return;
            }
            try {
                const permission = Notification.permission === "default"
                    ? await Notification.requestPermission()
                    : Notification.permission;
                showSettingsFeedback("notificationFeedback", permission === "granted"
                    ? translate("notificationsEnabled")
                    : translate("notificationsDenied"), permission !== "granted");
            } catch (error) {
                console.error("Could not request desktop notification permission.", error);
                showSettingsFeedback("notificationFeedback", translate("notificationsDenied"), true);
            }
        });

        document.getElementById("clearSearchHistoryBtn").addEventListener("click", () => {
            localStorage.removeItem("brickStoreSearchHistory");
            renderActivityHistory();
            showSettingsFeedback("privacyFeedback", translate("searchHistoryCleared"));
        });
        document.getElementById("clearRecentHistoryBtn").addEventListener("click", () => {
            localStorage.removeItem("brickStoreRecentlyViewed");
            renderActivityHistory();
            showSettingsFeedback("privacyFeedback", translate("recentHistoryCleared"));
        });
        document.getElementById("clearStoreDataBtn").addEventListener("click", clearStoreData);
        document.getElementById("exportSettingsBtn").addEventListener("click", exportSettings);
        document.getElementById("importSettingsInput").addEventListener("change", importSettings);
        renderActivityHistory();
        updateStorageEstimate();
    }

    function renderActivityHistory() {
        const lists = [
            ["searchHistoryList", "brickStoreSearchHistory", "noSearchHistory"],
            ["recentHistoryList", "brickStoreRecentlyViewed", "noRecentHistory"]
        ];
        lists.forEach(([elementId, storageKey, emptyKey]) => {
            const list = document.getElementById(elementId);
            if (!list) return;
            list.replaceChildren();
            const entries = activityList(storageKey);
            if (!entries.length) {
                const emptyItem = document.createElement("li");
                emptyItem.className = "history-empty";
                emptyItem.textContent = translate(emptyKey);
                list.appendChild(emptyItem);
                return;
            }
            entries.forEach(entry => {
                const item = document.createElement("li");
                item.textContent = entry;
                list.appendChild(item);
            });
        });
    }

    function savePreference(key, value) {
        localStorage.setItem(key, value);
        applyPreferences();
    }

    function showSettingsFeedback(id, message, isError = false) {
        const element = document.getElementById(id);
        if (!element) return;
        element.textContent = message;
        element.dataset.error = String(isError);
    }

    async function updateStorageEstimate() {
        const element = document.getElementById("browserStorageInfo");
        const libraryElement = document.getElementById("libraryArchiveInfo");
        if (!element || !libraryElement) return;
        let knownArchives;
        let libraryEstimateAvailable = true;
        try {
            const library = JSON.parse(localStorage.getItem("brickStoreLibrary") || "[]");
            if (!Array.isArray(library)) throw new Error("Library data is not a list.");
            knownArchives = library.filter(item => item && Object.prototype.hasOwnProperty.call(archiveSizes, item.name));
        } catch (error) {
            console.error("Could not estimate the bundled archive sizes in the library.", error);
            libraryElement.textContent = translate("libraryArchiveEstimateUnavailable");
            knownArchives = [];
            libraryEstimateAvailable = false;
        }
        const archiveBytes = knownArchives.reduce((total, item) => total + archiveSizes[item.name], 0);
        if (libraryEstimateAvailable) {
            libraryElement.textContent = translate("libraryArchiveEstimate")
                .replace("{used}", (archiveBytes / (1024 * 1024)).toFixed(1))
                .replace("{count}", knownArchives.length);
        }
        if (!navigator.storage?.estimate) {
            element.textContent = translate("storageEstimateUnavailable");
            return;
        }
        try {
            const { usage, quota } = await navigator.storage.estimate();
            const used = Math.round((usage || 0) / (1024 * 1024));
            const total = Math.round((quota || 0) / (1024 * 1024));
            element.textContent = translate("storageEstimate").replace("{used}", used).replace("{total}", total);
        } catch (error) {
            console.error("Could not estimate browser storage usage.", error);
            element.textContent = translate("storageEstimateUnavailable");
        }
    }

    async function clearStoreData() {
        if (!window.confirm(translate("clearStoreDataConfirm"))) return;
        for (const key of Object.keys(localStorage)) {
            if (key.startsWith("brickStore")) localStorage.removeItem(key);
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("lang");
        window.history.replaceState(null, "", currentUrl.href);
        document.querySelectorAll(".nav-menu a[href]").forEach(link => {
            const targetUrl = new URL(link.href);
            targetUrl.searchParams.delete("lang");
            link.href = targetUrl.href;
        });
        const languageSelect = document.getElementById("languageSelect");
        if (languageSelect) languageSelect.value = "en";
        applyGlobalLanguage();
        renderActivityHistory();
        updateStorageEstimate();
        window.BrickStoreBackground.applySavedBackground();
        if (!("indexedDB" in window)) {
            showSettingsFeedback("privacyFeedback", translate("storeDataPartiallyCleared"), true);
            applyPreferences();
            return;
        }
        await new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase("brickStoreBackgrounds");
            request.addEventListener("success", resolve, { once: true });
            request.addEventListener("error", () => reject(request.error), { once: true });
            request.addEventListener("blocked", () => reject(new Error("Background storage is currently in use.")), { once: true });
        }).then(() => {
            showSettingsFeedback("privacyFeedback", translate("storeDataCleared"));
        }).catch(error => {
            console.error("Could not completely clear local application data.", error);
            showSettingsFeedback("privacyFeedback", translate("storeDataPartiallyCleared"), true);
        });
        applyPreferences();
    }

    function exportSettings() {
        const settings = {};
        preferenceKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value !== null && key !== "brickStoreBackgroundSource") settings[key] = value;
        });
        try {
            const source = JSON.parse(localStorage.getItem("brickStoreBackgroundSource") || "null");
            if (source?.kind === "url" && /^https?:$/.test(new URL(source.url).protocol)) {
                settings.brickStoreBackgroundSource = JSON.stringify(source);
            } else if (source?.kind === "upload") {
                settings.brickStoreBackgroundMode = "animated";
            }
        } catch (error) {
            console.error("Could not include the custom background URL in the settings backup.", error);
        }
        const file = new Blob([JSON.stringify({ format: "brick-store-settings", version: 1, settings }, null, 2)], {
            type: "application/json"
        });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "brick-store-settings.json";
        link.click();
        URL.revokeObjectURL(url);
        showSettingsFeedback("backupFeedback", translate("settingsExported"));
    }

    async function importSettings(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const data = JSON.parse(await file.text());
            if (data.format !== "brick-store-settings" || data.version !== 1 || !data.settings || typeof data.settings !== "object") {
                throw new Error("Unsupported settings file.");
            }
            const validValues = {
                brickStoreLang: ["en", "ar", "fr", "es", "de", "ru", "tr", "zh", "ja", "ko", "nk"],
                brickStoreBackgroundMode: ["animated", "custom"],
                brickStoreTextScale: ["1", "1.1", "1.2"],
                brickStoreHighContrast: ["true", "false"],
                brickStoreReduceMotion: ["true", "false"],
                brickStoreDownloadConcurrency: ["1", "2", "3"],
                brickStoreLargeDownloadThreshold: ["0", "50", "100", "200"],
                brickStoreCompletionNotifications: ["true", "false"],
                brickStoreNotificationSound: ["true", "false"],
                brickStoreSaveActivity: ["true", "false"],
                brickStoreSort: ["recommended", "alphabetical"],
                brickStoreHomeCategory: ["all", "games", "apps"],
                brickStoreHomeMix: ["balanced", "games", "apps"],
                brickStoreStartupPage: ["index.html", "games.html", "apps.html", "Library.html", "Brick.html"]
            };
            const accepted = {};
            preferenceKeys.forEach(key => {
                const value = data.settings[key];
                if (typeof value !== "string") return;
                if (validValues[key] && !validValues[key].includes(value)) return;
                if (key === "brickStoreBackgroundSource") {
                    try {
                        const source = JSON.parse(value);
                        const sourceUrl = new URL(source.url);
                        if (source.kind !== "url" || !["video", "gif"].includes(source.type) ||
                            !["http:", "https:"].includes(sourceUrl.protocol)) return;
                    } catch (error) {
                        return;
                    }
                }
                accepted[key] = value;
            });
            if (!Object.keys(accepted).length) throw new Error("No recognized preferences were found.");
            if (accepted.brickStoreBackgroundMode === "custom" && !accepted.brickStoreBackgroundSource) {
                accepted.brickStoreBackgroundMode = "animated";
            }
            if (!window.confirm(translate("importSettingsConfirm"))) return;
            Object.entries(accepted).forEach(([key, value]) => localStorage.setItem(key, value));
            const languageSelect = document.getElementById("languageSelect");
            if (languageSelect) languageSelect.value = localStorage.getItem("brickStoreLang") || "en";
            showSettingsFeedback("backupFeedback", translate("settingsImported"));
            applyPreferences();
            if (window.location.protocol === "file:") {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set("lang", localStorage.getItem("brickStoreLang") || "en");
                window.history.replaceState(null, "", currentUrl.href);
            }
            applyGlobalLanguage();
            document.dispatchEvent(new CustomEvent("brickStoreSettingsImported"));
            document.dispatchEvent(new CustomEvent("brickStoreLanguageChanged"));
        } catch (error) {
            console.error("Could not import settings.", error);
            showSettingsFeedback("backupFeedback", translate("settingsImportFailed"), true);
        } finally {
            event.target.value = "";
        }
    }
})();
