// import dependencies

const express = require('express');
const mongoose = require('mongoose');
const bookUtil = require('./lib/bookUtil');
const userUtil = require('./lib/userUtil');
const auth = require("./controllers/auth");
const profile = require("./controllers/profile");
const morgan = require("morgan");
require('dotenv').config();


// initialize express
const app = express();

// middleware for app
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// add pinging route
count = 0;
app.get('/ping', (req, res) => {
    count++;
    res.send(`Server has recieved ${count} pings since it started.`);
})


///// Admin Route
// add createBook route
app.post("/library/books", async (req, res) => {
    const data = req.body;

    try {
        await bookUtil.createBook(data);
        res.status(200).send({ message: "Book Successfully Added to Library", data: null})
    } catch (error) {
        res.status(400).send({ message: "Could Not Add Book", error: error });
        //res.status(404).send({ message: "Internal Error!", error: error })
    }
})

// add route to get all books
app.get("/library/books", async (req, res) => {
    try {
        const data = await bookUtil.getAllBooks();
        res.status(200).send({ message: "Books Retrieved!", data: data });
    } catch (error) {
        res.status(404).send({ err: error, message: "Could Not Retrieve Books" })
    }
})

// route to get a single book
app.get("/library/books/:book_id", async (req, res) => {
    const book_id = req.params.book_id;
    try {
        const data = await bookUtil.getOneBook(book_id);
        res.status(200).send({ message: "Book Retrieved", data: data })
    } catch (error) {
        res.status(404).send({ err: error, message: "Could Not Retrieve Book" })
    }
})

// route to update a book
app.put("/library/books/:book_id", async (req, res) => {
    const book_id = req.params.book_id, data = req.body;
    try {
        await bookUtil.updateBook(book_id, data);
        res.status(200).send({ message: "Book Updated Successfully"})
    } catch {
        res.status(404).send({ err: error, massage: "Could Not Update Book!"})
    }
})

// route to delete a book
app.delete("/library/books/:book_id", async (req, res) => {
    const book_id = req.params.book_id;
    try {
        await bookUtil.deleteBook(book_id);
        res.status(200).send({ message: "Book Deleted Sucessfully" })
    } catch (error) {
        res.status(400).send({ err: error, message: "Could Not Delete Book!" })
    }
})

// Route to sign up
app.post("/library/users/signup", auth.signup);

// Route to sign in
app.post("/library/users/signin", auth.signin);

// Route to view profile
// app.post("/library/users/view_profile", profile.view);


// Route to borrow book
app.put("/library/users/borrow/:book_id", async (req, res) => {
    const email = req.body.email, book_id = req.params.book_id;

    try {
        await userUtil.borrowBook(book_id, email);
        res.status(200).send({ message: "You Have Successfully Borrowed Book!" })
    } catch (errror) {
        res.status(400).send({ message: "Could Not Borrow Book!", err: error })
    }

})



// Route 404 
app.use("**", (req, res) => {
    res.status(404).send("Route Not Found!")
})

// fire up server
const port = process.env.PORT //|| 8080;
const MONGODB_URI = process.env.MONGODB_URI //|| "mongodb://localhost:27017/book-store"
app.listen(port, async ()=> {

    console.log("Server is Fired and is Listening on Port", port);
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(":::> Connected to MongoDB Server.")
    } catch (error) {
        console.log("<::: Could Not Connect To MongoDB Server", error)
    }
});
