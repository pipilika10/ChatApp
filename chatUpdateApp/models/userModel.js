const { fileLoader } = require('ejs');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

   is_online:{
    type:String,
    default:'1'
   }
},
{timestamps:true}
);

module.exports=mongoose.model('user',userSchema);
    
   


