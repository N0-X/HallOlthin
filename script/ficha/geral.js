document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("inputImagem");
    const preview = document.getElementById("previewImagem");

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            const base64 = e.target.result;

            preview.src = base64;

            // salva temporariamente
            localStorage.setItem("personagemImagem", base64);
        };

        reader.readAsDataURL(file);
    });

});