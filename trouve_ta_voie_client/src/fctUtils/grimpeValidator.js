const grimpeValidator = {
    checkIfTitleIsValid(title) {
        let titleMsgErr = [];
        let titleIsVaild = true;

        if (title === "") {
            titleMsgErr.push("Est requis !");
            titleIsVaild = false;
        }
        if (title.length < 3 && title.length > 0) {
            titleMsgErr.push("Trop court !");
            titleIsVaild = false;
        }
        if (title.length > 50) {
            titleMsgErr.push("Trop long !");
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
            styleMsgErr.push("Valeur invalide !");
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
            descriptionMsgErr.push("Trop court !");
            descIsValid = false;
        }
        if (desc.length > 500) {
            descriptionMsgErr.push("Trop long !");
            descIsValid = false;
        }
        // const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        // if (regex.test(desc) === false && desc.length > 0) {
        //     descriptionMsgErr.push("Valeur invalide !");
        //     descIsValid = false;
        // }

        return [descriptionMsgErr, descIsValid];
    },
    checkIfDifficultyLevelIsValid(diff) {
        let diffMsgErr = [];
        let diffIsVaild = true;
        if (diff === "" || diff === "Choisir la difficulté") {
            diffMsgErr.push("Est requis !");
            diffIsVaild = false;
        }
        const regex = new RegExp("^5\\.+((1[0-5])|([6-9]+0?))$");
        if (regex.test(diff) === false && diff.length > 0 && diff !== "Choisir la difficulté") {
            diffMsgErr.push("Valeur invalide !");
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
    }
};

module.exports = grimpeValidator;
