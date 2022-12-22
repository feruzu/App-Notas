let añadir = document.querySelector('.añadir-nota');
let aceptar = document.querySelector('#aceptar');
let asunto = document.querySelector('#asunto-nota');
let nota = document.querySelector('#texto-nota');
let modal = document.querySelector('.modal');
let texto = document.querySelector('#texto-nota');

aceptar.addEventListener('click', añadirNota);

function añadirNota() {
    
    const newElement = document.createElement('div');
    newElement.classList.add('nota-nueva');
    document.querySelector('.note').appendChild(newElement);

    newElement.innerHTML = `<div class="nota">
    <h2>${asunto.value}</h2>
    <p>${texto.value}</p>
    </div>`;
    document.querySelector('.note').appendChild(newElement);

}

