var utils = require('./utils');
var db = require('./db');
// var mysql = require('mysql');
db.dbConnection.connect();
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
    // db.dbConnection.connect();
    var nick = db.dbConnection.query("SELECT * FROM messages;");
    //console.log(nick);
    // db.dbConnection.end();

    utils.sendResponse(response, {results: messages});

  },
  'POST': function(request, response){
    utils.collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);
      var tableHeaders = "(username, message, createdAt, roomName)";
      mysqlquery = "INSERT INTO messages " + tableHeaders + " VALUES ('" +message.text+"', '"+ message.username + "', NULL, \'\' );";
      console.log(mysqlquery);
      db.dbConnection.query(mysqlquery);
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







