// route handlers
const fileUtil = require('./fileUtil');
const helper = require('./helper');

const routeHandler = {};
const acceptableHeaders = ["get", "post", "put", "delete"];

routeHandler.admin = (data, callback) => {
    if(acceptableHeaders.indexOf(data.method)>-1){
        routeHandler._books[data.method](data, callback);
    } else {
        callback(405);
    }
}
routeHandler.users = (data, callback) => {
    if(acceptableHeaders.indexOf(data.method)>-1){
        routeHandler._users[data.method](data, callback);
    } else {
        callback(405);
    }
}
// main book route object
routeHandler._books = {}, routeHandler._users = {};

//// POST route
routeHandler._books.post = (data, callback) => {
    //validate that all required fields are filled out
    var name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var price = typeof (data.payload.price) === 'string' && !isNaN(parseInt(data.payload.price)) ? data.payload.price : false;
    var author = typeof (data.payload.author) === 'string' && data.payload.author.trim().length > 0 ? data.payload.author : false;
    var publisher = typeof (data.payload.publisher) === 'string' && data.payload.publisher.trim().length > 0 ? data.payload.publisher : false;
    var copies = typeof(data.payload.copies) === 'number' && !isNaN(data.payload.copies) > -1 ? data.payload.copies : false;
    var genre = typeof (data.payload.genre) === 'string' && data.payload.genre.trim().length > 0 ? data.payload.genre : false;
    
    if (name && price && author && publisher && copies && genre) {
        //const fileName = helper.generateRandomString(name, 10);
        const fileName = name.split(" ").join("_").toLowerCase();
        fileUtil.create( genre, fileName, data.payload, (err) => {
          if (!err) {
            callback(200, { message: "Book Added Succesfully!", data: data.payload });
          } else {
            callback(400, { err: err, message: "Could Not Add Book" });
          }
        });
    } else {
        callback(400, { message: "Some Fields Are Incorrect!" });
    }
};
//users
routeHandler._users.post = (data, callback ) => {
    const emailPattern = /^[a-z\d\S]{3,63}@[a-z\d-]{3,63}.com$/gi;
    const email = emailPattern.test(data.payload.email) === true ? data.payload.email : false;
    const firstName = typeof (data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    const lastName = typeof (data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    const address = typeof (data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
    
    if (email && firstName && lastName && address) {
        fileUtil.createUser( data.payload, (err) => {
          if (!err) {
            callback(200, { message: "User Added Succesfully!", data: data.payload });
          } else {
            callback(400, { err: err, message: "Could Not Add User" });
          }
        });
    } else {
        callback(400, { message: "Some Fields Are Incorrect!" });
    }
};


// GET route
routeHandler._books.get = (data, callback) => {

    let genre = typeof(data.query.name) !== 'undefined' ? helper.get_key(data.query.name).key_book : data.query.name;
    if(data.query.name){
        fileUtil.read(genre, data.query.name, (err, data) => {
            if(!err && data){
                callback(200, {message: 'Book Retrieved', data:data})
            } else {
                callback(400, {err: err, data:data, message:'Could Not Get Book!'})
            }
        })
    } else {
        callback(404, {message: 'Book Not Found!', data:null})
    }
};

// users
routeHandler._users.get = (data, callback) => {
    let userID = data.query.id; userMail = helper.get_key(userID).key_user;
    let all_users = helper.get_key(userID).all_keys_users;
    if (all_users.includes(userMail)){
        routeHandler._books.get(data, callback);
    } else {
        callback(200, {message: "Please Register First!"})
    }
}



// PUT route
routeHandler._books.put = (data, callback) => {
    if(data.query.name){
        fileUtil.update(genre, data.query.name, data.payload, (err) => {
            if(!err){
                callback(200, {message: 'Book Updated Successfully', data: data.payload})
            } else {
                callback(400, {err: err, message:'Could Not Update Book', data:null})
            }
        })
    } else {
        callback(404, {message: 'Book Not Found', data:null})
    }
};
// users
routeHandler._users.put = (data, callback) => {
    let userID = data.query.id; userMail = helper.get_key(userID).key_user;
    let all_users = helper.get_key(userID).all_keys_users; reqs = data.query.req;
    let genre = typeof(data.query.genre) !== 'undefined' ? data.query.genre: helper.get_key(data.query.name).key_book;
    let action = typeof(reqs) === 'string' && ["borrow", "return"].includes(reqs) ? reqs : false;

    if (action){
        if (all_users.includes(userMail)){
            fileUtil.bRBook(genre, userID, data.query.name, action, (err) => {
                if (!err){
                    callback(200, {message: "Action Carried Out Succesfully!"})
                } else {
                    callback(400, {err, err, message: "Could Not Perform Action", data: null})
                }
            })
        } else {
            callback(400, {message: "Please Register First!"})
        }
    } else {
        callback(404, {message: "No Action Detected", data: null})
    }
}


// DELETE route
routeHandler._books.delete = (data, callback) => {

    if (data.query.name) {
        fileUtil.delete(genre, data.query.name, (err) => {
            if (!err) {
                callback(200, {message: 'Book Deleted Successfully'});
            } else {
                callback(400, {err: err, message: 'Could Not Delete Book'})
            }
        })
    } else {
        callback(404, {message: 'Book Not Found!'})
    }
};
// users
routeHandler._users.delete = (data, callback) => {
    if (data.query.email){
        fileUtil.deleteUser(data.query.email, (err) => {
            if (!err){
                callback(200, {message: "User Deleted!"});
            } else {
                callback(400, {err: err, message: "Could Not Delete User"})
            }
        })
    } else {
        callback(404, {message: "User Not Found!"})
    }
}

routeHandler.ping = (data, callback) => {
    callback(200, {respose: "Server is live"});
}
routeHandler.notfound = (data, callback) => {
    callback(404, {respose: "Not Found!"});
}

routeHandler.books = (data, callback) => {
    const all_books_obj = helper.all_genres;
    const all_books = [].concat.apply([], Object.values(all_books_obj));
    const allBooks = [];
    all_books.forEach(book => allBooks.push(helper.toTitle(book)));
    callback(200, {response: allBooks})
}

module.exports = routeHandler;