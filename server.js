//var express = require('express')
//var app = express();
//
//app.set('port', (process.env.PORT || 5000))
//app.use(express.static(__dirname + '/public'))
//
//app.get('/', function(request, response) {
//  response.send('Hello World!')
//})
//
//app.listen(app.get('port'), function() {
//  console.log("Node app is running at localhost:" + app.get('port'))
//})

var express = require('express'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    configDB = require('./config/database.js');

var app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
//+++ Configuration ++++
// set up our express application
app.use(logger('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Connect to DB
mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open', function callback () {
    console.log("DB connected successful...")
});

//+++ Routes +++
require('./routes/routes.js')(app,express);



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})