// import dependencies

const express = require('express');
const mongoose = require('mongoose');
const bookUtil = require('./lib/bookUtil');
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


// add createBook route
app.post("/books", async (req, res) => {
    const data = req.body;

    try {
        await bookUtil.createBook(data);
        res.status(200).send({ message: "Book Successfully Added to Library", data: null})
    } catch (error) {
        res.status(400).send({ message: "Could Not Add Book", error: error });
        //res.status(404).send({ message: "Internal Error!", error: error })
    }
})

// fire up server
let port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log("Server is fired and is listening on port", port)
});
