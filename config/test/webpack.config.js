const path = require('path');
const webpackDefault = require('@ionic/app-scripts/config/webpack.config');
const webpackMerge = require('webpack-merge');

const customConfig = {
  resolve: {
    alias: {
      'app': path.resolve('src/app'),
      'pages': path.resolve('src/pages'),
      'services': path.resolve('src/services'),
      'components': path.resolve('src/components'),
      'pipes': path.resolve('src/pipes')
    }
  }
};

module.exports = webpackMerge(webpackDefault, customConfig);
