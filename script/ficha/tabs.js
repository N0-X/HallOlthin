function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // 🔥 Atualizações ao trocar de aba
    if (typeof atualizarModificadores === "function") atualizarModificadores();
    if (typeof atualizarPericias === "function") atualizarPericias();
    if (typeof iniciarResources === "function") iniciarResources();
}

function setupAttributeToggles() {
    document.querySelectorAll(".attribute-header").forEach(header => {
        header.addEventListener("click", () => {
            const attribute = header.parentElement;
            attribute.classList.toggle("open");
        });
    });
}

function addItem(listId) {
    const list = document.getElementById(listId);

    const item = document.createElement("div");
    item.className = "field";

    const input = document.createElement("input");
    input.type = "text";

    item.appendChild(input);
    list.appendChild(item);
}

window.onload = function () {
    document.querySelector(".tablinks").click();

    setupAttributeToggles(); // 👈 importante
};