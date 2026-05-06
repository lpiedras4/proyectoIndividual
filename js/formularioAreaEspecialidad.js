

/*Obtener elementos interactivos del DOM*/
const resultado = document.getElementById("form-aspirante-resultado");
const btnGenerarPerfil = document.getElementById("form-aspirante-btn");
const areaSW = document.querySelector(".form-aspirante-select");
const anadirInteres = document.getElementById("form-aspirante-add");
const input = document.getElementById("form-aspirante-input");
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
    return;
  }
  if (setHabilidades.has(habilidad)) {
    alert("Esta habilidad ya ha sido agregada, ingresa otra");
  } else {
    setHabilidades.add(habilidad);
  }
  input.value = "";
});

btnGenerarPerfil.addEventListener("click", (e) => {
  if(setHabilidades.size === 0){
    alert("Ingresa una habilidad para generar tu perfil");
    return;
  }
  const valor = areaSW.value;
  enfoque = enfoques.get(valor);
  resultado.innerHTML = `
    <h3><strong>Tu Perfil de Futuro Ingeniero:</strong> ${valor} </h3>
      <p><strong>Enfoque:</strong> ${enfoque}</p>
      
      <p><strong>Fortalezas:</strong></p>
      
    `;
    for (const habilidad of setHabilidades){
      resultado.innerHTML+=`
      <span class="form-aspirante-tag">${habilidad}</span>
      `;
    }
    resultado.style.display="block";
    setHabilidades.clear();
});
