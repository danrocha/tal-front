<template>
  <span class="inline-block w-full mt-6">
    <input
      type="text"
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      :placeholder="placeholder"
      class="py-2 px-2 w-full -mr-6 bg-gray-400 appearance-none border-2 border-gray-400 rounded text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
    >
    <span
      v-if="search"
      @click="clear"
      class="cursor-pointer text-yellow-800 font-bold"
      title="Clear"
    >&times;</span>
  </span>
</template>
<script>
export default {
  name: 'InputText',
};
</script>
