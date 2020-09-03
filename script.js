// global variables
var numGuesses = 0;
var numWrongGuesses = 0;
var monster = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸'];
var guessesLeft = 7;
var numCorrectGuesses = 0;
var numWrongGuesses = 0;
// hard code secret word
var word = ['c', 'a', 't'];
// equate answer array length to word array length
// '-' to show number of words and unguessed locations
var answer = Array(word.length).fill('_');
var main = function (input) {
  var guess = String(input);
  var myOutputValue = '';
  // correct guess
  if (word.includes(guess)) {
    // find answer array position, copy letter to answer
    var answerIndex = word.indexOf(guess);
    console.log('answer index');
    console.log(answerIndex);
    answer[answerIndex] = word[answerIndex];
    console.log('answer');
    console.log(answer);
    numCorrectGuesses = numCorrectGuesses + 1;
    myOutputValue = 'Word: ' + answer.join('') + ' Good guess, next letter! Correct guesses: ' + numCorrectGuesses + '/' + word.length + '. Guesses Left: ' + guessesLeft + '/7 <br>' + monster.slice(0, numWrongGuesses).join('');
  } else {
    guessesLeft = guessesLeft - 1;
    numWrongGuesses = numWrongGuesses + 1;
    myOutputValue = 'Word: ' + answer.join('') + '<br>kwongk kwongkon kwnogk! Your answer is wrong! :< Correct guesses: ' + numCorrectGuesses + '/' + word.length + '. Guesses Left: ' + guessesLeft + '/7 <br>' + monster.slice(0, numWrongGuesses).join('');
  }
  if (guessesLeft == 0) {
    myOutputValue = 'You lose! (凸ಠ益ಠ)凸';
  }
  if (numCorrectGuesses == word.length) {
    console.log(numCorrectGuesses);
    console.log(word.length);
    myOutputValue = 'You win!';
  }
  // input validation: only 1 letter, anything else is error
  if (guess.length != 1) {
    myOutputValue = 'error, please enter only one letter';
  }
  return myOutputValue;
};
