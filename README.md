# Tic-Tac-Toe

A simple, fully playable Tic-Tac-Toe game built with plain **HTML, CSS, and JavaScript** — no frameworks or libraries.

Built for **VOSC Activity 1 – Prerequisite Activity**.

## Features

- Classic 3x3 Tic-Tac-Toe gameplay for two players.
- **Vs Computer** mode with a simple AI that will win when it can, block your winning moves, and otherwise play sensibly.
- Win and draw detection, with the winning line highlighted.
- Live scoreboard tracking wins for each player and draws.
- Restart button to quickly reset the board.
- Responsive layout that works on both desktop and mobile.

## Project Structure

```
VOSC Activity-1/
├── index.html   # Game markup
├── style.css    # Styling
├── script.js    # Game logic
└── README.md    # This file
```

## How to Run / Play

1. Download or clone this repository.
2. Open `index.html` in any modern web browser (double-click the file, or use a tool like VS Code's Live Server extension).
3. Choose a mode at the top: **2 Players** (take turns on the same device) or **Vs Computer**.
4. Click any empty cell to place your mark (X goes first).
5. Players alternate turns until someone gets three in a row (horizontally, vertically, or diagonally) or the board fills up for a draw.
6. The scoreboard updates automatically after each round.
7. Click **Restart Round** to clear the board and play again (scores are kept until you switch modes).

## How to Clone

```bash
git clone https://github.com/<your-username>/VOSC-Activity-1.git
cd VOSC-Activity-1
```

Then open `index.html` in your browser.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
