var express = require('express');
var request = require('request');
//var cors = request("cors");

// settings
var port = process.env.PORT || 3000;
var staticPath = __dirname + "/../public/";
var apiHost = "http://localhost:8000/";


var app = express();

app.all('/api/*', function(req, res) {
    var matches = req.url.match(/api\/(.+)$/);
    if (matches && matches[1]) {
        var path = matches[1];
        var options = {
            url: apiHost + path,
        };

        req.pipe(request(options)).pipe(res);    
    }
    else {
        res.statusCode = 404;  
        res.end();
    }
});

// static files

app.use("/", express.static(staticPath, {
    etag: false,
}) );

app.listen(port, function() {
    console.log('Serving on port '  + port);
});
