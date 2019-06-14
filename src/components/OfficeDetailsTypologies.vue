<template>
  <div v-if="!edit">
    <div
      v-if="office.officeTypologies.nodes.length > 0"
      class="flex flex-wrap flex-row items-start"
    >
      <span
        v-for="node in office.officeTypologies.nodes"
        :key="node.id"
        class="p-1 mr-2 mb-2 border border-gray-500bg-white text-xs uppercase rounded-sm"
        >{{ node.typology.name }}</span
      >
    </div>
    <edit-link v-else>edit typologies...</edit-link>
  </div>
  <div v-else>
    <base-label>Typologies</base-label>
    <select-typologies :original-typologies="office.officeTypologies.nodes" @input="updateValue" />
  </div>
</template>

<script>
import SelectTypologies from '../components/SelectTypologies.vue';
import EditLink from '../components/EditLink.vue';

export default {
  name: 'OfficeDetailsTypologies',
  components: {
    EditLink,
    SelectTypologies,
  },
  props: {
    office: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
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
