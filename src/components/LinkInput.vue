<template>
  <div class="flex items-center justify-start mb-4">
    <span class="w-8">
      <font-awesome-icon
        :icon="icon ? ['fab', icon] : 'link'"
        class="text-yellow-500"
      ></font-awesome-icon>
    </span>

    <div class="flex flex-wrap items-stretch w-full relative">
      <div class="flex -mr-px">
        <span
          class="flex items-center justify-end leading-normal bg-gray-200 rounded rounded-r-none border border-r-0 border-gray-400 px-3 whitespace-no-wrap text-gray-700 text-sm w-40"
          >{{ handlePrefix }}/</span
        >
      </div>
      <input
        type="text"
        class="input flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none px-3 relative"
        v-bind="$attrs"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    socialNetworkName: {
      type: String,
      default: null,
    },
    handlePrefix: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
