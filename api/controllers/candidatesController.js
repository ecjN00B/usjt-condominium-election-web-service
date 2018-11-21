'use strict';

var mongoose = require('mongoose'),
    Candidates = mongoose.model('Candidates');

exports.list_all_candidates = function(req, res) {
   Candidates.find({}, function(err, candidate) {
      if (err)
        res.send(err);
      res.json(candidate);
   });
};

exports.create_a_candidate = function(req, res) {
   var new_candidate = new Candidates(req.body);
   new_candidate.save(function(err, candidate) {
        if (err)
            res.send(err);
        res.json(candidate);
   });
};

exports.read_a_candidate = function(req, res) {
    Candidates.findOne({ _id: req.params.candidateId }, function(err, candidate) {
       if (err)
          res.send(err);
       res.json(candidate);
    });
 };
 
 exports.update_a_candidate = function(req, res) {
    Candidates.findOneAndUpdate({ _id: req.params.candidateId }, req.body, {new: true}, function(err, candidate) {
       if (err)
          res.send(err);
       res.json(candidate);
    });
 };
 
 exports.delete_a_candidate = function(req, res) {
    Candidates.deleteOne({
       _id: req.params.candidateId
    }, function(err, candidate) {
       if (err)
          res.send(err);
       res.json({ message: 'Candidate successfully deleted' });
    });
 };