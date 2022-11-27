const lieuValidator = {
    checkTitleIsValid(title) {
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
        // const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        // if (regex.test(title) === false && title.length > 0) {
        //     titleMsgErr.push("Valeur invalide !");
        //     titleIsVaild = false;
        // }

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
    checkInstructionIsValid(inst) {
        let instructionMsgErr = [];
        let instrucIsValid = true;

        if (inst === "") {
            instructionMsgErr.push("Est requis !");
            instrucIsValid = false;
        }
        if (inst.length < 3 && inst.length > 0) {
            instructionMsgErr.push("Trop court !");
            instrucIsValid = false;
        }
        if (inst.length > 500) {
            instructionMsgErr.push("Trop long !");
            instrucIsValid = false;
        }
        // const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        // if (regex.test(inst) === false && inst.length > 0) {
        //     instructionMsgErr.push("Valeur invalide !");
        //     instrucIsValid = false;
        // }

        return [instructionMsgErr, instrucIsValid];
    },
    checkLatitudeLongitudeIsValid(val) {
        let valMsgErr = [];
        let valIsValid = true;

        if (val === "") {
            console.log(val)
            valMsgErr.push("Est requis !");
            valIsValid = false;
        }
        if (val > 180 || val < -180) {
            valMsgErr.push("Dois être entre -180 et 180");
            valIsValid = false;
        }
        if (!/^[-+]?([1-8]?\d(.\d+)?|90(.0+)?)$/.test(val) && val.length > 0) {
            valMsgErr.push("Valeur invalide !");
            valIsValid = false;
        }

        return [valMsgErr, valIsValid];
    }
};

module.exports = lieuValidator;
