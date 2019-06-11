module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        target: 'localhost:8349',
        changeOrigin: true,
      },
      '/clearbit_logo': {
        target: 'https://logo.clearbit.com',
        changeOrigin: true,
      },
      '/clearbit_company': {
        target: 'https://company.clearbit.com',
        changeOrigin: true,
      },
    },
  },
};
