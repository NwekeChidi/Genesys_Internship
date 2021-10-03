////////////////////////////////////////////////////
////             Movie Lending API              ////
////////////////////////////////////////////////////
// Get local functions
const allClasses = require('./functions.js');
const User = allClasses.User, Owner = allClasses.Owner



// Define variables
const users = {}; moviesOnRent = {}; 
var allMovieData = [];
console.log("Movies in Store on initial store opening: ", allMovieData,"\n\n");
// NB: For a rich movie database, uncomment the lines below and run
allMovieData = require('./movie-data.json').allMovies;
//console.log(allMovieData[0]); // take a peek at the data
const owner = new Owner(allMovieData, users, moviesOnRent);

// test out addMovie function
console.log("Calling 'addMovie' API funtion which adds movies to database.......");
owner.addMovie("free Guy", "Action,Adventure", 
"A background player in an open-world video game discovers that he is just an algorithm in a loop and decides to become a hero of his own story.","Shawn Levy", "Ryan Reynolds, Jodie Comer, Lil Rel Howery, Joe Keery, Taika Waititi", "2021","115", "7.4", "759101", "317.4","62",50);
owner.addMovie("bloodshot", "Action,Adventure", 
"An elite soldier killed in a battle, is ressurected and given superhuman abilities.","David S F Wilson", "Vin Diesel, Eiza Gonzalez, Sam Heughan, Toby Kebbell, Guy Pearce", "2020","109", "5.7", "50910", "37.3",NaN,10);
owner.addMovie("attack on titan", "Action,Adventure,Dark Fantasy,Post-Apocalyptic", 
"A young man vows to exterminate the Titans after a Titan brings about the destruction of his hometown and the death of his mother.","Hajime Isayama", NaN, "2009-2021", "Series", NaN, NaN, NaN ,NaN, 15);
console.log(allMovieData.slice(999, 1003), '\n\n', "Adding a movie that is already existing in database......\n");
owner.addMovie('attack on titan');

console.log("\n\nCalling 'getMovie' API funtion which get a given movie from database.....");
console.log(owner.getMovie('bloodshot'),"\n\n");

console.log("Calling 'editMovieProp' API funtion which edits given properties of movies in database.....");
owner.editMovieProp("Bloodshot", 'num_in_stock', 20);
console.table(owner.getMovie('bloodshot'));

console.log("\n\nCalling 'removeMovie' API funtion which deletes a movie from database....");
owner.removeMovie("attack on titan");
console.log("Trying to call 'removeMovie' API funtion on a movie deleted from database....\n");
console.log(owner.getMovie("attack on titan"));

console.log("\n\nCalling 'createUser' API funtion which creates an account for users......");
owner.createUser("Tony", "Stone", "400 Bentely Lane, Ohio");
owner.createUser("Bill", "Jones", "4B Lekki I, Lagos");
owner.createUser("Bola", "Akeredolu", "12 Jato Street, Lagos");
owner.createUser("Esy", "Bidani", "Rosy Avenue, Acrra");
console.table(users);

// instantiating a class for users
let user1 = new User('tony01', allMovieData, users, moviesOnRent);
const user2 = new User('bill02', allMovieData, users, moviesOnRent);
let user3 = new User('bola03', allMovieData, users, moviesOnRent);
const user4 = new User('esy04', allMovieData, users, moviesOnRent);

//
console.log("\n\nCalling 'removeUser' API funtion which deletes user accounts from user database....");
owner.removeUser('bola03');
console.table(users);

//
console.log("\n\nCalling 'rentMovie' API funtion which helps a user to rent movies from database.....");
user1.rentMovie("bloodshot", 3); user1.rentMovie("nine lives", 14);
user1.rentMovie("free guy", 3); user2.rentMovie("free guy", 14);
user1.rentMovie("bloodshot", 5); user4.rentMovie("free guy", 14);
user2.rentMovie("free guy", 5); user2.rentMovie("bloodshot", 5);
user4.rentMovie("a monster calls", 4);
console.table(users);
console.log("\nTry to call 'rentMovie' on a movie not in database......\n");
user4.rentMovie("nine lives", 4);


console.log("\n\nCalling 'returnMovie' API funtion which helps a user to return rented movies.....\n\n");
user1.returnMovie("bloodshot", 2);
console.log(owner.getUser('tony01'));
console.log("\nTrying to call 'returnMovie' with incorrect arguements.....\n");
user1.returnMovie("bloodshot", 20);

console.log("\n\nCalling 'removeMovie' API funtion which helps a user to loose rented movies.....");
user1.removeMovie('bloodshot');
console.log(owner.getUser('tony01'));