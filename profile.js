
/* =================================
   SHIPSAPP - PROFILE
================================= */

const Profile = {

    getUser() {

        const id = localStorage.getItem("ships_user");

        const users = JSON.parse(
            localStorage.getItem("ships_users") || "[]"
        );

        return users.find(user => user.id === id) || null;

    },

    update(data) {

        const users = JSON.parse(
            localStorage.getItem("ships_users") || "[]"
        );

        const id = localStorage.getItem("ships_user");

        const index = users.findIndex(user => user.id === id);

        if (index === -1) return;

        users[index] = {
            ...users[index],
            ...data
        };

        localStorage.setItem(
            "ships_users",
            JSON.stringify(users)
        );

        this.render();

    },

    render() {

        const user = this.getUser();

        if (!user) return;

        document.getElementById("profileName").textContent =
            user.displayName;

        document.getElementById("profileUsername").textContent =
            "@" + user.username;

        document.getElementById("profileCountry").textContent =
            user.country;

        document.getElementById("profileStatus").textContent =
            user.status;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Profile.render();

    document.getElementById("logoutButton")
        ?.addEventListener("click", () => {

            localStorage.removeItem("ships_user");

            location.href = "login.html";

        });

    document.getElementById("editProfileButton")
        ?.addEventListener("click", () => {

            const user = Profile.getUser();

            if (!user) return;

            const name = prompt(
                "Nuevo nombre:",
                user.displayName
            );

            if (name === null || !name.trim()) return;

            const status = prompt(
                "Nuevo estado:",
                user.status
            );

            if (status === null) return;

            Profile.update({
                displayName: name.trim(),
                status: status.trim()
            });

        });

});
