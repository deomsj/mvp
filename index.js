var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var Leader = require('./models/leaders');
var app = express();

//////////////////////////////////////////
//Set up mono database with mongoose
//////////////////////////////////////////

// connect to mongo db named "gymLeaders"
var localURI = 'mongodb://localhost/gymLeaders';
var mLabURI = 'mongodb://algebragymmember:algebrain@ds131480.mlab.com:31480/heroku_8h9km61t';
mongoose.connect(mLabURI);

//borrow ES6 default promise library
mongoose.Promise = global.Promise;

//log message when connection to db has been established
var db = mongoose.connection;
db.once('open', function() {
  console.log('connected to database');
}).on('error', function(error) {
  console.log('Connection error: ', error);
});

//////////////////////////////////////////
//Set up express server
//////////////////////////////////////////

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Algebra Gym App listening on port: ', app.get('port'));
});

//serving up files to the client
app.use(express.static(__dirname + '/client'));

// parse application/json
app.use(bodyParser.json());

//////////////////////////////////////////
//back end routing with express
//////////////////////////////////////////

//respond to post request from client by
//adding new leader to db
app.post('/api/leaders', function(req, res, next) {
  var name = req.body.name;
  var score = req.body.score;

  var newLeader = new Leader({
    name: name,
    score: score
  });

  newLeader.save(function(err, newLeader) {
    if (err) {
      consele.log('error trying to save to db');
    } else {
      res.status(200);
      res.end('saved to db!');
      next();
    }
  });
});

//respond to get request from client by sending
//an array of Leaders from db to the client
app.get('/api/leaders', function(req, res, next) {
  Leader.find(function (err, leaders) {
    if (err) {
      console.log('error trying to get data from db');
    } else {
      res.send(leaders);
    }
  });
});

module.exports = db;