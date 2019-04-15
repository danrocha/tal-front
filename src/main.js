import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
//import VueGeolocation from 'vue-browser-geolocation';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import vueHeadful from 'vue-headful';
import FontAwesomeIcon from './plugins/FontAwesomeIcon';
import VTooltip from 'v-tooltip';
import { createProvider, onLogin, onLogout } from './vue-apollo';
import { sync } from 'vuex-router-sync';
import { FBApp, FBUIApp } from './plugins/firebaseConfig';

require('typeface-ubuntu');
require('typeface-ubuntu-mono');

import './plugins/axios';
import '@/assets/styles/main.css';

require('dotenv').config();

// register base components
const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-headful', vueHeadful);

const apolloProvider = createProvider();
// Firebase auth

FBApp.auth().onAuthStateChanged(user => {
  // change logic to somwhere else? its calling every time...
  //console.log('onAuthStateChanged user', user);
  store.dispatch('user/setUser', user);
  if (user) {
    user.getIdToken(/* forceRefresh */ true).then(idToken => {
      onLogin(apolloProvider.defaultClient, idToken);
    });
  }
});
store.dispatch('user/setFbApp', FBApp);
store.dispatch('user/setFbUiApp', FBUIApp);

sync(store, router);
//Vue.use(VueGeolocation);
Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
