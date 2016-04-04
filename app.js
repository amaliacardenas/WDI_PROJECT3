var express           = require('express');
var morgan            = require('morgan');
var mongoose          = require('mongoose');
var bodyParser        = require('body-parser');
var cors              = require('cors');
var app               = express();
var server            = require('http').createServer(app);
var io                = require('socket.io')(server);
var router            = require('./config/routes');
var config            = require('./config/app');

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

io.on('connect', function(socket){
  console.log("User connected with socket id of: " + socket.conn.id);
  socket.on('checkin', function(user){
    console.log("User has checked in ", user);
    io.emit('checkin', user);
  });
});

server.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});