var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  console.log('test');
  res.sendFile('client/index.html', { root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log('Algebra Gym App listening on port: ', app.get('port'));
});