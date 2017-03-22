// Instructions

// Create a game that suits this user story:
// Only two users can play at the same time.
// Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
// The game will track each player's wins and losses.
// Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
// Styling and theme are completely up to you. Get Creative!

var wins = 0;
var losses = 0;
var player1 = false;

document.getElementById('start').addEventListener("click", displayPlayer);

function displayPlayer() {
	player1 = true;
	event.preventDefault();
	var player = document.getElementById('player-name').value;
	document.getElementById("player1").innerHTML = `<p>${player}</p><span>Wins:${wins} Losses:${losses}</span>`;
}