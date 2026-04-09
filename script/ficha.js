import {
    atualizarFicha,
    buscarFicha,
    deletarFicha
} from "./supabase.js";

import { 
    coletarDados,
    aplicarDados,
    baixarJSON,
    carregarJSON
} from "./savedata.js";

let fichaId = localStorage.getItem("fichaId");


// ==========================
// INIT
// ==========================

document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("btnBaixarFicha")
        .addEventListener("click", baixarJSON);

    document.getElementById("btnDeletarFicha")
        .addEventListener("click", () => {

            abrirModal("Deseja realmente deletar esta ficha?", async () => {

                await deletarFicha(fichaId);

                // limpa estado
                localStorage.removeItem("fichaId");
                localStorage.removeItem("pastaId");

                // volta pro menu
                window.location.href = "index.html";
            });

        });
    
    document.getElementById("btnCarregarFicha")
        .addEventListener("click", carregarJSON)

    if (fichaId) {
        const ficha = await buscarFicha(fichaId);
        aplicarDados(ficha.dados);
    }

    ativarAutoSave();
});


// ==========================
// AUTO SAVE
// ==========================

function ativarAutoSave() {
    const inputs = document.querySelectorAll(".save");

    inputs.forEach(input => {
        input.addEventListener("input", salvarAutomatico);
        input.addEventListener("change", salvarAutomatico);
    });
}

let timeout = null;

function salvarAutomatico() {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
        const dados = coletarDados();

        await atualizarFicha(fichaId, dados);

        console.log("Auto-salvo 💾");
    }, 500); // debounce
}


// ==========================
// VOLTAR
// ==========================

document.getElementById("btnVoltar")
    .addEventListener("click", async () => {

        const dados = coletarDados();
        await atualizarFicha(fichaId, dados);

        window.location.href = "index.html";
    });

// ==========================
// MODAL (copiado do menu)
// ==========================

let callbackConfirmar = null;
let usandoInput = false;

function abrirModal(texto, onConfirm, usarInput = false) {
    document.getElementById("modalTexto").textContent = texto;

    const input = document.getElementById("modalInput");

    usandoInput = usarInput;

    if (usarInput) {
        input.style.display = "block";
        input.value = "";
        input.focus();
    } else {
        input.style.display = "none";
    }

    callbackConfirmar = onConfirm;

    document.getElementById("modalConfirm").classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modalConfirm").classList.add("hidden");
}

document.getElementById("btnConfirmar")
    ?.addEventListener("click", () => {
        const input = document.getElementById("modalInput");

        if (callbackConfirmar) {
            callbackConfirmar(usandoInput ? input.value : null);
        }

        fecharModal();
    });

document.getElementById("btnCancelar")
    ?.addEventListener("click", fecharModal);