import React from 'react';
import 'whatwg-fetch';

export default class TodoToggleAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false
        };
        this.handleToggleAll = this.handleToggleAll.bind(this);
    }
    componentDidMount() {
        this.setState({checkedAll: this.props.checkedAll});
    }
    handleToggleAll() {
        this.setState({checkedAll: !this.state.checkedAll});
        this.props.onToggleAll(!this.state.checkedAll);
    }
    render() {
        return <label htmlFor="checkedAll" style={{marginTop: '15px', cursor: 'pointer', fontSize: '18px', marginBottom: '0'}}>
            <input id="checkedAll" type="checkbox" onChange={this.handleToggleAll} checked={this.state.checkedAll} />
            &nbsp;&nbsp;&nbsp;Check all
        </label>;
    }
}

TodoToggleAll.propTypes = {
    checkedAll: React.PropTypes.bool,
    onToggleAll: React.PropTypes.func,
};