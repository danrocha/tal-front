<template>
  <div class="pl-10">
    <vue-headful :title="`Add Office - TAL`"/>
    <base-label for="select-city">City name</base-label>
    <multiselect
      @search-change="fetchResults"
      v-model="city"
      label="title"
      track-by="id"
      placeholder="Type to search..."
      open-direction="bottom"
      :options="results"
      :multiple="false"
      :searchable="true"
      :loading="loading"
      :close-on-select="true"
      :options-limit="5"
    />
  </div>
</template>

<script>
import halfred from 'halfred';
import assign from 'core-js/library/fn/object/assign';
import Multiselect from 'vue-multiselect';
import { mapActions } from 'vuex';

export default {
  name: 'SelectCity',
  components: {
    Multiselect,
  },
  data() {
    return {
      country: '',
      city: undefined,
      req: undefined,
      results: [],
      loading: false,
      maxItems: 25,
      apiRoot: 'https://api.teleport.org/api',
      apiVersion: 1,
      embeds:
        'city:country,city:admin1_division,city:timezone/tz:offsets-now,city:urban_area',
      cache: {},
      error: undefined,
      selected: false,
    };
  },

  methods: {
    fetchResults(queryString, cb = function noop() {}) {
      this.loading = true;
      this.query = queryString;
      // Cancel old request
      if (this.req) this.req.abort();

      const cached = this.cache[this.query];
      if (cached) {
        this.results = cached;
        return cb(this.results);
      }

      this.req = this.getCities(results => {
        this.loading = false;
        this.results = this.cache[this.query] = results;
        cb(this.results);
      });
    },
    getCities(cb) {
      if (!this.query) return cb([]);
      const embed = `city:search-results/city:item/${
        this.embeds ? `{${this.embeds}}` : ''
      }`;

      const req = new XMLHttpRequest();
      const query = encodeURIComponent(this.query);
      req.open(
        'GET',
        `${this.apiRoot}/cities/?search=${query}&embed=${embed}&limit=${
          this.maxItems
        }`
      );
      req.setRequestHeader(
        'Accept',
        `application/vnd.teleport.v${this.apiVersion}+json`
      );
      req.addEventListener('load', () => {
        const results = halfred
          .parse(JSON.parse(req.response))
          .embeddedArray('city:search-results')
          .map(res => this.parseCity(res));

        cb(results);
      });
      req.send();

      return req;
    },
    parseCity(res) {
      const city =
        res.embedded('location:nearest-city') || res.embedded('city:item');
      city.country = city.embedded('city:country');
      city.admin1_division = city.embedded('city:admin1_division');
      city.timezone = city.embedded('city:timezone');
      city.urban_area = city.embedded('city:urban_area');

      const {
        full_name: fullName,
        name,
        geoname_id: geonameId,
        population,
        location: {
          latlon: { latitude, longitude },
        },
      } = city;

      const { matching_full_name: title = fullName } = res;

      const result = {
        title,
        name,
        geonameId,
        latitude,
        longitude,
        population,
      };

      if (city.country) assign(result, { country: city.country.name });
      if (city.admin1_division) {
        const {
          name: admin1Division,
          geonames_admin1_code: admin1DivisionCode,
        } = city.admin1_division;
        assign(result, { admin1Division, admin1DivisionCode });
      }

      if (city.timezone) {
        const tzNow = city.timezone.embedded('tz:offsets-now');
        assign(result, { tzOffsetMinutes: tzNow.total_offset_min });
      }

      if (city.urban_area) {
        const {
          slug: uaSlug,
          name: uaName,
          ua_id: uaId,
          teleport_city_url: uaCityUrl,
        } = city.urban_area;
        assign(result, { uaName, uaId, uaCityUrl, uaSlug });
      }
      console.groupEnd();
      return result;
    },

    clear() {
      this.resetAddOffice();
      this.city = '';
    },
    next() {
      this.setAddOfficeCity(this.city);
      this.addOfficeNextStep();
    },
    ...mapActions(['setAddOfficeCity', 'addOfficeNextStep', 'resetAddOffice']),
  },
  watch: {
    city() {
      this.loading = false;
      this.next();
    },
  },
};
</script>

