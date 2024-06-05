document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// RPS

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);
  displayResult(userChoice, computerChoice, result);
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function displayResult(userChoice, computerChoice, result) {
  const resultDiv = document.getElementById("rps-result");
  resultDiv.innerHTML = `
        <p>You chose: <strong>${userChoice}</strong></p>
        <p>Computer chose: <strong>${computerChoice}</strong></p>
        <p><strong>${result}</strong></p>
    `;
}

// Calculator

function addToDisplay(value) {
  let display = document.getElementById("display");
  if (display.value !== "Error") {
    display.value += value;
  }
}

function deleteLastCharacter() {
  let display = document.getElementById("display");
  if (display.value !== "Error") {
    display.value = display.value.slice(0, -1);
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculateResult() {
  let display = document.getElementById("display");
  let expression = display.value;
  expression = expression.replace("%", "/100*");
  let result = evaluateExpression(expression);
  if (!isNaN(result) && isFinite(result)) {
    display.value = result;
  } else {
    display.value = "Error";
  }
}

function evaluateExpression(expression) {
  let operators = expression.split(/\+|-|\*|\//);
  let numbers = expression.replace(/[0-9]|\./g, "").split("");

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === "*") {
      operators[i] = parseFloat(operators[i]) * parseFloat(operators[i + 1]);
      operators.splice(i + 1, 1);
      numbers.splice(i, 1);
      i--;
    } else if (numbers[i] === "/") {
      operators[i] = parseFloat(operators[i]) / parseFloat(operators[i + 1]);
      operators.splice(i + 1, 1);
      numbers.splice(i, 1);
      i--;
    }
  }

  let result = parseFloat(operators[0]);
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === "+") {
      result += parseFloat(operators[i + 1]);
    } else if (numbers[i] === "-") {
      result -= parseFloat(operators[i + 1]);
    }
  }

  return result;
}

// Tic Tac Toe

let humanPlayer = "X";
let computerPlayer = "O";
let currentPlayer = humanPlayer;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function cellClick(cellIndex) {
  if (!gameActive || gameState[cellIndex] !== "") return;

  gameState[cellIndex] = humanPlayer;
  document.getElementsByClassName("cell")[cellIndex].textContent = humanPlayer;

  if (checkWin(humanPlayer)) {
    document.getElementById("status").textContent = "You win!";
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("status").textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = computerPlayer;
  document.getElementById("status").textContent = "Computer's turn";
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (!gameActive) return;

  let emptyCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      emptyCells.push(i);
    }
  }

  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let computerMoveIndex = emptyCells[randomIndex];

  gameState[computerMoveIndex] = computerPlayer;
  document.getElementsByClassName("cell")[computerMoveIndex].textContent =
    computerPlayer;

  if (checkWin(computerPlayer)) {
    document.getElementById("status").textContent = "Computer wins!";
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("status").textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = humanPlayer;
  document.getElementById("status").textContent = "Your turn";
}

function checkWin(player) {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    if (
      gameState[a] === player &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !gameState.includes("");
}

function restart() {
  currentPlayer = humanPlayer;
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("status").textContent = "Your turn";
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
}

// QR

function generateQRCode() {
  let url = document.getElementById("qr-urlInput").value;
  let qrCodeContainer = document.getElementById("qr-qrcode");
  qrCodeContainer.innerHTML = "";
  new QRCode(qrCodeContainer, {
    text: url,
    width: 160,
    height: 160,
    colorDark: "#ffffff",
    colorLight: "#2c2c2c",
  });
}
