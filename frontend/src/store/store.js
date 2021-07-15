import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
    },
    getters: {
        user: (state) => {
            return state.user;
        },
    },
});

export default store