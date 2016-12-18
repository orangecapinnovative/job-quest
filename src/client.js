import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';

// import stylesheet
import './app.scss';

ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point'),
);
