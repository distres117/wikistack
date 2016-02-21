var router = require('express').Router();
var models = require('../models/models.js');
var Page = models.Page;
var User = models.User;

router.route('/')
  .get (function(req,res, next){
    User.find()
    .then(function(users){
      res.render('users', {users: users || []});
    }, function(err){
        next(err);
    });
  });

  router.route('/:id')
  .get (function(req,res, next){
    User.findById(req.params.id)
    .then(function(user){
      Page.find({
        author: user._id
      }).then(function(pages){
        user['pages']=pages;
        res.render('user', user);
      })
      //res.render('user', user);
    }, function(err){
        next(err);
    });
  });

  module.exports = router;


