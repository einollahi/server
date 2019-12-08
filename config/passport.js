const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const {User} = require('../db/db');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
      where: {id},
      raw: true});

    return done(null, user);
  } catch (e) {
    console.log('---->');
    return done(e);
  }
});

passport.use('local', new LocalStrategy((username, password, done) => {

  User.findOne({where: {username}}).then(user => {

    if (!user) return done(null, false, {msg: 'user is not found'});

    if (!bcrypt.compareSync(password, user.password)) return done(null, false, {msg: 'password is not correct'});

    return done(null, user.get({plain: true}));
  }).catch(e => {
    done(e)
  });
}));
