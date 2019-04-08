<template>
  <span
    @click="click"
    class="cursor-pointer text-gray-600 border-b border-transparent hover:border-yellow-500 hover:text-gray-900"
  >
    <font-awesome-icon icon="edit" class="text-sm"></font-awesome-icon>
    <span class="text-xs ml-1">EDIT</span>
  </span>
</template>

<script>
export default {
  name: 'EditLink',
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>
