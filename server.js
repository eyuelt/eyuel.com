var express = require('express');
var routes = require('./src/routes/index');
var app = module.exports = express();

//config
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/src/public'));

//routes
app.get('/', routes.homepage);
app.get('*', routes.notfound);

//start server
app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
