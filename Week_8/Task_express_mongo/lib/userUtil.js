// utilities for database
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Book = require('./bookUtil').Book;


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
   fullName: {
       type: String
   },
   email : {
       type: String,
       unique: true,
       required : true
   },
   password : {
       type: String,
       required: true
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
       type: Array,
       default: []
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
exports.User = mongoose.model('user', userSchema);


// borrow and return book util
exports.rent = async ( bookId, userMail, action ) => {
    const user = await Users.findOne({ email: userMail }), book = await Book.findOne({ _id: bookId });

    if (!book) throw new Error("Book Does Not Exist", 404)

    if (action === "pos"){
        if ( book.copies > 0 ){
            user.borrowedBooks.push(bookId);
            book.copies -= 1;
        } else {throw new Error("Book Currently Not Available In Library!", 400)}
    }

    if ( action === "neg"){
        if ( user.borrowedBooks.includes(bookId) ){
            user.borrowedBooks.splice(user.borrowedBooks.indexOf(bookId), 1);
            book.copies += 1;
        } else {throw new Error("You Do Not Have This Book In Custody", 400)}
    }
    

    const updatedUser = await Users.findOneAndUpdate(
        { email: userMail },
        { $set: user }
    ), updatedBook = await Book.findByIdAndUpdate(
        { _id: bookId },
        { $set: book }
    );

    if (!updatedBook || !updatedUser ) throw new Error("Could Not Update Book", 400);
    return {
        updatedBook, updatedUser
    }
}
