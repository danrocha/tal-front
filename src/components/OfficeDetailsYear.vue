<template>
  <div v-if="!edit">
    <span v-if="office.yearFounded">{{ office.yearFounded }}</span>
    <edit-link v-else>edit year...</edit-link>
  </div>
  <div v-else class="mb-4">
    <base-input type="text" maxlength="4" target-class="input-large w-24" placeholder="YYYY" />
  </div>
</template>

<script>
import EditLink from '../components/EditLink.vue';
export default {
  name: 'OfficeDetailsYear',
  components: {
    EditLink,
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
};
</script>

<style lang="scss" scoped></style>
