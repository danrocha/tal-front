<template>
  <apollo-query :query="require('../graphql/Offices.gql')">
    <template slot-scope="{ result: { loading, error, data } }">
      <h3>Offices</h3>
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <admin-offices-list :offices="data.offices" />
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </apollo-query>
</template>

<script>
import AdminOfficesList from './AdminOfficesList.vue';
export default {
  name: 'AdminOffices',
  components: {
    AdminOfficesList,
  },
};
</script>
