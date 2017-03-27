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
			App.me = snapshot.val().title;
		}else{
			console.log('title'+snapshot.val().title);
			var name = snapshot.val().name;
			var wins = snapshot.val().wins;
			var losses = snapshot.val().losses;
			console.log('db '+ name);
			//update values for player1 in DOM
			document.getElementById("player2").innerHTML = `<p>${name}</p><span>Wins:${wins} Losses:${losses}</span>`;
			document.getElementById("game-stage").innerHTML = `Player 1's Turn`;
			document.getElementById('form').style.visibility = "hidden";
			App.me = snapshot.val().title;
		}
	}).bind(this);

	this.start.addEventListener("click", this.displayPlayer.bind(this));

}

App.prototype.displayPlayer = function(event) {
	event.preventDefault();
	if(App.hasOpponent === false){
		//TO-DO: refactor following code into a function
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player1.name = playerName;
		//upload data to firebase
		this.database.ref().push(this.player1);
		//log local val of playername
		console.log('local '+this.player1.name);
		localStorage.setItem('title', this.player1.title);
		localStorage.setItem('name', this.player1.name);
		document.getElementById('update').innerHTML= `${localStorage.getItem("name")}, You are ${localStorage.getItem("title")}`;
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
		// document.getElementById('game-controls').appendChild('<div>something</div>');
		localStorage.setItem('title', this.player2.title);
		localStorage.setItem('name', this.player2.name);
		document.getElementById('update').innerHTML= `${localStorage.getItem("name")}, You are ${localStorage.getItem("title")}`;
		//create buttons in firebase and show on both screens?
		return false;
	}

}

App.prototype.createButton = function(){
	//TO-DO: refactor to create button once with param;
	var rockButton = document.createElement('button');
		rockButton.innerHTML = 'rock';
		document.getElementById('game-controls').appendChild(rockButton);
		var paperButton = document.createElement('button');
		paperButton.innerHTML = 'paper';
		document.getElementById('game-controls').appendChild(paperButton);
		var scissorsButton = document.createElement('button');
		scissorsButton.innerHTML = 'scissors';
		document.getElementById('game-controls').appendChild(scissorsButton);
}




window.onload = function() {
  localStorage.clear();
  //how to clear storage from old game?
  // firebase.database().ref().remove();
  window.App = new App();
};