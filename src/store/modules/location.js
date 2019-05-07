export const namespaced = true;

const ITEMS_PER_PAGE = null;

export const state = {
  selectedLocation: null,
  typologyFilter: [],
  sizeFilter: [],
  yearFilter: [],
  includeIncomplete: false,
  filtered: false,
  locationQueryVariables: {
    first: ITEMS_PER_PAGE,
    last: null,
    after: null,
    before: null,
    orderBy: 'CREATED_AT_DESC',
    condition: {},
    filter: { id: { notIn: [] } },
  },
};
export const mutations = {
  SET_LOCATION(state, location) {
    state.selectedLocation = location;
  },
  SET_ORDER_BY(state, orderBy) {
    state.locationQueryVariables.orderBy = orderBy;
  },
  SET_LOCATION_QUERY_FILTER(state, filter) {
    state.locationQueryVariables.filter = filter;
  },
  SET_TYPOLOGY_FILTER(state, typologyFilter) {
    state.typologyFilter = typologyFilter;
  },
  SET_SIZE_FILTER(state, sizeFilter) {
    state.sizeFilter = sizeFilter;
  },
  SET_YEAR_FILTER(state, yearFilter) {
    state.yearFilter = yearFilter;
  },
  TOGGLE_INCLUDE_INCOMPLETE(state) {
    state.includeIncomplete = !state.includeIncomplete;
  },
};

export const actions = {
  setLocation({ commit }, location) {
    commit('SET_LOCATION', location);
  },
  setOrderBy({ commit }, orderBy) {
    commit('SET_ORDER_BY', orderBy);
  },
  setLocationQueryFilter({ commit }, filter) {
    commit('SET_LOCATION_QUERY_FILTER', filter);
  },
  setTypologyFilter({ commit }, typologyFilter) {
    commit('SET_TYPOLOGY_FILTER', typologyFilter);
  },
  setSizeFilter({ commit }, sizeFilter) {
    commit('SET_SIZE_FILTER', sizeFilter);
  },
  setYearFilter({ commit }, yearFilter) {
    commit('SET_YEAR_FILTER', yearFilter);
  },
  toggleIncludeIncomplete({ commit }) {
    commit('TOGGLE_INCLUDE_INCOMPLETE');
  },
  clearFilters({ commit }) {
    commit('SET_YEAR_FILTER', []);
    commit('SET_SIZE_FILTER', []);
    commit('SET_TYPOLOGY_FILTER', []);
    commit('TOGGLE_INCLUDE_INCOMPLETE');
  },
};
