<template>
  <div class="pt-8 container mx-auto md:w-auto md:mr-6 md:ml-56">
    <vue-headful title="Administration - TAL" />
    <div id="dashboard">
      <h2 class="text-4xl font-bold">Administration</h2>
      <aside class="w-auto flex flex-col items-end pr-8">
        <div id="user-info" class="mb-8">
          <img
            :src="user.photoURL"
            class="rounded-full border-solid mb-2"
            alt="Your user photo"
            width="100"
            height="100"
          />
          <apollo-query :query="require('../graphql/CurrentUser.gql')">
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Checking Admin Status...</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occurred</div>

              <!-- Result -->
              <div v-else-if="data" class="text-sm">
                <p v-if="data.currentUser.isAdmin" class="font-bold text-center">Admin</p>
              </div>

              <!-- No result -->
              <div v-else class="no-result apollo">No result :(</div>
            </template>
          </apollo-query>
        </div>
        <ul class="text-right">
          <li class="uppercase tracking-wider mb-1 text-base font-mono">
            <a href="#" class="link">Favorites</a>
          </li>
          <li class="uppercase tracking-wider mb-1 text-base font-mono">
            <a href="#" class="link">Account settings</a>
          </li>
          <li class="uppercase tracking-wider mb-1 text-base font-mono">
            <a href="#" class="link">Logout</a>
          </li>
        </ul>
      </aside>
      <main role="main" class="w-full">
        <admin-cities />
      </main>
    </div>
  </div>
</template>

<script>
import { onLogout } from '../vue-apollo';
import { mapState } from 'vuex';
import AdminCities from '../components/admin/AdminCities.vue';

export default {
  name: 'Admin',
  components: {
    AdminCities,
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
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
