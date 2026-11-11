document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    const today = new Date();

    // Formater la date au format JJ/MM/AA (ex: 06/11/26)
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);

    dateElement.textContent = `${day}/${month}/${year}`;
  }
});
