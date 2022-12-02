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

                    resolve(response);
                })
                .catch((error) => {
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

                    context.commit("setUser", {
                        token: response.data.token,
                        userId: response.data.userId,
                        name: response.data.name,
                    });

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

            resolve();
        });
    },
    // Vérifie le token qui est dans le local storage.
    async checkIfLocalStorageTokenIsValid(context, token) {
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
                }
                resolve();
            }).catch(() => {
                localStorage.clear();
                context.commit("setUser", {
                    token: null,
                    userId: null,
                    name: null,
                });
                reject();
            });
        });

    },
};
