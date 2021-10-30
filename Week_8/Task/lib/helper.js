const path = require("path");
const fs = require("fs");
const util = require("util");

const helper = {
    baseDir : path.join(__dirname, '/../.data/books/')
};

// helper.generateRandomString = (name, stringLength) => {
//     stringLength = typeof(stringLength) === 'number' ? stringLength : 10;
//     //let str = "";
//     name = name.split(" ").join("_").toLowerCase()+'-';
//     let validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
//     for (i=0; i<stringLength; i++){
//         let randomChar = validChars.charAt(Math.floor(Math.random()*validChars.length));
//         name+=randomChar;
//     }
//     return name;
// }

helper.createFile = (filePath, data, callback) => {
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

helper.formatObject = (oldObject = {}, newObject ={}) => {
    let tempObj  = {}
    Object.keys(newObject).map(key => {
        if(oldObject.hasOwnProperty(key)){
            tempObj[key] = newObject[key];
        }
    })
    return {...oldObject, ...tempObj};
}

helper.filePath = (genre, filename) => {
    genre = genre.split(" ").join("_").toLowerCase();
    // first check if directory already exists
    if (!fs.existsSync(helper.baseDir+genre)) {
        fs.mkdirSync(helper.baseDir+genre);
    } 
    return helper.baseDir+genre+'\\'+filename+'.json';
}



const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

helper.readFiles = async dirName => {
    const fileNames = await readDir(dirName);
    console.log({ fileNames });
    const files_promise = fileNames.map(fileName => {
        return readFile(dirName + fileName, 'utf-8');
    });
    const response = await Promise.all(files_promise);
    return fileNames.reduce((accumlater, currIdx) => {
        const content = response[currIdx];
        accumlater[content.name] = content;
        return accumlater;
    }, {});
};



module.exports = helper;