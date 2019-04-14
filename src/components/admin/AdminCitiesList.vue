<template>
  <div>
    <p>{{ cities.totalCount }} cities</p>
    <div v-if="missingCoordinates.length > 0">
      {{ missingCoordinates.length }} missing coordinates
      <base-button @click="fixMissingCoordinates(missingCoordinates)">fix</base-button>
      <ul class="text-sm text-gray-500">
        <li v-for="city in missingCoordinates" :key="city.id" class="mb-4">
          [{{ city.id }}] {{ city.name }}
        </li>
      </ul>
    </div>
    <ul>
      <li
        v-for="country in countries"
        :key="country.iso"
        class="mb-8 pt-1 border-t border-yellow-500"
      >
        <span class="uppercase tracking-wider">{{ country.name }}</span>
        <ul class="mt-4">
          <li v-for="city in cityByCountryIso(country.iso)" :key="city.id" class="mb-4">
            <h4 class="text-base font-bold">{{ city.name }}</h4>
            <ul class="text-sm text-gray-500 ml-4">
              <li>ID: {{ city.id }}</li>
              <li>Region: {{ city.region ? city.region.longName : 'n/a' }}</li>
              <li>
                Coordinates:
                <span v-if="city.coordinates"
                  >{{ city.coordinates.x }}, {{ city.coordinates.y }}</span
                >
                <span v-else>
                  n/a
                  <base-button targetClass="text-sm" @click="fixMissingCoordinates([city])"
                    >fix</base-button
                  >
                </span>
              </li>
              <li>Locations: {{ city.locations.totalCount }}</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
const uniqBy = require('lodash.uniqby');

import kebabCase from '../../mixins/kebabCase';

export default {
  name: 'AdminCitiesList',
  mixins: [kebabCase],
  props: {
    cities: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mapboxAccessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
    };
  },
  computed: {
    missingCoordinates() {
      return this.cities.nodes.filter(city => city.coordinates === null);
    },
    countries() {
      return uniqBy(this.cities.nodes.map(city => city.countryByCountryIsocode), 'iso');
    },
  },
  methods: {
    cityByCountryIso(iso) {
      return this.cities.nodes.filter(city => city.countryByCountryIsocode.iso === iso);
    },
    fixMissingCoordinates(cities) {
      cities.forEach(city => {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${city.name.toLowerCase()}.json?access_token=${
              this.mapboxAccessToken
            }&cachebuster=1553335411984&autocomplete=false&country=${city.countryByCountryIsocode.iso.toLowerCase()}&limit=1`
          )
          .then(result => {
            this.$apollo.mutate({
              mutation: require('../../graphql/UpdateCityById.gql'),
              variables: {
                input: {
                  id: city.id,
                  patch: {
                    coordinates: {
                      x: result.data.features[0].center[1],
                      y: result.data.features[0].center[0],
                    },
                  },
                },
              },
              refetchQueries: [
                {
                  query: require('../../graphql/Cities.gql'),
                },
              ],
            });
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  @apply mb-4;
}
</style>
