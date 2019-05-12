<template>
  <div>
    <p class="text-gray-500 mb-8">{{ offices.totalCount }} offices</p>

    <ul>
      <li v-for="office in offices.nodes" :key="office.id" class="flex flex-col">
        <admin-offices-list-item :office="office" />
      </li>
    </ul>
  </div>
</template>

<script>
import AdminOfficesListItem from '../components/AdminOfficesListItem.vue';

export default {
  name: 'AdminOfficesList',
  props: {
    offices: {
      type: Object,
      required: true,
    },
  },
  components: {
    AdminOfficesListItem,
  },
};
</script>
