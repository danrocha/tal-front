<template>
  <div :id="`location-${location.id}`" class="border-b mt-8 pb-8">
    <div class="item flex flex-no-wrap items-start content-start justify-start w-full">
      <div class="vote-arrow w-2 mr-2 text-center">
        <vote-control :location="location" />
      </div>
      <div class="flex justify-between w-full">
        <div class="ml-4">
          <office-list-item-header :location="location" />
          <div
            v-if="location.office.sizeId || location.office.officeTypologies.nodes.length > 0"
            class="mb-1 flex"
          >
            <office-list-item-size :location="location" />
            <office-list-item-typologies :location="location" />
          </div>
        </div>
        <div class="text-sm text-gray-700">
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
import OfficeListItemHeader from '@/components/OfficeListItemHeader.vue';
import OfficeListItemSize from '@/components/OfficeListItemSize.vue';
import OfficeListItemTypologies from '@/components/OfficeListItemTypologies.vue';
import VoteControl from '@/components/VoteControl.vue';
import FavoriteControl from '@/components/FavoriteControl.vue';
export default {
  name: 'OfficeListItemAlt',
  mixins: [formatUrl, kebabCase],
  components: {
    VoteControl,
    FavoriteControl,
    OfficeListItemHeader,
    OfficeListItemSize,
    OfficeListItemTypologies,
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
