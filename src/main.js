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
import * as VueGoogleMaps from 'vue2-google-maps';
import { GmapAutocomplete } from 'vue2-google-maps/src/components/autocomplete';
import { createProvider } from './vue-apollo';
import { sync } from 'vuex-router-sync';
import { FBApp, FBUIApp } from './plugins/firebaseConfig';

require('typeface-ubuntu');
require('typeface-ubuntu-mono');

import './plugins/axios';
import '@/assets/styles/main.css';
import '../node_modules/nprogress/nprogress.css';

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
const AUTH_TOKEN = 'id_token';
FBApp.auth().onAuthStateChanged(user => {
  // change logic to somwhere else? its calling every time...
  console.log('onAuthStateChanged user in main called!!');
  store.dispatch('user/setUser', user);
  if (user) {
    if (typeof localStorage !== 'undefined') {
      user.getIdToken(/* forceRefresh */ true).then(idToken => {
        localStorage.setItem(AUTH_TOKEN, idToken);
      });
    }
  }
});
store.dispatch('user/setFbApp', FBApp);
store.dispatch('user/setFbUiApp', FBUIApp);

sync(store, router);
//Vue.use(VueGeolocation);
Vue.use(VTooltip);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKnsrA-tAtFLqrAwTY7OKP67CgJyjqZ4w',
    libraries: 'places',
    installComponents: false,
    region: 'US',
    language: 'en',
  },
});
Vue.component('GmapAutocomplete', GmapAutocomplete);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
