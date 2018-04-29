// Set an array of answers
// set an array of letters
// set variables (puzzle answer, current puzzle, right guesses, wrong guesses, guesses left, counters)
// set up on loading
// reset of game
// Functions (randome puzzle, convert puzzle to game format, outcomes, capture keystroke as guess and determine if right or wrong, how may times it appears in puzzle, and where, , )
// splice guessed letter out of letter array
// win loss
// all appropriate







var arrPuzzleOptions = ["trudeau", "borden", "laurier", "mackenzie king", "diefenbaker", "clark", "chretien", "macdonald", "turner", "tupper", "meighen", "martin", "st laurent"];
var puzzleAnswer = randomPuzzle();
var currentPuzzle = [];
var remainingGuesses = 10;
var wrongGuesses = [];
var allGuesses = [];
var lastGuess;
var winCounter = 0;
var lossCounter = 0;
var status = "How to play: Press any letter on the keyboard to make your guess. You only have 10 guesses.  Good luck";
// var position;


//when the document is finished loading, set the counters up 
window.onload = function reload() {
  resetGame();
  $("#puzzleOutput").html(currentPuzzle.join(" "));
  $("#remainingOutput").html(remainingGuesses);
  $("#guessesOutput").html(wrongGuesses);
  $("#winCounterOutput").html(winCounter);
  $("#lossCounterOutput").html(lossCounter);
  $("#statusOutput").html(status);
}

//resets the counters, picks a new words and calls the function that hides it (hidePuzzle)
function resetGame() {
  randomPuzzle();
  puzzleAnswer = randomPuzzle();
  currentPuzzle = [];
  allGuesses = [];
  wrongGuesses = [];
  remainingGuesses = 10;
  hidePuzzle();
  console.log(puzzleAnswer);
}
  
// function  playAgain() {
//   document.onkeyup = function(event) {
//     resetGame();
//   }
// }

//generates a random puzzle from the puzzle options array
function randomPuzzle() {
	return arrPuzzleOptions[Math.floor(Math.random() * arrPuzzleOptions.length)];
}	

//converts the puzzleAnswer to _'s
function hidePuzzle() {
  for (answer in puzzleAnswer) {
    currentPuzzle.push('_');
  }
}

//sets what to do when all letters have been found
function youWin() {
  status = 'Congratulations! You guessed ' + '"' + currentPuzzle.join("") + '"' + '!! Lets play again!';
  winCounter++;
  resetGame();
  // playAgain();
}

function youLoose() {
  status = 'Sorry you did not get it right this time! The correct answer was: "' + puzzleAnswer + '". Try again!';
  lossCounter++;
  resetGame();
}

// Captures the key press, converts it to lowercase, and saves it to lastGuess.
document.onkeyup = function(event) {
  var lastGuess = String.fromCharCode(event.keyCode).toLowerCase();
  console.log(lastGuess);

// Checks to see if key pressed is a letter

  if (event.which <= 90 && event.which >= 65) {

  
//check to see if key pressed has already been pressed
  if (allGuesses.indexOf(lastGuess) !== -1) {
    status = '"' + lastGuess + '"' + ' has already been guessed. Try again!';
  }
//if not then push to an array called allGuesses
  else {
    allGuesses.push(lastGuess);
  }

//check to see if key pressed is in the puzzleAnswer array
  if (puzzleAnswer.indexOf(lastGuess) !== -1) {   

//if it is in the puzzleAnswer then loop through array to find all instances of the key pressed.
    for (var i = 0; i < puzzleAnswer.length; i++) {
      if (lastGuess == puzzleAnswer[i]) {
        currentPuzzle[i] = (lastGuess);
      }
    }
    status = '"' + lastGuess + '"' + ' was found!!';
  }
//if it is NOT then list guessed letter in wrongGuesses and remove one from remainingGuesses.
  else {
    if (wrongGuesses.indexOf(lastGuess) == -1) {
      wrongGuesses.push(lastGuess);
      remainingGuesses--;
      status = '"' + lastGuess + '"' + ' was not found!! You loose 1 life! ' + remainingGuesses + ' lives left!';
    }
  }
//check to see if currentPuzzle is solved and run WIN function
  if (currentPuzzle.indexOf("_") == -1) {
    youWin();
  }

//check remaing guesses to see if remainingGuesses === 0
  if (remainingGuesses == 0) {
    youLoose();
  } 
    
    $("#puzzleOutput").html(currentPuzzle.join(" "));
    $("#remainingOutput").html(remainingGuesses);
    $("#guessesOutput").html(wrongGuesses);
    $("#winCounterOutput").html(winCounter);
    $("#lossCounterOutput").html(lossCounter);
    $("#statusOutput").html(status);
    // $("#allGuessesOutput").html(allGuesses);
  }			
} 
