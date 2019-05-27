<template>
  <div
    id="home-content"
    class="flex flex-wrap w-full justify-between lg:flex-row-reverse lg:h-full"
  >
    <vue-headful title="The Architecture List" />

    <!-- MAP -->
    <div
      v-show="showMap"
      id="home-map"
      class="h-64 mt-2 w-screen lg:h-full lg:m-0 lg:w-2/3"
      :class="largeMap ? 'h-screen' : 'h-64'"
    >
      <office-map :geojson="geoJson" />
    </div>
    <!-- LIST -->
    <div
      id="sidebar"
      class="w-full h-full bg-white md:pr-4 lg:p-0 lg:m-0 lg:w-1/3 lg:z-20 lg:shadow"
    >
      <!-- LIST TOP BAR -->
      <div
        class="flex w-full mb-4 mt-4 pb-4 pt-4 px-6 items-center justify-between text-xs border-b lg:hidden"
      >
        <div>
          <span v-if="locations" class="text-gray-600 mr-1"
            >{{ locations.totalCount }} offices</span
          >
          <span v-else class="text-gray-600 mr-1">Loading offices...</span>
        </div>

        <!-- MAP CONTROLS-->
        <div class="text-gray-600">
          <a v-if="showMap" href="#" @click="toggleMapSize" class="no-underline text-gray-600">
            <span v-if="largeMap">
              <font-awesome-icon icon="compress" class="mr-4"></font-awesome-icon>
            </span>
            <span v-else>
              <font-awesome-icon icon="expand" class="mr-4"></font-awesome-icon>
            </span>
          </a>
          <a href="#" @click="toggleShowMap" class="no-underline text-gray-600">
            <span v-if="showMap">
              <font-awesome-icon icon="list"></font-awesome-icon>
            </span>
            <span v-else>
              <font-awesome-icon icon="map-marked-alt"></font-awesome-icon>
            </span>
          </a>
        </div>
      </div>

      <!-- LIST -->
      <div class="lg:h-full">
        <!-- Loading -->
        <div v-if="$apollo.queries.locations.loading" class="p-6">
          <vcl-list />
        </div>

        <!-- Error -->
        <div v-else-if="$apollo.queries.locations.error" class="p-6">
          <!-- TODO: add styled error -->
          An error occurred
        </div>
        <div id="locations-result" v-else-if="locations" class="flex flex-col h-full">
          <office-list :locations="locations" />

          <div class="h-24 bg-white border-t">
            <pagination :pageInfo="locations.pageInfo" :totalCount="locations.totalCount" />
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </div>
    </div>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import OfficeList from '@/components/OfficeList.vue';
import OfficeMap from '@/components/OfficeMap.vue';
import Pagination from '@/components/Pagination.vue';
import LOCATIONS from '../graphql/Locations.gql';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HomeMap',
  components: {
    OfficeList,
    OfficeMap,
    Pagination,
    VclList,
  },
  data() {
    return {
      locations: null,
      first: this.itemsPerPage,
      last: null,
      after: null,
      before: null,
      orderBy: 'CREATED_AT_DESC',
      condition: {},
      showMap: true,
      pageNumber: 1,
      geoJson: null,
    };
  },

  apollo: {
    locations: {
      query: LOCATIONS,
      variables() {
        return {
          first: this.paginationInfo.first,
          last: this.paginationInfo.last,
          after: this.paginationInfo.after,
          before: this.paginationInfo.before,
          orderBy: this.orderBy,
          condition: this.condition,
          filter: this.filter,
        };
      },
      result({ data }) {
        this.generateGeoJson(data);
        this.locations = data.locations;
      },
      error() {
        this.$store.dispatch('notification/add', {
          type: 'error',
          message: 'Oops, something went wrong in the background! Please try reloading the page.',
        });
      },
    },
  },
  methods: {
    ...mapActions(['toggleMapSize', 'setItemsPerPage', 'setPaginationInfo']),
    toggleShowMap() {
      this.showMap = !this.showMap;
    },
    resetPagination() {
      this.setPaginationInfo({
        first: this.itemsPerPage,
        last: null,
        after: null,
        before: null,
        pageNumber: 1,
      });
    },
    generateGeoJson(data) {
      this.geoJson = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data.locations.nodes.map(location => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [location.coordinates.y, location.coordinates.x],
              },
              properties: {
                id: location.id,
                name: location.office.name,
                website: location.office.website,
                formattedAddress: location.formattedAddress,
              },
            };
          }),
        },
      };
    },
  },
  computed: {
    ...mapState(['filterCity', 'largeMap', 'itemsPerPage', 'paginationInfo']),
    numberOfPages() {
      if (!this.itemsPerPage) return 1;
      return Math.ceil(this.locations.totalCount / this.itemsPerPage);
    },
    filter() {
      if (this.filterCity.length) {
        return { cityId: { in: this.filterCity.map(city => city.id) } };
      }
      return { id: { notIn: [] } };
    },
  },
  watch: {
    filterCity(city) {
      //console.log('home filtercity update watch triggered!', city);
      this.resetPagination();
      if (city.length) {
        return this.setItemsPerPage(null);
        //return (this.condition = { cityId: city[0].id });
        //return (this.filter = { cityId: { in: city.map(city => city.id) } });
      }
      this.setItemsPerPage(20);
      //this.condition = {};
      //this.filter = { id: { notIn: [] } };
    },
    itemsPerPage() {
      this.resetPagination();
    },
    /* locations() {
      this.geoJson = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.locations.nodes.map(location => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [location.coordinates.y, location.coordinates.x],
              },
              properties: {
                id: location.id,
                name: location.office.name,
                website: location.office.website,
                formattedAddress: location.formattedAddress,
              },
            };
          }),
        },
      };
    }, */
  },
};
</script>
<style></style> \
