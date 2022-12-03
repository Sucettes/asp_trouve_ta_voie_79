// Bibliothèque de fonction pour la validation des lieux.
const lieuValidator = {
    checkTitleIsValid(title) {
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
    checkDescriptionIsValid(desc) {
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
    checkInstructionIsValid(inst) {
        let instructionMsgErr = [];
        let instrucIsValid = true;

        if (inst === "") {
            instructionMsgErr.push("Est requis !");
            instrucIsValid = false;
        }
        if (inst.length < 3 && inst.length > 0) {
            instructionMsgErr.push("Min. 3 caractères !");
            instrucIsValid = false;
        }
        if (inst.length > 500) {
            instructionMsgErr.push("Max. 500 caractères !");
            instrucIsValid = false;
        }

        return [instructionMsgErr, instrucIsValid];
    },
    checkLatitudeIsValid(lat) {
        let valMsgErr = [];
        let valIsValid = true;

        if (lat === "") {
            valMsgErr.push("Est requis !");
            valIsValid = false;
        }
        if (lat > 90 || lat < -90) {
            valMsgErr.push("Dois être entre -90 et 90");
            valIsValid = false;
        }
        const regex = new RegExp("^[-0-9.]+$");
        if (regex.test(lat) === false && lat.length > 0) {
            valMsgErr.push("Valeur invalide ! Valeur autorisés : (0 à 9 et .)");
            valIsValid = false;
        }

        return [valMsgErr, valIsValid];
    },
    checkLongitudeIsValid(lon) {
        let valMsgErr = [];
        let valIsValid = true;

        if (lon === "") {
            valMsgErr.push("Est requis !");
            valIsValid = false;
        }
        if (lon > 180 || lon < -180) {
            valMsgErr.push("Dois être entre -180 et 180");
            valIsValid = false;
        }
        const regex = new RegExp("^[-0-9.]+$");
        if (regex.test(lon) === false && lon.length > 0) {
            valMsgErr.push("Valeur invalide ! Valeur autorisés : (0 à 9 et .)");
            valIsValid = false;
        }

        return [valMsgErr, valIsValid];
    },
};

module.exports = lieuValidator;
