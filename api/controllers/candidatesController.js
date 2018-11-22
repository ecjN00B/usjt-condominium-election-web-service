'use strict';

var mongoose = require('mongoose'),
    Candidates = mongoose.model('Candidates');

exports.list_all_candidates = function(req, res) {
   Candidates.find({}, function(err, candidate) {
      if (err)
         res.sendStatus(500); /** Internal Server Error */
      if (candidate.length)
         res.status(200).json(candidate); /** Ok */
      else
         res.sendStatus(404); /** Not Found */
   });
};

exports.create_a_candidate = function(req, res) {
   Candidates.findOne({ "number": req.body.number }, function(err, candidate) {
      if (candidate)
         res.sendStatus(409); /** Conflict */
      else {
         var new_candidate = new Candidates(req.body);
         new_candidate.save(function(err, candidate) {
            if (err)
               res.sendStatus(500); /** Internal Server Error */
            res.sendStatus(201); /** Created */
         });
      }
   });
};

exports.read_a_candidate = function(req, res) {
   Candidates.findOne({ _id: req.params.candidateId }, function(err, candidate) {
      if (mongoose.Types.ObjectId.isValid(req.params.candidateId)) {
         if (err)
            res.sendStatus(500); /** Internal Server Error */
         if (candidate)
            res.status(200).json(candidate); /** Ok */
         else
            res.sendStatus(404); /** Not Found */
      } else {
         res.sendStatus(400); /** Bad Request */
      }
   });
 };
 
 exports.update_a_candidate = function(req, res) {
   Candidates.findOne({ "number": req.body.number }, function(err, candidate) {
      if (candidate)
         res.sendStatus(409); /** Conflict */
      else {
         if (mongoose.Types.ObjectId.isValid(req.params.candidateId)) {        
            Candidates.findOneAndUpdate({ _id: req.params.candidateId }, req.body, {new: true}, function(err, candidate) {
               if (err)
                  res.sendStatus(500); /** Internal Server Error */
               res.sendStatus(200); /** Ok */
            });
         } else {
            res.sendStatus(400); /** Bad Request */
         }
      }
   });
 };
 
 exports.delete_a_candidate = function(req, res) {
   Candidates.findOne({ "number": req.body.number }, function(err, candidate) {
      if (!candidate)
         res.sendStatus(404); /** Not Found */
      else {
         if (mongoose.Types.ObjectId.isValid(req.params.candidateId)) {        
            Candidates.deleteOne({
               _id: req.params.candidateId
            }, function(err, candidate) {
               if (err)
                  res.sendStatus(500); /** Internal Server Error */
               res.sendStatus(200); /** Ok */
            });
         } else {
            res.sendStatus(400); /** Bad Request */
         }
      }
   });
 };