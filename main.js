var http=require("http");

http.createServer( function (request, response){

    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end("Hello Shruti");
}).listen(8081);

console.log("running at 8081");