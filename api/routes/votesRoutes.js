'use strict';

module.exports = function(app) {
    
    var votes = require('../controllers/votesController');
    
    app.route('/votes')
        .get(votes.list_all_votes)
        .post(votes.create_a_vote);
    
    app.route('/votes/:voterId')
        .get(votes.read_a_vote)
        .put(votes.update_a_vote)
        .delete(votes.delete_a_vote);

};