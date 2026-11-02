(() => {
    const modeKey = "brickStoreBackgroundMode";
    const sourceKey = "brickStoreBackgroundSource";
    const legacyImageKey = "brickStoreBackgroundImage";
    const databaseName = "brickStoreBackgrounds";
    const databaseVersion = 1;
    const mediaStoreName = "media";
    const supportedTypes = new Set([
        "video/mp4",
        "video/webm",
        "video/ogg",
        "image/gif",
        "image/webp"
    ]);
    let activeObjectUrl = null;
    let backgroundApplyVersion = 0;

    function getSavedSource() {
        try {
            return JSON.parse(localStorage.getItem(sourceKey) || "null");
        } catch (error) {
            console.error("Could not read the saved animated background settings.", error);
            return null;
        }
    }

    function openMediaDatabase() {
        return new Promise((resolve, reject) => {
            if (!("indexedDB" in window)) {
                reject(new Error("IndexedDB is unavailable."));
                return;
            }

            const request = indexedDB.open(databaseName, databaseVersion);
            request.addEventListener("upgradeneeded", () => {
                if (!request.result.objectStoreNames.contains(mediaStoreName)) {
                    request.result.createObjectStore(mediaStoreName);
                }
            });
            request.addEventListener("success", () => resolve(request.result), { once: true });
            request.addEventListener("error", () => reject(request.error || new Error("Could not open wallpaper storage.")), { once: true });
        });
    }

    async function readUploadedMedia() {
        const database = await openMediaDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(mediaStoreName, "readonly");
            const request = transaction.objectStore(mediaStoreName).get("custom-background");
            request.addEventListener("success", () => resolve(request.result || null), { once: true });
            request.addEventListener("error", () => reject(request.error || new Error("Could not read the saved background.")), { once: true });
            transaction.addEventListener("complete", () => database.close(), { once: true });
            transaction.addEventListener("abort", () => {
                database.close();
                reject(transaction.error || new Error("Could not read the saved background."));
            }, { once: true });
        });
    }

    async function storeUploadedMedia(file) {
        const database = await openMediaDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(mediaStoreName, "readwrite");
            transaction.objectStore(mediaStoreName).put(file, "custom-background");
            transaction.addEventListener("complete", () => {
                database.close();
                resolve();
            }, { once: true });
            transaction.addEventListener("error", () => {
                database.close();
                reject(transaction.error || new Error("Could not save the selected background."));
            }, { once: true });
            transaction.addEventListener("abort", () => {
                database.close();
                reject(transaction.error || new Error("Could not save the selected background."));
            }, { once: true });
        });
    }

    async function deleteUploadedMedia() {
        const database = await openMediaDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(mediaStoreName, "readwrite");
            transaction.objectStore(mediaStoreName).delete("custom-background");
            transaction.addEventListener("complete", () => {
                database.close();
                resolve();
            }, { once: true });
            transaction.addEventListener("error", () => {
                database.close();
                reject(transaction.error || new Error("Could not remove the saved background."));
            }, { once: true });
            transaction.addEventListener("abort", () => {
                database.close();
                reject(transaction.error || new Error("Could not remove the saved background."));
            }, { once: true });
        });
    }

    function createMediaElement(type, source) {
        let media;
        if (type === "video") {
            media = document.createElement("video");
            media.autoplay = !shouldReduceMotion();
            media.loop = true;
            media.muted = true;
            media.playsInline = true;
        } else {
            media = document.createElement("img");
            media.alt = "";
        }

        media.className = "custom-background-media";
        media.setAttribute("aria-hidden", "true");
        media.src = source;
        return media;
    }

    function showBackgroundError(error) {
        console.error("Could not apply the saved animated background.", error);
    }

    function shouldReduceMotion() {
        return localStorage.getItem("brickStoreReduceMotion") === "true" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function applyMotionPreference() {
        document.querySelectorAll("video.custom-background-media").forEach(video => {
            if (shouldReduceMotion()) {
                video.pause();
            } else if (video.paused) {
                video.play().catch(error => {
                    if (error.name !== "AbortError") showBackgroundError(error);
                });
            }
        });
    }

    async function applySavedBackground() {
        const applyVersion = ++backgroundApplyVersion;
        const background = document.querySelector(".animated-bg");
        if (!background) return;

        const currentMedia = background.querySelector(".custom-background-media");
        if (currentMedia) currentMedia.remove();
        if (activeObjectUrl) {
            URL.revokeObjectURL(activeObjectUrl);
            activeObjectUrl = null;
        }

        const source = getSavedSource();
        if (localStorage.getItem(modeKey) !== "custom" || !source) {
            document.body.classList.remove("custom-background");
            return;
        }

        try {
            let mediaUrl;
            if (source.kind === "url") {
                mediaUrl = source.url;
            } else if (source.kind === "upload") {
                const blob = await readUploadedMedia();
                if (applyVersion !== backgroundApplyVersion) return;
                if (!blob) throw new Error("The saved background file is missing.");
                activeObjectUrl = URL.createObjectURL(blob);
                mediaUrl = activeObjectUrl;
            } else {
                throw new Error("The saved background source is invalid.");
            }

            const media = createMediaElement(source.type, mediaUrl);
            media.addEventListener("error", () => {
                if (!media.isConnected) return;
                media.remove();
                document.body.classList.remove("custom-background");
                localStorage.setItem(modeKey, "animated");
                const modeSelect = document.getElementById("backgroundModeSelect");
                if (modeSelect) modeSelect.value = "animated";
                const feedback = document.getElementById("wallpaperFeedback");
                const error = new Error("The animated background could not be loaded.");
                if (feedback) showFeedback(feedback, translate("wallpaperLoadFailed"), true);
                showBackgroundError(error);
            }, { once: true });
            background.prepend(media);
            document.body.classList.add("custom-background");
            if (media instanceof HTMLVideoElement && !shouldReduceMotion()) {
                media.play().catch(error => {
                    if (media.isConnected && error.name !== "AbortError") showBackgroundError(error);
                });
            }
        } catch (error) {
            if (applyVersion !== backgroundApplyVersion) return;
            document.body.classList.remove("custom-background");
            showBackgroundError(error);
            const feedback = document.getElementById("wallpaperFeedback");
            if (feedback) showFeedback(feedback, translate("wallpaperLoadFailed"), true);
        }
    }

    function showFeedback(element, message, isError) {
        element.textContent = message;
        element.dataset.error = String(isError);
        element.hidden = false;
    }

    function isSupportedMedia(file) {
        if (supportedTypes.has(file.type)) return true;
        return /\.(mp4|webm|ogv|ogg|gif|webp)$/i.test(file.name);
    }

    function getMediaType(file) {
        return file.type.startsWith("video/") || /\.(mp4|webm|ogv|ogg)$/i.test(file.name) ? "video" : "gif";
    }

    function initWallpaperSettings() {
        const modeSelect = document.getElementById("backgroundModeSelect");
        const fileInput = document.getElementById("wallpaperFileInput");
        const dropZone = document.getElementById("wallpaperDropZone");
        const urlInput = document.getElementById("wallpaperUrlInput");
        const urlType = document.getElementById("wallpaperUrlType");
        const applyUrlButton = document.getElementById("applyWallpaperUrlBtn");
        const resetButton = document.getElementById("resetWallpaperBtn");
        const feedback = document.getElementById("wallpaperFeedback");
        if (!modeSelect || !fileInput || !dropZone || !urlInput || !urlType || !applyUrlButton || !resetButton || !feedback) return;

        const source = getSavedSource();
        modeSelect.value = localStorage.getItem(modeKey) === "custom" && source ? "custom" : "animated";
        localStorage.removeItem(legacyImageKey);
        if (source && source.kind === "url") {
            urlInput.value = source.url;
            urlType.value = source.type;
        }

        modeSelect.addEventListener("change", () => {
            if (modeSelect.value === "custom" && !localStorage.getItem(sourceKey)) {
                showFeedback(feedback, translate("selectAnimatedBackgroundFirst"), true);
                modeSelect.value = "animated";
                return;
            }

            localStorage.setItem(modeKey, modeSelect.value);
            feedback.hidden = true;
            applySavedBackground();
        });

        dropZone.addEventListener("click", () => fileInput.click());
        dropZone.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                fileInput.click();
            }
        });
        fileInput.addEventListener("change", () => {
            if (fileInput.files[0]) saveWallpaperFile(fileInput.files[0]);
            fileInput.value = "";
        });

        ["dragenter", "dragover"].forEach(eventName => {
            dropZone.addEventListener(eventName, event => {
                event.preventDefault();
                dropZone.classList.add("drag-over");
            });
        });
        ["dragleave", "drop"].forEach(eventName => {
            dropZone.addEventListener(eventName, event => {
                event.preventDefault();
                dropZone.classList.remove("drag-over");
            });
        });
        dropZone.addEventListener("drop", event => {
            const file = event.dataTransfer.files[0];
            if (file) saveWallpaperFile(file);
        });

        applyUrlButton.addEventListener("click", saveWallpaperUrl);
        urlInput.addEventListener("keydown", event => {
            if (event.key === "Enter") saveWallpaperUrl();
        });
        resetButton.addEventListener("click", resetWallpaper);

        async function saveWallpaperFile(file) {
            if (!isSupportedMedia(file)) {
                showFeedback(feedback, translate("unsupportedAnimatedBackground"), true);
                return;
            }

            try {
                await storeUploadedMedia(file);
                localStorage.setItem(sourceKey, JSON.stringify({ kind: "upload", type: getMediaType(file) }));
                localStorage.setItem(modeKey, "custom");
                modeSelect.value = "custom";
                showFeedback(feedback, translate("animatedBackgroundSaved"), false);
                await applySavedBackground();
            } catch (error) {
                showFeedback(feedback, translate("animatedBackgroundSaveFailed"), true);
                console.error("Could not save the selected animated background.", error);
            }
        }

        async function saveWallpaperUrl() {
            let parsedUrl;
            try {
                parsedUrl = new URL(urlInput.value.trim());
            } catch {
                showFeedback(feedback, translate("invalidBackgroundUrl"), true);
                return;
            }

            if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
                showFeedback(feedback, translate("invalidBackgroundUrl"), true);
                return;
            }

            try {
                if (getSavedSource()?.kind === "upload") await deleteUploadedMedia();
                const mediaType = urlType.value;
                localStorage.setItem(sourceKey, JSON.stringify({ kind: "url", type: mediaType, url: parsedUrl.href }));
                localStorage.setItem(modeKey, "custom");
                modeSelect.value = "custom";
                showFeedback(feedback, translate("animatedBackgroundSaved"), false);
                await applySavedBackground();
            } catch (error) {
                showFeedback(feedback, translate("animatedBackgroundSaveFailed"), true);
                console.error("Could not save the animated background link.", error);
            }
        }

        async function resetWallpaper() {
            try {
                if (getSavedSource()?.kind === "upload") await deleteUploadedMedia();
                localStorage.removeItem(sourceKey);
                localStorage.removeItem(legacyImageKey);
                localStorage.setItem(modeKey, "animated");
                modeSelect.value = "animated";
                urlInput.value = "";
                feedback.hidden = true;
                await applySavedBackground();
            } catch (error) {
                showFeedback(feedback, translate("animatedBackgroundDeleteFailed"), true);
                console.error("Could not restore the original animated background.", error);
            }
        }
    }

    window.BrickStoreBackground = { applySavedBackground };

    document.addEventListener("DOMContentLoaded", () => {
        initWallpaperSettings();
        applySavedBackground();
    });
    document.addEventListener("brickStorePreferencesChanged", applyMotionPreference);
})();
