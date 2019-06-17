<template>
  <ApolloMutation
    :mutation="require('@/graphql/EditOffice.gql')"
    :variables="{ input: { ...variables } }"
    @done="onDone"
    :refetchQueries="[
      { query: require('@/graphql/LocationById.gql'), variables: { id: variables.id } },
    ]"
  >
    <template slot-scope="{ mutate, loading, error }">
      <base-button @click="mutate()" :disabled="disableSave || loading">Save</base-button>
      <p v-if="error">An error occured: {{ error }}</p>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  name: 'OfficeDetailsEditSaveButton',
  props: {
    variables: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mutationVariables: null,
    };
  },
  computed: {
    disableSave() {
      return this.isEmpty(this.variables);
    },
  },
  methods: {
    clean(obj) {
      for (const propName in obj) {
        if (typeof obj[propName] === 'object') {
          if (this.isEmpty(obj[propName])) {
            delete obj[propName];
          }
        } else if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
          delete obj[propName];
        }
      }
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    onDone() {
      this.$emit('done');
    },
  },
};
</script>

<style lang="scss" scoped></style>
