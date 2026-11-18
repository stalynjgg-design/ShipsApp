
/* =================================
   SHIPSAPP - MEDIA
================================= */

const Media = {

    validate(file) {

        if (!file) return false;

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "video/mp4",
            "video/webm"
        ];

        if (!allowed.includes(file.type)) {
            alert("Formato de archivo no permitido.");
            return false;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("El archivo supera los 10 MB.");
            return false;
        }

        return true;

    },

    preview(file, container) {

        if (!this.validate(file)) return;

        const url = URL.createObjectURL(file);

        container.replaceChildren();

        let element;

        if (file.type.startsWith("image/")) {

            element = document.createElement("img");
            element.alt = "Vista previa";
            element.src = url;

        } else {

            element = document.createElement("video");
            element.src = url;
            element.controls = true;

        }

        element.className = "media-preview";

        container.appendChild(element);

        element.addEventListener("load", () => {
            URL.revokeObjectURL(url);
        }, { once: true });

        element.addEventListener("error", () => {
            URL.revokeObjectURL(url);
        }, { once: true });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("mediaInput");

    const button =
        document.getElementById("attachmentButton");

    if (!input || !button) return;

    button.addEventListener("click", () => {
        input.click();
    });

    input.addEventListener("change", () => {

        const file = input.files[0];

        if (!file) return;

        if (Media.validate(file)) {
            console.log("Archivo seleccionado:", file.name);
        }

    });

});
