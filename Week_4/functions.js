// prototype to convert strings to title
String.prototype.toTitleCase = function(){
    return this.toLowerCase().split(' ').map(function(word) {return (word.charAt(0).toUpperCase() +word.slice(1));}).join(' ');}
  
class GeneralUse {
  constructor(allMovieData, users, moviesOnRent){
    this.allMovieData = allMovieData,
    this.users = users,
    this.moviesOnRent = moviesOnRent};
  
  // function to get a movie
  getMovie(movieName){
    movieName = movieName.toTitleCase();
    let currMovie = this.allMovieData.filter(movie=>movie.title===movieName)[0];
    if (typeof currMovie == 'undefined'){
      console.log( "No Match Found!"); return}
    return currMovie;}
}
  
class Owner extends GeneralUse {
  // funtion to addMovie
  addMovie(title, genre, description, director, actors, year, runtime, rating, votes, revenue, metascore, num_in_stock, ){
  title = title.toTitleCase();
  let newMovie = {
    id: this.allMovieData.length+1,
    title: title,
    genre: genre,
    description: description,
    director: director,
    actors: actors,
    year: year,
    runtime: runtime,
    rating: rating,
    votes: votes,
    revenue: revenue,
    metascore: metascore,
    num_in_stock: num_in_stock};
  if (this.allMovieData.length != 0){ 
    let currID = this.allMovieData.slice(-1)[0].id;
    // check if movie is already in data
    let currMovie = this.allMovieData.filter(movie=>movie.title===title)[0];
    if (typeof currMovie != 'undefined'){
      console.log( `Movie with title '${title}' is already in database, refer to id : '${currID}'`);return};
    // update movie array
    newMovie.id = currID+1;
    this.allMovieData.push(newMovie);return}
  this.allMovieData.push(newMovie);}
  
  // function to remove movies
  removeMovie(movieTitle){
    movieTitle = movieTitle.toTitleCase();
    for (let i=0; i<this.allMovieData.length; i++){
      if (this.allMovieData[i].title == movieTitle){
        this.allMovieData.splice(i, 1);}}}
        
  // function to edit movie detail
  editMovieProp(movieTitle, prop, newValue){
    movieTitle = movieTitle.toTitleCase();
    let movie = this.allMovieData.filter(movie=>movie.title===movieTitle)[0];
    if ( typeof movie != 'undefined')
      movie[prop] = newValue;}
  
  // function to create user
  createUser(firstName, lastName, address, users){
    let lenUsers = Object.keys(this.users).length;
    const newUser = {
      username: firstName.toLowerCase()+0+(lenUsers+1),
      fullName: firstName+" "+lastName,
      address: address,
      rentedMovies: {}}
    this.users[newUser.username] = newUser;}
  
  // function to remove users
  removeUser(userVar){
    delete this.users[userVar.username];}
  
  // get a user
  getUser(username){
    return this.users[username]}
  };
  
class User extends GeneralUse {
  constructor(username, allMovieData, users, moviesOnRent){
    super(allMovieData, users, moviesOnRent),
    this.username = username
    this.user = this.users[username]}
  
  // function to rent movies
  rentMovie(movieTitle, quantity){
    let rentedMovies = this.user.rentedMovies, newMovie = {};
    movieTitle = movieTitle.toTitleCase();
    let currMovie = this.allMovieData.filter(movie=>movie.title===movieTitle)[0];
    // check if currMovie is undefined
    if (typeof currMovie == 'undefined'){console.log("No Match Found!");return}
    if (currMovie.title == movieTitle && currMovie.num_in_stock >= quantity){
      if (movieTitle in rentedMovies){
        // update users' rented movies
        rentedMovies[movieTitle] += quantity;}
      else {rentedMovies[movieTitle] = quantity;}
      // update owners' database
      currMovie.num_in_stock -= quantity;
      newMovie[movieTitle] = quantity;
      if (this.username in this.moviesOnRent){
        //update movies on rent
        if (movieTitle in this.moviesOnRent[this.username]){
          this.moviesOnRent[this.username][movieTitle] += quantity;}
        else {
          this.moviesOnRent[this.username]=Object.assign(this.moviesOnRent[this.username], newMovie);}}
      else {this.moviesOnRent[this.username] = newMovie;}return;}
    if (currMovie.title == movieTitle && currMovie.num_in_stock < quantity){
      console.log(`The movie '${movieTitle}', has only ${currMovie.num_in_stock} copie(s) in stock currently, but you need ${quantity}!`); return;}
    console.log(`'${movieTitle}' is currently out of stock!`);}
  
  // function to return movie
  returnMovie(movieTitle, quantity){
    movieTitle = movieTitle.toTitleCase();
    let currMovie = this.allMovieData.filter
    (movie=>movie.title===movieTitle)[0];
    let rentedMovie = this.users[this.username].rentedMovies;
    if (typeof rentedMovie[movieTitle] != 'undefined' && rentedMovie[movieTitle] >= quantity ){
      console.log(`You have returned '${quantity}' of the movie '${movieTitle}'!`);
      rentedMovie[movieTitle] -= quantity;
      this.moviesOnRent[this.username][movieTitle] -= quantity;
      currMovie.num_in_stock += quantity
      if (rentedMovie == quantity){
        delete this.users[this.username].rentedMovies;}return}
    console.log("Movie title or quantity incorrect!")}
      
    // function to remove movies
    //// this function can be modified to prevent users from directly removing rented movies by creating a cart which they can manage before pushing movies to rent.
    removeMovie(movieTitle){
      // this function does not modify movies already on rent or the movie database, as they have not been returned
      console.log("Use the 'returnMovie' to return movies as you are going to pay for movies which you rented and lost!")
      movieTitle = movieTitle.toTitleCase();
      let rentedMovies = this.users[this.username].rentedMovies;
        delete rentedMovies[movieTitle];}
  }
  module.exports = {Owner, User};