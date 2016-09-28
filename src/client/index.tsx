/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import App from './app/Root';
import { Provider } from 'react-redux';
import Store from './app/Store';

const renderTemplate = (HTML?) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Todo App</title>
    <style>
      #mount-point { opacity:0; }
    </style>
  </head>
  <body>
    <div id="mount-point">${HTML}</div>
    <script src='/dist/bundle.js' charset='UTF-8'></script>
  </body>
</html>
`;


function handlerFactory() {
  return {
    view: function (req: express.Request, res: express.Response) {
      res.send(renderTemplate(renderToString(
      <Provider store={Store}>
        <App />
      </Provider>
      )));
    },
  };
}


export function Router() {
  const router = express.Router();

  router.get('/', handlerFactory().view);


  return router;
}
