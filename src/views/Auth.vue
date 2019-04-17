<template>
  <div>
    <vue-headful title="Login or Sign Up - TAL" />
    <h2>Login or Sign Up</h2>
    <div>
      <p class="w-1/2">
        While you can use most of the site without registering, you need an account to add office,
        vote on office, and to edit some of the detailed office information.
      </p>
      <div class="w-1/3 py-4 border border-gray-300" id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { onLogin } from '../vue-apollo';

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Auth',
  mounted() {
    const apollo = this.$apollo;
    const signInSuccessUrl = this.nextRoute;
    const addNewUser = this.addNewUser;
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
      signInSuccessUrl,
      callbacks: {
        async signInSuccessWithAuthResult(authResult, redirectUrl) {
          const user = authResult.user;
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          user.getIdToken(/* forceRefresh */ true).then(idToken => {
            onLogin(apollo.provider.defaultClient, idToken);
          });
          console.log('isNewUser', isNewUser);
          if (isNewUser) {
            const newUser = await addNewUser(user);
            console.log('newUser', newUser);
          }
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
    async addNewUser(user) {
      console.log('addin new user...');
      this.$apollo
        .mutate({
          mutation: require('../graphql/CreateUser.gql'),
          variables: {
            user: {
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoUrl,
              email: user.email,
            },
          },
        })
        .then(({ data }) => {
          console.log('new user added');
          return data.user;
        })
        .catch(error => {
          console.error('Error adding new user:', error);
        });
    },
  },

  computed: {
    ...mapState({
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
