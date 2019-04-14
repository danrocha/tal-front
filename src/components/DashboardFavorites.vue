<template>
  <div>
    <h3 class="mb-8">Favorites</h3>
    <apollo-query :query="require('../graphql/UserFavorites.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">
          <vcl-list />
        </div>
        <div v-if="error">
          Oops, there was an error try to reach the TAL brains! Care to reload this page and try
          again?
        </div>
        <div v-if="data && data.userFavorites.totalCount > 0">
          <p class="mb-8">
            You have {{ data.userFavorites.totalCount }}
            <span v-if="data.userFavorites.totalCount > 0">offices</span>
            <span v-else>office</span> saved:
          </p>
          <ul>
            <li
              v-for="favorite in data.userFavorites.nodes"
              :key="favorite.id"
              class="flex mb-4 justify-between items-start"
            >
              <div class="flex">
                <favorite-control :location="favorite.location" class="mr-4" />
                <office-list-item-header :location="favorite.location" class="mr-4" />
              </div>
              <div class="flex items-center">
                <span v-if="favorite.location.office.yearFounded" class="text-sm text-gray-500 mr-2"
                  >Est. {{ favorite.location.office.yearFounded }}</span
                >
                <office-list-item-size :location="favorite.location" />
                <office-list-item-typologies :location="favorite.location" />
                <div class="mr-2">
                  <span class="text-sm text-gray-700">{{ favorite.location.city.name }}</span>
                  &nbsp;
                  <span class="uppercase text-sm text-gray-500">{{
                    favorite.location.city.countryByCountryIsocode.iso
                  }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          You still didn't save any favorites! You can do so by clicking on the little
          <font-awesome-icon icon="heart" class="text-yellow-500"></font-awesome-icon>&nbsp;next to
          each office name.
        </div>
      </template>
    </apollo-query>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import OfficeListItemHeader from '@/components/OfficeListItemHeader.vue';
import OfficeListItemSize from '@/components/OfficeListItemSize.vue';
import OfficeListItemTypologies from '@/components/OfficeListItemTypologies.vue';
import FavoriteControl from '@/components/FavoriteControl.vue';

export default {
  name: 'DashboardFavorites',
  components: {
    VclList,
    FavoriteControl,
    OfficeListItemHeader,
    OfficeListItemSize,
    OfficeListItemTypologies,
  },
};
</script>

<style lang="scss" scoped></style>
