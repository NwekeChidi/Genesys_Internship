// get data to work with
const allMovieData = require('./movie-data.json').allMovies;

// prototype to convert strings to title
String.prototype.toTitleCase = function(){
  return this.toLowerCase().split(' ').map(function(word) {return (word.charAt(0).toUpperCase() +word.slice(1));}).join(' ');};

  
// function to add more movies to allMovieData
function addMovie(ctitle, cgenre, cdescription, cdirector, cactors, cyear, cruntime, crating, cvotes, crevenue, cmetascore, cnum_in_stock ){
  let currID = allMovieData.slice(-1)[0].id;
  // check if movie is already in data
  for (let i=0; i<allMovieData.length; i++){
    let currTitle = allMovieData[i].title
    if (ctitle.toLowerCase() == currTitle.toLowerCase()){
      console.log( `Movie with title '${ctitle}' is already in database, refer to id : '${currID}'`);
      return;
    }
  }
  let currMovie = {
    id: currID+1,
    title: ctitle.toTitleCase(),
    genre: cgenre,
    description: cdescription,
    director: cdirector,
    actors: cactors,
    year: cyear,
    runtime: cruntime,
    rating: crating,
    votes: cvotes,
    revenue: crevenue,
    metascore: cmetascore,
    num_in_stock: cnum_in_stock
  };
  // update movie array
  allMovieData.push(currMovie);
}



// function to create user
function createUser(firstName, lastName, address, users){
    let lenUsers = Object.keys(users).length;
    const newUser = {
      username: firstName.toLowerCase()+0+(lenUsers+1),
      firstName: firstName,
      lastName: lastName,
      fullName: firstName+" "+lastName,
      address: address,
      rentedMovies: [],
      deleteMovie: function (movieTitle){
        for(let i=0; i<this.rentedMovies.length; i++){
          if(this.rentedMovies[i][0] == movieTitle){
            rentedMovies.splice(i, 1);
          }
        }
      }
    }
    users[newUser.username] = newUser;
  }
  
  
  // function to rent movies
  function rentMoive(userId, )
  
  
  
  
  
  // export functions
  module.exports = { 
    addMovie,
    createUser, };