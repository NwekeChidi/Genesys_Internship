console.log("Hello Node!")

/**
 * Entry file to out application
 */

const http = require('http');
//const { parse } = require('path/posix');
const url = require('url');
const {StringDecoder} = require("string_decoder");

const httpServer = http.createServer((req, res)=> {
    //perform other actions
    console.log("\nThis is in the server!.....");
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    const trimmedPath = pathName.replace(/^\/+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObj = parseUrl.query;
    const header = req.headers;
    const decoder = new StringDecoder('utf-8');

    var buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () =>{
        buffer += decoder.end();

        console.log("Decoded result", buffer);
        const loadObj = buffer !== '' ? JSON.parse(buffer) : {};
        
        
        res.setHeader("Content-type", "application/json");
        res.write(JSON.stringify({response: "Request got the server on write.",
                                   payload: loadObj}));
        //res.end("Request got to the server on end.");
        res.end();
        console.log("The url gotten was:", trimmedPath, "and the method is:", method);
    });

    //console.log("Header obj:", header);
    //console.log(req)

    
});

// fire up server
let port = 8080;
httpServer.listen(port, ()=> {
    console.log("Server is fired and is listening on port", port)
});