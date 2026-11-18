
/* =================================
   SHIPSAPP - CHATS
================================= */

const Chats = {

    getChats() {
        return JSON.parse(
            localStorage.getItem("ships_chats") || "[]"
        );
    },

    saveChats(chats) {
        localStorage.setItem(
            "ships_chats",
            JSON.stringify(chats)
        );
    },

    render() {
        const list = document.getElementById("chatList");
        if (!list) return;

        const chats = this.getChats();
        const search = document.getElementById("chatSearch")
            ?.value.toLowerCase() || "";

        const filtered = chats.filter(chat =>
            chat.name.toLowerCase().includes(search)
        );

        document.getElementById("chatCount").textContent =
            `${chats.length} conversaciones`;

        list.querySelectorAll(".chat-item").forEach(item => item.remove());

        document.getElementById("emptyChats").hidden =
            filtered.length > 0;

        filtered.forEach(chat => {

            const item = document.createElement("a");
            item.className = "chat-item";
            item.href = `chat.html?id=${encodeURIComponent(chat.id)}`;

            const avatar = document.createElement("div");
            avatar.className = "chat-item-avatar";
            avatar.textContent = "👤";

            const info = document.createElement("div");
            info.className = "chat-item-info";

            const name = document.createElement("h3");
            name.className = "chat-item-name";
            name.textContent = chat.name;

            const preview = document.createElement("p");
            preview.className = "last-message";
            preview.textContent = chat.lastMessage || "Nueva conversación";

            info.append(name, preview);
            item.append(avatar, info);
            list.appendChild(item);
        });
    },

    create(name, userId = "") {
        const chats = this.getChats();

        const chat = {
            id: crypto.randomUUID(),
            name,
            userId,
            lastMessage: "",
            createdAt: new Date().toISOString()
        };

        chats.push(chat);
        this.saveChats(chats);

        this.render();

        return chat;
    }

};

document.addEventListener("DOMContentLoaded", () => {

    Chats.render();

    document.getElementById("chatSearch")
        ?.addEventListener("input", () => Chats.render());

    document.getElementById("newChatButton")
        ?.addEventListener("click", () => {
            location.href = "friends.html";
        });

    document.getElementById("findFriendsButton")
        ?.addEventListener("click", () => {
            location.href = "friends.html";
        });

});
