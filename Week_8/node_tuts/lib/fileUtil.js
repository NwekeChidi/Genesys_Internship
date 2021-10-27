// utilites for a file system
const fs = require("fs");
const path = require("path");

var lib = {
    baseDir : path.join(__dirname, '/../.data/')
}

lib.create = (dir, filename, data, callback) => {
    //open file for writing
    const filePath = libe.baseDir+dir+'\\'+filename+'.json';
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
            callback("Error creating file! File may already exist!")
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

module.exports = lib;