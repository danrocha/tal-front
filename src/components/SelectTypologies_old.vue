<template>
  <div v-if="loading">...</div>
  <div v-else>
    <multiselect
      v-model="value"
      :options="typologies.nodes"
      :multiple="true"
      label="name"
      track-by="id"
      placeholder="Select..."
      selectLabel="Select"
      deselectLabel="Remove"
      :clearOnSelect="false"
      @input="updateValue"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import TYPOLOGIES from '@/graphql/Typologies.gql';

export default {
  components: {
    Multiselect,
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
    };
  },
  apollo: {
    typologies: {
      query: TYPOLOGIES,
      result(data) {
        this.loading = data.loading;
      },
    },
  },
  methods: {
    updateValue() {
      this.$emit('input', this.value);
    },
  },
  watch: {
    originalTypologies() {
      this.value = this.originalTypologies;
    },
  },
};
</script>

<style></style>
