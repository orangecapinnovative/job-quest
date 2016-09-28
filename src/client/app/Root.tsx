import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import TodoList from './containers/TodoList';
import TodoForm from './containers/TodoForm';

import Store from './Store';

const styles = require('./Styles.scss');

export default class TodoApp extends React.Component<{}, {}>{
  render() {
    return (
      <Provider store={Store}>
        <div className={styles.container}>
          <TodoForm />
          <TodoList />
        </div>
      </Provider>
    );
  }
}