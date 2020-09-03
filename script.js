// Hard-code a list of secret words
var secretWords = [
  'cat',
  'hello',
  'fart',
];

// Choose a random element from the secretWords array to be chosenSecretWord
// https://stackoverflow.com/a/5915122
var chosenSecretWord = secretWords[Math.floor(Math.random() * secretWords.length)];

// Convert chosenSecretWord into an array where each letter is an array element
// https://www.geeksforgeeks.org/how-to-get-character-array-from-string-in-javascript
var chosenSecretWordArray = Array.from(chosenSecretWord);

// Initialise guessedWordArray to be same length as chosenSecretWordArray, filled with underscores.
// https://stackoverflow.com/a/42539220
var guessedWordArray = Array(chosenSecretWordArray.length).fill('_');
var losingFigure = '(凸ಠ益ಠ)凸';
var numWrongGuesses = 0;

var userHasWon = function () {
  // User wins if there are no more underscores in guessedWordArray
  return !guessedWordArray.includes('_');
};

var userHasLost = function () {
  // User loses if there are as many wrong guesses as there are in the losing figure
  return numWrongGuesses >= losingFigure.length;
};

// Get a string representation of the partially guessed word so far
var getGuessedWord = function () {
  // Convert array to string using join method.
  // https://www.w3schools.com/JSREF/jsref_join.asp
  return guessedWordArray.join(' ');
};

// Default output shows guessed word so far, num guesses remaining, and partial losing figure
var getDefaultOutput = function () {
  var numGuessesRemaining = losingFigure.length - numWrongGuesses;
  // Show only numWrongGuesses letters in losingFigure by using JS's substring method
  // https://www.w3schools.com/jsref/jsref_substring.asp
  var losingFigureToDisplay = losingFigure.substring(0, numWrongGuesses);
  return `The guessed word so far is ${getGuessedWord()}. <br>
  You have ${numGuessesRemaining} more guesses. <br>
  ${losingFigureToDisplay}`;
};

var main = function (input) {
  // If the user has won or lost, let them know to refresh to play again.
  if (userHasWon() || userHasLost()) {
    return `${getDefaultOutput()} <br> Please refresh to play again.`;
  }

  // If input is not a single letter, let the user know what to do.
  if (input.length != 1) {
    return `This is a game of Guess The Word. Please guess 1 letter at a time. <br>
    ${getDefaultOutput()}`;
  }

  // If the user guesses a correct letter that hasn't been guessed before,
  // copy all instances of that letter into guessedWordArray, and let the
  // user know they guessed right.
  if (chosenSecretWordArray.includes(input) && !guessedWordArray.includes(input)) {
    // Copy all instances of input letter from chosenSecretWordArray into guessedWordArray.
    // indexOf returns the index of the first instance of input in secretArray, and -1 if not found.
    // https://www.w3schools.com/JSREF/jsref_indexof_array.asp
    var inputLetterIndex = chosenSecretWordArray.indexOf(input);
    while (inputLetterIndex > -1) {
      guessedWordArray[inputLetterIndex] = chosenSecretWordArray[inputLetterIndex];
      // Look for the next index starting from current index + 1
      // https://www.w3schools.com/JSREF/jsref_indexof_array.asp
      inputLetterIndex = chosenSecretWordArray.indexOf(input, inputLetterIndex + 1);
    }

    // Let the user know they guessed correctly.
    var defaultCorrectGuessOutput = `You guessed right! <br> ${getDefaultOutput()}`;
    // If the user has won, also let them know they won and to refresh to play again.
    if (userHasWon()) {
      return `${defaultCorrectGuessOutput} <br>
      Congratulations, you win! <br>
      Please refresh to play again.`;
    }
    return defaultCorrectGuessOutput;
  }

  // If the secret word array does not include the input letter, increment numWrongGuesses.
  if (!chosenSecretWordArray.includes(input)) {
    numWrongGuesses += 1;
    // Let the user know they guessed wrong.
    var defaultWrongGuessOutput = `You guessed wrong. <br> ${getDefaultOutput()}`;
    // If the user has lost, also let them know they lost and to refresh to play again.
    if (userHasLost()) {
      return `${defaultWrongGuessOutput} <br> Please refresh to play again.`;
    }
    return defaultWrongGuessOutput;
  }

  // If the user has already guessed the current letter, let them know
  // and don't count it as a wrong guess.
  if (chosenSecretWordArray.includes(input) && guessedWordArray.includes(input)) {
    return `You've guessed ${input} before! <br> ${getDefaultOutput()}`;
  }

  // Unless something unexpected happens, we should not reach the following return statement.
  // We include the following return statement because of ESLint's requirement that every function
  // return something.
  return 'Something went wrong. Please try again and refresh if necessary!';
};
