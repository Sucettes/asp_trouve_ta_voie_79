// Bibliothèque de fonction pour la validation des lieux.
const lieuValidator = {
    checkTitreEstValide(titre) {
        let titreMsgErr = [];
        let titreEstValide = true;

        if (titre === "") {
            titreMsgErr.push("Est requis !");
            titreEstValide = false;
        }
        if (titre.length < 3 && titre.length > 0) {
            titreMsgErr.push("Min. 3 caractères !");
            titreEstValide = false;
        }
        if (titre.length > 50) {
            titreMsgErr.push("Max. 50 caractères !");
            titreEstValide = false;
        }

        return [titreMsgErr, titreEstValide];
    },
    checkDescriptionEstValide(desc) {
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
    checkInstructionEstValide(inst) {
        let instructionMsgErr = [];
        let instrucEstValide = true;

        if (inst === "") {
            instructionMsgErr.push("Est requis !");
            instrucEstValide = false;
        }
        if (inst.length < 3 && inst.length > 0) {
            instructionMsgErr.push("Min. 3 caractères !");
            instrucEstValide = false;
        }
        if (inst.length > 500) {
            instructionMsgErr.push("Max. 500 caractères !");
            instrucEstValide = false;
        }

        return [instructionMsgErr, instrucEstValide];
    },
    checkLatitudeEstValide(lat) {
        let valMsgErr = [];
        let valEstValide = true;

        if (lat === "") {
            valMsgErr.push("Est requis !");
            valEstValide = false;
        }
        if (lat > 90 || lat < -90) {
            valMsgErr.push("Dois être entre -90 et 90");
            valEstValide = false;
        }
        const regex = new RegExp("^[-0-9.]+$");
        if (regex.test(lat) === false && lat.length > 0) {
            valMsgErr.push("Valeur invalide ! Valeur autorisés : (0 à 9 et .)");
            valEstValide = false;
        }

        return [valMsgErr, valEstValide];
    },
    checkLongitudeEstValide(lon) {
        let valMsgErr = [];
        let valEstValide = true;

        if (lon === "") {
            valMsgErr.push("Est requis !");
            valEstValide = false;
        }
        if (lon > 180 || lon < -180) {
            valMsgErr.push("Dois être entre -180 et 180");
            valEstValide = false;
        }
        const regex = new RegExp("^[-0-9.]+$");
        if (regex.test(lon) === false && lon.length > 0) {
            valMsgErr.push("Valeur invalide ! Valeur autorisés : (0 à 9 et .)");
            valEstValide = false;
        }

        return [valMsgErr, valEstValide];
    },
};

module.exports = lieuValidator;
