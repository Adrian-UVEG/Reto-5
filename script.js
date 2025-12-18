const API_KEY = 'pub_a169ca7e469a414f995e3d3606f9cacd';
const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&q=software`;

const btnRefrescar = document.getElementById('btn-refrescar');
const contenedor = document.getElementById('contenedor-noticias');

async function obtenerNoticias() {
  contenedor.innerHTML = "<p style='text-align:center;'>Buscando noticias...</p>";
  try {
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    if (datos.status === "success" && datos.results.length > 0) {
      mostrarNoticias(datos.results);
    } else {
      throw new Error("No se obtuvieron resultados.");
    }
  } catch (error) {
    console.warn("Usando datos de prueba debido a error de API:", error.message);
    cargarDatosDePrueba();
  }
}

function mostrarNoticias(noticias) {
  contenedor.innerHTML = "";
  noticias.forEach(item => {
    const div = document.createElement('div');
    div.className = 'noticia-card';
    div.innerHTML = `
      <a href="${item.link}" target="_blank">
        <h3>${item.title}</h3>
      </a>
      <p>${item.description || 'Haga clic para leer la noticia completa.'}</p>
      <small>Fuente: ${item.source_id} | Fecha: ${item.pubDate}</small>
    `;
    contenedor.appendChild(div);
  });
}

function cargarDatosDePrueba() {
  const noticiasDeRespaldo = [
    {
      title: "Tendencias en Ingeniería de Software 2025",
      link: "#",
      description: "La inteligencia artificial y el desarrollo Full Stack siguen liderando el mercado laboral tecnológico.",
      source_id: "TechDaily",
      pubDate: "2025-12-17"
    },
    {
      title: "Nuevos frameworks de JavaScript",
      link: "#",
      description: "Exploramos las herramientas que están optimizando el rendimiento de las aplicaciones web modernas.",
      source_id: "DevNews",
      pubDate: "2025-12-16"
    }
  ];
  mostrarNoticias(noticiasDeRespaldo);
  contenedor.innerHTML += "<p class='error-msg'>Nota: Estás viendo noticias de respaldo debido a u error de conexión</p>";
}

btnRefrescar.addEventListener('click', obtenerNoticias);
window.onload = obtenerNoticias;
