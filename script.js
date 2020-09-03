var main = function (input) {

  var word = ['c', 'a', 't'];
  var remainingLetters = word.length;
  var answerArray = [];

  // if correct, add to the answerArray
  for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  };
  for (var j = 0; j < word.length; j++) {
    if (word[j] == input) {
      answerArray[j] = input;
      remainingLetters--;
    }
  };

  // if wrong, add to the hang man
  var hangman = [];

  var myOutputValue = answerArray + "Hangman:" + ;
  return myOutputValue;
};





