<template>
  <div>
    <p>There are currently, in the system:</p>
    <apollo-query
      :query="
        gql =>
          gql`
            {
              offices {
                totalCount
              }
            }
          `
      "
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="data">{{ data.offices.totalCount }} offices.</div>
      </template>
    </apollo-query>
    <apollo-query
      :query="
        gql =>
          gql`
            {
              cities {
                totalCount
              }
            }
          `
      "
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="data">{{ data.cities.totalCount }} cities.</div>
      </template>
    </apollo-query>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
};
</script>

<style lang="scss" scoped></style>
