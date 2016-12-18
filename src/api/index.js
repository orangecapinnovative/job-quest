var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var cors = require('cors')
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/jobQuestAutumn2016');
var Todo = mongoose.model('Todo', new Schema({
  title: String,
  done: {type:Boolean,default:false}
}));

app.get('/', function(req, res){
  Todo.find(function(err, todos){
    res.send(todos);
  });
});

app.post('/', function(req, res) {
  var todo = new Todo(req.body);
  todo.save(function(){
    res.send({message:'Success'});
  })
});

app.delete('/:id', function(req,res) {
  Todo.remove({_id:req.params.id},function() {
    res.send({msg:"deleted"});
  });
});

app.post('/:id/toggle', function(req,res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (todo.done) {
      Todo.findByIdAndUpdate(req.params.id, {done:false}, function(){res.send({message:'success'})});
    } else {
      Todo.findByIdAndUpdate(req.params.id, {done:true}, function(){res.send({message:'success'})});
    }
  })
});

app.post('/toggleAll', function(req, res) {
  Todo.update({}, {done: req.body.checkedAll}, {multi: true}, function () {
    res.send({message: 'success'})
  });
});

app.get('/filter/:type', function(req,res) {
  Todo.find({done: req.params.type === 'done'}, function(err, todos) {
    res.send(todos)
  });
});

app.listen(3001,function(){
  console.log('[API] listening to port '+ 3001);
});
