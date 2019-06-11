<template>
  <div v-if="!location">
    <vcl-list />
  </div>
  <!-- START GRID -->
  <div v-else id="office">
    <vue-headful :title="`${location.office.name} - The Architecture List`" />
    <!-- LOGO -->
    <div id="office-logo" class="flex justify-end items-center">
      <div class="pr-4 border-r border-gray-400">
        <office-logo
          class="-mr-16"
          :name="location.office.name"
          :logo-url="location.office.logoUrl"
        />
      </div>
    </div>
    <div id="office-edit-link" class="flex justify-end w-full items-start">
      <button @click="edit = !edit">EDIT</button>
      <edit-link />
    </div>
    <!-- OFFICE NAME -->
    <office-details-name
      id="office-name"
      class="flex-grow ml-4 border-l border-gray-400 pl-4 pt-8"
      :office-name="location.office.name"
      :edit="edit"
    />

    <office-details-links
      id="office-links"
      class="flex-grow ml-4 border-l border-gray-400 pl-4 pt-8"
      :office="location.office"
      :edit="edit"
    />
    <!-- DESCRIPTION -->
    <office-details-description
      id="office-description"
      class="ml-4 border-l border-gray-400 pl-4 pt-8 lg:w-2/3"
      :description="location.office.description"
      :edit="edit"
    />

    <!-- OFFICE DETAILS -->
    <office-details-details
      :office="location.office"
      id="office-details"
      class="ml-4 border-l border-gray-400 pl-4 pt-16 lg:w-2/3"
      :edit="edit"
    />

    <!-- OFFICE LOCATIONS -->
    <div id="office-locations" class="ml-4 border-l border-gray-400 pl-4 pt-16">
      <office-details-locations
        v-for="location in location.office.locations.nodes"
        :key="location.id"
        :location="location"
        class="-ml-16"
      />
    </div>

    <div id="office-back">
      <router-link
        :to="`/${country_iso}/${city_name}`"
        class="link text-sm my-6"
        tag="button"
        aria-label="back"
        >&lt; back</router-link
      >
    </div>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import { mapState, mapActions } from 'vuex';
import kebabCase from '@/mixins/kebabCase';
import EditLink from '@/components/EditLink.vue';
import OfficeLogo from '@/components/OfficeLogo.vue';
import OfficeDetailsDescription from '@/components/OfficeDetailsDescription.vue';
import OfficeDetailsLocations from '@/components/OfficeDetailsLocations.vue';
import OfficeDetailsLinks from '@/components/OfficeDetailsLinks.vue';
import OfficeDetailsDetails from '@/components/OfficeDetailsDetails.vue';
import OfficeDetailsName from '@/components/OfficeDetailsName.vue';
import LOCATION_BY_ID from '@/graphql/LocationById.gql';

export default {
  name: 'OfficeDetails',
  mixins: [kebabCase],
  components: {
    EditLink,
    VclList,
    OfficeLogo,
    OfficeDetailsLinks,
    OfficeDetailsLocations,
    OfficeDetailsDescription,
    OfficeDetailsDetails,
    OfficeDetailsName,
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
      edit: true,
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
li::before {
  content: '•';
  color: #f2d024;
  @apply pr-2;
}
li {
  @apply py-2;
  @apply pl-6;
}
#office {
  display: grid;
  grid-template-columns: 6rem 1fr 1fr;
  grid-template-areas:
    'logo . edit'
    '. name name'
    '. links links'
    '. description description'
    '. details details'
    '. locations locations'
    'back . .';
}
#office > #office-logo {
  grid-area: logo;
}
#office > #office-name {
  grid-area: name;
}
#office > #office-links {
  grid-area: links;
}
#office > #office-description {
  grid-area: description;
}
#office > #office-locations {
  grid-area: locations;
}
#office > #office-back {
  grid-area: back;
}
#office > #office-edit-link {
  grid-area: edit;
}
#office > #office-details {
  grid-area: details;
}
</style>
