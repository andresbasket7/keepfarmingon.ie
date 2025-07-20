document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.hero-slider .slide');
  let currentSlide = 0;
  let intervalId;

  function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function startSlider() {
    // Solo inicia si no está ya corriendo
    if (!intervalId) {
      intervalId = setInterval(showNextSlide, 5000); // 10 segundos
    }
  }

  function stopSlider() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Detecta visibilidad de la pestaña
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopSlider();
    } else {
      startSlider();
    }
  });

  // Iniciar slider al cargar
  startSlider();
});