import Vue from 'vue'
import Vuex from 'vuex' // State management pattern & library for Vue.js apps : helps create a centralized data store
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)   // Allows you to add global functionality to a Vue instance

const getDefaultState = () => { // This works like a safe, we can only access under certain circumstances
  return {
    token: '',
    user: {}
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  mutations: {
    // Gives "set" functionality ( ex : set user information)
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    // Gives "get" functionality ( ex : get user information)
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  actions: { // We can also use actions for many different functionalities (ex : have the entire login API call here)
    login: ({ commit, dispatch }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
      // set auth header
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
  },
});