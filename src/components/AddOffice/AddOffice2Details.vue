<template>
  <section id="add-office-step-2" title="Step 2 - Office Details" class="mt-6">
    <add-office-step :isActive="addOffice.step === 2">
      <template v-slot:step>2</template>
      <template v-slot:step-name>Details</template>
    </add-office-step>
    <!-- display office details -->
    <div
      v-if="addOffice.officeDetails && !addOffice.manual"
      class="mt-4 ml-10 mb-4 flex items-start"
    >
      <div>
        <font-awesome-icon icon="building" class="text-yellow-500 mr-2"></font-awesome-icon>
      </div>

      <div>
        <p class="mb-2 font-bold">
          {{ addOffice.officeDetails.name }}
          <edit-link @click="resetAddOfficeOfficeDetails" class="ml-2"/>
        </p>
        <p v-if="addOffice.hasWebsite" class="mb-2 group">
          <a class="link" :href="addOffice.officeDetails.website" target="_blank">
            {{ formatUrl(addOffice.officeDetails.website) }}
            <font-awesome-icon icon="external-link-square-alt" class="text-gray-600 mr-2 text-sm"></font-awesome-icon>
          </a>
        </p>
        <p class="mb-2">{{ addOffice.officeDetails.formatted_address }}</p>
      </div>
    </div>
    <!-- display office details form -->
    <add-office-details v-else-if="addOffice.step === 2" class="mt-4"/>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddOfficeStep from '@/components/AddOfficeStep.vue';
import AddOfficeDetails from '@/components/AddOfficeDetails.vue';
import EditLink from '@/components/EditLink.vue';
import formatUrl from '@/mixins/formatUrl';

export default {
  name: 'AddOffice2Details',
  mixins: [formatUrl],
  components: {
    AddOfficeStep,
    AddOfficeDetails,
    EditLink,
  },
  computed: {
    ...mapState(['addOffice']),
  },
  methods: {
    ...mapActions(['resetAddOfficeOfficeDetails']),
  },
};
</script>

<style scoped></style>
