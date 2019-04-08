<template>
  <div class="ml-10">
    <div v-show="!addOffice.manual">
      <span class="inline-block w-full">
        <base-label for="office-name">Office name</base-label>
        <input
          type="text"
          placeholder="Office Name..."
          v-model="query"
          id="office-name"
          ref="officeName"
          class="input input-large mt-1 -mr-6"
        >
        <span
          v-if="query"
          @click="clear"
          class="cursor-pointer text-yellow-800 font-bold"
          title="Clear"
        >&times;</span>
      </span>
      <div v-if="addOffice.officeDetails">
        <div class="flex items-center justify-end">
          <tal-button aria-label="clear" @click="clear" base-type="secondary" class="mx-6">Clear</tal-button>
          <tal-button aria-label="next" @click="nextStep" base-type="primary">Next</tal-button>
        </div>
      </div>

      <p class="text-right mt-4">
        <a
          @click="addOfficeToggleManual"
          href="#"
          class="no-underline text-gray-800 cursor-pointer"
        >
          Can't find it? Add details manually
          <font-awesome-icon icon="arrow-right"></font-awesome-icon>
        </a>
      </p>
    </div>

    <div v-show="addOffice.manual">
      <base-input
        label="Office Name"
        v-model="name"
        id="office-name"
        targetClass="input-large mb-4"
      />
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
      <base-input
        label="Address"
        v-model="address"
        id="office-address"
        targetClass="input-large mb-4"
      />
      <div class="flex items-center justify-end">
        <base-button
          aria-label="back to search"
          @click="addOfficeToggleManual"
          base-type="secondary"
          class="mx-6"
        >back to search</base-button>
        <base-button
          aria-label="next"
          @click="onManualSubmit"
          base-type="primary"
          :disabled="formNotFilled"
        >Next</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
const { required, minLength, url } = require('vuelidate/lib/validators');
import formatUrl from '@/mixins/formatUrl';
import { mapActions, mapState } from 'vuex';
import TalButton from '@/components/TalButton.vue';

export default {
  name: 'AddOfficeDetails',
  mixins: [formatUrl, validationMixin],
  components: {
    TalButton,
  },
  data() {
    return {
      name: null,
      link: null,
      address: null,
      query: '',
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
    address: {
      required,
    },
  },
  mounted() {
    /* eslint-disable-next-line*/
    let bounds = new google.maps.LatLngBounds();
    bounds.extend({
      lat: this.addOffice.city.latitude,
      lng: this.addOffice.city.longitude,
    });
    /* eslint-disable-next-line*/
    this.autocompleteEstablishment = new google.maps.places.Autocomplete(
      document.getElementById('office-name'),
      {
        types: ['establishment'],
        bounds,
      }
    );
    /* eslint-disable-next-line*/
    this.autocompleteAddress = new google.maps.places.Autocomplete(
      document.getElementById('office-address'),
      {
        types: ['address'],
        bounds,
      }
    );
    this.autocompleteEstablishment.addListener('place_changed', () => {
      this.setAddOfficeOfficeDetails(this.autocompleteEstablishment.getPlace());
      this.query = this.addOffice.officeDetails.name;
      this.addOfficeNextStep();
    });
    this.autocompleteAddress.addListener('place_changed', () => {
      this.selectedAddress = this.autocompleteAddress.getPlace();
      this.address = this.selectedAddress.formatted_address;
    });
    this.setFocus();
  },

  methods: {
    ...mapActions([
      'setAddOfficeOfficeDetails',
      'addOfficeNextStep',
      'addOfficeToggleManual',
      'resetAddOfficeOfficeDetails',
      'notification/add',
    ]),
    onManualSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return this['notification/add']({
          type: 'error',
          message:
            'There was an error in your form! Double check it and try again, please...',
        });
      } else {
        const officeDetails = {
          address_components: this.selectedAddress.address_components,
          formatted_address: this.selectedAddress.formatted_address,
          geometry: this.selectedAddress.geometry,
          name: this.name,
          website: this.link,
        };
        this.setAddOfficeOfficeDetails(officeDetails);
        this.addOfficeToggleManual();
        this.addOfficeNextStep();
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
      this.resetAddOfficeOfficeDetails();
    },

    nextStep() {
      this.addOfficeNextStep();
    },
  },
  computed: {
    ...mapState(['addOffice']),
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
