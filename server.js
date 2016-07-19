// requires express and body-parser
var express=require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./resources/auth');

// creates new express app
var app = express();

// require and load dotenv
require('dotenv').load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));


// connect to mongodb
mongoose.connect('mongodb://localhost/angular_auth');

// require User and Post models
var User = require('./models/user');

/*
 * API Routes
 */

app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    res.send(user.populate('posts'));
  });
});

app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.zipCode = req.body.zipCode || user.zipCode;
    user.workZipCode = req.body.workZipCode || user.workZipCode;
    user.save(function(err) {
      res.send(user);
    });
  });
});


/*
 * Auth Routes
 */

app.post('/auth/signup', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      zipCode: req.body.zipCode,
      workZipCode: req.body.workZipCode,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
});

app.post('/auth/login', function (req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      res.send({ token: auth.createJWT(user) });
    });
  });
});



app.get('/', function (req, res) {
  res.sendFile('views/sign_in.html' , { root : __dirname});
});

app.get('/home', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


app.listen(3000, function(){
  console.log("server running on local host 3000!")
});