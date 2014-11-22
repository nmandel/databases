var express = require('express');
var db = require('./db');
var basicServer = require('basic-server');
var requestHandler = require('request-handler');
var utils = require('utils');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

// Sequelize copied stuff: ****

var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', 'poop', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    })
sequelize.authenticate().complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database, you base fool:', err)
    } else {
      console.log('Connection has been established successfully you magnificent creature.')
    }
  });


console.log("WTF");

// ****

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

