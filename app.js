/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Initialize score variables
var scores, roundScore, activePlayer, gamePlaying, previousRoll;

// Initialize New Game
init();


// event listener for the dice roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying){
    // 1. random number
    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;

    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'img/dice-'+dice1+'.png';
    document.getElementById('dice-2').src = 'img/dice-'+dice2+'.png';

    // 3. Update the round score IF the rolled number is NOT a 1 OR 2 sixes in a row
    if (dice1 !== 1 && dice2 !== 1){
      // Add score
      roundScore += dice1+dice2;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }else {
      // Next Player
      nextPlayer();
    }
    /*
    if (dice !== 1){
      // Check for 2 6's in a row
      if (previousRoll === 6 && dice === 6){
        // Lose ENTIRE score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // End turn
        nextPlayer();
      }else{
        // add to current score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // Save dive roll to previousRoll
        previousRoll = dice;
      }
    }else {
      // round ends / reset roundscore
      nextPlayer();
    }
    */
  }
});

// event listener for the hold score button
document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying){
    // 1. add roundScore to active players global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    // Make sure that the input is a truthy value
    if (input){
      winningScore = input;
    }else {
      winningScore = 100;
    }
    // Check if player won the game
    if (scores[activePlayer] >= winningScore){
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      // Next Player
      nextPlayer();
    }
  }
});


function nextPlayer(){
  // round ends / reset roundscore
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // reset the round score for each player
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Toggle active player style
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hide the dice when 1 is rolled
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  // Reset Previous Roll
  previousRoll = 0;
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  // Begin New Game
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Hide the dice at the begining - before it has ever been rolled
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  // Set all displayed scores to 0 to begin the game
  // * this is a different way to select HTML elemens aside from 'querySelector'
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Set Player Names in UI
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // remove winner class and active class from both players
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}