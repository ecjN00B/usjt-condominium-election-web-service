'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidatesSchema = new Schema({
   name: {
      type: String
   },
   number: {
      type: Number
   }
});

module.exports = mongoose.model('Candidates', candidatesSchema);