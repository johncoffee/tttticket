var express = require('express');
var request = require('request');
//var cors = request("cors");

var app = express();

var staticPath = __dirname + "/../app/";
var apiHost = "http://localhost:8000";

//app.use(cors());

// set request defaults
request = request.defaults({
    jar: request.jar(),
    proxyHeaderWhiteList: ['Access-Control-Allow-Origin', 'Cookie']
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

app.use("/", express.static(staticPath, {
    etag: false,
}) );

app.all('/api/*', pipeApiRequest);

function pipeApiRequest(req, res) {
    var target = apiHost + req.url;
    //console.log('piping request to:' + target);
    var options = {
        url: target,
    };
    res.contentType('json');
    req.pipe(request(options)).pipe(res);
}

app.listen(3000, function() {
    console.log('Serving on port 3000');
});
