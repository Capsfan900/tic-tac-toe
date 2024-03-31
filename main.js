//Dom references 


//intial game setup function (objects an function prototypes / methods )


//a couple global scope variables
const board = [];
const currentPLayer = "X";

    const setupGame = () => {
            //game object body
            const rows = 3;
            const columns = 3;
             // Create board
    
            for (let row = 0; row < rows; row++) {
            let newRow = [];
                for (let col = 0; col < columns; col++) {
                 // JS
                    newRow.push("X");
                // HTML
             }
                board.push(newRow);
            }
    
        //prompt players for Names (player 1 and player 2)
        const getPlayerNames = () => {
            //const player1Name = prompt("Enter Player 1 Name:");
           // const player2Name = prompt("Enter Player 2 Name:");
            //return [{ name: player1Name, key: 'X' }, { name: player2Name, key: 'O' }];
            //gather for input and assign
            //input to P1 and P2 
        };
        
        //get board function for when UI is implemented
        const getBoard = () => board;
        
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
       
            return {getBoard, printBoard, getPlayerNames,resetBoard};
    };
    



//-------------------------------------------------------------------//

    const gameController = () =>{

            const checkForTie = () =>{
                let freeSpaces = 9;
                for(let i = 0; i < 3; i++)  {
                    for(let j = 0; j < 3; j++){
                        console.log(`Checking cell [${i}, ${j}]`);  // Debug log
                        if(board[i][j] != " "){
                            freeSpaces--;
                        console.log(`Found occupied cell at [${i}, ${j}]`);  // Debug log
                            
                        }
                    }
                }
                
            }
            //display winner and trigger board reset
        

        const setPiece = () => {
            let rowChoice = prompt("enter a row #(1 -3)");
            let colChoice = prompt("enter a column #(1-3)");
            console.log(colChoice, rowChoice);

        }

        const checkForWin = () => {

        }
       
        return {checkForTie, setPiece, checkForWin};

    }








    
//--------------------------program body-------------------------------//





//instantiate setupGame and gameController objects
const instanceOfSetupGame  = setupGame();
const gameControllerInstance = gameController();
//destructoring methods using ,dot, object or bracket notation 
//in this case im using dot notation
instanceOfSetupGame.getPlayerNames();
instanceOfSetupGame.printBoard();
//instanceOfSetupGame.resetBoard();
instanceOfSetupGame.getBoard();
instanceOfSetupGame.printBoard();
gameControllerInstance.checkForTie();



















    















