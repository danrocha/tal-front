<template>
  <!-- LIST -->
  <div id="office-list" class="-mt-8">
    <office-list-item-alt v-for="location in locations" :location="location" :key="location.id" />
  </div>
</template>

<script>
const VueScrollTo = require('vue-scrollto');
import OfficeListItemAlt from './OfficeListItemAlt.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OfficeListAlt',
  components: {
    OfficeListItemAlt,
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
