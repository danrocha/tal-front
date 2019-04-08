<template>
  <button
    @click="$emit('click')"
    class="btn"
    :class="classObject"
    :disabled="disabled"
    :autofocus="focus"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TalButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject() {
      return {
        'btn-primary': this.type === 'primary',
        'btn-secondary': this.type === 'secondary',
        'btn-tertiary': this.type === 'tertiary',
        'btn-disabled': this.disabled,
      };
    },
  },
};
</script>
