document.addEventListener("DOMContentLoaded", () => {
    
    const gridContainerElement = document.getElementById("gamesGrid") || document.getElementById("appsGrid") || document.getElementById("productsGrid");
    
    if (gridContainerElement) {
        let cardsArray = Array.from(gridContainerElement.querySelectorAll(".game-card"));
        
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
        
        cardsArray.forEach(card => gridContainerElement.appendChild(card));
    }

    const searchInput = document.getElementById("searchInput");
    
    if (searchInput) {
        const mainContentArea = document.querySelector(".main-content");
        
        let noResultMsg = document.getElementById("noResultMsg");
        if (!noResultMsg && mainContentArea) {
            noResultMsg = document.createElement("div");
            noResultMsg.id = "noResultMsg";
            noResultMsg.textContent = "Not Available";
            noResultMsg.style.cssText = "display: none; color: #888; font-size: 1.1rem; text-align: center; padding: 40px;";
            mainContentArea.appendChild(noResultMsg);
        }

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".game-card");
            let visibleCount = 0;
            
            cards.forEach(card => {
                const titleElement = card.querySelector("h3");
                if (titleElement) {
                    const titleText = titleElement.textContent.toLowerCase();
                    
                    if (titleText.startsWith(query)) {
                        card.style.display = "flex";
                        visibleCount++;
                    } else {
                        card.style.display = "none";
                    }
                }
            });

            if (noResultMsg) {
                if (visibleCount === 0 && query !== "") {
                    noResultMsg.style.display = "block";
                } else {
                    noResultMsg.style.display = "none";
                }
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target && (e.target.classList.contains("btn-start") || e.target.classList.contains("btn-download"))) {
            const button = e.target;
            const card = button.closest(".game-card");
            if (!card) return;

            const titleElement = card.querySelector("h3");
            const imgElement = card.querySelector("img");
            
            if (!titleElement) return;
            
            const appName = titleElement.textContent.trim();
            const appImg = imgElement ? imgElement.getAttribute("src") : "";

            saveToLibrary({ name: appName, img: appImg });

            const originalText = button.textContent;
            button.textContent = "Added ✓";
            button.style.backgroundColor = "#7c3aed";
            button.style.color = "#fff";

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 1500);
        }
    });
});

function saveToLibrary(appData) {
    let library = JSON.parse(localStorage.getItem("brickStoreLibrary")) || [];
    
    const exists = library.some(item => item.name === appData.name);
    if (!exists) {
        library.push(appData);
        localStorage.setItem("brickStoreLibrary", JSON.stringify(library));
    }
}