<template>
  <header>
    <h1 class="font-bold text-base text-gray-800 mb-1 w-full">
      <router-link :to="officeDetailsLink" class="link" @click.native="selectLocation">
        {{ location.office.name }}
      </router-link>
      <span v-if="location.office.yearFounded" class="ml-4 font-normal text-gray-400 italic">
        {{ location.office.yearFounded }}
      </span>
    </h1>
    <div class="flex items-center mb-1">
      <div class="text-sm text-gray-600">
        <a
          v-if="location.office.website"
          class="link"
          :href="location.office.website"
          target="_blank"
          >{{ formatUrl(location.office.website) }}</a
        >
      </div>
      <div v-if="location.office.officeSocialNetworks.totalCount > 0" class="flex items-center">
        <span class="mx-4 text-gray-500">|</span>
        <ul v-if="location.office.officeSocialNetworks.totalCount > 0" class="flex items-center">
          <li
            v-for="network in location.office.officeSocialNetworks.nodes"
            :key="network.id"
            class="mr-2"
          >
            <social-link :link="network" />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import formatUrl from '@/mixins/formatUrl';
import kebabCase from '@/mixins/kebabCase';
import SocialLink from './SocialLink';
export default {
  name: 'OfficeListItemHeader',
  mixins: [formatUrl, kebabCase],
  components: { SocialLink },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(this.location.city.countryByCountryIsocode.iso)}/${this.kebabCase(
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
