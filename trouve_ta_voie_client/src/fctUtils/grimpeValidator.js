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

        if (style !== "Traditionnelle" && style !== "Sportive" && style === "Moulinette") {
            styleMsgErr.push("");
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

        if (diff === "") {
            diffMsgErr.push("Est requis !");
            diffIsVaild = false;
        }

        return [diffMsgErr, diffIsVaild];
    }
};

module.exports = grimpeValidator;
