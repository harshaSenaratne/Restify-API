const errors = require('restify-errors');
const Customer = require('../Models/Customer')
const config = require('../config')
const  rjwt = require('restify-jwt-community')

module.exports = server =>  {
    //Get Customers
server.get('/customers',async (req,res,next)=>{
    //res.send({msg:"test"});
    try{
       
        const customers = await Customer.find({});
        res.send(customers);
        next();
    }
    catch(err){
      return next(new errors.InvalidContentError(err)); 
    }
    
});



// Single Customer

server.get('/customers/:id',async (req,res,next)=>{
    //res.send({msg:"test"});
    try{
       
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
        next();
    }
    catch(err){
      return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`)); 
    
    }
    
});


// Add Customers 
server.post('/customers',rjwt({secret:config.JWT_SECRET}), async (req,res,next)=>{
  
    if(!req.is('application/json')){
      return next(errors.InvalidContentError("Expects 'application/json'"));      
    }
  
    const  {name, email, balance} = req.body;
    const customer = new Customer({
     name,
     email,
     balance
    })
     
   try{
    const newCustomer = await customer.save();
    res.send(201)
    next()
   }
   catch(err){
    return next(new errors.InternalError(err.message));
   }
})



//Update customer
server.put('/customers:id',rjwt({secret:config.JWT_SECRET}),async (req,res,next)=>{
  
    if(!req.is('application/json')){
      return next(errors.InvalidContentError("Expects 'application/json'"));      
    }
  
    // const  {name, email, balance} = req.body;
    // const customer = new Customer({
    //  name,
    //  email,
    //  balance
    // })
     
   try{
    const newCustomer = await Customer.findOneAndUpdate({_id:req.params.id},req.body);
    res.send(201)
    next()
   }
   catch(err){
    return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`));
   }
})





// Delete Customer
// server.del('/customers/:id/', rjwt({secret:config.JWT_SECRET}),async(req,res,next)=>{
//     try{
//     const customer = await Customer.findOneAndRemove({_id:req.params.id});
//     res.send(204)
//     next();
//     }
//     catch(err){
//       return next(new errors.ResourceNotFoundError(`No customer with id ${req.params.id}`));
   
//     }
//    });



}