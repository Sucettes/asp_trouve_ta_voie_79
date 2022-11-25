import {createStore} from 'vuex';
import authModule from './modules/auth/index.js';
import lieuModule from './modules/lieu/index.js';

export default createStore({
    modules: {
        auth: authModule,
        lieu: lieuModule
    }
});
