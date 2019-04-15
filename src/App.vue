<template>
  <div>
    <!--HEADER -->
    <main-menu />
    <!-- BODY WRAP -->
    <main role="main">
      <router-view/>
    </main>
    <!-- NOTIFICATIONS -->
    <notification-container/>
    <main-footer />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
//import { onLogout } from './vue-apollo';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'App',
  components: {
    MainMenu,
    MainFooter,
    NotificationContainer,
  },
  data() {
    return {
      user: undefined,
    };
  },
  methods: {
    logout() {},
  },
};
</script>

<style>
html,
body {
  @apply h-full;
}
</style>
