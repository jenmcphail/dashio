// requires express and body-parser
var express=require('express');
var bodyParser = require('body-parser');

// creates new express app
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('views/sign_in.html' , { root : __dirname});
});

app.get('/home', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// app.post('/signup', function (req, res) {
  
// });

app.listen(3000, function(){
  console.log("server running on local host 3000!")
});