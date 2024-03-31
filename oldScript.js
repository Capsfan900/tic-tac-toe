//Dom references 


//initial game setup function (objects and function prototypes )


//a couple global scope variables

const currentPLayer = "X";
const board = [];


    const gameBoard = (() => {
        const startGame = () => {
            //prompt players for Names (player 1 and player 2)
                const player1Name = prompt("Enter Player 1 Name:");
                const player2Name = prompt("Enter Player 2 Name:");
                console.log(`Player 1:${player1Name} , Player 2:${player2Name}`);
                //gather for input and assign
                //input to P1 and P2 
                //game object body
                const rows = 3;
                const columns = 3;
                // Create board
                for (let row = 0; row < rows; row++) {
                let newRow = [];
                    for (let col = 0; col < columns; col++) {
                    // JS
                     newRow.push(" ");
                    // HTML
                }
                    board.push(newRow);
                }
            }
        //get board function for when UI is implemented
        const getBoard = () =>[...board];
        
        const printBoard = () => {
            //console.clear() make this togglable eventually
            console.log("")
            console.log("Stelly's Console Tic-Tac-Toe"); // Add label before the grid
            console.log("")
            console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
            //let player1 = prompt("Chose Your Name Player (X)");
            //let player2 = prompt("Chose Your Name Player (O)");
            console.log("");
            //console.log(`Player X Name: ${player1}`);
            //console.log(`Player O Name: ${player2}`);
        }
        
        const resetBoard = () =>{
            for(let rows = 0; rows < 3; rows++){
                for(let columns = 0; columns < 3; columns++){
                    board[rows][columns] = " ";
                }
            }
            console.log("......reseting board")
        }
       
            return {getBoard, printBoard, startGame,resetBoard};
    })();
    



//-------------------------------------------------------------------//

    const gameController = (() => {

            const checkForTie = () =>{
                let freeSpaces = 9; 
                for(let i = 0; i < 3; i++)  {
                    for(let j = 0; j < 3; j++){
                        console.log(`Checking cell [${i}, ${j}]`);  // Debug log
                        if(board[i][j] != " "){
                            freeSpaces--;
                        console.log(`Found occupied cell at [${i}, ${j}]`);  // Debug log
                        console.log(board);
                            
                        }
                    }
                }
                
            }
            //display winner and trigger board reset
        

        const playerMove = () => {
         do {
            let rowChoice = prompt("enter a row #(1-3)") -1;
            let colChoice = prompt("enter a column #(1-3)") -1;
            console.log(colChoice, rowChoice);
                if(board[rowChoice][colChoice] !=  " "){
                console.log("Invalid Move Space Taken");
                } else {
                    board[rowChoice][colChoice] = currentPLayer;
                    break;
                }
         } while (board[rowChoice][colChoice] != " ");
            
        }

        const checkForWin = () => {
            

        }
       
        return {checkForTie, playerMove, checkForWin};

    })();







    
//--------------------------program body-------------------------------//



//instantiate setupGame and gameController objects
const instanceOfSetupGame  = gameBoard();
const gameControllerInstance = gameController();
//destructoring methods using ,dot, object or bracket notation 
//in this case im using dot notation
instanceOfSetupGame.getPlayerNames();
instanceOfSetupGame.printBoard();
//instanceOfSetupGame.resetBoard();
instanceOfSetupGame.getBoard();
instanceOfSetupGame.printBoard();
gameControllerInstance.checkForTie();
gameControllerInstance.playerMove();
instanceOfSetupGame.printBoard();
instanceOfSetupGame.getBoard();



















    















