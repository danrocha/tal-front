<template>
  <div>
    <base-label v-if="label" :for="label" :required="required">
      {{ label }}
      <slot v-if="explanation" v-slot:explanation>{{ explanation }}</slot>
    </base-label>
    <input :value="value" @input="updateValue" v-bind="$attrs" class="input" :class="finalClass" />
    <span v-if="error" class="text-xs text-gray">{{ error }}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    explanation: {
      type: String,
      required: false,
      default: null,
    },
    targetClass: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
  computed: {
    finalClass() {
      if (this.disabled) {
        return this.targetClass + ' btn-disabled';
      }
      return this.targetClass;
    },
  },
};
</script>

<style></style>
