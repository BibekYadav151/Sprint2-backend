const mongoose = require("mongoose");

const Customer = new mongoose.model("Customer",{
    firstname : {
        type : String,
        required:true
    },
    lastname : {
        type : String,
        required:true
    },
    username : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    
    
});


module.exports = Customer;

