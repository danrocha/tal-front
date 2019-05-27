<template>
  <ul class="cities-grid mt-8">
    <city-list-item v-for="city in cities" :key="city.id" :city="city" />
  </ul>
</template>

<script>
import CityListItem from '../components/CityListItem.vue';
export default {
  name: 'CityList',
  components: { CityListItem },
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-auto-flow: row;
}
</style>
