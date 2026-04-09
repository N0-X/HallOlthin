import {
    listarPastas,
    criarPasta,
    criarFicha,
    listarFichas,
    deletarPasta,
    buscarFichasGlobal
} from "./supabase.js";

let pastaAtual = null;
let buscaCache = [];


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
});

document.addEventListener("DOMContentLoaded", async () => {

    buscaCache = await buscarFichasGlobal();

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
    pastaAtual = pasta;

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

    const fichas = await listarFichas(pastaAtual.id);

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
    if (!pastaAtual) {
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

        const nova = await criarFicha(pastaAtual.id, dados);

        localStorage.setItem("fichaId", nova.id);
        localStorage.setItem("pastaId", pastaAtual.id);

        window.location.href = "index.html";

    }, true);
}


// ==========================
// NAVEGAÇÃO
// ==========================

function voltarParaPastas() {
    pastaAtual = null;
    mostrarTelaPastas();
}

function abrirFicha(id) {
    localStorage.setItem("fichaId", id);
    localStorage.setItem("pastaId", pastaAtual.id);

    window.location.href = "index.html";
}


// ==========================
// BOTÃO DE CONFIRMAÇÃO DE DELETE
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
    .addEventListener("click", () => {
        const input = document.getElementById("modalInput");

        if (callbackConfirmar) {
            callbackConfirmar(usandoInput ? input.value : null);
        }

        fecharModal();
    });

document.getElementById("btnCancelar")
    .addEventListener("click", fecharModal);

    
// ==========================
// BUSCA DE FICHAS
// ==========================

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

function renderBuscaGlobal(fichas) {
    const div = document.getElementById("resultadoBusca");
    div.innerHTML = "";

    fichas.forEach(ficha => {

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("preview");

        // 🔥 AQUI A MÁGICA
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

            window.location.href = "index.html";
        });

        div.appendChild(card);
    });
}