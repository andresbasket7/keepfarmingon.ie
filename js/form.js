window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");

  if (!form) {
    console.error("No se encontró el formulario con ID 'gform'");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Mostrar mensaje de cargando
    loadingMessage.style.display = "block";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        loadingMessage.style.display = "none"; // Oculta el "cargando"
        if (data.result === "success") {
          form.reset();
          form.style.display = "none";
          companyDetails.style.display = "none";
          thankYouMessage.style.display = "block";
        } else {
          alert("There was an error submitting the form. Please try again.");
        }
      })
      .catch((error) => {
        loadingMessage.style.display = "none"; // Oculta el "cargando"
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
      });
  });
});