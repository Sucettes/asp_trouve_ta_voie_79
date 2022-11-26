import axios from "axios";


export default {
    async createGrimpe(context, payload) {
        axios.post("http://localhost:8090/api/grimpe/create", payload.data, {
            headers: {"Authorization": `Bearer ${payload.token}`, "Content-Type": "application/json"}
        }).then(res => {
            context.commit("setGrimpe", res.data);
            // todo : moute to details page ???
        }).catch(err => {
            console.error(err);
        });
    }
};
