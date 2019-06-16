<template>
  <div>
    <div v-if="edit" class="flex">
      <base-label>Website</base-label>
      <span v-show="$v.website.$error" class="ml-2 italic text-xs text-gray-500"
        >- Don't forget the "http://"</span
      >
    </div>
    <div class="flex items-center w-full">
      <span class="w-8">
        <font-awesome-icon icon="globe" class="text-yellow-500 mr-2"></font-awesome-icon>
      </span>
      <div v-if="office.website" class="w-full">
        <div v-if="!edit">
          <a v-if="office.website" :href="office.website" class="link" target="_blank">{{
            formatUrl(office.website)
          }}</a>
        </div>

        <base-input
          v-else
          targetClass="input-large"
          v-model="$v.website.$model"
          placeholder="http://..."
          @input="updateValue"
        ></base-input>
      </div>
      <router-link v-else :to="editLink" class="link">add website...</router-link>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { url } from 'vuelidate/lib/validators';
import formatUrl from '@/mixins/formatUrl';

export default {
  mixins: [formatUrl, validationMixin],
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
      website: this.office.website,
    };
  },
  validations: {
    website: {
      url,
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
