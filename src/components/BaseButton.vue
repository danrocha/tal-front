<template>
  <button v-on="$listeners" class="btn" :class="finalClass" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    targetClass: {
      type: String,
      default: '',
    },
    baseType: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    finalClass() {
      let finalClass = '';
      switch (this.baseType) {
        case 'primary':
          finalClass += 'btn-primary ';
          break;
        case 'secondary':
          finalClass += 'btn-secondary ';
          break;
      }
      if (this.disabled) {
        finalClass += 'btn-disabled ';
      }
      return finalClass;
    },
  },
};
</script>

<style></style>
