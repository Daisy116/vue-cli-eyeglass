const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const IconFontPlugin = require('icon-font-loader').Plugin;

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // publicPath: './',
  publicPath: '/Portfolio5/',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
      new IconFontPlugin(),
    ],
    // module: {
    //   rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', 'icon-font-loader'] }],
    // },
  },
};