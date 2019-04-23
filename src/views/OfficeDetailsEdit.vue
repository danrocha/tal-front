<template>
  <div>
    <vue-headful :title="`${location.office.name} - Edit - TAL`" />

    <form @submit.prevent="submit">
      <section class="flex pt-6" id="office-details">
        <aside id="instructions-details" class="w-1/4 pr-4 flex flex-col justify-between">
          <div>
            <add-office-step :isActive="true" class="-ml-10">
              <template v-slot:step
                >1</template
              >
              <template v-slot:step-name
                >Office Details</template
              >
            </add-office-step>
            <p class="text-sm leading-normal">
              Edit general information about the office. On Step 2 below, you can edit details
              related to this location.
            </p>
          </div>
          <div class="flex justify-start">
            <base-button
              type="submit"
              aria-label="save"
              class="mr-4"
              :class="{ 'btn-disabled': $v.$invalid }"
              :disabled="disabled"
              >save</base-button
            >
            <button aria-label="cancel" class="link" @click="closeForm">Cancel</button>
          </div>
        </aside>
        <!-- end instruction details -->
        <section id="office-details-fields" class="w-3/4">
          <base-input
            v-model="formOffice.name"
            :label="formOffice.$labels.name"
            type="text"
            target-class="input-large"
            :placeholder="formOffice.$labels.name"
            :error="officeNameErrorMessage"
          />
          <base-input
            v-model="formOffice.website"
            :label="formOffice.$labels.website"
            type="url"
            target-class="input-large"
            placeholder="http://..."
            class="mt-6"
            :error="officeWebsiteErrorMessage"
          />
          <div class="flex mt-6">
            <div id="founded" class="w-1/2 pr-6">
              <base-input
                v-model.number="formOffice.yearFounded"
                :label="formOffice.$labels.yearFounded"
                type="text"
                maxlength="4"
                target-class="input-large"
                placeholder="YYYY"
                :error="officeYearErrorMessage"
              />
            </div>
            <div id="size" class="w-1/2">
              <select-size v-model="formOffice.sizeId" :originalSizeId="formOffice.sizeId" />
            </div>
          </div>
          <div id="typologies" class="mt-6">
            <base-label for="select-typologies">TYPOLOGIES</base-label>
            <select-typologies
              v-model="formOffice.typologies"
              :originalTypologies="formOffice.typologies"
            />
          </div>
          <div id="description" class="mt-6">
            <base-label for="description-textarea">{{ formOffice.$labels.description }}</base-label>
            <editor v-model="formOffice.description" />
            <!-- <textarea
              id="description-textarea"
              rows="5"
              class="input input-large"
              v-model="formOffice.description"
            ></textarea>-->
          </div>
        </section>
        <!-- end office details fields -->
      </section>
      <!-- end office details -->
      <!-------------- LOCATION -------------->
      <section class="flex my-6 py-6 border-t" id="location-details">
        <div class="mt-8">
          <p class="italic text-gray">Location edit coming soon!</p>
        </div>
        <!--
        <aside id="location-details-instructions" class="w-1/4 pr-4 flex flex-col justify-between">
          <div>
            <add-office-step :isActive="true" class="-ml-10">
              <template v-slot:step>2</template>
              <template v-slot:step-name>Location Details</template>
            </add-office-step>
            <p class="text-xs leading-normal">
              Edit information specific about this location. If this the office's single location,
              check the box below:
            </p>
            <div class="py-2">
              <input
                type="checkbox"
                id="single-office"
                name="single-office"
                v-model="formLocation.singleLocation"
              >
              <label for="single-location" class="label ml-2">Single location</label>
            </div>
          </div>

          <div class="flex justify-start">
            <base-button
              type="primary"
              aria-label="save"
              class="mr-4 btn-primary"
              type="submit"
              :class="{ 'btn-disabled': $v.$invalid }"
              :disabled="disabled"
            >save</base-button>
            <button aria-label="cancel" class="link" @click="closeForm">Cancel</button>
          </div>
        </aside>

        <section id="location-details-fields" class="w-3/4">
          <base-input
            v-model="locationName"
            :label="formLocation.$labels.name"
            type="text"
            target-class="input-large"
            :placeholder="formLocation.$labels.name"
            :disabled="this.formLocation.singleLocation"
          />
          <base-input
            v-model="locationWebsite"
            :label="formLocation.$labels.website"
            type="url"
            target-class="input-large"
            placeholder="http://..."
            class="mt-6"
            :disabled="this.formLocation.singleLocation"
            :error="locationWebsiteErrorMessage"
          />
          <div class="flex mt-6">
            <div id="location-founded" class="w-1/2 pr-6">
              <base-input
                v-model.number="locationYearFounded"
                :label="formLocation.$labels.yearFounded"
                type="text"
                maxlength="4"
                target-class="input-large"
                placeholder="YYYY"
                :disabled="this.formLocation.singleLocation"
                :error="locationYearErrorMessage"
              />
            </div>
            <div id="location-size" class="w-1/2">
              <select-size
                :disabled="this.formLocation.singleLocation"
                v-model.number="locationsizeId"
                :originalsizeId="locationsizeId"
              />
            </div>
          </div>
          <div id="description" class="mt-6">
            <base-label for="description-textarea">
              {{
              formLocation.$labels.description
              }}
            </base-label>
            <textarea
              id="description-textarea"
              rows="5"
              class="input input-large"
              v-model="formLocation.description"
            ></textarea>
          </div>
        </section>-->
        <!-- end location-details-fields -->
      </section>
      <!-- end location details -->
    </form>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading';
import { Form } from 'form-wrapper-js';
import { validationMixin } from 'vuelidate';
import { mapActions, mapState } from 'vuex';
import AddOfficeStep from '@/components/AddOfficeStep.vue';
import SelectSize from '@/components/SelectSize.vue';
import Editor from '@/components/Editor.vue';
import SelectTypologies from '@/components/SelectTypologies.vue';
import UPDATE_OFFICE_MUTATION from '../graphql/UpdateOffice.gql';
import UPDATE_LOCATION_MUTATION from '../graphql/UpdateLocation.gql';

const {
  required,
  minLength,
  maxLength,
  between,
  integer,
  url,
} = require('vuelidate/lib/validators');

Form.defaults.options.validation.onFieldChanged = true;

export default {
  name: 'OfficeDetailsEdit',
  mixins: [validationMixin],
  components: {
    AddOfficeStep,
    SelectSize,
    SelectTypologies,
    Editor,
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
  created() {
    if (!this.location) {
      this.closeForm();
    }
  },
  data() {
    return {
      formOffice: new Form({
        name: {
          value: this.$store.state.location.selectedLocation.office.name,
          label: 'Office Name',
        },
        website: {
          value: this.$store.state.location.selectedLocation.office.website,
          label: 'Office Website',
        },
        yearFounded: {
          value: this.$store.state.location.selectedLocation.office.yearFounded,
          label: 'Year Founded',
        },
        sizeId: {
          value: this.$store.state.location.selectedLocation.office.sizeId,
          label: 'Description',
        },
        typologies: {
          value: this.$store.state.location.selectedLocation.office.officeTypologies
            ? this.$store.state.location.selectedLocation.office.officeTypologies.nodes.map(
                node => node.typology
              )
            : [],
          label: 'Typologies',
        },
        description: {
          value: this.$store.state.location.selectedLocation.office.description,
          label: 'Description',
        },
      }),
      formLocation: new Form({
        name: {
          value: this.$store.state.location.selectedLocation.name,
          label: 'Location Name',
        },
        website: {
          value: this.$store.state.location.selectedLocation.website || '',
          label: 'Location Website',
        },
        yearFounded: {
          value: this.$store.state.location.selectedLocation.yearFounded || '',
          label: 'Founded',
        },
        sizeId: {
          value: this.$store.state.location.selectedLocation.sizeId || null,
          label: 'Size',
        },
        description: {
          value: this.$store.state.location.selectedLocation.Description,
          label: 'Description',
        },
        formattedAddress: {
          value: this.$store.state.location.selectedLocation.formattedAddress,
          label: 'Address',
        },
        singleLocation: false,
      }),
      yearErrorMessage: 'Year in the format YYYY',
      websiteErrorMessage: 'Don\'t forget the "http://"',
      nameErrorMessage: "Don't forget to add the office name!",
      addressErrorMessage: "Don't forget to add an address!",
    };
  },
  methods: {
    ...mapActions(['notification/add', 'location/setLocation']),
    submit() {
      // prepare variables for updating
      const officePatch = this.formOffice.values();
      for (let key in officePatch) {
        if (!this.formOffice.isDirty(key)) {
          delete officePatch[key];
          continue;
        }
        if (key == 'typologies') {
          officePatch.typologies = officePatch.typologies.map(typology => typology.id);
        }
      }
      //console.log(patch);
      const officeInput = {
        id: this.location.office.id,
        ...officePatch,
      };
      console.log(officeInput);
      this.$apollo
        .mutate({
          mutation: UPDATE_OFFICE_MUTATION,
          variables: { input: officeInput },
          update: (store, { data: { updateOffice } }) => {
            this.location.office = updateOffice.office;
            this['location/setLocation'](this.location);
          },
          refetchQueries: ['locations'],
        })
        .then(() => {
          this['notification/add']({
            type: 'success',
            message: 'Office info updated!',
          });
          this.closeForm();
        });
    },
    closeForm() {
      this.$router.push({
        name: 'office_details',
        params: {
          office_name: this.office_name,
          city_name: this.city_name,
          country_iso: this.country_iso,
          location_id: this.location_id,
        },
      });
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      location: state => state.location.selectedLocation,
      paginationInfo: state => state.paginationInfo,
    }),
    locationName() {
      if (this.formLocation.singleLocation) {
        /*eslint-disable-next-line*/
        this.formLocation.name = this.formOffice.name;
      }
      return this.formLocation.name;
    },
    locationWebsite: {
      get: function() {
        if (this.formLocation.singleLocation) {
          /*eslint-disable-next-line*/
          this.formLocation.website = this.formOffice.website;
        }
        return this.formLocation.website;
      },
      set: function(value) {
        this.formLocation.website = value;
      },
    },
    locationYearFounded: {
      get: function() {
        if (this.formLocation.singleLocation) {
          /*eslint-disable-next-line*/
          this.formLocation.yearFounded = this.formOffice.yearFounded;
        }
        return this.formLocation.yearFounded;
      },
      set: function(value) {
        this.formLocation.yearFounded = value;
      },
    },
    locationsizeId() {
      if (this.formLocation.singleLocation) {
        /*eslint-disable-next-line*/
        this.formLocation.sizeId = this.formOffice.sizeId;
      }
      return this.formLocation.sizeId;
    },
    officeYearErrorMessage() {
      if (this.$v.formOffice.yearFounded.$invalid) {
        return this.yearErrorMessage;
      }
      return null;
    },
    officeWebsiteErrorMessage() {
      if (this.$v.formOffice.website.$invalid) {
        return this.websiteErrorMessage;
      }
      return null;
    },
    officeNameErrorMessage() {
      if (this.$v.formOffice.name.$invalid) {
        return this.nameErrorMessage;
      }
      return null;
    },
    locationYearErrorMessage() {
      if (this.$v.formLocation.yearFounded.$invalid && !this.formLocation.singleLocation) {
        return this.yearErrorMessage;
      }
      return null;
    },
    locationWebsiteErrorMessage() {
      if (this.$v.formLocation.website.$invalid && !this.formLocation.singleLocation) {
        return this.websiteErrorMessage;
      }
      return null;
    },
    locationAddressErrorMessage() {
      if (this.$v.formLocation.formattedAddress.$invalid) {
        return this.addressErrorMessage;
      }
      return null;
    },
    disabled() {
      return this.$v.$invalid || (!this.formOffice.isDirty() && !this.formLocation.isDirty());
    },
  },

  validations: {
    formOffice: {
      name: {
        required,
      },
      yearFounded: {
        minLength: minLength(4),
        maxLength: maxLength(4),
        between: between(1800, 2025),
        integer,
      },
      website: {
        url,
      },
    },
    formLocation: {
      yearFounded: {
        minLength: minLength(4),
        maxLength: maxLength(4),
        between: between(1900, 2025),
        integer,
      },
      formattedAddress: {
        required,
      },
      website: {
        url,
      },
    },
  },
};
</script>
