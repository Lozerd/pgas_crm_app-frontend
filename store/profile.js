export const state = () => ({
    account: null, requests: []
});

export const getters = {
    getAccount(state) {
        return state.account;
    }, getRequests(state) {
        return state.requests;
    }
};

export const mutations = {
    setAccount(state, account) {
        state.account = account;
    }, setRequests(state, requests) {
        state.requests = requests;
    }
};

export const actions = {
    async getAccount({commit}) {
        await this.$axios
            .$get("/api/profile/account")
            .then((res) => commit("setAccount", res))
            .catch((err) => {
                if (err.response.status === 403) {
                    commit("session/resetSessionData", null, {root: true});
                } else {
                    console.log(err);
                    throw {
                        message: err.response.data, statusCode: err.status
                    };
                }
            });
    }, async updateAccount({commit}, payload) {
        await this.$axios
            .$patch("/api/profile/account", payload)
            .then((res) => commit("setAccount", res))
            .catch((err) => {
                console.log(err);
                throw {
                    message: err.response.data, statusCode: err.status
                };
            });
    }, async getRequests({commit}) {
        await this.$axios
            .$get("/api/profile/requests")
            .then((res) => commit("setRequests", res))
            .catch((err) => {
                if (err.response.status === 403) {
                    commit("session/resetSessionData", null, {root: true});
                } else {
                    console.log(err);
                    throw {
                        message: err.response.data, statusCode: err.status
                    };
                }
            });
    }, async postRequest({commit}, formData) {
        await this.$axios
            .$post("/api/profile/requests", formData)
            .then(res => console.log(res))
            .catch((err) => {
                if (err.response.status === 403) {
                    commit("session/resetSessionData", null, {root: true});
                } else {
                    console.log(err);
                    throw {
                        message: err.response.data, statusCode: err.status
                    };
                }
            });
    }
};
