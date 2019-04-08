<template>
  <div>
    <base-label v-if="label" :for="label" :required="required">
      {{ label }}
      <slot v-if="explanation" v-slot:explanation>{{ explanation }}</slot>
    </base-label>
    <div class="relative">
      <select
        :id="label"
        :value="value"
        @change="updateValue"
        v-bind="$attrs"
        class="input"
        :class="targetClass"
      >
        <option
          v-for="option in options"
          :key="option"
          :selected="option === value"
          :value="option"
          >{{ option }}</option
        >
      </select>
      <div class="pointer-events-none absolute pin-y right flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
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
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style></style>
