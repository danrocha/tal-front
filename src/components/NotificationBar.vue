<template>
  <!-- TODO: style notifications -->
  <div class="my-2 block text-xs p-2 border rounded-sm w-auto" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification);
    }, 5000);
  },
  computed: {
    notificationTypeClass() {
      return this.notification.type === 'error'
        ? 'bg-red-100 border-red-400 text-red-600'
        : 'bg-green-100 border-green-400 text-green-600';
    },
  },
  methods: {
    ...mapActions('notification', ['remove']),
  },
  beforeDestroy() {
    clearTimeout(this.timeOut);
  },
};
</script>

<style></style>
