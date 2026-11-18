
/* =================================
   SHIPSAPP - GROUPS
================================= */

const Groups = {

    getAll() {
        return JSON.parse(
            localStorage.getItem("ships_groups") || "[]"
        );
    },

    save(groups) {
        localStorage.setItem(
            "ships_groups",
            JSON.stringify(groups)
        );
    },

    create(name, description, photo = "") {

        if (!name.trim()) {
            throw new Error("Escribe un nombre para el grupo.");
        }

        const groups = this.getAll();

        const group = {
            id: crypto.randomUUID(),
            name: name.trim(),
            description: description.trim(),
            photo,
            members: [
                localStorage.getItem("ships_user")
            ],
            createdAt: new Date().toISOString()
        };

        groups.push(group);
        this.save(groups);

        this.render();

        return group;
    },

    render() {

        const container =
            document.getElementById("groupsList");

        if (!container) return;

        const search =
            document.getElementById("groupSearch")
                ?.value.toLowerCase() || "";

        const groups = this.getAll().filter(group =>
            group.name.toLowerCase().includes(search)
        );

        container.replaceChildren();

        if (!groups.length) {

            const empty = document.createElement("p");
            empty.className = "empty-message";
            empty.textContent = "Todavía no tienes grupos.";

            container.appendChild(empty);
            return;
        }

        groups.forEach(group => {

            const card = document.createElement("a");

            card.className = "group-card";
            card.href = `chat.html?group=${encodeURIComponent(group.id)}`;

            const title = document.createElement("h3");
            title.textContent = group.name;

            const description = document.createElement("p");
            description.textContent = group.description;

            const members = document.createElement("small");
            members.textContent =
                `${group.members.length} integrantes`;

            card.append(title, description, members);

            container.appendChild(card);

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    const modal =
        document.getElementById("createGroupModal");

    const openModal = () => {
        modal.hidden = false;
    };

    const closeModal = () => {
        modal.hidden = true;
    };

    document.getElementById("createGroupButton")
        ?.addEventListener("click", openModal);

    document.getElementById("emptyCreateGroupButton")
        ?.addEventListener("click", openModal);

    document.getElementById("closeGroupModal")
        ?.addEventListener("click", closeModal);

    document.getElementById("groupSearch")
        ?.addEventListener("input", () => Groups.render());

    document.getElementById("createGroupForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("groupName").value;

            const description =
                document.getElementById("groupDescription").value;

            try {
                Groups.create(name, description);

                event.target.reset();
                closeModal();

            } catch (error) {
                alert(error.message);
            }

        });

    Groups.render();

});
