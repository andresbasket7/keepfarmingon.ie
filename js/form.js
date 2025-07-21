window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("gform");
    const thankYouMessage = document.querySelector(".thankyou_message");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            form.style.display = "none";
            thankYouMessage.style.display = "block";
          } else {
            alert("There was an error submitting the form.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An unexpected error occurred.");
        });
    });
  });