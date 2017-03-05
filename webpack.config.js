const path = require('path');

module.exports = {
  // entry file for bundling
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // bundle file output
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {
    //apply loaders to files that meet given condition
    loaders: [{
      test: /\.jsx?$/,
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