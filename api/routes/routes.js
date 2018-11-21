'use strict';

module.exports = function(app) {
    
    var votes = require('../controllers/votesController');
    var candidates = require('../controllers/candidatesController');
    
    app.route('/api/votes')
        .get(votes.list_all_votes)
        .post(votes.create_a_vote);
    
    app.route('/api/votes/:voterId')
        .get(votes.read_a_vote)
        .put(votes.update_a_vote)
        .delete(votes.delete_a_vote);

    app.route('/api/candidates')
        .get(candidates.list_all_candidates)
        .post(candidates.create_a_candidate);
    
    app.route('/api/candidates/:candidateId')
        .get(candidates.read_a_candidate)
        .put(candidates.update_a_candidate)
        .delete(candidates.delete_a_candidate);

};