// FUNÇÃO QUE PEGA OS DADOS DOS INPUTS E SALVA

export function coletarDados() {
    const inputs = document.querySelectorAll(".save");
    const dados = {};

    inputs.forEach(input => {
        const chave = input.dataset.key;

        let valor;

        if (input.type === "checkbox") {
            valor = input.checked;
        } else if (input.type === "number") {
            valor = input.value === "" ? null : Number(input.value);
        } else {
            valor = input.value;
        }

        dados[chave] = {
            valor: valor,
            tipo: input.type
        };
    });

    // adiciona imagem corretamente nos dados
    const imagem = localStorage.getItem("personagemImagem");

    if (imagem) {
        dados.foto = {
            valor: imagem,
            tipo: "image"
        };
    }

    return dados;
}

// FUNÇÃO QUE CRIA O ARQUIVO COM OS DADOS SALVOS PELA FUNÇÃO ANTERIOR

export function baixarJSON() {
    const dados = coletarDados();

    let nomeArquivo = "ficha";

    if (dados["nome"] && dados["nome"].valor) {
        nomeArquivo = dados["nome"].valor;
    }

    nomeArquivo = nomeArquivo
        .replace(/[\\/:*?"<>|]/g, "") // remove caracteres proibidos
        .replace(/\s+/g, "_"); 

    const blob = new Blob(
        [JSON.stringify(dados, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${nomeArquivo}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

// FUNÇÃO QUE CARREGA OS DADOS DO ARQUIVO CRIADO

export function carregarJSON() {
    const inputArquivo = document.getElementById("carregarArquivo");
    const arquivo = inputArquivo.files[0];

    if (!arquivo) {
        alert("Selecione um arquivo primeiro!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const conteudo = event.target.result;
        const dados = JSON.parse(conteudo);

        aplicarDados(dados);
    };

    reader.readAsText(arquivo);
}

// FUNÇÃO QUE RETORNA OS DADOS DO ARQUIVO PARA OS INPUTS

export function aplicarDados(dados) {
    const inputs = document.querySelectorAll(".save");

    inputs.forEach(input => {
        const chave = input.dataset.key;
        const info = dados[chave];

        if (!info) return;

        if (info.tipo === "checkbox") {
            input.checked = info.valor;
        } else {
            input.value = info.valor;
        }
    });

    if (dados.foto?.valor) {
        const img = document.getElementById("previewImagem");
        img.src = dados.foto.valor;

        localStorage.setItem("personagemImagem", dados.foto.valor);
    }
}