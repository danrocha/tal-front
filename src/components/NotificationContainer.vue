<template>
  <div class="fixed bottom-0 m-8">
    <notification-bar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue';
import { mapState } from 'vuex';
export default {
  components: { NotificationBar },
  computed: {
    ...mapState('notification', ['notifications']),
  },
};
</script>

<style></style>
