
/* =================================
   SHIPSAPP - CALLS
================================= */

const Calls = {

    currentCall: null,

    start(type, contact) {

        if (this.currentCall) {
            alert("Ya tienes una llamada activa.");
            return;
        }

        this.currentCall = {
            id: crypto.randomUUID(),
            type,
            contact,
            startedAt: new Date().toISOString(),
            status: "connecting"
        };

        console.log("Llamada preparada:", this.currentCall);

        alert(
            type === "video"
                ? "Interfaz de videollamada preparada."
                : "Interfaz de llamada preparada."
        );

    },

    end() {

        if (!this.currentCall) return;

        this.currentCall = null;

        console.log("Llamada finalizada.");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("voiceCallButton")
        ?.addEventListener("click", () => {

            const contact =
                document.getElementById("contactName")?.textContent;

            Calls.start("voice", contact);

        });

    document.getElementById("videoCallButton")
        ?.addEventListener("click", () => {

            const contact =
                document.getElementById("contactName")?.textContent;

            Calls.start("video", contact);

        });

});
