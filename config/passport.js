require('./../config/config');
var mongoose = require('./../db/mongoose');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./../models/user");

passport.use('local-signin',
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      //console.log("signin starts", username, password, done);
      User.findOne({ "email": username }, function(err, user) {
        console.log(err, user);
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "User not found"
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Password is wrong"
          });
        }
        return done(null, user.toJSON());
      });
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(() => {
        User.findOne({ email: email }, function(err, user) {
          if (err) return done(err);
          if (user) {
            return done(
              null,
              false,
              req.flash("signupMessage", "That email is already taken.")
            );
          }
          var newUser = new User();
          newUser.email = email;
          newUser.setPassword(password);
          newUser.save(err => {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  console.log("serialize user object", user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize user object by id", id);
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

module.exports = passport;