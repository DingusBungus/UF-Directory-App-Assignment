var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /* Check the parsed url for /listings and display listings if found */
   if (parsedUrl.path == '/listings') {
      response.end(listingData);
   } else { /* Otherwise set status to 404 and display Bad Gateway Error */
      response.statusCode = 404;
      response.end('Bad gateway error');
   }
};

/* toString() the file for printing */
fs.readFile('listings.json', 'utf8', function(err, data) {
   listingData = data.toString();

   /* Actually create the server*/
  server = http.createServer(requestHandler);
  server.listen(port, function() {
      console.log('Listening...');
  });
});
