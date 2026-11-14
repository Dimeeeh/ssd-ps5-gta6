/**
 * PROJET : PS5-Storage-Check (Spécial GTA 6)
 * FICHIER : script.js (Modèle de données internationalisé + Contrôleur logique)
 * ENCODAGE : UTF-8
 */

// 1. DICTIONNAIRE DES LANGUES (Interface utilisateur FR / EN)
const traductionsUI = {
    fr: {
        titrePrincipal: "Configurateur SSD PS5 – Spécial GTA 6",
        sousTitre: "Vérifie la compatibilité exacte avec ta console en 2 clics (Norme Sony 5 500 Mo/s minimum).",
        questionProfil: "1. À quoi joues-tu en plus de GTA 6 ?",
        btnLeger: "1 ou 2 jeux max (1 To)",
        btnRecommande: "Warzone + FC + GTA 6 (2 To - Recommandé)",
        btnUltime: "Gros catalogue 15 jeux et plus (4 To)",
        vitesseLabel: "Vitesse certifiée :",
        dissipateurLabel: "Dissipateur thermique Sony :",
        dissipateurOui: "Inclus et pré-monté ✅",
        btnAcheter: "Vérifier le prix et la promo sur Amazon",
        titreAccessoire: "⚠️ Ne foire pas la vis de ta PS5 :",
        btnAccessoire: "Ajouter le tournevis PS5 au panier",
        mentionLegale: "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises."
    },
    en: {
        titrePrincipal: "PS5 SSD Configurator – GTA 6 Ready",
        sousTitre: "Check exact compatibility for your console in 2 clicks (Sony 5,500 MB/s standard).",
        questionProfil: "1. What do you play besides GTA 6?",
        btnLeger: "1 or 2 games max (1 TB)",
        btnRecommande: "COD Warzone + FC + GTA 6 (2 TB - Best Seller)",
        btnUltime: "Massive library 15+ games (4 TB)",
        vitesseLabel: "Certified Speed:",
        dissipateurLabel: "Sony Heatsink:",
        dissipateurOui: "Included & Pre-installed ✅",
        btnAcheter: "Check Price & Deal on Amazon",
        titreAccessoire: "⚠️ Don't strip your PS5 M.2 screw:",
        btnAccessoire: "Add PS5 PH1 Screwdriver to cart",
        mentionLegale: "As an Amazon Associate I earn from qualifying purchases."
    }
};

// 2. BASE DE DONNÉES DES SSD (Avec textes FR/EN et liens FR / BE / US)
const catalogueSSD = [
    {
        id: "ssd-1to",
        profilCible: "leger",
        nom: "Corsair MP600 PRO LPX (1 TB / 1 To)",
        vitesse: "7 100 MB/s",
        textes: {
            fr: {
                badge: "Le choix Économique",
                argument: "Idéal pour installer GTA 6 et conserver 2 ou 3 jeux sans jamais saturer la console."
            },
            en: {
                badge: "Budget Pick",
                argument: "Perfect to install GTA 6 and keep 2 or 3 big games without running out of space."
            }
        },
        liensAmazon: {
            FR: "https://www.amazon.fr/s?k=Corsair+MP600+PRO+LPX+1To",
            BE: "https://www.amazon.com.be/s?k=Corsair+MP600+PRO+LPX+1To",
            US: "https://www.amazon.com/s?k=Corsair+MP600+PRO+LPX+1TB"
        }
    },
    {
        id: "ssd-2to",
        profilCible: "recommande",
        nom: "Samsung 990 PRO Heatsink (2 TB / 2 To)",
        vitesse: "7 450 MB/s",
        textes: {
            fr: {
                badge: "🔥 Recommandé pour GTA 6 (Best-Seller)",
                argument: "Vitesse maximale autorisée sur PS5. Garde GTA 6, Call of Duty, FC et plusieurs autres gros jeux installés en permanence."
            },
            en: {
                badge: "🔥 Best-Seller for GTA 6",
                argument: "Max speed supported by PS5. Keep GTA 6, Warzone, FC and several other big games installed permanently."
            }
        },
        liensAmazon: {
            FR: "https://www.amazon.fr/s?k=Samsung+990+PRO+2To+dissipateur+PS5",
            BE: "https://www.amazon.com.be/s?k=Samsung+990+PRO+2To+dissipateur+PS5",
            US: "https://www.amazon.com/s?k=Samsung+990+PRO+2TB+with+Heatsink+PS5"
        }
    },
    {
        id: "ssd-4to",
        profilCible: "ultime",
        nom: "WD_BLACK SN850P Official PS5 (4 TB / 4 To)",
        vitesse: "7 300 MB/s",
        textes: {
            fr: {
                badge: "Édition Officielle PlayStation - Capacité Max",
                argument: "Sous licence officielle Sony. 15 jeux AAA et plus installés simultanément sans jamais rien supprimer."
            },
            en: {
                badge: "Official PlayStation Licensed - Max Storage",
                argument: "Officially licensed by Sony. Store 15+ AAA games simultaneously without ever deleting a game."
            }
        },
        liensAmazon: {
            FR: "https://www.amazon.fr/s?k=WD+BLACK+SN850P+4To+PS5",
            BE: "https://www.amazon.com.be/s?k=WD+BLACK+SN850P+4To+PS5",
            US: "https://www.amazon.com/s?k=WD+BLACK+SN850P+4TB+PS5"
        }
    }
];

// 3. ACCESSOIRE CROSS-SELL (Tournevis PS5)
const accessoirePS5 = {
    textes: {
        fr: {
            nom: "Tournevis magnétique de précision PH1 (Spécial vis M.2 PS5)",
            explication: "La vis interne de la PS5 est ultra-fragile : utilise un embout PH1 aimanté pour ne pas foirer le pas de vis."
        },
        en: {
            nom: "Magnetic PH1 Precision Screwdriver (For PS5 M.2 Screw)",
            explication: "The internal PS5 screw strips very easily: always use a magnetic PH1 tip during installation."
        }
    },
    liensAmazon: {
        FR: "https://www.amazon.fr/s?k=tournevis+precision+ps5+ssd+ph1",
        BE: "https://www.amazon.com.be/s?k=tournevis+precision+ps5+ssd+ph1",
        US: "https://www.amazon.com/s?k=ps5+ssd+magnetic+screwdriver+ph1"
    }
};

// 4. VARIABLES D'ÉTAT (State)
let paysActuel = "FR";
let langueActuelle = "fr";
let profilSelectionne = "recommande";

/** FONCTION 1 : Détection automatique du pays et de la langue du navigateur */
function detecterRegionUtilisateur() {
    const codeNavigateur = (navigator.language || "fr-FR").toUpperCase();

    if (codeNavigateur.includes("BE")) {
        paysActuel = "BE";
        langueActuelle = "fr";
    } else if (codeNavigateur.startsWith("EN")) {
        paysActuel = "US";
        langueActuelle = "en";
    } else {
        paysActuel = "FR";
        langueActuelle = "fr";
    }

    const selecteurRegion = document.getElementById("select-region");
    if (selecteurRegion) {
        selecteurRegion.value = paysActuel;
    }
}

/** FONCTION 2 : Recherche du SSD selon le profil */
function trouverSSDParProfil(profilRecherche) {
    for (let i = 0; i < catalogueSSD.length; i++) {
        if (catalogueSSD[i].profilCible === profilRecherche) {
            return catalogueSSD[i];
        }
    }
    return catalogueSSD[1];
}

/** FONCTION 3 : Mise à jour de l'interface (DOM) */
function mettreAJourAffichage() {
    const ui = traductionsUI[langueActuelle];
    const ssd = trouverSSDParProfil(profilSelectionne);
    const texteSSD = ssd.textes[langueActuelle];
    const texteAcc = accessoirePS5.textes[langueActuelle];

    document.getElementById("ui-titre").textContent = ui.titrePrincipal;
    document.getElementById("ui-soustitre").textContent = ui.sousTitre;
    document.getElementById("ui-question").textContent = ui.questionProfil;
    document.getElementById("btn-leger").textContent = ui.btnLeger;
    document.getElementById("btn-recommande").textContent = ui.btnRecommande;
    document.getElementById("btn-ultime").textContent = ui.btnUltime;
    document.getElementById("ui-mention").textContent = ui.mentionLegale;

    document.getElementById("ssd-badge").textContent = texteSSD.badge;
    document.getElementById("ssd-nom").textContent = ssd.nom;
    document.getElementById("ssd-vitesse-label").textContent = ui.vitesseLabel;
    document.getElementById("ssd-vitesse-val").textContent = ssd.vitesse;
    document.getElementById("ssd-dissipateur-label").textContent = ui.dissipateurLabel;
    document.getElementById("ssd-dissipateur-val").textContent = ui.dissipateurOui;
    document.getElementById("ssd-argument").textContent = texteSSD.argument;

    const boutonAmazon = document.getElementById("ssd-lien-amazon");
    boutonAmazon.textContent = ui.btnAcheter + " (" + paysActuel + ")";
    boutonAmazon.href = ssd.liensAmazon[paysActuel];

    document.getElementById("acc-titre").textContent = ui.titreAccessoire;
    document.getElementById("acc-nom").textContent = texteAcc.nom;
    document.getElementById("acc-explication").textContent = texteAcc.explication;
    const boutonAcc = document.getElementById("acc-lien-amazon");
    boutonAcc.textContent = ui.btnAccessoire + " (" + paysActuel + ")";
    boutonAcc.href = accessoirePS5.liensAmazon[paysActuel];
}

/** FONCTION 4 : Gestionnaires d'événements */
function changerProfil(nouveauProfil) {
    profilSelectionne = nouveauProfil;

    document.getElementById("btn-leger").classList.remove("actif");
    document.getElementById("btn-recommande").classList.remove("actif");
    document.getElementById("btn-ultime").classList.remove("actif");
    document.getElementById("btn-" + nouveauProfil).classList.add("actif");

    mettreAJourAffichage();
}

function changerRegionManuellement(nouveauPays) {
    paysActuel = nouveauPays;
    langueActuelle = (nouveauPays === "US") ? "en" : "fr";
    mettreAJourAffichage();
}

window.addEventListener("DOMContentLoaded", function () {
    detecterRegionUtilisateur();
    mettreAJourAffichage();
});
