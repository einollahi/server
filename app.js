const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
// console.log(process.env.SECRET)

require('./db/db');
require('./config/passport');

const app = express();

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		store: new (require('connect-pg-simple')(session))({
			conString: 'pg://' + 'postgres' + ':' + '' + '@' + 'localhost' + '/' + 'urology'
		}),
		secret: 'Secret-Code-That-It-Is-Not-Secret',
		name: 'urology.sid',
		resave: true,
		autoreconnect: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
			httpOnly: false
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
