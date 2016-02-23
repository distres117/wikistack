var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = {
  values: ['open', 'closed'],
  message: 'needs to be either open or closed'
};

var pageSchema = new Schema({
  title: {type: String, required: true},
  urlTitle: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  status: {type:String, enum:statuses},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags: []
});

pageSchema.virtual('route').get(function(){
    return '/wiki/' + this.urlTitle;
});
pageSchema.pre('validate', function(next){
        this['urlTitle'] = generateUrl(this.title);
        next();
});
pageSchema.pre('save', function(next){
        this.tags = this.tags[0].split(" ");
        next();
});
pageSchema.statics.findbyTag = function(tagname, cb){
     Page.find({
      tags: {$elemMatch : {$eq: tagname}}
    })
     .then(function(arr){
        cb(arr);
     });
};
pageSchema.methods.findSimilar = function(){
  return this.model('Page').find({
    tags:{ $in: this.tags },
    urlTitle: {$ne: this.urlTitle}
    });
};

var userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});


userSchema.statics.findOrCreate = function(username, email, cb){
  User.findOne({name: username})
  .then(function(user){
      if(!user){
        var newUser = new User({name: username, email: email});
        newUser.save()
        .then(function(){
          cb(newUser);
        });
      }
      else
        cb(user);
  })
};


function generateUrl(str){
  if(!str){
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
  var newString = str.replace(/\s+/g, "_");
  return newString.replace(/[^\w\d\_]/g, "");
}


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {Page, User};
