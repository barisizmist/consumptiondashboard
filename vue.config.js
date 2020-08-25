module.exports = {
  devServer: {
    port: 5001,
    proxy: {
      "^/": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: false,
        secure: false
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
