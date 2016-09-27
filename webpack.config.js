var webpack = require("webpack");
var path = require("path");
module.exports = {
  context: __dirname,
  entry: ['whatwg-fetch', "./src/client/index.ts"],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/", // relative path for github pages
    filename: "bundle.js", // no hash in main.js because index.html is a static page
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.png$/,
      loader: "url-loader?prefix=img/&limit=5000"
    }, {
      test: /\.jpg$/,
      loader: "url-loader?prefix=img/&limit=5000"
    }, ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.ts', '.tsx'],
    devServer: {
      contentBase: 'http://localhost:' + (3000),
      publicPath: '/dist/',
      stats: 'errors-only',
      hot: true,
      proxy: {
        '*': 'http://127.0.0.1:' + (2999)
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      host: '127.0.0.1'
    }
  },
};