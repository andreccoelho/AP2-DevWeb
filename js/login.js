import { hex_sha256 } from "./sha256.js";
import {conteudo} from "./script.js";

const password = "SENHA123";
const password_hash = hex_sha256(password);

let body = document.body;

const login = (password, error) => {
    function set_login() {
        console.log("Login com sucesso");
        sessionStorage.setItem("login", "true");
    }

    if (hex_sha256(password) === password_hash) {
        set_login();
        window.location.href = "index.html";
        return true;
    }

    console.log("Login fracassado");
    error.innerHTML = "Senha incorreta";
    return false;
};

const handleLogin = (error) => {
    document.getElementById("btn_login").onclick = () => {
        const password = document.getElementById("senha").value;
        login(password, error);
    }
}

if (sessionStorage.getItem("login")) {
    window.location.href = "index.html";
} else {
    conteudo(
        body,
        `
         <img alt="Logo Botafogo" src="img/botafogo.png" class="logo-botafogo">
         <h1>Faça Login</h1>
    
            <label for="senha">Senha:</label>
            <input id="senha" type="password" name="senha" required>
            <button id="btn_login" type="submit">Entrar</button>
            <p id="error"></p>
            <p>Senha : SENHA123</p>
    `)

    let error = document.getElementById("error");

    handleLogin(error);
}