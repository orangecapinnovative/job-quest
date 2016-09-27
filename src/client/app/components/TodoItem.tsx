import * as React from 'react';

/** This is dumb component */
export default (props: ITodo) => (
  <li
    style={{ textDecoration: props.done ? 'line-through' : 'initial' }}
    onClick={this.toggle.bind(this, props._id)}>
    {props.title}
    <button onClick={this.delete.bind(this, props._id)}>Delete</button>
  </li>
)