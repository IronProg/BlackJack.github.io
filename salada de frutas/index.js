const outFrutas = document.querySelector("#outFrutas")
const divJogo = document.querySelector("#divJogo")
const btnVerificar = document.querySelector("#btnVerificar")
const btnJogarNovamente = document.querySelector("#btnJogarNovamente")

const outOk = document.querySelector("#outOk")
const outErro = document.querySelector("#outErro")
const outErro2 = document.querySelector("#outErro2")

const imgMaca = document.querySelector("#imgMaca")
const imgLaranja = document.querySelector("#imgLaranja")
const imgKiwi = document.querySelector("#imgKiwi")
const imgMorango = document.querySelector("#imgMorango")
const imgUva = document.querySelector("#imgUva")


let numMaca;
let numLaranja;
let numKiwi;
let numMorango;
let numUva;

function sorteiaFrutas() {
    numMaca = Math.ceil(Math.random() * 5)
    numLaranja = Math.ceil(Math.random() * 5)
    numKiwi = Math.ceil(Math.random() * 5)
    numMorango = Math.ceil(Math.random() * 5)
    numUva = Math.ceil(Math.random() * 5)

    outFrutas.textContent = (numMaca + " Maçã(s) :: " + numLaranja + " Laranja(s) :: " + numKiwi + " Kiwi(s) :: " + numMorango + " Morango(s) :: " + numUva + " Uva(s) :: ")
}

window.addEventListener("load", sorteiaFrutas);


function adicionarFruta(fruta) {
    const novaImagem = document.createElement("img");

    novaImagem.src = fruta + ".png";
    novaImagem.textAlt = "Fruta: " + fruta;
    novaImagem.className = "img-" + fruta;

    divJogo.appendChild(novaImagem)
}

imgMaca.addEventListener("click", () => adicionarFruta("maca"))
imgLaranja.addEventListener("click", () => adicionarFruta("laranja"))
imgKiwi.addEventListener("click", () => adicionarFruta("kiwi"))
imgMorango.addEventListener("click", () => adicionarFruta("morango"))
imgUva.addEventListener("click", () => adicionarFruta("uva"))


function verificarResultado() {
    let imagens = divJogo.querySelectorAll("img")

    let repetido = 0

    let contaMaca = 0
    let contaLaranja = 0
    let contaKiwi = 0
    let contaMorango = 0
    let contaUva = 0

    for (let i=0; i<imagens.length; i++) {
        if (imagens[i].className == "img-maca") {
            contaMaca++
        } else if (imagens[i].className == "img-laranja") {
            contaLaranja++
        } else if (imagens[i].className == "img-kiwi") {
            contaKiwi++
        } else if (imagens[i].className == "img-morango") {
            contaMorango++
        } else {
            contaUva++
        }
    }

    for (let j=1; j<imagens.length; j++) {
        if (imagens[j].className == imagens[j-1].className) {
            repetido++
        }
    }
    
    
    if (numMaca == contaMaca && numLaranja == contaLaranja && numKiwi == contaKiwi && numMorango == contaMorango && numUva == contaUva && repetido == 0) {
        outOk.className = "display-3 text-primary d-inline"
    } else if (numMaca == contaMaca && numLaranja == contaLaranja && numKiwi == contaKiwi && numMorango == contaMorango && numUva == contaUva && repetido >= 1) {
        outErro2.className = "display-3 text-danger d-inline"
    } else {
        outErro.className = "display-3 text-danger d-inline"
    }
    
    btnJogarNovamente.className = "btn btn-success btn-lg px-4 float-left mx-3"
    btnVerificar.className = "btn btn-primary btn-lg px-4 float-left mx-3 disabled"
}



btnVerificar.addEventListener("click", verificarResultado);

function jogarNovamente() {
    window.location.reload()
}
btnJogarNovamente.addEventListener("click", jogarNovamente)