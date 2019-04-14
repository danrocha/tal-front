export const namespaced = true;

export const state = {
  user: null,
  fbApp: null,
  fbUiApp: null,
  userFavorites: [],
};
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USER_FAVORITES(state, userFavorites) {
    state.userFavorites = userFavorites;
  },
  ADD_USER_FAVORITES(state, userFavorite) {
    state.userFavorites.push(userFavorite);
  },
  REMOVE_USER_FAVORITE_BY_ID(state, id) {
    const i = state.userFavorites.map(item => item.id).indexOf(id);
    state.userFavorites.splice(i, 1);
  },
  SET_FB_APP(state, fbApp) {
    state.fbApp = fbApp;
  },
  SET_FB_UI_APP(state, fbUiApp) {
    state.fbUiApp = fbUiApp;
  },
};

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  setUserFavorites({ commit }, userFavorites) {
    commit('SET_USER_FAVORITES', userFavorites);
  },
  addUserFavorite({ commit }, userFavorite) {
    commit('ADD_USER_FAVORITES', userFavorite);
  },
  removeUserFavoriteById({ commit }, id) {
    commit('REMOVE_USER_FAVORITE_BY_ID', id);
  },
  setFbApp({ commit }, fbApp) {
    commit('SET_FB_APP', fbApp);
  },
  setFbUiApp({ commit }, fbUiApp) {
    commit('SET_FB_UI_APP', fbUiApp);
  },
};
