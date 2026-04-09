// ==========================
// BOTÃO DOS ATRIBUTOS
// ==========================

document.querySelectorAll(".atributoHeader").forEach(header => {

    header.addEventListener("click", (e) => {

        // se clicou em input, ignora
        if (e.target.tagName === "INPUT") return;

        const pericias = header.nextElementSibling;
        pericias.classList.toggle("show");

        atualizarModificadores();
        atualizarPericias();

    });

});

// ==========================
// CALCULO DO MODIFICADORES
// ==========================

// Carrega tudo ao abrir
document.addEventListener("DOMContentLoaded", () => {
    atualizarModificadores();
    atualizarPericias();
});

// Atualiza quando muda atributo
document.querySelectorAll(".atributo-bruto").forEach(input => {
    input.addEventListener("input", atualizarModificadores);
    input.addEventListener("input", atualizarPericias);
});

// Atualiza quando muda perícia
document.querySelectorAll(".pericia-bruto").forEach(input => {
    input.addEventListener("input", atualizarPericias);
});



// Modificadores dos atributos
function atualizarModificadores() {
    document.querySelectorAll(".atributo").forEach(attr => {

        const input = attr.querySelector(".atributo-bruto");
        const modSpan = attr.querySelector(".modificador");

        const valor = Number(input.value) || 0;

        let mod;

        if (valor <= 3) {
            mod = valor-3
        } else {
            mod = Math.floor( (valor-3) / 2)
        }

        modSpan.textContent = mod >= 0 ? `+${mod}` : mod;
    });
}

// Modificadores das pericias
function atualizarPericias() {

    document.querySelectorAll(".pericia").forEach(pericia => {

        const input = pericia.querySelector(".pericia-bruto");
        const modSpan = pericia.querySelector(".modificador");

        const bruto = Number(input.value) || 0;

        // pega "DES.acrobacia" → "DES"
        const chave = input.dataset.key;
        const atributo = chave.split(".")[0];

        // pega o input do atributo correspondente
        const attrInput = document.querySelector(
            `.atributo-bruto[data-key="${atributo}.valor"]`
        );

        const attrValor = Number(attrInput?.value) || 0;

        let attrMod;

        switch (bruto) {
            default:
            case 0:
                (attrValor === 0) ? attrMod=-3 : attrMod=-1;
                break;
            case 1:
                attrMod = 1;
                break;
            case 2:
            case 3:
                attrMod = 2;
                break;
            case 4:
                attrMod = 3;
                break;
            case 5:
                attrMod = 4;
                break;
        }

        modSpan.textContent = `${attrMod}`;
    });

}