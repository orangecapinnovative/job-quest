import React from 'react';
import 'whatwg-fetch';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.setState({done: this.props.item.done});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({done: nextProps.item.done});
    }
    handleToggle(id) {
        this.setState({done: !this.state.done});
        this.props.onToggle(id);
    }
    handleDelete(id, e) {
        this.props.onDelete(id, e);
    }
    render() {
        return <li className="todoApp__list__item">
            <label htmlFor={this.props.item._id} className={ this.props.item.done? 'done': '' }>
                <input id={this.props.item._id} className="flag" type="checkbox" onChange={this.handleToggle.bind(this, this.props.item._id)} checked={this.state.done} />
                { this.props.item.title }
            </label>
            <button className="btn-delete"
                    onClick={this.handleDelete.bind(this, this.props.item._id)}>
                <i className="fa fa-trash-o"></i>
            </button>
        </li>;
    }
}

TodoItem.propTypes = {
    item: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    onDelete: React.PropTypes.func,
};