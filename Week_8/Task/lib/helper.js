const path = require("path");
const fs = require("fs");

const helper = {
    baseDir : path.join(__dirname, '/../.data/books/')
};

helper.generateRandomString = (name, stringLength) => {
    stringLength = typeof(stringLength) === 'number' ? stringLength : 10;
    //let str = "";
    name = name.split(" ").join("_").toLowerCase() + '!';
    let validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (i=0; i<stringLength; i++){
        let randomChar = validChars.charAt(Math.floor(Math.random()*validChars.length));
        name+=randomChar;
    }
    return name;
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

module.exports = helper;