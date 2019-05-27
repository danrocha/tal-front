<template>
  <multiselect
    v-model="value"
    :options="citiesSorted"
    :multiple="true"
    group-label="countryName"
    group-values="cities"
    :group-select="true"
    label="name"
    track-by="name"
    placeholder="Filter by cities"
    selectLabel="Select city"
    selectGroupLabel="Select country"
    deselectLabel="Remove city"
    deselectGroupLabel="Remove country"
    :disabled="isDisabled"
  />
</template>

<script>
import Multiselect from 'vue-multiselect';
const groupBy = require('lodash.groupby');
const _map = require('lodash.map');
import { mapActions, mapState } from 'vuex';
import CITIES from '../graphql/Cities.gql';

export default {
  name: 'OfficeListCityFilter',
  components: { Multiselect },

  data() {
    return {
      value: [],
      isDisabled: this.allCities,
    };
  },
  methods: {
    ...mapActions(['setCityFilter']),
  },
  apollo: {
    cities: {
      query: CITIES,
      variables: {
        orderBy: 'COUNTRY_ISOCODE_ASC',
      },
    },
  },
  computed: {
    ...mapState(['filterCity']),
    citiesSorted() {
      if (!this.cities) {
        return [];
      }
      return _map(groupBy(this.cities.nodes, 'countryIsocode')).map(countryGroup => {
        return {
          countryName: countryGroup[0].countryByCountryIsocode.name,
          countryIso: countryGroup[0].countryIsocode,
          cities: countryGroup,
        };
      });
    },
  },
  watch: {
    cities() {
      if (this.$route.params.city_name) {
        // get city details from cities
        const city = this.cities.nodes.find(
          city =>
            city.name.toLowerCase() === this.$route.params.city_name.toLowerCase() &&
            city.countryByCountryIsocode.iso.toLowerCase() ===
              this.$route.params.country_iso.toLowerCase()
        );
        if (city) {
          this.value = city;
          //this.setCityFilter(city);
        }
      }
    },
    value: function(value) {
      //console.log('select city:', value);
      this.setCityFilter(value);
    },
    filterCity(value) {
      this.value = value;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect,
.multiselect__input:-ms-input-placeholder,
.multiselect__input::placeholder {
  @apply text-gray-600;
}
.multiselect__input:hover,
.multiselect__single:hover {
  @apply border-gray-400;
}
.multiselect__input:focus,
.multiselect__single:focus {
  @apply border-gray-400;
}
span.multiselect__tag {
  @apply text-gray-900;
  @apply bg-yellow-500;
}
i.multiselect__tag-icon::after {
  @apply text-yellow-800;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  @apply bg-yellow-500;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  @apply text-white;
}
.multiselect__option--highlight {
  @apply bg-yellow-500;
  @apply text-gray-900;
}

.multiselect__option--highlight:after {
  @apply bg-yellow-500;
  @apply text-gray-900;
}

.multiselect__option--selected {
  @apply text-gray-900;
  @apply bg-gray-300;
  @apply font-bold;
}
</style>
