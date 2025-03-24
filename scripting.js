const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const snakeLengthText = document.getElementById('snakeLength');
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');
const gameOverText = document.getElementById('gameOverText');
const difficulty = localStorage.getItem("difficulty");
const snakeColor = localStorage.getItem("snakeColor") || "#2ecc71";
const foodColor = localStorage.getItem("foodColor") || "#e74c3c";
let gameInterval;
let speed = 130;
if (difficulty === 'medium') speed = 110;
if (difficulty === 'hard') speed = 90;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let direction = 'RIGHT';
let snakeLength = 1;
let paused = false;
const snakeSize = 20;
const cornerRadius = 5;  // Snake segment corner radius
function startGame() {
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(updateGame, speed);
    restartButton.textContent = "Restart Game"; // Change button text to "Restart Game"
}
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}
function updateGame() {
    if (!paused) {
        moveSnake();
        checkCollisions();
        drawGame();
    }
}
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'LEFT') head.x -= snakeSize;
    if (direction === 'UP') head.y -= snakeSize;
    if (direction === 'RIGHT') head.x += snakeSize;
    if (direction === 'DOWN') head.y += snakeSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        generateFood();
    } else {
        snake.pop();
    }
}
function checkCollisions() {
    const head = snake[0];

    // Check if the snake has hit the walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }
    // Check if the snake has collided with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    const y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    food = { x, y };
}

function drawGame() {
    // Clear the entire canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake (each segment with rounded corners)
    snake.forEach((segment, index) => {
        const nextSegment = snake[index + 1] || snake[index]; // Handle the last segment

        ctx.fillStyle = snakeColor;
        ctx.beginPath();
        // Use arcTo to create rounded corners between each segment
        ctx.moveTo(segment.x + cornerRadius, segment.y);
        ctx.arcTo(segment.x + snakeSize, segment.y, segment.x + snakeSize, segment.y + snakeSize, cornerRadius);
        ctx.arcTo(segment.x + snakeSize, segment.y + snakeSize, segment.x, segment.y + snakeSize, cornerRadius);
        ctx.arcTo(segment.x, segment.y + snakeSize, segment.x, segment.y, cornerRadius);
        ctx.arcTo(segment.x, segment.y, segment.x + snakeSize, segment.y, cornerRadius);
        ctx.closePath();
        ctx.fill();
    });
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
    snakeLengthText.textContent = `Length: ${snakeLength}`;
}
function gameOver() {
    clearInterval(gameInterval);
    gameOverText.style.display = 'block';
    gameOverText.textContent = `Game Over! Your Score: ${snakeLength}`;
    restartButton.style.display = 'block';  // Show restart button after game over
}
function pauseGame() {
    paused = !paused;
    pauseButton.textContent = paused ? 'Resume' : 'Pause';
}

function restartGame() {
    // Reset game state
    snake = [{ x: 100, y: 100 }];
    food = { x: 200, y: 200 };
    snakeLength = 1;
    direction = 'RIGHT';
    clearInterval(gameInterval);
    gameOverText.style.display = 'none';
    restartButton.style.display = 'none';  // Hide restart button during the game
    startGame();  // Start the game again
}

pauseButton.addEventListener('click', pauseGame);
restartButton.addEventListener('click', restartGame);

startGame();
