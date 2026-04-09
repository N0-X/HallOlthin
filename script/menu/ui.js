export function mostrarTelaPastas() {
    document.getElementById("telaPastas").style.display = "block";
    document.getElementById("telaFichas").style.display = "none";
}

export function mostrarTelaFichas() {
    document.getElementById("telaPastas").style.display = "none";
    document.getElementById("telaFichas").style.display = "block";
}