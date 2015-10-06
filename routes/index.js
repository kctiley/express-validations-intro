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
  console.log("Firstname...." + req.body.inputFirstName);
  console.log("Email......" + req.body.inputEmail)
  usersCollection.insert({name: req.body.inputFirstName, email: req.body.inputEmail}, function(err, record){
    usersCollection.find({}, function(err, record){
      res.render('index', {title: 'New user created', allUsers: record});
    });
  });
});

router.get('/:_id/delete', function(req, res, next){
  usersCollection.remove({_id: req.params._id}, function(err, record){
    usersCollection.find({}, function(err, record){
      res.render('index', {title: 'Deleted entry', allUsers: record})
    })
  })
})

module.exports = router;
