var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var Leader = require('./models/leaders');
var app = express();

//borrow ES6 default promise library for use with mongoose
mongoose.Promise = global.Promise;

// connect to mongo db named "gymLeaders"
mongoose.connect('mongodb://localhost/gymLeaders');

//log message when connection to db has been established
var db = mongoose.connection;
db.once('open', function() {
  console.log('connected to database');
}).on('error', function(error) {
  console.log('Connection error: ', error);
});

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/client'));


app.listen(app.get('port'), function() {
  console.log('Algebra Gym App listening on port: ', app.get('port'));
});

///////////////////////////////
//back end routing with express
///////////////////////////////

// parse application/json
app.use(bodyParser.json());

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