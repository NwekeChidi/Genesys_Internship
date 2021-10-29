// route handlers
const fileUtil = require('./fileUtil');
const helper = require('./helper');

const routeHandler = {};

routeHandler.books = (data, callback) => {
    const acceptableHeaders = ["get", "post", "put", "delete"];
    if(acceptableHeaders.indexOf(data.method)>-1){
        routeHandler._books[data.method](data, callback);
    } else {
        callback(405);
    }
}
// main book route object
routeHandler._books = {};

// POST route
routeHandler._books.post = (data, callback) => {
    //validate that all required fields are filled out
    var name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var price = typeof (data.payload.price) === 'string' && !isNaN(parseInt(data.payload.price)) ? data.payload.price : false;
    var author = typeof (data.payload.author) === 'string' && data.payload.author.trim().length > 0 ? data.payload.author : false;
    var publisher = typeof (data.payload.publisher) === 'string' && data.payload.publisher.trim().length > 0 ? data.payload.publisher : false;
    
    
    if (name && price && author && publisher) {
        const fileName = helper.generateRandomString(30);
        fileUtil.create('books', fileName, data.payload, (err) => {
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
// GET route
routeHandler._books.get = (data, callback) => {
    if (data.query.name){
        fileUtil.read('books', data.query.name, (err, data) => {
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
// PUT route
routeHandler._books.put = (data, callback) => {
    if(data.query.name){
        fileUtil.update('books', data.query.name, data.payload, (err) => {
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
// DELETE route
routeHandler._books.delete = (data, callback) => {

    if (data.query.name) {
        fileUtil.delete('books', data.query.name, (err) => {
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

routeHandler.ping = (data, callback) => {
    callback(200, {respose: "Server is live"});
}
routeHandler.notfound = (data, callback) => {
    callback(404, {respose: "Not Found!"});
}

module.exports = routeHandler;