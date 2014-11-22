CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
                      message VARCHAR(160),
                      createdAt DATE,
                      roomName VARCHAR(100),
                      messageid int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                      usernames int(11) DEFAULT NULL
                      );

CREATE TABLE users (
                    userid int(11) NOT NULL AUTO_INCREMENT,
                    username VARCHAR(100),
                    PRIMARY KEY (userid)
                    );


ALTER TABLE messages ADD FOREIGN KEY (usernames) REFERENCES users(userid);
/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

