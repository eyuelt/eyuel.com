var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
  var body = '<html><head><title>Hello</title></head><body>';
  body += '<center><img src="/cookies" /></center>';
  body += '</body></html>';
  res.send(body);
});

app.get('/error', function(req, res) {
  console.log("Throwing error");
  console.log(req.url);
  throw "oops thats an error";
});

app.get('/cookies', function(req, res) {
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  var img = fs.readFileSync('./resources/cookies.jpg');
  res.end(img, 'binary');
});

app.listen(8080);
console.log('Listening on port 8080');
