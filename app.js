let añadir = document.querySelector(".añadir-nota");
let aceptar = document.querySelector("#aceptar");
let asunto = document.querySelector("#asunto-nota");
let nota = document.querySelector("#texto-nota");
let modal = document.querySelector(".modal");
let texto = document.querySelector("#texto-nota");
let textoNota = document.querySelector("texto");
let vacio = document.querySelector(".notas-vacio");
let notaNueva = document.querySelector(".nota-nueva");
let notas = [];

aceptar.addEventListener("click", añadirNota);

function añadirNota() {
  // Añade nota
  if (asunto.value.length > 0 && texto.value.length > 0) {
    const newElement = document.createElement("div");
    newElement.classList.add("nota-nueva");
    document.querySelector(".note").appendChild(newElement);

    (newElement.innerHTML = `<div class="nota">
    <img id="borrar" src="img/borrar.svg" onclick="borrarNotas('${asunto.value}')">
        <h2 id="asunto">${asunto.value}</h2>
        <p class="texto">${texto.value}</p>
        </div>`),
      document.querySelector(".note").appendChild(newElement);

    vacio.style.display = "none";
  }

  // Guardar en el LocalStorage
  guardarLocalStorage();
  function guardarLocalStorage() {
    const nota = {
      asunto: asunto.value,
      texto: texto.value,
    };

    if (localStorage.getItem("notas") === null) {
      notas.push(nota);
      localStorage.setItem("notas", JSON.stringify(notas));
    } else {
      notas = JSON.parse(localStorage.getItem("notas"));
      notas.push(nota);
      localStorage.setItem("notas", JSON.stringify(notas));
    }
  }
}

// Borrar notas
borrarNotas();
function borrarNotas(asunto) {
  if (asunto != null) {
    notas = notas.filter((nota) => nota.asunto !== asunto);
    localStorage.setItem("notas", JSON.stringify(notas));
  }
  recuperar();
}

// Recuperar localStorage Notas
function recuperar() {
  if (localStorage.getItem("notas") !== null) {
    vacio.style.display = "none";
  }

  let array = [];
  array = JSON.parse(localStorage.getItem("notas"));

  reset();

  array &&
    array.map((element, index) => {
      const newElement = document.createElement("div");
      newElement.classList.add("nota-nueva");
      document.querySelector(".note").appendChild(newElement);

      (newElement.innerHTML = `<div class="nota">
        <img id="borrar" src="img/borrar.svg" onclick="borrarNotas('${element.asunto}')">
         <h2 id="asunto">${element.asunto}</h2>
         <p class="texto">${element.texto}</p>
         </div>`),
        document.querySelector(".note").appendChild(newElement);

      notas = JSON.parse(localStorage.getItem("notas"));
    });
}

// Limpiar recuperar
function reset() {
  const elements = document.getElementsByClassName("nota-nueva");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
