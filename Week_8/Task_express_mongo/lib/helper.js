// const path = require("path");
// const fs = require("fs");

const helper = {
//     baseUserDir:path.join(__dirname, '/../.data/users/'),
//     baseDir : path.join(__dirname, '/../.data/books/')
};
// helper.all_genres = JSON.parse(fs.readFileSync(helper.baseDir+"all_genres.json", 'utf-8'));
// helper.all_users = JSON.parse(fs.readFileSync(helper.baseUserDir+"all_users.json", 'utf-8'));
// helper.toTitle = (str) => {
//     return str.toLowerCase().split('_').map(function(word) {return (word.charAt(0).toUpperCase() +word.slice(1));}).join(' ');}

//     helper.generateID = () => {
//     stringLength = 20, str = "", validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
//     for (i=0; i<stringLength; i++){
//         let randomChar = validChars.charAt(Math.floor(Math.random()*validChars.length));
//         str+=randomChar;
//     }
//     return str;
// }

// helper.createFile = (filePath, data, callback) => {
//     fs.open(filePath, 'wx', (err, fileDescriptor) => {
//         if(!err && fileDescriptor){
//             //convert the data to string
//             const strData = JSON.stringify(data);
//             //write to file
//             fs.writeFile(fileDescriptor, strData, (err) => {
//                 if(!err){
//                     fs.close(fileDescriptor, (err) => {
//                         if(!err){
//                             callback(false);
//                         } else {
//                             callback("Error closing new file")
//                         }
//                     })
//                 } else {
//                     callback("Error writing to new file");
//                 }
//             })
//         } else {
//             callback({err: err, message: "Error creating file! File may already exist!"})
//         }
//     })
// }

// helper.formatObject = (oldObject = {}, newObject ={}) => {
//     let tempObj  = {}
//     Object.keys(newObject).map(key => {
//         if(oldObject.hasOwnProperty(key)){
//             tempObj[key] = newObject[key];
//         }
//     })
//     return {...oldObject, ...tempObj};
// }

// helper.filePath = (dyn, filename) => {
//     if (dyn && filename){
//         let genre = dyn.split(" ").join("_").toLowerCase();
//         // first check if directory already exists
//         if (!fs.existsSync(helper.baseDir+genre)) {
//             fs.mkdirSync(helper.baseDir+genre);
//         } 
//         return helper.baseDir+genre+'\\'+filename+'.json';
//     } else {
//         return helper.baseUserDir+dyn+'.json';
//     }
// }


// helper.get_key = (value) => {
//     let key_book = undefined; key_user = undefined;
//     let all_keys_book = Object.keys(helper.all_genres), all_keys_users = Object.keys(helper.all_users);
//     Object.keys(helper.all_genres).forEach(currKey => {if (helper.all_genres[currKey].includes(value)){key_book = currKey} });
//     Object.keys(helper.all_users).forEach(currKey => {if (helper.all_users[currKey].includes(value)){key_user = currKey} });
//     return {
//         key_book, key_user,
//         all_keys_book, all_keys_users
//     };
// }

// helper.update = (dyn1, dyn2) => {
//     const genre = dyn1.split(" ").join("_").toLowerCase();
//     const emailPattern = /^[a-z\d\S]{3,63}@[a-z\d-]{3,63}.com$/gi;
//     if (!(emailPattern.test(dyn1))){
//         const filePath = helper.baseDir+'all_genres.json';
//         fs.readFile(filePath, 'utf-8', (err, obj) => {
//             if(!err){
//                 let data = JSON.parse(obj);
//                 if (!(Object.keys(data).includes(genre))){
//                     data[genre] = [];
//                     data[genre].push(dyn2);
//                 } else {
//                     data[genre] = [dyn2];
//                 }
//                 fs.writeFile(filePath, JSON.stringify(data), 'utf-8', err =>{})
//             }
//         })
//     } else if(emailPattern.test(dyn1)){
//         const filePath = helper.baseUserDir+'all_users.json';
//         fs.readFile(filePath, 'utf-8', (err, obj) => {
//             if(!err){
//                 let data = JSON.parse(obj);
//                 data[dyn1] = dyn2;
//                 fs.writeFile(filePath, JSON.stringify(data), 'utf-8', err =>{})
//             }
//         })
//     } 
// }

// helper.updateData = (filePath, bookData, action, callback) => {
//     fs.readFile(filePath, 'utf-8', (err, obj) => {
//         let data = JSON.parse(obj), book = Object.assign({}, bookData);
//         delete book.copies;
//         if (!err){
//             if(action === 'pos'){
//                 if (data.bookCapacity <= 0){
//                     callback("You Have Reached Your Borrowing Limit!");
//                 } else {
//                     data.borrowedBooks.push(book);
//                     data.bookCapacity -= 1;
//                     fs.writeFile(filePath, JSON.stringify(data), 'utf-8', (err) =>{});
//                     callback(false);
//                 }
//             } else if (action === "neg"){
//                 if (!JSON.stringify(data.borrowedBooks).includes(JSON.stringify(book))){
//                     callback("You Did Not Borrow This Book!")
//                 } else {
//                     data.borrowedBooks.splice(data.borrowedBooks.indexOf(book), 1);
//                     data.bookCapacity += 1;
//                     fs.writeFile(filePath, JSON.stringify(data), 'utf-8', (err) =>{});
//                     callback(false);
//                 }
//             }  
//         }
//     })
// }
module.exports = helper;