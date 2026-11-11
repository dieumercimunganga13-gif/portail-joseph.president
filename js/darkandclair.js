document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const body = document.body;
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  // Fonction pour afficher/masquer les icônes selon le mode actif
  function updateIcons(isDarkMode) {
    if (sunIcon && moonIcon) {
      if (isDarkMode) {
        sunIcon.style.display = "inline-block"; // Affiche le soleil (pour repasser en clair)
        moonIcon.style.display = "none"; // Cache la lune
      } else {
        sunIcon.style.display = "none"; // Cache le soleil
        moonIcon.style.display = "inline-block"; // Affiche la lune (pour passer en sombre)
      }
    }
  }

  // 1. Vérifier si un thème était déjà enregistré au chargement de la page
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateIcons(true);
  } else {
    body.classList.remove("dark-mode");
    updateIcons(false);
  }

  // 2. Basculer le mode au clic sur le bouton Soleil/Lune
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");

      // 3. Sauvegarder la préférence de l'utilisateur et mettre à jour les icônes
      if (isDark) {
        localStorage.setItem("theme", "dark");
        updateIcons(true);
      } else {
        localStorage.setItem("theme", "light");
        updateIcons(false);
      }
    });
  }
});
