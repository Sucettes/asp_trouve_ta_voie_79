"use strict";

// Bibliothèque de fonction pour la validation de certaines valeurs.
const validatorFct = {
    // Vérifie si le mot de passe est valide.
    userPwdIsValid(pwd) {
        const pwdRegex = new RegExp("^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$");

        if (pwd === "") return false;
        else if (pwd.length < 6) return false;
        else if (!pwdRegex.test(pwd)) return false;
        return true;
    },
    // Vérifie si le courriel est valide.
    userEmailIsValid(email) {
        const emailRegex = new RegExp("^(\\w|\\.|\\_|\\-)+[@](\\w|\\_|\\-|\\.)+[.]\\w{2,3}$");

        if (email === "") return false;
        else if (email.length > 50) return false;
        else if (!emailRegex.test(email)) return false;
        return true;
    },
    // Vérifie si le nom d'utilisateur est valide.
    userNameIsValid(name) {
        const nameRegex = new RegExp("^[A-Za-z\\s-]+$");

        if (name === "") return false;
        else if (name.length < 3 || name.length > 50) return false;
        else if (!nameRegex.test(name)) return false;
        return true;
    },
    // Vérifie si le nom du lieu est valide.
    locationTitleIsValid(title) {
        return !(title.length < 3 || title.length > 50);
    },
    // Vérifie si la description du lieu est valide.
    locationDescriptionIsValid(description) {
        return !(description.length < 3 || description.length > 500);
    },
    // Vérifie si les instructions du lieu sont valides.
    locationInstructionIsValid(instruction) {
        return !(instruction.length < 3 || instruction.length > 500);
    },
    // Vérifie si la latitude et longitude est valide.
    locationGEOIsValid(latitude, longitude) {
        if (latitude < -90 || latitude > 90) return false;
        if (longitude < -180 || longitude > 180) return false;
        const regex = new RegExp("^[-0-9.]+$");
        if (regex.test(latitude) === false && latitude.length > 0) {
            return false;
        }
        if (regex.test(longitude) === false && longitude.length > 0) {
            return false;
        }

        return true;
    },
};

module.exports = validatorFct;
