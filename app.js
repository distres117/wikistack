var express = require('express'),
  bodyParser = require('body-parser'),
  wikiRoutes = require('./routes/wikiRoutes.js'),
  morgan = require('morgan'),
  swig = require('swig'),
  app = express();

require('./filters/filters')(swig);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile );
swig.setDefaults({cache: false});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRoutes);
//error handling
app.use(function(err,req,res,next){
  if(err){
    console.log(err);
    res.status(500).send(err);
  }

});

module.exports = app;
