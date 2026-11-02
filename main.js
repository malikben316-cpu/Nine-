document.addEventListener("DOMContentLoaded", () => {
    
    const gridContainerElement = document.getElementById("gamesGrid") || document.getElementById("appsGrid") || document.getElementById("productsGrid");
    
    if (gridContainerElement) {
        let cardsArray = Array.from(gridContainerElement.querySelectorAll(".game-card"));
        
        if (localStorage.getItem("brickStoreSort") === "alphabetical") {
            cardsArray.sort((left, right) => {
                const leftName = left.querySelector("h3")?.textContent.trim() || "";
                const rightName = right.querySelector("h3")?.textContent.trim() || "";
                return leftName.localeCompare(rightName);
            });
        } else {
            for (let i = cardsArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
            }
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
            noResultMsg.textContent = translate("notAvailable");
            noResultMsg.setAttribute("data-i18n", "notAvailable");
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
                        card.style.display = card.classList.contains("preference-hidden") ? "none" : "flex";
                        if (!card.classList.contains("preference-hidden")) visibleCount++;
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

});
