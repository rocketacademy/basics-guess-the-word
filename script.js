var secretWord = ['c', 'a', 't']; // The correct answer
var secretWordLength = secretWord.length; // Getting the length of the secret word
var wrong = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸']; // when a wrong choice is chosen, the figure to appear
var noOfChances = 7; // counter for number of chances left
var allChosenLetters = []; // array to store user's choices
var correctLetters = [];
var i = 0;
while (i < secretWordLength) {
  correctLetters[i] = '_';
  i += 1;
}
var displayedFigure = ''; // returns the figure to be displayed.

// main function of the game
var main = function (input) {
  var myOutputValue = '';
  var index = 0;
  var result1 = 'Wrong guess!';
  allChosenLetters.push(input);
  while (index < secretWordLength) {
    var chosenLetters = secretWord[index];
    if (input == chosenLetters) {
      correctLetters[index] = secretWord[index];
      result1 = 'Right guess!';
    }
    index += 1;
  }
  if (result1 == 'Wrong guess!') {
    if (noOfChances == 0) {
      return wrong + '<br> All 7 chances have been used, please refresh the page and try again';
    }
    displayedFigure += wrong[7 - noOfChances];
    noOfChances -= 1;
    return 'Wrong guess! <br>' + displayedFigure + '<br> You have ' + noOfChances + ' chances left. <br> You have chosen ' + allChosenLetters;
  }
  var result2 = secretWord.every((val, arrayIndex) => val === correctLetters[arrayIndex]);
  if (result2 == true) {
    var correct = '';
    while (i < secretWordLength) {
      correct += secretWord[i];
      i += 1;
    }
    return 'Congrats! You have guessed' + correct + ' and it is correct!';
  }

  myOutputValue = correctLetters + '<br>' + result1 + '<br> Number of chances left =' + noOfChances + '<br> Chosen Letters ' + allChosenLetters;
  return myOutputValue;
};
