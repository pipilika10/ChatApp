const express=require('express');
const user_route=express();

const bodyParser=require('body-parser');

const session=require('express-session');
const{SESSION_SECRET}=process.env;
user_route.use(session({secret:SESSION_SECRET}));
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

user_route.use(express.static(__dirname+'/public'));

const path=require('path');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(_req,_file,cb){
        cb(null,path.join(__dirname,'../public/img'));
    },
    filename:function(_req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload=multer({storage:storage});
const userController=require('../controllers/userController');

const auth=require('../middlewares/auth');

app.get("/", (req, res) => {
    res.send("I will be shown on the Browser");
    console.log("I will be shown on the Terminal");
});
user_route.get('/register', userController.registerLoad);
user_route.post('/register', upload.single('img'), userController.register);

user_route.get('/login',userController.loadLogin);
user_route.post('/login',userController.login)
user_route.get('/logout',auth.isLogin, userController.logout);

user_route.get('/dashboard',userController.loadDashboard);
user_route.get("*", function(req,res){
    res.redirect('/');

});