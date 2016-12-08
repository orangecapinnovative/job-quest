'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = () => (
	<MuiThemeProvider>
		<TodoApp />
	</MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById('mount-point')
);
