CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
                      username VARCHAR(100),
                      message VARCHAR(160),
                      createdAt DATE,
                      roomName VARCHAR(100),
                      ID int(11) NOT NULL auto_increment, PRIMARY KEY (ID)
                      );

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

