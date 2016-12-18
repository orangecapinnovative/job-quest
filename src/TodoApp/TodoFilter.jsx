import React from 'react';
import 'whatwg-fetch';

export default class TodoFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        };
        this.handleFilter = this.handleFilter.bind(this);
    }
    handleFilter(type) {
        this.setState({ type: type });
        this.props.onFilter(type);
    }
    componentDidMount() {
        this.setState({ type: this.props.type });
    }
    render() {
        return <ul className="todoFilter">
            <li><a onClick={this.handleFilter.bind(this, 'all')} className={ this.state.type === 'all'? 'active': '' }>Show all</a></li>
            <li><a onClick={this.handleFilter.bind(this, 'todo')} className={ this.state.type === 'todo'? 'active': '' }>Remain</a></li>
            <li><a onClick={this.handleFilter.bind(this, 'done')} className={ this.state.type === 'done'? 'active': '' }>Done</a></li>
        </ul>;
    }
}

TodoFilter.propTypes = {
    type: React.PropTypes.string,
    onFilter: React.PropTypes.func
};
