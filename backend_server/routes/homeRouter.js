var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("inside homeRouter")
  res.send('respond with a resource');
});

router.get('/:UID', function(req, res, next) {
  console.log("inside homerouter UID");

});

module.exports = router;
