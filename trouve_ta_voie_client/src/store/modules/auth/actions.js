import axios from "axios";


export default {
    async login(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8090/api/connexion", payload)
                .then(response => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("name", response.data.name);

                    context.commit("setUser", {
                        token: response.data.token,
                        userId: response.data.userId,
                        name: response.data.name,
                    });
                    context.commit("setIsAdmin", response.data.isAdmin);

                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    async signup(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8090/api/inscription", payload)
                .then(response => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("name", response.data.name);
                    // localStorage.setItem("setIsAdmin", response.data.isAdmin);

                    context.commit("setUser", {
                        token: response.data.token,
                        userId: response.data.userId,
                        name: response.data.name,
                    });
                    context.commit("setIsAdmin", response.data.isAdmin);

                    resolve(response);
                })
                .catch((error) => {
                    reject(error.response);
                });
        });
    },
    async logout(context) {
        return new Promise((resolve) => {
            localStorage.clear();

            context.commit("setUser", {
                token: null,
                userId: null,
                name: null,
            });
            context.commit("setIsAdmin", null);

            resolve();
        });
    },
    async checkIfLocalStorageTokenIsValid(context, token) {
        // Vérifie le token qui est dans le local storage.
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8090/api/valideToken", {}, {
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            }).then(response => {
                if (response.status !== 200) {
                    localStorage.clear();
                    context.commit("setUser", {
                        token: null,
                        userId: null,
                        name: null,
                    });
                    context.commit("setIsAdmin", null);
                } else {
                    context.commit("setIsAdmin", response.data.isAdmin);
                }
                resolve();
            }).catch(() => {
                localStorage.clear();
                context.commit("setUser", {
                    token: null,
                    userId: null,
                    name: null,
                });
                context.commit("setIsAdmin", null);
                reject();
            });
        });
    },
    async changeUsername(context, payload) {
        // Modification du nom d'utilisateur.
        return new Promise((resolve, reject) => {
            axios.put("http://localhost:8090/api/utilisateur", payload.data, {
                headers: {"Authorization": `Bearer ${payload.token}`},
            })
                .then(response => {
                    localStorage.setItem("name", payload.data.name);

                    context.commit("setUsername", {name: payload.data.name});

                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
};
