var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users/new_user', function(req, res, next) {
  res.render('new_user');
});

module.exports = router;
