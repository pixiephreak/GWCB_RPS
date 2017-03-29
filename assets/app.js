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
	this.rock = document.getElementById('rock');
	this.paper = document.getElementById('paper');
	this.scissors = document.getElementById('scissors');
	this.playerName;
	this.hasOpponent = false;

	this.player1 = {
		userId:'player1',
		name:'',
		wins:0,
		losses:0,
		tool:''
	}
	this.player2 = {
		userId:'player2',
		name:'',
		wins:0,
		losses:0,
		choice:'',
		tool:''
	}

	//child_added doesnt listen second time.
	this.database.ref('users/').on("value", function(snapshot) {
		console.log(snapshot.val());

		if(snapshot.child("player1").exists() && !snapshot.child("player2").exists()){
			App.hasOpponent = true;
			console.log('adding player1 to html','userId'+ snapshot.val().player1.userId);
			this.player1.name = snapshot.val().player1.name;
			this.player1.wins = snapshot.val().player1.wins;
			this.player1.losses = snapshot.val().player1.losses;
			console.log('db '+ this.player1.name);
			//update values for player1 in DOM
			document.getElementById("player1").innerHTML = `<p>${this.player1.name}</p><span>Wins:${this.player1.wins} Losses:${this.player1.losses}</span>`;
			App.me = snapshot.val().player1.userId;
		}else if(snapshot.child("player1").exists() && snapshot.child("player2").exists()){
			console.log('adding player2 to html','userId'+snapshot.val().player2.userId);
			var name = snapshot.val().player2.name;
			var wins = snapshot.val().player2.wins;
			var losses = snapshot.val().player2.losses;
			console.log('db '+ name);
			//update values for player1 in DOM
			document.getElementById("player2").innerHTML = `<p>${name}</p><span>Wins:${wins} Losses:${losses}</span>`;
			document.getElementById("game-stage").innerHTML = `Wating for player 2`;
			document.getElementById('form').style.visibility = "hidden";
			App.me = snapshot.val().player2.userId;
		}
	});

	this.start.addEventListener("click", this.displayPlayer.bind(this));
	this.rock.addEventListener('click', this.displayRock.bind(this));

}




App.prototype.displayPlayer = function(event) {
	event.preventDefault();
	console.log('click ', this.player1.name);
	if(App.hasOpponent === false){
		console.log('writing player1');
		//TO-DO: refactor following code into a function in order to stay DRY
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player1.name = playerName;
		//upload data to firebase
		this.writeUserData('player1', this.player1.name, this.player1.tool , this.player1.wins, this.player1.losses);
		//log local val of playername
		console.log('local '+this.player1.name);
		localStorage.setItem('userId', this.player1.userId);
		localStorage.setItem('name', this.player1.name);
		document.getElementById('update').innerHTML= `${localStorage.getItem("name")}, You are ${localStorage.getItem("userId")}`;
		document.getElementById('game-controls').style.display = 'block';
		return false;
	}else{
		console.log('making local player2')
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player2.name = playerName;
		//upload data to firebase
		this.writeUserData('player2', this.player2.name, this.player2.tool , this.player2.wins, this.player2.losses);
		//log local val of playername
		console.log('local'+this.player2.name);
		// document.getElementById('game-controls').appendChild('<div>something</div>');
		localStorage.setItem('userId', this.player2.userId);
		localStorage.setItem('name', this.player2.name);
		document.getElementById('update').innerHTML= `${localStorage.getItem("name")}, You are ${localStorage.getItem("userId")}`;
		//create buttons in firebase and show on both screens?
		document.getElementById('game-controls').style.display = 'block';
		return false;
	}

}

App.prototype.writeUserData = function(userId, name, tool, wins, losses) {
	// var newPostRef = postListRef.push();
	// newPostRef.set({
	//     // ...
	// });
	var path = 'users/'+ userId;
	console.log(path);
  	this.database.ref(path).set({
  	userId: userId,
    name: name,
    tool: tool,
   	wins: wins,
   	losses: losses
  });
}

App.prototype.displayRock = function(){
	console.log(this);
	var me = localStorage.getItem("userId");
	// document.getElementById("game-stage").innerHTML = `${localStorage.getItem("userId")} chose rock`;
	console.log(this.me);
	this.player1.choice = "whatever";
	this.database.ref().set(this.player1);
	console.log(this.player1.choice);
}


window.onload = function() {
  localStorage.clear();
  //how to clear storage from old game?
  firebase.database().ref().remove();
  window.App = new App();
};