<template>
  <apollo-query :query="require('../graphql/CurrentUser.gql')" @error="$router.push('/auth')">
    <template slot-scope="{ result: { loading, data } }">
      <!-- Loading -->
      <div v-if="loading">Loading...</div>
      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <vue-headful title="Dashboard - TAL" />
        <div id="dashboard">
          <h2 class="text-4xl font-bold">Dashboard</h2>
          <aside class="w-auto flex flex-col items-end pr-8">
            <dashboard-menu />
          </aside>
          <main role="main" class="w-full">
            <router-view></router-view>
          </main>
        </div>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </apollo-query>
</template>

<script>
import DashboardMenu from '../components/DashboardMenu.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardMenu,
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
