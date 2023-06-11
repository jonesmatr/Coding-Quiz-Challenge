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

var startButton = document.getElementById("startButton");
var questionContainer = document.getElementById("questionContainer");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultElement = document.getElementById("result");
var nextButton = document.getElementById("nextButton");
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");
var timerElement = document.getElementById("timer");
var timeLeft = 60;



startButton.addEventListener("click", startGame);





function startGame() {
  startButton.style.display = "none";
  cardTitle.style.display = "none";
  cardText.style.display = "none";
  questionContainer.style.display = "block";
  choices.style.display = "block";
  startTimer();
  loadQuestion();
  
}

//Add function for when the user clicks an answer. Display correct or incorrect, then move to next question - might need to add delay.

function startTimer() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = "Time: " + formatTime(timeLeft);
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }
  
  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
  
    var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    var formattedSeconds = (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  
    return formattedMinutes + ":" + formattedSeconds;
  }


function loadQuestion() {
  var question = questions[currentQuestion];

  questionElement.textContent = question.question;

  choicesElement.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var choice = document.createElement("li");
    
    choice.textContent = question.choices[i];
    choice.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choice);
  }


  resultElement.textContent = "";
 
}

var score = 0;

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


function loadNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}



function endGame() {
  questionContainer.style.display = "none";
  // choices.style.display = "none";
  resultElement.textContent = "Quiz completed!";


var endScreen = document.getElementById("endScreen");
endScreen.style.display = "block";

var scoreElement = document.getElementById("score");
scoreElement.textContent = "Your score: " + score;

var initialsForm = document.getElementById("initialsForm");
initialsForm.addEventListener("submit", saveHighScore);

var cardDiv = document.querySelector(".card");
cardDiv.style.display = "none";

}

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
}

function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var highScoresScreen = document.getElementById("highScoresScreen");
    highScoresScreen.style.display = "block";

    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScoresList.appendChild(listItem);
    }
}

var goBackButton = document.getElementById("goBackButton");
goBackButton.addEventListener("click", goBack);

var clearScoresButton = document.getElementById("clearScoresButton");
clearScoresButton.addEventListener("click", clearHighScores);

function goBack() {
    location.reload();
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = "";
}
