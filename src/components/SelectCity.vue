<template>
  <div class="pl-10">
    <vue-headful :title="`Add Office - TAL`" />
    <base-label for="select-city">City name</base-label>
    <gmap-autocomplete
      id="select-city"
      autofocus
      :types="['(cities)']"
      placeholder="Start typing..."
      :select-first-on-enter="true"
      class="input input-large"
      @place_changed="setCity"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SelectCity',
  data() {
    return {
      city: undefined,
    };
  },
  methods: {
    ...mapActions(['add/setCity', 'add/nextStep', 'add/reset']),
    setCity(city) {
      this['add/setCity'](city);
      this['add/nextStep']();
    },
    clear() {
      this['add/reset']();
      this.city = '';
    },
  },
};
</script>
