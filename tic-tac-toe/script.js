// ===============================
// Get Elements
// ===============================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const playAgainBtn = document.getElementById("playAgain");
const themeBtn = document.getElementById("themeBtn");

const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

// ===============================
// Game Variables
// ===============================

let currentPlayer = "X";
let gameActive = true;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let xScore = 0;
let oScore = 0;
let draw = 0;

// ===============================
// Winning Patterns
// ===============================

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// ===============================
// Event Listener
// ===============================

cells.forEach(cell=>{
    cell.addEventListener("click",cellClicked);
});

restartBtn.addEventListener("click",restartGame);

resetBtn.addEventListener("click",resetScore);

playAgainBtn.addEventListener("click",()=>{

    popup.classList.add("hidden");
    restartGame();

});

themeBtn.addEventListener("click",toggleTheme);
function cellClicked(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

}

function checkWinner(){
    const winningPattern = winPatterns.find(([a, b, c]) =>
        board[a] && board[a] === board[b] && board[a] === board[c]
    );

    if(winningPattern){
        gameActive = false;
        winningPattern.forEach(index => cells[index].classList.add("winner"));

        if(currentPlayer === "X"){
            xScore++;
            scoreX.textContent = xScore;
        }else{
            oScore++;
            scoreO.textContent = oScore;
        }

        statusText.textContent = `Player ${currentPlayer} Wins!`;
        winnerText.textContent = `Player ${currentPlayer} Wins!`;
        winSound.currentTime = 0;
        winSound.play().catch(() => {});
        popup.classList.remove("hidden");
        return;
    }

    if(board.every(cell => cell !== "")){
        gameActive = false;
        draw++;
        drawScore.textContent = draw;
        statusText.textContent = "It's a Draw!";
        winnerText.textContent = "It's a Draw!";
        drawSound.currentTime = 0;
        drawSound.play().catch(() => {});
        popup.classList.remove("hidden");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

function restartGame(){
    currentPlayer = "X";
    gameActive = true;
    board.fill("");
    statusText.textContent = "Player X Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner");
    });
}

function resetScore(){
    xScore = 0;
    oScore = 0;
    draw = 0;
    scoreX.textContent = xScore;
    scoreO.textContent = oScore;
    drawScore.textContent = draw;
    popup.classList.add("hidden");
    restartGame();
}

function toggleTheme(){
    document.body.classList.toggle("light-theme");
    themeBtn.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
}
