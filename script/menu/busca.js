export function initBusca(buscaCache) {

    document.getElementById("buscaGlobal")
        .addEventListener("input", (e) => {

            const termo = e.target.value.toLowerCase();
            const resultadoDiv = document.getElementById("resultadoBusca");

            if (!termo) {
                resultadoDiv.innerHTML = "";
                return;
            }

            const filtradas = buscaCache.filter(f =>
                f.nome.toLowerCase().includes(termo)
            );

            renderBuscaGlobal(filtradas);
        });
}

function renderBuscaGlobal(fichas) {
    const div = document.getElementById("resultadoBusca");
    div.innerHTML = "";

    fichas.forEach(ficha => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("preview");

        const src = ficha.dados?.foto?.valor;
        img.src = src || "https://via.placeholder.com/50";

        const info = document.createElement("div");

        const nome = document.createElement("div");
        nome.textContent = ficha.nome;

        const pasta = document.createElement("small");
        pasta.textContent = `📁 ${ficha.pastas?.nome || "Sem pasta"}`;

        info.appendChild(nome);
        info.appendChild(pasta);

        card.appendChild(img);
        card.appendChild(info);

        card.addEventListener("click", () => {
            localStorage.setItem("fichaId", ficha.id);
            localStorage.setItem("pastaId", ficha.pasta_id);

            window.location.href = "ficha.html";
        });

        div.appendChild(card);
    });
}