document.addEventListener("DOMContentLoaded", () => {
  // Pour faciliter tes tests, la fonctionnalité est active par défaut.
  // (Si tu veux l'activer/désactiver via les paramètres, localStorage prendra le relais).
  const storedSetting = localStorage.getItem("photoModalActive");
  const isFeatureEnabled =
    storedSetting === null ? true : storedSetting === "true";

  if (isFeatureEnabled) {
    // Active les styles interactifs sur les photos
    document.body.classList.add("modal-feature-active");

    // Création dynamique de la fenêtre modale (Lightbox)
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "photo-modal-overlay";
    modalOverlay.innerHTML = `
      <div class="photo-modal-box">
        <span class="photo-modal-close">&times;</span>
        <img class="photo-modal-content" id="modalActiveImg" src="" alt="Photo en grand">
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalImg = document.getElementById("modalActiveImg");
    const closeBtn = modalOverlay.querySelector(".photo-modal-close");

    // CIBLAGE ÉLARGI : Récupère absolument toutes les images des sections galeries et cartes
    const galleryImages = document.querySelectorAll(
      ".media-item img, .media-item-card img, .extra-card img, .sections-photos img, .sections-photos-zigzag img, .extra-gallery-section img",
    );

    galleryImages.forEach((img) => {
      // S'assure que le curseur change bien en pointeur
      img.style.cursor = "pointer";

      // Ouvre la modale au CLIC sur la photo
      img.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalImg.src = img.src;
        modalOverlay.style.display = "flex";
      });
    });

    // Fermer la modale en cliquant sur la croix (X)
    closeBtn.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });

    // Fermer la modale en cliquant en dehors de l'image (sur le fond sombre)
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });
  }
});
