document.addEventListener('DOMContentLoaded', () => {
  console.log("Script contact.js chargé"); // log de vérification

  const form = document.getElementById('contact-form');
  const errorP = document.getElementById('contact-error');
  const successP = document.getElementById('contact-success');

  if (!form) {
    console.error("Le formulaire #contact-form est introuvable");
    return;
  }
  if (!errorP) {
    console.error("Élément #contact-error introuvable");
  }
  if (!successP) {
    console.error("Élément #contact-success introuvable");
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Soumission du formulaire interceptée");

    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const message = form.elements['message']?.value.trim();

    console.log("Valeurs : ", { name, email, message });

    if (!name || !email || !message) {
      console.log("Champs manquants");
      errorP.textContent = "🛑 Veuillez remplir tous les champs.";
      errorP.style.display = 'block';
      successP.style.display = 'none';
      return;
    }

    errorP.style.display = 'none';

    try {
      console.log("Envoi de la requête fetch...");
      const res = await fetch("https://formspree.io/f/mgvnvbro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, message })
      });

      console.log("Réponse reçue du serveur", res);

      const result = await res.json().catch(err => {
        console.warn("Impossible de parser la réponse JSON", err);
        return {};
      });
      console.log("Contenu JSON reçu :", result);

      if (res.ok) {
        console.log("Succès de la requête");
        successP.textContent = "Merci ! Votre message a bien été envoyé";
        successP.style.display = 'block';

        form.reset();

        setTimeout(() => {
          successP.style.display = 'none';
        }, 3000);
      } else {
        console.warn("État non OK", res.status);
        errorP.textContent = "❌ Une erreur s'est produite. Réessaie plus tard.";
        errorP.style.display = 'block';
      }
    } catch (err) {
      console.error("Erreur pendant fetch :", err);
      errorP.textContent = "❌ Une erreur s'est produite. Vérifie ta connexion.";
      errorP.style.display = 'block';
    }
  });
});
