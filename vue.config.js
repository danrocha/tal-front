module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        target: 'localhost:8349',
        changeOrigin: true,
      },
    },
  },
};
