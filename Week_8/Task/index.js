console.log("Hello Node!")

/**
 * Entry file to out application
 */

const http = require('http');
const url = require('url');
const {StringDecoder} = require("string_decoder");
const routeHandler = require("./lib/routehandler");

const httpServer = http.createServer((req, res)=> {
    //perform other actions
    console.log("\nThis is in the server!.....");
    // parse the incoming url
    const parseUrl = url.parse(req.url, true);
    // get the path name
    const pathName = parseUrl.pathname;
    const trimmedPath = pathName.replace(/^\/+|\/+$/g, "");
    // get the HTTP method
    const method = req.method.toLowerCase();
    // get the query string
    const queryStringObj = parseUrl.query;
    // get the request headers
    const header = req.headers;

    // initialize decoder
    const decoder = new StringDecoder('utf-8');

    var buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () =>{
        buffer += decoder.end();

        //console.log("Decoded result", buffer);
        const loadObj = buffer !== '' ? JSON.parse(buffer) : {};
        
        // compose data
        const data = {
            trimmedPath: trimmedPath,
            query: queryStringObj,
            method: method,
            headers: header,
            payload: loadObj
        }
        const chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notfound;
        // use the chosen handler to handle the request
        chooseHandler(data, (statusCode, result) => {
            
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            result = typeof(res) === 'object' ? result : {};

            const responseObj = JSON.stringify(result);
            
            res.setHeader('Content-type', "application/json");
            res.writeHead(statusCode);
            
            res.write(responseObj);
            //res.end("Request got to the server on end.");
            res.end();
            console.log("The url gotten was:", trimmedPath, "and the method is:", method);
        });

    });
    //console.log("Header obj:", header);
    //console.log(req)   
});

// fire up server
let port = 8080;
httpServer.listen(port, ()=> {
    console.log("Server is fired and is listening on port", port)
});

const router = {
    ping : routeHandler.ping,
    books : routeHandler.books,
    admin: routeHandler.admin,
    users : routeHandler.users,
    notfound: routeHandler.notfound
}

