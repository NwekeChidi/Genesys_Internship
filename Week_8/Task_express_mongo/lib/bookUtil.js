// utilities for database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for books
 const bookSchema = new Schema({
     name : {
         type : String,
         required: true
     },
     author : {
        type : String,
        required: true
    },
    publisher : {
        type : String,
        required: true
    },
    ISBN : {
        type : String,
        required: true
    },
    price : {
        type : Number,
        required: true
    },
    copies : {
        type : Number,
        required: true
    },
    edition: {
        type: String
    },
    genre : {
        type : String,
        required: true
    },
    cover_image_url : {
        type : String,
        required: true
    }
 },
 {
     timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at"
     }
 })


// create a book model
const Books = mongoose.model('book', bookSchema);


// create functions
// createBook
exports.createBook = async ( data ) => {
    return await new Books(data).save();
}

// getAllBooks
exports.getAllBooks = async () => {
    return await Books.find({});
}

// getBooksByGenre
exports.getBookByGenre = async ( genre ) => {
    const books = await Books.findOne(genre);
    if(!books) throw new Error("Genre incorrect or does not exist");

    return books;
}


// getOneBook
exports.getOneBook =  async ( bookId ) => {
    const books = await Books.findOne({ _id: bookId });
    if(!books) throw new Error("Book incorrect or does not exist!");

    return books;
}


// updateBook
exports.updateBook = async ( bookId, data ) => {
    const books = await Books.findByIdAndUpdate(
        { _id: bookId },
        { $set: data }
    );

    if (!books) throw new Error("Book does not exist", 404);
    return books;
}


// deleteBook
exports.deleteBook = async ( bookId ) => {
    const books = await Books.findOne({ _id: bookId });
    books.remove();
    return books;
}