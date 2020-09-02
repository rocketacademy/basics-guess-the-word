/* eslint-disable no-restricted-syntax */
/*
This is a game where the player must guess a secret word.
For each wrong guess the program adds to the figure: (凸ಠ益ಠ)凸
The player can only guess wrong 7 times before the game ends.
(the number of characters in the figure)
*/

var secretCode = ['c', 'a', 't']; // Secret Code to be compared
// Array to store the letters correctly guessed by the player
var correctlyGuessedLetters = [];
// Array to store the pattern for wrong guess
var wrongGuessResult = [];
// Pattern for wrong guess
var wrongPattern = ['&#x1F3FB', '&#x00482', '&#x0047B', '&#x00467', '&#x004A9', '&#x004FF', '&#x004F5'];

/*
// Definition of the callback function for using in findIndex function for array.
// extra parameter is passed as a parameter of the function findIndex
// var findCharacter = function (charInArray, arrayIndex, arrayOfCode) {
//   console.log('charToFind: ', this);
//   console.log('charInArray: ', charInArray);
//   console.log('arrayIndex: ', arrayIndex);
//   console.log('arrayOfCode: ', arrayOfCode);
//   return (this == charInArray);
// };
//
// var checkUserGuess = function (inputCharGuess) {
//   console.log(secretCode);
//   console.log(inputCharGuess);
//   // Using the findIndex method, using callback function
//   var index = secretCode.findIndex(findCharacter, inputCharGuess);
//   console.log('index: ', index);
//   return "Index returned: " + index;
// };
*/

// Function that checks whether the character guessed by the player is present in the secret code
var checkUserGuess = function (inputCharGuess) {
  var bFound = false;
  var charIndex = 0;
  for (var char of secretCode) { // looping through the hard coded secret code array
    console.log('current char Index: ', charIndex);
    console.log('current character: ', char);
    if (char == inputCharGuess) { // checks each caracter from the code is same as player guess
      bFound = true; // return true if it is find
      charIndex += 1;
      break;
    }
    charIndex += 1;
  }
  // returns false if the character is not found in the looping
  charIndex = (bFound) ? (charIndex - 1) : -1;
  return { isCharFound: bFound, indexOfChar: charIndex };
};

// Function to play the basic version of the game
var playSimpleGame = function (inputCharGuess) {
  var outputValue = '';
  // If user has exceed the number of guesses allowed, return the error message.
  if (wrongGuessResult.length >= wrongPattern.length) {
    outputValue = 'You have exceeded the number of limits for guessing. You lost. ';
    outputValue += '<br/>Secret Word is: ' + secretCode.join('');
  } else {
  // Check whether the character is present in the secret code
  // the checkUserGuess function returns an object that stores the 2 values:
  // boolean value indicating whether the character is present in the secret word and
  //  the index if it's present
    var returnCheck = checkUserGuess(inputCharGuess);
    var bCharFound = returnCheck.isCharFound;
    // If the character is found, output the respective value
    if (bCharFound) {
      correctlyGuessedLetters.push(inputCharGuess);
      outputValue = 'Your guess is correct. ';
      outputValue += '<br/>The character you guessed now is: \'' + inputCharGuess
                  + '\', which occurs at the position ' + returnCheck.indexOfChar + ' in the secret word.';
      // check whether the user has guessed the word completely
      if (correctlyGuessedLetters.length == secretCode.length) {
        outputValue += '<br/>You Win!!!. Game completed.<br/>';
        outputValue += '<br/>Secret Word is: ' + secretCode.join('');
      }
    } else {
      // Appending the wrong pattern to the guessed result
      wrongGuessResult.push(wrongPattern[wrongGuessResult.length]);
      outputValue = 'Your guess is wrong. ' + wrongGuessResult.join('');
    }
  }
  outputValue += '<br/> Secret word is ' + secretCode.length + ' letter long.';
  outputValue += '<br/>Total number of guesses you made: ' + (wrongGuessResult.length + correctlyGuessedLetters.length);
  outputValue += '<br/>Number of correct guesses made: ' + correctlyGuessedLetters.length
           + ' . Correct letters until now: ' + correctlyGuessedLetters.join('');
  outputValue += '<br/>Number of wrong guesses made: ' + wrongGuessResult.length
          + ' , Pattern made for wrong letters until now: ' + wrongGuessResult.join('');

  return outputValue;
};

var main = function (input) {
  var myOutputValue = playSimpleGame(input);
  return myOutputValue;
};
