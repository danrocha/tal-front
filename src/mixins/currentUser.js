// @vue/component
export default {
  computed: {
    currentUser() {
      return this.store.state.user.user;
    },
  },
};
