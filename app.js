var express = require('express');

var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var templyEngineFactory = require('temply-express');
var config = require('./config/config.js')();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy, util = require('util')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = '949398258429-ncn30qm3eu3gd7v4p1163sno76v9l0n2.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'W5jXPiEcb4P1xhC8Y5V-UcdJ';


var app = express();

// TODO Move this out of this file
// http://expressjs.com/advanced/developing-template-engines.html
var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];

var templyEngine = templyEngineFactory(pluginsRepository);
app.engine('html', templyEngine);

// view engine setup
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//FIXME no funcionando
//app.use(require('connect-livereload')());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/template', express.static(path.join(__dirname, 'template')));
app.use('/vendor', express.static(path.join(__dirname, 'bower_components')));

app.use('/app', ensureAuthenticated, require('./routes/private'));
app.use('/', require('./routes/public'));


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: config.domain+'/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      if(profile.emails[0].value.indexOf(config.company)>0){
        return done(null, profile);
      }
      return done(null, false);
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    //TODO: Client implementatio    
    return done(null, false);
    /*
    var user = {id: 1, username: 'admin', password: 'admin'};
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    */
  }
));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*
    res.render('error', {
      message: err.message,
      error: err
    });
    */
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*
  res.render('error', {
    message: err.message,
    error: {}
  });
  */
  res.send(err.message);
});

module.exports = app;
