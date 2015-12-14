var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('dashboard/login.html');
});

router.get('/login', function(req, res, next) {
  res.render('dashboard/login.html');
});

router.post('/login',
  passport.authenticate('local', { 
  	successRedirect: '/app/tickets',
  	failureRedirect: '/login',
    failureFlash: true 
	})
);

router.get('/tickets', function(req, res, next) {
  res.render('dashboard/tickets.html');
});

router.get('/clients', function(req, res, next) {
  res.render('dashboard/clients.html');
});


module.exports = router;
