<template>
  <div v-if="$apollo.queries.locations.loading || $apollo.queries.cities.loading">
    <vcl-list/>
  </div>
  <div v-else>
    <vue-headful
      :title="`Architecture Offices in ${city.name} - The Architecture List`"
      :description="`List of architecture office in ${city.name}`"
    />

    <div id="city-page">
      <h2 class="text-4xl font-bold mb-6 sm:m-0">
        <span class="font-normal">{{ locations.totalCount }} offices in</span>
        {{ city.name }}
        <span
          class="font-normal text-gray-500 ml-1"
        >{{ city.countryByCountryIsocode.iso }}</span>
      </h2>

      <aside class="w-full mb-6 sm:m-0 sm:w-64">
        <office-list-controls/>
      </aside>
      <!-- LIST -->
      <main role="main" class="w-full">
        <div v-if="$apollo.queries.locations.loading" class="p-6 w-1/2">
          <vcl-list/>
        </div>
        <div v-else-if="$apollo.queries.locations.error" class="p-6">
          <!-- TODO: add styled error -->
          An error occurred
        </div>
        <div id="locations-result" v-else-if="locations" class="flex flex-col h-full">
          <div v-if="isFiltered && displayLocations.length === 0" class="text-gray-700 text-sm">
            <p class="mb-2">
              Oops, no offices match these filters! However, some offices still have incomplete
              information.
              <br>You can include them in your filter by checking the option
              <strong>Include incomplete entries</strong> on the right.
            </p>
            <p>
              <button class="btn" @click="clearFilters" base-type="secondary">clear filters</button>
            </p>
          </div>
          <office-list-alt :locations="displayLocations" :pagination="false" :ordering="true"/>
        </div>
        <div v-else class="no-result apollo">No result :(</div>
      </main>
    </div>
  </div>
</template>

<script>
import CITIES from '../graphql/Cities.gql';
import LOCATIONS from '../graphql/Locations.gql';
import kebabCase from '../mixins/kebabCase';
import OfficeListAlt from '../components/OfficeListAlt.vue';
import OfficeListControls from '../components/OfficeListControls.vue';
import { VclList } from 'vue-content-loading';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'City',
  mixins: [kebabCase],
  components: {
    OfficeListAlt,
    VclList,
    OfficeListControls,
  },
  props: {
    country_iso: {
      required: true,
      type: String,
    },
    city_name: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      city: null,
      displayLocations: null,
      //typologies: null,
      //sizes: null,
      ages: null,
      locations: [],
      currentYear: new Date().getFullYear(),
    };
  },
  apollo: {
    cities: {
      query: CITIES,
      result({ data }) {
        this.city = data.cities.nodes.find(city => {
          return (
            this.kebabCase(city.name) === this.city_name &&
            this.kebabCase(city.countryByCountryIsocode.iso) ===
              this.country_iso
          );
        });
        this['location/setLocationQueryFilter']({
          cityId: { in: this.city.id },
        });
      },
    },
    locations: {
      query: LOCATIONS,
      variables() {
        const {
          first,
          last,
          after,
          before,
          orderBy,
          condition,
          filter,
        } = this.locationQueryVariables;
        return {
          first,
          last,
          after,
          before,
          orderBy,
          condition,
          filter,
        };
      },
      update(data) {
        console.log(data);
        data.locations.nodes = data.locations.nodes.map(location => {
          return {
            ...location,
            size: location.office.sizeId,
            typologies: location.office.officeTypologies.nodes.map(
              node => node.typology.id
            ),
            age: this.calculateAge(location.office.yearFounded),
          };
        });
        return { ...data.locations };
      },
      result({ data }) {
        /* this.typologies = data.locations.nodes.map(location => {
          return {
            id: location.id,
            typologies: location.office.officeTypologies.nodes,
          };
        }); */
        //this.sizes = data.nodes.map();
        this.displayLocations = this.filterLocations();
      },
    },
  },
  computed: {
    ...mapState({
      selectedLocation: state => state.location.selectedLocation,
      typologyFilter: state => state.location.typologyFilter,
      sizeFilter: state => state.location.sizeFilter,
      yearFilter: state => state.location.yearFilter,
      includeIncomplete: state => state.location.includeIncomplete,
      locationQueryVariables: state => state.location.locationQueryVariables,
    }),
    isFiltered() {
      return (
        this.typologyFilter.length > 0 ||
        this.sizeFilter.length > 0 ||
        this.yearFilter.length > 0
      );
    },
  },

  methods: {
    ...mapActions(['location/clearFilters', 'location/setLocationQueryFilter']),
    clearFilters() {
      this['location/clearFilters']();
    },
    calculateAge(yearFounded) {
      return this.currentYear - yearFounded;
    },
    filterLocations() {
      return this.filterTypologies(
        this.filterSizes(
          this.filterYears(this.locations.nodes, this.yearFilter),
          this.sizeFilter
        ),
        this.typologyFilter
      );
    },
    filterTypologies(locations, typologies) {
      if (typologies.length === 0) {
        return locations;
      }
      return locations.filter(location => {
        if (location.typologies.length > 0) {
          return typologies.find(typology =>
            location.typologies.includes(typology.id)
          );
        } else {
          return this.includeIncomplete;
        }
      });
    },
    filterSizes(locations, sizes) {
      if (sizes.length === 0) {
        return locations;
      }
      return locations.filter(location => {
        if (location.office.size) {
          return sizes.find(size => size.id === location.size);
        } else {
          return this.includeIncomplete;
        }
      });
    },
    filterYears(locations, years) {
      if (years.length === 0) {
        return locations;
      }
      return locations.filter(location => {
        if (location.age) {
          let ageCategory;
          if (location.age <= 5) {
            ageCategory = 1;
          } else if (location.age > 5 && location.age <= 15) {
            ageCategory = 2;
          } else {
            ageCategory = 3;
          }
          return years.includes(ageCategory);
        } else {
          return this.includeIncomplete;
        }
      });
    },
  },

  watch: {
    typologyFilter() {
      this.displayLocations = this.filterLocations();
    },
    sizeFilter() {
      this.displayLocations = this.filterLocations();
    },
    yearFilter() {
      this.displayLocations = this.filterLocations();
    },
    includeIncomplete() {
      this.displayLocations = this.filterLocations();
    },
  },
};
</script>

<style scoped>
#city-page {
  @apply flex flex-col flex-wrap;
}
@screen sm {
  #city-page {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 5rem auto;
    grid-template-areas:
      'title title'
      'controls list';
    grid-gap: 1.5rem;
  }
  #city-page > h2 {
    grid-area: title;
  }
  #city-page > aside {
    grid-area: controls;
  }
  #city-page > main {
    grid-area: list;
  }
}
@screen md {
  #city-page {
    grid-template-areas:
      'title-left title'
      'controls list';
  }
}
</style>
