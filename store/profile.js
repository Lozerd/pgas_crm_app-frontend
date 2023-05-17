export const state = () => ({
    account: null
});

export const getters = {
    getAccount(state) {
        return state.account;
    }
};

export const mutations = {
    setAccount(state, account) {
        state.account = account;
    }
};

export const actions = {
    async getAccount({ commit }) {
        await this.$axios
            .$get("/api/profile/account")
            .then((res) => commit("setAccount", res))
            .catch((err) => {
                if (err.response.status === 403) {
                    commit("session/resetSessionData", null, { root: true });
                } else {
                    console.log(err);
                    throw {
                        message: err.response.data,
                        statusCode: err.status
                    };
                }
            });
    },
    async updateAccount({ commit }, payload) {
        await this.$axios
            .$patch("/api/profile/account", payload)
            .then((res) => commit("setAccount", res))
            .catch((err) => {
                console.log(err);
                throw {
                    message: err.response.data,
                    statusCode: err.status
                };
            });
    }
};
