<template>
  <apollo-query
    :query="
      gql => gql`
        {
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
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">
        <spinner />
      </div>
      <div v-else-if="options">
        <ul>
          <li v-for="size in options" :key="size.id" class="flex items-center mb-1">
            <input type="radio" class="mr-2" />
            {{ size.nameShort }} ({{ size.description }})
          </li>
        </ul>
      </div>
      <div v-else>error</div>
    </template>
  </apollo-query>
</template>

<script>
export default {
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

    updateValue() {
      this.$emit('input', this.value.id);
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
