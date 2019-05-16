<template>
  <router-link :to="officeDetailsLink()" class="link" tag="a">
    <slot />
  </router-link>
</template>

<script>
import kebabCase from '../mixins/kebabCase.js';
export default {
  mixins: [kebabCase],
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  methods: {
    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(this.location.city.countryByCountryIsocode.iso)}/${this.kebabCase(
          this.location.city.name
        )}/${this.location.id}/${this.kebabCase(this.location.office.name)}`,
      };
    },
  },
};
</script>
