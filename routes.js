module.exports = function(app, passport) {

// ***Gets Home Page***
    app.get('/', function(req, res) {
         res.sendfile('index.html', { root: __dirname + '/views'});
    });

// ***Gets log in form***
    app.get('/login', function(req, res) {
        res.sendfile('login.html', { root: __dirname + '/views'}, { message: req.flash('loginMessage') }); 
    });

// ***Posts to login route (lets the user log in)***
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// ***Gets the sign up form***
    app.get('/signup', function(req, res) {
        res.sendfile('signup.html', { root: __dirname + '/views'}, { message: req.flash('signupMessage') });
    });

// ***Posts to sign up route (lets the user sign up)***
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// ***Gets the profile page only if user is logged in***
    app.get('/profile', isLoggedIn, function(req, res) {
        res.sendfile('profile.html', { root: __dirname + '/views'}, {
            user : req.user // get the user out of session and pass to template
        });
    });

// *** Hits the logout route to destroy the session and rediredt to home ***
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// ***Logic to ensure user is logged in***
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}