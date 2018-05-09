// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var path = require('path');


// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// fix cors errors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

// middleware to use for all requests
app.use(express.static(path.join(__dirname + '/public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(methodOverride("_method"));

// Routes =============================================================


//Starting our express app
// Listen for requests
var server = app.listen(port, function() {
  console.log('Magic happens on port ' + port);
});
