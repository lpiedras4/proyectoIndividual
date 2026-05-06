

/*Obtener elementos interactivos del DOM*/
const resultado = document.querySelector(".form-aspirante-resultado");
const btnGenerarPerfil = document.getElementById("form-aspirante-btn");
const areaSW = document.querySelector(".form-aspirante-select");
const anadirInteres = document.getElementById("form-aspirante-add");
const setHabilidades = new Set();
const enfoques = new Map();
enfoques.set("Web", "Construcción de aplicaciones web modernas");
enfoques.set("Data", "Análisis de datos y modelos predictivos.");
enfoques.set("Mobile", "Desarrollo de apps móviles.");

let enfoque = "";
let fortalezas = "";

anadirInteres.addEventListener("click", (e) => {

  const habilidad = document.getElementById("form-aspirante-input").value.trim();
  if (habilidad === "") {
    alert("Ingresa un interés");
  }
  if (setHabilidades.has(habilidad)) {
    alert("Este interés ya ha sido agregado, ingresa otro");
  } else {
    setHabilidades.add(habilidad);
    console.log(habilidad + " agregada")
  }
});

btnGenerarPerfil.addEventListener("click", (e) => {
  const valor = areaSW.value;
  enfoque = enfoques.get(valor);
  resultado.innerHTML = `
    <h3><strong>Tu Perfil de Futuro Ingeniero:</strong> ${valor} </h3>
      <p><strong>Enfoque:</strong> ${enfoque}</p>
      
      <p><strong>Fortalezas:</strong></p>
      <span class="form-aspirante-tag"></span>
    `;
});
