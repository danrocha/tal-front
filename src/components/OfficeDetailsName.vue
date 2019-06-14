<template>
  <div v-if="!edit">
    <h1 class="text-6xl leading-tight font-bold">
      {{ officeName }}
      <br>
      <!-- <span class="label">AKA</span>&nbsp;<span class="text-base text-gray-600 font-normal">Alt name 1, altname 2</span><edit-link  class="ml-2 font-sans font-normal"/> -->
    </h1>
  </div>
  <div v-else>
    <div v-if="edit" class="flex">
      <base-label>Office Name</base-label>
      <span v-show="$v.name.$error" class="ml-2 italic text-xs text-gray-500">- Required</span>
    </div>
    <base-input target-class="input-large" v-model="$v.name.$model" @input="updateValue"/>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'OfficeDetailsName',
  mixins: [validationMixin],
  props: {
    officeName: {
      type: String,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: this.officeName,
    };
  },
  validations: {
    name: {
      required,
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
