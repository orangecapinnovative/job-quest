import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('Todo', new Schema({
  title: String,
  done: {type:Boolean,default:false}
}));