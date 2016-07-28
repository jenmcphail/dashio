// requires dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// creates new express app
var configDB = require('./config/database.js');
// configures and connects to db
mongoose.connect(configDB.url);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended:true})); // get information from html forms

app.use(express.static('./public'));

// required for passport
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persists login sessions
app.use(flash()); // enables flash messages

// requires routes
require('./routes.js')(app, passport);

app.listen(process.env.PORT || 3000, function(){
  console.log("server running on port " + (process.env.PORT ||3000);
});