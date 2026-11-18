
/* =================================
   SHIPSAPP - FRIENDS
================================= */

const Friends = {

    get(key) {
        return JSON.parse(
            localStorage.getItem(`ships_${key}`) || "[]"
        );
    },

    save(key, data) {
        localStorage.setItem(
            `ships_${key}`,
            JSON.stringify(data)
        );
    },

    search(username) {
        const users = JSON.parse(
            localStorage.getItem("ships_users") || "[]"
        );

        const currentId =
            localStorage.getItem("ships_user");

        return users.filter(user =>
            user.id !== currentId &&
            user.username.includes(username.toLowerCase())
        );
    },

    sendRequest(userId) {
        const requests = this.get("requests");

        const currentId =
            localStorage.getItem("ships_user");

        if (requests.some(request =>
            request.from === currentId &&
            request.to === userId
        )) return;

        requests.push({
            id: crypto.randomUUID(),
            from: currentId,
            to: userId,
            createdAt: new Date().toISOString()
        });

        this.save("requests", requests);
    },

    acceptRequest(requestId) {
        const requests = this.get("requests");

        const request = requests.find(item =>
            item.id === requestId
        );

        if (!request) return;

        const friends = this.get("friends");

        friends.push({
            userId: request.from
        });

        this.save("friends", friends);

        this.save(
            "requests",
            requests.filter(item => item.id !== requestId)
        );

        this.render();
    },

    render() {
        const users = JSON.parse(
            localStorage.getItem("ships_users") || "[]"
        );

        const currentId =
            localStorage.getItem("ships_user");

        const requests = this.get("requests").filter(
            item => item.to === currentId
        );

        const friends = this.get("friends");

        const requestContainer =
            document.getElementById("friendRequests");

        const friendsContainer =
            document.getElementById("friendsList");

        if (requestContainer) {
            requestContainer.replaceChildren();

            requests.forEach(request => {

                const user = users.find(
                    item => item.id === request.from
                );

                if (!user) return;

                const row = document.createElement("div");
                row.className = "friend-item";

                const name = document.createElement("span");
                name.textContent = `@${user.username}`;

                const button = document.createElement("button");
                button.textContent = "Aceptar";

                button.addEventListener("click", () => {
                    this.acceptRequest(request.id);
                });

                row.append(name, button);
                requestContainer.appendChild(row);

            });
        }

        if (friendsContainer) {
            friendsContainer.replaceChildren();

            friends.forEach(friend => {

                const user = users.find(
                    item => item.id === friend.userId
                );

                if (!user) return;

                const row = document.createElement("div");
                row.className = "friend-item";
                row.textContent = `@${user.username}`;

                friendsContainer.appendChild(row);

            });
        }

        document.getElementById("requestCount").textContent =
            requests.length;

        document.getElementById("friendsCount").textContent =
            friends.length;
    }

};

document.addEventListener("DOMContentLoaded", () => {

    Friends.render();

    document.getElementById("friendSearch")
        ?.addEventListener("input", event => {

            const results = document.getElementById("searchResults");

            results.replaceChildren();

            const users = Friends.search(event.target.value);

            users.forEach(user => {

                const row = document.createElement("div");
                row.className = "friend-item";

                const name = document.createElement("span");
                name.textContent = `@${user.username}`;

                const button = document.createElement("button");
                button.textContent = "Agregar";

                button.addEventListener("click", () => {
                    Friends.sendRequest(user.id);
                    button.textContent = "Enviada";
                    button.disabled = true;
                });

                row.append(name, button);
                results.appendChild(row);

            });

        });

});
