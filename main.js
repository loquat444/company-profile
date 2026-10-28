
document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu" : "Buka menu"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close menu after clicking a navigation link
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu");
                menuToggle.textContent = "☰";
            });
        });

        // Close menu when switching to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth > 600) {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Buka menu");
                menuToggle.textContent = "☰";
            }
        });
    }

    // =========================
    // DYNAMIC COPYRIGHT YEAR
    // =========================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================
    // PRODUCT CATEGORY FILTER
    // =========================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");
    const emptyMessage = document.getElementById("empty-message");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;
            let visibleProducts = 0;

            // Update active filter button
            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            // Show products matching selected category
            productCards.forEach((card) => {
                const matches =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !matches;

                if (matches) {
                    visibleProducts++;
                }
            });

            // Display message if no products match
            if (emptyMessage) {
                emptyMessage.hidden = visibleProducts > 0;
            }
        });
    });

    // =========================
    // PRODUCT SELECTION
    // =========================

    const productLinks = document.querySelectorAll("[data-product]");
    const contactLink = document.getElementById("contact-link");

    productLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const productName = link.dataset.product;

            if (contactLink && productName) {
                contactLink.href =
                    "mailto:hello@stepney.com?subject=" +
                    encodeURIComponent("Pemesanan " + productName);
            }
        });
    });
});
