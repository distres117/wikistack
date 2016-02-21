var router = require('express').Router();
var models = require('../models/models.js');
var Page = models.Page;
var User = models.User;

router.route('/')
  .get (function(req,res, next){
  res.redirect('/');
  })
  .post (function(req, res, next){
      // req.body.urlTitle = generateUrl(req.body.title);
      var page = new Page(req.body);
      page.save()
      .then(function(){
        res.json(page);
        },
          function(err){
          if (err)
            next(err);
        });
      
  });

router.route('/add')
  .get (function(req, res){
    res.render('addpage');
  });

module.exports = router;
