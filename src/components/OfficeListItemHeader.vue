<template>
  <header>
    <h1 class="font-bold text-base text-gray-800 mb-1 w-full">
      <router-link :to="officeDetailsLink" class="link" @click.native="selectLocation">
        {{
        location.office.name
        }}
      </router-link>
    </h1>
    <div class="text-sm text-gray-600 mb-1">
      <a
        v-if="location.office.website"
        class="link"
        :href="location.office.website"
        target="_blank"
        >{{ formatUrl(location.office.website) }}</a
      >
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import formatUrl from '@/mixins/formatUrl';
import kebabCase from '@/mixins/kebabCase';
export default {
  name: 'OfficeListItemHeader',
  mixins: [formatUrl, kebabCase],
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(this.location.countryByCountryIsocode.iso)}/${this.kebabCase(
          this.location.city.name
        )}/${this.location.id}/${this.kebabCase(this.location.office.name)}`,
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

<style lang="scss" scoped></style>
