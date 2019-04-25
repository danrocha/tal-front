<template>
  <div class="pt-8 container mx-auto md:w-2/3 lg:w-1/2 md:mr-6 md:ml-56">
    <h2>Add Office</h2>
    <div class="mt-8">
      <add-office-1-city/>
      <add-office-2-details/>
      <add-office-3-review @save="addNewOffice" :is-loading="isLoading"/>
    </div>
  </div>
</template>

<script>
import AddOffice3Review from '@/components/AddOffice/AddOffice3Review.vue';
import AddOffice2Details from '@/components/AddOffice/AddOffice2Details.vue';
import AddOffice1City from '@/components/AddOffice/AddOffice1City.vue';
import kebabCase from '@/mixins/kebabCase';
import { mapState, mapActions } from 'vuex';
const ADD_OFFICE_MUTATION = require('@/graphql/AddOfficeMutation.gql');
const LOCATIONS = require('@/graphql/Locations.gql');
import CITIES from '@/graphql/Cities.gql';

export default {
  name: 'AddOffice',
  mixins: [kebabCase],
  components: {
    AddOffice1City,
    AddOffice2Details,
    AddOffice3Review,
  },
  data() {
    return {
      isLoading: false,
      locations: null,
    };
  },
  beforeMount() {
    const API_KEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&language=en`;
    document.head.append(script);
  },
  created() {
    if (!this.$store.state.user.user) {
      return this.$router.push({
        name: 'auth',
        params: { message: 'You need to log in to add an office.' },
      });
    }
  },
  computed: {
    mutationVariables() {
      if (this.addOffice.officeDetails) {
        let country = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('country');
          }
        );
        let city = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('locality');
          }
        );
        let region = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('administrative_area_level_1');
          }
        );
        let streetNumber = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('street_number');
          }
        );
        let route = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('route');
          }
        );
        let postalCode = this.addOffice.officeDetails.address_components.find(
          component => {
            return component.types.includes('postal_code');
          }
        );
        return {
          name: this.addOffice.officeDetails.name,
          website: this.addOffice.officeDetails.website,
          countryName: country.long_name,
          countryCode: country.short_name,
          regionName: region ? region.long_name : null,
          regionCode: region ? region.short_name : null,
          city: this.sameCities ? this.addOffice.city : null,
          cityName: this.sameCities ? this.addOffice.city.name : city.long_name,
          cityGeonameId: this.sameCities ? this.addOffice.city.geonameId : null,
          route: route ? route.long_name : null,
          streetNumber: streetNumber ? streetNumber.long_name : null,
          postalCode: postalCode ? postalCode.long_name : null,
          lat: this.addOffice.officeDetails.geometry.location.lat(),
          lng: this.addOffice.officeDetails.geometry.location.lng(),
          formattedAddress: this.addOffice.officeDetails.formatted_address,
          addressComponents: JSON.stringify(
            this.addOffice.officeDetails.address_components
          ),
          internationalPhoneNumber: this.addOffice.officeDetails
            .international_phone_number,
          googlePlaceId: this.addOffice.officeDetails.place_id,
        };
      }
      return {};
    },
    ...mapState({
      addOffice: state => state.addOffice,
      user: state => state.user.user,
      selectedLocation: state => state.location.selectedLocation,
    }),
  },
  methods: {
    ...mapActions([
      'resetAddOffice',
      'resetAddOfficeOfficeDetails',
      'setItemsPerPage',
      'location/setLocation',
    ]),
    addNewOffice() {
      this.isLoading = true;
      // We save the user input in case of an error
      const newOffice = this.mutationVariables;
      this.$apollo
        .mutate({
          // Query
          mutation: ADD_OFFICE_MUTATION,
          // Parameters
          variables: newOffice,
          refetchQueries: [
            {
              query: CITIES,
              variables: {
                orderBy: 'COUNTRY_ISOCODE_ASC',
              },
            },
          ],
          awaitRefetchQueries: true,
          ignoreResults: false,
        })
        .then(({ data: { addOffice } }) => {
          this['location/setLocation'](addOffice.location);

          // Result
          this.$store.dispatch('notification/add', {
            type: 'success',
            message: 'Office location added successfully!',
          });

          this.isLoading = false;
          this.done();
        })
        .catch(error => {
          // Error
          this.isLoading = false;
          this.$store.dispatch('notification/add', {
            type: 'error',
            message:
              'There was a problem adding this location: ' + error.message,
          });
          // We restore the initial user input
          //this.newTag = newTag;
        });
    },

    done() {
      this.resetAddOffice();
      this.$router.push(this.officeDetailsLink());
    },
    officeDetailsLink() {
      return `/${this.kebabCase(
        this.selectedLocation.countryByCountryIsocode.iso
      )}/${this.kebabCase(this.selectedLocation.city.name)}/${
        this.selectedLocation.id
      }/${this.kebabCase(this.selectedLocation.office.name)}`;
    },
  },
  watch: {
    user() {
      if (!this.user) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
