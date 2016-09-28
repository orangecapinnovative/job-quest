import * as React from 'react';

/** This is dumb component */
interface TodoItemProps extends ITodo{
  onToggle?(id: number);
  onDelete?(id: number);
}
export default (props: TodoItemProps) => (
  <li
    style={{ textDecoration: props.done ? 'line-through' : 'initial' }}
    onClick={() => props.onToggle(props._id)}>
    {props.title}
    <button onClick={() => props.onDelete(props._id)}>Delete</button>
  </li>
)