let añadir = document.querySelector('.añadir-nota');
let aceptar = document.querySelector('#aceptar');
let asunto = document.querySelector('#asunto-nota');
let nota = document.querySelector('#texto-nota');
let modal = document.querySelector('.modal');
let texto = document.querySelector('#texto-nota');
let textoNota = document.querySelector('texto');
let vacio = document.querySelector('.notas-vacio');

aceptar.addEventListener('click', añadirNota);

function añadirNota() {
    
    const newElement = document.createElement('div');
    newElement.classList.add('nota-nueva');
    document.querySelector('.note').appendChild(newElement);

    if (
    newElement.innerHTML = `<div class="nota">
    <h2>${asunto.value}</h2>
    <p class="texto">${texto.value}</p>
    </div>`,
    document.querySelector('.note').appendChild(newElement)
    ){
        vacio.style.display = 'none'
    }

}

