// Instructions

// Create a game that suits this user story:
// Only two users can play at the same time.
// Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
// The game will track each player's wins and losses.
// Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
// Styling and theme are completely up to you. Get Creative!
// Initialize Firebase

function App(){
	// console.log(this);
	this.self = this;
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

	this.database.ref().on('child_added', function(snapshot) {
		console.log(this);
		console.log('in fb');
			// TO-DO : how to nav to children?
			console.log(snapshot.val().name);
		//check if player one exists yet in FB
		if (snapshot.child('player1').exists()){
			console.log('in fb');
			console.log(snapshot.val().player1);
			// set value in local object to vaule from FB
			this.player1 = snapshot.val().player1;
			// update html to refelct current val in fb
		}else{
			// document.getElementById('update').innerHTML = `${playerName}, you are player 2`
			// player2.name = playerName;
			// document.getElementById('form').style.visibility = "hidden";
		}
	});

	this.start.addEventListener("click", this.displayPlayer.bind(this));

}

App.prototype.displayPlayer = function(event) {
	event.preventDefault();

	var playerName = document.getElementById('player-name').value;
	if(player1.name === undefined){
		document.getElementById('update').innerHTML = `${playerName}, you are player 1`
		player1.name = playerName;
		document.getElementById("player1").innerHTML = `<p>${player1.name}</p><span>Wins:${this.wins} Losses:${this.losses}</span>`;
		  // Save the new price in Firebase. TO-DO use set or push?
		this.database.ref().push({
		  player1 : player1
		});
		document.getElementById('form').style.visibility = "hidden";

	}else{

	}
}


window.onload = function() {
  window.App = new App();
};