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
    const fname = helper.generateRandomString(30);
    fileUtil.create('books', fname, data.payload, (err)=>{
        if(!err){
            callback(200, {message: "Books Added Successfully", data:null});
        } else {
            callback(400, {message: "Could Not Add Book"})
        }
    })
};
// GET route
routeHandler._books.get = (data, callback) => {
    if (data.query.name){
        fileUtil.read('books', data.query.name, (err, data) => {
            if(!err && data){
                callback(200, {message: 'Book Retrieved', data:null})
            } else {
                callback(400, {err: err, data:data, message:'Could Not Get Book!'})
            }
        })
    } else {
        callback(404, {message: 'Book Not Found!', data:null})
    }
    
    callback(200, {});
};
// PUT route
routeHandler._books.put = (data, callback) => {};
// DELETE route
routeHandler._books.delete = (data, callback) => {};

routeHandler.ping = (data, callback) => {
    callback(200, {respose: "Server is live"});
}
routeHandler.notfound = (data, callback) => {
    callback(404, {respose: "Not Found!"});
}

module.exports = routeHandler;