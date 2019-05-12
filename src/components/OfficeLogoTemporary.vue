<template>
    <div class="w-24 h-24 rounded-full border border-gray-500 p-2 flex items-center justify-center">
      <p class="font-bold text-4xl">{{ initials }}</p>
    </div>
</template>

<script>
export default {
  name: 'TempLogo',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    initials() {
      const nameComponents = this.name.toUpperCase().split(' ');
      if (nameComponents[0].length <= 3) {
        return nameComponents[0];
      } else {
        return nameComponents
          .map((n, i, a) => {
            if (i < 3) {
              return n[0];
            }
          })
          .join('');
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
