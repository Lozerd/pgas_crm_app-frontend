const defaultNotification = () => {
    return {
        isActive: false,
        isSuccess: null,
        message: null
    };
};
export const state = () => ({
    notification: {
        isActive: false,
        isSuccess: null,
        message: null
    },
    news: []
});

export const getters = {
    getNotification(state) {
        return state.notification;
    },
    getNews(state) {
        return state.news;
    }
};

export const mutations = {
    resetNotification(state, value) {
        Object.assign(state.notification, defaultNotification());
    },
    setNotification(state, value) {
        Object.assign(state.notification, value);
    },
    setNews(state, value) {
        state.news = value;
    }
};

export const actions = {
    async getNews({ commit }) {
        await this.$axios
            .$get("/api/news")
            .then((res) => commit("setNews", res))
            .catch((err) => {
                console.log(err);
                throw { message: err.detail, statusCode: err.statusCode };
            });
    },
    resetNotification({ commit }) {
        commit("resetNotification");
    },
    toggleNotification({ commit }, { success = true, message = null }) {
        commit("setNotification", {
            isActive: true,
            isSuccess: success,
            message: message
        });
    }
};
