'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
   candidate: {
      type: String
   },
   voted_date: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Votes', msgSchema);