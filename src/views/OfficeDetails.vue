<template>
  <div v-if="!location">
    <vcl-list/>
  </div>
  <!-- START GRID -->
  <div v-else id="office">
    <vue-headful :title="`${location.office.name} - The Architecture List`"/>
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
      <base-button v-if="!edit" @click="edit = !edit">EDIT</base-button>
      <div v-else class="flex">
        <base-button @click="edit = !edit" base-type="secondary" class="mr-2">Cancel</base-button>
        <base-button @click="save" :disabled="disableSave">Save</base-button>
      </div>
    </div>
    <!-- OFFICE NAME -->
    <office-details-name
      id="office-name"
      class="flex-grow ml-4 border-l border-gray-400 pl-4 pt-8"
      :office-name="location.office.name"
      :edit="edit"
      v-model="$v.editForm.officeName.$model"
    />

    <office-details-website
      id="office-website"
      class="flex-grow ml-4 border-l border-gray-400 pl-4 pt-8"
      :office="location.office"
      :edit="edit"
      v-model="$v.editForm.website.$model"
    />
    <office-details-links
      id="office-links"
      class="flex-grow ml-4 border-l border-gray-400 pl-4 pt-8"
      :office="location.office"
      :edit="edit"
      v-model="$v.editForm.links.$model"
    />
    <!-- DESCRIPTION -->
    <office-details-description
      id="office-description"
      class="ml-4 border-l border-gray-400 pl-4 pt-8 lg:w-2/3"
      :description="location.office.description"
      :edit="edit"
      v-model="$v.editForm.description.$model"
    />

    <!-- OFFICE DETAILS -->

    <office-details-typologies
      :office="location.office"
      id="office-typologies"
      class="ml-4 border-l border-gray-400 pl-4 pt-16 lg:w-2/3"
      :edit="edit"
      v-model="$v.editForm.typologies.$model"
    />
    <office-details-size
      :office="location.office"
      id="office-size"
      class="ml-4 border-l border-gray-400 pl-4 pt-8 lg:w-2/3"
      :edit="edit"
      v-model="$v.editForm.sizeId.$model"
    />
    <office-details-year
      :office="location.office"
      id="office-year"
      class="ml-4 border-l border-gray-400 pl-4 pt-8 lg:w-2/3"
      :edit="edit"
      v-model="$v.editForm.year.$model"
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
      >&lt; back</router-link>
    </div>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import { mapState, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
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

import LOCATION_BY_ID from '@/graphql/LocationById.gql';

export default {
  name: 'OfficeDetails',
  mixins: [kebabCase, validationMixin],
  components: {
    VclList,
    OfficeLogo,
    OfficeDetailsLinks,
    OfficeDetailsLocations,
    OfficeDetailsDescription,
    OfficeDetailsName,
    OfficeDetailsWebsite,
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
        officeName: '',
        website: '',
        links: {},
        description: '',
        sizeId: null,
        typologies: [],
        year: '',
      },
    };
  },
  validations: {
    editForm: {
      officeName: {},
      website: {},
      links: {},
      description: {},
      sizeId: {},
      typologies: {},
      year: {},
    },
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
    disableSave() {
      return !this.$v.editForm.$anyDirty && !this.$v.editForm.$anyError;
    },
  },
  methods: {
    ...mapActions(['location/setLocation']),
    cityPageUrl(city) {
      return `/${this.kebabCase(
        city.countryByCountryIsocode.iso
      )}/${this.kebabCase(city.name)}`;
    },
    save() {
      //console.log(this.editForm);
      // remove empty
      let mutationVariables = { ...this.editForm };
      this.clean(mutationVariables);
      console.log(mutationVariables);
    },
    clean(obj) {
      for (const propName in obj) {
        if (typeof obj[propName] === 'object') {
          if (this.isEmpty(obj[propName])) {
            delete obj[propName];
          }
        } else if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          !obj[propName]
        ) {
          delete obj[propName];
        }
      }
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    setEditVariables() {},
    setInitialData(location) {
      this.officeName = location.office.name;
      this.website = location.office.website;
      this.description = location.office.description;
      this.year = location.office.yearFounded;
      this.sizeId = location.office.sizeId;
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
        this.setInitialData(data.locationById);
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
    '. website website'
    '. links links'
    '. description description'
    '. typologies typologies'
    '. size size'
    '. year year'
    '. locations locations'
    'back . .';
}
#office > #office-logo {
  grid-area: logo;
}
#office > #office-name {
  grid-area: name;
}
#office > #office-website {
  grid-area: website;
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
#office > #office-typologies {
  grid-area: typologies;
}
#office > #office-size {
  grid-area: size;
}
#office > #office-year {
  grid-area: year;
}
</style>
