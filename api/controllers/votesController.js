'use strict';

var mongoose = require('mongoose'),
    Votes = mongoose.model('Votes');

exports.list_all_votes = function(req, res) {
   Votes.find({}, function(err, vote) {
      if (err)
        res.send(err);
      res.json(vote);
   });
};

exports.create_a_vote = function(req, res) {
   var new_vote = new Votes(req.body);
   new_vote.save(function(err, vote) {
      if (err)
         res.send(err);
      res.json(vote);
   });
};

exports.read_a_vote = function(req, res) {
   Votes.findOne({ 'voterId': req.params.voterId }, function(err, vote) {
      if (err)
         res.send(err);
      res.json(vote);
   });
};

exports.update_a_vote = function(req, res) {
   Votes.findOneAndUpdate({ 'voterId': req.params.voterId }, req.body, {new: true}, function(err, vote) {
      if (err)
         res.send(err);
      res.json(vote);
   });
};

exports.delete_a_vote = function(req, res) {
   Votes.deleteOne({
      'voterId': req.params.voterId
   }, function(err, vote) {
      if (err)
         res.send(err);
      res.json({ message: 'Vote successfully deleted' });
   });
};