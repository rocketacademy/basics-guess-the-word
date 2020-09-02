// start of code for 'continue play' section. (lines 1 to 200)
// array storing strings of words
var secretWords = ['first', 'second', 'third', 'fourth', 'fifth'];

// get a random index
var getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

// function to shuffle words
var shuffleWords = function (arrayOfWords) {
  var currIndex = 0;

  while (currIndex < arrayOfWords.length) {
    var randomIndex = getRandomIndex(arrayOfWords.length);
    var currWord = arrayOfWords[currIndex];
    var randomWord = arrayOfWords[randomIndex];

    arrayOfWords[currIndex] = randomWord;
    arrayOfWords[randomIndex] = currWord;

    currIndex += 1;
  }

  return arrayOfWords;
};

// shuffle words
var shuffledSecretWords = shuffleWords(secretWords);
console.log('shuffled words: ' + shuffledSecretWords);

var numOfSecretWordsLeft = (shuffledSecretWords.length);
var originalNumOfSecretWords = (shuffledSecretWords.length);

// choose the last word from the shuffled words, convert the word from string to array
// and remove the word from the array.
var getSecretWord = function (words) {
  var word = words.pop();
  var stringToArray = word.split('');

  return stringToArray;
};

var secretWord = getSecretWord(shuffledSecretWords);

// string to store user's name
var username = '';

// make a copy of secret word for use in hard mode
var copyOfSecretWord = secretWord.slice();

// array to store guessed letters
var guessedLetters = [];

// array to store word formed using correct guesses
var wordFormed = [];
var secretWordLength = secretWord.length;
for (let i = 0; i < secretWordLength; i += 1) {
  wordFormed[i] = '_';
}

// figure that marks when user loses the game
var completedFigure = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸'];

var numOfGuessesLeft = 7;
var mode = 'enter username';
var myOutputValue = '';
var wordsGuessedCorrectly = 0;

// play the game
var main = function (input) {
  console.log('starting mode: ' + mode);
  // run the program according to the mode
  if (mode == 'enter username') {
    username = input;
    mode = 'choosing game difficulty';
    myOutputValue = 'Hello ' + username + '!<br> Please key in \'easy\' or \'hard\' difficulty!';
  } else if (mode == 'choosing game difficulty') {
    if (input == 'hard' || input == 'easy') {
      mode = input;
      myOutputValue = 'You have chosen ' + mode + ' mode.<br>Please key in a letter to start guessing the word.';
    } else {
      myOutputValue = 'You have entered an invalid mode.<br>Please key in \'hard\' or \'easy\'';
    }
  } else { // game logic
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
      console.log('is input == current letter being checked: ' + (input == currentLetter));
    }
    console.log('copy of secret word: ' + copyOfSecretWord);
    console.log('secret word is: ' + secretWord);
    console.log('guess result: ' + guessResult);

    // add character to figure if user guessed wrong
    if (guessResult == 'You guessed wrong!') {
      numOfGuessesLeft = Number(numOfGuessesLeft) - 1;
    }

    myOutputValue = 'Guess the word:<br>' + wordFormed + '<br>' + guessResult + '<br>Number of wrong guesses left = ' + numOfGuessesLeft + '<br>Guessed letters: ' + guessedLetters;

    // secret word in string format
    var answer = '';
    for (let i = 0; i < secretWordLength; i += 1) {
      answer += secretWord[i];
    }

    // Check if user guessed all the letters and tell them that they won
    var result = secretWord.every((val, arrayIndex) => val === wordFormed[arrayIndex]);
    console.log('user guessed all letters? ' + result);

    if (result == true) {
      wordsGuessedCorrectly += 1;

      // end the game if there are no secret words left
      if (numOfSecretWordsLeft == 1) {
        return username + ', you have guessed the word!<br>The word is ' + answer + '.<br>There are no more words left to guess.<br>Final correct guesses: ' + wordsGuessedCorrectly + '/' + originalNumOfSecretWords + '.';
      }

      // get a new secret word
      secretWord = getSecretWord(shuffledSecretWords);

      numOfSecretWordsLeft -= 1;
      console.log('Number of secret words left: ' + numOfSecretWordsLeft);

      // make a copy of secret word for use in hard mode
      copyOfSecretWord = secretWord.slice();

      // reset guessed letters to zero
      guessedLetters = [];

      // reset array used to store word formed using correct guesses
      wordFormed = [];
      secretWordLength = secretWord.length;
      for (let i = 0; i < secretWordLength; i += 1) {
        wordFormed[i] = '_';
      }

      numOfGuessesLeft = 7;
      myOutputValue = '';

      return username + ', you have guessed the word!<br>The word is ' + answer + '.<br>Please enter a new letter to guess the next word.<br>Words guessed correctly: ' + wordsGuessedCorrectly + '/' + originalNumOfSecretWords + '.<br>Number of words left: ' + numOfSecretWordsLeft + '.';
    }

    // stops the game if the user has formed the figure aka used all 7 wrong guesses
    if (numOfGuessesLeft == 0) {
      // end the game if there are no secret words left
      if (numOfSecretWordsLeft == 1) {
        return completedFigure + '<br>' + username + ', you have lost since you have used up all 7 wrong guesses 🙁.<br>The word is ' + answer + '.<br>There are no more words left to guess.<br>Final correct guesses: ' + wordsGuessedCorrectly + '/' + originalNumOfSecretWords + '.';
      }

      // get a new secret word
      secretWord = getSecretWord(shuffledSecretWords);

      numOfSecretWordsLeft -= 1;
      console.log('Number of secret words left: ' + numOfSecretWordsLeft);

      // make a copy of secret word for use in hard mode
      copyOfSecretWord = secretWord.slice();

      // reset guessed letters to zero
      guessedLetters = [];

      // reset array used to store word formed using correct guesses
      wordFormed = [];
      secretWordLength = secretWord.length;
      for (let i = 0; i < secretWordLength; i += 1) {
        wordFormed[i] = '_';
      }

      numOfGuessesLeft = 7;
      myOutputValue = '';

      return completedFigure + '<br>' + username + ', you have lost since you have used up all 7 wrong guesses 🙁.<br>The word is ' + answer + '.<br>Please enter a new letter to guess the next word.<br>Words guessed correctly: ' + wordsGuessedCorrectly + '/' + originalNumOfSecretWords + '.<br>Number of words left: ' + numOfSecretWordsLeft + '.';
    }
  }

  console.log('ending mode: ' + mode);
  return myOutputValue;
};
// end of code for 'continue play' section.

// ------------------------------------------------------------------------------------------------

/* start of code from 1st section of assignment to name (lines 204 to 310)
// string to store user's name
var username = '';

// declare and initialise the secret word
var secretWord = ['p', 'i', 'z', 'z', 'a'];

var secretWordLength = secretWord.length;
// make a copy of secret word for use in hard mode
var copyOfSecretWord = secretWord.slice();

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
var mode = 'enter username';
var myOutputValue = '';

// play the game
var main = function (input) {
  console.log('starting mode: ' + mode);
  // run the program according to the mode
  if (mode == 'enter username') {
    username = input;
    mode = 'choosing game difficulty';
    myOutputValue = 'Hello ' + username + '!<br> Please key in \'easy\' or \'hard\' difficulty!';
  } else if (mode == 'choosing game difficulty') {
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
      console.log('is input == current letter being checked: ' + (input == currentLetter));
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

      return username + ', you have guessed the word!<br>The word is ' + answer + '.';
    }

    // stops the game if the user has formed the figure aka used all 7 wrong guesses
    if (numOfGuessesLeft == 0) {
      return figure + '<br>' + username + ', you have lost since you have used up all 7 wrong guesses 🙁.<br>Please refresh the page to try again.';
    }
  }

  console.log('ending mode: ' + mode);
  return myOutputValue;
};
end of code from 1st section of assignment to Name */
