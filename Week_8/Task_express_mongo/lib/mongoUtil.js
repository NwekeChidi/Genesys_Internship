// // utilites for a file system
// const fs = require("fs");
// const helper = require('./helper');

// utilities for database
const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    price : {
        type : Number,
        required: true
    },
    publisher : {
        type : String,
        required: true
    },
    isbn_number : {
        type : String,
        required: true
    },
    cover_image_url : {
        type : String,
        required: true
    },
    genre : {
        type : String,
        required: true
    },
    copies : {
        type : Number,
        required: true
    },
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




























// lib.create = (genre, filename, data, callback) => {
//     //open file for writing
//     let filePath = helper.filePath(genre, filename);
//     // check if file already exists
//     if (fs.existsSync(filePath)){
//         fs.readFile(filePath, 'utf-8', (err, contents) => {
//             if(JSON.stringify(data) === contents){
//                 callback("File With Similar Contents Already Exists!")
//             } else {
//                 suffix = typeof(data.edition) !== 'undefined' ? data.edition.toLowerCase() : data.publisher.split(" ").pop();
//                 filename = filename+"_"+suffix
//                 filePath =  helper.filePath(genre,filename);
//                 helper.createFile(filePath, data, callback);
//             }
//         })
//     } else {
//         helper.createFile(filePath, data, callback)
//     }
//     helper.update(genre, filename);
// }

// lib.createUser = (UserData, callback) => {
//     let userID = helper.generateID();
//     let filePath = helper.filePath(userID), email = UserData.email.toLowerCase();
//     UserData.userID = userID; UserData.borrowedBooks = [], UserData.bookCapacity = 5;
//     // check if user exist
//     fs.readFile(helper.baseUserDir+'all_users.json', 'utf-8', (err, contents) => {
//         let data = JSON.parse(contents);
//         if(Object.keys(data).includes(email)){
//             callback("User With Email Already Registered!")
//         } else {
//             helper.createFile(filePath, UserData, callback);
//         helper.update(email, userID);
//         }
//     }) 
// }

// lib.read = (genre, filename, callback) => {
//     const filePath = helper.filePath(genre, filename);
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if(!err && data){
//             callback(false, JSON.parse(data));
//         } else {
//             callback(err, data);
//         }
//     });
// }

// lib.bRBook = (genre, userID, filename, action, callback) => {
//     const filePath_user = helper.filePath(userID);
//     const filePath_book = helper.filePath(genre, filename);
//     fs.readFile(filePath_user, 'utf-8', (error, obj1) => {
//         obj1 = JSON.parse(obj1);
//         fs.readFile(filePath_book, 'utf-8', (err, obj) => {
//             if(!err){
//                 let data = JSON.parse(obj);
//                 let book = Object.assign({}, data); delete book.copies
//                 if (action === 'borrow'){
//                     if (data.copies > 0){
//                         helper.updateData(filePath_user, data, "pos", callback);
//                         if (obj1.bookCapacity > 0){
//                             data.copies -= 1;
//                         }
//                     } else {
//                         callback("Book Is Not Available For Rent!")
//                     }
//                 } else if (action === "return"){
//                     helper.updateData(filePath_user, data, "neg", callback);
//                     if (JSON.stringify(obj1.borrowedBooks).includes(JSON.stringify(book))){
//                         data.copies += 1;
//                     }
//                 }
//                 fs.writeFile(filePath_book, JSON.stringify(data), 'utf-8', err =>{}) 
//             } else {
//                 callback(err);
//             }
//         });
//     });
// }

// lib.update = (genre, filename, data, callback) => {
//     const filePath = helper.filePath(genre, filename);
//     // open file
//     fs.open(filePath, 'r+', (err, fileDescriptor) => {
//         if (!err && fileDescriptor) {
//             fs.readFile(fileDescriptor, 'utf-8', (err, bookToUpdate) => {
//                 if (!err && bookToUpdate) {
//                     let updatedBook = helper.formatObject(JSON.parse(bookToUpdate), data);
//                     var updatedData = JSON.stringify(updatedBook);
//                     //truncate file for update
//                     fs.ftruncate(fileDescriptor, (err) => {
//                         if (!err) {
//                             fs.writeFile(filePath, updatedData, (err) => {
//                                 if (!err) {
//                                 fs.close(fileDescriptor, (err) => {
//                                     if (!err) {
//                                         callback(false);
//                                     } else {
//                                         callback("Error Closing File");
//                                     }
//                                 });
//                                 } else {
//                                     callback('Error Writing To File');
//                                 }
//                             });
//                         }
//                     });
//                 } else {
//                     callback(err);
//                 }
//             });
//         } else {
//             callback("Could Not Update File. File May Not Exist!")
//         }
//     })
// }

// // Delete File
// lib.delete = (genre, filename, callback) => {
//     const filePath = helper.filePath(genre, filename);
//     fs.unlink(filePath, (err) => {
//         if(!err) {
//             callback(false);
//         } else {
//             callback(err);
//         }
//     })
// }

// // delete User
// lib.deleteUser = (email, callback) => {
//     if (Object.keys(helper.all_users).includes(email)){
//         const filePath = helper.filePath(helper.all_users[email]);
//         fs.unlink(filePath, (err) => {
//             if (!err){
//                 fs.readFile(helper.baseUserDir+'all_users.json', 'utf-8', (err, obj) => {
//                     if(!err){
//                         let data = JSON.parse(obj);
//                         delete data[email];
//                         fs.writeFile(helper.baseUserDir+'all_users.json', JSON.stringify(data), 'utf-8', err =>{})
//                         callback(false)
//                     } else {
//                         callback(err);
//                     }
//                 })
//             } else {callback(err)}
//         })
//     } else {callback("User Does Not Exist!")}
// }

// module.exports = lib;