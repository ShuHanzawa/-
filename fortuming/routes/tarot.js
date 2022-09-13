var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tarot', function(req, res, next) {
  res.render('tarot-top', { title: 'Express' });
});

router.get('/tarot/choice', function(req, res, next) {
  res.render('tarotChoice', { title: 'Express' });
});

router.get('/tarot/result', function(req, res, next) {
  res.render('tarotResult', { title: 'Express' });
});

module.exports = router;
