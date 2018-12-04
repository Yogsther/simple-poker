//var socket = io.connect("nut.livfor.it:5982"); // For release
var socket = io.connect("localhost:5982"); // For local testing

class Card {
    constructor(number, type){
        /**
         * Number, 0 -> 12
         * 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
         * Types, 0 -> 3
         * Heart, Diamonds, Spades and Clubs
         */
        this.number = number;
        this.type = type; 
        this.icons = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
        this.titles = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
        this.types = ["Hearts", "Diamonds", "Spades", "Clubs"]
    }

    getColor(){
        if(this.type > 1) return "black";
            else return "red";
    }

    getNumber(){
        return this.icons[this.number];
    }

    getTitle(){
        return this.titles[this.number] + " of " + this.types[this.type];
    }

    getCard(){
        var card = document.createElement("div");
            card.classList.toggle("card");
    }
}

function checkRoomName(el){
    el.value = el.value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();   
}

function createRoom(){
    socket.emit("createRoom", {
        username: document.getElementById("username").value,
        roomName: document.getElementById("room-name").value 
    })
}

socket.on("joined", pack => {
    node = document.getElementById("logig-page");
    while(node.firstChild) node.removeChild(node.firstChild);
    console.log(pack)
})