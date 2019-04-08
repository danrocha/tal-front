import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import VueGeolocation from 'vue-browser-geolocation';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import vueHeadful from 'vue-headful';
import FontAwesomeIcon from './plugins/FontAwesomeIcon';
import { createProvider } from './vue-apollo';
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

// Firebase auth
const AUTH_TOKEN = 'id_token';

FBApp.auth().onAuthStateChanged(user => {
  store.dispatch('user/setUser', user);
  if (user) {
    // set id token;
    user.getIdToken(/* forceRefresh */ true).then(idToken => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN, idToken);
      }
    });
  } else {
    // remove id token
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN);
    }
  }
});
store.dispatch('user/setFbApp', FBApp);
store.dispatch('user/setFbUiApp', FBUIApp);

sync(store, router);
Vue.use(VueGeolocation);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
