<template>
  <div >
    <div  v-if="!office.logoUrl || office.logoUrl === 'default'" class="flex items-center ">
      <office-logo-temporary :name="office.name"/>
      <p v-if="office.logoUrl === 'default'" class="text-xs ml-2 text-gray-500">using default logo</p>
      <base-button v-if="office.logoUrl !== 'default' && office.website" @click="fetchLogo" class="ml-2">get logo</base-button>
    </div>
    <div v-else class="flex  items-center ">
      <img :src="office.logoUrl" class="w-24 h-24 rounded-full">
      <base-button @click="deleteLogo" class="ml-2">delete logo</base-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import formatUrl from '../mixins/formatUrl';


import OfficeLogoTemporary from '../components/OfficeLogoTemporary.vue';
export default {
  name: 'AdminOfficeLogo',
  mixins:[formatUrl],
  props: {
    office: {
      type: Object,
      required: true,
    },
  },
  components: {
    OfficeLogoTemporary,
  },
  data() {
    return {
      logo: ''
    }
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
          this.saveLogo('default')
        });
    },
    saveLogo(logoUrl) {
      this.$apollo.mutate({
        mutation: require('../graphql/UpdateOfficeById.gql'),
        variables: {
          input: {
            id: this.office.id,
            patch: {
              logoUrl
            }
          }
        },
        refetchQueries: [
          {
            query: require('../graphql/Offices.gql')
          }]
      }).then(() => {
          this['notification/add']({
            type: 'success',
            message: 'Office Logo updated!',
          });
      }).catch(()=> {
        this['notification/add']({
            type: 'error',
            message: 'There was an error saving to the DB!',
          });
      })
    },
    deleteLogo() {
      console.log('delete')
    }
  },
};
</script>

<style lang="scss" scoped></style>
