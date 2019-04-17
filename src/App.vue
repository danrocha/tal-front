<template>
  <div>
    <!--HEADER -->
    <main-menu />
    <!-- BODY WRAP -->
    <div class="pt-8 px-6 container mx-auto lg:px-0 lg:w-auto lg:mr-6 lg:ml-56">
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
