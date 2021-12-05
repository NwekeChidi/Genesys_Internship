// utilities for database
const mongoose = require('mongoose');
const { Schema } = mongoose;


 // create schema for users
 const userSchema = new Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
       type: String,
       required : true
   },
   email : {
       type: String,
       required : true
   },
   address : {
       type: String,
       required : true
   },
   phone : {
       type: Number,
       required : true
   }
})

// create user model
const Users = mongoose.model('user', userSchema);