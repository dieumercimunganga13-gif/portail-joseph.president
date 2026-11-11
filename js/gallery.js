document.addEventListener("DOMContentLoaded", () => {
  const mediaGrid = document.getElementById("mediaGrid");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (mediaGrid && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalItems = mediaGrid.children.length;
    const itemsVisible = 3;
    const cardWidth = 180 + 30; // Largeur de la carte (180px) + l'espace (gap de 30px)

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalItems - itemsVisible) {
        currentIndex++;
        mediaGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        mediaGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });
  }
});
