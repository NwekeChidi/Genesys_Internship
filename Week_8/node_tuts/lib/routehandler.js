// route handlers
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
routeHandler._books.post = (data, callback) => {};
// GET route
routeHandler._books.get = (data, callback) => {
    callback(200, {});
};
// PUT route
routeHandler._books.put = (data, callback) => {};
// DELETE route
routeHandler._books.delete = (data, callback) => {};

routeHandler.ping = (data, callback) => {
    callback(200, {respose: "server is live"});
}
routeHandler.notfound = (data, callback) => {
    callback(404, {respose: "Not Found!"});
}

module.exports = routeHandler;