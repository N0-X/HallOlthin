import { buscarFichasGlobal } from "../supabase.js";

import { carregarPastas, criarNovaPasta } from "./pastas.js";
import { carregarFichas, novaFicha, abrirFicha } from "./fichas.js";
import { mostrarTelaPastas, mostrarTelaFichas } from "./ui.js";
import { initModal, abrirModal } from "./modal.js";
import { initBusca } from "./busca.js";

const state = {
    pastaAtual: null,
    buscaCache: []
};

document.addEventListener("DOMContentLoaded", async () => {

    initModal();

    document.getElementById("btnCriarPasta")
        .addEventListener("click", async () => {
            await criarNovaPasta();
            carregarPastas(selecionarPasta);
        });

    document.getElementById("btnNovaFicha")
        .addEventListener("click", () => {
            novaFicha(state, abrirModal);
        });

    document.getElementById("btnVoltar")
        .addEventListener("click", () => {
            state.pastaAtual = null;
            mostrarTelaPastas();
        });

    await carregarPastas(selecionarPasta);

    state.buscaCache = await buscarFichasGlobal();
    initBusca(state.buscaCache);
});

function selecionarPasta(pasta) {
    state.pastaAtual = pasta;

    document.getElementById("tituloPasta").textContent = pasta.nome;

    carregarFichas(state, (id) => abrirFicha(state, id));
    mostrarTelaFichas();
}

