#  Sistema de Navegação com Pilhas

##  Integrantes

- **Lana Lauanda**
- **Larissa dos Santos**
- **Pedro Henrique Rodrigues**

## Descrição do Sistema

Este sistema simula um navegador web utilizando duas pilhas para gerenciar o histórico de navegação, demonstrando na prática o conceito de estruturas de dados LIFO (Last In, First Out). O sistema foi desenvolvido para ilustrar o funcionamento de pilhas em um cenário real, com as seguintes funcionalidades:

- **Navegação entre páginas** simuladas
- **Navegação reversa** (voltar/avançar)
- **Visualização interativa** das pilhas em tempo real

## Estrutura Utilizada
Estrutura Utilizada

O sistema usa pilhas para salvar o histórico de navegação. A classe Pilha foi implementada com os seguintes métodos:
Métodos da Classe Pilha:\
constructor()	Inicializa a pilha vazia	\
removeAll()	Remove todos os elementos da pilha	\
isEmpty()	Verifica se a pilha está vazia	boolean\
push(pagina)	Adiciona um elemento ao topo da pilha	\
pop()	Remove e retorna o elemento do topo	element ou null\
peek()	Retorna o elemento do topo sem remover	element ou null\
display()	Retorna todos os elementos do topo para a base	array\
size()	Retorna a quantidade de elementos	number
###  Passos para Execução

#### Método Direto (Recomendado)

1. **Clone ou baixe** o repositório:
   ```bash
   git clone https://github.com/pedrohmart08/pilha-historico-navegacao.git
   ```

2. **Abra o arquivo** `index.html` no navegador:
   - Clique duas vezes no arquivo
   - Ou arraste para uma janela do navegador
   - Ou use "Abrir com..." e selecione o navegador

### Como Usar
#### Navegação Básica

1. **Digite um termo** na barra de endereço:
   - Termos válidos: `estrutura de dados`, `arvore binaria`, `ponteiro`, `pilha`, `fila`, `lista`
   - Ou use URLs: `www.estruturadedados.com`, `www.estruturadedados.com/arvore-binaria`, etc.

2. **Clique em "Visitar"**

3. **Interaja com os botões**:
   - ⬅️ **Voltar**: Retorna à página anterior
   - ➡️ **Avançar**: Avança para próxima página (se disponível)

4. **Navegação Direta**:
   - Clique em qualquer item da **Pilha 1** (Histórico) para ir diretamente àquela página