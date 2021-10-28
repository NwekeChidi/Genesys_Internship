// utilites for a file system
const fs = require("fs");
const path = require("path");
const helper = require('./helper');

var lib = {
    baseDir : path.join(__dirname, '/../.data/')
}

lib.create = (dir, filename, data, callback) => {
    //open file for writing
    const filePath = lib.baseDir+dir+'\\'+filename+'.json';
    fs.open(filePath, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            //convert the data to string
            const strData = JSON.stringify(data);
            //write to file
            fs.writeFile(fileDescriptor, strData, (err) => {
                if(!err){
                    fs.close(fileDescriptor, (err) => {
                        if(!err){
                            callback(false);
                        } else {
                            callback("Error closing new file")
                        }
                    })
                } else {
                    callback("Error writing to new file");
                }
            })
        } else {
            callback({err: err, message: "Error creating file! File may already exist!"})
        }
    })
}

lib.read = (dir, filename, callback) => {
    const filePath = lib.baseDir+dir+'\\'+filename+'.json';
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(!err && data){
            callback(false, JSON.parse(data));
        } else {
            callback(err, data);
        }
    });
}

lib.update = (dir, filename, data, callback) => {
    const filePath = lib.baseDir+dir+'\\'+filename+'.json';
    // open file
    fs.open(filePath, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            fs.readFile(fileDescriptor, 'utf-8', (err, bookToUpdate) => {
                if (!err && bookToUpdate) {
                    let updatedBook = helper.formatObject(JSON.parse(bookToUpdate), data);
                    var updatedData = JSON.stringify(updatedBook);
                    //truncate file for update
                    fs.truncate(fileDescriptor, (err) => {
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
lib.delete = (dir, filename, callback) => {
    const filePath = lib.baseDir+dir+'\\'+filename+'.json';
    fs.unlink(filePath, (err) => {
        if(!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}

module.exports = lib;