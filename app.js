
/* =================================
   SHIPSAPP - MAIN APPLICATION
================================= */

const ShipsApp = {

    version: "1.0.0",

    init() {
        console.log("ShipsApp iniciado");

        this.loadTheme();
        this.checkSession();
        this.setupNavigation();
    },

    loadTheme() {
        const theme = localStorage.getItem("ships_theme") || "dark";

        document.documentElement.dataset.theme = theme;
    },

    checkSession() {
        const user = localStorage.getItem("ships_user");

        const currentPage = location.pathname;

        const publicPages = [
            "index.html",
            "login.html",
            "register.html"
        ];

        const page = currentPage.split("/").pop();

        if (!user && !publicPages.includes(page)) {
            location.href = "login.html";
        }
    },

    setupNavigation() {
        document.querySelectorAll("[data-page]").forEach(link => {
            link.addEventListener("click", () => {
                document.querySelectorAll("[data-page]")
                    .forEach(item => item.classList.remove("active"));

                link.classList.add("active");
            });
        });
    }

};

document.addEventListener("DOMContentLoaded", () => {
    ShipsApp.init();
});
