var express=require('express');
var app = express();

app.use(express.static(__dirname + '/views'))

app.listen(3000);
console.log("server running on local host 3000!")