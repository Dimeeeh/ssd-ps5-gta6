/**
 * effects.js : compte à rebours GTA 6 (puis compteur "sorti depuis") + animation de la carte.
 * Se charge APRÈS script.js.
 */

// Mercredi 18 novembre 2026 à 1h00 (heure de Paris/Bruxelles). Le décalage +01:00 fixe l'heure pour tous les visiteurs.
const DATE_SORTIE_GTA6 = new Date("2026-11-18T01:00:00+01:00");

const textesCompteur = {
    fr: { tag: "GTA 6 arrive sur PS5", tagSorti: "GTA 6 est disponible", avant: "Sortie de GTA 6 dans", apres: "GTA 6 est sorti depuis", j: "Jours", h: "Heures", m: "Min", s: "Sec" },
    en: { tag: "GTA 6 is coming to PS5", tagSorti: "GTA 6 is out now", avant: "GTA 6 releases in", apres: "GTA 6 has been out for", j: "Days", h: "Hours", m: "Min", s: "Sec" }
};

function langueCompteur() {
    return (typeof langueActuelle !== "undefined" && textesCompteur[langueActuelle]) ? langueActuelle : "fr";
}

function deuxChiffres(n) {
    return String(n).padStart(2, "0");
}

function majCompteur() {
    const t = textesCompteur[langueCompteur()];
    const diff = DATE_SORTIE_GTA6 - new Date();
    const sorti = diff <= 0;
    const s = Math.floor(Math.abs(diff) / 1000);

    document.getElementById("ui-tag").textContent = sorti ? t.tagSorti : t.tag;
    document.getElementById("cd-titre").textContent = sorti ? t.apres : t.avant;
    document.getElementById("cd-l-j").textContent = t.j;
    document.getElementById("cd-l-h").textContent = t.h;
    document.getElementById("cd-l-m").textContent = t.m;
    document.getElementById("cd-l-s").textContent = t.s;

    document.getElementById("cd-j").textContent = deuxChiffres(Math.floor(s / 86400));
    document.getElementById("cd-h").textContent = deuxChiffres(Math.floor((s % 86400) / 3600));
    document.getElementById("cd-m").textContent = deuxChiffres(Math.floor((s % 3600) / 60));
    document.getElementById("cd-s").textContent = deuxChiffres(s % 60);
}

function animerCarte() {
    const carte = document.getElementById("carte-resultat");
    if (!carte) return;
    carte.classList.remove("anim");
    void carte.offsetWidth;
    carte.classList.add("anim");
}

window.addEventListener("DOMContentLoaded", function () {
    majCompteur();
    setInterval(majCompteur, 1000);

    const boutons = document.querySelector(".grille-boutons");
    if (boutons) {
        boutons.addEventListener("click", function (e) {
            if (e.target.closest("button")) animerCarte();
        });
    }
});
