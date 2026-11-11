document.addEventListener("DOMContentLoaded", () => {
  const filterToggleBtn = document.getElementById("filterToggleBtn");
  const filterMenu = document.getElementById("filterMenu");

  if (filterToggleBtn && filterMenu) {
    filterToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filterMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !filterMenu.contains(e.target) &&
        !filterToggleBtn.contains(e.target)
      ) {
        filterMenu.classList.remove("show");
      }
    });
  }

  // 1. Calcul dynamique du nombre d'éléments pour les badges sur l'accueil
  const totalEncours = document.querySelectorAll(
    '.projet-card-item[data-category="encours"]',
  ).length;
  const totalAvenir = document.querySelectorAll(
    '.projet-card-item[data-category="avenir"]',
  ).length;
  const totalRealises = document.querySelectorAll(
    '.projet-card-item[data-category="realises"]',
  ).length;

  const badgeEncours = document.getElementById("countEncours");
  const badgeAvenir = document.getElementById("countAvenir");

  if (badgeEncours) badgeEncours.textContent = totalEncours;
  if (badgeAvenir) badgeAvenir.textContent = totalAvenir;

  // 2. Détection du choix utilisateur dans l'URL (pour projet_action.html)
  const urlParams = new URLSearchParams(window.location.search);
  const currentStatus = urlParams.get("status") || "encours";

  const optionEncours = document.getElementById("optionEncours");
  const optionAvenir = document.getElementById("optionAvenir");
  const optionRealises = document.getElementById("optionRealises");

  document
    .querySelectorAll(".filter-dot")
    .forEach((dot) => dot.classList.remove("cyan-dot"));

  if (currentStatus === "avenir" && optionAvenir) {
    if (optionAvenir.querySelector(".filter-dot"))
      optionAvenir.querySelector(".filter-dot").classList.add("cyan-dot");
    filterProjets("avenir", "À venir");
  } else if (currentStatus === "realises" && optionRealises) {
    if (optionRealises.querySelector(".filter-dot"))
      optionRealises.querySelector(".filter-dot").classList.add("cyan-dot");
    filterProjets("realises", "Réalisations");
  } else if (optionEncours) {
    if (optionEncours.querySelector(".filter-dot"))
      optionEncours.querySelector(".filter-dot").classList.add("cyan-dot");
    filterProjets("encours", "En cours");
  }
});

function filterProjets(category, categoryName) {
  const projetCards = document.querySelectorAll(".projet-card-item");
  const projetsContainer = document.getElementById("projetsContainer");
  const emptyState = document.getElementById("emptyState");
  const categoryTitleText = document.getElementById("categoryTitleText");
  const categoryCount = document.getElementById("categoryCount");
  const emptyTextElement = document.querySelector(".empty-text");

  let visibleCount = 0;

  projetCards.forEach((card) => {
    if (card.dataset.category === category) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (categoryTitleText) categoryTitleText.textContent = categoryName;

  if (visibleCount > 0) {
    if (projetsContainer) projetsContainer.style.display = "flex";
    if (emptyState) emptyState.style.display = "none";
    if (categoryCount) categoryCount.textContent = visibleCount;
  } else {
    if (projetsContainer) projetsContainer.style.display = "none";
    if (emptyState) emptyState.style.display = "flex";
    if (categoryCount) categoryCount.textContent = "0";

    // Personnalisation dynamique du texte selon la catégorie vide
    if (emptyTextElement) {
      if (category === "encours") {
        emptyTextElement.textContent = "AUCUNE ACTUALITÉ POUR L'INSTANT";
      } else if (category === "avenir") {
        emptyTextElement.textContent = "AUCUN ÉVÉNEMENT À VENIR";
      } else if (category === "realises") {
        emptyTextElement.textContent = "AUCUNE RÉALISATION POUR L'INSTANT";
      }
    }
  }
}
