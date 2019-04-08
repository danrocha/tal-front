<template>
  <div
    class="py-4 flex items-center justify-between font-mono font-bold"
    :class="isActive ? 'text-gray-900' : 'text-gray-500'"
  >
    <span
      class="flex-none flex items-center justify-center rounded-full w-8 h-8 border-gray-500 border"
    >
      <slot name="step"></slot>
    </span>

    <span class="flex-none uppercase ml-2">
      <slot name="step-name"></slot>
    </span>
    <span class="border flex-1 ml-4 w-full"></span>
  </div>
</template>
<script>
export default {
  name: 'AddOfficeStep',
  props: {
    isActive: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
};
</script>
