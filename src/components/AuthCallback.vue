<template>
  <div></div>
</template>

<script>
//import { setIdToken, setAccessToken } from '../auth/AuthService';
import { onLogin } from '../vue-apollo';
import firebase from 'firebase';

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
      let user = firebase.auth().currentUser;
      user.getIdToken(/* forceRefresh */ true).then(idToken => {
        const apolloClient = this.$apollo.provider.defaultClient;
        onLogin(apolloClient, idToken);
      });
      window.location.href = '/';
    });
  },
};
</script>
