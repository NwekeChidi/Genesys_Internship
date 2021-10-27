// route handlers
const routeHandler = {};

routeHandler.ping = (data, callback) => {
    callback(200, {respose: "server is live"});
}
routeHandler.notfound = (data, callback) => {
    callback(404, {respose: "Not Found!"});
}

module.exports = routeHandler;