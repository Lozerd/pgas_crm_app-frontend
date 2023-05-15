export const state = () => ({
    session_key: "",
    auth_key: ""
});

export const getters = {
    getSessionKey(state) {
        return state.session_key;
    },
    getAuthKey(state) {
        return state.auth_key;
    },
    isAuthorized(state) {
        return !!state.auth_key;
    }
};

export const mutations = {
    setSessionKey(state, value) {
        state.session_key = value;
    },
    setAuthKey(state, value) {
        state.auth_key = value;
    }
};

export const actions = {
    async getSessionKey({ commit }) {
        await this.$axios
            .$get("/api/session")
            .then((res) => commit("setSessionKey", res))
            .catch((err) => {
                console.log(err);
                throw { message: err.detail, statusCode: err.statusCode };
            });
    },
    async getAuthKey({ commit }) {
        let auth_key = this.$cookies.get("auth_key");
        if (auth_key) {
            commit("setAuthKey", auth_key);
        }
    },
    setAuthKey({ commit }, value) {
        commit("setAuthKey", value);
        this.$cookies.set("auth_key", value);
    },
    logout({ commit }) {
        commit("setSessionKey", "");
        commit("setAuthKey", "");
        this.$cookies.remove("auth_key");
        window.location.reload();
    }
};
