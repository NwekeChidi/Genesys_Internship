// Book Lending Platform Using Design Pattern //
// console.log("The following blocks of code demonstrates the use of 'Mediator Patter' to build a book lending platform!_____________________\nNOTE: Lines starting with '  ==>' are outputs!");

function Reader(firstName){
  this.name = firstName,
  this.username = firstName.toLowerCase()+Math.floor((Math.random()+1) * 100),
  this.booksInCustody = [],
  this.library = null
}

Reader.prototype = {
  getBook: function(bookTitle) {
    if(this.library.bookGenres.includes(bookTitle.toLowerCase())){let books = Object.fromEntries(Object.entries(this.library.bookshelf[bookTitle.toLowerCase()]).sort())
      console.log("\n  ==>Getting books under the genre: '"+bookTitle+"'.......\n   ==>",books,"\n"); return}
    if (typeof this.library.filter(bookTitle, this) !== "undefined"){
      console.log(this.library.filter(bookTitle, this));
    } else {console.log("\n  ==>",bookTitle," is currently not available!")}},

  borrowBook: function(bookTitle){
    let currBook = this.library.filter(bookTitle, this);
    if (typeof currBook !== 'undefined' && currBook.copies != 0){
      this.booksInCustody.push(bookTitle);
      this.library.update(bookTitle, this.username, "neg", this);
      console.log(`\n  ==>${this.name.toUpperCase()}, you have borrowed the book '${bookTitle}' by '${currBook.author}'\nNote that the max duration in your custody must not exceed two (2) months!`);
      } else { console.log(`\n  ==> Dear ${this.name.toUpperCase()}, \n\tThe book '${bookTitle}' is currently not available in the library`) }
    },

    returnBook: function(bookTitle){
      let currBook = this.library.filter(bookTitle, this);
      if(this.booksInCustody.includes(bookTitle)){
        this.booksInCustody.splice(this.booksInCustody.indexOf(bookTitle, 1))
        this.library.update(bookTitle, this.username, "pos", this);
        console.log(`\n  ==>${this.name.toUpperCase()}, you have returned the book '${bookTitle}' by '${currBook.author}'`);
      } else { console.log("\n  ==>",bookTitle, "is currently not in your custody") }
    },

    readBook: function(bookTitle){console.log("\n ==> Reading Book------\n  ==>",this.library.filter(bookTitle, this).contents)}
}

function Library(){
  this.readers = {},
  this.bookshelf = require("./books.json").books;
  this.bookGenres = Object.keys(this.bookshelf);
  this.borrowedBooks = {}
}

Library.prototype = {
  registerUser: function(reader){this.readers[reader.username] = reader, reader.library = this, this.borrowedBooks[reader.username] = [],
  console.log("\n  ==>Reader with username: '"+reader.username+ "' registered succesfully!")},

  addBook: function(bookObj, bookGenre){
    if (typeof bookGenre === "string"){
      if(this.bookGenres.includes(bookGenre.toLowerCase())){
        this.bookshelf[bookGenre] = Object.assign(this.bookshelf[bookGenre], bookObj);
        console.log("\n  ==>",Object.keys(bookObj)[0], "successfully added to bookshelf under", bookGenre, "genre!")
      } else{
        console.log(" ==> Creating genre: '"+bookGenre+"' in bookshelf..........")
        this.bookshelf[bookGenre] = bookObj;
        console.log("  ==>The genre: '"+bookGenre+"' successfully created in bookshelf!")
      }
    } else { console.log("\n  ==>Book Genre unclear!")}
  }, 

  removeBook: function(bookTitle, bookGenre){
    if (typeof this.bookshelf[bookGenre][bookTitle] != "undefined" && this.bookGenres.includes(bookGenre)){
       delete this.bookshelf[bookGenre][bookTitle];
       console.log("\n  ==>",bookTitle, "successfully removed from bookshelf under", bookGenre, "genre!")
    } else {console.log("\n  ==>Book title or genre incorrect!")}
  },

  update: function(bookTitle, username, action){
    let currGenre = this.getGenre(bookTitle);
    if (action == "neg"){
      this.borrowedBooks[username].push(bookTitle);
      this.bookshelf[currGenre][bookTitle].copies -= 1;
    } else if (action == "pos"){
      this.borrowedBooks[username].splice(this.borrowedBooks[username].indexOf(bookTitle), 1);
      this.bookshelf[currGenre][bookTitle].copies += 1;
    }
  },

  filter: function(bookTitle){
    if (typeof this.getGenre(bookTitle) === 'undefined'){return undefined}
    return this.bookshelf[this.getGenre(bookTitle)][bookTitle]},

  getGenre: function(bookTitle){
    let genre = undefined
    Object.keys(this.bookshelf).forEach(bookGenre => {if (bookTitle in this.bookshelf[bookGenre]){genre = bookGenre} }); return genre;
  }
}

const theLibrary = new Library();
const jane = new Reader("Jane"), ade = new Reader("ade"), chidi = new Reader("Chidi");

// Testing the methods in both mediator and users
// console.log("\nTesting the 'registerUser' function which helps users subscribe to library____________")
// theLibrary.registerUser(jane); theLibrary.registerUser(chidi);
// theLibrary.registerUser(ade);

// console.log("\nTesting the 'addBook' function which helps staff add book to library____________")
// let newBook1 = {"book": {"Harry Potter":{"title": "Harry Potter", "author": "J. K Rowling", 
//       "contents": "'contents of the book, Harry Potter'",
//       "about": "'about the book, Harry Potter'","copies": 5}}, "genre": "fantasy"};
// let newBook2 = {"book": {"Clean Code":{"title": "Clean Code", "author": "Robert Cecil Martin", 
//       "contents": "'contents of the book Clean Code'",
//       "about": "'about the book Clean Code'","copies": 5}}, "genre":"programming"}
// theLibrary.addBook(newBook1.book, newBook1.genre);
// theLibrary.addBook(newBook2.book, newBook2.genre);

// console.log("\nTesting the 'removeBook' function which helps staff remove book from library____________");
// theLibrary.removeBook("Eat That Frog", "personal development");
// console.log("\nTesting the 'removeBook' function on a book not in the library____________");
// theLibrary.removeBook("Eat That Frog", "personal development");

// console.log("\nTesting the 'getBook' function which helps readers browse books in the library by title or by genre____________\n\nBrowsing by title:_________");
// jane.getBook("Night");
// console.log("Browsing by genre:___________");
// jane.getBook("fantasy");
// console.log("Browsing a book not in library:__________");
// jane.getBook("Eat That Frog");

// console.log("\nTesting the 'readBook' function which enables readers read book inside the library____________");
// jane.readBook("Night");

// console.log("\nTesting the 'borrowBook' function which enables readers borrow book from the library____________");
// let books = ["Night", "Clean Code", "Becomming"];
// books.forEach(book => {jane.borrowBook(book); ade.borrowBook(book); chidi.borrowBook(book)});
// console.log("\n\n ==> Books in Jane's custody: \n", jane.booksInCustody);
// console.log(" ==> Books recorded as 'Borrowed Books in the library: \n", theLibrary.borrowedBooks);
// console.log(" ==> A look at the updated bookshelf after books have been borrowed: \n  ==> NB: This is the 'autobiography' section of bookshelf\n   ==>",theLibrary.bookshelf["autobiography"])

// console.log("\nTesting the 'returnBook' function which enables readers return books borrowed from the library____________");
// jane.returnBook(books[0]), ade.returnBook(books[2]), jane.returnBook(books[1]), ade.returnBook(books[1]);
// console.log("\n\n ==> Books now in Jane's custody: \n", jane.booksInCustody);
// console.log(" ==> Books recorded as 'Borrowed Books in the library: \n", theLibrary.borrowedBooks);
// console.log(" ==> A look at the updated bookshelf after books have been returned: \n   ==> NB: This is the 'autobiography' section of bookshelf\n   ==>",theLibrary.bookshelf["autobiography"])

// export functions
module.exports = {
  Reader, Library
}