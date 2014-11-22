var utils = require('./utils');
var db = require('./db');
var express = require('express');
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

//db.dbConnection.connect();
var objectId = 1;
var messages = [
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectId
  }
];

var actions = {
  'GET': function(request, response){
    var blah;
    // db.dbConnection.connect();
   // var nick = db.dbConnection.query("SELECT * FROM messages;");


    // console.log(nick);
    // db.dbConnection.end();
   sequelize
    .query('SELECT * FROM messages', null, { raw: true })
      .success(function(message) {
        blah = message;
      })

    utils.sendResponse(response, {results: blah});

  },
  'POST': function(request, response){
    utils.collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);


      // var Sequelize = require('sequelize');
      // var sequelize = new Sequelize('chat', 'root', 'poop', {
      //       dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      //       port:    3306, // or 5432 (for postgres)
      //     })
      // sequelize.authenticate().complete(function(err) {
      //     if (!!err) {
      //       console.log('Unable to connect to the database, you base fool:', err)
      //     } else {
      //       console.log('Connection has been established successfully you magnificent creature.')
      //     }
      //   });


      var tableHeaders = "(username, message, createdAt, roomName)";
      mysqlquery = "INSERT INTO messages " + tableHeaders + " VALUES ('" +message.text+"', '"+ message.username + "', NULL, \'\' );";
      //console.log(mysqlquery);
      sequelize
        .query(mysqlquery, null, { raw: true })
        .success(function(projects){
          // Each record will now be mapped to the project's DAO-Factory.
         // console.log(projects)
        });
       sequelize.sync();
      utils.sendResponse(response, {objectId: 1});
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response);
  }
};

module.exports = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
};







