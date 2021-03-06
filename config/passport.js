var LocalStrategy = require('passport-local').Strategy;

// loads user model
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {


// ***passport session setup***

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


// ***LOCAL SIGNUP*** 

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        // console.log(req.body); USE REQ.BODY
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err) return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.firstName = req.body.firstName;
                newUser.local.workAddress = req.body.workAddress;
                newUser.local.workCity = req.body.workCity;
                newUser.local.workState = req.body.workState;
                newUser.local.workZip = req.body.workZip;
                newUser.local.homeAddress = req.body.homeAddress;
                newUser.local.homeCity = req.body.homeCity;
                newUser.local.homeState = req.body.homeState;
                newUser.local.homeZip = req.body.homeZip;

                // save the user
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

// ***LOCAL LOGIN***

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, callback) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) return callback(err);

            // if no user is found, return the message
            if (!user){
                return callback(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return callback(null, user);
        });

    }));

};
