// This file is to run only once on a new machine
//// Read in .csv and store as objects
const fs = require('fs');
const csv = require('csv-parser');
const movieData = {"allMovies": []};

// create movie data
fs.createReadStream('./IMDB-Movie-Data.csv').pipe(csv()).on('data', function (row) {
  const movie = {
    id: Number(row.Rank),
    title: row.Title,
    genre: row.Genre,
    description: row.Description,
    director: row.Director,
    actors: row.Actors,
    year: row.Year,
    runtime: row.Runtime_Minutes,
    rating: row.Rating,
    votes: row.Votes,
    revenue: row.Revenue_Millions,
    metascore: row.Metascore,
    num_in_stock: Math.floor((Math.random() + 1) * 30)
  }
  movieData.allMovies.push(movie);
}).on('end', function () {
  // save movieData to a JSON file
  const jsonData = JSON.stringify(movieData);
  // write JSON string to a file
  fs.writeFile('./movie-data.json', jsonData, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
    });
});