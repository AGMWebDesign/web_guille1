document.addEventListener("DOMContentLoaded", () => {
  const enBtn = document.getElementById("en-btn");
  const esBtn = document.getElementById("es-btn");


  // Cambiar idioma
  function actualizarBotones(idioma) {
    enBtn.classList.toggle("active", idioma === "en");
    esBtn.classList.toggle("active", idioma === "es");
  }

  function cambiarIdioma(idioma) {
    const elementos = document.querySelectorAll("[data-en]");

    elementos.forEach(el => {
      const texto = el.getAttribute(`data-${idioma}`);
      if (texto) el.textContent = texto;

    const placeholders = document.querySelectorAll("[data-en-placeholder]");

      placeholders.forEach(el => {
        const nuevoPlaceholder = el.getAttribute(`data-${idioma}-placeholder`);
        if (nuevoPlaceholder) el.placeholder = nuevoPlaceholder;
});
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

// Botón mostrar galería

const lang = localStorage.getItem("lang") || "en";
  const gallery = document.getElementById("gallery");
  const toggleBtn = document.getElementById("toggle-gallery-btn");

  const texts = {
    en: { show: "Show Gallery", hide: "Hide Gallery" },
    es: { show: "Mostrar galería", hide: "Ocultar galería" }
  };

  const updateButtonText = () => {
    const isHidden = gallery.classList.contains("hidden");
    toggleBtn.textContent = isHidden ? texts[lang].show : texts[lang].hide;
  };

  updateButtonText();

  toggleBtn.addEventListener("click", () => {
    gallery.classList.toggle("hidden");
    updateButtonText();
  });

//Filtros

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");

        // Activar botón seleccionado
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Filtrar imágenes
        galleryItems.forEach(img => {
            const imgCategory = img.getAttribute("data-category");
            img.style.display = (category === "all" || category === imgCategory) ? "block" : "none";
        });
    });
  });

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.querySelector(".modal-nav.left");
  const nextBtn = document.querySelector(".modal-nav.right");

  const galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  let currentIndex = 0;

// Modal

  function openModal(index) {
  currentIndex = index;
  modalImg.src = galleryImages[currentIndex].src;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Navegación con flechas del teclado
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("hidden")) {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeModal();
  }
});

// Fade-in-up

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Solo una vez
      }
    });

  }, {
    threshold: 0.1,
  });

  const aboutSection = document.querySelector("#about");
if (aboutSection) {
  observer.observe(aboutSection);
}
});