/* eslint-disable no-else-return */
/* eslint-disable keyword-spacing */
/* eslint-disable no-restricted-syntax */
/*
This is a game where the player must guess a secret word.
For each wrong guess the program adds to the figure: (凸ಠ益ಠ)凸
The player can only guess wrong 7 times before the game ends.
(the number of characters in the figure)
*/

// Variable to store a list of secret words
var secretWordList = [['g', 'u', 'e', 's', 's'],
  ['s', 't', 'o', 'r', 'e'],
  ['c', 'a', 't'],
  ['p', 'l', 'a', 'y'],
  ['w', 'o', 'r', 'd'],
  ['t', 'i', 'p', 's'],
  ['k', 'i', 't', 't', 'y'],
  ['t', 'r', 'e', 'a', 't'],
  ['e', 'g', 'g', 's'],
  ['t', 'h', 'r', 'e', 'e']];
var secretCode = []; // Secret Code to be compared
// Array to store the letters correctly guessed by the player
var correctlyGuessedLetters = [];
// Array to store the pattern for wrong guess
var wrongGuessResult = [];
// Pattern for wrong guess
var wrongPattern = ['&#x1F3FB', '&#x00482', '&#x0047B', '&#x00467', '&#x004A9', '&#x004FF', '&#x004F5'];
// Variable indicating the mode of the game
const modeEasy = 'Easy';
const modeHard = 'Hard';
var gameMode = '';
// Variable to store the list of characters that found and respective indices
// Key is correctly guessed character
// value is an array of the indices at the character occurs
var correctGuessCharIndexPairs = {};
// Variable to store the user name
var playerName = '';

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

// Function to check whether the player has taken all the allowed chances to play
var checkTurnsExceeded = function () {
  var outputValue = '';
  // If user has exceed the number of guesses allowed, return the error message.
  if (wrongGuessResult.length >= wrongPattern.length) {
    outputValue = 'You have exceeded the number of limits for guessing. You lost. ';
    outputValue += '<br/>Secret Word is: ' + secretCode.join('');
  }
  return outputValue;
};

var formatOutput = function (value) {
  var outputValue = value;
  outputValue += '<br/> Secret word is ' + secretCode.length + ' letter long.<br/>';
  // For the easy game mode, if same character appears multiple time, a single guess is sufficient.
  // So, the counter should be only 1
  var correctGuessCount = (gameMode == modeEasy)
    ? Object.keys(correctGuessCharIndexPairs).length : correctlyGuessedLetters.length;
  outputValue += '<br/>Total number of guesses you made: ' + (wrongGuessResult.length + correctGuessCount);
  outputValue += '<br/>Number of correct guesses made: ' + correctGuessCount
           + ' . Correct letters until now: ' + correctlyGuessedLetters.join('');
  outputValue += '<br/>Number of wrong guesses made: ' + wrongGuessResult.length
          + ' , Pattern made for wrong letters until now: ' + wrongGuessResult.join('');

  return outputValue;
};

// Function to format a message based on the output of a guess and mode of game
var formatGameOutputMessage = function (inputCharGuess, bIsCharFound, existingMessage) {
  var outputValue = existingMessage;
  // If the character is found, output the respective value
  if (bIsCharFound) {
    outputValue = 'Your guess is correct. ';
    outputValue += '<br/>The character you guessed now : \'' + inputCharGuess + '\', occurs at the position: ';
    outputValue += correctGuessCharIndexPairs[inputCharGuess] + ' in the secret word.';
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
  return outputValue;
};

// Function to play the basic version of the game
var playSimpleGame = function (inputCharGuess) {
  var outputValue = '';
  // If user has exceed the number of guesses allowed, return the error message.
  outputValue = checkTurnsExceeded();
  // Only if there is no error message returned from the function
  if(outputValue.length == 0) {
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
      outputValue = '<br/>Your guess is wrong. ' + wrongGuessResult.join('');
    }
  }
  outputValue = formatOutput(outputValue);
  return outputValue;
};

// Function to find all the indexes at which the guessed character occurs
var findAllOccurances = function (inputCharGuess) {
  var charIndexArray = [];
  var charIndex = secretCode.indexOf(inputCharGuess);
  while(charIndex != -1) {
    charIndexArray.push(charIndex);
    charIndex = secretCode.indexOf(inputCharGuess, charIndex + 1);
  }
  return charIndexArray;
};

// Function to find the next index at which the given character occurs,
// from the starting index specified
var findNextOccurance = function (inputCharGuess, searchStartIndex) {
  var charIndexFound = secretCode.indexOf(inputCharGuess, searchStartIndex);
  return charIndexFound;
};

// Function that plays the game in easy mode
// The easy mode is when the word is like "guess" and the user guesses 's',
// then the game fills in both 's'.
var playEasyMode = function (inputCharGuess) {
  var bReturn = false;
  // Check whether it's already guessed correct letter
  var currentIndexArray = correctGuessCharIndexPairs[inputCharGuess];
  // find the index from which searching should start.
  var bIsExsiting = !(currentIndexArray == null);
  if(bIsExsiting) {
    return true;
  }
  // find all the indeices at which the input character occures
  var charIndexArray = findAllOccurances(inputCharGuess);
  if(charIndexArray.length != 0) {
    correctGuessCharIndexPairs[inputCharGuess] = charIndexArray;

    console.log('correctGuessCharIndexPairs:', correctGuessCharIndexPairs);

    // Fill the correctly guessed letter to the array to compare with the secret code
    // character is being till the number of occurance it's found.
    var charIndex = 0;
    while(charIndex < charIndexArray.length) {
      correctlyGuessedLetters.push(inputCharGuess);
      charIndex += 1;
    }
    bReturn = true;
  }
  return bReturn;
};

// The hard mode is where the user has to guess each letter.
var playHardMode = function (inputCharGuess) {
  var tempArray = [];
  // Check whether the specified index is already found.
  // if found, specify next index as the search index. Else 0
  var currentIndexArray = correctGuessCharIndexPairs[inputCharGuess];
  // find the index from which searching should start.
  var bIsExsiting = !(currentIndexArray == null);
  console.log('bIsExsiting', bIsExsiting);
  var lastIndex = (!bIsExsiting) ? -1 : currentIndexArray[currentIndexArray.length - 1];
  console.log('Before findNextOccurance searchIndex', lastIndex + 1);
  if(bIsExsiting) {
    console.log('Before correctGuessCharIndexPairs[inputCharGuess]:', correctGuessCharIndexPairs[inputCharGuess].join());
  }
  lastIndex = findNextOccurance(inputCharGuess, (lastIndex + 1));
  if(lastIndex != -1) {
    console.log('After findNextOccurance lastIndex', lastIndex);
    // if there is a valid loaction, add it to the pair
    if(!bIsExsiting) {
      correctGuessCharIndexPairs[inputCharGuess] = tempArray;
    }
    correctGuessCharIndexPairs[inputCharGuess].push(lastIndex);
    console.log('After correctGuessCharIndexPairs[inputCharGuess]:', correctGuessCharIndexPairs[inputCharGuess].join());

    correctlyGuessedLetters.push(inputCharGuess);
    bIsExsiting = true;
  } else{
    // if the same character is given as input by player, but more than the number of occurances
    bIsExsiting = false;
  }
  console.log('correctGuessCharIndexPairs:', correctGuessCharIndexPairs);
  return bIsExsiting;
};

var playGameWithMode = function (inputCharGuess) {
  var bFound = false;
  var outputValue = '';
  // If user has exceed the number of guesses allowed, return the error message.
  outputValue = checkTurnsExceeded();
  // Only if there is no error message returned from the function
  if(outputValue.length == 0) {
    if(gameMode == modeEasy) {
      bFound = playEasyMode(inputCharGuess);
    }else if(gameMode == modeHard) {
      bFound = playHardMode(inputCharGuess);
    }
    outputValue = formatGameOutputMessage(inputCharGuess, bFound, outputValue);
  }
  outputValue = formatOutput(outputValue);
  return outputValue;
};

var chooseMode = function (inputMode) {
  var bReturnVal = true;
  if (inputMode == modeEasy) {
    gameMode = modeEasy;
  } else if (inputMode == modeHard) {
    gameMode = modeHard;
  } else {
    gameMode = '';
    bReturnVal = false;
  }
  return bReturnVal;
};

var printChooseModeMessage = function () {
  var outputValue = 'Choose the mode of game you would like to play.';
  outputValue += '<br/><br/>Type <b>' + modeEasy + '</b> to select the easy mode of game, '
  + 'in which multiple occurrance of same letter will be filled, once the correct guess is made.';
  outputValue += '<br/><br/>Type <b>' + modeHard + '</b> to select the hard mode of game, '
  + 'in which the player has to guess each letter.';
  return outputValue;
};

// Function to choose a random word from the list as secret word for the current game
var chooseSecretWordForGame = function () {
  var maxCount = secretWordList.length;
  var randomNumber = Math.random() * maxCount;
  var index = Math.floor(randomNumber);
  secretCode = secretWordList[index];
};

var main = function (input) {
  var myOutputValue = '';
  // myOutputValue = playSimpleGame(input);
  if(input.length == 0) {
    return 'Please enter your Name';
  }
  if(playerName.length == 0) {
    playerName = input;
    myOutputValue = 'Hi ' + playerName + ', Welcome!! <br/>';
    myOutputValue += printChooseModeMessage();
    return myOutputValue;
  }
  // Prompting the player to input the mode of game they want to play
  if(gameMode.length == 0) {
    chooseSecretWordForGame();
    if (chooseMode(input)) {
      return 'Start entering your guesses!!';
    } else{
      return printChooseModeMessage();
    }
  }

  console.log('Secret word chosen: ', secretCode);
  myOutputValue = playGameWithMode(input);

  return myOutputValue;
};
