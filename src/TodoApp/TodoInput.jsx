import React from 'react';
import 'whatwg-fetch';

export default class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationError: false,
            title: ''
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }
    handleAdd(title, e) {
        if((e.charCode || e.which) === 13) {
            if (title) {
                this.props.onAdd(title);
                this.setState({title: ''});
            } else {
                this.setState({validationError: true});
            }
        }
    }
    onTitleChange(e) {
        this.setState({title: e.target.value, validationError: false});
    }
    render() {
        return <div className="todoInput">
            <input type="text"
                   className={this.state.validationError? 'todoInput__input error': 'todoInput__input'}
                   placeholder={this.state.validationError? 'Title is required!': 'New todo...'}
                   value={this.state.title}
                   onChange={this.onTitleChange}
                   onKeyPress={this.handleAdd.bind(this, this.state.title)} />
        </div>;
    }
}

TodoInput.propTypes = {
    onAdd: React.PropTypes.func
};