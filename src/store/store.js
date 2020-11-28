

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default new Vuex.Store({
    state: {
        currentEmail: '',
    },
    mutations: {
        setCurrentEmail: (state, email) => {
            state.currentEmail = email;
            state.isLoggedIn = email !== '';
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin],
});