const path = require('path');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');
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

module.exports = {
     dev: webpackMerge(dev, customConfig),
     prod: webpackMerge(prod, customConfig)
};
