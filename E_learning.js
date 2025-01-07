// Header sticky effect
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Menu toggle for mobile view
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector('.navbar');
menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('open');
};

// Reset menu when scrolling
window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('open');
};

// Quiz Data
const pythonQuiz = [
  {
    question: "What is the output of print(10 // 3)?",
    options: ["3", "3.33", "3.0", "2"],
    correctIndex: 0,
  },
  {
    question: "Which of the following is used to create a string in Python?",
    options: ["'", '"', "`", "All of the above"],
    correctIndex: 3,
  },
  {
    question: "What is the keyword used to create a class in Python?",
    options: ["def", "class", "function", "object"],
    correctIndex: 1,
  },
  {
    question: "What will be the result of print(len('hello'))?",
    options: ["4", "5", "6", "None of the above"],
    correctIndex: 1,
  },
];

const javaQuiz = [
  {
    question: "Which of the following is the default value of a boolean in Java?",
    options: ["true", "false", "null", "0"],
    correctIndex: 1,
  },
  {
    question: "Which method is used to start a thread in Java?",
    options: ["start()", "run()", "execute()", "begin()"],
    correctIndex: 0,
  },
  {
    question: "What is the size of a long in Java?",
    options: ["4 bytes", "8 bytes", "16 bytes", "32 bytes"],
    correctIndex: 1,
  },
  {
    question: "Which of these is used to handle exceptions in Java?",
    options: ["try-catch", "catch-finally", "throw", "All of the above"],
    correctIndex: 3,
  },
];

let currentQuiz = pythonQuiz; // Default to Python quiz
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let userAnswers = []; // To store user-selected answers

// Function to load quiz based on the selected category
function loadQuiz(category) {
  if (category === "python") {
    currentQuiz = pythonQuiz;
  } else if (category === "java") {
    currentQuiz = javaQuiz;
  }

  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  userAnswers = [];
  displayQuestion();
}

// Display the current question and options
function displayQuestion() {
  const questionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const progressElement = document.getElementById("quiz-progress");

  // Load the current question
  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Dynamically create the buttons for the options
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option-button";
    button.onclick = function () {
      selectOption(index); // Call selectOption on button click
    };
    optionsContainer.appendChild(button);
  });

  // Update progress display
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length} | Correct: ${correctAnswers} | Incorrect: ${incorrectAnswers}`;
}

// Handle the user's option selection
function selectOption(selectedIndex) {
  const correctIndex = currentQuiz[currentQuestionIndex].correctIndex;
  userAnswers.push(selectedIndex);

  if (selectedIndex === correctIndex) {
    correctAnswers++;
    alert("Correct!");
  } else {
    incorrectAnswers++;
    alert(`Incorrect! The correct answer is: ${currentQuiz[currentQuestionIndex].options[correctIndex]}`);
  }

  nextQuestion();
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.length) {
    displayQuestion();
  } else {
    displayResults();
  }
}

// Display results after the quiz is completed
function displayResults() {
  const questionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const progressElement = document.getElementById("quiz-progress");

  const totalQuestions = currentQuiz.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  let results = `Quiz Complete!\n`;
  results += `Correct Answers: ${correctAnswers}\n`;
  results += `Incorrect Answers: ${incorrectAnswers}\n`;
  results += `Score Percentage: ${scorePercentage}%\n\n`;

  // Display the correct answers with user answers
  currentQuiz.forEach((question, index) => {
    results += `Q${index + 1}: ${question.question}\n`;
    results += `Your Answer: ${question.options[userAnswers[index]] || "Not Answered"}\n`;
    results += `Correct Answer: ${question.options[question.correctIndex]}\n\n`;
  });

  questionElement.textContent = "Quiz Results";
  optionsContainer.innerHTML = `<pre>${results}</pre><button onclick="restartQuiz()">Restart Quiz</button>`;
  progressElement.textContent = ""; // Hide progress after quiz completion
}

// Restart the quiz (defaults to Python quiz)
function restartQuiz() {
  loadQuiz("python");
}

// Automatically load the quiz when the page is ready
window.onload = function () {
  loadQuiz("python"); // You can set this to "java" for Java quiz.
};
