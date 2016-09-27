/// <reference path="../typings/index.d.ts" />

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as api from './api/index';

var cors = require('cors');

if(process.env.PRODUCTION) {
  mongoose.connect('mongodb://localhost:27017/jobQuestAutumn2016');
} else {
  const Engine = require('tingodb')();
  const db = new Engine.Db(path.join(__dirname, '/db'), { });
  mongoose.connect('tingodb:///' + path.join(__dirname, '/db'));
}

const app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(api.Router());
app.get('/', (req, res) => res.send('Hi, fork'));

export function start(port){
  app.listen(port, function(){
    console.log(`server up at ${port}`)
  })
}