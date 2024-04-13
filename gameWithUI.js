//global scope variables and dom references 
const gameBoard = document.querySelector(".game-board");
const playerstate = document.querySelector(".playerstate");
const dialog = document.querySelector("dialog");
let currentPlayer;
let player1;
let player2;

/////////////////////////////////////////////////////////////////////////////////////////



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
        console.log(player1.name, player2.name);
        const player1Div = document.querySelector(".player1Name");
        const player2Div = document.querySelector(".player2Name");
        player1Div.textContent = `${player1.name}`;
        player2Div.textContent = `${player2.name}`;
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
        const playerDiv1 = document.querySelector(".player1Name");
        const playerDiv2 = document.querySelector(".player2Name");
        cells.forEach(cell => {
            cell.textContent = "";
        });

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = " ";
            }
        }

        alert("......reseting board");
        playerDiv1.textContent = " ";
        playerDiv2.textContent = " ";
        playerstate.textContent = " ";
        playerstate.textContent;
        dialog.showModal();
    };

    const getBoard = () => board;
    const getCells = () => gameBoard;
    return { getBoard, createBoardElement, getPlayerNames, resetBoard, getCells };
})();




///////////////////////////////////////////////////////////////////////////////////////////////////////////////




// gameController  IIFE
const gameController = (() => {
    //instantiate current player

    //we are assuming the players parameter here is going to be an object
    //its not established here so it was confusing coming back to this code
    const initializePlayer = (players) => {
        currentPlayer = players.player1.key;
        player1 = players.player1;
        player2 = players.player2;
    };

    const setPiece = (cell) => {
        let boardInstance = setupGame.getBoard();
        // Check if cell is already occupied
        if (setupGame.getBoard()[cell.dataset.row][cell.dataset.col] !== " ") {
            console.log("That cell is already occupied. Try again.");
            return;
        }
        //makes the current player the opposite of whatver it is (aka swicthing turns)
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // Visually update cell content
        cell.textContent = currentPlayer;
        //grabbing the row and column of current cell clicked
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        setupGame.getBoard()[row][col] = currentPlayer;
        // Check for win or tie w function calls
        setTimeout(() => {
            checkForWin();
            checkForTie();
        }, "1000");
        console.log(boardInstance) //debugg yo
        if (currentPlayer === "X") {
            playerstate.textContent = `Player ${player1.name}'s turn`;
        } else if (currentPlayer === "O") {
            playerstate.textContent = `Player ${player2.name}'s turn`;
        }

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
                setupGame.resetBoard();
                return;
            }
        }

        // Check diagonals
        if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            setupGame.resetBoard();
            return;
        }

        if (board[0][2] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            setupGame.resetBoard();
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const uiController = (() => {
    const styleBoardElements = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.style.width = '150px';
            cell.style.height = '150px';
            cell.style.border = '1px solid black';
            cell.style.display = 'flex';
            cell.style.flexDirection = "column";
            cell.style.justifyContent = "center";
            cell.style.alignItems = "center";
            cell.style.textAlign = 'center';
            cell.style.lineHeight = '50px';
            cell.style.fontSize = '50px';
        });

    };

    const handleClicks = () => {

        const clickedCells = document.querySelectorAll(".cell");
        //adds event listeners for all cells from "clickedCells"
        clickedCells.forEach(cell => {
            cell.addEventListener('click', () => {
                // Pass the clicked cell element to setPiece
                gameController.setPiece(cell);
            });
        });
    };

    const modalActions = () => {
        const closeBtn = document.getElementById("close");
        closeBtn.addEventListener("click", () => {
            dialog.close();
            setTimeout(() => {
                setupGame.getPlayerNames();
            }, "500");
        });


    }

    return { styleBoardElements, handleClicks, modalActions };
})();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const AIController = (() => {
    //code for AI eventually
})();



// Start the game
window.onload = () => {
    const players = setupGame.getPlayerNames();
    gameController.initializePlayer(players);
    setupGame.createBoardElement();
    uiController.styleBoardElements();
    uiController.handleClicks();
    uiController.modalActions();
}





