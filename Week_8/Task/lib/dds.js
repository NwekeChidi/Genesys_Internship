aa = {"name": "fiver","call":"44"}
bb = {"name": "fiver","call":"44"}
const helper = require("./helper");
const fs = require("fs");

console.log(aa);
if (JSON.stringify(aa) === JSON.stringify(bb)){
    console.log("Yes1")
}
console.log(JSON.stringify(aa) === JSON.stringify(bb))

ggg = {}
ggg.books = {}
ggg._books = {}

console.log(ggg);

// const all_genres = {};
var ppp = "";
const all_genres = JSON.parse(fs.readFileSync(helper.baseDir+"all_genres.json", 'utf-8'));
let filename = 'eat_that_frog', genre = undefined;
Object.keys(all_genres).forEach(bookGenre => {if (all_genres[bookGenre].includes(filename)){genre = bookGenre} }); 

const emailPattern = /^[a-z\d\S]{3,63}@[a-z\d-]{3,63}.com$/gi;
const email = emailPattern.test("angela_mahony@fmail.com") === true ? "angela_mahony@fmail.com" : false;
// fs.readFile(helper.baseDir+"all_genres.json", 'utf-8', (err, data) =>{
//     console.log(data);
//     console.log(JSON.parse(data).computer_science);
// })

console.log(email)