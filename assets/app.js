// Instructions

// Create a game that suits this user story:
// Only two users can play at the same time.
// Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
// The game will track each player's wins and losses.
// Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
// Styling and theme are completely up to you. Get Creative!
// Initialize Firebase

var config = {
  apiKey: "AIzaSyDmkjCyThokV22fOMuDUGbwafvYB3bxCDg",
  authDomain: "rps-game-d1ec9.firebaseapp.com",
  databaseURL: "https://rps-game-d1ec9.firebaseio.com",
  storageBucket: "rps-game-d1ec9.appspot.com",
  messagingSenderId: "1058873558218"
};

firebase.initializeApp(config);

var database = firebase.database();


var wins = 0;
var losses = 0;
player1 = {
	name:'',
	wins:0,
	losses:0
}
player2 = {
	name:'',
	wins:0,
	losses:0
}

// database.ref().on("value", snapshot(snapshot));

// function snapshot(snapshot) {
// 	//check if player one exists yet. if player1, set player2 status. if player1 !exist, set player1 status
// 	if (snapshot.child('player1').exists()){
// 		document.getElementById('player1-status').innerHTML()
// 	}
// }

document.getElementById('start').addEventListener("click", displayPlayer);

function displayPlayer() {
	event.preventDefault();
	var playerName = document.getElementById('player-name').value;
	if(player1.name === ''){
		player1.name = playerName;
		document.getElementById("player1").innerHTML = `<p>${player1.name}</p><span>Wins:${wins} Losses:${losses}</span>`;
		  // Save the new price in Firebase
		database.ref().set({
		  player1 : player1
		});
	}else{
		player2.name = playerName;
		document.getElementById("player2").innerHTML = `<p>${player2.name}</p><span>Wins:${wins} Losses:${losses}</span>`;
		database.ref().set({
		  player1 : player1
		});
		document.getElementById('form').style.visibility = "hidden";
	}
}