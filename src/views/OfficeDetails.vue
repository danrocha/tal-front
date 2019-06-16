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
    <div id="office-edit" class="flex justify-end w-full items-start">
      <base-button v-if="!edit" @click="edit = !edit">EDIT</base-button>
      <div v-else class="flex">
        <base-button @click="edit = !edit" base-type="secondary" class="mr-2">Cancel</base-button>
        <office-details-edit-save-button :variables="variables" />
      </div>
    </div>
    <div id="office-details" class="ml-4 border-l border-gray-400 pl-4 pt-8 lg:w-2/3">
      <!-- OFFICE NAME -->
      <office-details-name
        id="office-name"
        :office-name="location.office.name"
        :edit="edit"
        v-model="editForm.name"
      />

      <office-details-website
        id="office-website"
        :office="location.office"
        :edit="edit"
        v-model="editForm.website"
      />
      <office-details-links
        id="office-links"
        :office="location.office"
        :edit="edit"
        v-model="editForm.links"
      />
      <!-- DESCRIPTION -->
      <office-details-description
        id="office-description"
        :description="location.office.description"
        :edit="edit"
        v-model="editForm.description"
      />

      <office-details-typologies
        :office="location.office"
        id="office-typologies"
        :edit="edit"
        v-model="editForm.typologies"
      />
      <office-details-size
        :office="location.office"
        id="office-size"
        :edit="edit"
        v-model.number="editForm.sizeId"
      />
      <office-details-year
        :office="location.office"
        id="office-year"
        :edit="edit"
        v-model.number="editForm.yearFounded"
      />
    </div>

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
import OfficeLogo from '@/components/OfficeLogo.vue';
import OfficeDetailsDescription from '@/components/OfficeDetailsDescription.vue';
import OfficeDetailsLocations from '@/components/OfficeDetailsLocations.vue';
import OfficeDetailsLinks from '@/components/OfficeDetailsLinks.vue';
import OfficeDetailsName from '@/components/OfficeDetailsName.vue';
import OfficeDetailsWebsite from '@/components/OfficeDetailsWebsite.vue';
import OfficeDetailsSize from '../components/OfficeDetailsSize.vue';
import OfficeDetailsTypologies from '../components/OfficeDetailsTypologies.vue';
import OfficeDetailsYear from '../components/OfficeDetailsYear.vue';
import OfficeDetailsEditSaveButton from '../components/OfficeDetailsEditSaveButton.vue';

import LOCATION_BY_ID from '@/graphql/LocationById.gql';

export default {
  name: 'OfficeDetails',
  mixins: [kebabCase],
  components: {
    VclList,
    OfficeLogo,
    OfficeDetailsLinks,
    OfficeDetailsLocations,
    OfficeDetailsDescription,
    OfficeDetailsName,
    OfficeDetailsWebsite,
    OfficeDetailsEditSaveButton,
    OfficeDetailsYear,
    OfficeDetailsTypologies,
    OfficeDetailsSize,
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
      editForm: {
        id: null,
        name: null,
        website: null,
        links: [],
        description: null,
        sizeId: null,
        typologies: [],
        yearFounded: null,
      },
      variables: null,
    };
  },
  created() {
    if (this.location) {
      this.editForm.id = this.location.office.id;
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
    setInitialData(location) {
      this.office_id = location.office.id;
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
        this.editForm.id = data.locationById.office.id;
      },
    },
  },
  watch: {
    editForm: {
      deep: true,
      immediate: true,
      handler() {
        this.variables = { ...this.editForm };
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
    '. details details'
    '. locations locations'
    'back . .';
}
#office > #office-logo {
  grid-area: logo;
}
#office > #office-details {
  grid-area: details;
}
#office > #office-details > * + * {
  @apply pt-8;
}
#office > #office-locations {
  grid-area: locations;
}
#office > #office-back {
  grid-area: back;
}
#office > #office-edit {
  grid-area: edit;
}
</style>
