<template>
  <div>
    <office-logo :name="office.name" :logo-url="office.logoUrl" />
    <base-button v-if="office.website" @click="fetchLogo" class="ml-2">get logo</base-button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import formatUrl from '../mixins/formatUrl';

import OfficeLogo from '../components/OfficeLogo.vue';
export default {
  name: 'AdminOfficeLogo',
  mixins: [formatUrl],
  props: {
    office: {
      type: Object,
      required: true,
    },
  },
  components: {
    OfficeLogo,
  },
  data() {
    return {
      logo: '',
    };
  },
  methods: {
    ...mapActions(['notification/add']),
    fetchLogo() {
      axios({
        method: 'get',
        url: `https://logo.clearbit.com/${this.formatUrl(this.office.website)}`,
      })
        .then(result => {
          console.log(result);
          //this.logo = URL.createObjectURL(result.data);
          this.saveLogo(`https://logo.clearbit.com/${this.formatUrl(this.office.website)}`);
        })
        .catch(() => {
          this['notification/add']({
            type: 'error',
            message: 'No logo found',
          });
          //this.saveLogo('default')
        });
    },
    saveLogo(logoUrl) {
      this.$apollo
        .mutate({
          mutation: require('../graphql/UpdateOfficeById.gql'),
          variables: {
            input: {
              id: this.office.id,
              patch: {
                logoUrl,
              },
            },
          },
          refetchQueries: [
            {
              query: require('../graphql/Offices.gql'),
            },
          ],
        })
        .then(() => {
          this['notification/add']({
            type: 'success',
            message: 'Office Logo updated!',
          });
        })
        .catch(() => {
          this['notification/add']({
            type: 'error',
            message: 'There was an error saving to the DB!',
          });
        });
    },
    deleteLogo() {
      console.log('delete');
    },
  },
};
</script>

<style lang="scss" scoped></style>
