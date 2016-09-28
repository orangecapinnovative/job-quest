/// <reference path="../typings/index.d.ts" />

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';

var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/jobQuestAutumn2016');


const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/api', (req, res) => res.send('Hi, fork'));

app.use('/api/todo',require('./api/index').Router());
app.use(require('./client/index').Router());
app.use('/dist', express.static(path.join(__dirname)))

export function start(port){
  app.listen(port, function(){
    console.log(`server up at ${port}`)
  })
}