<template>
  <div v-if="loading">...</div>
  <div v-else>
    <base-label for="select-size">Size</base-label>
    <multiselect
      id="select-size"
      v-model="value"
      :searchable="false"
      :close-on-select="true"
      :show-labels="false"
      :options="options"
      track-by="id"
      label="label"
      placeholder="Select..."
      @input="updateValue"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import SIZES from '@/graphql/Sizes.gql';

export default {
  components: {
    Multiselect,
  },
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
  apollo: {
    sizes: {
      query: SIZES,
      result({ data }) {
        this.loading = false;
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
    },
  },
  methods: {
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
