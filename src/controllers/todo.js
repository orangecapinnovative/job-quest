'use strict'

var path = require('path');

// displayTodoPage
// params {not required}
//
exports.displayTodoPage = function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}


// getTodoList
// params {not required}
//
exports.getTodoList = function(req, res) {
	Promise.resolve(Todo.getTodoList())
		.then(function(todos) {
			res.send(todos);
		});
}


// addTodo
// params
// title [string]
//
exports.addTodo = function(req, res) {
	var schema;

	schema = Joi.object().keys({
		title: Joi.string().required()
	});

	Promise.try(function() {
		return Joi.validateAsync(req.body, schema, null);
	})
		.then(function() {
			Promise.resolve(Todo.addTodo(req.body))
				.then(function() {
					res.send({
						message: 'Success'
					});
				})
				.catch(function(err) {
					res.status(500).json({
						error: 'Internal Server Error'
					})
				});
		})
		.catch(function(err) {
			res.status(400).json({
				error: 'Bad Request'
			})
		});
}


// deleteTodo
// params
// id [string(hex)]
//
exports.deleteTodo = function(req, res) {
	var schema;

	schema = Joi.object().keys({
		id: Joi.string().hex().required()
	});

	Promise.try(function() {
		return Joi.validateAsync(req.params, schema, null);
	})
		.then(function() {
			Promise.resolve(Todo.deleteTodo(req.params.id))
				.then(function() {
					res.send({
						msg: 'deleted'
					});
				})
				.catch(function(err) {
					res.status(500).json({
						error: 'Internal Server Error'
					})
				});
		})
		.catch(function(err) {
			res.status(400).json({
				error: 'Bad Request'
			})
		});
}


// toggleTodo
// params
// id [string(hex)]
//
exports.toggleTodo = function(req, res) {
	var schema;

	schema = Joi.object().keys({
		id: Joi.string().hex().required()
	});

	Promise.try(function() {
		return Joi.validateAsync(req.params, schema, null);
	})
		.then(function() {
			Promise.resolve(Todo.toggleTodo(req.params.id))
				.then(function() {
					res.send({
						message: 'Success'
					});
				})
				.catch(function(err) {
					res.status(500).json({
						error: 'Internal Server Error'
					})
				});
		})
		.catch(function(err) {
			res.status(400).json({
				error: 'Bad Request'
			})
		});
}
