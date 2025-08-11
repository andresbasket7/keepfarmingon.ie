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
    loadingMessage.style.display = "block";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        loadingMessage.style.display = "none";
        if (data.success) {
          form.style.display = "none";
          companyDetails.style.display = "none";
          thankYouMessage.style.display = "block";
        } else {
          alert("There was an error: " + (data.error || "Unknown error"));
        }
      })
      .catch(error => {
        loadingMessage.style.display = "none";
        alert("There was an error submitting the form. Please try again.");
        console.error(error);
      });
  });
});