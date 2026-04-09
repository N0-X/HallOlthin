import { listarPastas, criarPasta } from "../supabase.js";
import { abrirModalEdicaoPasta } from "./modal.js";

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

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "⚙️";

    btnEditar.addEventListener("click", (e) => {
        e.stopPropagation();

        abrirModalEdicaoPasta(pasta, {
            onSalvar: async (novoNome) => {
                console.log("Salvar", novoNome);
            },
            onDeletar: async () => {
                console.log("Deletar", pasta.id);
            }
        });
    });

    container.appendChild(btn);
    container.appendChild(btnEditar);

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

