window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");

  if (!form) {
    console.error("Form with ID 'gform' not found");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener token actual
    const recaptchaToken = grecaptcha.getResponse();

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA before submitting.");
      return;
    }

    loadingMessage.style.display = "block";

    const formData = new FormData(form);
    formData.append("g-recaptcha-response", recaptchaToken);

    fetch(form.action, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        loadingMessage.style.display = "none";
        // Siempre limpia el captcha para permitir un nuevo token
        grecaptcha.reset();

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
        alert("There was an error submitting the form. Please try again.");
        console.error(error);
      });
  });
});