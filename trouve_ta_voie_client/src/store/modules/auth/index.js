import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            name: localStorage.getItem("name"),
            // todo : Faire un requete au back-end avec c'est donne pour voir si il est connecte sinon le deco...
        };
    },
    mutations,
    actions,
    getters
};
