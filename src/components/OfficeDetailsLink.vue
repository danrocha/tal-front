<template>
  <router-link :to="officeDetailsLink()" class="link" tag="a" @click.native="setLocation">
    <slot/>
  </router-link>
</template>

<script>
import kebabCase from '../mixins/kebabCase.js';
import { mapActions } from 'vuex';
export default {
  mixins: [kebabCase],
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['location/setLocation']),
    setLocation() {
      this['location/setLocation'](this.location);
    },
    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(
          this.location.city.countryByCountryIsocode.iso
        )}/${this.kebabCase(this.location.city.name)}/${
          this.location.id
        }/${this.kebabCase(this.location.office.name)}`,
      };
    },
  },
};
</script>
