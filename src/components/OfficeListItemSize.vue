<template>
  <div v-if="location.office.sizeId" class="flex items-start">
    <span class="uppercase text-xs py-1 px-2 mr-2 mb-2 bg-white border border-gray-500 rounded">
      {{
      location.office.size.nameShort
      }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'OfficeListItemSize',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
};
</script>
