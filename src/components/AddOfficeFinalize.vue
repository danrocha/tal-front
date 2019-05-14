<template>
  <div>
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#f2d024" />
    <p>{{ step }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { HollowDotsSpinner } from 'epic-spinners';
import kebabCase from '@/mixins/kebabCase';
import formatUrl from '@/mixins/formatUrl';

export default {
  name: 'AddOfficeFinalize',
  mixins: [kebabCase, formatUrl],
  components: { HollowDotsSpinner },
  data() {
    return {
      step: 'Finalizing...',
      location: this.$store.state.location.selectedLocation,
    };
  },
  async mounted() {
    console.log('MOUNTED');
    console.log(this.location);
    if (!this.location.office.logoUrl) {
      this.step = "Trying to get the office's logo...";
      await this.fetchLogo();
    }
    /* if (!this.location.office.brandfetch) {
      this.step = 'Trying to get more info about the office...';
      await this.fetchExtraInfo();
    } */
    this.step = 'Done! Redirecting...';
    console.log('redirect to:', this.officeDetailsLink());
    this.$router.push(this.officeDetailsLink());
  },
  computed: {
    ...mapState({
      city: state => state.add.city,
      user: state => state.user.user,
      selectedLocation: state => state.location.selectedLocation,
    }),
  },
  methods: {
    ...mapActions(['location/setLocation']),
    async fetchLogo() {
      const url = `https://logo.clearbit.com/${this.formatUrl(this.location.office.website)}`;
      try {
        await axios({
          method: 'get',
          url,
        });
        this.saveLogo(url);
      } catch (err) {
        console.error('Error in fetchLogo()!');
        console.error(err);
        //this.saveLogo('default');
      }
    },
    async saveLogo(logoUrl) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: require('../graphql/UpdateOfficeById.gql'),
          variables: {
            input: {
              id: this.location.office.id,
              patch: {
                logoUrl,
              },
            },
          },
        });
        await this.updateOffice(data.updateOfficeById.office);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchExtraInfo() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `https://company.clearbit.com/v2/companies/find?domain=${this.formatUrl(
            this.location.office.website
          )}`,
          headers: {
            Authorization: 'Bearer sk_0db9b163f6c520c98de0b50b4a4a375c',
          },
        });
        if (data.hasOwnProperty('error')) {
          throw Error('Not Found!');
        }
        await this.saveExtraInfo(data);
      } catch (error) {
        console.error(error);
      }
    },
    async saveExtraInfo(data) {
      const { description, foundedYear } = data;
      let patch = {
        brandfetch: true,
      };
      if (description) {
        patch = { ...patch, description };
      }
      if (foundedYear) {
        patch = { ...patch, foundedYear };
      }
      const id = this.location.office.id;
      try {
        const { data } = await this.$apollo.mutate({
          mutation: require('../graphql/UpdateOfficeById.gql'),
          variables: {
            input: {
              id,
              patch,
            },
          },
        });
        await this.updateOffice(data.updateOfficeById.office);
      } catch (err) {
        console.error(err);
      }
    },
    officeDetailsLink() {
      return `/${this.kebabCase(this.location.city.countryByCountryIsocode.iso)}/${this.kebabCase(
        this.location.city.name
      )}/${this.location.id}/${this.kebabCase(this.location.office.name)}`;
    },
    async updateOffice(updatedOffice) {
      try {
        this.location.office = updatedOffice;
        await this['location/setLocation'](this.location);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
