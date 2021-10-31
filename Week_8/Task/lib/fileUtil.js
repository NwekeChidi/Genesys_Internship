// utilites for a file system
const fs = require("fs");
const helper = require('./helper');

var lib = {};

lib.create = (genre, filename, data, callback) => {
    //open file for writing
    let filePath = helper.filePath(genre, filename);
    // check if file already exists
    if (fs.existsSync(filePath)){
        fs.readFile(filePath, 'utf-8', (err, contents) => {
            if(JSON.stringify(data) === contents){
                callback("File With Similar Contents Already Exists!")
            } else {
                suffix = typeof(data.edition) !== 'undefined' ? data.edition.toLowerCase() : data.publisher.split(" ").pop();
                filename = filename+"_"+suffix
                filePath =  helper.filePath(genre,filename);
                helper.createFile(filePath, data, callback);
            }
        })
    } else {
        helper.createFile(filePath, data, callback)
    }
    helper.update(filename, genre);
}

lib.createUser = (UserData, callback) => {
    let userID = helper.generateID();
    let filePath = helper.filePath(userID), email = UserData.email.toLowerCase();
    UserData.userID = userID; UserData.borrowedBooks = [], UserData.bookCapacity = 5;
    // check if user exist
    fs.readFile(helper.baseUserDir+'all_users.json', 'utf-8', (err, contents) => {
        let data = JSON.parse(contents);
        if(Object.keys(data).includes(email)){
            callback("User With Email Already Registered!")
        } else {
            helper.createFile(filePath, UserData, callback);
        helper.update(email, userID);
        }
    } ) 
}

lib.read = (genre, filename, callback) => {
    const filePath = helper.filePath(genre, filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(!err && data){
            callback(false, JSON.parse(data));
        } else {
            callback(err, data);
        }
    });
}

lib.bRBook = (genre, userID, filename, action, callback) => {
    const filePath_user = helper.filePath(userID);
    const filePath_book = helper.filePath(genre, filename);
    fs.readFile(filePath_book, 'utf-8', (err, obj) => {
        if(!err){
            let data = JSON.parse(obj);
            if (data.copies > 0){
                if (action === "borrow"){
                    helper.updateData(filePath_user, data, "pos", callback);
                } else if (action === "return"){
                    helper.updateData(filePath_user, data, "neg", callback);
                }
                fs.writeFile(filePath_book, JSON.stringify(data), 'utf-8', err =>{})
            } 
        }
    })
}

lib.readAll = (genre, callback) => {
    async (err) => {
        const data = await helper.readFiles(
            helper.baseDir+genre
        );
        if (!err && data){
            console.log({data})
            callback(false, JSON.parse(data));
        } else {
            callback(err, data);
        }
    }
}

lib.update = (genre, filename, data, callback) => {
    const filePath = helper.filePath(genre, filename);
    // open file
    fs.open(filePath, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            fs.readFile(fileDescriptor, 'utf-8', (err, bookToUpdate) => {
                if (!err && bookToUpdate) {
                    let updatedBook = helper.formatObject(JSON.parse(bookToUpdate), data);
                    var updatedData = JSON.stringify(updatedBook);
                    //truncate file for update
                    fs.ftruncate(fileDescriptor, (err) => {
                        if (!err) {
                            fs.writeFile(filePath, updatedData, (err) => {
                                if (!err) {
                                fs.close(fileDescriptor, (err) => {
                                    if (!err) {
                                        callback(false);
                                    } else {
                                        callback("Error Closing File");
                                    }
                                });
                                } else {
                                    callback('Error Writing To File');
                                }
                            });
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback("Could Not Update File. File May Not Exist!")
        }
    })
}

// Delete File
lib.delete = (genre, filename, callback) => {
    const filePath = helper.filePath(genre, filename);
    fs.unlink(filePath, (err) => {
        if(!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}

module.exports = lib;