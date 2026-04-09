function atualizarBarra(resource) {

    const atualInput = resource.querySelector(".resource-atual");
    const maxInput = resource.querySelector(".resource-max");

    const fill = resource.querySelector(".resource-fill");
    const damage = resource.querySelector(".resource-damage");

    let atual = Number(atualInput.value) || 0;
    let max = Number(maxInput.value) || 1;

    atual = Math.max(0, Math.min(atual, max));
    atualInput.value = atual;

    const porcentagem = (atual / max) * 100;

    const antiga = parseFloat(damage.style.width) || porcentagem;

    fill.style.width = porcentagem + "%";

    if (porcentagem < antiga) {
        setTimeout(() => {
            damage.style.width = porcentagem + "%";
        }, 200);
    } else {
        damage.style.width = porcentagem + "%";
    }
}


// ==========================
// INIT
// ==========================

function iniciarResources() {

    document.querySelectorAll(".resource").forEach(resource => {

        const atualInput = resource.querySelector(".resource-atual");
        const maxInput = resource.querySelector(".resource-max");

        // atualizar ao digitar
        atualInput.addEventListener("input", () => atualizarBarra(resource));
        maxInput.addEventListener("input", () => atualizarBarra(resource));

        // CURA
        resource.querySelector(".heal").addEventListener("click", () => {

            abrirModalValor("Quanto deseja curar?", (valor) => {

                if (isNaN(valor) || valor <= 0) return;

                atualInput.value = Number(atualInput.value) + valor;

                atualizarBarra(resource);
                atualInput.dispatchEvent(new Event("input"));
                
            });
        });

        // DANO
        resource.querySelector(".damage").addEventListener("click", () => {

            abrirModalValor("Quanto de dano?", (valor) => {

                if (isNaN(valor) || valor <= 0) return;

                atualInput.value = Number(atualInput.value) - valor;

                resource.classList.add("hit");
                setTimeout(() => resource.classList.remove("hit"), 200);

                atualizarBarra(resource);
                atualInput.dispatchEvent(new Event("input"));
            });

        });

        atualizarBarra(resource);
    });

}

document.addEventListener("DOMContentLoaded", iniciarResources);

let callbackValor = null;

function abrirModalValor(titulo, onConfirm) {

    document.getElementById("modalTitulo").textContent = titulo;

    const input = document.getElementById("modalValorInput");
    input.value = "";
    input.focus();

    callbackValor = onConfirm;

    document.getElementById("modalValor").classList.remove("hidden");
}

function fecharModalValor() {
    document.getElementById("modalValor").classList.add("hidden");
}


// BOTÕES
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("modalValorInput");
    const btnConfirmar = document.getElementById("modalConfirmarValor");
    const btnCancelar = document.getElementById("modalCancelar");

    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", () => {

            const valor = Number(document.getElementById("modalValorInput").value);

            if (callbackValor) {
                callbackValor(valor);
            }

            fecharModalValor();
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", fecharModalValor);
    }

    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                btnConfirmar.click();
            }
        });
    }


});