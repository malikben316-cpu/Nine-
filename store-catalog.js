(() => {
    const catalog = [
        { name: "Minecraft", image: "store/img game/minecraft.png", category: "games" },
        { name: "Valorant", image: "store/img game/valorant.png", category: "games" },
        { name: "Geometry Dash", image: "store/img game/geometry dash.jpg", category: "games" },
        { name: "MECCHA CHAMELEON", image: "store/img game/MECCHA CHAMELEON.jpg", category: "games" },
        { name: "Hollow Knight Silksong", image: "store/img game/hollow.png", category: "games" },
        { name: "Among Us", image: "store/img game/among us.jpg", category: "games" },
        { name: "TLauncher", image: "store/img game/TLauncher.png", category: "games" },
        { name: "Poki JP", image: "store/img game/poki.jpg", category: "games" },
        { name: "Terraria", image: "store/img game/terraria.jpg", category: "games" },
        { name: "skate.", image: "store/img game/skate.jpg", category: "games" },
        { name: "VScode", image: "store/img apps/vscode.png", category: "apps" },
        { name: "VirtualBox", image: "store/img apps/VirtualBox.png", category: "apps" },
        { name: "Google Chrome", image: "store/img apps/googel.png", category: "apps" },
        { name: "Epic Games", image: "store/img apps/epic.png", category: "apps" },
        { name: "Unity Hub", image: "store/img apps/unity.png", category: "apps" },
        { name: "Krita", image: "store/img apps/krita.png", category: "apps" },
        { name: "Hydra Launcher", image: "store/img apps/Hydra launche.jpg", category: "apps" },
        { name: "Steam", image: "store/img game/Steam.jpg", category: "apps" },
        { name: "Twitch", image: "store/img apps/twitch.jpg", category: "apps" },
        { name: "Photopea", image: "store/img apps/Photopea.png", category: "apps" },
        { name: "MediBang Paint Pro", image: "store/img apps/MediBang Paint Pro.jpg", category: "apps" },
    ];

    document.addEventListener("DOMContentLoaded", () => {
        const grid = document.getElementById("gamesGrid")
            || document.getElementById("appsGrid")
            || document.getElementById("productsGrid");
        if (!grid) return;

        const pageCategory = grid.id === "gamesGrid" && document.body.dataset.pageTitle === "gamesTitle"
            ? "games"
            : grid.id === "appsGrid" ? "apps" : null;
        const products = pageCategory
            ? catalog.filter(product => product.category === pageCategory)
            : catalog;

        const cards = products.map(product => {
            const card = document.createElement("div");
            card.className = "game-card";
            card.dataset.category = product.category;

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;

            const title = document.createElement("h3");
            title.textContent = product.name;

            const badge = document.createElement("span");
            badge.className = "badge-free";
            badge.dataset.i18n = "free";
            badge.textContent = translate("free");

            const button = document.createElement("a");
            button.className = "btn-download";
            button.href = `store/downloads/${encodeURIComponent(product.name + ".zip")}`;
            button.download = product.name + ".zip";
            button.dataset.i18n = "download";
            button.textContent = translate("download");

            card.append(image, title, badge, button);
            return card;
        });
        grid.replaceChildren(...cards);
    });
})();
