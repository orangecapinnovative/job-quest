import React from 'react';
import 'whatwg-fetch';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './public/css/styles.scss';

export default class TodoApp extends React.Component {
	constructor(props) {
		super()

		this.api_url = 'http://localhost:3000';

		this.state = {
			todos:		[],
			newTodo:	'',
			alert:		''
		};

		this.toggle			= this.toggle.bind(this);
		this.delete			= this.delete.bind(this);
		this.add			= this.add.bind(this);
		this.newTodoChange	= this.newTodoChange.bind(this);
	}

	componentDidMount() {
		fetch(this.api_url + '/api/todo/get')
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})
	}

	toggle(id) {
		fetch(this.api_url + '/api/todo/' + id + '/toggle', {
			method: 'POST'
		})
			.then(() =>
				fetch(this.api_url + '/api/todo/get')
			)
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})
	}

	delete(id,e) {
		fetch(this.api_url + '/api/todo/delete/' + id, {
			method: 'DELETE'
		})
			.then(() =>
				fetch(this.api_url + '/api/todo/get')
			)
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})

		e.preventDefault();
		e.stopPropagation();

		return false;
	}

	add(title) {
		if(title != '') {
			fetch(this.api_url + '/api/todo/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title
				})
			})
				.then(() =>
					fetch(this.api_url + '/api/todo/get')
				)
				.then((data) =>
					data.json())
				.then((data) => {
					this.setState({
						todos:		data,
						newTodo:	'',
						alert:		''
					})
				})
		}
		else {
			this.setState({
				alert: 'Your new to-do cannot be blank !'
			})
		}
	}

	newTodoChange(e) {
		this.setState({
			newTodo: e.target.value
		})
	}

	render() {
		return <div>
			<Card className="card">
				<CardTitle title="TODO APP" subtitle="takemetour/job-quest | Refactor By Tanawin Samutsin" />
				<CardText>
					<div className="center">
						<p className="alert">
							{ this.state.alert }
						</p>
					</div>
					<div>
						<TextField
							floatingLabelText="Enter your new to-do here !"
							fullWidth={true}
							multiLine={true}
							rows={1}
							onChange={ this.newTodoChange }
							value={ this.state.newTodo }
						/>
					</div>
					<div className="center">
						<FloatingActionButton onClick={ this.add.bind(this, this.state.newTodo) }>
							<ContentAdd />
						</FloatingActionButton>
					</div>
				</CardText>
			</Card>
			<br /><br />
			<Card className="card">
				<CardTitle subtitle="My to-do List" />
				<CardText>
					{this.state.todos.length > 0 ? (
						<ul>
							{
								this.state.todos && this.state.todos.map((todo) =>
									<li key={ todo._id }>
										<p className={ todo.done ? 'todo-done' : 'todo-undone' }>
											{ todo.title }
										</p>
										<div className="right">
											<RaisedButton label={ todo.done ? 'Mark as undone' : 'Mark as done' } primary={true} onClick={ this.toggle.bind(this, todo._id) } />
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<RaisedButton label="Delete" secondary={true} onClick={ this.delete.bind(this, todo._id) } />
										</div>
										<hr />
									</li>
								)
							}
						</ul>
					) : (
						<div className="center">
							<p className="alert">
								There's nothing on your list !
							</p>
						</div>
					)}
				</CardText>
			</Card>
		</div>;
	}
}
