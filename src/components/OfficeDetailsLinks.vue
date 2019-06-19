<template>
  <div v-if="!edit">
    <base-label>Links</base-label>
    <ul v-if="office.officeSocialNetworks.totalCount > 0">
      <li v-for="network in office.officeSocialNetworks.nodes" :key="network.id" class="mb-1">
        <p class="flex items-center">
          <font-awesome-icon
            :icon="network.socialNetwork.icon ? ['fab', network.socialNetwork.icon] : 'link'"
            class="text-yellow-500 mr-2"
          ></font-awesome-icon>

          <span class="text-gray-500 border-b-2 border-transparent mr-1">{{
            formatUrl(network.socialNetwork.handlePrefix)
          }}</span>
          <a
            :href="`${network.socialNetwork.handlePrefix}/${network.handle}`"
            class="link"
            target="_blank"
            >{{ formatUrl(network.handle) }}</a
          >
        </p>
      </li>
    </ul>
    <edit-link v-else>add links...</edit-link>
  </div>
  <div v-else>
    <base-label>Social Links</base-label>

    <apollo-query
      :query="require('../graphql/SocialNetworks.gql')"
      :update="data => updateLinksList(data)"
    >
      <template slot-scope="{ result: { data, error }, isLoading }">
        <div v-if="isLoading">
          <spinner />
        </div>
        <div v-else-if="data">
          <link-input
            v-for="network in data.socialNetworks.nodes"
            :key="network.id"
            :social-network-name="network.name"
            :handle-prefix="formatUrl(network.handlePrefix)"
            :icon="network.icon"
            v-model="links[network.id].handle"
            @input="updateValue"
          />
        </div>
      </template>
    </apollo-query>
  </div>
</template>

<script>
const groupBy = require('lodash.groupby');
import Spinner from './Spinner.vue';
import LinkInput from './LinkInput.vue';
import EditLink from './EditLink.vue';
import formatUrl from '@/mixins/formatUrl';

export default {
  name: 'OfficeDetailsLinks',
  mixins: [formatUrl],
  components: {
    Spinner,
    EditLink,
    LinkInput,
  },
  props: {
    office: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editLink: `${this.$route.path}/edit`,
      links: {},
    };
  },
  created() {
    if (this.hasSocial) {
      const links = groupBy(this.office.officeSocialNetworks.nodes, 'socialNetworkId');
      const keys = Object.keys(links);
      for (const key of keys) {
        this.links[key] = (({ id, handle, socialNetworkId }) => ({
          id,
          handle,
          socialNetworkId,
        }))(links[key][0]);
      }
    }
  },
  computed: {
    hasSocial() {
      return this.office.officeSocialNetworks.totalCount > 0;
    },
  },
  methods: {
    updateLinksList(data) {
      data.socialNetworks.nodes.map(node => {
        if (!this.links.hasOwnProperty(node.id)) {
          this.links[node.id] = {
            id: null,
            socialNetworkId: node.id,
            handle: null,
          };
        }
      });
      return data;
    },
    cleanLinks(links) {
      Object.keys(links).forEach(key => {
        if (!this.isModified(links[key])) {
          return delete links[key];
        }
        if (!links[key].handle) {
          return (links[key].handle = null);
        }
      });
    },
    isModified(linkEntry) {
      //if (!linkEntry.handle) return false;
      const originalValue = this.office.officeSocialNetworks.nodes.find(
        node => node.socialNetworkId === linkEntry.socialNetworkId
      );
      if (originalValue) {
        return originalValue.handle !== linkEntry.handle;
      }
      if (!linkEntry.handle) return false;
      return true;
    },
    updateValue() {
      let editedLinks = { ...this.links };
      //console.log('dirty', editedLinks);
      this.cleanLinks(editedLinks);
      //console.log('clean', editedLinks);
      this.$emit('input', Object.values(editedLinks));
    },
  },
};
</script>

<style lang="scss" scoped></style>
