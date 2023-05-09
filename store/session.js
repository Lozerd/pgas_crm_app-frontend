export const state = () => ({
    sessionId: ""
});

export const getters = {
    getSessionId(state) {
        return state.sessionId;
    }
};

export const mutations = {
    setSessionId(state, value) {
        state.sessionId = value;
    }
};

export const actions = {
    async getSessionId({ commit }) {
        await this.$axios
            .$get("session")
            .then((res) => commit("setSessionId", res))
            .catch((err) => {
                console.log(err);
                throw { message: err.detail, statusCode: err.statusCode };
            });
    }
};
