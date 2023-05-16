const defaultState = () => {
    return {
        sessionData: { session_key: null, expires: null },
        auth_key: null,
        is_superuser: false
    };
};
export const state = () => ({
    sessionData: { session_key: "", expires: "" },
    auth_key: "",
    is_superuser: false
});

export const getters = {
    getSessionKey(state) {
        return state.sessionData.session_key;
    },
    getAuthKey(state) {
        return state.auth_key;
    },
    isAuthorized(state) {
        return !!state.auth_key;
    },
    isSuperUser(state) {
        return state.is_superuser;
    }
};

export const mutations = {
    setSessionData(state, value) {
        state.sessionData = value;
    },
    setAuthKey(state, value) {
        state.auth_key = value;
    },
    resetSessionData(state) {
        Object.assign(state, defaultState());
    },
    setSuperUser(state, value) {
        state.is_superuser = value;
    }
};

export const actions = {
    setAuthKey({ commit }, value) {
        commit("setAuthKey", value);
        this.$cookies.set("auth_key", value);
    },
    async logout({ commit }) {
        await this.$axios.$get("/api/logout").then((res) => {
            commit("resetSessionData");
            this.$cookies.remove("auth_key");
            commit("setSessionData", res);
            this.$router.push("/");
        });
    },
    // middleware
    async getSessionKey({ commit }) {
        await this.$axios
            .$get("/api/session")
            .then((res) => commit("setSessionData", res))
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
    async getIsSuperuser({ commit }) {
        await this.$axios
            .$get("/api/is_superuser")
            .then((res) => commit("setSuperUser", res.is_superuser))
            .catch((err) => {
                commit("setSuperUser", false);
            });
    }
};
