var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: '4J Class Project' });
  res.redirect('game');
});

module.exports = router;
