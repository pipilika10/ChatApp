
const User=require('../models/userModel');
const bcrypt=require('bcrypt');


const registerLoad=async(req,res)=>{

    try{
       const passwordHash= await bcrypt.hashSync(req.body.password,10);
        const user= new User({
            username: req.body.username,
            useremail: req.body.useremail,
            password:passwordHash,
            image:'img/'+ req.file.filename
    });

    await user.save();

    res.render('register',{message:'User registered successfully'});
}catch(err){
        console.log(err.message);
    }

}

const loadIndex=async(req,res)=>{

    try{
        res.render('index');
    }
    catch(err){
        console.log(err.message);
    }
}

    const register=async(req,res)=>{
        try{
            res.render('register');
        }
        catch(err){
            console.log(err.message);
        }

}
const loadLogin=async(req,res)=>{

    try{
        res.render('login');
    }
    catch(err){
        console.log(err.message);
    }
}

const login=async(req,res)=>{

    try{
        const useremail=req.body.useremail;
        const password=req.body.password;

        const userData=await User.findOne({useremail:useremail});
        if(userData){
            const passwordMatch=bcrypt.compare(password,userData.password);
            if(passwordMatch){
                    
                req.session.user=userData;
                res.redirect('/dashboard');
            }
            else{
                res.render('login',{message:'Invalid Email or Password'});
            }
        }
    }
    catch(err){
        console.log(err.message);
    }
}


const loadDashboard=async(req,res)=>{
    try{

        var users= User.find({ _id:{ $nin: [req.session.user. _id ] } } );
        res.render('dashboard',{user:req.session.user, users:users});
    }
    catch(err){
        console.log(err.message);
    }
}

const logout=async(req,res)=>{

    try{
       req.session.destroy();
       res.redirect('/');
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports={
    loadIndex,
    registerLoad,
    register,
    login,
    loadLogin,
    loadDashboard,
    logout
}