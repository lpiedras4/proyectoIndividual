const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');
const devicePixelRatio = window.devicePixelRatio || 1;
const canvasWidth = 1000;
const canvasHeight = 600;

canvas.width = canvasWidth * devicePixelRatio;
canvas.height = canvasHeight * devicePixelRatio;
canvas.style.width = '100%';
canvas.style.height = '600px';
ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

const universidades = [
  { nombre: 'Universidad de Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { nombre: 'Universidad Nacional de La Plata', lat: -34.9214, lon: -57.9544 },
  { nombre: 'Universidad Nacional de Córdoba', lat: -31.4201, lon: -64.1888 },
  { nombre: 'Universidad Nacional de Rosario', lat: -32.9468, lon: -60.6393 },
  { nombre: 'Universidad Nacional de Mar del Plata', lat: -38.0055, lon: -57.5426 }
];

let usuario = null;

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function dibujarPlaceholder() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#051028';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = '#cbd5ff';
  ctx.font = 'bold 30px Poppins, sans-serif';
  ctx.fillText('Activa tu ubicación', 42, 120);

  ctx.font = '18px Poppins, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Aquí verás las distancias reales a las universidades más cercanas.', 42, 170);
}

function dibujarDistancias() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#051028';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px Poppins, sans-serif';
  ctx.fillText('Distancias desde tu ubicación', 40, 58);

  ctx.font = '16px Poppins, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(
    `Lat: ${usuario.lat.toFixed(4)} | Lon: ${usuario.lon.toFixed(4)}`,
    40,
    90,
  );

  const datos = universidades.map((uni) => ({
    ...uni,
    distancia: calcularDistanciaKm(usuario.lat, usuario.lon, uni.lat, uni.lon)
  })).sort((a, b) => a.distancia - b.distancia);

  const maxDist = Math.max(...datos.map((item) => item.distancia), 1);
  const chartX = 40;
  const chartY = 130;
  const chartWidth = canvasWidth - 140;
  const barHeight = 38;
  const gap = 26;

  datos.forEach((item, index) => {
    const y = chartY + index * (barHeight + gap);
    const barWidth = Math.max(20, (item.distancia / maxDist) * chartWidth);

    ctx.fillStyle = 'rgba(59, 130, 246, 0.18)';
    ctx.fillRect(chartX, y - 14, chartWidth, barHeight + 8);

    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(chartX, y, barWidth, barHeight);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 18px Poppins, sans-serif';
    ctx.fillText(item.nombre, chartX, y + 24);

    ctx.fillStyle = '#c7d2fe';
    ctx.font = '500 16px Poppins, sans-serif';
    ctx.fillText(`${item.distancia.toFixed(1)} km`, chartX + barWidth + 12, y + 24);
  });

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const x = chartX + (chartWidth / 5) * i;
    ctx.beginPath();
    ctx.moveTo(x, chartY - 18);
    ctx.lineTo(x, chartY + datos.length * (barHeight + gap));
    ctx.stroke();
  }
}

function setUsuarioMapa(lat, lon) {
  usuario = { lat, lon };
  dibujarDistancias();
}

window.setUsuarioMapa = setUsuarioMapa;

dibujarPlaceholder();
