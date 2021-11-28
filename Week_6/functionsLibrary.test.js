// bring in Reader
const { TestWatcher } = require('@jest/core');
const { Reader, Library } = require('./index');

// Suppress console.log from sending messages to console
console.log = function(){};

// jest to spy on console.log calls.
const consoleSpy = jest.spyOn(console, 'log');


//test if Library exists
test("Library exist", () => {
    expect(Library).toBeDefined();
});

// define variables
const readerJane = new Reader("Jane");
const theLibrary = new Library();


// test initialize Library
test("Library successfully initialized", () => {
    expect(theLibrary).toBeTruthy();
});

// test registerUser function
test("function 'theLibrary.registerUser' exists", () => {
    expect(theLibrary.registerUser).toBeDefined;
});

// test registerUser function works
test("function 'theLibrary.registerUser' works", () => {
    theLibrary.registerUser(readerJane);
    expect(Object.keys(theLibrary.readers)[0]).toContain('jane');
});


// test theLibrary.addBook function is defined
test("function 'theLibrary.addBook' exists", () => {
    expect(theLibrary.addBook).toBeDefined;
});

// test theLibrary.addBook function with a genre that does not exist
test("theLibrary.addBook function with a genre that does not exist", () => {
    let newBook = {"book": {"Clean Code":{"title": "Clean Code", "author": "Robert Cecil Martin", 
                               "contents": "'contents of the book Clean Code'",
                               "about": "'about the book Clean Code'","copies": 5}}, "genre":"programming"}
    theLibrary.addBook(newBook.book, newBook.genre);
    expect(consoleSpy).toHaveBeenCalledWith("  ==>The genre: '"+newBook.genre+"' successfully created in bookshelf!");
});

// test theLibrary.addBook function with a genre that exist
test("theLibrary.addBook function with an existing genre", () => {
    let newBook = {"book": {"Harry Potter":{"title": "Harry Potter", "author": "J. K Rowling", 
                   "contents": "'contents of the book, Harry Potter'",
                   "about": "'about the book, Harry Potter'","copies": 5}}, "genre": "fantasy"};
    theLibrary.addBook(newBook.book, newBook.genre);
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>",Object.keys(newBook.book)[0], "successfully added to bookshelf under", newBook.genre, "genre!");
});


// test theLibrary.addBook function without a genre
test("theLibrary.addBook function without a genre", () => {
    theLibrary.addBook({}, 5);
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>Book Genre unclear!");
});


// test theLibrary.removeBook function is defined
test("function 'theLibrary.removeBook' exists", () => {
    expect(theLibrary.removeBook).toBeDefined;
});

// test theLibrary.removeBook function with a genre exists
test("theLibrary.removeBook function with a genre that exists", () => {
    let titleB = "Harry Potter", genre = 'fantasy';
    theLibrary.removeBook(titleB, genre);
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>",titleB, "successfully removed from bookshelf under", genre, "genre!");
});

// test theLibrary.addBook function with incorrect genre or book title
test("theLibrary.addBook function with incorrect genre or book title", () => {
    theLibrary.removeBook("The Monk Who Sold His Ferrari", "personal development");
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>Book title or genre incorrect!");
});


// test theLibrary.update function is defined
test("function 'theLibrary.update' exists", () => {
    expect(theLibrary.update).toBeDefined;
});

// test theLibrary.update function increment
test("theLibrary.update function increment", () => {
    theLibrary.update("University Physics", readerJane.username, "pos");
    expect(theLibrary.bookshelf.physics["University Physics"].copies).toBe(6);
});

// test theLibrary.update function decrease
test("theLibrary.update function decrement", () => {
    theLibrary.update("University Physics", readerJane.username, "neg");
    expect(theLibrary.bookshelf.physics["University Physics"].copies).toBe(5);
});


// test theLibrary.filter function is defined
test("function 'theLibrary.filter' exists", () => {
    expect(theLibrary.filter).toBeDefined;
});

// test theLibrary.filter function
test("theLibrary.filter function on an existing entry", () => {
    expect(theLibrary.filter("48 Laws Of Power")).toEqual(theLibrary.bookshelf["personal development"]["48 Laws Of Power"]);
});

// test theLibrary.filter function
test("theLibrary.filter function on a non existing entry", () => {
    expect(theLibrary.filter("The Monk Who Sold His Ferrari")).toBeFalsy();
});


// test theLibrary.getGenre function is defined
test("function 'theLibrary.getGenre' exists", () => {
    expect(theLibrary.getGenre).toBeDefined;
});

// test theLibrary.getGenre function
test("theLibrary.getGenre function on an existing entry", () => {
    expect(theLibrary.getGenre("48 Laws Of Power")).toEqual("personal development");
});

// test theLibrary.getGenre function
test("theLibrary.filter function on a non existing entry", () => {
    expect(theLibrary.getGenre("The Monk Who Sold His Ferrari")).toBeFalsy();
});