
/* =================================
   SHIPSAPP - MESSAGES
================================= */

const Messages = {

    getAll() {
        return JSON.parse(
            localStorage.getItem("ships_messages") || "{}"
        );
    },

    getMessages(chatId) {
        return this.getAll()[chatId] || [];
    },

    save(chatId, message) {
        const all = this.getAll();

        if (!all[chatId]) {
            all[chatId] = [];
        }

        all[chatId].push(message);

        localStorage.setItem(
            "ships_messages",
            JSON.stringify(all)
        );

        return message;
    },

    send(chatId, text) {
        if (!text.trim()) return;

        const message = {
            id: crypto.randomUUID(),
            text: text.trim(),
            sender: "me",
            createdAt: new Date().toISOString(),
            read: false
        };

        this.save(chatId, message);
        this.render(chatId);

        return message;
    },

    render(chatId) {
        const container =
            document.getElementById("messagesContainer");

        if (!container) return;

        container.querySelectorAll(".message").forEach(
            message => message.remove()
        );

        const messages = this.getMessages(chatId);

        document.getElementById("emptyChatMessage").hidden =
            messages.length > 0;

        messages.forEach(message => {

            const item = document.createElement("div");

            item.className = `message ${
                message.sender === "me" ? "sent" : "received"
            }`;

            const bubble = document.createElement("div");
            bubble.className = "message-bubble";

            const text = document.createElement("p");
            text.className = "message-text";
            text.textContent = message.text;

            const time = document.createElement("time");

            time.textContent = new Date(
                message.createdAt
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            bubble.append(text, time);
            item.appendChild(bubble);
            container.appendChild(item);

        });

        container.scrollTop = container.scrollHeight;
    }

};

document.addEventListener("DOMContentLoaded", () => {

    const chatId = new URLSearchParams(location.search)
        .get("id");

    if (!chatId) return;

    Messages.render(chatId);

    document.getElementById("messageForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const input =
                document.getElementById("messageInput");

            Messages.send(chatId, input.value);

            input.value = "";
            input.focus();

        });

});
