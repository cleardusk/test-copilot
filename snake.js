// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 500;
const canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Set up the colors
const white = "#FFFFFF";
const black = "#000000";
const red = "#FF0000";

// Set up the font
const font = "20px Arial";

// Set up the snake
const snakeBlockSize = 10;
const snakeSpeed = 15;
let snakeList = [];
let snakeLength = 1;
let snakeX = canvasWidth / 2;
let snakeY = canvasHeight / 2;
let snakeXChange = 0;
let snakeYChange = 0;

// Set up the obstacles
const obstacleBlockSize = 10;
let obstacleList = [];
for (let i = 0; i < 10; i++) {
  const obstacleX = Math.round((Math.random() * (canvasWidth - obstacleBlockSize)) / 10) * 10;
  const obstacleY = Math.round((Math.random() * (canvasHeight - obstacleBlockSize)) / 10) * 10;
  obstacleList.push([obstacleX, obstacleY]);
}

// Set up the food
const foodBlockSize = 10;
let foodX = Math.round((Math.random() * (canvasWidth - foodBlockSize)) / 10) * 10;
let foodY = Math.round((Math.random() * (canvasHeight - foodBlockSize)) / 10) * 10;

// Define the function to draw the snake
function drawSnake() {
  const snakeColor = "#00FF00"; // green color
  for (let i = 0; i < snakeList.length; i++) {
    const x = snakeList[i][0];
    const y = snakeList[i][1];
    ctx.fillStyle = snakeColor;
    ctx.fillRect(x, y, snakeBlockSize, snakeBlockSize);
  }
}

// Define the main game loop
function gameLoop() {
  // Set up the snake variables
  snakeX += snakeXChange;
  snakeY += snakeYChange;

  // Check for collisions with the walls
  if (snakeX < 0) {
    snakeX = canvasWidth - snakeBlockSize;
  } else if (snakeX >= canvasWidth) {
    snakeX = 0;
  } else if (snakeY < 0) {
    snakeY = canvasHeight - snakeBlockSize;
  } else if (snakeY >= canvasHeight) {
    snakeY = 0;
  }

  // Check for collisions with the food
  if (snakeX === foodX && snakeY === foodY) {
    foodX = Math.round((Math.random() * (canvasWidth - foodBlockSize)) / 10) * 10;
    foodY = Math.round((Math.random() * (canvasHeight - foodBlockSize)) / 10) * 10;
    snakeLength++;
  }

  // Update the snake list
  const snakeHead = [snakeX, snakeY];
  snakeList.push(snakeHead);
  if (snakeList.length > snakeLength) {
    snakeList.shift();
  }

  for (let i = 0; i < snakeList.length - 1; i++) {
    const block = snakeList[i];
    if (block[0] === snakeX && block[1] === snakeY) {
      gameOver();
    }
  }

  // Check for collisions with the obstacles
  for (let i = 0; i < obstacleList.length; i++) {
    const obstacle = obstacleList[i];
    if (snakeX === obstacle[0] && snakeY === obstacle[1]) {
      gameOver();
    }
  }

  // Draw the game objects
  ctx.fillStyle = white;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw the food
  const foodColor = "#FF0000";
  const foodRadius = foodBlockSize / 2;
  const foodXPos = foodX + foodRadius;
  const foodYPos = foodY + foodRadius;
  ctx.beginPath();
  ctx.arc(foodXPos, foodYPos, foodRadius, 0, 2 * Math.PI);
  ctx.fillStyle = foodColor;
  ctx.fill();

  // Draw the obstacles
  const obstacleColor = "#808080"; // gray color
  for (let i = 0; i < obstacleList.length; i++) {
    const obstacle = obstacleList[i];
    const obstacleX = obstacle[0];
    const obstacleY = obstacle[1];
    ctx.fillStyle = obstacleColor;
    ctx.fillRect(obstacleX, obstacleY, obstacleBlockSize, obstacleBlockSize);
  }

  drawSnake();
  const scoreText = "Score: " + (snakeLength - 1);
  ctx.fillStyle = black;
  ctx.font = font;
  ctx.fillText(scoreText, 10, 20);

  // Set the game clock
  setTimeout(gameLoop, 1000 / snakeSpeed);
}

// Define the game over function
function gameOver() {
  const score = snakeLength - 1;
  alert("Game over! Your score is: " + score);
  location.reload();
}

// Handle keyboard input
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    snakeXChange = -snakeBlockSize;
    snakeYChange = 0;
  } else if (event.code === "ArrowRight") {
    snakeXChange = snakeBlockSize;
    snakeYChange = 0;
  } else if (event.code === "ArrowUp") {
    snakeYChange = -snakeBlockSize;
    snakeXChange = 0;
  } else if (event.code === "ArrowDown") {
    snakeYChange = snakeBlockSize;
    snakeXChange = 0;
  } else if (event.code === "KeyQ") {
    const score = snakeLength - 1;
    alert("Your score is: " + score);
    location.reload();
  }
});

// Start the game loop
gameLoop();