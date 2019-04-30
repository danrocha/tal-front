<template>
  <section>
    <add-office-step :isActive="step === 3" class="mt-6">
      <template v-slot:step
        >3</template
      >
      <template v-slot:step-name
        >Review & Submit</template
      >
    </add-office-step>
    <div v-if="step === 3">
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
            It seems the address above is
            <strong>not</strong>
            in {{ city.name }}; Would you like to add the address in
            <strong>{{ officeAddressObject.city }}</strong>
            ({{ officeAddressObject.country }}) instead?
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <base-button
          base-type="secondary"
          aria-label="start-over"
          class="secondary mx-6"
          @click="reset"
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
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapState({
      step: state => state.add.step,
      city: state => state.add.city,
      officeDetails: state => state.add.officeDetails,
    }),
    ...mapGetters(['add/getAddressObject']),

    sameCities() {
      if (this.officeDetails && this.city) {
        return this.officeAddressObject.city === this.cityAddressObject.city;
      }
      return false;
    },
    cityAddressObject() {
      return this['add/getAddressObject']('city');
    },
    officeAddressObject() {
      return this['add/getAddressObject']('officeDetails');
    },
  },
  methods: {
    ...mapActions('add', ['reset']),
  },
};
</script>

<style scoped></style>
