var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/horoscope', function(req, res, next) {
  res.render('horoscope', { title: 'Express' });
});

module.exports = router;
