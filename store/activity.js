export const state = () => ({
    activities: {},
    activityCriterion: []
});

export const getters = {
    getActivities(state) {
        return state.activities;
    },
    getActivityCriterion(state) {
        return state.activityCriterion;
    }
};

export const mutations = {
    setActivities(state, value) {
        let activities = {};
        for (let activity of value) {
            activities[activity.id] = activity.title;
        }
        state.activities = activities;
    },
    setActivityCriterion(state, value) {
        // let activityCriterion = {};
        // for (let criteria of value) {
        //     activityCriterion[criteria.id] = criteria.description;
        // }
        // state.activityCriterion = activityCriterion;
        state.activityCriterion = value;
    }
};

export const actions = {
    async getActivities({ commit }) {
        await this.$axios
            .$get("/api/activity")
            .then((res) => commit("setActivities", res))
            .catch((err) => {
                console.log(err);
                throw { message: err.detail, statusCode: err.statusCode };
            });
    },
    async getActivityCriterion({ commit }, [activity_id = null]) {
        let baseUrl = "/api/criteria",
            queryParams = "";

        if (activity_id !== null) queryParams = "?activity_id=" + activity_id;

        await this.$axios
            .$get(baseUrl + queryParams)
            .then((res) => commit("setActivityCriterion", res))
            .catch((err) => {
                console.log(err);
                throw { message: err.detail, statusCode: err.statusCode };
            });
    }
};
