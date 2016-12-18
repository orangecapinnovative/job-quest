var webpack = require("webpack");
var path = require("path");
module.exports = {
	context: __dirname,
	entry: ['whatwg-fetch',"./src/client.js"],
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/", // relative path for github pages
		filename: "bundle.js", // no hash in main.js because index.html is a static page
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
		],
		loaders: [
			{ test: /\.css$/,    loader: "style-loader!css-loader" },
			{ test: /\.jsx?$/,   exclude: /node_modules/, loader: "babel-loader",query:{presets:['react','es2015', 'react-hmre']} },
			{ test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
		]
	},
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
};
