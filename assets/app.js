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
	this.playerName;
	this.hasOpponent = false;

	this.wins = 0;
	this.losses = 0;
	this.player1 = {
		title:'player1',
		name:'',
		wins:0,
		losses:0
	}
	this.player2 = {
		title:'player2',
		name:'',
		wins:0,
		losses:0
	}

	this.database.ref().on('child_added', function(snapshot) {

		// TO-DO: use .limitToLast(1)?
		// question: is .val() js or jq ? If jq, why is it working?
		if(snapshot.val().title === 'player1'){
			App.hasOpponent = true;
			console.log('title'+snapshot.val().title);
			var name = snapshot.val().name;
			var wins = snapshot.val().wins;
			var losses = snapshot.val().losses;
			console.log('db '+ name);
			//update values for player1 in DOM
			document.getElementById("player1").innerHTML = `<p>${name}</p><span>Wins:${wins} Losses:${losses}</span>`;
		}else{
			console.log('title'+snapshot.val().title);
			var name = snapshot.val().name;
			var wins = snapshot.val().wins;
			var losses = snapshot.val().losses;
			console.log('db '+ name);
			//update values for player1 in DOM
			document.getElementById("player2").innerHTML = `<p>${name}</p><span>Wins:${wins} Losses:${losses}</span>`;
		}
	});

	this.start.addEventListener("click", this.displayPlayer.bind(this));

}

App.prototype.displayPlayer = function(event) {
	event.preventDefault();
	if(App.hasOpponent === false){
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player1.name = playerName;
		//upload data to firebase
		this.database.ref().push(this.player1);
		//log local val of playername
		console.log('local '+this.player1.name);

		return false;
	}else{
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player2.name = playerName;
		//upload data to firebase
		this.database.ref().push(this.player2);
		//log local val of playername
		console.log('local '+this.player2.name);

	}

	// 	document.getElementById('form').style.visibility = "hidden";

	// }else{

	// }
}


window.onload = function() {
  window.App = new App();
};