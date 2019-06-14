<template>
  <div v-if="!edit">
    <span v-if="office.yearFounded">{{ office.yearFounded }}</span>
    <edit-link v-else>edit year...</edit-link>
  </div>
  <div v-else>
    <div class="flex">
      <base-label>Founded</base-label>
      <span v-if="!$v.year.minLength || !$v.year.integer" class="ml-2 italic text-xs text-gray-500"
        >- Year in the format YYYY</span
      >
      <!-- TODO: make maxYear dynamic -->
      <span v-else-if="!$v.year.between" class="ml-2 italic text-xs text-gray-500"
        >- Must be between 1800 and 2019</span
      >
    </div>
    <base-input
      type="text"
      maxlength="4"
      target-class="input-large w-24"
      placeholder="YYYY"
      v-model="$v.year.$model"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { integer, between, maxLength, minLength } from 'vuelidate/lib/validators';
import EditLink from '../components/EditLink.vue';
export default {
  name: 'OfficeDetailsYear',
  mixins: [validationMixin],
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
  data() {
    return {
      year: this.office.yearFounded,
    };
  },
  validations: {
    year: {
      integer,
      minLength: minLength(4),
      maxLength: maxLength(4),
      between: between(1800, 2025),
    },
  },
  methods: {
    updateValue(event) {
      if (!this.$v.$anyError) {
        return this.$emit('input', event);
      }
      this.$emit('input', '');
    },
  },
};
</script>

<style lang="scss" scoped></style>
