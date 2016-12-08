'use strict'

// Load Node Module(s)
var express		= require('express');
var bodyParser	= require('body-parser');
var cors		= require('cors');
var fs			= require('fs');


// Load Global Node Module(s)
global._		= require('lodash');
global.Promise	= require('bluebird');
global.Joi		= Promise.promisifyAll(require('joi'));


// Load Config
var config = require(__dirname + '/configs/config');


// Initialize MongoDB
global.mongoose	= require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(config.db.mongodb);



// Initialize App
var app	= express();

app.use(cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(bodyParser.json())


// Load Lib(s)
app.use(express.static(__dirname + '/public/libs'));


// Load Model(s)
_.chain(fs.readdirSync(__dirname + '/models'))
	.filter(function(file) {
		return /js$/.test(file);
	})
	.map(function(file) {
		return file.split('.js')[0];
	}).forEach(function(file) {
		return global[_.capitalize(file)] = require(__dirname + '/models/' + file);
	})
	.commit();


// Load Schema(s)
var Schema = mongoose.Schema;

global.TodoSchema = mongoose.model('Todo', new Schema({
	title: String,
	done: {
		type:		Boolean,
		default:	false
	}
}));


// Load Controller(s)
_.chain(fs.readdirSync(__dirname + '/controllers'))
	.filter(function(file) {
		return /js$/.test(file);
	})
	.map(function(file) {
		return file.split('.js')[0];
	})
	.forEach(function(file) {
		var _file, mod;

		_file	= "" + file;
		mod		= (_file.charAt(0).toUpperCase() + _file.slice(1)) + "Controller";

		return global[mod] = require(__dirname + '/controllers/' + file);
	})
	.commit();

require(__dirname + '/controllers')(app);


// Listening Port
app.listen(config.server.port, function() {
	console.log('Listening to port ' + config.server.port)
});
