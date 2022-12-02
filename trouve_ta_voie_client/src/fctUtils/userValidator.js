// Bibliothèque de fonction pour la validation des utilisateurs.
const userValidator = {
    checkIfEmailIsValid(email) {
        const emailRegex = new RegExp("^(\\w|\\.|\\_|\\-)+[@](\\w|\\_|\\-|\\.)+[.]\\w{2,3}$");
        let courrielVal = true;
        let courrielErreurs = [];

        if (email === "") {
            courrielVal = false;
            courrielErreurs.push("Est requis !");
        }
        if (email.length > 50) {
            courrielErreurs.push("Max. 50 caractères !");
            courrielVal = false;
        }
        if (emailRegex.test(email) === false && email.length > 0) {
            courrielErreurs.push("Format invalide !");
            courrielVal = false;
        }

        return [courrielErreurs, courrielVal];
    },
    checkIfPwdIsValid(pwd) {
        const mdpRegex = new RegExp("^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$");
        let mdpErreurs = [];
        let mdpVal = true;

        if (pwd === "") {
            mdpErreurs.push("Est requis !");
            mdpVal = false;
        }
        if (pwd.length < 6 && pwd.length > 0) {
            mdpErreurs.push("Min. 6 caractères !");
            mdpVal = false;
        }
        if (mdpRegex.test(pwd) === false && pwd.length > 0) {
            mdpErreurs.push("Invalide ! 1 chiffre, 1 minuscule / majuscule et 1 caractère spéciaux");
            mdpVal = false;
        }

        return [mdpErreurs, mdpVal];
    },
    checkIfNameIsValid(name) {
        let nomVal = true;
        let nomErreurs = [];
        const nomRegex = new RegExp("^[A-Za-z\\s-]+$");

        if (!name || name === "" || name.length < 0) {
            nomErreurs.push("Est requis !");
            nomVal = false;
        }
        if (name && name.length < 3 && name.length > 0) {
            nomErreurs.push("Min. 3 caractères !");
            nomVal = false;
        }
        if (name && name.length > 50) {
            nomErreurs.push("Max. 50 caractères !");
            nomVal = false;
        }
        if (nomRegex.test(name) === false && name.length > 0) {
            nomErreurs.push("Invalide ! Autorisé : (A à z, espace et -)");
            nomVal = false;
        }

        return [nomErreurs, nomVal];
    },
};

module.exports = userValidator;
