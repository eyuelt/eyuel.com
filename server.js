var express = require('express');
var app = express();

app.get('/', function(req, res) {
  var body = 'Hello, world!\n' + req.url;
  res.send(body);
});

app.get('/error', function(req, res) {
  console.log("Throwing error");
  console.log(req.url);
  throw "oops thats an error";
});

app.listen(8080);
console.log('Listening on port 8080');
