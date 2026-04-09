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