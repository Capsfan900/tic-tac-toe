//global scope variables and dom references 

const gameBoard = document.querySelector(".game-board");


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
        return { name: player1Name, key: 'X' }, { name: player2Name, key: 'O' };
    };

    let playerNames;

    const getBoard = () => board;

    const createBoardElement = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                console.log("appending Cell...");
                console.log(gameBoard);
                gameBoard.appendChild(cell);
            }
        }
    };

    const resetBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = " ";
            }
        }
        console.log("......reseting board");
    };

    return {
        getBoard, createBoardElement, getPlayerNames: () => {
            if (!playerNames) { // Check if player names are already retrieved
                playerNames = getPlayerNames();
            }
            return playerNames;
        }, resetBoard
    };
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
                //console.log(`${players[currentPlayer === "X" ? 0 : 1].name} (${currentPlayer}) wins!`);
                console.log("game end");
                setupGame.resetBoard();
                setupGame.printBoard();
                return;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                //console.log(`${players[currentPlayer === "X" ? 0 : 1].name} (${currentPlayer}) wins!`);
                console.log("game end");
                setupGame.resetBoard();
                setupGame.printBoard();


                return;
            }
        }

        // Check diagonals
        if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            //console.log(`${players[currentPlayer === "X" ? 0 : 1].name} (${currentPlayer}) wins!`);
            console.log("game end")
            setupGame.resetBoard();
            setupGame.printBoard();

            return;
        }

        if (board[0][2] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            //console.log(`${players[currentPlayer === "X" ? 0 : 1].name} (${currentPlayer}) wins!`);
            console.log("game end");
            setupGame.resetBoard();
            setupGame.printBoard();

            return;
        }

        checkForTie();
    };

    return { setPiece };
})();







const uiController = (() => {

    const styleBoardElements = () => {
        const wow = setupGame.getPlayerNames();
        console.log(wow);
        const cells = document.querySelectorAll(".cell");
        const title = document.querySelector("#players");
        cells.forEach((cell) => {
            cell.style.width = '150px';
            cell.style.height = '150px';
            cell.style.border = '1px solid black';
            cell.style.display = 'inline-block';
            cell.style.textAlign = 'center';
            cell.style.lineHeight = '50px';
            cell.style.fontSize = '24px';
        });

    };

    const handleClicks = () => {
        const clickedCells = document.querySelector(".cell");
        clickedCells.addEventListener(function () {

        });

    }

    return { styleBoardElements, handleClicks };
})();




// Start the game
setupGame.createBoardElement();
uiController.styleBoardElements();
