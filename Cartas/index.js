// Variáveis
const baralho = []
const naipes = ["copas", "paus", "ouros", "espadas"]
const letras = ["A", "J", "Q", "K"]

const mensagem = document.querySelector("#mensagem")

let quantCartas = 52
let pontosVoce = 0
let pontosPC = 0

// Referências HTML5
const btComprarCarta = document.querySelector("#btComprarCarta")
const btApostar = document.querySelector("#btApostar")
const btNovaMao = document.querySelector("#btNovaMao")

const cards = document.querySelectorAll(".card-body")
const localPontos = document.querySelectorAll("span")

function montaBaralho() {
    for (let i=2; i<=10; i++) {
        for (let naipe of naipes) {
            baralho.push(i + "_" + naipe)
        }
    }
    for (let letra of letras) {
        for (let naipe of naipes) {
            baralho.push(letra + "_" + naipe)
        }
    }
}

montaBaralho()

const pontosSimbolo = (carta) => {
    const simbolo = carta.substr(0, carta.indexOf("_"))
    let peso
    if (letras.includes(simbolo)) {
        if (simbolo == "A") {
                peso = 11
        } else {
            peso = 10
        }
    } else {
        peso = Number(simbolo)
    }
    return peso
}

btComprarCarta.addEventListener("click", () => {
    //sorteia uma carta e retira do baralho para a mão do jogador
    const posicao = Math.floor(Math.random() * quantCartas);
    quantCartas--

// Retira a carta do baralho quando sorteada
    const carta = baralho.splice(posicao, 1).toString()

    const imgCarta = document.createElement("img")
    imgCarta.src = "cartas/" + carta + ".png"
    imgCarta.alt = "carta " + carta
    cards[0].append(imgCarta)

    pontosVoce += pontosSimbolo(carta)
    localPontos[0].textContent = pontosVoce


if (pontosVoce > 21) {
    btComprarCarta.disabled = true
}

})

btApostar.addEventListener("click", () => {
do {
    //sorteia uma carta e retira do baralho para a mão do jogador
    const posicao = Math.floor(Math.random() * quantCartas);
    quantCartas--

// Retira a carta do baralho quando sorteada
    const carta = baralho.splice(posicao, 1).toString()

    const imgCarta = document.createElement("img")
    imgCarta.src = "cartas/" + carta + ".png"
    imgCarta.alt = "carta " + carta
    cards[1].append(imgCarta)

    pontosPC += pontosSimbolo(carta)
    localPontos[1].textContent = pontosPC

} while (pontosPC <= pontosVoce)

mensagem.classList.add("alert")

if (pontosVoce == pontosPC) {
    mensagem.classList.add("alert-success")
    mensagem.innerHTML = "<h4><b>Empate</b></h4>"
} else if ((pontosVoce > pontosPC && pontosVoce <= 21) || (pontosPC > 21 && pontosVoce <= 21)) {
    mensagem.classList.add("alert-primary")
    mensagem.innerHTML = "<h4><b>Parabéns, você venceu!</b></h4>"
} else {
    mensagem.classList.add("alert-danger")
    mensagem.innerHTML = "<h4><b>O computador te venceu!</b></h4>"
}

    btNovaMao.className = "btn btn-success my-5"

})

btNovaMao.addEventListener("click", () => {
    pontosPC = 0
    pontosVoce = 0
    localPontos[0].textContent = pontosVoce
    localPontos[1].textContent = pontosPC
    for (let i= document.images.length; i-->0;)
    document.images[i].parentNode.removeChild(document.images[i]);
    if (baralho.length < 10) {
        baralho.length = 0
        montaBaralho()
        quantCartas = 52
        mensagem.className = "mensagem mx-4 mt-2 alert-info"
        mensagem.innerHTML = "<h4><b>Reembralhado</b></h4>"
    } else {
        mensagem.className = "mensagem mx-4 mt-2"
        mensagem.innerHTML = ""
    }
    btNovaMao.className = "btn btn-success my-5 invisible"
    btComprarCarta.disabled = false
})

