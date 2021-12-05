// import dependencies

const express = require('express');
const mongoose = require('mongoose');
const monogoUtil = require('./lib/mongoUtil');
const helper = require('./lib/helper');


// initialize express
const app = express();

// connect to MongoDB
const connectToMongoDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/book-store');
    console.log(":: Connected to MongoDB Server.")
}
connectToMongoDB();

// middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add pinging route
count = 0;
app.get('/ping', (req, res) => {
    count++;
    res.send(`Server has recieved ${count} pings since it started.`);
})



// fire up server
let port = 8080;
app.listen(port, ()=> {
    console.log("Server is fired and is listening on port", port)
});