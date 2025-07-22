window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");

  if (!form) {
    console.error("Form with ID 'gform' not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading message
    loadingMessage.style.display = "block";

    // Validate reCAPTCHA before sending
    const recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse.length === 0) {
      loadingMessage.style.display = "none"; // Hide loading message
      alert("Please verify that you are not a robot by checking the reCAPTCHA.");
      return; // Stop form submission
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        loadingMessage.style.display = "none";
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
        loadingMessage.style.display = "none";
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
      });
  });
});