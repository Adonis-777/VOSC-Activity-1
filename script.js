const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const modePvPBtn = document.getElementById('modePvP');
const modeCPUBtn = document.getElementById('modeCPU');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDEl = document.getElementById('scoreD');
const scoreOLabel = document.getElementById('scoreOLabel');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let vsComputer = false;
const scores = { X: 0, O: 0, D: 0 };

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i] || '';
    cell.classList.toggle('o', board[i] === 'O');
    cell.disabled = Boolean(board[i]) || gameOver;
  });
}

function checkWinner(b) {
  for (const line of WIN_LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { winner: b[a], line };
    }
  }
  if (b.every(Boolean)) return { winner: 'draw', line: [] };
  return null;
}

function endGame(result) {
  gameOver = true;
  if (result.winner === 'draw') {
    statusEl.textContent = "It's a draw!";
    scores.D++;
    scoreDEl.textContent = scores.D;
  } else {
    statusEl.textContent = `Player ${result.winner} wins!`;
    scores[result.winner]++;
    (result.winner === 'X' ? scoreXEl : scoreOEl).textContent = scores[result.winner];
    result.line.forEach((i) => cells[i].classList.add('win'));
  }
  render();
}

function handleMove(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;

  const result = checkWinner(board);
  if (result) {
    endGame(result);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  render();
  statusEl.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === 'O' && !gameOver) {
    setTimeout(computerMove, 400);
  }
}

function computerMove() {
  if (gameOver) return;
  const move = pickComputerMove();
  if (move !== -1) handleMove(move);
}

function pickComputerMove() {
  const empty = board.map((v, i) => (v ? -1 : i)).filter((i) => i !== -1);

  for (const i of empty) {
    const copy = [...board];
    copy[i] = 'O';
    if (checkWinner(copy)?.winner === 'O') return i;
  }

  for (const i of empty) {
    const copy = [...board];
    copy[i] = 'X';
    if (checkWinner(copy)?.winner === 'X') return i;
  }

  if (board[4] === null) return 4;

  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : -1;
}

function resetRound() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach((cell) => cell.classList.remove('win'));
  statusEl.textContent = "Player X's turn";
  render();
}

function setMode(cpu) {
  vsComputer = cpu;
  modePvPBtn.classList.toggle('active', !cpu);
  modeCPUBtn.classList.toggle('active', cpu);
  scoreOLabel.textContent = cpu ? 'Computer' : 'Player O';
  scores.X = 0; scores.O = 0; scores.D = 0;
  scoreXEl.textContent = 0; scoreOEl.textContent = 0; scoreDEl.textContent = 0;
  resetRound();
}

boardEl.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  handleMove(Number(cell.dataset.index));
});

resetBtn.addEventListener('click', resetRound);
modePvPBtn.addEventListener('click', () => setMode(false));
modeCPUBtn.addEventListener('click', () => setMode(true));

render();
