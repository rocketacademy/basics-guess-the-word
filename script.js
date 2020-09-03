//(凸ಠ益ಠ)凸
// secret word = cat
//
var mysteryWord = ['c','a','t'];
var hangMan = ['(','凸','ಠ','益','ಠ',')','凸'];
var guess = ['-','-','-'];
var currentHangMan = ['-','-','-','-','-','-','-',];
var guessCounter = 0;


var main = function(input) {

  var myOutputValue = '';

  var mysteryWordLength = mysteryWord.length;

  var index = 0;

  var result = 'wrong'

while (index < mysteryWordLength) {
  var currentLoopLetter = mysteryWord[index];

  if(input == currentLoopLetter){
    guess[index] = mysteryWord[index];
    result = 'right';

  }
  index = index + 1;
}
if (result == 'wrong') {
  
  currentHangMan[guessCounter] = hangMan[guessCounter];
      
  guessCounter = guessCounter + 1;
}
  
    // if(input == 'c'){
      
    //  guess[0]= mysteryWord[0];
    //  guessOutcome = 'Right!';
      
    //  console.log("c guess")

    // } else if ( input == 'a'){

    //   console.log("a guess")

    //   guess[1]= mysteryWord[1];
    //   guessOutcome = 'Right!';

    // } else if (input == 't') {

    //   console.log("t guess")

    //   guess[2] = mysteryWord[2];
    //   guessOutcome = 'Right!';

    // } else {

    //   console.log("else")

    //   currentHangMan[guessCounter] = hangMan[guessCounter];
      
    //   guessCounter = guessCounter + 1;
    
    // }
  
myOutputValue = 'You guessed '+ result + '! The word is ' + guess + '. ' + currentHangMan;
  
  
  return myOutputValue;
};

// var index = 0;
// var letters = ['C', 'A', 'T'];
// var letterLength = letters.length;

// while (index < letterLength) {
//   var currentLoopLetter = letters[index];

//   if(input == currentloopletter){
//     guess[index] = letters[index]
//   };
//   console.log(index);
//   console.log(currentLoopLetter);

//   index = index + 1;
// }
