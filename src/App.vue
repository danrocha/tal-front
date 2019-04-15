<template>
  <div>
    <!--HEADER -->
    <main-menu />
    <!-- BODY WRAP -->
    <div>
      <router-view />
      <notification-container />
    </div>
    <!-- NOTIFICATIONS -->
    <main-footer />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'App',
  components: {
    MainMenu,
    MainFooter,
    NotificationContainer,
  },
};
</script>
