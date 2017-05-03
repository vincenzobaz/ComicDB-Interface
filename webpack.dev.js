const path = require('path');
const webpack = require('webpack');

const server = 'http://localhost:3000';

module.exports = {
  // entry file for bundling
  entry: path.join(__dirname, '/client/src/app.js'),

  // bundle file output
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'server_url' : JSON.stringify(server)
    })
  ],

  module: {
    //apply loaders to files that meet given condition
    loaders: [{
      test: /\.js?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015"]
      }
    }],
  },

  // Webpack will rebuild on changes
  watch: true
}
