if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var tot = "0,00"

function ready(){

const remover = document.getElementsByClassName("remover")
console.log(remover)
for (var i = 0; i < remover.length ;i++){
    remover[i].addEventListener("click",removerproduto)
    }

    const unidades = document.getElementsByClassName("quantidade")
    for(var i = 0; i < unidades.length; i++){
        unidades[i].addEventListener("change", checkifinputnull)
    }

    const adicionarvalor = document.getElementsByClassName("add")
    for(var i = 0; i < adicionarvalor.length; i++){
        adicionarvalor[i].addEventListener("click",addprod)
    }

}

function finalizar(){

    if ( tot == "0,00"){
        alert("Seu carrinho está vazio")
    }else{
        alert(
            `Obrigado pelo pedido
            valor ${tot}
            volte sempre!
            `
        )
    }

}

function checkifinputnull(event){
    console.log(event.target)
    if(event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }


    updatetotal()

}

function addprod(event){
    const button = event.target
    const produtoinfo = button.parentElement
    const produtonome = produtoinfo.getElementsByClassName("subtitulomenu")[0].innerText
    const produtovalor = produtoinfo.getElementsByClassName("money")[0].innerText

    const produtoregistrado = document.getElementsByClassName("titulocart")
    for(var i=0; i < produtoregistrado.length; i++){
        if(produtoregistrado[i].innerText == produtonome){
           produtoregistrado[i].parentElement.getElementsByClassName("quantidade")[0].value++
           return 

        }
    } 

    
    let newcartproduto = document.createElement("tr")
    newcartproduto.classList.add("produto")

    newcartproduto.innerHTML = `
    <td>${produtonome}</td>
    <td class="preco">${produtovalor}</td>
    <td><input type="number" name="quant" id="quant" class="quantidade" value="1"></td>
    <td><input type="button" value="REMOVER" class="remover"></td>
    </tr>
    `

    const tabelabody = document.querySelector(".tabelacarrinho tbody")
    tabelabody.append(newcartproduto)

    updatetotal()
    
    newcartproduto.getElementsByClassName("quantidade")[0].addEventListener("change",checkifinputnull)
    newcartproduto.getElementsByClassName("remover")[0].addEventListener("click",removerproduto)  
    
}


function removerproduto(event){
    event.target.parentElement.parentElement.remove()
    updatetotal()
}
function updatetotal(){

    tot = 0
    const cartproduto = document.getElementsByClassName("produto")
    for(var i = 0; i < cartproduto.length; i++){
    //console.log(cartproduto[i])
    const precoproduto = cartproduto[i].getElementsByClassName("preco")[0].innerText.replace("R$",'').replace(",",".")
    console.log(precoproduto)
    const quantidade = cartproduto[i].getElementsByClassName("quantidade")[0].value
    console.log(quantidade)

    tot = tot + (precoproduto * quantidade)
    }
    tot = tot.toFixed(2)
    tot = tot.replace(".",",")
    document.querySelector(".precototal").innerText = `R$ ${tot}`

    console.log(tot)

}
