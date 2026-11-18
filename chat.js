
/* =========================================
   SHIPSAPP - CHAT.JS
   Control de conversaciones individuales
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS HTML
    const messagesContainer = document.getElementById("messagesContainer");
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const emptyChatMessage = document.getElementById("emptyChatMessage");

    const contactName = document.getElementById("contactName");
    const contactStatus = document.getElementById("contactStatus");

    const attachmentButton = document.getElementById("attachmentButton");
    const mediaInput = document.getElementById("mediaInput");
    const audioInput = document.getElementById("audioInput");
    const recordAudioButton = document.getElementById("recordAudioButton");

    const voiceCallButton = document.getElementById("voiceCallButton");
    const videoCallButton = document.getElementById("videoCallButton");

    // IDENTIFICADOR DE LA CONVERSACIÓN
    const params = new URLSearchParams(window.location.search);
    const chatId = params.get("id") || params.get("group") || "general";

    // CLAVE DE ALMACENAMIENTO
    const storageKey = "shipsAppMessages_" + chatId;

    // CARGAR MENSAJES
    let messages = [];

    try {
        messages = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
        messages = [];
        console.error("Error al cargar mensajes:", error);
    }

    // INFORMACIÓN DEL CONTACTO
    if (contactName && params.get("name")) {
        contactName.textContent = params.get("name");
    }

    if (contactStatus) {
        contactStatus.textContent = "Conversación";
    }

    // GUARDAR MENSAJES
    function saveMessages() {
        localStorage.setItem(storageKey, JSON.stringify(messages));
    }

    // CREAR BURBUJA DE MENSAJE
    function renderMessage(message) {

        const messageElement = document.createElement("div");

        messageElement.classList.add("message");

        if (message.sender === "me") {
            messageElement.classList.add("message-sent");
        } else {
            messageElement.classList.add("message-received");
        }

        const content = document.createElement("p");
        content.textContent = message.text;

        const time = document.createElement("small");

        time.textContent = new Date(message.time).toLocaleTimeString(
            "es",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

        messageElement.appendChild(content);
        messageElement.appendChild(time);

        messagesContainer.appendChild(messageElement);
    }

    // MOSTRAR TODOS LOS MENSAJES
    function loadMessages() {

        messagesContainer.querySelectorAll(".message").forEach(element => {
            element.remove();
        });

        messages.forEach(renderMessage);

        if (emptyChatMessage) {
            emptyChatMessage.style.display =
                messages.length === 0 ? "block" : "none";
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ENVIAR MENSAJE
    function sendMessage(text) {

        const cleanText = text.trim();

        if (!cleanText) return;

        const message = {
            id: Date.now(),
            text: cleanText,
            sender: "me",
            time: new Date().toISOString()
        };

        messages.push(message);

        saveMessages();
        loadMessages();
    }

    // EVENTO DEL FORMULARIO
    if (messageForm) {

        messageForm.addEventListener("submit", event => {

            event.preventDefault();

            sendMessage(messageInput.value);

            messageInput.value = "";
            messageInput.focus();

        });

    }

    // ABRIR SELECTOR DE ARCHIVOS
    if (attachmentButton && mediaInput) {

        attachmentButton.addEventListener("click", () => {
            mediaInput.click();
        });

    }

    // SELECCIONAR IMAGEN O VIDEO
    if (mediaInput) {

        mediaInput.addEventListener("change", () => {

            const file = mediaInput.files[0];

            if (!file) return;

            sendMessage("Archivo seleccionado: " + file.name);

            mediaInput.value = "";

        });

    }

    // SELECCIONAR AUDIO
    if (recordAudioButton && audioInput) {

        recordAudioButton.addEventListener("click", () => {
            audioInput.click();
        });

    }

    if (audioInput) {

        audioInput.addEventListener("change", () => {

            const file = audioInput.files[0];

            if (!file) return;

            sendMessage("Audio seleccionado: " + file.name);

            audioInput.value = "";

        });

    }

    // BOTONES DE LLAMADA
    if (voiceCallButton) {

        voiceCallButton.addEventListener("click", () => {
            alert("Las llamadas estarán disponibles cuando conectemos el sistema de llamadas.");
        });

    }

    if (videoCallButton) {

        videoCallButton.addEventListener("click", () => {
            alert("Las videollamadas estarán disponibles cuando conectemos el sistema de llamadas.");
        });

    }

    // INICIAR CHAT
    loadMessages();

});
