import axios from "axios";


export default {
    async editLieu(context, payload) {
        axios.put(`http://localhost:8090/api/lieu/${payload.data.id}`, payload.data, {
            headers: {"Authorization": `Bearer ${payload.token}`}
        }).then(res => {
            context.commit("setLieu", res.data);
            // todo : moute to details page ???
        }).catch(err => {
            console.log(err);
        });
    },
    async createLieu(context, payload) {
        axios.post("http://localhost:8090/api/lieu/create", payload.data, {
            headers: {"Authorization": `Bearer ${payload.token}`}
        }).then(res => {
            context.commit("setLieu", res.data);
            // todo : moute to details page ???
        }).catch(err => {
            console.log(err);
        });
    },
    async loadUserLieux(context, payload) {
        axios.get(`http://localhost:8090/api/lieux/${payload.userId}`, {
            headers: {"Authorization": `Bearer ${payload.token}`}
        }).then(res => {
            context.commit("setUserLieux", res.data);
        }).catch(err => {
            console.log(err);
        });
    }
    // async loadLieuToEdit(context, payload) {
    //     axios.get(`http://localhost:8090/api/lieu/${payload.id}`, {
    //         headers: {'Authorization': `Bearer ${payload.token}`}
    //     }).then(res => {
    //         context.commit('setLieu', res.data)
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
};
