export const namespaced = true;

export const state = {
  user: null,
  fbApp: null,
  fbUiApp: null,
};
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
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
  setFbApp({ commit }, fbApp) {
    commit('SET_FB_APP', fbApp);
  },
  setFbUiApp({ commit }, fbUiApp) {
    commit('SET_FB_UI_APP', fbUiApp);
  },
};
