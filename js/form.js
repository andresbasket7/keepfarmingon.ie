window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");
  const submitBtn = document.getElementById("contact-submit");
  const confidence = document.getElementById("confidence");

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

  // Evita que se envíe directamente
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitBtn.disabled = true;
    grecaptcha.execute(); // Llama a invisible reCAPTCHA
  });

  // Esta función se llama solo si Google valida el captcha
  window.onRecaptchaSuccess = function (token) {
    loadingMessage.style.display = "block";

    const formData = new FormData(form);
    formData.append("g-recaptcha-response", token);

    fetch(form.action, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        loadingMessage.style.display = "none";
        submitBtn.disabled = false;
        grecaptcha.reset(); // Listo para otro intento si falla

        if (data.success) {
          form.style.display = "none";
          companyDetails.style.display = "none";
          confidence.style.display = "none";
          thankYouMessage.style.display = "block";
        } else {
          alert("There was an error: " + JSON.stringify(data));
        }
      })
      .catch(error => {
        loadingMessage.style.display = "none";
        submitBtn.disabled = false;
        grecaptcha.reset();
        alert("There was an error submitting the form. Please try again.");
        console.error(error);
      });
  };
});