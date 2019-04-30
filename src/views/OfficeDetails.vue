<template>
  <div v-if="!location">
    <vcl-list />
  </div>
  <div v-else>
    <vue-headful :title="`${location.office.name} - TAL`" />
    <section>
      <header id="heading" class="flex justify-between items-start py-6">
        <div class="flex-grow">
          <h2>
            {{ location.office.name }}
            <br />
            <!-- <span class="label">AKA</span>&nbsp;<span class="text-base text-gray-600 font-normal">Alt name 1, altname 2</span><edit-link  class="ml-2 font-sans font-normal"/> -->
          </h2>
          <p v-if="location.office.website">
            <a :href="location.office.website" class="link">{{
              formatUrl(location.office.website)
            }}</a>
          </p>
          <p class="mt-2" v-else>
            <router-link :to="editLink" class="link">Add a website...</router-link>
          </p>
        </div>
        <div class="flex-grow-0 ml-6">
          <edit-link class="text-normal btn btn-secondary" @click="edit" />
        </div>
      </header>

      <section id="office-info" class="flex no-wrap w-full border-t py-6">
        <section id="details" class="w-1/4 pr-6">
          <div id="founded" class="mb-4">
            <base-label>Founded</base-label>

            <p v-if="location.office.yearFounded" class="my-1">{{ location.office.yearFounded }}</p>
            <router-link v-else :to="editLink" class="link">Add year founded...</router-link>
          </div>
          <div id="size" class="mb-4">
            <base-label class="pt-4" for="office-size">Size</base-label>

            <p v-if="location.office.size" class="my-1">
              {{ location.office.size.nameShort }}
              <br />
              ({{ location.office.size.description }})
            </p>
            <router-link v-else :to="editLink" class="link">Add size...</router-link>
          </div>
        </section>
        <section id="more-info" class="w-3/4">
          <div id="typologies" class="mb-5">
            <base-label>Typologies</base-label>
            <div
              v-if="location.office.officeTypologies.nodes.length > 0"
              class="flex flex-wrap flex-row"
            >
              <span
                v-for="node in location.office.officeTypologies.nodes"
                :key="node.id"
                class="p-1 mr-2 mb-2 border border-gray-500bg-white text-xs uppercase rounded-sm"
                >{{ node.typology.name }}</span
              >
            </div>
            <router-link v-else :to="editLink" class="link">Edit typologies...</router-link>
          </div>
          <div id="description">
            <base-label class="pt-4">Description</base-label>

            <div
              v-if="location.office.description"
              v-html="location.office.description"
              class="description"
            ></div>
            <router-link v-else :to="editLink" class="link">Add a description...</router-link>
          </div>
        </section>
      </section>
      <section id="office-info" class="flex flex-col no-wrap w-full border-t py-6">
        <div class="block w-full">
          <base-label>Locations</base-label>
        </div>
        <div class="flex flex-row">
          <div class="w-1/4">
            <p v-for="location in location.office.locations.nodes" :key="location.id" class="my-1">
              <router-link :to="cityPageUrl(location.city)" class="link">
                {{ location.city.name }},
                {{ location.city.countryByCountryIsocode.iso }}
              </router-link>
            </p>
          </div>
          <div class="w-3/4">
            <p class="text-base font-normal">{{ location.formattedAddress }}</p>
          </div>
        </div>
        <div class="mt-8">
          <p class="italic text-gray">Location edit coming soon!</p>
        </div>
      </section>
      <div class="border-t w-full">
        <router-link
          :to="`/${country_iso}/${city_name}`"
          class="link text-sm my-6"
          tag="button"
          aria-label="back"
          >&lt; back</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import { mapState, mapActions } from 'vuex';
import formatUrl from '@/mixins/formatUrl';
import kebabCase from '@/mixins/kebabCase';
import EditLink from '@/components/EditLink.vue';
import LOCATION_BY_ID from '@/graphql/LocationById.gql';

export default {
  name: 'OfficeDetails',
  mixins: [formatUrl, kebabCase],
  components: {
    EditLink,
    VclList,
  },
  props: {
    country_iso: {
      required: true,
      type: String,
    },
    city_name: {
      required: true,
      type: String,
    },
    office_name: {
      required: true,
      type: String,
    },
    location_id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      editLink: `${this.$route.path}/edit`,
    };
  },
  created() {
    if (this.location) {
      this.$apollo.queries.locationById.skip = true;
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      location: state => state.location.selectedLocation,
    }),
  },
  methods: {
    ...mapActions(['location/setLocation']),
    edit() {
      this.$router.push({ path: `${this.$route.path}/edit` });
    },
    cityPageUrl(city) {
      return `/${this.kebabCase(city.countryByCountryIsocode.iso)}/${this.kebabCase(city.name)}`;
    },
  },
  apollo: {
    locationById: {
      query: LOCATION_BY_ID,
      variables() {
        return { id: Number(this.location_id) };
      },
      result({ data }) {
        this['location/setLocation'](data.locationById);
      },
    },
  },
};
</script>

<style scoped>
.description >>> p {
  @apply leading-loose;
  @apply my-4;
}
li::before {
  content: '•';
  color: #f2d024;
  @apply pr-2;
}
li {
  @apply py-2;
  @apply pl-6;
}
</style>
