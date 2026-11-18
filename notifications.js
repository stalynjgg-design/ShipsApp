
/* =================================
   SHIPSAPP - NOTIFICATIONS
================================= */

const Notifications = {

    async requestPermission() {

        if (!("Notification" in window)) {
            return false;
        }

        const permission =
            await Notification.requestPermission();

        return permission === "granted";
    },

    async send(title, message) {

        if (!("Notification" in window)) return;

        if (Notification.permission !== "granted") {
            return;
        }

        new Notification(title, {
            body: message,
            icon: "../assets/images/default-avatar.png"
        });

    },

    isEnabled() {
        return localStorage.getItem(
            "ships_notifications"
        ) !== "false";
    }

};

document.addEventListener("DOMContentLoaded", () => {

    const toggle =
        document.getElementById("notificationsToggle");

    if (!toggle) return;

    toggle.checked = Notifications.isEnabled();

    toggle.addEventListener("change", async () => {

        localStorage.setItem(
            "ships_notifications",
            toggle.checked
        );

        if (toggle.checked) {
            await Notifications.requestPermission();
        }

    });

});
