// import dependencies

const express = require('express');
const mongoose = require('mongoose');
const bookUtil = require('./lib/bookUtil');
const userUtil = require('./lib/userUtil');


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


// Route to create new user
app.post("/library/users/register", async (req, res) => {
    const userData = req.body;
    console.log(userData)

    try {
        await userUtil.createUser(userData);
        res.status(200).send({ message : "Registration Successful!" })
    } catch (error) {
        if (error.keyPattern) res.status(400).send({ err: error, message: "Email Already Registered!" })
        else res.status(404).send({ err: error, message: "Could Not Register User" })
    }
})

// Ro
app.use("**", (req, res) => {
    res.status(404).send("Route Not Found!")
})

// fire up server
let port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log("Server is fired and is listening on port", port)
});
