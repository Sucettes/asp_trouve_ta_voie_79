const validatorFct = {
    userPwdIsValid(pwd) {
        const pwdRegex = new RegExp('^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$');

        if (pwd === "") return false;
        else if (pwd.length < 6) return false;
        else if (!pwdRegex.test(pwd)) return false;
        return true;
    },
    userEmailIsValid(email) {
        const emailRegex = new RegExp('^(\\w|\\.|\\_|\\-)+[@](\\w|\\_|\\-|\\.)+[.]\\w{2,3}$');

        if (email === "") return false;
        else if (email.length > 50) return false;
        else if (!emailRegex.test(email)) return false;
        return true;
    },
    userNameIsValid(name) {
        const nameRegex = new RegExp('^[A-Za-z\\s-]+$');

        if (name === "") return false;
        else if (name.length < 3 || name.length > 50) return false;
        else if (!nameRegex.test(name)) return false;
        return true;
    },
    locationTitleIsValid(title) {
        if (title.length < 3 || title.length > 50) return false;
        const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        return regex.test(title) !== false;
    },
    locationDescriptionIsValid(description) {
        if (description.length < 3 || description.length > 500) return false;
        const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        return regex.test(description) !== false;
    },
    locationInstructionIsValid(instruction) {
        if (instruction.length < 3 || instruction.length > 500) return false;
        const regex = new RegExp('^[0-9A-Za-z\\s-]+$');
        return regex.test(instruction) !== false;
    },
    locationGEOIsValid(latitude, longitude) {
        if (latitude < -180 || latitude > 180) return false;
        if (longitude < -180 || longitude > 180) return false;
        return true;
    }
};

module.exports = validatorFct;
