<template>
  <div>
    <base-label v-if="edit">Website</base-label>
    <div class="mb-4 flex items-center w-full">
      <span class="w-8">
        <font-awesome-icon icon="globe" class="text-yellow-500 mr-2"></font-awesome-icon>
      </span>
      <div v-if="office.website" class="w-full">
        <div v-if="!edit">
          <a v-if="office.website" :href="office.website" class="link" target="_blank">{{
            formatUrl(office.website)
          }}</a>
        </div>

        <base-input
          v-else
          targetClass="input-large"
          :value="office.website"
          placeholder="http://..."
        ></base-input>
      </div>
      <router-link v-else :to="editLink" class="link">add website...</router-link>
    </div>
    <div v-if="!edit">
      <p
        v-for="network in office.officeSocialNetworks.nodes"
        :key="network.id"
        class="mb-1 flex items-center"
      >
        <font-awesome-icon
          :icon="['fab', network.socialNetwork.name.toLowerCase()]"
          class="text-yellow-500 mr-1"
        ></font-awesome-icon>

        <a :href="network.handle" class="link" target="_blank">{{ formatUrl(network.handle) }}</a>
      </p>
    </div>
    <div v-else class="pt-4">
      <base-label>Social Links</base-label>

      <apollo-query
        :query="
          gql => gql`
            {
              socialNetworks {
                nodes {
                  id
                  name
                  link
                  handlePrefix
                }
              }
            }
          `
        "
      >
        <template slot-scope="{ result: { data, error }, isLoading }">
          <div v-if="isLoading">
            <spinner />
          </div>
          <div v-else-if="data">
            <div
              v-for="network in data.socialNetworks.nodes"
              :key="network.id"
              class="flex items-center justify-start mb-4"
            >
              <span class="w-8">
                <font-awesome-icon
                  :icon="['fab', network.name.toLowerCase()]"
                  class="text-yellow-500"
                ></font-awesome-icon>
              </span>

              <div class="flex flex-wrap items-stretch w-full relative">
                <div class="flex -mr-px">
                  <span
                    class="flex items-center justify-end leading-normal bg-gray-200 rounded rounded-r-none border border-r-0 border-gray-400 px-3 whitespace-no-wrap text-gray-700 text-sm w-40"
                    >{{ formatUrl(network.handlePrefix) }}/</span
                  >
                </div>
                <input
                  type="text"
                  class="input flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none px-3 relative"
                />
              </div>
            </div>
          </div>
        </template>
      </apollo-query>
    </div>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import formatUrl from '@/mixins/formatUrl';

export default {
  name: 'OfficeDetailsLinks',
  mixins: [formatUrl],
  components: {
    Spinner,
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
    };
  },
  computed: {
    hasSocial() {
      return this.office.officeSocialNetworks.totalCount > 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
