var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/horoscope', function(req, res, next) {
  res.render('horoscopeTop', { title: 'Express' });
});

router.get('/horoscope/result', function(req, res, next) {
  res.render('horoscopeResult', { title: 'Express' });
});

module.exports = router;
