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
        axios.get(`http://localhost:8090/api/grimpes/${payload.userId}`, {
            headers: {"Authorization": `Bearer ${payload.token}`},
        }).then(res => {
            context.commit("setUserGrimpes", res.data);
        }).catch(err => {
            console.log(err);
        });
    },
};
