<template>
  <div>
    <add-office-1-city />
    <add-office-2-details />
    <add-office-3-review @save="addNewOffice" :is-loading="isLoading" />
  </div>
</template>

<script>
import AddOffice3Review from '@/components/AddOffice/AddOffice3Review.vue';
import AddOffice2Details from '@/components/AddOffice/AddOffice2Details.vue';
import AddOffice1City from '@/components/AddOffice/AddOffice1City.vue';
import kebabCase from '@/mixins/kebabCase';
import { mapState, mapActions, mapGetters } from 'vuex';
import CITIES from '@/graphql/Cities.gql';
import CURRENT_USER from '@/graphql/CurrentUser.gql';

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
      currentUser: '',
    };
  },
  computed: {
    ...mapState({
      officeDetails: state => state.add.officeDetails,
      city: state => state.add.city,
      user: state => state.user.user,
      selectedLocation: state => state.location.selectedLocation,
    }),
    ...mapGetters(['add/getAddressObject', 'add/sameCities']),
  },
  methods: {
    ...mapActions(['add/reset', 'location/setLocation']),
    mutationVariables() {
      if (!this.officeDetails) return null;
      const office_input = {
        iName: this.officeDetails.name,
        iWebsite: this.officeDetails.website,
      };
      const iCityCoordinates = {
        x: this.city.geometry.location.lat(),
        y: this.city.geometry.location.lng(),
      };
      const iLocationCoordinates = {
        x: this.officeDetails.geometry.location.lat(),
        y: this.officeDetails.geometry.location.lng(),
      };
      let {
        city: iCity,
        country: iCountry,
        route: iRoute,
        region: iRegion,
        postal_code: iPostalCode,
        street_number: iStreetNumber,
      } = this['add/getAddressObject']('officeDetails');
      // if same city, get city and country names from the city object
      if (this['add/sameCities']) {
        let { city, country } = this['add/getAddressObject']('city');
        // sometime the above operation returns null for city name
        // so check before changing the iCity and iCountry values
        iCity = city || iCity;
        iCountry = country || iCountry;
      }
      const location_input = {
        iCity,
        iCountry,
        iRegion,
        iPostalCode,
        iRoute,
        iStreetNumber,
        iCityCoordinates,
        iLocationCoordinates,
        iFormattedAddress: this.officeDetails.formatted_address,
        iInternationalPhoneNumber: this.officeDetails.international_phone_number,
        iAddressComponents: JSON.stringify(this.officeDetails.address_components),
      };
      return { ...office_input, ...location_input };
    },
    addNewOffice() {
      this.isLoading = true;
      // We save the user input in case of an error
      const input = this.mutationVariables();
      this.$apollo
        .mutate({
          // Query
          mutation: require('@/graphql/AddLocation.gql'),
          // Parameters
          variables: { input },
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
        .then(({ data: { addLocation } }) => {
          this['location/setLocation'](addLocation.location);
          console.log(addLocation.location);
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
            message: 'There was a problem adding this location: ' + error.message,
          });
          console.error(error);
        });
    },

    done() {
      this['add/reset']();
      this.$router.push({
        path: '/add/finalize',
      });
      //this.$router.push(this.officeDetailsLink());
    },
  },
  apollo: {
    currentUser: {
      query: CURRENT_USER,
      update: data => {
        if (!data.currentUser) {
          this.$router.push({
            name: 'auth',
            params: { message: 'You need to log in to add an office.' },
          });
        }
      },
    },
  },
};
</script>
