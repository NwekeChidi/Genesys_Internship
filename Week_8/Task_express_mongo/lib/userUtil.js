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
       unique: true,
       required : true
   },
   address : {
       type: String,
       required : true
   },
   phone : {
       type: String,
       required : true
   },
   borrowedBooks: {
       type: Map,
       default: {}
   }
},
{
    timestamp: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

// userSchema.virtual('fullName').get(() => {
//     return this.firstName.name
// })

// create user model
const Users = mongoose.model('user', userSchema);

// create functions
// createUser
exports.createUser = async ( data ) => {
    return await new Users(data).save();
}

// borrowBook
exports.borrowBook = async ( bookId, userId  ) => {
    
}