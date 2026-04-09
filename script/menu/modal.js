const modalState = {
    callback: null,
    usandoInput: false
};

export function abrirModal(texto, onConfirm, usarInput = false) {
    document.getElementById("modalTexto").textContent = texto;

    const input = document.getElementById("modalInput");

    modalState.usandoInput = usarInput;

    if (usarInput) {
        input.style.display = "block";
        input.value = "";
        input.focus();
    } else {
        input.style.display = "none";
    }

    modalState.callback = onConfirm;

    document.getElementById("modalConfirm").classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modalConfirm").classList.add("hidden");
}

export function initModal() {
    document.getElementById("btnConfirmar")
        .addEventListener("click", () => {
            const input = document.getElementById("modalInput");

            if (modalState.callback) {
                modalState.callback(
                    modalState.usandoInput ? input.value : null
                );
            }

            fecharModal();
        });

    document.getElementById("btnCancelar")
        .addEventListener("click", fecharModal);
}

export function abrirModalEdicaoPasta(pasta, callbacks) {
    const modal = document.getElementById("modalConfirm");

    // texto
    document.getElementById("modalTexto").textContent = "Editar Pasta";

    const input = document.getElementById("modalInput");
    input.style.display = "block";
    input.value = pasta.nome;

    // cria botão deletar dinamicamente
    let btnDelete = document.getElementById("btnDeletarPasta");

    if (!btnDelete) {
        btnDelete = document.createElement("button");
        btnDelete.id = "btnDeletarPasta";
        btnDelete.textContent = "Deletar";
        btnDelete.style.background = "red";

        modal.appendChild(btnDelete);
    }

    // eventos
    document.getElementById("btnConfirmar").onclick = () => {
        callbacks.onSalvar(input.value);
        fecharModal();
    };

    btnDelete.onclick = () => {
        callbacks.onDeletar();
        fecharModal();
    };

    modal.classList.remove("hidden");
}