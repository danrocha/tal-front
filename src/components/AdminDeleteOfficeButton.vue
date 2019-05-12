<template>
  <apollo-mutation
    :mutation="
      gql => gql`
        mutation deleteOfficeById($input: DeleteOfficeByIdInput!) {
          deleteOfficeById(input: $input) {
            deletedOfficeId
          }
        }
      `
    "
    :variables="{ input: { id } }"
    :refetchQueries="() => [{ query: require('../graphql/Offices.gql') }]"
    @error="onError"
  >
    <template v-slot="{ mutate, loading }">
      <base-button :disabled="loading" @click="mutate()">Delete?</base-button>
    </template>
  </apollo-mutation>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AdminDeleteOfficeButton',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(['notification/add']),
    onError() {
      this['notification/add']({
        type: 'error',
        message: 'Ops, error! Try again...',
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
