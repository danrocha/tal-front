// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'tal',
      // URL to the GraphQL API
      url: 'http://localhost:8349/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
};
