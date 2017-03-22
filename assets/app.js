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
var player1;
var player2;

database.ref().on("value", snapshot(snapshot));

function snapshot(snapshot) {
	//check if player one exists yet. it player 1 exists, set player two. if player1 !exists, set player1
	if (snapshot.child('player1').exists())
}

document.getElementById('start').addEventListener("click", displayPlayer);

function displayPlayer() {
	event.preventDefault();
	var player = document.getElementById('player-name').value;
	document.getElementById("player1").innerHTML = `<p>${player}</p><span>Wins:${wins} Losses:${losses}</span>`;
}