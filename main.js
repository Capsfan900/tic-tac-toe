//Dom references 


//intial game setup function

    const setupGame = () => {

            //game object body
            const rows = 3;
            const columns = 3;
             // Create board
            const board = [];
            for (let row = 0; row < rows; row++) {
            let newRow = [];
                for (let col = 0; col < columns; col++) {
                 // JS
                newRow.push(' ');
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
            console.log("")
            console.log("Stelly's Console Tic-Tac-Toe"); // Add label before the grid
            console.log("")
            console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
            console.log("")
        }

            return {getBoard, printBoard, getPlayerNames};
    };
    



    
//instantiate setupGame object 
const instanceOfSetupGame  = setupGame();
//destructor methods needs or object dot notation 
instanceOfSetupGame.getPlayerNames()
instanceOfSetupGame.printBoard();





//-------------------------------------------------------------------//

    const gameController = () =>{

        const checkForWinner = () => {
            //display winner and trigger board reset
        }

        const setPiece = () => {
            //set piece depedning on which players turn it is

        }

        const turnTracker = () =>{
            //tracks players turn 
        }

        
        return {checkForWinner, setPiece, turnTracker};

    }
















    















