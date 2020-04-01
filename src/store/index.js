import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";

Vue.use(Vuex);

const globalState = {
};

const getters = {
};

const actions = {
};

const mutations = {
};

export default new Vuex.Store({
    state: globalState,
    getters,
    actions,
    mutations,
    modules: {
        account,
    },
});
