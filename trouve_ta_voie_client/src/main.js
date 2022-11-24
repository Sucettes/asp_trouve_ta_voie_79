import {createApp} from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
