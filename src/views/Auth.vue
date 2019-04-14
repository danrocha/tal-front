<template>
  <div class="pt-8 container mx-auto md:w-auto md:mr-6 md:ml-56">
    <vue-headful title="Login or Sign Up - TAL"/>
    <h2>Login or Sign Up</h2>
    <div class="flex">
      <p class="w-1/2">
        While you can use most of the site without registering, you need an account to add office,
        vote on office, and to edit some of the detailed office information.
      </p>
      <div class="w-64 py-4 ml-8 border border-gray-500 rounded" id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { onLogin } from '../vue-apollo';

import firebase from 'firebase/app';
import 'firebase/auth';

const uiConfig = {
  //signInSuccessUrl: '/success',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://thearchitecturelist.com/tos',
  // Privacy policy url.
  privacyPolicyUrl: 'https://thearchitecturelist.com/privacy',
  signInFlow: 'popup',
};

export default {
  name: 'Auth',
  mounted() {
    this.fbUiApp.start('#firebaseui-auth-container', uiConfig);
  },
  destroyed() {
    this.fbUiApp.reset();
  },

  watch: {
    user(auth) {
      if (auth) {
        this.$router.replace(this.nextRoute);
      }
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      fbUiApp: state => state.user.fbUiApp,
    }),
    nextRoute() {
      return this.$route.query.redirect || '/';
    },
  },
};
</script>

<style src="../assets/styles/firebaseui.css"></style>
<style scoped>
p {
  @apply my-4 leading-loose;
}
</style>
