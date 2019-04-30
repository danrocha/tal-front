<template>
  <div>Hold on, just a second...</div>
</template>

<script>
import { mapState } from 'vuex';
import NProgress from 'nprogress';
import { onLogin } from '../vue-apollo.js';

export default {
  name: 'AuthCallback',
  data() {
    return {
      isNewUser: this.$route.query.isnewuser == 'true',
    };
  },
  methods: {
    async createUser(user) {
      console.log('addin new user...');
      this.$apollo
        .mutate({
          mutation: require('../graphql/CreateUser.gql'),
          variables: {
            input: {
              user: {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoUrl,
                email: user.email,
              },
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
      user: state => state.user.user,
    }),
  },
  watch: {
    async user() {
      if (this.user) {
        NProgress.start();
        NProgress.set(0.33);
        await onLogin(this.$apollo.provider.defaultClient, this.$route.query.token);
        NProgress.set(0.66);
        if (this.isNewUser) {
          await this.createUser(this.user);
        }
        NProgress.done();
        this.$router.push(this.$route.query.redirect);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
