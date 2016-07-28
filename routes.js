var User = require('./models/user.js');

module.exports = function(app, passport) {



// ***Logic to ensure user is logged in***
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    next();
}

// ***Gets Home Page***
    app.get('/', function(req, res) {
        res.sendFile( __dirname + '/views/index.html', { req: req.user });
    });

// ***Gets log in form***
    app.get('/login', function(req, res) {
        res.sendFile( __dirname + '/views/login.html', { req: req.user })
    });


// ***Posts to log in route (logs user in) ***
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: false
    }))

// ***Gets the sign up form***
    app.get('/signup', function(req, res) {
        res.sendFile( __dirname + '/views/signup.html', { message: req.flash('signupMessage') });
    });

// ***Posts to sign up route (lets the user sign up)***
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup',
        failureFlash : true 
    }), function(req, res) {
            res.redirect('/profile', req.user);

    });

// ***Gets the profile page only if user is logged in***
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log('user', req.user._id);
        console.log("at profile");
        res.sendFile( __dirname + '/views/profile.html', { user : req.user });
    });

// *** Hits the logout route to redirect to home ***
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



// ***Gets Users API ***
  app.get('/api/users', function (req, res) {
    User.find(function (err, users) {
      if (err)
        res.send(err);
 
      res.json(users);
    });
  });
};

