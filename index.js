var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log('test');
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Algebra Gym App listening on port 3000');
});