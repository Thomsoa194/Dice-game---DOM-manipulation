

var scores, roundScore, activePlayer, gamePlaying;

init();
var lastDice;



 
  document.querySelector('.dice').style.display = 'none';
 





 document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
            // 1. random number
       
       var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    var diceDOM = document.querySelector('.dice'); //This is our selection
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    /// 3. Update the round score, but only if the rolled number is not a one .
    if (dice === 6 && lastDice ===6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
    }
    else if (dice !== 1) {
        // Add score This is the difference operator. 
        roundScore += dice; // This is the same as typing the expression like this roundScore = roundScore + dice. We have access to this variable because it was defined in the global scope. Think back to the scope chain
        // Udpate in the UI
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else  {
     nextPlayer();
    }
    
    lastDice = dice;
    
    
 }
 });
 



 document.querySelector('.btn-hold').addEventListener('click', function() {
 
    if (gamePlaying) {
        
                //Define what happens when the user clicks - Add current score to the user's global score
    scores[activePlayer] += roundScore; // Remember this is the same as writing roundScore = scores[activePlayer] + roundScore
    
    // Update the UI - Some DOM manipulation
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    
    // Undefined, null, or an empty string are coerced to false
    // Anything else is coerced to true
    
    // We also need to make sure after activePlayer clicks hold, the activePlayer switches
    // We have code from before which switches the player, but our code ought to be dry. So let's implement a new function called nextPlayer
    if (scores[activePlayer] >= winningScore) { //Check if player won the game. we're going to replace the player label with the name winner
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';// It's not best to mix CSS with JS. If we have a lot of styles to change
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer(); // Now we need to hide the dice and remove the active class from the player name
    }
    
    }
   
  
});
    
 
    function nextPlayer() {
            
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // This is called the ternary operator
        // We need to set the roundScore back to 0 after a player switches. In the UI as well
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        // The red do next to the active player UI is a HTML class called 'active'. In JS we can remove and add this class
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        // We also need to make it change back when the turn return to player-1 We use toggle for this.
        // We want to hide the dice when a player roles a one
        document.querySelector('.dice').style.display = 'none';
        }
 
 document.querySelector('.btn-new').addEventListener('click', init);
 
 function init() {
        scores = [0, 0];
        activePlayer= 0;
        roundScore = 0;
        gamePlaying = true;
    
        document.getElementById('score-0').textContent  = '0';
        document.getElementById('score-1').textContent  = '0';
        document.getElementById('current-0').textContent  = '0';
        document.getElementById('current-1').textContent  = '0';
        document.getElementById('name-0').textContent  = 'Player 1';
        document.getElementById('name-1').textContent  = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        
 }
 