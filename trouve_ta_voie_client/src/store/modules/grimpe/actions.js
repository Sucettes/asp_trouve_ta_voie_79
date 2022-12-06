import axios from "axios";


export default {
    async createGrimpe(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8090/api/grimpe/create", payload.data, {
                headers: {"Authorization": `Bearer ${payload.token}`, "Content-Type": "application/json"},
            }).then(response => {
                context.commit("setGrimpe", response.data);

                resolve(response);
            }).catch(error => {
                reject(error.response);
            });
        });
    },
    async editGrimpe(context, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8090/api/grimpe/${payload.data.id}`, payload.data, {
                headers: {"Authorization": `Bearer ${payload.token}`, "Content-Type": "application/json"},
            }).then(response => {
                context.commit("setGrimpe", response.data);

                resolve(response);
            }).catch(error => {
                reject(error.response);
            });
        });
    },
    async loadUserGrimpes(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8090/api/grimpes/${payload.userId}`, {
                headers: {"Authorization": `Bearer ${payload.token}`},
            }).then(response => {
                context.commit("setUserGrimpes", response.data);

                resolve(response);
            }).catch(error => {
                reject(error.response);
            });
        });
    },
    async loadUserVotedClimbs(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8090/api/votes/${payload.userId}`, {
                headers: {"Authorization": `Bearer ${payload.token}`},
            }).then(response => {
                context.commit("setUserVotedClimbs", response.data);

                resolve(response);
            }).catch(error => {
                reject(error.response);
            });
        });
    },
    async loadGrimpeDetails(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8090/api/grimpe/details/${payload.id}`)
                .then(response => {
                    context.commit("setGrimpeDetails", response.data);

                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    async clearDataGrimpe(context) {
        context.commit("setGrimpe", {});
        context.commit("setUserGrimpes", []);
    },
};
