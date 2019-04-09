import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user.js';
import * as notification from '@/store/modules/notification.js';
import * as location from '@/store/modules/location.js';

Vue.use(Vuex);

const FIRST_STEP = 1;
//const ITEMS_PER_PAGE = null;

const modules = {
  user,
  notification,
  location,
};
//TODO: modularize rest store
const state = {
  addOffice: {
    city: null,
    officeDetails: null,
    step: FIRST_STEP,
    manual: false,
    hasWebsite: false,
  },
  /* paginationInfo: {
    first: ITEMS_PER_PAGE,
    last: null,
    after: null,
    before: null,
    pageNumber: 1,
  }, */
  filterCity: [],
  largeMap: false,
  mapZoomLevel: 13,
  itemsPerPage: null,
};

const mutations = {
  /* eslint-disable no-param-reassign */

  SET_ADD_OFFICE_CITY(state, city) {
    state.addOffice.city = city;
  },
  SET_ADD_OFFICE_OFFICE_DETAILS(state, officeDetails) {
    state.addOffice.officeDetails = officeDetails;
  },
  ADD_OFFICE_NEXT_STEP(state) {
    state.addOffice.step++;
  },
  ADD_OFFICE_PREV_STEP(state) {
    if (state.addOffice.step > FIRST_STEP) {
      state.addOffice.step--;
    }
  },
  ADD_OFFICE_SET_STEP(state, step) {
    state.addOffice.step = step;
  },
  ADD_OFFICE_TOGGLE_MANUAL(state) {
    state.addOffice.manual = !state.addOffice.manual;
  },
  SET_ADD_OFFICE_HAS_WEBSITE(state, hasWebsite) {
    state.addOffice.hasWebsite = hasWebsite;
  },
  RESET_ADD_OFFICE(state) {
    state.addOffice.city = null;
    state.addOffice.officeDetails = null;
    state.addOffice.step = FIRST_STEP;
    state.addOffice.manual = false;
    state.addOffice.hasWebsite = false;
  },
  RESET_ADD_OFFICE_OFFICE_DETAILS(state) {
    state.addOffice.officeDetails = null;
  },
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
  /* SET_PAGINATION_INFO(state, paginationInfo) {
    state.paginationInfo = paginationInfo;
  }, */
};

const getters = {
  addOfficeStep: state => state.addOffice.step,
  addOfficeCity: state => state.addOffice.city,
  addOfficeOfficeDetails: state => state.addOffice.officeDetails,
};

const actions = {
  setAddOfficeCity({ commit }, city) {
    commit('SET_ADD_OFFICE_CITY', city);
  },
  setAddOfficeOfficeDetails({ commit }, officeDetails) {
    commit('SET_ADD_OFFICE_OFFICE_DETAILS', officeDetails);
    if (officeDetails.hasOwnProperty('website')) {
      commit('SET_ADD_OFFICE_HAS_WEBSITE', true);
    }
  },
  addOfficeNextStep({ commit }) {
    commit('ADD_OFFICE_NEXT_STEP');
  },
  addOfficePrevStep({ commit }) {
    commit('ADD_OFFICE_PREV_STEP');
  },
  resetAddOffice({ commit }) {
    commit('RESET_ADD_OFFICE');
  },
  resetAddOfficeOfficeDetails({ commit }) {
    commit('RESET_ADD_OFFICE_OFFICE_DETAILS');
    commit('ADD_OFFICE_SET_STEP', 2);
  },
  addOfficeToggleManual({ commit }) {
    commit('ADD_OFFICE_TOGGLE_MANUAL');
  },
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
  /* setPaginationInfo({ commit }, paginationInfo) {
    commit('SET_PAGINATION_INFO', paginationInfo);
  }, */
};

export default new Vuex.Store({
  modules,
  state,
  mutations,
  getters,
  actions,
});
