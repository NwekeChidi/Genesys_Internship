const path = require("path");
const fs = require("fs");
const util = require("util");

const helper = {
    baseUserDir:path.join(__dirname, '/../.data/users/'),
    baseDir : path.join(__dirname, '/../.data/books/')
};
const all_genres = JSON.parse(fs.readFileSync(helper.baseDir+"all_genres.json", 'utf-8'));
const all_users = JSON.parse(fs.readFileSync(helper.baseUserDir+"all_users.json", 'utf-8'));

helper.generateID = () => {
    stringLength = 20, str = "", validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (i=0; i<stringLength; i++){
        let randomChar = validChars.charAt(Math.floor(Math.random()*validChars.length));
        str+=randomChar;
    }
    return str;
}

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

helper.filePath = (dyn, filename) => {
    if (dyn && filename){
        let genre = dyn.split(" ").join("_").toLowerCase();
        // first check if directory already exists
        if (!fs.existsSync(helper.baseDir+genre)) {
            fs.mkdirSync(helper.baseDir+genre);
        } 
        return helper.baseDir+genre+'\\'+filename+'.json';
    } else if (dyn && !filename){
        return helper.baseUserDir+dyn+'.json';
    }
}


helper.get_key = (value) => {
    let key_book = undefined; key_user = undefined;
    let all_keys_book = Object.keys(all_genres), all_keys_users = Object.keys(all_users);
    Object.keys(all_genres).forEach(currKey => {if (all_genres[currKey].includes(value)){key_book = currKey} });
    Object.keys(all_users).forEach(currKey => {if (all_users[currKey].includes(value)){key_user = currKey} });
    return {
        key_book, key_user,
        all_keys_book, all_keys_users
    };
}

helper.update = (dyn1, dyn2) => {
    console.log("in here....")
    genre = dyn1.split(" ").join("_").toLowerCase();
    if (Object.keys(all_genres).includes(genre)){
        const filePath = helper.baseDir+'all_genres.json';
        fs.readFile(filePath, 'utf-8', (err, obj) => {
            if(!err){
                let data = JSON.parse(obj);
                if (!(Object.keys(data).includes(genre))){
                    data[genre] = [];
                }
                data[genre].push(dyn2);
                fs.writeFile(filePath, JSON.stringify(data), 'utf-8', err =>{})
            }
        })
    } else if(!(Object.keys(all_genres).includes(genre))){
        const filePath = helper.baseUserDir+'all_users.json';
        fs.readFile(filePath, 'utf-8', (err, obj) => {
            if(!err){
                let data = JSON.parse(obj);
                data[dyn1] = dyn2;
                fs.writeFile(filePath, JSON.stringify(data), 'utf-8', err =>{})
            }
        })
    } 
}

helper.updateCounters = (action) => {
    const filePath = helper.filePath(genre, filename);
    fs.readFile(filePath, 'utf-8', (err, obj) => {
        let data = JSON.parse(obj)
        if (!err){
            if(action === 'pos'){
                data.copies += 1;
            } else {
                data.copies -= 1;
            }
            fs.writeFile(filePath, JSON.stringify(data), 'utf-8', (err) =>{})
        }
    })
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