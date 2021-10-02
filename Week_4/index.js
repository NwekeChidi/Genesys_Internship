////////////////////////////////////////////////////
////             Movie Lending API              ////
////////////////////////////////////////////////////
// Get local functions
const myFx = require('./functions.js');

// get all movie data
const allMovieData = require('./movie-data.json').allMovies;
//console.log(allMovieData[0]) // take a peek at the data

// test out addMovie function
myFx.addMovie("free Guy", "Action,Adventure", 
"A background player in an open-world video game discovers that he is just an algorithm \
in a loop and decides to become a hero of his own story.", "Shawn Levy",
"Ryan Reynolds,Jodie Comer, Lil Rel Howery, Joe Keery, Taika Waititi", "2021","115", "7.4", "759101", "317.4","62",50);
console.log(allMovieData.slice(-1)[0]);
myFx.addMovie("free Guy", "Action,Adventure", 
"A background player in an open-world video game discovers that he is just an algorithm in a\
 loop and decides to become a hero of his own story.","Shawn Levy", 
 "Ryan Reynolds, Jodie Comer, Lil Rel Howery, Joe Keery, Taika Waititi", "2021","115", "7.4", "759101", "317.4","62",50);

// Create users
const users = {};
myFx.createUser("Tony", "Stone", "400 Bentely Lane, Ohio", users);
myFx.createUser("Bill", "Jones", "4B Lekki I, Lagos", users);
myFx.createUser("Bola", "Akeredolu", "12 Jato Street, Lagos", users);
console.log(users);