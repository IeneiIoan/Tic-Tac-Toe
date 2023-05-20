const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let aiPlayer = '';
let gameOver = false;

function reset() {
  board.fill('');
  currentPlayer = '';
  gameOver = false;
  printBoard();
  document.getElementById('status1').textContent = '';
  document.getElementById('status2').textContent = '';
}

function chooseSymbol(symbol) {
  currentPlayer = symbol;
  aiPlayer = symbol === 'X' ? 'O' : 'X';
  document.getElementById('status1').textContent = `Current Player: ${currentPlayer}`;
  if (currentPlayer === 'O') {
    makeAIMove();
  }
}

function printBoard() {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = board[i];
  }
}

function makeMove(position) {
  if (currentPlayer === '') {
    console.log('Please choose a symbol before making a move.');
    document.getElementById('status1').textContent = 'Please choose a symbol before making a move.';
    return;
  }

  if (!gameOver && board[position] === '') {
    board[position] = currentPlayer;
    printBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status1').textContent = `Current Player: ${currentPlayer}`;
    if (!gameOver && currentPlayer === aiPlayer) {
      makeAIMove();
    }
   }  else {
   console.log('Invalid move. Please try again.');
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && (board[a] === board[b]) && (board[a] === board[c])) {
      document.getElementById('status2').textContent = `Player ${board[a]} wins!`;
      gameOver = true;
      break;
    }
  }

  if (!gameOver && board.every(cell => cell !== '')) {
    document.getElementById('status2').textContent = "It's a tie!";
    gameOver = true;
  }
}

function makeAIMove() {
  const availablePositions = board.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);

  // Randomly select a move (Easy AI)
  const randomMove = availablePositions[Math.floor(Math.random() * availablePositions.length)];
  makeMove(randomMove);
}

function init() {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => makeMove(i));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});