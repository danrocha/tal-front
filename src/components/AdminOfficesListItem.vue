<template>
  <div class="mb-8">
    <h4 class="font-bold mb-2">
      <span class="font-normal text-xs text-gray-400 mr-1">{{ office.id }}</span>
      {{ office.name }}
      <edit-link class="font-normal ml-2" @click="editOffice"/>
    </h4>
    <admin-office-logo :office="office"/>
    <table class="text-xs">
      <tr>
        <td class="uppercase text-gray-500">locations</td>
        <td>
          <p
            v-for="location in office.locations.nodes"
            :key="location.id"
          >{{ location.formattedAddress }}</p>
        </td>
      </tr>
      <tr>
        <td class="uppercase text-gray-500">Description</td>
        <td>{{ office.description || 'n/a' }}</td>
      </tr>
      <tr>
        <td class="uppercase text-gray-500">Est.</td>
        <td>{{ office.yearFounded || 'n/a' }}</td>
      </tr>
      <tr>
        <td class="uppercase text-gray-500">Web</td>
        <td>{{ office.website || 'n/a' }}</td>
      </tr>
      <tr v-for="network in office.officeSocialNetworks.nodes" :key="network.id">
        <td class="uppercase text-gray-500">
          <font-awesome-icon
            :icon="['fab', network.socialNetwork.name.toLowerCase()]"
            class="text-sm"
          ></font-awesome-icon>
        </td>
        <td>{{ network.handle }}</td>
      </tr>
    </table>

    <div class="text-xs mt-4">
      <p v-if="office.website && !office.brandfetch">
        <base-button @click="fetchInfo">Get more info...</base-button>
      </p>
      <p v-if="office.website && office.brandfetch">
        Already tried getting more info...
        <base-button @click="fetchInfo">try again</base-button>
      </p>
      <p v-if="!office.website">
        You need to add a website to get more info...
        <br>
        <base-button @click="editOffice">edit office</base-button>
      </p>
      <p class="text-right">
        <admin-delete-office-button type="secondary" :id="office.id"/>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

import kebabCase from '../mixins/kebabCase';
import formatUrl from '../mixins/formatUrl';
import EditLink from '../components/EditLink.vue';
import AdminDeleteOfficeButton from '../components/AdminDeleteOfficeButton.vue';
import AdminOfficeLogo from '../components/AdminOfficeLogo.vue';

import OFFICES from '../graphql/Offices.gql';

export default {
  name: 'AdminOfficesListItem',
  mixins: [kebabCase, formatUrl],
  components: { EditLink, AdminOfficeLogo, AdminDeleteOfficeButton },
  props: {
    office: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      logo: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['notification/add', 'location/setLocation']),
    editOffice() {
      this.$router.push(this.officeDetailsLink);
    },
    fetchInfo() {
      if (!this.office.website) return;
      axios({
        method: 'get',
        url: `https://company.clearbit.com/v2/companies/find?domain=${this.formatUrl(
          this.office.website
        )}`,
        headers: {
          Authorization: '',
        },
      })
        .then(({ data }) => {
          if (data.hasOwnProperty('error')) {
            return this['notification/add']({
              type: 'error',
              message: 'Oops, there was an error, try again!',
            });
          }
          this.updateOfficeDescription(data);
          //this.updateOfficeSocials(data);
          this.updateYearFounded(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateYearFounded(data) {
      if (this.office.yearFounded || !data.foundedYear) return;
      this.$apollo
        .mutate({
          mutation: require('../graphql/UpdateOfficeById.gql'),
          variables: {
            input: {
              id: this.office.id,
              patch: {

                yearFounded: data.foundedYear,
                brandfetch: true
              }
            },
          },
          update: (store, { data: { updateOffice } }) => {
            const data = store.readQuery({
              query: OFFICES,
            });
            let office = data.offices.nodes.find(office => {
              return office.id === this.office.id;
            });
            office = updateOffice.office;
            store.writeQuery({
              query: OFFICES,
              data,
            });
          },
        })
        .then(() => {
          this['notification/add']({
            type: 'success',
            message: 'Office Year updated!',
          });
        });
    },
    updateOfficeSocials(data) {
      const { facebook, linkedin, twitter } = data;
      const mutation = require('../graphql/CreateOfficeSocialNetwork.gql');
      const officeId = this.office.id;
      const update = (store, { data: { createOfficeSocialNetwork } }) => {
        const data = store.readQuery({
          query: OFFICES,
        });
        let office = data.offices.nodes.find(office => {
          return office.id === this.office.id;
        });
        office.officeSocialNetworks.nodes.push(
          createOfficeSocialNetwork.officeSocialNetwork
        );
        store.writeQuery({ query: OFFICES, data });
      };
      if (facebook && facebook.handle && !this.hasSocialNetwork('facebook')) {
        this.$apollo
          .mutate({
            mutation,
            variables: {
              input: {
                officeSocialNetwork: {
                  officeId,
                  handle: facebook.handle,
                  socialNetworkId: 3, //TODO: remove hard coded!
                },
              },
            },
            update,
          })
          .then(result => {
            console.log(result);
            this['notification/add']({
              type: 'success',
              message: 'Facebook info updated!',
            });
          });
      }
      if (twitter.handle && !this.hasSocialNetwork('twitter')) {
        this.$apollo
          .mutate({
            mutation,
            variables: {
              input: {
                officeSocialNetwork: {
                  officeId,
                  handle: twitter.handle,
                  socialNetworkId: 1, //TODO: remove hard coded!
                },
              },
            },
            update,
          })
          .then(result => {
            console.log(result);
            this['notification/add']({
              type: 'success',
              message: 'twitter info updated!',
            });
          });
      }
      if (linkedin.handle && !this.hasSocialNetwork('linkedin')) {
        this.$apollo
          .mutate({
            mutation,
            variables: {
              input: {
                officeSocialNetwork: {
                  officeId,
                  handle: linkedin.handle,
                  socialNetworkId: 5, //TODO: remove hard coded!
                },
              },
            },
            update,
          })
          .then(result => {
            console.log(result);
            this['notification/add']({
              type: 'success',
              message: 'linkedin info updated!',
            });
          });
      }
    },
    updateOfficeDescription(data) {
      const { description } = data;
      if (this.office.description || !description) return;
      console.log('Updating description: ', description);
      const id = this.office.id;
      this.$apollo
        .mutate({
          mutation: require('../graphql/UpdateOfficeById.gql'),
          variables: {
            input: {
              id,
              patch: {
                description,
                brandfetch: true,
              },
            },
          },
          update: (store, { data: { updateOffice } }) => {
            const data = store.readQuery({
              query: OFFICES,
            });
            let office = data.offices.nodes.find(office => {
              return office.id === this.office.id;
            });
            office.description = description;
            store.writeQuery({
              query: OFFICES,
              data,
            });
          },
        })
        .then(() => {
          this['notification/add']({
            type: 'success',
            message: 'Office description updated!',
          });
        });
    },

    hasSocialNetwork(network) {
      return this.office.officeSocialNetworks.nodes.find(node => {
        return node.socialNetwork.name.toLowerCase() === network;
      });
    },
  },
  computed: {
    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(
          this.office.locations.nodes[0].city.countryByCountryIsocode.iso
        )}/${this.kebabCase(this.office.locations.nodes[0].city.name)}/${
          this.office.locations.nodes[0].id
        }/${this.kebabCase(this.office.name)}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  @apply border border-gray-300 p-1;
}
</style>
