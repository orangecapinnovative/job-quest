'use strict'

var Todo;

Todo = (function() {
	function Todo() {}

	// getTodoList
	// params {not required}
	//
	Todo.prototype.getTodoList = function() {
		return TodoSchema.find();
	};


	// addTodo
	// params
	// title [string]
	//
	Todo.prototype.addTodo = function(title) {
		new TodoSchema(title).save();
	};


	// deleteTodo
	// params
	// id [string(hex)]
	//
	Todo.prototype.deleteTodo = function(id) {
		TodoSchema.remove({ _id: id }, function() {});
	};


	// toggleTodo
	// params
	// id [string(hex)]
	//
	Todo.prototype.toggleTodo = function(id) {
		TodoSchema.findById(id, function(err, todo) {
			if(todo.done)	TodoSchema.findByIdAndUpdate(id, { done: false }, function() {});
			else			TodoSchema.findByIdAndUpdate(id, { done: true }, function() {});
		});
	};


	return Todo;
})();

module.exports = new Todo();
