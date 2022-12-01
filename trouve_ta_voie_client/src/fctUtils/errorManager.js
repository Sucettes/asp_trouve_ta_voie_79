exports.errorManager = async (err, store, router) => {
    if (err.status === 401) {
        store.dispatch("logout").then(() => {router.push({name: "401"})});
    }
    if (err.status === 403) {
        router.push({name: "403"});
    }
    if (err.status === 500) {
        router.push({name: "500"})
    }
};
