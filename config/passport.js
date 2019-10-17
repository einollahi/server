const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../db/models/user');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({where: {id}})
    .then(user => {
      if (user) {
        return done(null, user.id);
      }
      return done(null);
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({where: {username}});

      if (!user) {
        return done(null, false, {msg: 'user is not found'});
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {msg: 'password is not correct'});
      }

      return done(null, user);
    } catch (e) {
      done(err);
    }
  })
);
