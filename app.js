var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = require('./config/routes');
var config = require('./config/app');

mongoose.connect(config.databaseUrl);

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: config.appUrl,
  credentials: true
}));

app.use('/', router);

app.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});