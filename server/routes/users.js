var router = require('express').Router();

//Loading Note Model js
var User = require('../models/user');

// Create a new user
router.post('/', function(req, res) {
  var user = new User({
    username: req.body.user.username,
    name: req.body.user.name
  });

  user.save().then(function(userData) {
    res.json({
      message: 'Thanks for signing up!',
      user: userData
    });
  });
});

module.exports = router;
