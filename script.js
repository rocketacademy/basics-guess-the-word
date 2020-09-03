var secretWord = ['c', 'a', 't'];
var lose = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸'];
var displayWord = ['_', '_', '_'];
var hangMan = [];
var miss = 0
var hits = 0

var main = function (input) {
  var myOutputValue = '';
  var index = 0;
  var badGuessCounter = 0;

  while (index < 3) {
    if (input == secretWord[index]) {
      hits = hits + 1;
      displayWord[index] = secretWord[index];
    } else if (input != secretWord[index]) {
      badGuessCounter = badGuessCounter + 1;
    }
    index = index + 1;
  }

  if (badGuessCounter == 3) {
    hangMan = hangMan + lose[miss];
    miss = miss + 1;
  }

  console.log(miss);
  console.log(hits);

  myOutputValue = 'The secret word has ' + secretWord.length + ' alphabets. ' + displayWord + '. Your hangman is growing! ' + hangMan;

  if (miss >= 6) {
    myOutputValue = 'You lost!' + myOutputValue;
  }

  if (hits >= 2) {
    myOutputValue = 'You won! ' + myOutputValue;
  }

  return myOutputValue;
};
