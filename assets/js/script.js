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

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", loadNextQuestion);

function startGame() {
  startButton.style.display = "none";
  cardTitle.style.display = "none";
  cardText.style.display = "none";
  questionContainer.style.display = "block";
  loadQuestion(); 
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
  nextButton.style.display = "none";
}

function checkAnswer(event) {
  var selectedChoice = event.target;
  var question = questions[currentQuestion];

  if (selectedChoice.textContent === question.choices[question.answer]) {
    resultElement.textContent = "Correct!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Incorrect!";
    resultElement.style.color = "red";
  }

  nextButton.style.display = "block";
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
  resultElement.textContent = "Quiz completed!";
  nextButton.style.display = "none";
}