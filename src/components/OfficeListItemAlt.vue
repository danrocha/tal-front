<template>
  <div :id="`location-${location.id}`" class="border-b mt-8 pb-8">
    <div class="item flex flex-no-wrap items-start content-start justify-start w-full">
      <div class="vote-arrow w-2 mr-2 text-center">
        <vote-control :location="location"/>
      </div>
      <div class="flex justify-between w-full">
        <div class="ml-4">
          <h1 class="font-bold text-base text-gray-800 mb-1 w-full">
            <router-link
              :to="officeDetailsLink"
              class="link"
              @click.stop="selectLocation"
            >{{ location.office.name }}</router-link>
          </h1>
          <div class="text-sm text-gray-600 mb-1">
            <div>
              <a v-if="hasWebsite" class="link" :href="location.office.website" target="_blank">
                {{
                formatUrl(location.office.website)
                }}
              </a>
            </div>
          </div>
          <div
            v-if="location.office.sizeId || location.office.officeTypologies.nodes.length > 0"
            class="mb-1 flex"
          >
            <div v-if="location.office.sizeId" class="flex">
              <span
                class="uppercase text-xs py-1 px-2 mr-2 bg-white border border-gray-500 rounded"
              >{{ location.office.size.nameShort }}</span>
            </div>
            <div v-if="location.office.officeTypologies.nodes.length > 0" class="flex">
              <span
                v-for="node in location.office.officeTypologies.nodes"
                :key="node.id"
                class="uppercase text-xs py-1 px-2 mr-2 bg-gray-400 rounded text-gray-700"
              >{{ node.typology.name }}</span>
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-700">
          <ul class="text-right">
            <li>Details</li>
            <li>Save to favorites</li>
          </ul>
          <favorite-control :location="location" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import formatUrl from '@/mixins/formatUrl';
import kebabCase from '@/mixins/kebabCase';
import VoteControl from '@/components/VoteControl.vue';
import FavoriteControl from '@/components/FavoriteControl.vue';
export default {
  name: 'OfficeListItemAlt',
  mixins: [formatUrl, kebabCase],
  components: {
    VoteControl,
    FavoriteControl,
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      selectedLocation: state => state.location.selectedLocation,
    }),
    isSelected() {
      if (this.selectedLocation) {
        return this.location.id === this.selectedLocation.id;
      }
      return false;
    },

    hasWebsite() {
      return this.location.office.website;
    },

    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(
          this.location.countryByCountryIsocode.iso
        )}/${this.kebabCase(this.location.city.name)}/${
          this.location.id
        }/${this.kebabCase(this.location.office.name)}`,
      };
    },
  },
  methods: {
    ...mapActions(['setCityFilter', 'location/setLocation']),
    selectLocation() {
      this['location/setLocation'](this.location);
    },
  },
};
</script>
<style scoped>
.selected {
  @apply border-yellow-500;
}
</style>
