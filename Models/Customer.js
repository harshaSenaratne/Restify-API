const moongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const CustomerSchema = new moongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true     
    },
    balance:{
        type:Number,
        default:0
    }

}) 

CustomerSchema.plugin(timestamp);
const Customer =  moongoose.model('Customer',CustomerSchema);
module.exports = Customer;