import {footer, header, informacaoJogador} from "./script.js";


const montaCardDetalhe = (jogador) => {
    const card = document.createElement("div");
    card.classList.add("card");
    informacaoJogador(card, jogador, "jogador");
    card.innerHTML += `
    <div class="btn-voltar">
        <a href="index.html" class="botao">Voltar</a>
    </div>
    `
    return card;
}

const getJogadores = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        return undefined;
    }

    const data = await response.json();
    if (!data || !data.id) {
        return undefined;
    }
    return data;
}

const gerarPagina = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const baseUrl = `https://botafogo-atletas.mange.li/2024-1/${id}`;

    const body = document.body;
    header(body);

    const main = document.createElement("main");
    body.appendChild(main);

    const jogador = await getJogadores(baseUrl);

    if (jogador === undefined) {
        const msg = document.createElement("div");
        msg.innerHTML = "<p>Não há jogador</p>";
        main.appendChild(msg);
    }

    main.appendChild(montaCardDetalhe(jogador));

    footer(body);
}

gerarPagina().then(() => console.log("Página de detalhes gerada"));