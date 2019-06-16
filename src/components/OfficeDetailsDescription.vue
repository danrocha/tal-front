<template>
  <div>
    <span class="hidden" id="temp"></span>
    <div v-if="!edit">
      <div
        v-if="descriptionText.length > 0"
        v-html="description"
        id="description"
        :class="!readMore && showReadMore ? 'hide' : 'show'"
      ></div>
      <div class="text-right">
        <button
          v-if="!readMore && showReadMore"
          class="link italic mt-2 text-sm text-gray-500"
          @click="readMore = true"
        >show more...</button>
        <button
          v-else-if="readMore && showReadMore"
          class="link italic mt-2 text-sm text-gray-500"
          @click="readMore = false"
        >show less...</button>
      </div>
    </div>
    <div v-else>
      <base-label for="description-textarea">Description</base-label>
      <editor v-model="descriptionHtml" @input="updateValue"/>
    </div>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue';

const MAX_LENGTH = 450;
export default {
  name: 'OfficeDetailsDescription',
  components: {
    Editor,
  },
  props: {
    description: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      readMore: false,
      descriptionText: '',
      editLink: `${this.$route.path}/edit`,
      descriptionHtml: this.description,
    };
  },
  mounted() {
    if (this.description && !this.edit) {
      document.querySelector('#temp').innerHTML = this.description;
      this.descriptionText = document.querySelector('#temp').textContent;
      document.querySelector('#temp').innerHTML = '';
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event);
    },
  },
  computed: {
    showReadMore() {
      return this.descriptionText.length > MAX_LENGTH;
    },
  },
};
</script>

<style scoped>
#description >>> p {
  @apply pb-4;
}
.show {
  @apply h-auto;
}
.hide {
  @apply h-32 overflow-hidden relative;
}
.hide:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 55%;
  bottom: 0;
  background: -webkit-linear-gradient(transparent, #fff) left repeat;
  background: linear-gradient(transparent, #fff) left repeat;
}
</style>
