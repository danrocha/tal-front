// @vue/component
export default {
  methods: {
    kebabCase(str) {
      return str
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    },
  },
};
