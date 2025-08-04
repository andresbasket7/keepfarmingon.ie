document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".text-item");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;

  function showText(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showText(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showText(currentIndex);
  });
});