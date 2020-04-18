import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: window.localStorage.getItem('access-token') ?? '',
    username: window.localStorage.getItem('username'),
    userType: window.localStorage.getItem('user-type'),
  },
  getters: {
    client: (state) => axios.create({
      headers: { 'Authorization': 'Bearer ' + state.accessToken }
    })
  },
  mutations: {
    setUser: (state, { username, userType, accessToken }) => {
      window.localStorage.setItem('access-token', accessToken);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('user-type', userType);
      state.username = username;
      state.userType = userType,
      state.accessToken = accessToken
    },
    setCards: (state, cards) => state.cards = cards,
    setStations: (state, stations) => state.stations = stations,
    reset: (state) => {
      state.accessToken = null;
      state.username = null;
      state.userType = null;
      window.localStorage.removeItem('access-token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('user-type');
    }
  },
  actions: {
    
  }
});
