let result = document.querySelector("#resultado-geolocalizacion");
const botonCompartir = document.getElementById("compartir-btn");
botonCompartir.addEventListener("click", buscarCoordenadas);

function buscarCoordenadas() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (typeof window.setUsuarioMapa === 'function') {
          window.setUsuarioMapa(position.coords.latitude, position.coords.longitude);
        }
        // API de bigDataCloud para obtener la ciudad de las coordenadas del usuario (con su permiso, obvio)
        const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
        getAPI(bdcAPI);
      },
      (error) => {
        result.innerHTML = `
          <h3><strong>Error de geolocalización</strong></h3>
          <p>${error.message}</p>
        `;
        result.style.display = "block";
      },
    );
  } else {
    result.innerHTML = `
      <h3><strong>Error</strong></h3>
      <p>La geolocalización no funciona con tu navegador.</p>
    `;
    result.style.display = "block";
  }
}

function getAPI(bdcAPI) {
  result.innerHTML = `<p>Cargando ubicación...</p>`;
  result.style.display = "block";

  fetch(bdcAPI)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error de red: ${response.status} ${response.statusText}`,
        );
      }
      return response.json();
    })
    .then((data) => {
      result.innerHTML = `
        <h3><strong>Ubicación</strong></h3>
        <p><strong>Latitud:</strong> ${data.latitude}</p>
        <p><strong>Longitud:</strong> ${data.longitude}</p>
        <p><strong>Ciudad:</strong> ${data.city || "No disponible"}</p>
      `;
    })
    .catch((error) => {
      result.innerHTML = `
        <h3><strong>Error de consulta</strong></h3>
        <p>${error.message}</p>
      `;
    });
}
