import axios from "axios";


export default {
    async editLieu(context, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8090/api/lieu/${payload.data.id}`, payload.data, {
                headers: {"Authorization": `Bearer ${payload.token}`},
            }).then(response => {
                context.commit("setLieu", response.data);

                resolve(response);
            }).catch(error => {
                reject(error.response);
            });
        });
    },
    async createLieu(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8090/api/lieu/create", payload.data, {
                headers: {"Authorization": `Bearer ${payload.token}`},
            })
                .then(response => {
                    context.commit("setLieu", response.data);

                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    async loadUserLieux(context, payload) {
        axios.get(`http://localhost:8090/api/lieux/${payload.userId}`, {
            headers: {"Authorization": `Bearer ${payload.token}`},
        }).then(res => {
            context.commit("setUserLieux", res.data);
        }).catch(err => {
            console.log(err);
        });
    },
    async clearDataLieu(context) {
        context.commit("setLieu", {});
        context.commit("setUserLieux", []);
    },
};
