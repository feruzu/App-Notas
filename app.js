let añadir = document.querySelector(".añadir-nota");
let aceptar = document.querySelector("#aceptar");
let asunto = document.querySelector("#asunto-nota");
let modal = document.querySelector(".modal");
let texto = document.querySelector("#texto-nota");
let textoNota = document.querySelector("texto");
let vacio = document.querySelector(".notas-vacio");
let notaNueva = document.querySelector(".nota-nueva");
let titutloEditar = document.querySelector(".modal-title");
let input = document.querySelector("#flexCheck");

let notas = [];

// Fecha
let fecha = new Date().toLocaleDateString();

aceptar.addEventListener("click", validarCampos);

function añadirNota() {
  // Añade nota
  if (asunto.value.length > 0 && texto.value.length > 0) {
    const newElement = document.createElement("div");
    newElement.classList.add("nota-nueva");
    newElement.classList.add("solo-notas-nuevas");
    document.querySelector(".note").appendChild(newElement);

    (newElement.innerHTML = `<div class="nota">
    

    <div class="form-check">
    <input class="form-check-input" type="checkbox" onChange="cambiaEstado('${asunto.value}')" id="${asunto.value}">
    </div>
    <img id="borrar" src="img/borrar.svg" onclick="borrarNotas('${asunto.value}')">
        <p class="fecha">${fecha}</p>
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
      fecha: fecha,
      completado: false,
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

// Vaciar input y textarea de modal
aceptar.addEventListener("click", vaciarCampos);
vaciarCampos();
function vaciarCampos() {
  asunto.value = "";
  texto.value = "";
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

  if (localStorage.getItem("notas") === "[]") {
    localStorage.clear();
    vacio.style.display = "flex";
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
        <div class="form-check">
        <input class="form-check-input" type="checkbox" onChange="cambiaEstado('${element.asunto}')" id="${element.asunto}">
        </div>
        <img id="borrar" src="img/borrar.svg" onclick="borrarNotas('${element.asunto}')">
         <p class="fecha">${element.fecha}</p>
         <h2 id="asunto">${element.asunto}</h2>
         <p class="texto">${element.texto}</p>
         </div>`),
        document.querySelector(".note").appendChild(newElement);
      notas = JSON.parse(localStorage.getItem("notas"));
      let checkbox = document.getElementById(element.asunto);
      checkbox.type = "checkbox";
      checkbox.checked = element.completado;
    });
}

// Limpiar recuperar
function reset() {
  const elements = document.getElementsByClassName("nota-nueva");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// Validar campos
function validarCampos() {
  if (asunto.value.length === 0 || texto.value.length === 0) {
    aceptar.style.display = "pointer-events = none";
  } else {
    añadirNota();
  }
}


// Cambio de estado de completado
function cambiaEstado(asunto) {
  localStorage.clear();
  let notasAux = [];
  notas.forEach((element) => {
    let checkbox = document.getElementById(element.asunto);
    if (element.completado) {
      checkbox.classList.add("completado");
    } else {
      checkbox.classList.remove("completado");
    }

    if (element.asunto != asunto) {
      notasAux.push(element);
    } else {
      if (element.completado) {
        notaAux = {
          asunto: element.asunto,
          texto: element.texto,
          fecha: element.fecha,
          completado: false,
        };
      } else {
        notaAux = {
          asunto: element.asunto,
          texto: element.texto,
          fecha: element.fecha,
          completado: true,
        };
      }
      notasAux.push(notaAux);
    }
  });
  notas = [];
  notas = notasAux;
  localStorage.setItem("notas", JSON.stringify(notas));
}
