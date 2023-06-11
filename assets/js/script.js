// An array of objects, where each object represents a question and its related information
var questions = [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      choices: ["variable name = value;", "var name = value;", "name = value;", "let name = value;"],
      answer: 1
    },
    {
      question: "Which built-in method returns the length of a string?",
      choices: ["length()", "size()", "count()", "getSize()"],
      answer: 0
    },
    {
      question: "What is the output of the following code: console.log(2 + '2');",
      choices: ["4", "22", "TypeError", "NaN"],
      answer: 1
    },
    {
      question: "Which operator is used for strict equality comparison in JavaScript?",
      choices: ["==", "===", "!==", "="],
      answer: 1
    },
    {
      question: "What is the JavaScript function that adds elements to the end of an array?",
      choices: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0
    }
  ];

var currentQuestion = 0;

//Create variables for all elements that will be manipulated
var startButton = document.getElementById("startButton");
var questionContainer = document.getElementById("questionContainer");
var viewHighScoresLink = document.getElementById("viewHighScoresLink");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultElement = document.getElementById("result");
var nextButton = document.getElementById("nextButton");
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");
var timerElement = document.getElementById("timer");
var timeLeft = 120;
var timerInterval;

//Create function to disable view high scores link after game starts
function disableViewHighScoresLink() {
  viewHighScoresLink.removeEventListener("click", showHighScoresScreen);
  viewHighScoresLink.style.pointerEvents = "none";
}

//Starts the game when the start button is clicked
function startGame() {
  startButton.style.display = "none";
  cardTitle.style.display = "none";
  cardText.style.display = "none";
  questionContainer.style.display = "block";
  choices.style.display = "block";
  startTimer();
  loadQuestion();
  disableViewHighScoresLink();
  
}

//Add event listener to start button
startButton.addEventListener("click", startGame);

//Add event listener to view high scores link
function showHighScoresScreen() {
  event.preventDefault();
  questionContainer.style.display = "none";
  var endScreen = document.getElementById("endScreen");
  endScreen.style.display = "none";
  var highScoresScreen = document.getElementById("highScoresScreen");
  highScoresScreen.style.display = "block";
  showHighScores();
}

//Timer function that counts down from 120 seconds
function startTimer() {
    timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = "Time: " + formatTime(timeLeft);
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }
  
  // Formats the time in MM:SS format
  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
  
    var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    var formattedSeconds = (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  
    return formattedMinutes + ":" + formattedSeconds;
  }

//Function to load the first question
function loadQuestion() {
  var question = questions[currentQuestion];

  questionElement.textContent = question.question;

  choicesElement.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var choice = document.createElement("li");
    
    choice.textContent = question.choices[i];
    choice.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choice);

    choice.style.backgroundColor = "lightblue";
    choice.style.color = "white";
    
    choice.onclick = function() {
      this.style.backgroundColor = "#a5f5bd";
      this.style.color = "white";
    }
  }

  resultElement.textContent = ""; 
}

//Sets the initial score to 0
var score = 0;

//Function to check if the selected answer is correct
function checkAnswer(event) {
  var selectedChoice = event.target;
  var question = questions[currentQuestion];

  if (selectedChoice.textContent === question.choices[question.answer]) {
    resultElement.textContent = "Correct!";
    resultElement.style.color = "green";
    increaseScore(10)
    saveScoretoLocalStorage();
  } else {
    resultElement.textContent = "Incorrect!";
    resultElement.style.color = "red";
    deductTime(10);
  }

  function increaseScore(points) {
    score += points;
    }

  function saveScoretoLocalStorage() {
    localStorage.setItem("score", score);
    }
  
  function deductTime(seconds) {
    timeLeft -= seconds;
    }

  // Disable all choices to prevent multiple selections
  var choices = document.querySelectorAll("#choices li");
  choices.forEach(function(choice) {
    choice.removeEventListener("click", checkAnswer);
  });

  // Move to the next question after a 2-second delay
  setTimeout(function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 2000);
}

//Function to load the next question
function loadNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

//Function to end the game when all questions have been answered or the timer reaches 0
function endGame() {
  questionContainer.style.display = "none";
  // choices.style.display = "none";
  resultElement.textContent = "Quiz completed!";

var endScreen = document.getElementById("endScreen");
endScreen.style.display = "block";

var scoreElement = document.getElementById("score");
scoreElement.textContent = "Your final score is: " + score;

var initialsForm = document.getElementById("initialsForm");
initialsForm.addEventListener("submit", saveHighScore);

var cardDiv = document.querySelector(".card");
cardDiv.style.display = "none";

clearInterval(timerInterval);

}

//Function to save the high score to local storage 
function saveHighScore(event) {
    event.preventDefault();

    var initialsInput = document.getElementById("initialsInput");
    var initials = initialsInput.value.trim();    

    if (initials !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials: initials, score: score });
        highScores.sort((a,b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        showHighScores();
        
    }

    var endScreen = document.getElementById("endScreen");
    endScreen.style.display = "none";
    
}

//Limits the initials input to 3 characters
var initialsInput = document.getElementById("initialsInput");

initialsInput.addEventListener("input", function() {
  var initials = this.value;
  if (initials.length > 3) {
    this.value = initials.slice(0, 3);
  }
});

//Function to show the high scores screen and display the high scores from local storage and sort them in descending order
function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var highScoresScreen = document.getElementById("highScoresScreen");
    highScoresScreen.style.display = "flex";

    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";

    var orderedList = document.createElement("ol");
    orderedList.className = "list-group col-6 mx-auto";
    highScoresList.appendChild(orderedList);

    highScores.sort((a,b) => b.score - a.score);

    for (var i = 0; i < highScores.length; i++) {
      var listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = highScores[i].initials + ": " + highScores[i].score;
      orderedList.appendChild(listItem);

      listItem.style.backgroundColor = "lightblue";
      listItem.style.color = "white";
    }      

}

//Function to clear the high scores from local storage when View High Scores is clicked
var viewHighScoresLink = document.getElementById("viewHighScoresLink");
viewHighScoresLink.addEventListener("click", showHighScoresScreen);

function showHighScoresScreen(event) {
  event.preventDefault();

  questionContainer.style.display = "none";

  var endScreen = document.getElementById("endScreen");
  endScreen.style.display = "none";

  var highScoresScreen = document.getElementById("highScoresScreen");
  highScoresScreen.style.display = "block";

  var cardDiv = document.querySelector(".card");
  cardDiv.style.display = "none";

  showHighScores();
}

//Function to go back to the start screen when Go Back is clicked
var goBackButton = document.getElementById("goBackButton");
goBackButton.addEventListener("click", goBack);

var clearScoresButton = document.getElementById("clearScoresButton");
clearScoresButton.addEventListener("click", clearHighScores);

function goBack() {
    location.reload();
}

//Function to clear the high scores from local storage when Clear High Scores is clicked
function clearHighScores() {
    localStorage.removeItem("highScores");
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";
}