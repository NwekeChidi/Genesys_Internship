// bring in Reader
const { TestWatcher } = require('@jest/core');
const { Reader, Library } = require('./index');

// Suppress console.log from sending messages to console
console.log = function(){};

// jest to spy on console.log calls.
const consoleSpy = jest.spyOn(console, 'log');


//test if Reader exists
test("Reader exists", () => {
    expect(Reader).toBeDefined();
});

// define variables
const readerJane = new Reader("Jane");
const theLibrary = new Library();


// test initialize Reader
test("new Reader('Jane') successfully created", () => {
    expect(readerJane).toBeTruthy();
});

// call some necessary functions
theLibrary.registerUser(readerJane);


// test readerJane.getBook function exists
test("function 'readerJane.getBook' exists", () => {
    expect(readerJane.getBook).toBeDefined;
});


// test getBook function by genre
test("readerJane.getBook by genre works", () => {
    let titleB = "Personal Development";
    readerJane.getBook(titleB);
    let books = Object.fromEntries(Object.entries(theLibrary.bookshelf[titleB.toLowerCase()]).sort());
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>Getting books under the genre: '"+titleB+"'.......\n   ==>",books,"\n");
});


// test getBook function by title
test("readerJane.getBook by book title works", () => {
    let titleB = "48 Laws Of Power";
    readerJane.getBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith(theLibrary.bookshelf["personal development"][titleB]);
});

// test getBook function with a book that does not exist
test("readerJane.getBook with a non existing entry works", () => {
    let titleB = "The Monk Who Sold His Ferrari";
    readerJane.getBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>",titleB," is currently not available!");
});


// test readerJane.borrowBook function is defined
test("function 'readerJane.borrowBook' exists", () => {
    expect(readerJane.borrowBook).toBeDefined;
});


// test borrowBookgetBook function with a book that exist
test("readerJane.borrowBook with an existing entry works", () => {
    let titleB = "48 Laws Of Power", currBook = theLibrary.bookshelf["personal development"][titleB];
    readerJane.borrowBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith(`\n  ==>${readerJane.name.toUpperCase()}, you have borrowed the book '${titleB}' by '${currBook.author}'\nNote that the max duration in your custody must not exceed two (2) months!`);
});

// test borrowBook function with a book that does not exist
test("readerJane.borrowBook with a non existing entry works", () => {
    let titleB = "The Monk Who Sold His Ferrari";
    readerJane.borrowBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith(`\n  ==> Dear ${readerJane.name.toUpperCase()}, \n\tThe book '${titleB}' is currently not available in the library`);
});


// test readerJane.returnBook function is defined
test("function 'readerJane.returnBook' exists", () => {
    expect(readerJane.returnBook).toBeDefined;
});

// test returnBook function with a book that exist
test("readerJane.borrowBook with an existing entry works", () => {
    let titleB = "48 Laws Of Power", currBook = theLibrary.bookshelf["personal development"][titleB];
    readerJane.returnBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith(`\n  ==>${readerJane.name.toUpperCase()}, you have returned the book '${titleB}' by '${currBook.author}'`);
});

// test returnBook function with a book that does not exist
test("readerJane.borrowBook with a non existing entry works", () => {
    let titleB = "The Monk Who Sold His Ferrari";
    readerJane.returnBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith("\n  ==>",titleB, "is currently not in your custody");
});

// test readerJane.readBook function is defined
test("function 'readerJane.readBook' exists", () => {
    expect(readerJane.readBook).toBeDefined;
});

// test returnBook function with a book that exist
test("readerJane.readBook with an existing entry works", () => {
    let titleB = "48 Laws Of Power", currBook = theLibrary.bookshelf["personal development"][titleB];
    readerJane.readBook(titleB);
    expect(consoleSpy).toHaveBeenCalledWith("\n ==> Reading Book------\n  ==>",currBook.contents);
});