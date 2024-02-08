// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log(`Let's play some Scrabble!`);
   let userWord = input.question((`Enter a word: `));
   return userWord;
};

function simpleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
   for (let i = 0; i < word.length; i++){
      letterPoints += 1;
   }
   return letterPoints;
 };

function vowelBonusScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let vowelPoints = 3;
   let simplePoints = 1;
   for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
         letterPoints += vowelPoints;
      } else {
         letterPoints += simplePoints;
      }
   }
 return letterPoints;
};

function scrabbleScorer(word){
word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      letterPoints += newPointStructure[letter];
   }
   return letterPoints;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 points, consonants are 1 point.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let selectedAlgorithm = input.question(`Which scoring algorithm would you like to use? \n 0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n 1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n 2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n Enter 0, 1, or 2 : `);
   return scoringAlgorithms[Number(selectedAlgorithm)];
};


function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let item in oldPointStructure){
      itemArray = oldPointStructure[item];
      for (let i = 0; i < itemArray.length; i++){
         newPointStructure[itemArray[i].toLowerCase()] = Number(item);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let userWord = initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   console.log(`Score: ${selectedAlgorithm.scorerFunction(userWord)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
