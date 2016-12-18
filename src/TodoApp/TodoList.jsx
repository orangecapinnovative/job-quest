import React from 'react';
import 'whatwg-fetch';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <ul className="todoApp__list">
            {this.props.items && this.props.items.reverse().map(item =>
                <TodoItem key={item._id} item={item} onToggle={this.props.onToggle} onDelete={this.props.onDelete} />
            )}
        </ul>;
    }
}

TodoList.propTypes = {
    items: React.PropTypes.array,
    onToggle: React.PropTypes.func,
    onDelete: React.PropTypes.func,
};

TodoList.defaultProps = {
    items: []
};