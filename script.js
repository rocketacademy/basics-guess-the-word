// declare and initialise the secret word
var secretWord = ['c', 'a', 't'];

var secretWordLength = secretWord.length;

// array to store guessed letters
var guessedLetters = [];

// array to store word formed using correct guesses
var wordFormed = [];
for (let i = 0; i < secretWordLength; i += 1) {
  wordFormed[i] = '_';
}

// figure that marks when user loses the game
var completedFigure = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸'];

var figure = '';
var numOfGuessesLeft = 7;

// play the game
var main = function (input) {
  var index = 0;
  var myOutputValue = '';
  var guessResult = 'You guessed wrong!';

  guessedLetters.push(input);

  while (index < secretWordLength) {
    var currentLetter = secretWord[index];

    if (input == currentLetter) {
      // update word formed using correct guesses
      wordFormed[index] = secretWord[index];

      guessResult = 'You guessed correct!';
    }
    index += 1;
  }

  // add character to figure if user guessed wrong
  if (guessResult == 'You guessed wrong!') {
    figure += completedFigure[7 - numOfGuessesLeft];

    numOfGuessesLeft = Number(numOfGuessesLeft) - 1;
  }

  // Check if user guessed all the letters and tell them that they won
  var result = secretWord.every((val, arrayIndex) => val === wordFormed[arrayIndex]);
  console.log('user guessed all letters? ' + result);

  if (result == true) {
    var answer = '';

    for (let i = 0; i < secretWordLength; i += 1) {
      answer += secretWord[i];
    }

    return 'You have guessed the word!<br>The word is ' + answer + '.';
  }

  // stops the game if the user has formed the figure aka used all 7 wrong guesses
  if (numOfGuessesLeft == 0) {
    return figure + '<br>You lost since you have used up all 7 wrong guesses 🙁.<br>Please refresh the page to try again.';
  }

  myOutputValue = wordFormed + '<br>' + guessResult + '<br>Number of wrong guesses left = ' + numOfGuessesLeft + '<br>Guessed letters: ' + guessedLetters;
  return myOutputValue;
};
