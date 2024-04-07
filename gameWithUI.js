//global scope variables and dom references 
const gameBoard = document.querySelector(".game-board");
const playerTitles = document.getElementById("players");

//setupGame IIFE
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

        const player1 = {
            name: player1Name,
            key: 'X'
        };

        const player2 = {
            name: player2Name,
            key: 'O'
        };
        return { player1, player2 };
    };

    const createBoardElement = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }
    };

    const resetBoard = () => {
        const cells = gameBoard.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
        });

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = " ";
            }
        }
        alert("game has ended!!");
        alert("......reseting board");
    };

    const getBoard = () => board;
    const getCells = () => gameBoard;
    return { getBoard, createBoardElement, getPlayerNames, resetBoard, getCells };
})();

// gameController as IIFE
const gameController = (() => {
    let currentPlayer;

    const initializePlayer = (players) => {
        currentPlayer = players.player1.key;
    };

    const setPiece = (cell) => {
        let boardInstance = setupGame.getBoard();
        // Check if cell is already occupied
        if (setupGame.getBoard()[cell.dataset.row][cell.dataset.col] !== " ") {
            console.log("That cell is already occupied. Try again.");
            return;
        }
        // Get current player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // Visually update cell content
        cell.textContent = currentPlayer;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        setupGame.getBoard()[row][col] = currentPlayer;
        // Check for win or tie w function calls
        checkForWin();
        checkForTie();
        // Switch player
        console.log(boardInstance) //debugg yo
    };

    const checkForWin = () => {
        const board = setupGame.getBoard();
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== " " && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                setupGame.resetBoard();
                alert(`${currentPlayer} Wins!!`)
                return;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                console.log("game end");
                setupGame.resetBoard();
                alert(`${currentPlayer} Wins!!`)
                return;
            }
        }

        // Check diagonals
        if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            console.log("game end")
            setupGame.resetBoard();
            alert(`${currentPlayer} Wins!!`)
            return;
        }

        if (board[0][2] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            console.log("game end");
            setupGame.resetBoard();
            alert(`${currentPlayer} Wins!!`)
            return;
        }

        checkForTie();
    };

    const checkForTie = () => {
        let freeSpaces = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (setupGame.getBoard()[i][j] === " ") {
                    freeSpaces++;
                }
            }
        }
        //checks for any free spaces
        if (freeSpaces === 0) {
            console.log("It's a tie!");
            setupGame.resetBoard();
        }
    };

    return { setPiece, initializePlayer, currentPlayer };
})();

const uiController = (() => {
    const styleBoardElements = () => {
        const cells = document.querySelectorAll(".cell");
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
        const clickedCells = document.querySelectorAll(".cell");
        clickedCells.forEach(cell => {
            cell.addEventListener('click', () => {
                // Pass the clicked cell element to setPiece
                gameController.setPiece(cell);
            });
        });
    };

    return { styleBoardElements, handleClicks };
})();

// Start the game
window.onload = () => {
    const players = setupGame.getPlayerNames();
    gameController.initializePlayer(players);
    setupGame.createBoardElement();
    uiController.styleBoardElements();
    uiController.handleClicks();
}