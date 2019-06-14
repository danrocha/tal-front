<template>
  <div v-if="!edit">
    <span v-if="office.size">{{ office.size.nameShort }} ({{ office.size.description }})</span>
    <edit-link v-else>edit size...</edit-link>
  </div>
  <div v-else>
    <base-label for="office-size">Size</base-label>
    <select-size :original-size-id="office.sizeId" @input="updateValue" />
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
  methods: {
    updateValue(event) {
      this.$emit('input', event);
    },
  },
};
</script>

<style lang="scss" scoped></style>
