// @vue/component
export default {
  methods: {
    kebabCase(str) {
      return str.replace(/[\s_]+/g, '-').toLowerCase();
    },
  },
};
