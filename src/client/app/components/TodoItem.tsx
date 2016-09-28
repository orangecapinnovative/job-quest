import * as React from 'react';

const styles = require('./TodoItem.scss');
/** This is dumb component */
interface TodoItemProps extends ITodo {
  onToggle?(id: number);
  onDelete?(id: number);
}
export default (props: TodoItemProps) => (
  <li
    className={styles.container}
    onClick={() => props.onToggle(props._id)}>
    <span style={{ textDecoration: props.done ? 'line-through' : 'initial' }}>
      {props.title}
    </span>

    <button onClick={() => props.onDelete(props._id)}>Delete</button>
  </li>
);
