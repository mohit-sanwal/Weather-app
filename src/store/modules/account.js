import axios from "axios";
// import Api from "../../Api";

const accountState = {
    graphDetails : {}
};

const getters = {
    graphDetails: state => state.graphDetails
};

const actions = {
    graphDetailsData({commit}, keyword){
        return axios.get(`https://api.nasa.gov/insight_weather/?api_key=DDz14KZjytRMwXmLi6JAz1mguDV0zcqCSs6QksTZ&feedtype=json&ver=1.0`).then(
            (response) => {
                if (response) {
                        commit("graphDetailsData", response.data);
                    }
            },
            () => {
            },
        );
    }
};

const mutations = {
    graphDetailsData(state, data) {
        state.graphDetails = data
    }
};

export default {
    state: accountState,
    getters,
    actions,
    mutations,
};
