/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// we only want one score variable, so we will use an array. So our code is clean.
// For our active scores varivale, 0 is for one player and 1 is for the other, whoever is playing.
// Our array is 0 based so we set the variable to 0 to begin with
// For the dice we need to calculate a random numnber
// Math.random js object will give our a random number between 0 and 1.
// However this gives our a number with many decimals. Thus we use the Math.floor object to make it a whole number. Then we add one so it's between 1 & 6.
// We changed the content on a HTML element in the querySelector
// If we want to put HTML in the selected HTML element, we use inner HTML method. This allows use to italicise the current score
// We use a getter, because we get a value for the #score-0 HTML element, because we read it and we get a value
// We can also use the query selector to change the CSS of an element, we can use the style method and then the CSS property

//Events are like notifications that are sent to notify our code that something happened on the web page
//For example, clicking a buttion, re-sizing a window, scrolling down
// We use event listerners to code responses to all these events. It's just a function that waits for an event to happen.
//An event can only be processed the execution stack is empty(all the functions have returned).
// We also have the message queue. Where events wait to be processed.
// The event listener is a function, thereby getting its own execution stack. 

var scores, roundScore, activePlayer, gamePlaying;

init();



// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//  var x = document.querySelector('#score-0').textContent;
 //console.log(x);
 
  document.querySelector('.dice').style.display = 'none';
 
 // How to set up an event handler
 // What a callback function is
 // What a anonymous function is
 //Another way to select elements by their id
 // How to change the name in a <img> element
 
 // button has a class of btn-roll in HTML
 // There are a lot of event types MDN webpage, where the order precedence table is..There are loads of events!!!
 // We need to call a function for when we click the button
 // To call the function we simply need btn();
 // The button function is a callback function, meaning it is not called by us, but another function. An event in this cirmcumstance
 // An anonymous function is one that doesn't have a name so cannot be reused outside of a given context.
 // Here an anonymous function is the best option, as we do not want the btn function to be used anywhere else in our code.
 // we ought to declare our dice variable within the anonymous function. Due to the scope chain, we will only have access to variable within this scope, and
 //not outside.
 // It is non-sensical to repeat yourself  when displaying dice result therefore, we will create a variable where we store the selection then use it wherever we need it.
 // It is very simple to change the source attribute from our HTML using JS. We use 'src'
// We need to set all the scores to 0 to begin with
// We will use the document.getElementById it's faster!!




 document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
            // 1. random number
       var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    var diceDOM = document.querySelector('.dice'); //This is our selection
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    /// 3. Update the round score, but only if the rolled number is not a one .
    if (dice !== 1) {
        // Add score This is the difference opeartor. 
        roundScore += dice; // This is the same as typing the expression like this roundScore = roundScore + dice. We have access to this variable because it was defined in the global scope. Think back to the scope chain
        // Udpate in the UI
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
    }

    });
 

 // We will learn what the ternary operator
 // How to toggle, remove and add HTML classes
 
 // How to use functions to correctly apply the dry principle
 // How to think about the game logic like a programmer
 
 // first we will update our scores
 // Let's set up an events listener for button hold
 document.querySelector('.btn-hold').addEventListener('click', function() {
 
    if (gamePlaying) {
        
                //Define what happens when the user clicks - Add current score to the user's global score
    scores[activePlayer] += roundScore; // Remember this is the same as writing roundScore = scores[activePlayer] + roundScore
    
    // Update the UI - Some DOM manipulation
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // We also need to make sure after activePlayer clicks hold, the activePlayer switches
    // We have code from before which switches the player, but our code ought to be dry. So let's implement a new function called nextPlayer
    if (scores[activePlayer] >= 100) { //Check if player won the game. we're going to replace the player label with the name winner
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
 