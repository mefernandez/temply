var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('dashboard/login.html');
});

router.get('/', function(req, res, next) {
  res.render('dashboard/tickets.html');
});

router.get('/tickets', function(req, res, next) {
  res.render('dashboard/tickets.html');
});

router.get('/clients', function(req, res, next) {
  res.render('dashboard/clients.html');
});

module.exports = router;
