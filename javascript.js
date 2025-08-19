const correctSound = new Audio("sounds/correct.mp3");
const incorrectSound = new Audio("sounds/incorrect.mp3");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Hemingway", "Dickens", "Tolstoy"],
    answer: "Shakespeare"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    answer: "4"
  },
  {
  question: "Which gas do plants absorb from the atmosphere?",
  choices: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
  answer: "Carbon Dioxide"
},
{
  question: "What is the largest ocean on Earth?",
  choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
  answer: "Pacific"
},
{
  question: "How many continents are there?",
  choices: ["5", "6", "7", "8"],
  answer: "7"
},
{
  question: "Which is the fastest land animal?",
  choices: ["Cheetah", "Leopard", "Lion", "Tiger"],
  answer: "Cheetah"
},
{
  question: "Who painted the Mona Lisa?",
  choices: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
  answer: "Leonardo da Vinci"
},
{
  question: "What is the boiling point of water in Celsius?",
  choices: ["90°C", "95°C", "100°C", "110°C"],
  answer: "100°C"
},
{
  question: "What is the chemical symbol for water?",
  choices: ["O2", "H2O", "CO2", "HO2"],
  answer: "H2O"
},
{
  question: "How many planets are in the Solar System?",
  choices: ["7", "8", "9", "10"],
  answer: "8"
},
{
  question: "What part of the cell contains DNA?",
  choices: ["Nucleus", "Membrane", "Cytoplasm", "Mitochondria"],
  answer: "Nucleus"
},
{
  question: "Which organ is responsible for pumping blood?",
  choices: ["Lungs", "Liver", "Heart", "Kidneys"],
  answer: "Heart"
},
{
  question: "What gas do humans exhale?",
  choices: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
  answer: "Carbon Dioxide"
},
{
  question: "Who was the first President of the United States?",
  choices: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
  answer: "George Washington"
},
{
  question: "In which year did World War II end?",
  choices: ["1940", "1943", "1945", "1950"],
  answer: "1945"
},
{
  question: "Who discovered America in 1492?",
  choices: ["Vasco da Gama", "Christopher Columbus", "Marco Polo", "Ferdinand Magellan"],
  answer: "Christopher Columbus"
},
{
  question: "The Great Wall of China was primarily built to protect against which group?",
  choices: ["Romans", "Huns", "Mongols", "Vikings"],
  answer: "Mongols"
},
{
  question: "What ancient civilization built the pyramids?",
  choices: ["Romans", "Mesopotamians", "Egyptians", "Greeks"],
  answer: "Egyptians"
}
];

let currentQuestionIndex = 0;
let scores = [0, 0];  // Player 1 and Player 2 scores
let currentPlayer = 0; // 0 = Player 1, 1 = Player 2
let timer;
let timeLeft = 10;

const timerEl = document.createElement("div");
timerEl.id = "timer";
document.querySelector(".container").insertBefore(timerEl, document.getElementById("quiz"));

const playerTurnEl = document.createElement("div");
playerTurnEl.id = "player-turn";
playerTurnEl.style.marginBottom = "10px";
playerTurnEl.style.fontWeight = "bold";
document.querySelector(".container").insertBefore(playerTurnEl, timerEl);

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function updatePlayerTurn() {
  playerTurnEl.textContent = `Player ${currentPlayer + 1}'s turn`;
}

function showQuestion() {
  updatePlayerTurn();
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  choicesEl.innerHTML = "";

  current.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-btn");
    btn.addEventListener("click", () => {
      clearInterval(timer);
      selectAnswer(choice, btn);
    });
    choicesEl.appendChild(btn);
  });

  timeLeft = 10;
  updateTimer();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

function updateTimer() {
  timerEl.textContent = `Time Left: ${timeLeft}s`;
}

function selectAnswer(choice, selectedBtn) {
  const correct = questions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn && btn.textContent !== correct) {
      btn.classList.add("incorrect");
    }
  });
if (choice === correct) {
  scores[currentPlayer]++;
  correctSound.pause();
  correctSound.currentTime = 0;
  correctSound.play();
} else {
  incorrectSound.pause();
  incorrectSound.currentTime = 0;
  incorrectSound.play();
}

  if (choice === correct) {
    scores[currentPlayer]++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  currentPlayer = currentPlayer === 0 ? 1 : 0;  // Switch player

  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
  
btn.addEventListener("click", () => {
  correctSound.pause();
  correctSound.currentTime = 0;
  correctSound.play(); // This will work after a click
});

});

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz").classList.add("hide");
  resultEl.classList.remove("hide");

  let player1Score = scores[0];
  let player2Score = scores[1];
  let maxScore = Math.max(player1Score, player2Score);

  let displayedScore1 = 0;
  let displayedScore2 = 0;

  scoreEl.innerHTML = `
    Player 1 Score: <span id="score1">0</span><br>
    Player 2 Score: <span id="score2">0</span><br>
    <span id="winner-text"></span>
  `;

  const score1El = document.getElementById("score1");
  const score2El = document.getElementById("score2");
  const winnerTextEl = document.getElementById("winner-text");

  let animationInterval = setInterval(() => {
    if (displayedScore1 < player1Score) {
      displayedScore1++;
      score1El.textContent = displayedScore1;
    }
    if (displayedScore2 < player2Score) {
      displayedScore2++;
      score2El.textContent = displayedScore2;
    }

    if (displayedScore1 >= player1Score && displayedScore2 >= player2Score) {
      clearInterval(animationInterval);
      if (player1Score > player2Score) {
        winnerTextEl.textContent = "Player 1 Wins! 🎉";
      } else if (player2Score > player1Score) {
        winnerTextEl.textContent = "Player 2 Wins! 🎉";
      } else {
        winnerTextEl.textContent = "It's a tie! 🤝";
      }
    }
  }, 100); // Increase score every 100ms
}


showQuestion();
