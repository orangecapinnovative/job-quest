import * as React from 'react';
import { render } from 'react-dom';

import TodoApp from './Root';

render(
    <TodoApp />,
    document.getElementById('mount-point')
);
