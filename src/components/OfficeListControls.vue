<template>
  <div id="office-list-controls" class="sm:mr-4">
    <div class="block text-right w-full sm:hidden">
      <base-button base-type="secondary" class="m-0" @click="toggleFilters">
        <font-awesome-icon icon="times" class="mr-2" v-if="showFilters"></font-awesome-icon>
        <font-awesome-icon icon="filter" class="mr-2" v-else></font-awesome-icon>Filters
      </base-button>
    </div>
    <div v-if="showFilters" class="border border-yellow-500 p-4 sm:p-0 sm:border-transparent">
      <!-- ORDERING CONTROL -->
      <section id="ordering" class="mb-8">
        <base-label for="ordering-controls">Order by</base-label>
        <ul id="ordering-controls" class="flex text-sm">
          <li
            class="link"
            :class="{ 'link-active': orderBy === 'OFFICE_BY_OFFICE_ID__NAME_ASC' }"
            @click="setOrderBy('OFFICE_BY_OFFICE_ID__NAME_ASC')"
          >
            A-Z
          </li>
          <li
            class="link"
            :class="{ 'link-active': orderBy === 'CREATED_AT_DESC' }"
            @click="setOrderBy('CREATED_AT_DESC')"
          >
            Latest added
          </li>
        </ul>
      </section>
      <section id="include-incomplete" class="mb-8 text-sm">
        <label for="include-incomplete">
          <input
            type="checkbox"
            class="mr-1"
            id="include-incomplete"
            @change="toggleIncludeIncomplete"
          />
          Include incomplete entries
        </label>
      </section>
      <section id="size-filter" class="mb-8">
        <!-- filters CONTROL -->
        <base-label for="size-filter">Sizes</base-label>
        <ul id="size-filter" v-if="sizes" class="text-sm">
          <li v-for="size in sizes.nodes" :key="size.id" class="mb-1">
            <label :for="`checkbox-${size.nameShort}`">
              <input
                type="checkbox"
                class="mr-1"
                :id="size.nameShort"
                :value="size"
                v-model="selectedSizes"
              />
              {{ size.nameShort }} ({{ size.description }})
            </label>
          </li>
        </ul>
      </section>
      <section id="typology-filter" class="mb-8">
        <!-- typologies -->
        <base-label for="typology-filter">Typologies</base-label>
        <select-typologies v-model="selectedTypologies" :original-typologies="typologyFilter" />
      </section>
      <section id="years-filter" class="mb-4">
        <!-- years -->
        <base-label for="years">Years in Business</base-label>
        <ul id="years-filter" v-if="sizes" class="text-sm">
          <li class="mb-1">
            <label for="checkbox-young">
              <input type="checkbox" class="mr-1" id="young" :value="1" v-model="selectedYears" />
              Young (< 5 years)
            </label>
          </li>
          <li class="mb-1">
            <label for="checkbox-striving">
              <input
                type="checkbox"
                class="mr-1"
                id="striving"
                :value="2"
                v-model="selectedYears"
              />
              Striving (5-15 years)
            </label>
          </li>
          <li class="mb-1">
            <label for="checkbox-established">
              <input
                type="checkbox"
                class="mr-1"
                id="established"
                :value="3"
                v-model="selectedYears"
              />
              Established (> 15 years)
            </label>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SelectTypologies from './SelectTypologies.vue';
import SIZES from '../graphql/Sizes.gql';

export default {
  name: 'OfficeListControls',
  components: { SelectTypologies },
  data() {
    return {
      showFilters: true,
      windowWidth: 0,
      selectedTypologies: [],
      selectedSizes: [],
      selectedYears: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.recordResize);
    });
  },
  methods: {
    ...mapActions([
      'location/setOrderBy',
      'location/setTypologyFilter',
      'location/setSizeFilter',
      'location/setYearFilter',
      'location/toggleIncludeIncomplete',
    ]),
    setOrderBy(orderBy) {
      this['location/setOrderBy'](orderBy);
    },
    toggleIncludeIncomplete() {
      this['location/toggleIncludeIncomplete']();
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    recordResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapState({
      orderBy: state => state.location.locationQueryVariables.orderBy,
      typologyFilter: state => state.location.typologyFilter,
      sizeFilter: state => state.location.sizeFilter,
      yearFilter: state => state.location.yearFilter,
      includeIncomplete: state => state.location.includeIncomplete,
    }),
  },
  watch: {
    selectedTypologies() {
      this['location/setTypologyFilter'](this.selectedTypologies);
    },
    selectedSizes() {
      this['location/setSizeFilter'](this.selectedSizes);
    },
    selectedYears() {
      this['location/setYearFilter'](this.selectedYears);
    },
    sizeFilter() {
      this.selectedSizes = this.sizeFilter;
    },
    yearFilter() {
      this.selectedYears = this.yearFilter;
    },
    typologyFilter() {
      this.selectedTypologies = this.typologyFilter;
    },
    windowWidth(newWidth) {
      if (newWidth < 640) {
        return (this.showFilters = false);
      }
      return (this.showFilters = true);
    },
  },
  apollo: {
    sizes: {
      query: SIZES,
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.recordResize);
  },
};
</script>

<style scoped>
#ordering-controls li {
  @apply mr-4;
}
</style>
