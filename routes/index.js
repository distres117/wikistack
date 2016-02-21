var router = require('express').Router();

router.get('/', function(req,res){
  res.render('index', {title: "Home Route"});
});

module.exports = router;
