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
let listasRes = document.querySelector('.listasRes')
let matches = document.querySelector('.matches')
let lista1 = document.querySelector('.lista1')
let lista2 = document.querySelector('.lista2')
// modal
let modal = document.querySelector('.modal')
let carouselMjs = document.querySelector('#carouselMsj')
// botones
let jugar = document.querySelector('#jugar')
let btnVolver = document.querySelector('.btnVolver')
let btnResultados = document.querySelector('.btnResultados')
// otras variables
let lista1_titulo = document.querySelector('.lista1 h2')
let lista1_listado = document.querySelector('.lista1 ul')
let lista2_titulo = document.querySelector('.lista2 h2')
let lista2_listado = document.querySelector('.lista2 ul')
let matches_titulo = document.querySelector('.matches p')
let header = document.querySelector('header')

let player1 = ''
let player2 = ''
// resultados es tempMazo
let resultados = []
// partidas es random
let partidas = 0



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
    setTimeout(juego,3000)
}
// crear numero random para jugar
let generarRandom =(min, max)=>{
    return Math.round(Math.random()*(max - min)+ min)
}

// ver resultados
let verResultados = ()=>{ 
    let suma = 0
    resultados.forEach((carta, index)=>{
        if(index < 3){
            lista1_listado.innerHTML += `<li class="cartasMini-item"><img class="cartasMini-img" src="${carta.img}"></li>`
        }
        if(index >= 3 && index < 6){
            lista2_listado.innerHTML += `<li class="cartasMini-item"><img class="cartasMini-img" src="${carta.img}"></li>`
        }
        suma = suma + carta.id
    })
    if (suma % 2 == 0){
        console.log('hay match')
        matches_titulo.innerHTML = `Sí`
    }else{
        console.log('no hay match')
        matches_titulo.innerHTML = `No`
    }
    console.log(suma)

    lista1_titulo.innerText = `${player1}`
    lista2_titulo.innerText = `${player2}`
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

while (resultados.length < 6){
    partidas = Math.floor(Math.random()* cartas.length)
    if (resultados.indexOf(cartas[partidas]) == -1){
        resultados.push(cartas[partidas])
        console.log('resultados')
    }
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
    setTimeout(() => {
        dataIndex = e.relatedTarget.getAttribute('data-index')
        if (dataIndex == 6){
            modal.style.display="block"
            modal.classList.add('show')
        }
    }, 1500);
})
// Volver a pantalla principio
btnVolver.addEventListener('click', (e) => {
    // cartasCar.style.display="none"
    header.style.display="block"
    siguientePantalla(principio)
})
// Ir a pantallas matches
btnResultados.addEventListener('click', () => {
    verResultados()
    siguientePantalla(resultado)
})
