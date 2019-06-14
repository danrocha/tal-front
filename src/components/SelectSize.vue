<template>
  <apollo-query
    :query="
      gql => gql`
        query sizes {
          sizes(orderBy: [ORDER_ASC]) {
            nodes {
              id
              nameShort
              nameLong
              description
            }
          }
        }
      `
    "
    :update="data => formatSizes(data)"
  >
    <template slot-scope="{ result: { data }, isLoading }">
      <div v-if="isLoading">
        <spinner/>
      </div>
      <div v-else-if="options">
        <ul>
          <li v-for="size in options" :key="size.id" class="flex items-center mb-1">
            <input type="radio" name="size" class="mr-2" :value="size.id" @input="updateValue">
            {{ size.nameShort }} ({{ size.description }})
          </li>
        </ul>
      </div>
      <div v-else>error</div>
    </template>
  </apollo-query>
</template>

<script>
import Spinner from './Spinner';
export default {
  components: { Spinner },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    originalSizeId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      value: '',
      loading: true,
      options: null,
    };
  },
  methods: {
    formatSizes(data) {
      //console.log(data);
      this.options = data.sizes.nodes.map(size => {
        return {
          ...size,
          label: `${size.nameShort} (${size.description})`,
        };
      });
      if (this.originalSizeId) {
        this.value = this.options.find(option => {
          return option.id === this.originalSizeId;
        });
      }
    },

    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
  watch: {
    originalSizeId(newValue) {
      if (newValue) {
        return (this.value = this.options.find(option => {
          return option.id === newValue;
        }));
      }

      this.value = '';
    },
  },
};
</script>

<style></style>
