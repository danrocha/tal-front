<template>
  <div v-if="location.office.officeTypologies.nodes.length > 0" class="flex">
    <span
      v-for="node in location.office.officeTypologies.nodes"
      :key="node.id"
      class="uppercase text-xs py-1 px-2 mr-2 bg-gray-400 rounded text-gray-700"
      >{{ node.typology.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'OfficeListItemTypologies',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
};
</script>
