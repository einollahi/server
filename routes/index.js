const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(501).json(err);
    }
    if (!user) {
      return res.status(501).json(info);
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(501).json(err);
      } else {
        const token = jwt.sign({
          userId: req.user.id,
          username: req.user.username,
          email: req.user.email
        }, 'secretCode', {expiresIn: '7 days'});


        return res.status(200).json({
          message: 'Logged in Successfully',
          token: token
        });
      }
    });
  })(req, res, next);
});

router.get('/user/logout', (req, res) => {
  req.logout();
  res.status(200).json({message: 'Logged out Successfully'});
});

module.exports = router;
