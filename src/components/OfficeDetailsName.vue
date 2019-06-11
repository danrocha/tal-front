<template>
  <div v-if="!edit">
    <h1 class="text-6xl leading-tight font-bold">
      {{ officeName }}
      <br />
      <!-- <span class="label">AKA</span>&nbsp;<span class="text-base text-gray-600 font-normal">Alt name 1, altname 2</span><edit-link  class="ml-2 font-sans font-normal"/> -->
    </h1>
  </div>
  <div v-else>
    <base-input label="Office Name" :value="officeName" target-class="input-large" />
  </div>
</template>

<script>
export default {
  name: 'OfficeDetailsName',
  props: {
    officeName: {
      type: String,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
