import * as mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  _id: Number,
  word: String
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
