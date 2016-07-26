var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/circleMenu', function (req, res, next) {
  res.render('circleMenu');
});


module.exports = router;
