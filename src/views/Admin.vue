<template>
  <apollo-query :query="require('../graphql/CurrentUser.gql')" @error="$router.push('/auth')">
    <template slot-scope="{ result: { loading, data } }">
      <div v-if="loading" class="loading apollo">Checking Admin Status...</div>

      <div v-else-if="data">
        <vue-headful title="Administration - TAL" />
        <div id="dashboard">
          <h2 class="text-4xl font-bold">Administration</h2>
          <aside class="w-auto flex flex-col items-end pr-8">
            <admin-menu />
          </aside>
          <main role="main" class="w-full">
            <router-view></router-view>
          </main>
        </div>
      </div>
    </template>
  </apollo-query>
</template>

<script>
import { onLogout } from '../vue-apollo';
import AdminMenu from '../components/AdminMenu.vue';

export default {
  name: 'Admin',
  components: {
    AdminMenu,
  },

  methods: {
    async logOut() {
      const apolloClient = this.$apollo.provider.defaultClient;
      await onLogout(apolloClient);
      window.location = '/';
    },
  },
};
</script>

<style scoped>
#dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 5rem auto;
  grid-template-areas:
    'title-empty title'
    'controls list';
  grid-gap: 1.5rem;
}
#dashboard > h2 {
  grid-area: title;
}
#dashboard > aside {
  grid-area: controls;
}
#dashboard > main {
  grid-area: list;
}
</style>
