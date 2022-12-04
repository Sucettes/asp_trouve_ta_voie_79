// Bibliothèque de fonction pour la validation des grimpes
const grimpeValidator = {
    checkIfTitleIsValid(title) {
        if (title === "") return false;
        if (title.length < 3 && title.length > 0) return false;
        return title.length <= 50;
    },
    checkIfStyleIsValid(style) {
        if (style === "" || style === "Choisir le style") return false;
        return !(style !== "Traditionnelle" && style !== "Sportive" && style !== "Moulinette" && style !== "" && style !== "Choisir le style");
    },
    checkIfDescriptionIsValid(desc) {
        if (desc === "") return false;
        if (desc.length < 3 && desc.length > 0) return false;
        return desc.length <= 500;
    },
    checkIfDifficultyLevelIsValid(diff) {
        if (diff === "" || diff === "Choisir la difficulté") return false;
        if (+diff > 15 || +diff < 6) return false;
        const regex = new RegExp("^[0-9]{1,2}$");
        return !(regex.test(diff) === false && diff.length > 0 && diff !== "Choisir la difficulté");
    },
};

module.exports = grimpeValidator;
