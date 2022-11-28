import {createStore} from "vuex";
import authModule from "./modules/auth/index.js";
import lieuModule from "./modules/lieu/index.js";
import grimpeModule from "./modules/grimpe/index.js";


export default createStore({
    modules: {
        auth: authModule,
        lieu: lieuModule,
        grimpe: grimpeModule
    }
});
