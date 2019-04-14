<template>
  <li
    class="flex justify-end flex-col items-center p-4 shadow bg-white border-2 border-transparent hover:border-yellow-500 hover:shadow-md hover:cursor-pointer h-48"
    @click="selectCity"
    :style="bgMapStyle"
  >
    <h4 class="uppercase tracking-wider flex items-center bg-white font-bold">
      <a :href="cityPageUrl" class="link">{{ city.name }}</a>
      <span class="uppercase font-normal text-gray-600 text-sm pl-2">{{
        city.countryByCountryIsocode.iso
      }}</span>
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
  accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
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
      mapTileUrl: '',
      mapboxAccessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
    };
  },
  mounted() {
    const mapboxAccessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    const request = staticClient.getStaticImage({
      ownerId: 'danroc',
      styleId: 'cjrgcw84j2ehx2spc57sz7axo',
      width: 300,
      height: 300,
      position: {
        coordinates: [this.city.coordinates.y, this.city.coordinates.x],
        zoom: 15,
      },
    });
    this.mapTileUrl = request.url() + `?access_token=${mapboxAccessToken}`;
  },
  computed: {
    bgMapStyle() {
      return `background: center / cover no-repeat url("${this.mapTileUrl}");`;
    },
    cityPageUrl() {
      return `/${this.kebabCase(this.city.countryByCountryIsocode.iso)}/${this.kebabCase(
        this.city.name
      )}`;
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
