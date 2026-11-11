document.addEventListener("DOMContentLoaded", () => {
  const collapseBtn = document.getElementById("collapseAllBtn");
  const contentBoxes = document.querySelectorAll(".doc-content-box");
  const mainTitles = document.querySelectorAll(".doc-main-btn");

  let isAllCollapsed = false;

  // 1. Fonction ya "Tout replier / Tout déplier"
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      isAllCollapsed = !isAllCollapsed;

      contentBoxes.forEach((box) => {
        if (isAllCollapsed) {
          box.classList.add("collapsed");
        } else {
          box.classList.remove("collapsed");
        }
      });

      // Changer text ya bouton entre "Tout replier" mpe "Tout déplier"
      collapseBtn.textContent = isAllCollapsed
        ? "Tout déplier"
        : "Tout replier";
    });
  }

  // 2. Fonction soki muntu apesi clic na titre moko (ex: "Guide de l'étudiant") mpo e-replier kaka yango
  mainTitles.forEach((title) => {
    title.addEventListener("click", () => {
      // Ezali koluka bloc oyo ezali na nse ya titre yango
      const targetBox = title.nextElementSibling;
      if (targetBox && targetBox.classList.contains("doc-content-box")) {
        targetBox.classList.toggle("collapsed");
      }
    });
  });
});
