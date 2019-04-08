<template>
  <div>
    <!--HEADER -->
    <the-main-menu/>
    <!-- BODY WRAP -->
    <main role="main">
      <router-view/>
    </main>
    <!-- NOTIFICATIONS -->
    <notification-container/>
  </div>
</template>

<script>
import TheMainMenu from '@/components/TheMainMenu.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
//import TheMainFooter from '@/components/TheMainFooter.vue';
//import { onLogout } from './vue-apollo';

export default {
  name: 'App',
  components: {
    TheMainMenu,
    //TheMainFooter,
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
