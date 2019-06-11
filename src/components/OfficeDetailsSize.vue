<template>
  <div v-if="!edit">
    <span v-if="office.size">{{ office.size.nameShort }} ({{ office.size.description }})</span>
    <edit-link v-else>edit size...</edit-link>
  </div>
  <div v-else  class="mb-4">
    <select-size :original-size-id="office.sizeId" />
  </div>
</template>

<script>
import SelectSize from '../components/SelectSize.vue';
export default {
  name: 'OfficeDetailsSize',
  components: { SelectSize },
  props: {
    office: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
