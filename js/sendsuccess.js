document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nomInput = document.getElementById("nomInput");
  const messageInput = document.getElementById("messageInput");
  const errorBox = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  const successBox = document.getElementById("successMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nomVal = nomInput.value.trim();
      const messageVal = messageInput.value.trim();

      // Réinitialisation des états d'erreur
      nomInput.classList.remove("input-error");
      messageInput.classList.remove("input-error");
      errorBox.style.display = "none";

      // Contrôle des champs vides
      if (!nomVal || !messageVal) {
        let msg = "";

        if (!nomVal && !messageVal) {
          msg = "Veuillez entrer votre nom et votre message.";
          nomInput.classList.add("input-error");
          messageInput.classList.add("input-error");
        } else if (!nomVal) {
          msg = "Veuillez entrer votre nom.";
          nomInput.classList.add("input-error");
        } else {
          msg = "Veuillez entrer votre message.";
          messageInput.classList.add("input-error");
        }

        errorText.textContent = msg;

        // Réinitialise l'animation CSS pour qu'elle rejoue à chaque clic
        errorBox.style.display = "flex";
        errorBox.style.animation = "none";
        errorBox.offsetHeight; // Forcer le reflow
        errorBox.style.animation =
          "slideInFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, shakeError 0.4s ease-in-out";
        return;
      }

      const formData = new FormData(form);
      let actionUrl = form.action;
      if (!actionUrl.includes("/ajax/")) {
        actionUrl = actionUrl.replace("formsubmit.co/", "formsubmit.co/ajax/");
      }

      fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            form.style.display = "none";
            errorBox.style.display = "none";
            const instructionP = form.previousElementSibling;
            if (instructionP && instructionP.tagName === "P") {
              instructionP.style.display = "none";
            }
            successBox.style.display = "flex";
          } else {
            alert("Une erreur est survenue lors de l'envoi.");
          }
        })
        .catch(() => {
          alert("Erreur de connexion réseau.");
        });
    });

    [nomInput, messageInput].forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
        if (nomInput.value.trim() && messageInput.value.trim()) {
          errorBox.style.display = "none";
        }
      });
    });
  }
});
