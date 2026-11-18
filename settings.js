
/* =================================
   SHIPSAPP - SETTINGS
================================= */

const Settings = {

    init() {

        this.loadTheme();
        this.loadNotifications();
        this.loadSounds();

        this.setupEvents();

    },

    loadTheme() {

        const theme =
            localStorage.getItem("ships_theme") || "dark";

        const select = document.getElementById("themeSelect");

        if (select) {
            select.value = theme;
        }

        document.documentElement.dataset.theme = theme;

    },

    saveTheme(theme) {

        localStorage.setItem("ships_theme", theme);

        if (theme === "system") {

            const prefersLight = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;

            document.documentElement.dataset.theme =
                prefersLight ? "light" : "dark";

        } else {

            document.documentElement.dataset.theme = theme;

        }

    },

    loadNotifications() {

        const enabled = localStorage.getItem(
            "ships_notifications"
        ) !== "false";

        const toggle =
            document.getElementById("notificationsToggle");

        if (toggle) toggle.checked = enabled;

    },

    loadSounds() {

        const enabled = localStorage.getItem(
            "ships_sounds"
        ) !== "false";

        const toggle =
            document.getElementById("soundsToggle");

        if (toggle) toggle.checked = enabled;

    },

    setupEvents() {

        document.getElementById("themeSelect")
            ?.addEventListener("change", event => {
                this.saveTheme(event.target.value);
            });

        document.getElementById("notificationsToggle")
            ?.addEventListener("change", event => {

                localStorage.setItem(
                    "ships_notifications",
                    event.target.checked
                );

            });

        document.getElementById("soundsToggle")
            ?.addEventListener("change", event => {

                localStorage.setItem(
                    "ships_sounds",
                    event.target.checked
                );

            });

        document.getElementById("logoutButton")
            ?.addEventListener("click", () => {

                localStorage.removeItem("ships_user");

                location.href = "login.html";

            });

    }

};

document.addEventListener("DOMContentLoaded", () => {
    Settings.init();
});
