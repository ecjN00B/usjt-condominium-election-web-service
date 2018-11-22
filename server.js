require('dotenv').config();

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Candidates = require('./api/models/candidatesModel'),
    Votes = require('./api/models/votesModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, 
    {useNewUrlParser: true }, (err) => { 
        (err) ? console.log(`Some problem with the connection ${err}`) : console.log('The Mongoose connection is ready');
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization")
    next();
});

var routes = require('./api/routes/routes');

routes(app);
app.listen(port);

console.log('Votes RESTful API server started on: ' + port);