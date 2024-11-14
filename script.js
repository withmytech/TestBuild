const choices = {
  rock: { static: "rockstatic.gif", gif: "Rock.gif" },
  paper: { static: "paperstatic.gif", gif: "Paper.gif" },
  scissors: { static: "scissorstatic.gif", gif: "Scissor.gif" }
};

// Initialize random points between 20 and 100 in multiples of 10
let playerPoints = getRandomPoints();
let computerPoints = getRandomPoints();
let playerScore = 0;
let computerScore = 0;

// Initialize points display
document.getElementById("userPoints").textContent = `Points: ${playerPoints}`;
document.getElementById("computerPoints").textContent = `Points: ${computerPoints}`;

function updateScoreboard(result) {
  // Update the winner announcement
  document.getElementById("winner").textContent = result;
  
  // Update scores
  document.querySelector(".player-score").textContent = playerScore;
  document.querySelector(".computer-score").textContent = computerScore;
  
  // Update points
  document.getElementById("userPoints").textContent = `Points: ${playerPoints}`;
  document.getElementById("computerPoints").textContent = `Points: ${computerPoints}`;
  
  // Add brief highlight animation to score display
  const scoreDisplay = document.querySelector(".score-display");
  scoreDisplay.style.animation = 'none';
  scoreDisplay.offsetHeight; // Trigger reflow
  scoreDisplay.style.animation = 'pulse 0.5s ease-in-out';
}

function getRandomPoints() {
  return Math.floor(Math.random() * 9 + 2) * 10; // Random multiple of 10 between 20 and 100
}

function playGame(userSelection) {
  const computerSelection = getComputerChoice();

  updateImage("userChoice", userSelection, "gif");
  updateImage("computerChoice", computerSelection, "gif"); // Computer has its independent choice

  setTimeout(() => {
    updateImage("userChoice", userSelection, "static");
    updateImage("computerChoice", computerSelection, "static");
  }, 1000);

  const result = determineWinner(userSelection, computerSelection);

  setTimeout(() => {
    if (result === "You win!") {
      computerPoints -= 10;
      playerScore++;
    } else if (result === "Computer wins!") {
      playerPoints -= 10;
      computerScore++;
    }

    if (playerPoints <= 0 || computerPoints <= 0) {
      const finalResult = playerPoints > 0 ? "You win the game!" : "Computer wins the game!";
      updateScoreboard(finalResult);
      disableGame();
    } else {
      updateScoreboard(result);
    }
  }, 1800);
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function updateImage(elementId, choice, type) {
  const element = document.getElementById(elementId);
  element.src = choices[choice][type];

  // Mirror the computer's choice visually
  if (elementId === "computerChoice") {
    element.style.transform = "scaleX(-1)"; // Flip horizontally
  } else {
    element.style.transform = "scaleX(1)"; // Reset for player's choice
  }
}

function determineWinner(user, computer) {
  if (user === computer) return "It's a draw!";
  if ((user === "rock" && computer === "scissors") || 
      (user === "paper" && computer === "rock") || 
      (user === "scissors" && computer === "paper")) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

function endGame() {
  disableGame();
  updateScoreboard("Game ended by user");
}

function disableGame() {
  document.querySelectorAll(".choice").forEach(button => button.disabled = true);
}
