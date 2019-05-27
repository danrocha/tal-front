<template>
  <div>
    <slot :logout="logout" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { onLogout } from '../vue-apollo';

export default {
  name: 'Logout',
  methods: {
    async logout() {
      await firebase.auth().signOut();
      await onLogout(this.$apollo.provider.defaultClient);
      this.$router.push('/');
    },
  },
};
</script>
