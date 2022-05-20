function background(houseID) {   // changes background/theme of the game site based on user House choice
	document.getElementById("main").style.display = "block";
	if (houseID == "Gryffindor") { //if the id is Gryffindor, changes the background to gRoom
		document.getElementById("main").style.backgroundImage = 'url("Images/gRoom.jpg")';
        document.getElementById("message").innerHTML = "Welcome to the daring and courageous Gryffindor House! You’ll make friends shortly once you unlock the password to the Common Room, such as the famous Harry Potter, Hermione Granger, and Ron Weasley.";
	// also changes the innerHTML based on house click, same for each of the other 3 houses
	} else if (houseID == "Hufflepuff") {
		document.getElementById("main").style.backgroundImage = 'url("Images/hRoom.jpg")';
        document.getElementById("message").innerHTML = "Welcome to the friendly and happy Hufflepuff House! You’ll have the time of your life once you unlock the password to the Common Room. You’ll see Pomona Sprout, Cedric Diggory, and Newt Scamander.";
	} else if (houseID == "Ravenclaw") {
		document.getElementById("main").style.backgroundImage = 'url("Images/rRoom.jpg")';
        document.getElementById("message").innerHTML = "Welcome to the intelligent and wisdom filled Ravenclaw House! You’ll learn much about wizardry once you unlock the password to the Common Room. You’ll see Luna Lovegood, Garick Ollivander, and Filius Flitwick.";
	} else {
		document.getElementById("main").style.backgroundImage = 'url("Images/sRoom.jpg")';
        document.getElementById("message").innerHTML = "Welcome to the cunning and ambitious Slytherin House! You’ll be able to express your pure-blood supremacy once you unlock the password to the Common Room. You’ll see Draco Malfoy, Pansy Parkinson, and Doyle.";
	}

}

var hintsArray = [evenOrOdd, sum, divisibility, firstDigit, secondAndThird, range, correctNums, second, third]; // array of hint functions
var copy = [evenOrOdd, sum, divisibility, firstDigit, secondAndThird, range, correctNums, second, third]; // copy of the hints array to copy back after game is done
var hintsP = document.querySelector(".hints");
function evenOrOdd(userGuess) {	 // determines if the input number is odd or even
	if (password%2 == 0) {	// if divisible by 2, then the number is even
		hintsP.innerHTML += "The number is even <br>";
	} else {	//if not divisible by 2, display odd
		hintsP.innerHTML += "The number is odd <br>";
	}
}
function sum(userGuess) {	// determines the sum of the digits
	var sum = 0;
	var number = password; // makes a variable that equals to the password without changing the value of password
	while (number) {
		sum += number % 10; // adds the remainder of the number divided by 10 which is essentially the last digit of the number
		number = Math.floor(number/10); // remaining number is divided by 10 and rounded down so the last digit is removed
	}
	hintsP.innerHTML += "The sum of digits is " + sum + "<br>";	// strings and displays a string and an integer as the hint 
}
function divisibility(userGuess) {	// determines the passwords divisiblity using a sample array of numbers
	var num = [3,4,5,7,9,10,11,12,13,14]; // some numbers to see the divisbility of the random number
	// parallel array of numbers in phrases to display in hints
	var numberPhrases = [numPhrases[2],numPhrases[3],numPhrases[4],numPhrases[6],numPhrases[8],"Alexander Hamilton's bill dollar","Harry Potter&#39s age in his first year","Harry Potter&#39s age in his second year","Harry Potter&#39s age in his third year","Harry Potter&#39s age in his fourth year"];
	var array = []; // empty list of numbers that divide by the password
	for (var i=0;i<num.length;i++) {
		if (password%num[i] == 0) {
			array.push(num[i]);
		}
	}
	randomIndex = Math.floor(Math.random() * array.length); // gets a random index from the array of divisible numbers
	hintsP.innerHTML += "The number is divisible by " + numberPhrases[randomIndex] + "<br>";
}
// array of phrases that represent numbers from 1-9
var numPhrases = ['the number of the book "Harry Potter and the Sorcerer&#39s Stone"','the number of the book "Harry Potter and the Chamber of Secrets"','the number of curricula KWK offers','the number of quarters that make up a dollar','a number in French that sort of rhymes with "bank"','the number of faces in a die','the number of Harry Potter books','the number of Harry Potter films','the number that Pluto would have been as a planet'];
function firstDigit(userGuess) {	// hint used to tell user the first digit of password
	var first = Number(password.toString()[0]);	// changes the password into a string and returns index 0, aka first digit
	var firstPhrase = numPhrases[first-1]; // takes the first digit and subtracts one to receive the appropriate index number hint 
	hintsP.innerHTML += "The first digit of the number is " + firstPhrase + "<br>";
}
function secondAndThird(userGuess) {	// hint used to tell user the product of second and third digits
	var second = Number(password.toString()[1]); // gets the second digit
	var third = Number(password.toString()[2]); // gets the third digit
	var product = second * third; // multiplies the second and third digits of the password
	hintsP.innerHTML += "The product of the second and third digits are " + product + "<br>";
}
function range(userGuess) {
	var range1 = Math.floor((Math.random() * 100) + 900); // generates a random number between 900 and 999
	var range2 = Math.floor((Math.random() * 100) + 1200); // generates a random number between 1200 and 1299
	range1 = password-range1; // lower bound
	range2 = password+range2; // upper bound
	hintsP.innerHTML += "The number is between " + range1 + " and " + range2 + "<br>";
}
function correctNums(userGuess) {
	var digits = [password.toString()[0],password.toString()[1],password.toString()[2],password.toString()[3]];
	var userDigits = [userGuess.toString()[0],userGuess.toString()[1],userGuess.toString()[2],userGuess.toString()[3]];
	digits.sort();
	userDigits.sort();
	for (var n=0;n<digits.length;n++) { // removes duplicating numbers
		if (digits[n] == digits[n-1]) {
			digits.splice(n,1)
		}
	}
	for (var m=0;m<userDigits.length;m++) { // removes duplicating numbers
		if (userDigits[m] == userDigits[m-1]) {
			userDigits.splice(m,1)
		}
	}
	var count = 0; // number of correct numbers in user's guess
	for (var i=0;i<digits.length;i++) {
		for (var j=0;j<userGuess.length;j++) {
			if (digits[i] == userDigits[j]) {
				count++;
			}
		}
	}
	hintsP.innerHTML += count + " of your digits are correct <br>";
}
function second(userGuess) {
	var second = Number(password.toString()[1]);
	var userSecond = Number(userGuess.toString()[1]);	
	second = Math.pow(second+userSecond,2); // takes the square of the sum of real digit and user's digit
	hintsP.innerHTML += "The square of the sum of your second digit and the actual second digit is " + second + "<br>"; 
}
function third(userGuess) {
	var third = Number(password.toString()[2]);
	var userThird = Number(userGuess.toString()[2]);
	var third = third/userThird; // divides the real third digit by user's digit
	hintsP.innerHTML += "The actual third digit is " + third + " times your third digit <br>";
}

function randomizeHints() {
	// shuffles array of hints so that in every game the hints are in different order
	var currentIndex = hintsArray.length, tempValue, randomIndex;
	while (currentIndex--) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		tempValue = hintsArray[currentIndex];
		hintsArray[currentIndex] = hintsArray[randomIndex];
		hintsArray[randomIndex] = tempValue;
	}
}

var password = Math.floor((Math.random() * 9000) + 1000); //generates a random number from 1000 to 9999 bc of four digits
var guessCount = 1;	//initialize guess count 
function checkGuess() {	 // function used to check user inputs
	var previousGuesses = document.querySelector(".previousGuesses");
	var guessInput = document.getElementById("guess");
	var userGuess  = document.getElementById("guess").value;
	if (isNaN(userGuess) == true || userGuess.length != 4) { // validates user input
		alert("Your input is invalid");
		return;
	}
	previousGuesses.innerHTML += userGuess + "<br>"; // adds user's guessed number to show previous guesses
	randomizeHints(); // shuffles array of hints
	if (userGuess == password) {
		document.querySelector(".buttons").style.display = "block";
		document.querySelector(".buttons").style.background = "#8ad8bc";
		document.getElementById("congrats").style.display = "block"; // displays a div that congratulates the user for guessing the right number
		win++; // increment the number of times user won
		gameOver();
	} else if (guessCount == 5) {
		document.querySelector(".buttons").style.display = "block";
		document.querySelector(".buttons").style.background = "#cc4f4f";
		document.getElementById("gameOver").style.display = "block";
		lost++; // increments the number of times user lost
		gameOver(); // when user has attempted 5 times and still did not get the number, a div of game over displays
	} else if (guessCount == 1) {
		hintsArray[0](userGuess);
		hintsArray.splice(0,1);
	} else if (guessCount == 2) {
		hintsArray[0](userGuess);
		hintsArray[1](userGuess);
		hintsArray.splice(0,2);
	} else if (guessCount == 3 || guessCount == 4) {
		hintsArray[0](userGuess);
		hintsArray[1](userGuess);
		hintsArray[2](userGuess);
		hintsArray.splice(0,3);
	}
	guessCount++; //increment guess counts
	guessInput.value = ""; //clears the input box and allows user guesses to append to the array
}

function gameOver() {
	// div contains a restart or quit button and user clicks on either
	var restartButton = document.getElementById("restart");
	var quitButton = document.getElementById("quit");
	restartButton.addEventListener("click", resetGame);
	quitButton.addEventListener("click",quitGame);
	gameNumber++; // increment the game number
}

function resetGame() {
	/* Resets the game so user can start fresh */
	document.getElementById("main").style.display = "none";
	document.querySelector(".buttons").style.display = "none";
	document.getElementById("congrats").style.display = "none";
	document.getElementById("gameOver").style.display = "none";
	var resetParas = document.querySelectorAll(".para");
	for (var i=0; i<resetParas.length; i++) {
		resetParas[i].innerHTML = ""; // reset guesses/hints table
	}
	updateStats();
	guessCount = 1;
	hintsArray = copy; // puts back original elements into array
	password = Math.floor((Math.random() * 9000) + 1000); // generates a new random number
}

var gameNumber = 0; // number for keeping track of how many times user played
var win = 0;
var lost = 0;
var guessCountArray = []; // array of number of attempts
function updateStats() {
	var hints, average, median;
	if (guessCount == 1) {
		hints = 0;
	} else if (guessCount == 2) {
		hints = 1;
	} else if (guessCount == 3) {
		hints = 3;
	} else if (guessCount == 4) {
		hints = 6;
	} else {
		hints = 9;
	}
	guessCountArray.push(hints);
	average = findMean(guessCountArray);
	median = findMedian(guessCountArray);
	document.querySelector(".gameNumber").innerHTML = "Times played: " + gameNumber; // displays game number
	document.querySelector(".wins").innerHTML = "Wins: " + win; // displays wins
	document.querySelector(".losses").innerHTML = "Losses: " + lost; // displays losses
	document.querySelector(".average").innerHTML = "Average # of hints used: " + average; // displays average
	document.querySelector(".median").innerHTML = "Median # of hints used: " + median; // displays median
}


function findMean(array) {
	total = 0, average = 0;
	// add elements of array together
 	for (var i=0;i<array.length;i++) {
 		total += array[i];
 	}
	// calculate average
 	average=(total/array.length);
 	return average;
}

function findMedian(array) {
	var median = 0;
	var arrayLen = array.length;
    array.sort();
    if (arrayLen%2 == 0) { // is even
        // average of two middle numbers
        median = (array[arrayLen / 2 - 1] + array[arrayLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = array[(arrayLen - 1) / 2];
    }
    return median;
}

function quitGame() {
	// if user decides to quit the game, a div displays
	document.querySelector(".end").style.display = "block";
}