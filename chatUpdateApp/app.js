require('dotenv').config();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chatApp');


var app= require('express')();

var http=require('http').Server(app);

const userRouter = require('./routes/userRoute');

const User=require('./models/userModel');
app.use('/', userRoute);

const io=require('socket.io')(http);

var usp=io.of('/user-namespace');

usp.on('connection',async function(socket){
    console.log('user connected');

    var userId=socket.handshake.auth.token;

    User.findByIdAndUpdate({_id:userId},{$set:{is_online:'1'}})

    socket.on('disconnect',function(){
        console.log('user disconnected');
});

});
http.listen(4000,function(){
    console.log(`app listening at http://127.0.0.1:4000');
});

