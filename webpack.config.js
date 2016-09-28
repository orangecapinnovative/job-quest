var webpack = require("webpack");
var path = require("path");
module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', 'whatwg-fetch', "./src/client/app/TodoApp.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/", // relative path for github pages
    filename: "bundle.js", // no hash in main.js because index.html is a static page
  },
  devtool: 'inline-source-map',

  module: {
    loaders: [{
      test: /\.scss$/,
      loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader!sass"
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader!ts-loader"
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
    extensions: ['', '.json', '.ts', '.tsx', '.js', '.jsx'],
  },
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
};