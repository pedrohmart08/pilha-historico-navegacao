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
            return "Pilha vazia";
        
        let resultado = [];
        for(let i = this.topo; i >= 0; i--) {
            resultado.push(this.items[i]);
        }
        return resultado.join("<br>");
    }
    size(){
        return this.topo + 1;
    }
}
// Criamos uma instância da pilha para armazenar o historico de navegacao
const historico = new Pilha();
const historicoAvancar = new Pilha();

const btnVoltar = document.createElement("button");
btnVoltar.innerHTML = `
<svg width="30" height="10" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M40 12 L24 32 L40 52"
    fill="none"
    stroke="#000"
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
    stroke="#000"
    stroke-width="10"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>`;
const navigationControls = document.querySelector(".controle-navegacao");

// adiciona classe aos nossos botoes
btnVoltar.classList.add("btnOpcoes");
btnAvancar.classList.add("btnOpcoes");

if(navigationControls){
    navigationControls.appendChild(btnVoltar);
    navigationControls.appendChild(btnAvancar);
}
// Selecionamos o iframe que exibira o conteudo das telas
const iframe = document.querySelector("#content-frame");
const btnTela1 = document.querySelector("#tela1");
const btnTela2 = document.querySelector("#tela2");
const btnTela3 = document.querySelector("#tela3");
const btnTela4 = document.querySelector("#tela4");
const listaHistorico = document.querySelector(".history-list");
const caminho = [
    'tela1.html',
    'tela2.html',
    'tela3.html',
    'tela4.html'
];

btnTela1.addEventListener("click", (event)=>{
    navegar("tela1.html");
});
btnTela2.addEventListener("click", (event)=>{
    navegar("tela2.html");
});
btnTela3.addEventListener("click", (event)=>{
    navegar("tela3.html");
});
btnTela4.addEventListener("click", (event)=>{
    navegar("tela4.html");
});

// Verifica se o botao existe
if(btnVoltar){
    btnVoltar.addEventListener("click", funcaoVoltar)
}
if(btnAvancar){
    btnAvancar.addEventListener("click", funcaoAvancar)
}
navegar("tela1.html");

// Funçao para voltar a tela anterior: so executa se houver mais de uma pagina no historico
function funcaoVoltar(){
    if(historico.size() > 1){
        let paginaAtual = historico.peek();
        historicoAvancar.push(paginaAtual);
        historico.pop();
        let paginaAnterior = historico.peek();
        iframe.setAttribute("src", paginaAnterior);
        renderHistorico();
    }
}
function funcaoAvancar(){
    if(historicoAvancar.size() >= 1){
        let paginaAnterior = historicoAvancar.peek();
        historico.push(paginaAnterior);
        iframe.setAttribute("src", paginaAnterior);
        historicoAvancar.pop();
        renderHistorico();
    }
}
// renderiza o historico de navegacao na tela
function renderHistorico() {
  listaHistorico.innerHTML = historico.display();
}
// valida a existencia das telas no nosso diretório
function validaTela(tela){
    let encontrado = false;
    caminho.forEach((caminhoTela) =>{
        if(caminhoTela === tela){
            encontrado = true;
        }
    });
    return encontrado;
}
// Funcao para navegar entre nossas telas
function navegar(tela) {
    if(validaTela(tela)){
        if(historico.peek() !== tela){
            historicoAvancar.removeAll();
    //      empilha a tela
            historico.push(tela);
    //      e atualiza o src do iframe
            iframe.setAttribute("src", tela);
            renderHistorico();
        }
    }else
        window.alert("Pagina não encontrada");
}