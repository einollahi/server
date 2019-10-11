const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }

    req.logIn(user, (err) => {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message: 'Logged in Successfully'});
    });

  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({message: 'Logged out Successfully'});
});


module.exports = router;
