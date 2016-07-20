// requires dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// creates new express app
var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use('/static', express.static('./public'));


// configures and connects to db
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// required for passport
// require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persists login sessions
app.use(flash()); // enables flash messages

// requires routes
require('./routes.js')(app, passport);

app.listen(3000, function(){
  console.log("server running on local host 3000!")
});