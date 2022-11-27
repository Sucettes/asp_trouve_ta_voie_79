// let timer;

import axios from "axios";
import router from "@/router";


export default {
    async login(context, payload) {
        axios.post("http://localhost:8090/api/connexion", payload)
             .then(response => {
                 localStorage.setItem("token", response.data.token);
                 localStorage.setItem("userId", response.data.userId);
                 localStorage.setItem("name", response.data.name);

                 context.commit("setUser", {
                     token: response.data.token,
                     userId: response.data.userId,
                     name: response.data.name
                 });
                 router.push({name: "accueil"});
             })
             .catch((err) => {
                 throw new Error(err.message)
             });
    },
    async signup(context, payload) {
        axios.post("http://localhost:8090/api/inscription", payload)
             .then(response => {
                 localStorage.setItem("token", response.data.token);
                 localStorage.setItem("userId", response.data.userId);
                 localStorage.setItem("name", response.data.name);

                 context.commit("setUser", {
                     token: response.data.token,
                     userId: response.data.userId,
                     name: response.data.name
                 });

                 router.push({name: "accueil"});
             }).catch(error => {
            console.log(error);
        });
    },
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");

        context.commit("setUser", {
            token: null,
            userId: null,
            name: null
        });

        router.push({name: "connexion"});
    },
    reloadGetDataFromLocalStorage(context) {
        context.commit("setUser", {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name")
        });
    }
};
