import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/js/bootstrap.min.js";
import Toaster from "@meforma/vue-toaster";

const app = createApp(App);

app.use(Toaster, {
    position: "top-right",
    duration: 4000,
});
app.use(store);
app.use(router);

app.mount("#app");
