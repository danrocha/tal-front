<template>
  <div class="shadow rounded flex items-center justify-center p-1 bg-white" :class="sizeClass">
    <img v-if="logoUrl" :src="logoUrl" />
    <p v-else class="font-bold" :class="fontSizeClass()">{{ initials() }}</p>
  </div>
</template>

<script>
export default {
  name: 'OfficeLogo',
  props: {
    logoUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    sizeClass() {
      if (this.size === 'sm') {
        return 'w-12 h-12';
      }
      if (this.size === 'lg') {
        return 'w-32 h-32';
      }
      return 'w-24 h-24';
    },
  },
  methods: {
    fontSizeClass() {
      if (this.size === 'sm') {
        return 'text-xl';
      }
      return 'text-4xl';
    },
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
