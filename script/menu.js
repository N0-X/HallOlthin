import {
    listarPastas,
    criarPasta,
    criarFicha,
    listarFichas,
    deletarPasta,
    buscarFichasGlobal
} from "./supabase.js";

import {
    abrirModal,
    initModal,
} from "./modal.js";

import { 
    initBusca
} from "./busca.js";

const state = {
    pastaAtual: null,
    buscaCache: []
};


// ==========================
// INIT
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btnCriarPasta")
        .addEventListener("click", criarNovaPasta);

    document.getElementById("btnNovaFicha")
        .addEventListener("click", novaFicha);

    document.getElementById("btnVoltar")
        .addEventListener("click", voltarParaPastas);

    carregarPastas();

    initModal();
});

document.addEventListener("DOMContentLoaded", async () => {

    state.buscaCache = await buscarFichasGlobal();

    initBusca(state.buscaCache);
});


// ==========================
// TELAS
// ==========================

function mostrarTelaPastas() {
    document.getElementById("telaPastas").style.display = "block";
    document.getElementById("telaFichas").style.display = "none";
}

function mostrarTelaFichas() {
    document.getElementById("telaPastas").style.display = "none";
    document.getElementById("telaFichas").style.display = "block";
}


// ==========================
// PASTAS
// ==========================

async function carregarPastas() {
    const lista = document.getElementById("listaPastas");
    lista.innerHTML = "";

    const pastas = await listarPastas();

    pastas.forEach(pasta => {

        const container = document.createElement("div");

        const btn = document.createElement("button");
        btn.textContent = pasta.nome;
        btn.addEventListener("click", () => selecionarPasta(pasta));

        container.appendChild(btn);

        document.getElementById("listaPastas").appendChild(container);
    });
}

async function criarNovaPasta() {
    const nome = document.getElementById("novaPastaNome").value;
    const codigo = document.getElementById("novoCodigo").value;

    if (!nome) {
        alert("Digite um nome!");
        return;
    }

    await criarPasta(nome, codigo || null);

    carregarPastas();
}


// ==========================
// SELEÇÃO DE PASTA
// ==========================

function selecionarPasta(pasta) {
    state.pastaAtual = pasta;

    document.getElementById("tituloPasta").textContent = pasta.nome;

    carregarFichas();
    mostrarTelaFichas();
}


// ==========================
// FICHAS
// ==========================

async function carregarFichas() {
    const lista = document.getElementById("listaFichas");
    lista.innerHTML = "";

    const fichas = await listarFichas(state.pastaAtual.id);

    fichas.forEach(ficha => {

        const container = document.createElement("div");

        const btn = document.createElement("button");
        btn.textContent = ficha.nome;

        btn.addEventListener("click", () => abrirFicha(ficha.id));

        container.appendChild(btn);

        document.getElementById("listaFichas").appendChild(container);
    });
}

function novaFicha() {
    if (!state.pastaAtual) {
        alert("Selecione uma pasta primeiro!");
        return;
    }

    abrirModal("Nome do personagem:", async (nome) => {

        if (!nome) return;

        // estrutura mínima inicial
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


// ==========================
// NAVEGAÇÃO
// ==========================

function voltarParaPastas() {
    state.pastaAtual = null;
    mostrarTelaPastas();
}

function abrirFicha(id) {
    localStorage.setItem("fichaId", id);
    localStorage.setItem("pastaId", state.pastaAtual.id);

    window.location.href = "ficha.html";
}
    