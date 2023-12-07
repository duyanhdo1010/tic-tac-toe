// console version of tic tac toe

function GameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < cols; j++){
      board[i][j] = '';
    }
  }

  const getBoard = () => board;

  const getCell = (row, col) => board[row][col];

  const setCell = (row, col, symbol) => {
    board[row][col] = symbol;
  }

  return {getBoard, getCell, setCell};
}

function Player(name, symbol) {
  let score = 0;
  const getScore = () => score;
  const increaseScore = () => score++;

  return {name, symbol, getScore, increaseScore};
}

function GameController() {
  let gameBoard = GameBoard();
  let draw = 0;
  const getDraw = () => draw;
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    if (getCurrentPlayer() === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  const play = (row, col) => {
    // check if the cell is already filled
    if (gameBoard.getCell(row, col) !== '' || checkWin() || checkDraw()) {
      return;
    } else {
      gameBoard.setCell(row, col, currentPlayer.symbol);
      if (checkWin()) {
        currentPlayer.increaseScore();
        return;
      }
      // Check for draw after checking for win
      if (checkDraw()) {
        console.log('draw');
        draw++;
        return;
      }
      switchPlayer();
      gameBoard.getBoard();
    }
  }

  
  const checkDraw = () => {
    for (let i = 0; i < 3 ; i++) {
      for (let j = 0; j < 3 ; j++) {
        if (gameBoard.getCell(i, j) === '') {
          return false;
        }
      }
    }
    return true;
  }

  const checkWin = () => {
    // check hang ngang
    for (let i = 0; i < 3 ; i++) {
      if (gameBoard.getCell(i, 0) === gameBoard.getCell(i, 1) && gameBoard.getCell(i, 1) === gameBoard.getCell(i, 2) && gameBoard.getCell(i, 0) !== '') {
        return true;
      }
      // check hang doc
      if (gameBoard.getCell(0, i) === gameBoard.getCell(1, i) && gameBoard.getCell(1, i) === gameBoard.getCell(2, i) && gameBoard.getCell(0, i) !== '') {
        return true;
      }
      // check hang cheo
      if (gameBoard.getCell(0, 0) === gameBoard.getCell(1, 1) && gameBoard.getCell(1, 1) === gameBoard.getCell(2, 2) && gameBoard.getCell(0, 0) !== '') {
        return true;
      }
      else if (gameBoard.getCell(0, 2) === gameBoard.getCell(1, 1) && gameBoard.getCell(1, 1) === gameBoard.getCell(2, 0) && gameBoard.getCell(0, 2) !== '') {
        return true;
      }
    }  
  }

  const reset = () => {
    gameBoard = GameBoard();
    currentPlayer = player1;
  }

  return {play, reset, getCurrentPlayer, getBoard: () => gameBoard.getBoard(), player1, player2, getDraw, checkDraw, checkWin};
}

function displayController() {
  const game = GameController();
  const boardDiv = document.querySelector('.board');
  const playerTurn = document.querySelector('.turn');

  //show win modal
  const showResultModal = (winner) => {
    const endModal = document.querySelector('#endGameModal');
    endModal.style.display = 'block';
    const winnerName = document.querySelector('.endGameText');
    if (winner) {
      winnerName.textContent = `${winner.name} win this round!`;
    } else {
      winnerName.textContent = 'It\'s a draw!';
    }
  }

  const updateBoard = () => {
    
    boardDiv.textContent = '';
    const board = game.getBoard();
    const activePlayer = game.getCurrentPlayer();
    playerTurn.textContent = `${activePlayer.symbol}'s turn`;

    // create board
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        cell.textContent = board[i][j];
        cell.style.cssText = 'border: 3px solid black;display: flex;align-items: center;justify-content: center; font-size: 60px;font-weight: bold;';
        boardDiv.appendChild(cell);
      }
    }

    //add event listener
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const row = cell.getAttribute('data-row');
        const col = cell.getAttribute('data-col');
        game.play(row, col);
        updateBoard();
        if (game.checkWin()) {
          showResultModal(game.getCurrentPlayer());
        } else if (game.checkDraw()) {
          showResultModal();
        }
      })
    })

    // reset button
    const resetBtn = document.querySelector('.rs-btn');
    resetBtn.addEventListener('click', () => {
      game.reset();
      updateBoard();
    })

    // home button
    const reloadButton = document.querySelector('.Home');
    reloadButton.addEventListener('click', () => {
      location.reload();
    });

    // next round button
    const nextRoundButton = document.querySelector('.Next');
    nextRoundButton.addEventListener('click', () => {
      game.reset();
      updateBoard();
      const endModal = document.querySelector('#endGameModal');
      endModal.style.display = 'none';
    });

    // get score
    const score1 = document.querySelector('.p1-current-score');
    const score2 = document.querySelector('.p2-current-score');
    const draw = document.querySelector('.draw-score');
    score1.textContent =  game.player1.getScore();
    score2.textContent =  game.player2.getScore();
    draw.textContent =  game.getDraw();

    
  }

  updateBoard();
}

// start menu modal

window.addEventListener('DOMContentLoaded', (event) => {
  // Code to open the modal goes here
  const modal = document.querySelector('#startGameModal');
  modal.style.display = 'block';

  // start game button
  const startBtn = document.querySelector('#startGameButton');
  startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  })
});



displayController();