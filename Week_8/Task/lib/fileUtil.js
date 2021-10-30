// utilites for a file system
const fs = require("fs");
const helper = require('./helper');

var lib = {};

lib.create = (genre, filename, data, callback) => {
    //open file for writing
    let filePath = helper.filePath(genre, filename);
    
    // check if file already e
    if (fs.existsSync(filePath)){
        fs.readFile(filePath, 'utf-8', (err, contents) => {
            if(JSON.stringify(data) === contents){
                callback("File With Similar Contents Already Exists!")
            } else {
                suffix = typeof(data.edition) !== 'undefined' ? data.edition.toLowerCase() : data.publisher.split(" ").join('_').toLowerCase();
                filePath =  helper.filePath(genre,filename+suffix);
                helper.createFile(filePath, data, callback)
            }
        })
    } else {
        helper.createFile(filePath, data, callback)
    }
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

lib.readByGenre = (genre, callback) => {
    async (err) => {
        const data = await helper.readFiles(
            helper.baseDir+genre
        );
        if (!err && data){
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