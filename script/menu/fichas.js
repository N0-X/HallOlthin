import { listarFichas, criarFicha } from "../supabase.js";

export async function carregarFichas(state, abrirFicha) {
    const lista = document.getElementById("listaFichas");
    lista.innerHTML = "";

    const fichas = await listarFichas(state.pastaAtual.id);

    fichas.forEach(ficha => {
        lista.appendChild(criarElementoFicha(ficha, abrirFicha));
    });
}

function criarElementoFicha(ficha, abrirFicha) {
    const container = document.createElement("div");

    const btn = document.createElement("button");
    btn.textContent = ficha.nome;

    btn.addEventListener("click", () => abrirFicha(ficha.id));

    container.appendChild(btn);

    return container;
}

export function novaFicha(state, abrirModal) {
    if (!state.pastaAtual) {
        alert("Selecione uma pasta primeiro!");
        return;
    }

    abrirModal("Nome do personagem:", async (nome) => {

        if (!nome) return;

        const dados = {
            nome: {
                valor: nome,
                tipo: "text"
            }
        };

        const nova = await criarFicha(state.pastaAtual.id, dados);

        localStorage.setItem("fichaId", nova.id);
        localStorage.setItem("pastaId", state.pastaAtual.id);

        window.location.href = "ficha.html";

    }, true);
}

export function abrirFicha(state, id) {
    localStorage.setItem("fichaId", id);
    localStorage.setItem("pastaId", state.pastaAtual.id);

    window.location.href = "ficha.html";
}