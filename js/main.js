// pantallas
let principio = document.querySelector('#principio')
let loading = document.querySelector('#loading')
let cartasCar = document.querySelector('#cartasCar')
let resultado = document.querySelector('#resultado')
// Todas las pantallas
let pantallas = document.querySelectorAll('.pantalla')
// form & inputs
let form = document.querySelector('#form')
let inputs = document.querySelectorAll('.input')
// contenedores
let carousel = document.querySelector('.carro')
let contCartas = document.querySelector('.carousel-inner')
// botones
let jugar = document.querySelector('#jugar')
// let btnClose = document.querySelector('btnClose')
let btnVolver = document.querySelector('.btnVolver')
let btnResultados = document.querySelector('.btnResultados')
// otras variables
let header = document.querySelector('header')
let player1 = ''
let player2 = ''
// resultados es tempMazo
let resultados = []
// partidas es random
let partidas = 0
// modal
let modal = document.querySelector('modal')
let carouselMjs = document.querySelector('#carouselMsj')


// llamar juego
jugar.addEventListener('click', (e)=>{
    e.preventDefault()
    player1 = document.getElementById('playerUno').value
    player2 = document.getElementById('playerDos').value
    form.reset()
        // validar value inputs
        if(player1 != "" && player2 != ""){
            iniciarJuego()
        }else{
            inputs.forEach((element) =>{
            element.classList.add('incorrecto')
            element.placeholder="Ingresa un nombre"
            })
        }
})

// Pasar a siguiente pantalla y ocultar las anteriores
let siguientePantalla = (pantalla)=>{
    pantallas.forEach((pantalla)=>{
        pantalla.style.display="none"
    })
    pantalla.style.display="flex"
}

let iniciarJuego = ()=>{
    siguientePantalla(loading)
    setTimeout(juego,1000)
}
// crear numero random para jugar
let generarRandom =(min, max)=>{
    return Math.round(Math.random()*(max - min)+ min)
}
// El juego
let juego = ()=>{
    header.style.display="none"
    siguientePantalla(cartasCar)
    // ---
    // clase active para carousel
    let active = ""
    partidas++
    let modeloCartas = ""
    // pido numeros random
    let numeroRandom = generarRandom(0,20)
    let duplicados = resultados.indexOf(cartas[numeroRandom])
    if(duplicados == -1){
        resultados.push(cartas[numeroRandom])
    }else{
        console.log('cartas duplicadas: ', cartas[numeroRandom].nombre)
    }
    if(partidas < 6){
        juego()
    }else{
    console.log(resultados)
}
    resultados.forEach((carta, index)=>{
        if(index == 0){
            active = 'active'
        }else{
            active = ''
        }
        
        modeloCartas += `<div class="carousel-item ${active}" data-index="${index + 1}">
                            <div class="item">
                                <img src="${carta.img}" alt="${carta.nombre}">
                                <h3>${carta.nombre}</h3>
                                <p>${carta.txt}</p>
                            </div>
                        </div>`
            });
        contCartas.innerHTML = modeloCartas
        carouselMjs.innerHTML = `Carta 1/3 de <span>${player1}<span>`
}
// cambiar h2 pantalla resultados dinámicamente
carousel.addEventListener('slide.bs.carousel', (e) => {
    let dataIndex = e.relatedTarget.getAttribute('data-index')
    if (dataIndex <= 3){
    carouselMjs.innerHTML = `Carta ${dataIndex}/3 de <span>${player1}</span>`
    }
    if (dataIndex > 3 && dataIndex <= 6){
        carouselMjs.innerHTML = `Carta ${dataIndex - 3}/3 de <span>${player2}</span>`
    }
})
// lanzar modal después de última slide
carousel.addEventListener('slid.bs.carousel', (e)=>{
    dataIndex = e.relatedTarget.getAttribute('data-index')
    if (dataIndex == 6){
        document.querySelector('.modal').style.display="block"
        document.querySelector('.modal').classList.add('show')
    }
})


// Volver a pantalla principio
btnVolver.addEventListener('click', (e) => {
    // cartasCar.style.display="none"
    header.style.display="block"
    siguientePantalla(principio)
})
// Ir a pantallas matches
btnResultados.addEventListener('click', () => {
    siguientePantalla(resultado)
})