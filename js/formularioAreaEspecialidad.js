  /*Obtener elementos interactivos del DOM*/
  const areaInteres = document.querySelector("form-aspirante-resultado");
  const btnGenerarPerfil = document.getElementById("form-aspirante-btn");
  const selectArea =  document.querySelector("form-aspirante-select");
  const anadirInteres = document.getElementById("form-aspirante-add");
  const setIntereses = new Set();

  anadirInteres.addEventListener("click", (e) => {
   const interes = document.getElementById("form-aspirante-add").value.trim();
   console.log(interes);
  })


  btnGenerarPerfil.addEventListener("click", (e) => {
    const textoAreaInteres = selectArea.options[selectArea.selectedIndex].text;
    console.log(textoAreaInteres);
    let descripcion
  });