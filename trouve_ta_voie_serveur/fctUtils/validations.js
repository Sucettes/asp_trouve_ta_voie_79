const validatorFct = {
    pwdIsValid(pwd) {
        const pwdRegex = new RegExp('^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$');

        if (pwd === "") return false;
        else if (pwd.length < 6) return false;
        else if (!pwdRegex.test(pwd)) return false;
        return true;
    },
    emailIsValid(email) {
        const emailRegex = new RegExp('^(\\w|\\.|\\_|\\-)+[@](\\w|\\_|\\-|\\.)+[.]\\w{2,3}$');

        if (email === "") return false;
        else if (email.length > 50) return false;
        else if (!emailRegex.test(email)) return false;
        return true;
    },
    nameIsValid(name) {
        const nameRegex = new RegExp('^[A-Za-z\\s-]+$');

        if (name === "") return false;
        else if (name.length < 3 || name.length > 50) return false;
        else if (!nameRegex.test(name)) return false;
        return true;
    }
};

module.exports = validatorFct;
