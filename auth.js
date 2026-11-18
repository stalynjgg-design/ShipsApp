
/* =================================
   SHIPSAPP - AUTHENTICATION
================================= */

const Auth = {

    getUsers() {
        return JSON.parse(
            localStorage.getItem("ships_users") || "[]"
        );
    },

    saveUsers(users) {
        localStorage.setItem(
            "ships_users",
            JSON.stringify(users)
        );
    },

    async hashPassword(password) {
        const data = new TextEncoder().encode(password);

        const hash = await crypto.subtle.digest("SHA-256", data);

        return Array.from(new Uint8Array(hash))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    },

    async register(data) {
        const users = this.getUsers();

        const username = data.username.trim().toLowerCase();

        if (users.some(user => user.username === username)) {
            throw new Error("Este usuario ya existe.");
        }

        const passwordHash = await this.hashPassword(data.password);

        const user = {
            id: crypto.randomUUID(),
            username,
            displayName: data.displayName,
            country: data.country,
            passwordHash,
            photo: "",
            status: "¡Hola! Estoy usando ShipsApp.",
            createdAt: new Date().toISOString()
        };

        users.push(user);

        this.saveUsers(users);

        return user;
    },

    async login(username, password) {
        const users = this.getUsers();

        const passwordHash = await this.hashPassword(password);

        const user = users.find(item =>
            item.username === username.trim().toLowerCase()
            && item.passwordHash === passwordHash
        );

        if (!user) {
            throw new Error("Usuario o contraseña incorrectos.");
        }

        localStorage.setItem("ships_user", user.id);

        return user;
    },

    logout() {
        localStorage.removeItem("ships_user");

        location.href = "login.html";
    },

    getCurrentUser() {
        const id = localStorage.getItem("ships_user");

        return this.getUsers().find(user => user.id === id) || null;
    }

};

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async event => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const error = document.getElementById("loginError");

        try {
            await Auth.login(username, password);

            location.href = "chats.html";

        } catch (err) {
            error.textContent = err.message;
        }
    });

}

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async event => {
        event.preventDefault();

        const error = document.getElementById("registerError");

        try {
            await Auth.register({
                username: document.getElementById("newUsername").value,
                password: document.getElementById("newPassword").value,
                displayName: document.getElementById("displayName").value,
                country: document.getElementById("country").value
            });

            alert("Cuenta creada correctamente.");

            location.href = "login.html";

        } catch (err) {
            error.textContent = err.message;
        }
    });

}

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const input = document.getElementById("password");

        input.type = input.type === "password"
            ? "text"
            : "password";

    });

}

document.querySelectorAll("#logoutButton").forEach(button => {
    button.addEventListener("click", () => Auth.logout());
});
