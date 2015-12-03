var express = require('express');
var request = require('request');
var app = express();

var staticPath = __dirname + "/../app/";
var apiHost = "localhost:8000";

// set request defaults
request = request.defaults({
    jar: request.jar(),
    proxyHeaderWhiteList: ['Access-Control-Allow-Origin', 'Cookie']
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use("/", express.static(staticPath, {
    etag: false,
}) );

app.all('/api/*', pipeApiRequest);

function pipeApiRequest(req, res) {
    var target = req.protocol + '://' + apiHost + req.url;
    //console.log('piping request to:' + target);
    var options = {
        url: target
    };
    req.pipe(request(options)).pipe(res);
}

app.listen(3000, function() {
    console.log('Serving on port 3000');
});
