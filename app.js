var express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  morgan = require('morgan'),
  swig = require('swig'),
  app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile );
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(routes);

module.exports = app;
