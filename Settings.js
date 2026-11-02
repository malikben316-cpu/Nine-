document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("languageSelect");

    const savedLang = getCurrentLanguage();
    if (languageSelect) languageSelect.value = savedLang;

    if (languageSelect) {
        languageSelect.addEventListener("change", (e) => {
            const selectedLang = e.target.value;
            localStorage.setItem("brickStoreLang", selectedLang);
            if (window.location.protocol === "file:") {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set("lang", selectedLang);
                window.history.replaceState(null, "", currentUrl.href);
            }
            applyGlobalLanguage();
            document.dispatchEvent(new CustomEvent("brickStoreLanguageChanged"));
        });
    }
});