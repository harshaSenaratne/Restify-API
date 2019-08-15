const errors = require('restify-errors');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken'); 
const config = require('../config')

module.exports = server =>{
//Register User

server.post('/register', async (req,res,next)=>{

    const {email,password} = req.body

    const user = new User({
     email,
     password
    })

    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(user.password,salt,async(err,hash)=>{
              //Password Hash
              user.password=hash
              try{
                //Authenticate User
                const newUser= await user.save(); 
                  res.send(201)
                  next()  

            }
            catch(err){
                return next(new errors.InternalError(err.message)); 

            }
        });

        
    });  
});

server.post('/auth',async (req,res,next)=>{
 const {email,password} =req.body
      try{
          //Authenticate user
        const user = await auth.authenticate(email,password)
        console.log(user)

         //Create JWT
         const token = jwt.sign(user.toJSON(),config.JWT_SECRET,{
            expiresIn:'20m'

        });
        //issued at
        const {iat,exp} = jwt.decode(token);
        
        //response including token
        res.send({iat,exp,token}); 
        next();
      }
      catch(err){
        //Unauthorized user
        return next(new errors.UnauthorizedError(err))

      }
  
});
}