// A classe da nossa pilha
class Pilha{
    // Geramos um construtor que será um array que receberá nossas telas
    constructor(){
        this.items = [];
    }
    // fazemos a verificação se a pila está vazia
    isEmpty(){
        return this.items.length === 0;
    }
      // Adicionamos uma página ao topo da pilha
    push(pagina){
        this.items.push(pagina);
    }
    // Removemos e retornamos a página do topo da pilha, verificando antes se ela não está vazia
    pop(){
        if(!this.isEmpty()){
            return this.items.pop();
        }
    }
      // Retornamos a página do topo sem remove-la, ou null se a pilha estiver vazia
    topo(){
        if(this.isEmpty())
            return null;
        return this.items.at(this.items.length-1);
    }
      // Exibimos todos elementos da pilha se estiver vazia retorna "Pilha vazia"
    display() {
        if(this.isEmpty()) {
            return "Pilha vazia";
        }
        
        return this.items.slice().reverse().join(" | ");
    }
    tamanho(){
        return this.items.length;
    }
}
// Criamos uma instância da pilha para armazenar o historico de navegacao
const historico = new Pilha();
const historicoAvancar = new Pilha();

const btnVoltar = document.createElement("button");
btnVoltar.textContent = "<--";
const btnAvancar = document.createElement("button");
btnAvancar.textContent = "-->";
const navigationControls = document.querySelector(".navigation-controls");

// adiciona classe aos nossos botoes
btnVoltar.classList.add("btnOpcoes");
btnAvancar.classList.add("btnOpcoes");

navigationControls.appendChild(btnVoltar);
navigationControls.appendChild(btnAvancar);
// Selecionamos o iframe que exibira o conteudo das telas
const iframe = document.querySelector("#content-frame");
const btnTela1 = document.querySelector("#tela1");
const btnTela2 = document.querySelector("#tela2");
const btnTela3 = document.querySelector("#tela3");
const btnTela4 = document.querySelector("#tela4");
const listaHistorico = document.querySelector(".history-list");

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

// Funçao para voltar a tela anterior: so executa se houver mais de uma pagina no historico
function funcaoVoltar(){
    if(historico.tamanho() > 1){
        let paginaAtual = historico.topo();
        historicoAvancar.push(paginaAtual);
        historico.pop();
        let paginaAnterior = historico.topo();
        iframe.setAttribute("src", paginaAnterior);
        renderHistorico();
    }
}
function funcaoAvancar(){
    if(historicoAvancar.tamanho() >= 1){        
        let paginaAnterior = historicoAvancar.topo();
        historico.push(paginaAnterior);
        iframe.setAttribute("src", paginaAnterior);
        historicoAvancar.pop();
        renderHistorico();
    }
}
// renderiza o historico de navegacao na tela
function renderHistorico() {
  listaHistorico.innerHTML = "";
  const itens = historico.items.slice().reverse();
  itens.forEach((pagina, index) => {
    const item = document.createElement("div");
    item.classList.add("history-item");
    if (index === 0) item.classList.add("history-item--atual");
    item.textContent = pagina.replace(".html", "").replace("tela", "Tela ");
    listaHistorico.appendChild(item);
  });
}
// Funcao para navegar entre nossas telas
function navegar(tela) {
    if(historico.topo() !== tela){
        //  empilha a tela
        historico.push(tela);
    // e atualiza o src do iframe
        iframe.setAttribute("src", tela);
        renderHistorico();
    }
}