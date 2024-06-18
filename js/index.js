import {conteudo, pegaDados, informacaoJogador, header, footer, handleLogout} from "./script.js";

let body = document.body;
let dadosJogadores = [];

const handleInputSearch = () => {
    let inputSearch = document.getElementById("search");
    inputSearch.oninput = () => {
        const searchValue = inputSearch.value.toLowerCase();

        if (searchValue.length < 3 || searchValue === "") {
            addCards(dadosJogadores);
        } else {
            const filteredData = dadosJogadores.filter(jogador =>
                jogador.nome.toLowerCase().includes(searchValue)
            );
            addCards(filteredData);
        }
    }
}

const handleGetAll = () => {
    let btnGetAll = document.getElementById("btn_get_all");
    btnGetAll.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/all");
    }
}

const handleGetMasc = () => {
    let btnGetMasc = document.getElementById("btn_get_masc");
    btnGetMasc.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/masculino");
    }
}

const handleGetFem = () => {
    let btnGetFem = document.getElementById("btn_get_fem");
    btnGetFem.onclick = () => {
        loadJogadores("https://botafogo-atletas.mange.li/2024-1/feminino");
    }
}

const handleCardClick = (evento) => {
    const card = evento.target.closest('article');
    console.log(card.dataset.nome);
    window.location.href = `detalhes.html?id=${card.dataset.id}`;
}

const montaCard = (jogador) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.dataset.id = jogador.id; 
    card.onclick = handleCardClick;

    informacaoJogador(card, jogador, "index");

    return card.outerHTML;
}

const addCards = (data) => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "";
    data.forEach(jogador => {
        const cardHTML = montaCard(jogador);
        jogadoresDiv.insertAdjacentHTML('beforeend', cardHTML);
    });

    document.querySelectorAll('#jogadores article').forEach(card => {
        card.onclick = handleCardClick;
    });
};

const loadJogadores = (url) => {
    let jogadoresDiv = document.getElementById("jogadores");
    jogadoresDiv.innerHTML = "Carregando...";

    pegaDados(url)
        .then(data => {
            dadosJogadores = data;
            addCards(dadosJogadores);
        });
};

if (!sessionStorage.getItem("login")) {
    conteudo(body, `
        <header></header>
        <main>        
        <div class="container">
            <img alt="Logo Botafogo" src="img/botafogo.png" class="logo-botafogo">
            <h1>Bem vindo(a)!</h1>
            <p>Aqui você encontra informações sobre todo o elenco do Fogão.</p>
            <p>Para acessar o conteúdo, faça login.</p>
            <button id="btn_login" onclick="(window.location.href = 'login.html')">Login</button>
        </div>       
        </main>
    `);
    footer(body);
} else {
    header(body);
    conteudo(body, `
      <main> 
        <h2>ELENCO PROFISSIONAL</h2>

        <div class="search-bar">
            <input id="search" type="search" placeholder="Digite o nome do jogador..." aria-label="Buscar jogador">
            <button id="search-btn"><img class="img-search" src="img/search.png" alt="search icon"></button>
        </div>

        <section aria-labelledby="filter-heading" class="filters">
            <h3 id="filter-heading">Categorias:</h3>
            <button id="btn_get_all" class="filter-btn">Todos</button>
            <button id="btn_get_masc" class="filter-btn">Masculino</button>
            <button id="btn_get_fem" class="filter-btn">Feminino</button>
        </section>
        
        <section aria-labelledby="filter-heading" class="filters-mobile">
            <h3 id="filter-heading">Categorias:</h3>
            <select id="filter-select">
                <option value="all">Todos</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
            </select>
        </section>

        <div id="jogadores" role="region" aria-live="polite">
            <p>Escolha uma opção</p>
        </div> 
      </main>
    `);
    footer(body);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    const filterButtonsMobile = document.getElementById('filter-select');
    filterButtonsMobile.addEventListener('change', function() {
        const selectedValue = this.value;
        if (selectedValue === 'all') {
            loadJogadores("https://botafogo-atletas.mange.li/2024-1/all");
        } else if (selectedValue === 'masculino') {
            loadJogadores("https://botafogo-atletas.mange.li/2024-1/masculino");
        } else if (selectedValue === 'feminino') {
            loadJogadores("https://botafogo-atletas.mange.li/2024-1/feminino");
        }
    });

    handleInputSearch();
    handleGetAll();
    handleGetMasc();
    handleGetFem();
    handleLogout();
}