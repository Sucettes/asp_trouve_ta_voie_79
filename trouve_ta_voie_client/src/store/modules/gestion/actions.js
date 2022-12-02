export default {
    async startLoading(context) {
        context.commit("addLoading");
    },
    async stopLoading(context) {
        // Pour éviter des bugs d'affichage
        await new Promise(resolve => setTimeout(resolve, 80));
        context.commit("removeLoading");
    },
};
