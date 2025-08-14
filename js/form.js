window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");

  function toggleInput(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);

    if (checkbox && input) {
      checkbox.addEventListener("change", function () {
        input.style.display = this.checked ? "inline-block" : "none";
      });
    }
  }
  toggleInput("other-check-1", "other-text-1");
  toggleInput("other-check-2", "other-text-2");

  if (!form) {
    console.error("Form with ID 'gform' not found");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recaptchaToken = grecaptcha.getResponse();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA before submitting.");
      return;
    }

    // Desactivar botón para evitar doble envío
    const submitBtn = document.getElementById("contact-submit");
    submitBtn.disabled = true;
    loadingMessage.style.display = "block";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        loadingMessage.style.display = "none";
        grecaptcha.reset();
        submitBtn.disabled = false;

        if (data.success) {
          form.style.display = "none";
          companyDetails.style.display = "none";
          thankYouMessage.style.display = "block";
        } else {
          alert("There was an error: " + JSON.stringify(data));
        }
      })
      .catch(error => {
        loadingMessage.style.display = "none";
        grecaptcha.reset();
        submitBtn.disabled = false;
        alert("There was an error submitting the form. Please try again.");
        console.error(error);
      });
  });
});