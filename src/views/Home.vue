<template>
  <div id="home-content">
    <vue-headful title="The Architecture List" />
    <div class="mb-8">
      <h1 class="text-4xl mb-2">
        Welcome to
        <span class="font-bold">The Architecture List</span>
      </h1>
      <p class="leading-normal">
        The world's first crowdsourced list of architecture offices.
        <br />To help <strong>you</strong> find the right ones.
      </p>
    </div>
    <div class="mb-8">
      <base-label class="mb-4">Recently added</base-label>
      <recently-added-locations />
    </div>
    <div class="md:w-1/2">
      <base-input
        targetClass="input-large"
        label="Filter by City or country"
        placeholder="Start typing..."
        v-model="filterTerm"
      />
    </div>
    <!-- LIST OF CITIES-->
    <div class="pt-8">
      <!-- Loading -->
      <div v-if="$apollo.queries.cities.loading" class="p-6 w-1/2">
        <vcl-list />
      </div>

      <!-- Error -->
      <div v-else-if="$apollo.queries.cities.error" class="p-6">
        <!-- TODO: add styled error -->
        An error occurred
      </div>
      <div id="cities-result" v-else-if="cities">
        <div class="flex">
          <p class="uppercase text-sm tracking-wider">
            <base-label>Sort:</base-label>
            <button
              v-if="sort === 'COUNTRY_ISOCODE_ASC'"
              class="link uppercase tracking-wider"
              @click="sort = 'NAME_ASC'"
            >
              A-Z
            </button>
            <strong v-else>A-Z</strong> /
            <button
              v-if="sort === 'NAME_ASC'"
              class="link uppercase tracking-wider"
              @click="sort = 'COUNTRY_ISOCODE_ASC'"
            >
              By Country
            </button>
            <strong v-else>By Country</strong>
          </p>
        </div>
        <div class="mt-4">
          <ul v-if="sort === 'COUNTRY_ISOCODE_ASC'" class>
            <li
              v-for="country in countries"
              :key="country.iso"
              class="uppercase tracking-wider my-8 pt-1 border-t border-yellow-500"
            >
              {{ country.name }}
              <city-list :cities="cityByCountryIso(country.iso)" />
            </li>
          </ul>
          <city-list v-else :cities="displayCities" />
        </div>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </div>
  </div>
</template>

<script>
const uniqBy = require('lodash.uniqby');
import { VclList } from 'vue-content-loading';
import CITIES from '../graphql/Cities.gql';
import CityList from '../components/CityList.vue';
import RecentlyAddedLocations from '../components/RecentlyAddedLocations.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    VclList,
    CityList,
    RecentlyAddedLocations,
  },
  data() {
    return {
      filterTerm: '',
      sort: 'NAME_ASC',
    };
  },
  apollo: {
    cities: {
      query: CITIES,
      variables() {
        return {
          orderBy: this.sort,
        };
      },
    },
  },
  computed: {
    ...mapState(['filterCity']),
    displayCities() {
      if (this.filterCity.length > 0) {
        return this.filterCity;
      }
      if (this.filterTerm) {
        return this.cities.nodes.filter(
          city =>
            city.name.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
            city.countryByCountryIsocode.name.toLowerCase().includes(this.filterTerm.toLowerCase())
        );
      }
      return this.cities.nodes;
    },
    countries() {
      return uniqBy(this.displayCities.map(city => city.countryByCountryIsocode), 'iso');
    },
  },
  methods: {
    selectCity(city) {
      console.log(city.name);
    },
    cityByCountryIso(iso) {
      return this.displayCities.filter(city => city.countryByCountryIsocode.iso === iso);
    },
  },
};
</script>
