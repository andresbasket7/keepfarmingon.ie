window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gform");
  const thankYouMessage = document.querySelector(".thankyou_message");
  const loadingMessage = document.querySelector(".loading_message");
  const companyDetails = document.getElementById("company-details");

  const urlParams = new URLSearchParams(window.location.search);

  // Show thank you message if redirected with ?success
  if (urlParams.has("success")) {
    if (form) form.style.display = "none";
    if (companyDetails) companyDetails.style.display = "none";
    if (thankYouMessage) thankYouMessage.style.display = "block";
  }

  // Show alert if reCAPTCHA or other error occurred
  if (urlParams.has("error")) {
    alert("There was an error submitting the form. Please verify the reCAPTCHA and try again.");
  }

  if (!form) {
    console.error("Form with ID 'gform' not found");
    return;
  }

  // Show loading message on submit
  form.addEventListener("submit", function () {
    loadingMessage.style.display = "block";
  });
});