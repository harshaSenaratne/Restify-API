const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

exports.authenticate= (email,password)=>{

    return new Promise ( async (resolve,reject)=>{
      try{
       //Get User mail   
       const user = await User.findOne({email})

       //Match Password
        bcrypt.compare(password,user.password, (err,isMatch )=>{
        
             if(err) throw err;
             if(isMatch){
              resolve(user)
             }
             else{
                 // Password not match
              reject('Authentication Failed')
             }
        })
      }
      catch(err){
       //Email not found
       return("Authentication Failed")
      }

    }
    )

}

