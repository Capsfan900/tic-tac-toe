
//setutgame IFFE
const setupGame = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create board
  for (let row = 0; row < rows; row++) {
    let newRow = [];
    for (let col = 0; col < columns; col++) {
      newRow.push(" ");
    }
    board.push(newRow);
  }

  const getPlayerNames = () => {
    const player1Name = prompt("Enter Player 1 Name:");
    const player2Name = prompt("Enter Player 2 Name:");
    console.log({ name: player1Name, key: 'X' }, { name: player2Name, key: 'O' });
  };

  const getBoard = () => board;

  const printBoard = () => {
    console.clear();
    console.log("Stelly's Console Tic-Tac-Toe");
    console.log("");
    console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
    console.log("");
  };

  const resetBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[row][col] = " ";
      }
    }
    console.log("......reseting board");
  };

  return { getBoard, printBoard, getPlayerNames, resetBoard };
})();









// gameController as IIFE
const gameController = (() => {
  let currentPlayer = "X";
  const players = setupGame.getPlayerNames();

  const checkForTie = () => {
    let freeSpaces = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (setupGame.getBoard()[i][j] === " ") {
          freeSpaces++;
        }
      }
    }

    if (freeSpaces === 0) {
      console.log("It's a tie!");
      setupGame.resetBoard();
    }
  };

  const setPiece = () => {

    let rowChoice = parseInt(prompt("Enter a row # (1-3)")) - 1;
    let colChoice = parseInt(prompt("Enter a column # (1-3)")) - 1;

    if (setupGame.getBoard()[rowChoice][colChoice] === " ") {
      setupGame.getBoard()[rowChoice][colChoice] = currentPlayer;
      setupGame.printBoard();
      checkForWin()
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else {
      console.log("That cell is already occupied. Try again.");
    }
  };

  const checkForWin = () => {
    const board = setupGame.getBoard();

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== " " && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        console.log(`${currentPlayer} Wins! Game Over!`);
        setupGame.resetBoard();
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        console.log(`${currentPlayer} Wins! Game Over!`);
        setupGame.resetBoard();
        return;
      }
    }

    // Check diagonals
    if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      console.log(`${currentPlayer} Wins! Game Over!`);
      setupGame.resetBoard();
      return;
    }

    if (board[0][2] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      console.log(`${currentPlayer} Wins! Game Over!`);
      setupGame.resetBoard();
      return;
    }

    checkForTie();
  };

  return { setPiece };
})();



// Start the game
setupGame.printBoard();








