// A classe da nossa pilha
class Pilha{
    constructor(){
        this.items = {};
        this.topo = -1;
    }
    removeAll(){
        this.items = {};
        this.topo = -1;
    }
    isEmpty(){
        return this.topo === -1;
    }
    push(pagina){
        this.topo++;
        this.items[this.topo] = pagina;
    }
    pop(){
        if(!this.isEmpty()){
            const elementoRemovido = this.items[this.topo];
            delete this.items[this.topo];
            this.topo--;
            return elementoRemovido;
        }
        return null;
    }
    peek(){
        if(this.isEmpty())
            return null;
        return this.items[this.topo];
    }
    display() {
        if(this.isEmpty())
            return [];

        let resultado = [];
        for(let i = this.topo; i >= 0; i--) {
            resultado.push(this.items[i]);
        }
        return resultado;
    }
    size(){
        return this.topo + 1;
    }
}

// Pilha 1 (ATIVA): histórico para voltar
const historico = new Pilha();
// Pilha 2 (AVANÇAR): paginas que saem do historico quando clicamos "voltar"
const historicoAvancar = new Pilha();

// "Banco de dados" simulado dos sites: cada chave é o termo pesquisado na barra
const sites = {
    "estrutura de dados": {
        url: "www.estruturadedados.com",
        nome: "Estrutura de Dados",
        conteudo: `
            <h1>Estrutura de Dados</h1>
            <p>Estrutura de dados é a forma como organizamos e armazenamos informações na memória do computador para que possam ser acessadas e manipuladas de forma eficiente.</p>
            <ul>
                <li onclick="navegar('arvore binaria')" style="cursor:pointer">Árvores Binárias</li>
                <li onclick="navegar('ponteiro')" style="cursor:pointer">Ponteiros</li>
                <li onclick="navegar('pilha')" style="cursor:pointer">Pilhas</li>
                <li onclick="navegar('fila')" style="cursor:pointer">Filas</li>
                <li onclick="navegar('lista')" style="cursor:pointer">Listas</li>
            </ul>
        `
    },
    "arvore binaria": {
        url: "www.estruturadedados.com/arvore-binaria",
        nome: "Árvores Binárias",
        conteudo: `
            <h1>Árvores Binárias</h1>
            <p>Uma árvore binária é uma estrutura de dados hierárquica onde cada nó possui no máximo dois filhos: o filho da esquerda e o filho da direita. É amplamente usada em algoritmos de busca e ordenação.</p>
        `
    },
    "ponteiro": {
        url: "www.estruturadedados.com/ponteiro",
        nome: "Ponteiros",
        conteudo: `
            <h1>Ponteiros</h1>
            <p>Ponteiro é uma variável que armazena o endereço de memória de outra variável. É um conceito fundamental em linguagens como C e C++, sendo a base para a construção de estruturas dinâmicas como listas e árvores.</p>
        `
    },
    "pilha": {
        url: "www.estruturadedados.com/pilha",
        nome: "Pilhas",
        conteudo: `
            <h1>Pilhas</h1>
            <p>Pilha é uma estrutura de dados que segue o princípio LIFO — Last In, First Out (último a entrar, primeiro a sair). Funciona como uma pilha de pratos: o último colocado é o primeiro a ser retirado. Muito usada em histórico de navegação, desfazer ações e chamadas de funções.</p>
        `
    },
    "fila": {
        url: "www.estruturadedados.com/fila",
        nome: "Filas",
        conteudo: `
            <h1>Filas</h1>
            <p>Fila é uma estrutura de dados que segue o princípio FIFO — First In, First Out (primeiro a entrar, primeiro a sair). Funciona como uma fila de banco: quem chega primeiro é atendido primeiro. Usada em sistemas de impressão, processamento de tarefas e mensagens.</p>
        `
    },
    "lista": {
        url: "www.estruturadedados.com/lista",
        nome: "Listas",
        conteudo: `
            <h1>Listas</h1>
            <p>Lista é uma estrutura de dados linear onde os elementos são conectados por meio de ponteiros, formando uma sequência. Diferente de arrays, listas encadeadas não precisam de espaço contíguo na memória, tornando inserções e remoções mais eficientes.</p>
        `
    }
};

// Botões de voltar/avançar criados dinamicamente (igual ao seu original)
const btnVoltar = document.createElement("button");
btnVoltar.innerHTML = `
<svg width="30" height="10" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M40 12 L24 32 L40 52"
    fill="none"
    stroke="#ffffff"
    stroke-width="10"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>
`;
const btnAvancar = document.createElement("button");
btnAvancar.innerHTML = `<svg width="30" height="10" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M24 12 L40 32 L24 52"
    fill="none"
    stroke="#ffffff"
    stroke-width="10"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>`;

const navigationControls = document.querySelector(".controle-navegacao");

btnVoltar.classList.add("btnOpcoes");
btnAvancar.classList.add("btnOpcoes");

if(navigationControls){
    navigationControls.appendChild(btnVoltar);
    navigationControls.appendChild(btnAvancar);
}

// Elementos do painel-site (onde o "conteudo do site" é injetado)
const siteNome = document.querySelector("#site-nome");
const siteUrl = document.querySelector("#site-url");
const siteConteudo = document.querySelector("#site-conteudo");

// Elementos da barra de busca
const barraUrl = document.querySelector("#barra-url");
const btnVisitar = document.querySelector("#btnVisitar");

// Elementos das pilhas (listas e contadores)
const pilha1Lista = document.querySelector("#pilha1-lista");
const pilha1Contagem = document.querySelector("#pilha1-contagem");
const pilha2Lista = document.querySelector("#pilha2-lista");
const pilha2Contagem = document.querySelector("#pilha2-contagem");
const pilha2Vazia = document.querySelector("#pilha2-vazia");

btnVisitar.addEventListener("click", () => {
    navegar(barraUrl.value.trim());
});

if(btnVoltar){
    btnVoltar.addEventListener("click", funcaoVoltar);
}
if(btnAvancar){
    btnAvancar.addEventListener("click", funcaoAvancar);
}

// Carrega a página inicial
navegar("estrutura de dados");

// Funçao para voltar a tela anterior: so executa se houver mais de uma pagina no historico
function funcaoVoltar(){
    if(historico.size() > 1){
        let paginaAtual = historico.peek();
        historicoAvancar.push(paginaAtual);
        historico.pop();
        let paginaAnterior = historico.peek();
        renderizarSite(paginaAnterior);
        renderHistorico();
    }
}

function funcaoAvancar(){
    if(historicoAvancar.size() >= 1){
        let paginaAnterior = historicoAvancar.peek();
        historico.push(paginaAnterior);
        renderizarSite(paginaAnterior);
        historicoAvancar.pop();
        renderHistorico();
    }
}

// renderiza as duas pilhas na tela (lista + contagem)
function renderHistorico() {
    renderizarLista(pilha1Lista, historico);
    renderizarLista(pilha2Lista, historicoAvancar);

    pilha1Contagem.textContent = `${historico.size()} itens`;
    pilha2Contagem.textContent = `${historicoAvancar.size()} itens`;

    // mensagem de "aguardando" só aparece quando a pilha de avançar está vazia
    pilha2Vazia.style.display = historicoAvancar.isEmpty() ? "block" : "none";
}

// monta os <li> de uma pilha dentro de uma <ul>
function renderizarLista(ulElemento, pilha) {
    ulElemento.innerHTML = "";
    const itens = pilha.display();

    if (itens.length === 0) return;

    itens.forEach((item, index) => {
        const li = document.createElement("li");

        if (typeof item === "object" && item.erro) {
            li.textContent = `Erro: ${item.textoDigitado}`;
        } else {
            const site = sites[item];
            li.textContent = site ? site.nome : item;
        }

        if (pilha === historico) {
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                while (historico.peek() !== item) {
                    const removido = historico.pop();
                    historicoAvancar.push(removido);
                }
                renderizarSite(historico.peek());
                renderHistorico();
            });
        }

        ulElemento.appendChild(li);
    });
}

// valida se o termo pesquisado existe no nosso "banco" de sites
function validaTela(tela){
    return tela in sites;
}

// procura a chave do site a partir da URL digitada pelo usuário
// aceita "www.tela1.com", "tela1.com" ou só "tela1"
function buscarChavePorUrl(textoDigitado){
    const texto = textoDigitado.toLowerCase().replace(/^www\./, "");

    for(const chave in sites){
        const urlSite = sites[chave].url.toLowerCase().replace(/^www\./, "");
        if(urlSite === texto || chave === texto){
            return chave;
        }
    }
    return null;
}

// injeta nome, url e conteudo simulado do site no painel-site
function renderizarSite(item){
    if(typeof item === "object" && item.erro){
        siteNome.textContent = "Página não encontrada";
        siteUrl.textContent = item.textoDigitado;
        siteConteudo.innerHTML = "<p>Não foi possível encontrar este endereço.</p>";
        return;
    }

    const site = sites[item];
    if(!site) return;

    siteNome.textContent = site.nome;
    siteUrl.textContent = site.url;
    siteConteudo.innerHTML = site.conteudo;
    barraUrl.value = site.url;
}

// Funcao para navegar entre nossas telas
function navegar(textoDigitado) {
    const tela = buscarChavePorUrl(textoDigitado);

    if(tela && validaTela(tela)){
        if(historico.peek() !== tela){
            historicoAvancar.removeAll();
            historico.push(tela);
            renderizarSite(tela);
            renderHistorico();
        }
    } else {
        historicoAvancar.removeAll();
        const itemErro = { erro: true, textoDigitado };
        historico.push(itemErro);
        renderizarSite(itemErro);
        renderHistorico();
    }
}