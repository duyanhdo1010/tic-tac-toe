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

  const getBoard = () => console.table(board);

  const getCell = (row, col) => board[row][col];

  const setCell = (row, col, symbol) => {
    board[row][col] = symbol;
  }

  return {getBoard, getCell, setCell};
}

function Player(name, symbol) {
  return {name, symbol};
}

function GameController() {
  const gameBoard = GameBoard();
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
    if (gameBoard.getCell(row, col) !== '') {
      return;
    } else {
      console.log(`${currentPlayer.name} played at ${row}, ${col}`);
      gameBoard.setCell(row, col, currentPlayer.symbol);
      if (checkWin()) {
        gameBoard.getBoard();
        console.log(`${currentPlayer.name} win`);
        return;
      }
      if (checkDraw()) {
        console.log('Draw');
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

  return {play, reset, getCurrentPlayer};
}

const game = GameController();
