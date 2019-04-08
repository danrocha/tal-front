<template>
  <li
    class="flex justify-end flex-col items-center p-4 shadow bg-white border-2 border-transparent hover:border-yellow-500 hover:shadow-md hover:cursor-pointer h-48"
    @click="selectCity"
    :style="bgMapStyle"
  >
    <h4 class="uppercase tracking-wider flex items-center bg-white font-bold">
      <a :href="cityPageUrl" class="link">{{ city.name }}</a>
      <span class="uppercase font-normal text-gray-600 text-sm pl-2">
        {{
        city.countryByCountryIsocode.iso
        }}
      </span>
    </h4>
    <span class="bg-white">
      {{ city.locations.totalCount }}
      <span v-if="city.locations.totalCount > 1">offices</span>
      <span v-else>office</span>
    </span>
  </li>
</template>

<script>
import axios from 'axios';
import kebabCase from '../mixins/kebabCase';
const mbxClient = require('@mapbox/mapbox-sdk');
const baseClient = mbxClient({
  accessToken:
    'pk.eyJ1IjoiZGFucm9jIiwiYSI6ImNqdGxia29uZjA2aG80OXAzaHo5ZGF5cGsifQ.jxGdGm__e0_UXUopF9df-w',
});
const mbxStatic = require('@mapbox/mapbox-sdk/services/static');
const staticClient = mbxStatic(baseClient);

export default {
  name: 'CityListItem',
  mixins: [kebabCase],
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mapTile: '',
    };
  },
  mounted() {
    const mapboxAccessToken =
      'pk.eyJ1IjoiZGFucm9jIiwiYSI6ImNqdGxia29uZjA2aG80OXAzaHo5ZGF5cGsifQ.jxGdGm__e0_UXUopF9df-w';
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.city.name.toLowerCase()}.json?access_token=${mapboxAccessToken}&cachebuster=1553335411984&autocomplete=false&country=${this.city.countryByCountryIsocode.iso.toLowerCase()}&limit=1`
      )
      .then(result => {
        const request = staticClient.getStaticImage({
          ownerId: 'danroc',
          styleId: 'cjrgcw84j2ehx2spc57sz7axo',
          width: 300,
          height: 300,
          position: {
            coordinates: result.data.features[0].center,
            zoom: 15,
          },
        });
        this.mapTile = request.url() + `?access_token=${mapboxAccessToken}`;
      });
  },
  computed: {
    bgMapStyle() {
      return `background: center / cover no-repeat url("${this.mapTile}");`;
    },
    cityPageUrl() {
      return `/${this.kebabCase(
        this.city.countryByCountryIsocode.iso
      )}/${this.kebabCase(this.city.name)}`;
    },
  },
  methods: {
    selectCity() {
      this.$router.push(this.cityPageUrl);
    },
  },
};
</script>

<style scoped></style>
