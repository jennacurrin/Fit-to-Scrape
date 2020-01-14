// Require dependencies/ Require ORM npm package
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up port
var PORT = process.env.PORT || 3000;

// Instantiate express app
var app = express();

// Set up an express router
var router = express.Router();

// Designate public folder as static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express App
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use Body Parsar in our App
app.use(bodyParser.urlencoded({
    extended: false
})); 

// Have every request go through our router and middleware
app.use(router);

// If deployed, use the deployed database. Otherwise, use the local mongoHeadlines Database. (accessing what is on our local machine ) 
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error){
    // log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // Or log sucess message
    else {
        console.log("mongoose connection is sucessful");
    }
});

// Listen on port
app.listen(PORT, function(){
    console.log("Listening on port:" + PORT);
});

