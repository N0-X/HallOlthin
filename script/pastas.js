import { listarPastas, criarPasta } from "./supabase.js";

export async function carregarPastas(selecionarPasta) {
    const lista = document.getElementById("listaPastas");
    lista.innerHTML = "";

    const pastas = await listarPastas();

    pastas.forEach(pasta => {
        lista.appendChild(criarElementoPasta(pasta, selecionarPasta));
    });
}

function criarElementoPasta(pasta, selecionarPasta) {
    const container = document.createElement("div");

    const btn = document.createElement("button");
    btn.textContent = pasta.nome;
    btn.addEventListener("click", () => selecionarPasta(pasta));

    container.appendChild(btn);

    return container;
}

export async function criarNovaPasta() {
    const nome = document.getElementById("novaPastaNome").value;
    const codigo = document.getElementById("novoCodigo").value;

    if (!nome) {
        alert("Digite um nome!");
        return;
    }

    await criarPasta(nome, codigo || null);
}