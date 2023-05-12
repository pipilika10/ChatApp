const isLogin=async(req,res,next)=>{
    try{
        if(req.session.user){
            next();
        }
        else{
            res.redirect('/');
        }
    }
    catch(err){
        console.log(err.message);
    }
}

const isLogout=async(req,res,next)=>{
    try{
        if(req.session.user){
            next();
        }
       next();
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports={
    isLogin,
    isLogout
}