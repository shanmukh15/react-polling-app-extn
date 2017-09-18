let webpack = require('webpack');
let path = require('path');


module.exports = {
  entry: './main.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|server.js)/, loader: "babel-loader"}
    ]
  },
  /*plugins: [
    new webpack.ProvidePlugin({
        d3: 'd3',
        jquery: 'jquery'
    })
 ],*/
 resolve: {
    alias: {
        'd3': path.join(__dirname, 'd3.min.js')
    }
}
};