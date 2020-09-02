var word = ['c', 'a', 't'];
var lose = ['(', '凸', 'ಠ', '益', 'ಠ', ')', '凸'];
var lives = 7
var hits = 0
var cat1 = '_.';
var cat2 = '_.';
var cat3 = '_';

var main = function (input) {
  var myOutputValue = '';
  var index = 0;
  var badGuessCounter = 0;

  while (index < 3) {
    if (input == word[index]) {
      hits = hits + 1;
    } else if (input != word[index]) {
      badGuessCounter = badGuessCounter + 1;
    }
    index = index + 1;
  }

  if (badGuessCounter == 3) {
    lives = lives - 1;
  }

  if (input == 'c') {
    cat1 = 'c.';
  }

  if (input == 'a') {
    cat2 = 'a.';
  }

  if (input == 't') {
    cat3 = 't';
  }

  console.log(lives);
  console.log(hits);

  myOutputValue = 'You have ' + hits + ' hits with ' + lives + ' lives left. There are ' + word.length + ' letters in the word ' + cat1 + cat2 + cat3 + '.';

  if (lives == 0) {
    myOutputValue = 'You lost!' + myOutputValue;
  }

  if (hits == 3) {
    myOutputValue = 'You won! ' + myOutputValue;
  }

  return myOutputValue;
};
