'use strict'

module.exports = function(app) {
	app.get('/',	TodoController.displayTodoPage);

	app.get('/api/todo/get',			TodoController.getTodoList);
	app.post('/api/todo/add',			TodoController.addTodo);
	app.delete('/api/todo/delete/:id',	TodoController.deleteTodo);
	app.post('/api/todo/:id/toggle',	TodoController.toggleTodo);


	_.chain(app._router.stack).map(function(route) {
		return route.route;
	})
		.compact()
		.flatten()
		.value();
}
