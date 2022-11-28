import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
        };
    },
    mutations,
    actions,
    getters
};
