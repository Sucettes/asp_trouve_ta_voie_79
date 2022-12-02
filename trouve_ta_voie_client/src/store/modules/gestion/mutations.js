export default {
    addLoading(state) {
        state.nbLoading += 1;
    },
    removeLoading(state) {
        if (state.nbLoading !== 0) {
            state.nbLoading -= 1;
        }
    },
};
