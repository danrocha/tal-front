<template>
  <div>
    <span class="inline-block w-full">
      <input
        type="text"
        ref="searchInput"
        v-model="search"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        :placeholder="placeholder"
        class="input input-large -mr-6"
      />
      <span
        v-if="search"
        @click="clear"
        class="cursor-pointer text-yellow-800 font-bold"
        title="Clear"
        >&times;</span
      >
    </span>

    <ul v-show="isOpen" class="overflow-auto p-0 m-0 border border rounded border-gray-500h-48">
      <li v-if="isLoading" class="loading">Loading...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result, i)"
        :class="{ 'bg-yellow-500': i === arrowCounter }"
        class="text-left py-2 px-2 cursor-pointer hover:bg-yellow-500"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FieldAutoComplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    valueKey: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1,
      selected: null,
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.search);
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.isOpen = true;
        this.filterResults();
      }
    },
    filterResults() {
      if (this.valueKey) {
        let key = this.valueKey;
        this.results = this.items.map(item => item[key]);
      } else {
        this.results = this.items;
      }
    },
    setResult(result, i) {
      this.search = result;
      this.isOpen = false;
      this.selected = this.items[i];
    },
    clear() {
      this.search = '';
      this.isOpen = false;
      this.arrowCounter = -1;
      this.selected = null;
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter += 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.selected = this.items[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    setFocus() {
      this.$refs.searchInput.focus();
    },
  },
  watch: {
    items: function() {
      if (this.isAsync) {
        this.filterResults();
        this.isOpen = true;
        this.isLoading = false;
      }
    },
    selected: function(value) {
      this.$emit('selected', value);
    },
  },
  mounted() {
    this.setFocus();
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
<style></style>
