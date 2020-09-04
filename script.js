// declare global variables
// to guess this word
var word = ['c', 'a', 't'];
// each figure will display at one time for each wrong guess
var figureDisplayWhenWrong = ['(', '凸', 'ಠ', '益', 'ಠ', '凸', ')'];
// to display when guessed correct
var blanksForCorrectWord = ['', '', ''];
// counter for every wrong guesses in total left
var numGuessLeft = 7;
// create array to store correct guess
var correctGuess = [];
// create array to check user guess
var isCorrectGuess = [];
// messages for after 1 correct guess and 2 correct guess
var keepGoingMessage1 = ' There are 2 more letters to guess!';
var keepGoingMessage2 = ' There is 1 more letter to guess!';

var main = function (userGuess) {
  var myOutputValue = '';
  // user inputs something, program will check whether the letter is inside the word array
  var index = 0;
  var letterLength = word.length;
  while (index < letterLength) {
    var currentLetter = word[index];
    isCorrectGuess.push(currentLetter);
    // if letter is inside word array, store correct letter guessed, guess 2 more correct letters
    if (userGuess == currentLetter) {
      correctGuess.push(userGuess);
      blanksForCorrectWord[index] = correctGuess[index];
      console.log(blanksForCorrectWord);
      console.log(keepGoingMessage1);
      index = index + 1;
      return 'You guessed correct! Please keep going!' + keepGoingMessage1;
    }
    // if user guess all correct letters. user wins
    if (correctGuess.includes(word)) {
      blanksForCorrectWord[index] = correctGuess[index];
      return 'Congrats! You have guessed the word! You win!';
    }
    if (correctGuess.includes(('c' && 'a') || ('c' && 't') || ('a' && 't'))) {
      blanksForCorrectWord[index] = correctGuess[index];
      console.log(blanksForCorrectWord);
      console.log(keepGoingMessage2);
      index = index + 1;
      return 'You guessed correct again! Please keep going!' + keepGoingMessage2;
    }
    // if letter is not inside word array, number of guess left -1 and print +1 character in figure
    numGuessLeft = numGuessLeft - 1;
    figureDisplayWhenWrong.pop();
    console.log(figureDisplayWhenWrong);
    return 'You guessed wrong. You are left with ' + numGuessLeft + ' chances left.';
  }
  // if user's correct guess = any the word's letters, return message to guess 1 more letter
  if (isCorrectGuess.includes(userGuess)) {
    isCorrectGuess.push();
    blanksForCorrectWord[index] = word[index];
    return 'You guessed one letter correct! There are ' + correctGuess - isCorrectGuess + ' letters to go! Keep going!';
  // number guess left = 0, user losses
  } if (numGuessLeft == 0) {
    return 'You have ' + numGuessLeft + ' attempts left. You lost!';
  }
  return myOutputValue;
};
