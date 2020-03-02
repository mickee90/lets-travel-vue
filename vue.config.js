module.exports = {
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  },
  devServer: {
    host: "localhost"
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
