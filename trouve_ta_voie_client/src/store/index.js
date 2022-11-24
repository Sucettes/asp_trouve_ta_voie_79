import {createStore} from 'vuex';
import authModule from './modules/auth/index.js';

export default createStore({
    modules: {
        auth: authModule
    }
});
