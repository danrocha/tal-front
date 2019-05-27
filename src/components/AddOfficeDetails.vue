<template>
  <div class="ml-10">
    <div v-show="!manual">
      <span class="inline-block w-full">
        <base-label for="office-name">Office name</base-label>
        <gmap-autocomplete
          id="office-name"
          autofocus
          :types="['establishment']"
          :options="{
            bounds: city.geometry.viewport,
            strictBounds: true,
          }"
          placeholder="Start typing..."
          :select-first-on-enter="true"
          class="input input-large"
          @place_changed="setDetails"
        ></gmap-autocomplete>
      </span>

      <p class="text-right mt-4">
        <a @click="toggleManual" href="#" class="no-underline text-gray-800 cursor-pointer">
          Can't find it? Add details manually
          <font-awesome-icon icon="arrow-right"></font-awesome-icon>
        </a>
      </p>
    </div>

    <div v-show="manual">
      <base-label for="office-name">Office Name</base-label>
      <base-input autofocus v-model="name" id="office-name" targetClass="input-large mb-4" />
      <div class="error" v-if="!$v.name.minLength">We need a name :)</div>
      <base-input
        label="Website - Optional"
        v-model="link"
        type="url"
        id="office-link"
        targetClass="input-large mb-4"
      />
      <div class="error" v-if="!$v.link.url">
        Don't forget the
        <strong>http://</strong>
      </div>
      <span class="inline-block w-full">
        <base-label for="office-name">Address</base-label>
        <gmap-autocomplete
          :types="['address']"
          :options="{
            bounds: city.geometry.viewport,
            strictBounds: true,
          }"
          placeholder="Start typing..."
          :select-first-on-enter="true"
          class="input input-large mb-4"
          @place_changed="setAddress"
        ></gmap-autocomplete>
      </span>
      <div class="flex items-center justify-end">
        <base-button
          aria-label="back to search"
          @click="toggleManual"
          base-type="secondary"
          class="mx-6"
          >back to search</base-button
        >
        <base-button
          aria-label="next"
          @click="onManualSubmit"
          base-type="primary"
          :disabled="formNotFilled"
          >Next</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
const { required, minLength, url } = require('vuelidate/lib/validators');
import formatUrl from '@/mixins/formatUrl';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddOfficeDetails',
  mixins: [formatUrl, validationMixin],
  data() {
    return {
      name: null,
      link: null,
      address: null,
      selectedAddress: null,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(1),
    },
    link: {
      url,
    },
    selectedAddress: {
      required,
    },
  },

  methods: {
    ...mapActions('add', ['setOfficeDetails', 'nextStep', 'toggleManual', 'resetOfficeDetails']),
    ...mapActions(['notification/add']),
    setDetails(details) {
      this.setOfficeDetails(details);
      this.nextStep();
    },
    setAddress(address) {
      this.selectedAddress = address;
    },
    onManualSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return this['notification/add']({
          type: 'error',
          message: 'There was an error in your form! Double check it and try again, please...',
        });
      } else {
        const officeDetails = {
          address_components: this.selectedAddress.address_components,
          formatted_address: this.selectedAddress.formatted_address,
          geometry: this.selectedAddress.geometry,
          name: this.name,
          website: this.link,
        };
        this.setOfficeDetails(officeDetails);
        this.toggleManual();
        this.nextStep();
      }
    },
    setFocus() {
      this.$refs.officeName.focus();
    },
    clear() {
      this.name = null;
      this.link = null;
      this.address = null;
      this.query = '';
      this.resetOfficeDetails();
    },
  },
  computed: {
    ...mapState({
      officeDetails: state => state.add.officeDetails,
      manual: state => state.add.manual,
      city: state => state.add.city,
    }),
    formNotFilled() {
      if (this.name && this.selectedAddress) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.error {
  @apply text-xs;
  @apply h-5;
  @apply -mt-2;
  @apply mb-1;
}
</style>
