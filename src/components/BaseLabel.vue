<template>
  <div class="text-xs text-gray-600 mb-1">
    <label class="uppercase tracking-wider" v-bind="$attrs">
      <slot></slot>
      <span v-if="required">- REQUIRED</span>
    </label>
    <slot name="explanation"></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLabel',
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style></style>
