// declare and initialise the secret word
var secretWord = ['p', 'i', 'z', 'z', 'a'];

var secretWordLength = secretWord.length;
// make a copy of secret word for use in hard mode
var copyOfSecretWord = ['p', 'i', 'z', 'z', 'a'];

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
var mode = 'choosing game difficulty';
var myOutputValue = '';

// play the game
var main = function (input) {
  if (mode == 'choosing game difficulty') {
    if (input == 'hard' || input == 'easy') {
      mode = input;
      myOutputValue = 'You have chosen ' + mode + ' mode.<br>Please key in a letter to start guessing the word.';
    } else {
      myOutputValue = 'You have entered an invalid mode.<br>Please key in \'hard\' or \'easy\'';
    }
  } else {
    var index = 0;
    var guessResult = 'You guessed wrong!';

    guessedLetters.push(input);

    while (index < secretWordLength) {
      console.log('checking letter at index: ' + index);
      var currentLetter = secretWord[index];

      if (input == currentLetter) {
      // update word formed using correct guesses
        wordFormed[index] = secretWord[index];

        guessResult = 'You guessed correct!';

        // stop matching letters if a letter has already been found once in current guess.
        if (mode == 'hard') {
          if (input == copyOfSecretWord[index]) {
            copyOfSecretWord[index] = '_';
            index = secretWordLength;
          }
        }
      }
      index += 1;
      console.log('is input == currentLetter: ' + (input == currentLetter));
    }
    console.log('copy of secret word: ' + copyOfSecretWord);
    console.log('secret word is: ' + secretWord);
    console.log('guess result: ' + guessResult);

    // add character to figure if user guessed wrong
    if (guessResult == 'You guessed wrong!') {
      figure += completedFigure[7 - numOfGuessesLeft];

      numOfGuessesLeft = Number(numOfGuessesLeft) - 1;
    }

    myOutputValue = 'Guess the word:<br>' + wordFormed + '<br>' + guessResult + '<br>Number of wrong guesses left = ' + numOfGuessesLeft + '<br>Guessed letters: ' + guessedLetters;

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
  }

  return myOutputValue;
};
