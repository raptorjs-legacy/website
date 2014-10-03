var express = require('express');
var app = express();
//
//app.get('/', function(req, res){
//    res.send('Hello World');
//});
app.use(express.static(require('path').join(__dirname, '../raptorjs-legacy.github.io')));

app.listen(8090);
console.log('Server started. Website URL:\nhttp://localhost:8090/');
