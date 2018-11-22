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
   Votes.findOne({ 'voterId': req.body.voterId }, function(err, vote) {
      if (vote)
         res.sendStatus(409); /** Conflict */
      else {
         var new_vote = new Votes(req.body);
         new_vote.save(function(err, vote) {
            if (err)
               res.sendStatus(500); /** Internal Server Error */
            res.sendStatus(201); /** Created */
         });
      }
   });
};

exports.read_a_vote = function(req, res) {
   Votes.findOne({ 'voterId': req.params.voterId }, function(err, vote) {
      if (err)
         res.sendStatus(500); /** Internal Server Error */
      if (vote)
         res.status(200).json(vote); /** Ok */
      else
         res.sendStatus(404); /** Not Found */
   });
};

exports.update_a_vote = function(req, res) {
   Votes.findOne({ 'voterId': req.body.voterId }, function(err, vote) {
      if (!vote)
         res.sendStatus(404); /** Not Found */
      else {
         Votes.findOneAndUpdate({ 'voterId': req.params.voterId }, req.body, {new: true}, function(err, vote) {
            if (err)
               res.sendStatus(500); /** Internal Server Error */
            res.sendStatus(200); /** Ok */
         });
      }
   });
};

exports.delete_a_vote = function(req, res) {
   Votes.findOne({ 'voterId': req.params.voterId }, function(err, vote) {
      if (!vote)
         res.sendStatus(404); /** Not Found */
      else {
         Votes.deleteOne({
            'voterId': req.params.voterId
         }, function(err, vote) {
            if (err)
               res.sendStatus(500); /** Internal Server Error */
            res.sendStatus(200); /** Ok */
         });
      }
   });
};