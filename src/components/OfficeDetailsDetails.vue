<template>
  <div id="office-details">
    <base-label class="mt-1">Typologies</base-label>
    <office-details-typologies :office="office" :edit="edit" />

    <base-label for="office-size" class="mt-1">Size</base-label>
    <office-details-size :office="office" :edit="edit" />

    <base-label class="mt-1">Founded</base-label>
    <office-details-year :office="office" :edit="edit" />
  </div>
</template>

<script>
import OfficeDetailsTypologies from '../components/OfficeDetailsTypologies.vue';
import OfficeDetailsSize from '../components/OfficeDetailsSize.vue';
import OfficeDetailsYear from '../components/OfficeDetailsYear.vue';
export default {
  name: 'OfficeDetailsDetails',
  components: {
    OfficeDetailsYear,
    OfficeDetailsSize,
    OfficeDetailsTypologies,
  },
  props: {
    office: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#office-details {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
  align-items: start;
  align-content: start;
}
</style>
