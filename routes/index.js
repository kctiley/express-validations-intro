var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new_user', function(req, res, next) {
  res.render('new_user', { title: 'Create New User' });
});

module.exports = router;
