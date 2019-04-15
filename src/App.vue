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
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
//import TheMainFooter from '@/components/TheMainFooter.vue';
//import { onLogout } from './vue-apollo';

export default {
  name: 'App',
  components: {
    MainMenu,
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
