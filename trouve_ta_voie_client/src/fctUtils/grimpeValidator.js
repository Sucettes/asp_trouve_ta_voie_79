// Bibliothèque de fonction pour la validation des grimpes
const grimpeValidator = {
    checkIfTitleIsValid(title) {
        let titleMsgErr = [];
        let titleIsVaild = true;

        if (title === "") {
            titleMsgErr.push("Est requis !");
            titleIsVaild = false;
        }
        if (title.length < 3 && title.length > 0) {
            titleMsgErr.push("Min. 3 caractères !");
            titleIsVaild = false;
        }
        if (title.length > 50) {
            titleMsgErr.push("Max. 50 caractères !");
            titleIsVaild = false;
        }
        return [titleMsgErr, titleIsVaild];
    },
    checkIfStyleIsValid(style) {
        let styleMsgErr = [];
        let styleIsValid = true;

        if (style === "" || style === "Choisir le style") {
            styleMsgErr.push("Est requis !");
            styleIsValid = false;
        }
        if (style !== "Traditionnelle" && style !== "Sportive" && style !== "Moulinette" && style !== "" && style !== "Choisir le style") {
            styleMsgErr.push("Valeur invalide ! Traditionnelle, Sportive, Moulinette");
            styleIsValid = false;
        }
        return [styleMsgErr, styleIsValid];
    },
    checkIfDescriptionIsValid(desc) {
        let descriptionMsgErr = [];
        let descIsValid = true;

        if (desc === "") {
            descriptionMsgErr.push("Est requis !");
            descIsValid = false;
        }
        if (desc.length < 3 && desc.length > 0) {
            descriptionMsgErr.push("Min. 3 caractères !");
            descIsValid = false;
        }
        if (desc.length > 500) {
            descriptionMsgErr.push("Max. 500 caractères !");
            descIsValid = false;
        }

        return [descriptionMsgErr, descIsValid];
    },
    checkIfDifficultyLevelIsValid(diff) {
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
    checkIfLieuIsValid(lieu) {
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
