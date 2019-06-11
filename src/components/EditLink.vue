<template>
  <div class="flex items-center text-sm text-gray-500">
    <font-awesome-icon icon="edit" class="mr-1"></font-awesome-icon>
    <router-link :to="editLink" class="link italic" tag="a">
      <slot>edit...</slot>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EditLink',
  data() {
    return {
      editLink: `${this.$route.path}/edit`,
    };
  },
};
</script>
