document.addEventListener("DOMContentLoaded", function() {
    const texts = document.querySelectorAll('.farm-text');

    function toggleOnScroll() {
      const windowHeight = window.innerHeight;
      texts.forEach(text => {
        const top = text.getBoundingClientRect().top;
        if (top < windowHeight - 50 && top > 0) {
          text.style.animation = "fadeInUp 0.8s ease forwards";
        } else {
          text.style.opacity = "0";
          text.style.transform = "translateY(20px)";
          text.style.animation = "none";
        }
      });
    }

    window.addEventListener('scroll', toggleOnScroll);
    toggleOnScroll(); // Ejecutar al cargar
  });