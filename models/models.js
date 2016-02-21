var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new Schema({
  title: String,
  urlTitle: String,
  content: String,
  date: {type: Date, default: Date.now},
  status: Boolean,
  author: String
});

var userSchema = new Schema({
  name: String,
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);
