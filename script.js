var wordEasy = ["g", "u", "e", "s" , "s"];
var wordHard = ["l","e","t","t","e","r"];
var losingFigure = ["(", "凸", "ಠ", "益", "ಠ", ")", "凸"];
var losingFigureOutput = "";
var guessedLetterEasy = ["_", "_", "_","_","_"];
var guessedLetterHard = ["_", "_", "_","_","_","_"];
var myOutputValue = "";
var gameMode = "inputUserName";
var userName = "";

var main = function(input){
  if (gameMode == "inputUserName"){
  userName = input;
  myOutputValue = "Hey, " + userName + "! <br> You are entering easy mode. Please enter your guess now";
  gameMode = "easy";
  console.log("current gameMode: " + gameMode);
  }
  
  else if (gameMode == "easy"){
    myOutputValue = checkGuessEasy(input);

    if (guessedLetterEasy.toString() == wordEasy.toString()){
      myOutputValue = "Hey " + userName + "! You have successfully guessed the secret word: " + wordEasy + ". You are now entering the next level! <br> Enter your guess now! "; 
      gameMode = "hard";
    }
    else if (losingFigureOutput == "(凸ಠ益ಠ)凸"){
      myOutputValue = "Hey " + userName + "! <br>" + losingFigureOutput + "<br> You lose!";
    }
  }
  
  else if (gameMode == "hard"){
    myOutputValue = checkGuessHard (input);

    if (guessedLetterHard.toString() == wordHard.toString()){
      myOutputValue = "Hey " + userName + "! You have successfully guessed the secret word: " + wordHard + "<br> C O N G R A T U L A T I O N S"; 
    }
    else if (losingFigureOutput == "(凸ಠ益ಠ)凸"){
      myOutputValue = "Hey " + userName + "! <br>" + losingFigureOutput + "<br> You lose!";
    }
  }  
  return myOutputValue
}

var checkGuessEasy = function(guess){
  var index = 0;
  var match = false;
  while (index < wordEasy.length){
    if (guess == wordEasy[index]) {
      guessedLetterEasy[index] = guess;
      match = true;
    }
    index += 1;
  }
  if (!match) {
    losingFigureOutput = losingFigureOutput + losingFigure.shift();
  }
  myOutputValue1 = guessedLetterEasy + "<br>" + losingFigureOutput;
  return myOutputValue1;
}

var checkGuessHard = function(guess){
  var index = 0;
  var match = false;
  while (index < wordHard.length){
    if (guess == wordHard[index]) {
      if (guess == wordHard[index] && guessedLetterHard[index] == "_"){
        guessedLetterHard[index] = guess;
        match = true;
        break;
      }
    }
    index += 1;
  }
  
  if (!match) {
    losingFigureOutput = losingFigureOutput + losingFigure.shift();
  }
  myOutputValue1 = guessedLetterHard + "<br>" + losingFigureOutput;
  return myOutputValue1;
}