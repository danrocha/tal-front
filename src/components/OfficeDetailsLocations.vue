<template>
  <div class="flex">
    <div
      class="flex justify-end flex-col items-center p-4 shadow bg-white border-2 border-transparent hover:border-yellow-500 hover:shadow-md hover:cursor-pointer h-48 w-48"
      :style="bgMapStyle"
    >
      <h4 class="uppercase tracking-wider flex items-center bg-white font-bold">
        {{ location.city.name }}
        <span class="uppercase font-normal text-gray-600 text-sm pl-2">{{
          location.city.countryByCountryIsocode.iso
        }}</span>
      </h4>
    </div>
    <div class="pl-4 flex flex-col justify-end">
      <p>{{ location.formattedAddress }}</p>
      <p>
        <font-awesome-icon icon="phone-square" class="text-gray-400 mr-1"></font-awesome-icon>
        <span v-if="location.internationalPhoneNumber">{{
          location.internationalPhoneNumber
        }}</span>
        <router-link v-else :to="editLink" class="link italic" tag="a">add...</router-link>
      </p>
      <p v-if="location.email.length > 0" class="flex items-center">
        <font-awesome-icon icon="envelope" class="text-gray-400 mr-1"></font-awesome-icon>
        <span>{{ location.email }}</span>
      </p>
      <!-- <edit-link class="mt-2"></edit-link> -->
    </div>
  </div>
</template>

<script>
import kebabCase from '../mixins/kebabCase';
import EditLink from '../components/EditLink.vue';

const mbxClient = require('@mapbox/mapbox-sdk');
const baseClient = mbxClient({
  accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
});
const mbxStatic = require('@mapbox/mapbox-sdk/services/static');
const staticClient = mbxStatic(baseClient);

export default {
  name: 'OfficeDetailsLocations',
  mixins: [kebabCase],
  components: {
    EditLink,
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mapTileUrl: '',
      mapboxAccessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
      editLink: `${this.$route.path}/edit`,
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
        coordinates: [this.location.coordinates.y, this.location.coordinates.x],
        zoom: 15,
      },
      overlays: [
        {
          marker: {
            coordinates: [this.location.coordinates.y, this.location.coordinates.x],
            color: '#ecc94b',
          },
        },
      ],
    });
    this.mapTileUrl = request.url() + `?access_token=${mapboxAccessToken}`;
  },
  computed: {
    bgMapStyle() {
      return `background: center / cover no-repeat url("${this.mapTileUrl}");`;
    },
  },
};
</script>

<style scoped></style>
