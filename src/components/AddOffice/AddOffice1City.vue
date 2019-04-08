<template>
  <section id="add-office-step-1" title="Step 1 - Select City">
    <add-office-step :isActive="addOffice.step === 1">
      <template v-slot:step
        >1</template
      >
      <template v-slot:step-name
        >Location</template
      >
    </add-office-step>
    <div v-if="addOffice.city" class="mt-4 ml-10">
      <router-link to="/add" tag="span">
        <font-awesome-icon icon="map-marker-alt" class="text-yellow-500 mr-2"></font-awesome-icon>
        <span class="font-bold mr-1">{{ addOffice.city.name }}</span> {{ addOffice.city.country }}
        <edit-link class="ml-2" @click="resetAddOffice" />
      </router-link>
    </div>
    <!-- FORM -->
    <select-city v-else class="mt-4" />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SelectCity from '@/components/SelectCity.vue';
import AddOfficeStep from '@/components/AddOfficeStep.vue';
import EditLink from '@/components/EditLink.vue';

export default {
  name: 'AddOffice1City',
  components: {
    SelectCity,
    AddOfficeStep,
    EditLink,
  },
  computed: {
    ...mapState(['addOffice']),
  },
  methods: {
    ...mapActions(['resetAddOffice']),
  },
};
</script>

<style scoped></style>
