export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.name = payload.name;
    },
    setIsAdmin(state, payload) {
        state.isAdmin = payload;
    },
    setUsername(state, payload) {
        state.name = payload.name;
    },
};
