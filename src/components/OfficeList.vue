<template>
  <!-- LIST -->
  <div id="list-items" class="overflow-y-scroll">
    <!-- PAGINATION CONTROLS -->
    <div v-if="pagination" id="list-menu-bar" class="text-gray-500mb-4 mx-6 lg:hidden">
      <ul class="flex justify-end text-sm lg:justify-start">
        <li class="ml-6">Offices per page:</li>
        <li class="link" :class="{ current: itemsPerPage === 5 }" @click="setItemsPerPage(5)">5</li>
        <li class="link" :class="{ current: itemsPerPage === 10 }" @click="setItemsPerPage(10)">
          10
        </li>
        <li class="link" :class="{ current: itemsPerPage === 20 }" @click="setItemsPerPage(20)">
          20
        </li>
        <li class="link" :class="{ current: !itemsPerPage }" @click="setItemsPerPage(null)">all</li>
      </ul>
    </div>
    <!-- ORDERING CONTROL -->
    <div v-if="ordering" id="list-ordering-bar" class="text-gray-500mb-4 mx-6 lg:hidden">
      <ul class="flex justify-start text-sm">
        <li class="ml-6 uppercase">Order By:</li>
        <li
          class="link"
          :class="{ current: orderBy === 'OFFICE_BY_OFFICE_ID__NAME_ASC' }"
          @click="setOrderBy('OFFICE_BY_OFFICE_ID__NAME_ASC')"
        >
          A-Z
        </li>
        <li
          class="link"
          :class="{ current: orderBy === 'OFFICE_BY_OFFICE_ID__SIZE_ID_ASC' }"
          @click="setOrderBy('OFFICE_BY_OFFICE_ID__SIZE_ID_ASC')"
        >
          Size
        </li>
        <li
          class="link"
          :class="{ current: orderBy === 'VOTES_DESC' }"
          @click="setOrderBy('VOTES_DESC')"
        >
          Popularity
        </li>
        <li
          class="link"
          :class="{ current: orderBy === 'CREATED_AT_DESC' }"
          @click="setOrderBy('CREATED_AT_DESC')"
        >
          Latest added
        </li>
      </ul>
    </div>
    <office-list-item v-for="location in locations.nodes" :location="location" :key="location.id" />
  </div>
</template>

<script>
const VueScrollTo = require('vue-scrollto');
import OfficeListItem from './OfficeListItem.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OfficeList',
  components: {
    OfficeListItem,
  },
  props: {
    locations: {
      type: Object,
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
  watch: {
    selectedLocation(id) {
      if (id)
        VueScrollTo.scrollTo(`#location-${id}`, 500, {
          container: '#sidebar',
          force: false,
        });
    },
  },
};
</script>

<style scoped>
li.link {
  @apply ml-2;
  @apply cursor-pointer;
  @apply border-b-2;
  @apply border-transparent;
  @apply text-gray-600;
}
li.link:hover,
li.current {
  @apply border-yellow-500;
  @apply text-gray-900;
}
</style>
