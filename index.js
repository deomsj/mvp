var mongoose = require('mongoose');
var express = require('express');
var app = express();

//borrow ES6 default promise library for use with mongoose
mongoose.Promise = global.Promise;

// connect to mongo db named "gymLeaders"
mongoose.connect('mongodb://localhost/gymLeaders');

//log message when connection to db has been established
mongoose.connection.once('open', function() {
  console.log('connected to database');
}).on('error', function(error) {
  console.log('Connection error: ', error);
});

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/client'));

app.listen(app.get('port'), function() {
  console.log('Algebra Gym App listening on port: ', app.get('port'));
});