var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/valids-intro');
var usersCollection = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  usersCollection.find({}, function(err, record){
    res.render('index', { title: 'Validations Exercise', allUsers: record });
  });
});

router.get('/index', function(req, res, next) {
  usersCollection.find({}, function(err, record){
    res.render('index', { title: 'Validations Exercise', allUsers: record });
  });
});

router.get('/new_user', function(req, res, next) {
  res.render('new_user', { title: 'Create New User' });
});

router.post('/index', function(req, res, next) {
  var errors = [];
  if (!req.body.inputName.trim()) {
    errors.push("Name can't be blank")
  }
  if (!req.body.inputEmail.trim()) {
    errors.push("Email can't be blank")
  }
  usersCollection.find({email: req.body.inputEmail},function(err, record){
    if(record.length){
      errors.push("Email not unique")
    }
    if (errors.length) {
      res.render('new_user', {errors: errors})
    } else {
      usersCollection.insert({name: req.body.inputName, email: req.body.inputEmail}, function () {
        res.redirect('/index')
      })
    }
  })
})


router.get('/:_id/delete', function(req, res, next){
  usersCollection.remove({_id: req.params._id}, function(err, record){
    usersCollection.find({}, function(err, record){
      res.render('index', {title: 'Deleted entry', allUsers: record})
    })
  })
})

module.exports = router;
