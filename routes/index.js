var express = require('express');
var router = express.Router();

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
