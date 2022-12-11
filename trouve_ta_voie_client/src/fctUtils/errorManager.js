"use strict";


// Fais la gestion d'erreur (redirection)
exports.errorManager = async (err, store, router) => {
    switch (err.status) {
        case 401:
            store.dispatch("logout").then(() => {
                router.push({name: "401"});
            });
            break;
        case 403:
            router.push({name: "403"});
            break;
        case 404:
            router.push({name: "404"});
            break;
        case 500:
            router.push({name: "500"});
            break;
    }
};
