<template>
  <ApolloQuery :query="require('../graphql/Countries.gql')" :variables="countries">
    <template slot-scope="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data">
        <el-select
          v-model="selectedCountry"
          :loading="loading"
          filterable
          placeholder="Select country"
          value-key="isocode"
          @change="selectCountry"
        >
          <el-option
            v-for="country in data.countries.nodes"
            :key="country.isocode"
            :label="country.name"
            :value="country"
          />
        </el-select>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: 'SelectCountry',
  data() {
    return {
      countries: undefined,
      selectedCountry: null,
    };
  },
  methods: {
    selectCountry(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style></style>
