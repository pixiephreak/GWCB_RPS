// Instructions

// Create a game that suits this user story:
// Only two users can play at the same time.
// Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
// The game will track each player's wins and losses.
// Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
// Styling and theme are completely up to you. Get Creative!
// Initialize Firebase

function App(){

	this.database = firebase.database();
	this.start = document.getElementById('start');

	this.wins = 0;
	this.losses = 0;
	this.player1 = {
		name:'',
		wins:0,
		losses:0
	}
	this.player2 = {
		name:'',
		wins:0,
		losses:0
	}

	// database.ref().on("child_added", snapshot(snapshot));

	// function snapshot(snapshot) {
	// 	//check if player one exists yet. if player1, set player2 status. if player1 !exist, set player1 status
	// 	if (snapshot.child('player1').exists()){
	// 		document.getElementById('player1-status').innerHTML()
	// 	}
	// }

	this.start.addEventListener("click", this.displayPlayer.bind(this));

}

App.prototype.displayPlayer = function(event) {
	event.preventDefault();

	var playerName = document.getElementById('player-name').value;
	if(player1.name === undefined){
		document.getElementById('update').innerHTML = `${playerName}, you are player 1`
		player1.name = playerName;
		document.getElementById("player1").innerHTML = `<p>${player1.name}</p><span>Wins:${this.wins} Losses:${this.losses}</span>`;
		  // Save the new price in Firebase
		this.database.ref().set({
		  player1 : player1
		});
		document.getElementById('form').style.visibility = "hidden";

	}else{
		document.getElementById('update').innerHTML = `${playerName}, you are player 2`
		player2.name = playerName;
		document.getElementById("player2").innerHTML = `<p>${player2.name}</p><span>Wins:${this.wins} Losses:${this.losses}</span>`;
		this.database.ref().set({
		  player2 : player2
		});
		document.getElementById('form').style.visibility = "hidden";
	}
}

window.onload = function() {
  window.App = new App();
};