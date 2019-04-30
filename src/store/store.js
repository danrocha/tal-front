import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user.js';
import * as notification from '@/store/modules/notification.js';
import * as location from '@/store/modules/location.js';
import * as add from '@/store/modules/add.js';

Vue.use(Vuex);

const modules = {
  user,
  notification,
  location,
  add,
};

const state = {
  filterCity: [],
  largeMap: false,
  mapZoomLevel: 13,
  itemsPerPage: null,
};

const mutations = {
  SET_CITY_FILTER(state, city) {
    state.filterCity = city;
  },

  TOGGLE_MAP_SIZE(state) {
    state.largeMap = !state.largeMap;
  },
  SET_ITEMS_PER_PAGE(state, itemsPerPage) {
    state.itemsPerPage = itemsPerPage;
  },

  SET_MAP_ZOOM_LEVEL(state, zoomLevel) {
    state.mapZoomLevel = zoomLevel;
  },
};

const actions = {
  setCityFilter({ commit }, city) {
    commit('SET_CITY_FILTER', city);
  },
  setItemsPerPage({ commit }, itemsPerPage) {
    commit('SET_ITEMS_PER_PAGE', itemsPerPage);
  },

  setMapZoomLevel({ commit }, zoomLevel) {
    commit('SET_MAP_ZOOM_LEVEL', zoomLevel);
  },
  toggleMapSize({ commit }) {
    commit('TOGGLE_MAP_SIZE');
  },
};

export default new Vuex.Store({
  modules,
  state,
  mutations,
  actions,
});
