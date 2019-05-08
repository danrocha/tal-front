<template>
  <apollo-query :query="require('../graphql/Cities.gql')">
    <template slot-scope="{ result: { loading, error, data } }">
      <h3 class="mb-4">Cities</h3>
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <admin-cities-list :cities="data.cities" />
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </apollo-query>
</template>

<script>
import AdminCitiesList from './AdminCitiesList.vue';
export default {
  name: 'AdminCities',
  components: {
    AdminCitiesList,
  },
};
</script>
