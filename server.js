var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Candidates = require('./api/models/candidatesModel'),
    Votes = require('./api/models/votesModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votesdb', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');

routes(app);
app.listen(port);

console.log('Votes RESTful API server started on: ' + port);