module.exports = {
  devServer: {
    port: 5000,
    proxy: {
      "^/": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: false,
        secure: false
      }
    }
  }
};
