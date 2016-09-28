import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface ITodoDocument extends ITodo, mongoose.Document {
  _id: any;
}
export default mongoose.model<ITodoDocument>('Todo', new Schema({
  title: String,
  done: {type:Boolean,default:false}
}));