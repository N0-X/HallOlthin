let callbackConfirmar = null;
let usandoInput = false;

export function abrirModal(texto, onConfirm, usarInput = false) {
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

export function fecharModal() {
    document.getElementById("modalConfirm").classList.add("hidden");
}

export function initModal() {
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

}