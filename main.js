let difficulty = null;
let snakeColor = "#2ecc71"; // Default snake color
let foodColor = "#e74c3c"; // Default food color

// Store user selections
const snakeColorInput = document.getElementById('snakeColor');
const foodColorInput = document.getElementById('foodColor');
const errorMessage = document.getElementById('errorMessage');

// Set selected difficulty
function setDifficulty(level) {
    difficulty = level;
    errorMessage.style.display = "none"; // Hide error message
    setSelectedButton(level + "Button");
}

// Start game if settings are valid
function startGame() {
    if (difficulty === null || !snakeColor || !foodColor) {
        errorMessage.style.display = "block"; // Show error message if settings are incomplete
    } else {
        // Save settings to localStorage and navigate to the game page
        localStorage.setItem("difficulty", difficulty);
        localStorage.setItem("snakeColor", snakeColor);
        localStorage.setItem("foodColor", foodColor);
        window.location.href = "game.html"; // Navigate to game page
    }
}
snakeColorInput.addEventListener('input', (e) => {
    snakeColor = e.target.value;
});

foodColorInput.addEventListener('input', (e) => {
    foodColor = e.target.value;
});

// Highlight the selected difficulty button
function setSelectedButton(buttonId) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    document.getElementById(buttonId).classList.add('selected');
}
