<template>
  <!-- LIST -->
  <div id="office-list" class="-mt-8">
    <office-list-item v-for="location in locations" :location="location" :key="location.id" />
  </div>
</template>

<script>
import OfficeListItem from './OfficeListItem.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OfficeList',
  components: {
    OfficeListItem,
  },
  props: {
    locations: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    ordering: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(['setItemsPerPage', 'location/setOrderBy']),
    setOrderBy(orderBy) {
      this['location/setOrderBy'](orderBy);
    },
  },
  computed: {
    ...mapState({
      itemsPerPage: state => state.itemsPerPage,
      selectedLocation: state => state.location.selectedLocation,
      orderBy: state => state.location.orderBy,
    }),
  },
};
</script>
