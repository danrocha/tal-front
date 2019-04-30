<template>
  <div>
    <vue-headful title="Login or Sign Up - TAL" />
    <h2>Login or Sign Up</h2>
    <div>
      <p class="lg:w-2/3 xl:w-1/2">
        While you can use most of the site without registering, you need an account to add office,
        vote on office, and to edit some of the detailed office information.
      </p>
      <div
        class="lg:w-1/2 xl:w-1/3 py-4 border border-gray-300"
        id="firebaseui-auth-container"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Auth',
  data() {
    return {
      redirect: this.$route.query.redirect || '/',
    };
  },
  mounted() {
    if (this.user) {
      this.$router.push(this.redirect);
    }
    const redirect = this.redirect;
    const signInSuccessUrl = '/auth/callback';
    const uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'https://thearchitecturelist.com/tos',
      // Privacy policy url.
      privacyPolicyUrl: 'https://thearchitecturelist.com/privacy',
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          authResult.user.getIdToken(/* forceRefresh */ true).then(idToken => {
            window.location.href = `${signInSuccessUrl}?redirect=${redirect}&token=${idToken}&isnewuser=${isNewUser}`;
          });
          return false;
        },
      },
    };

    this.fbUiApp.start('#firebaseui-auth-container', uiConfig);
  },
  destroyed() {
    this.fbUiApp.reset();
  },
  methods: {
    ...mapActions(['user/setUser']),
  },

  computed: {
    ...mapState({
      fbUiApp: state => state.user.fbUiApp,
      user: state => state.user.user,
    }),
  },
};
</script>

<style src="../assets/styles/firebaseui.css"></style>
<style scoped>
p {
  @apply my-4 leading-loose;
}
</style>
