// Bibliothèque de fonction pour la validation des grimpes
const grimpeValidator = {
    checkSiTitreEstValide(titre) {
        let titreMsgErr = [];
        let titreIsVaild = true;

        if (titre === "") {
            titreMsgErr.push("Est requis !");
            titreIsVaild = false;
        }
        if (titre.length < 3 && titre.length > 0) {
            titreMsgErr.push("Min. 3 caractères !");
            titreIsVaild = false;
        }
        if (titre.length > 50) {
            titreMsgErr.push("Max. 50 caractères !");
            titreIsVaild = false;
        }
        return [titreMsgErr, titreIsVaild];
    },
    checkSiStyleEstValide(style) {
        let styleMsgErr = [];
        let styleEstValide = true;

        if (style === "" || style === "Choisir le style") {
            styleMsgErr.push("Est requis !");
            styleEstValide = false;
        }
        if (style !== "Traditionnelle" && style !== "Sportive" && style !== "Moulinette" && style !== "" && style !== "Choisir le style") {
            styleMsgErr.push("Valeur invalide ! Traditionnelle, Sportive, Moulinette");
            styleEstValide = false;
        }
        return [styleMsgErr, styleEstValide];
    },
    checkSiDescriptionEstValide(desc) {
        let descriptionMsgErr = [];
        let descEstValide = true;

        if (desc === "") {
            descriptionMsgErr.push("Est requis !");
            descEstValide = false;
        }
        if (desc.length < 3 && desc.length > 0) {
            descriptionMsgErr.push("Min. 3 caractères !");
            descEstValide = false;
        }
        if (desc.length > 500) {
            descriptionMsgErr.push("Max. 500 caractères !");
            descEstValide = false;
        }

        return [descriptionMsgErr, descEstValide];
    },
    checkSiDifficultyLevelEstValide(diff) {
        let diffMsgErr = [];
        let diffIsVaild = true;
        if (diff === "" || diff === "Choisir la difficulté") {
            diffMsgErr.push("Est requis !");
            diffIsVaild = false;
        }
        const regex = new RegExp("^[0-9]{1,2}$");
        if (regex.test(diff) === false && diff.length > 0 && diff !== "Choisir la difficulté") {
            diffMsgErr.push("Valeur invalide ! 5.6 à 5.15");
            diffIsVaild = false;
        }
        return [diffMsgErr, diffIsVaild];
    },
    checkSiLieuEstValide(lieu) {
        let lieuMsgErr = [];
        let lieuIsVaild = true;

        if (lieu === "" || lieu === "Choisir le lieu") {
            lieuMsgErr.push("Est requis !");
            lieuIsVaild = false;
        }

        return [lieuMsgErr, lieuIsVaild];
    },
};

module.exports = grimpeValidator;
