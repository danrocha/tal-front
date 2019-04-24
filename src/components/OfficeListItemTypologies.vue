<template>
  <div v-if="location.office.officeTypologies.nodes.length > 0" class="flex flex-wrap items-start">
    <span
      v-for="node in location.office.officeTypologies.nodes"
      :key="node.id"
      class="uppercase text-xs py-1 px-2 mr-2 mb-2 bg-gray-400 rounded text-gray-700 border border-gray-400"
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
