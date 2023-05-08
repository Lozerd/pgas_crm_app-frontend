export const state = () => ({
    notificationIsActive: false,
    news: []
});

export const getters = {
    getNotificationIsActive(state) {
        return state.notificationIsActive;
    },
    getNews(state) {
        return state.news;
    }
};

export const mutations = {
    setNotificationIsActive(state, value) {
        state.notificationIsActive = value;
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
    }
};
