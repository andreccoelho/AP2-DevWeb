const handleLogout = () => {
    let btnLogout = document.getElementById("btn_logout");
    btnLogout.onclick = () => {
        sessionStorage.removeItem("login");
        window.location.href = "login.html";
    }
}

const conteudo = (elemento, html) => {
    elemento.innerHTML += html;
}

const header = (header) => {
    conteudo(header, `
        <header>
            <nav>
                <ul class="nav-menu">
                    <li>
                        <a href="index.html">
                            <img alt="Logo Botafogo" src="img/botafogo.png" class="logo-botafogo">
                        </a>
                    </li>
                    <li><a href="index.html"></a></li>
                </ul>
            </nav>
            <div class="login-info">
                <button id="btn_logout">Logout</button>
            </div>
        </header>
    `);
}

const footer = (footer) => {
    conteudo(footer, `
        <footer>
            <div class="footer-content">
                <div class="footer-logos">
                    <img alt="Logo IBMEC" src="img/ibmec.png" class="logo-ibmec">
                </div>
            </div>
        </footer>
    `
    )
}

const pegaDados = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const informacaoJogador = (card, jogador, tipo) => {
    if (jogador.altura === "") {
        jogador.altura = "Não informado";
    }

    jogador = {
        id: jogador.id,
        url_detalhes: jogador.url_detalhes,
        elenco: jogador.elenco,
        imagem: jogador.imagem,
        n_jogos: jogador.n_jogos,
        nome: jogador.nome,
        posicao: jogador.posicao,
        naturalidade: jogador.naturalidade,
        nascimento: jogador.nascimento,
        altura: jogador.altura,
        no_botafogo_desde: jogador.no_botafogo_desde,
        detalhes: jogador.detalhes,
    }

    if (tipo === "index"){
        card.innerHTML = `
            <div class="foto">
                <img src="${jogador.imagem}" alt="${jogador.nome}">
            </div>
            <div class="conteudo">
                <div class="importante">
                    <h2>${jogador.nome.split(' ').slice(0, 2).join(' ')}</h2>
                    <p>${jogador.posicao}</p>
                </div>
                <div class="info">
                    <p><strong>Mais informações</strong></p>
                    <ul>
                        <a href="\detalhes.html?id=${card.dataset.id}\">Acessar</a>
                    </ul>
                </div>
            </div> 
            `;
            } else {
                card.innerHTML = `
                    <div class="perfil-jogador">
        <div class="container">
            <div class="foto">
                <img src="${jogador.imagem}" alt="${jogador.nome}">
            </div>
            <div class="conteudo">
                <section class="informacoes-principais">
                    <h1>${jogador.nome}</h1>
                    <p class="posicao">${jogador.posicao}</p>
                </section>
                <section class="informacoes-jogador">
                    <h2>Informações do Jogador</h2>
                    <ul>
                        <li><strong>Nº Jogos:</strong> ${jogador.n_jogos}</li>
                        <li><strong>Nascimento:</strong> ${jogador.nascimento}</li>
                        <li><strong>Naturalidade:</strong> ${jogador.naturalidade}</li> 
                        <li><strong>Altura:</strong> ${jogador.altura}</li>
                        <li><strong>No Botafogo desde:</strong> ${jogador.no_botafogo_desde}</li>
                    </ul>
                </section>
                <section class="detalhes">
                    <h2>Detalhes</h2>
                    <p>${jogador.detalhes}</p>
                </section>
            </div>
        </div>
    </div>
    `;
    }



    card.dataset.id = jogador.id;
    card.url_detalhes = jogador.url_detalhes;
    card.dataset.elenco = jogador.elenco;
    card.dataset.imagem = jogador.imagem;
    card.dataset.n_jogos = jogador.n_jogos;
    card.dataset.nome = jogador.nome;
    card.dataset.posicao = jogador.posicao;
    card.dataset.naturalidade = jogador.naturalidade;
    card.dataset.nascimento = jogador.nascimento;
    card.dataset.altura = jogador.altura;
    card.dataset.no_botafogo_desde = jogador.no_botafogo_desde;
    card.dataset.detalhes = jogador.detalhes;
}


export { conteudo, pegaDados, informacaoJogador, footer, header, handleLogout };