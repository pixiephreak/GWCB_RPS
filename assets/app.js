// Instructions

// Create a game that suits this user story:
// Only two users can play at the same time.
// Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
// The game will track each player's wins and losses.
// Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
// Styling and theme are completely up to you. Get Creative!
// Initialize Firebase

function App(){

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
		tool:''
	}



	this.database.ref('users/').on("value", function(snapshot) {

		if(snapshot.child("player1").exists() && !snapshot.child("player2").exists()){
			App.hasOpponent = true;
			App.createPlayer('player1', snapshot.val().player1)
		}else if(snapshot.child("player1").exists() && snapshot.child("player2").exists()){
			App.createPlayer('player2' , snapshot.val().player2);
			document.getElementById("game-stage").innerHTML = `Player 1's turn`;
			document.getElementById('form').style.visibility = "hidden";
		}

		if(snapshot.child("player1/tool").val() === 'rock'){
			document.getElementById('game-stage').innerHTML = ` Player 1 chose rock. Player 2's Turn.`;
		}
	});

	this.start.addEventListener("click", this.displayPlayer.bind(this));
	this.rock.addEventListener('click', this.displayRock.bind(this));

}




App.prototype.displayPlayer = function(event) {
	event.preventDefault();

	if(App.hasOpponent === false){
		//TO-DO: refactor following code into a function in order to stay DRY
		// save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player1.name = playerName;
		//upload data to firebase
		this.writeUserData('player1', this.player1.name, this.player1.tool , this.player1.wins, this.player1.losses);
		//log local val of playername
		localStorage.setItem('userId', this.player1.userId);
		localStorage.setItem('name', this.player1.name);
		document.getElementById('update').innerHTML = `${localStorage.getItem("name")}, You are ${localStorage.getItem("userId")}`;
		document.getElementById('game-controls').style.display = 'block';
		return false;
	}else{
		//save user input to var
		var playerName = document.getElementById('player-name').value;
		//save new name in local obj
		this.player2.name = playerName;
		//upload data to firebase
		this.writeUserData('player2', this.player2.name, this.player2.tool , this.player2.wins, this.player2.losses);
		//log local val of playername
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
  	this.database.ref(path).set({
  	userId: userId,
    name: name,
    tool: tool,
   	wins: wins,
   	losses: losses
  });
}

App.prototype.createPlayer = function(localPlayer, snappedPlayer){
			localName = snappedPlayer.name;
			localWins = snappedPlayer.wins;
			localLosses = snappedPlayer.losses;
			//update values for player1 in DOM
			document.getElementById(`${localPlayer}`).innerHTML = `<p>${localName}</p><span>Wins:${localWins} Losses:${localLosses}</span>`;

			App.me = snappedPlayer.userId;
}

App.prototype.displayRock = function(){
	var me = localStorage.getItem('userId');
	console.log(`me: ${me}`);
	console.log(`Player 1 tool: ${this.player1.tool}`);
	console.log(`Player 2 tool: ${this.player2.tool}`);

	if (me === 'player1'){
		if(this.player2.tool === ''){
			this.writeUserData('player1', 'player1', 'rock', 0, 0);
		}
	}

	if (me === 'player2'){
		console.log(this.player1.tool);
	}


	// document.getElementById("game-stage").innerHTML = `${me} chose rock`;

	// if(userSelectionEvent.toLowerCase() === "r" && compSelection === s || userSelectionEvent.toLowerCase() === "s" && compSelection === p || userSelectionEvent.toLowerCase() === "p" && compSelection === r){
	// 	userScore.innerHTML = userTally+= 1;
	// }else if(compSelection === r && userSelectionEvent.toLowerCase() === "s" || compSelection === p && userSelectionEvent.toLowerCase() === "r" || compSelection === s && userSelectionEvent.toLowerCase() === "p"){
	// 	compScore.innerHTML = compTally+= 1;
	// }else if (userSelectionEvent.toLowerCase() === "r" || userSelectionEvent.toLowerCase() === "s" || userSelectionEvent.toLowerCase() === "p"){
	// 	alert("Tie! Try again.")
	// }else{
	// 	alert("Please restrict your choice to R, S, or P")
	// }
	// if(this.me === 'player2'){
	// 	this.player2.tool = 'rock';
	// 	this.writeUserData(this.player2.userId, this.player2.name, this.player2.tool, this.player2.wins, this.player2.losses);
	// }else {
	// 	this.player2.tool = 'rock';
	// 	this.writeUserData(this.player1.userId, this.player1.name, this.player1.tool, this.player1.wins, this.player1.losses);
	// };
}



window.onload = function() {
  localStorage.clear();
  //clear fb db from previous game
  firebase.database().ref().remove();
  window.App = new App();
};