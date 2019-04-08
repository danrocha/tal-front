<template>
  <section>
    <add-office-step :isActive="addOffice.step === 3" class="mt-6">
      <template v-slot:step
        >3</template
      >
      <template v-slot:step-name
        >Review & Submit</template
      >
    </add-office-step>
    <div v-if="addOffice.step === 3">
      <div class="mt-4 ml-10 mb-4 flex items-start">
        <div>
          <font-awesome-icon
            icon="clipboard-check"
            class="text-yellow-500 mr-2"
          ></font-awesome-icon>
        </div>
        <div>
          <p class="mb-2">Is the above information correct?</p>
          <p v-if="!sameCities" class="text-gray-600">
            It seems the address above is not exactly in {{ addOffice.city.name }}; if you confirm,
            the address will take precedence.
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <base-button
          base-type="secondary"
          aria-label="start-over"
          class="secondary mx-6"
          @click="resetAddOffice"
          :disabled="isLoading"
          >No, start over</base-button
        >
        <base-button
          base-type="primary"
          aria-label="continue"
          @click="$emit('save')"
          :disabled="isLoading"
          :focus="true"
          >Yes</base-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddOfficeStep from '@/components/AddOfficeStep.vue';

export default {
  name: 'AddOffice3Review',
  components: {
    AddOfficeStep,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['addOffice']),
    sameCities() {
      if (this.addOffice.officeDetails && this.addOffice.city) {
        return this.addOffice.officeDetails.address_components.find(component => {
          return component.long_name.includes(this.addOffice.city.name);
        });
      }
      return false;
    },
  },
  methods: {
    ...mapActions(['resetAddOffice']),
  },
};
</script>

<style scoped></style>
