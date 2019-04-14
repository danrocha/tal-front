<template>
  <div class="pt-8 container mx-auto md:w-auto md:mr-6 md:ml-56">
    <vue-headful title="Dashboard - TAL" />
    <div id="dashboard">
      <h2 class="text-4xl font-bold">Dashboard</h2>
      <aside class="w-auto flex flex-col items-end pr-8">
        <img
          :src="user.photoURL"
          class="rounded-full border-solid mb-8"
          alt="Your user photo"
          width="100"
          height="100"
        />
        <ul class="text-right">
          <li class="mb-1 text-base font-mono">
            <button
              class="link uppercase tracking-wider"
              :class="section === 'favorites' ? 'font-bold' : 'font-normal'"
              @click="section = 'favorites'"
            >
              Favorites
            </button>
          </li>
          <li class="uppercase tracking-wider mb-1 text-base font-mono">
            <button
              class="link uppercase tracking-wider"
              :class="section === 'settings' ? 'font-bold' : 'font-normal'"
              @click="section = 'settings'"
            >
              Account Settings
            </button>
          </li>
          <li class="uppercase tracking-wider mb-1 text-base font-mono">
            <button class="link uppercase tracking-wider" @click="logOut">Logout</button>
          </li>
        </ul>
      </aside>
      <main role="main" class="w-full">
        <dashboard-favorites v-if="section === 'favorites'" />
        <dashboard-settings v-if="section === 'settings'" />
      </main>
    </div>
  </div>
</template>

<script>
import { onLogout } from '../vue-apollo';
import { mapState } from 'vuex';
import DashboardFavorites from '../components/DashboardFavorites.vue';
import DashboardSettings from '../components/DashboardSettings.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardFavorites,
    DashboardSettings,
  },
  props: {
    section: {
      type: String,
      default: 'favorite',
    },
  },

  mounted() {
    if (!this.user) {
      this.$router.push({ name: 'auth' });
    }
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
