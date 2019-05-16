<template>
  <apollo-query
    :query="require('../graphql/Locations.gql')"
    :variables="{
      first: limit,
      orderBy: ['CREATED_AT_DESC'],
    }"
  >
    <template slot-scope="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">
        <spinner />
      </div>
      <div v-if="data" class="flex">
        <div
          v-for="location in data.locations.nodes"
          :key="location.id"
          class="w-1/3 p-2 mr-2 border-r border-gray-300"
        >
          <div class="flex items-start">
            <office-logo
              :name="location.office.name"
              size="sm"
              :logo-url="location.office.logoUrl"
            />
            <div class="ml-2">
              <office-details-link :location="location">
                <h4 class="font-bold">{{ location.office.name }}</h4>
              </office-details-link>
              <p v-if="location.office.website" class="text-sm">
                {{ formatUrl(location.office.website) }}
              </p>
              <p class="text-sm text-gray-500">
                {{ location.city.name }}, {{ location.city.countryByCountryIsocode.iso }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </apollo-query>
</template>

<script>
import Spinner from './Spinner.vue';
import OfficeLogo from './OfficeLogo.vue';
import formatUrl from '../mixins/formatUrl.js';
import OfficeDetailsLink from './OfficeDetailsLink.vue';
export default {
  name: 'RecentlyAddedLocations',
  mixins: [formatUrl],
  components: { Spinner, OfficeLogo, OfficeDetailsLink },
  props: {
    limit: {
      type: Number,
      default: 3,
    },
  },
};
</script>

<style lang="scss" scoped></style>
