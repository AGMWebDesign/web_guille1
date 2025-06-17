document.addEventListener("DOMContentLoaded", () => {
  const enBtn = document.getElementById("en-btn");
  const esBtn = document.getElementById("es-btn");

  function actualizarBotones(idioma) {
    enBtn.classList.toggle("active", idioma === "en");
    esBtn.classList.toggle("active", idioma === "es");
  }

  function cambiarIdioma(idioma) {
    const elementos = document.querySelectorAll("[data-en]");

    elementos.forEach(el => {
      const texto = el.getAttribute(`data-${idioma}`);
      if (texto) el.textContent = texto;
    });

    const label = document.getElementById("language-label");
    label.textContent = idioma === "es" ? "Idioma" : "Language";

    document.documentElement.lang = idioma;
    actualizarBotones(idioma);
    localStorage.setItem("idioma", idioma);
  }

  enBtn.addEventListener("click", () => cambiarIdioma("en"));
  esBtn.addEventListener("click", () => cambiarIdioma("es"));

  const idiomaGuardado = localStorage.getItem("idioma") || (navigator.language.startsWith("es") ? "es" : "en");
  cambiarIdioma(idiomaGuardado);

  const filterButtons = document.querySelectorAll(".filter-btn");
  const images = document.querySelectorAll(".gallery-grid img");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");

        // Activar botón seleccionado
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Filtrar imágenes
        images.forEach(img => {
            const imgCategory = img.getAttribute("data-category");
            img.style.display = (category === "all" || category === imgCategory) ? "block" : "none";
        });
    });
  });
});
