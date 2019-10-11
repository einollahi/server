const router = require('express').Router();
const dic = require('../dictionary');

router.get('/', function(req, res, next) {
  res.status(200).json(dic);
});

module.exports = router;
