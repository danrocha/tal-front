<template>
  <apollo-query
    :query="
      gql => gql`
        query typologies {
          typologies(orderBy: [NAME_ASC]) {
            totalCount
            nodes {
              ...TypologyDetail
            }
          }
        }
        ${$options.fragments.TypologyDetail}
      `
    "
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">
        <spinner />
      </div>
      <div v-else-if="data">
        <ul class="flex flex-wrap">
          <li
            v-for="typology in data.typologies.nodes"
            :key="typology.id"
            class="w-1/2 flex items-center mb-1"
          >
            <input
              type="checkbox"
              :id="typology.name"
              :value="typology.id"
              class="mr-2 mb-1"
              v-model="checkedTypologies"
            />
            <label :for="typology.name">{{ typology.name }}</label>
          </li>
        </ul>
      </div>
      <div v-else>error</div>
    </template>
  </apollo-query>
</template>

<script>
import gql from 'graphql-tag';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'SelectTypologies',
  components: {
    Spinner,
  },
  props: {
    originalTypologies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: '',
      loading: true,
      checkedTypologies: [],
    };
  },
  fragments: {
    TypologyDetail: gql`
      fragment TypologyDetail on Typology {
        id
        name
        description
      }
    `,
  },
  watch: {
    originalTypologies() {
      this.value = this.originalTypologies;
    },
    checkedTypologies() {
      this.$emit('input', this.checkedTypologies);
    },
  },
};
</script>

<style></style>
