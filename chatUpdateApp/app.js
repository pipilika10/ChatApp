require('dotenv').config();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chatApp');


var app= require('express')();

var http=require('http').Server(app);

const userRouter = require('./routes/userRoute');

http.listen(3000,function(){
    console.log('app listening at http://127.0.0.1:3000')
})