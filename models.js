'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shortAnswer = (a, b) => {
  if(a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.updatedAt - a.updatedAt;
};

const AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

AnswerSchema.methods.update = function(update, callback) {
  Object.assign(this, update, {updatedAt: new Date()});
  this.parent().save(callback);
};

AnswerSchema.methods.vote = function(vote, callback) {
  if (vote === 'up') {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
};

const QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
});

QuestionSchema.pre('save', function(next) {
  this.answers.sort(shortAnswer);
  next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;