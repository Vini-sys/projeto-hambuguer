// Verifica se o documento HTML está completamente carregado
if (document.readyState == "loading") { // Verifica se o documento ainda está carregando
    document.addEventListener("DOMContentLoaded", ready) // Adiciona um evento para chamar a função 'ready' quando o documento estiver completamente carregado
} else {
    ready() // Se o documento já estiver carregado, chama diretamente a função 'ready'
}

// Inicializa o valor total
var tot = "0,00"

// Função chamada quando o documento HTML está completamente carregado
function ready() {
    // Adiciona listeners para os botões de remover produto
    const remover = document.getElementsByClassName("remover") // Obtém uma lista de todos os elementos com a classe 'remover'
    for (var i = 0; i < remover.length; i++) { // Itera sobre cada elemento da lista
        remover[i].addEventListener("click", removerproduto) // Adiciona um evento de clique a cada elemento, chamando a função 'removerproduto' quando clicado
    }

    // Adiciona listeners para os inputs de quantidade
    const unidades = document.getElementsByClassName("quantidade") // Obtém uma lista de todos os elementos com a classe 'quantidade'
    for (var i = 0; i < unidades.length; i++) { // Itera sobre cada elemento da lista
        unidades[i].addEventListener("change", checkifinputnull) // Adiciona um evento de mudança a cada elemento, chamando a função 'checkifinputnull' quando houver uma mudança
    }

    // Adiciona listeners para os botões de adicionar produto ao carrinho
    const adicionarvalor = document.getElementsByClassName("add") // Obtém uma lista de todos os elementos com a classe 'add'
    for (var i = 0; i < adicionarvalor.length; i++) { // Itera sobre cada elemento da lista
        adicionarvalor[i].addEventListener("click", addprod) // Adiciona um evento de clique a cada elemento, chamando a função 'addprod' quando clicado
    }
}

// Função para finalizar a compra
function finalizar() {
    if (tot == "0,00") { // Verifica se o total é igual a "0,00"
        alert("Seu carrinho está vazio") // Mostra um alerta informando que o carrinho está vazio
    } else {
        alert(
            `Obrigado pelo pedido
            valor ${tot}
            volte sempre!
            `
        ) // Mostra um alerta agradecendo pela compra, mostrando o valor total e uma mensagem de retorno
    }
}

// Função para verificar se o input de quantidade está vazio
function checkifinputnull(event) {
    if (event.target.value == "0") { // Verifica se o valor do input é "0"
        event.target.parentElement.parentElement.remove() // Remove o elemento pai do input
    }
    updatetotal() // Chama a função 'updatetotal' para atualizar o total
}

// Função para adicionar um produto ao carrinho
function addprod(event) {
    const button = event.target // Obtém o elemento que foi clicado
    const produtoinfo = button.parentElement // Obtém o elemento pai do elemento clicado
    const produtonome = produtoinfo.getElementsByClassName("subtitulomenu")[0].innerText // Obtém o nome do produto
    const produtovalor = produtoinfo.getElementsByClassName("money")[0].innerText // Obtém o valor do produto

    // Verifica se o produto já está no carrinho
    const produtoregistrado = document.getElementsByClassName("titulocart") // Obtém uma lista de todos os elementos com a classe 'titulocart'
    for (var i = 0; i < produtoregistrado.length; i++) { // Itera sobre cada elemento da lista
        if (produtoregistrado[i].innerText == produtonome) { // Verifica se o nome do produto já está presente no carrinho
            produtoregistrado[i].parentElement.getElementsByClassName("quantidade")[0].value++ // Incrementa a quantidade do produto no carrinho
            return // Sai da função, pois o produto já foi adicionado ao carrinho
        }
    }

    // Cria um novo elemento HTML para o produto no carrinho
    let newcartproduto = document.createElement("tr") // Cria um novo elemento 'tr' (linha de tabela)
    newcartproduto.classList.add("produto") // Adiciona a classe 'produto' ao novo elemento
    newcartproduto.innerHTML = `
        <td class="produtonome">${produtonome}</td>
        <td class="preco">${produtovalor}</td>
        <td><input type="number" name="quant" id="quant" class="quantidade" value="1"></td>
        <td><input type="button" value="-" class="remover"></td>
    ` // Define o conteúdo HTML do novo elemento

    // Adiciona o novo produto à tabela do carrinho
    const tabelabody = document.querySelector(".tabelacarrinho tbody") // Seleciona o corpo da tabela do carrinho
    tabelabody.append(newcartproduto) // Adiciona o novo produto ao corpo da tabela

    // Atualiza o total
    updatetotal() // Chama a função 'updatetotal' para atualizar o total

    // Adiciona listeners para o input de quantidade e botão de remover do novo produto
    newcartproduto.getElementsByClassName("quantidade")[0].addEventListener("change", checkifinputnull) // Adiciona um evento de mudança ao input de quantidade
    newcartproduto.getElementsByClassName("remover")[0].addEventListener("click", removerproduto) // Adiciona um evento de clique ao botão de remover
}

// Função para remover um produto do carrinho
function removerproduto(event) {
    event.target.parentElement.parentElement.remove() // Remove o elemento pai do botão de remover
    updatetotal() // Chama a função 'updatetotal' para atualizar o total
}

// Função para atualizar o valor total do carrinho
function updatetotal() {
    tot = 0 // Inicializa o total como zero
    const cartproduto = document.getElementsByClassName("produto") // Obtém uma lista de todos os elementos com a classe 'produto'
    for (var i = 0; i < cartproduto.length; i++) { // Itera sobre cada elemento da lista
        const precoproduto = cartproduto[i].getElementsByClassName("preco")[0].innerText.replace("R$", '').replace(",", ".") // Obtém o preço do produto e remove o símbolo de moeda e substitui vírgulas por pontos
        const quantidade = cartproduto[i].getElementsByClassName("quantidade")[0].value // Obtém a quantidade do produto
        tot = tot + (precoproduto * quantidade) // Atualiza o total multiplicando o preço pelo quantidade e somando ao total atual
    }
    tot = tot.toFixed(2) // Formata o total com duas casas decimais
    tot = tot.replace(".", ",") // Substitui o ponto decimal por vírgula
    document.querySelector(".precototal").innerText = `R$ ${tot}` // Atualiza o texto do elemento que exibe o total
}
