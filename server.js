var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const hbs = require("express-handlebars");

var PORT = 3000;
app.engine('handlebars', hbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set("view engine", "handlebars");

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Routes
require("./routes/htmlroutes")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
