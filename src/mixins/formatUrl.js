// @vue/component
export default {
  methods: {
    formatUrl(url) {
      return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
    },
  },
};
