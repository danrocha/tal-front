<template>
  <div>
    <h1>Account</h1>
    <img
      :src="currentUser.avatarUrl"
      class="rounded-full border-solid"
      :alt="currentUser.name"
      width="100"
      height="100"
    />
    <p>Name: {{ currentUser.name }}</p>
    <p><a @click="logOut">Logout</a></p>
    testing megs
  </div>
</template>

<script>
import currentUser from '../mixins/currentUser';
import CURRENT_USER from '../graphql/CurrentUser.gql';
import { onLogout } from '../vue-apollo';

export default {
  name: 'Account',
  mixins: [currentUser],
  onMount() {
    if (!currentUser) {
      this.$router.push({ name: 'auth' });
    }
  },
  methods: {
    async logOut() {
      console.group('auth logOut');
      const apolloClient = this.$apollo.provider.defaultClient;

      await onLogout(apolloClient);
      //update cache
      apolloClient.writeQuery({
        query: CURRENT_USER,
        data: {
          currentUser: null,
        },
      });
      window.location = '/logout';
    },
  },
};
</script>

<style></style>
