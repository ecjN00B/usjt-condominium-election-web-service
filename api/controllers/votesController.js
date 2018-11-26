'use strict';

var mongoose = require('mongoose'),
    Votes = mongoose.model('Votes');

exports.list_all_votes = function(req, res) {
   Votes.find({}, function(err, vote) {
      if (err)
         res.sendStatus(500); /** Internal Server Error */
      if (vote.length)
         res.status(200).json(vote); /** Ok */
      else
         res.sendStatus(404); /** Not Found */
   });
};

exports.create_a_vote = function(req, res) {
   var new_vote = new Votes(req.body);
   new_vote.save(function(err, vote) {
      if (err)
         res.sendStatus(500); /** Internal Server Error */
      res.sendStatus(201); /** Created */
   });
};