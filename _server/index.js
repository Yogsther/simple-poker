/**
 * Smash Rate, Server side. 
 * NodeJS, Socket io and mysql
 */

/* Choose a port */
var port = 5982;
/**
 *  Import node modules
 *  - Socket, socket io
 *  - mysql - Database
 *  - sanitize (sqlstring) sanitize sql queries
 *  - md5, encrypt passwords
 *  - fs, file-chooser, browse and load JSON's for items and monsters.
 */
var socket = require("socket.io");
var mysql = require("mysql");
var sanitize = require('sqlstring');
var md5 = require('md5');
var fs = require("fs");

var express = require("express");
var app = express();

var rooms = [];

var server = app.listen(port, function () {

  var io = socket(server);

  console.log("Server started")

  io.on("connection", socket => {

    socket.on("createRoom", pack => {
        var room = new Room(pack.roomName, new Player(pack.username, socket.id, 1000));
        rooms.push(room);
        console.log("Created room");
        socket.emit("joined", room.getSafe());
    })

    /* END OF SOCKET */
  })
});

class Room {
  constructor(name, host /*Player*/ ){
    this.players = [];
    this.dealerPosition = 0;
    this.name = name;
    this.players.push(host);
    this.deck = new Array(52);
  }

  getSafe(){
    // Get a safe version of the room, without the cards - for sending out to other players.
    var safePlayers = this.players.slice();
    for(var player of safePlayers){
      player.cards = ['censored', 'censored'];
    }
    var safeRoom = Object.assign({}, this);
    safeRoom.players = safePlayers;
    return safeRoom;
  }

  startNewRound(){
    for(var player of this.players){
      if(player.money > 0){

      }
    }
  }


}

class Player{
  constructor(username, socketid, money){
    this.cards = new Array(2);
    this.socketid = socketid;
    this.username = username;
    this.money = money;
  }
}