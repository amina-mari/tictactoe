
const playerFactory = (number, mark) => {
    if ((number === 1 || number === 2) && (mark === "O" || mark === "X")) {
        const getNumber = () => number;

        const getMark = () => mark;

        return {getNumber, getMark};
    }
    else return "Invalid Number or Mark";
};

const gameBoard = function(){
    "use strict";

    const gameboardArray = ["", "", "", "", "", "", "", "", ""];

    const playRecorder = [];

    return {
        gameboardArray,
        playRecorder
    }
}();

const gameController = function(){
    "use strict";

    const gameSpots = document.querySelectorAll(".gameSpot");

    let player1 = "";

    let player2 = "";
    
    function definePlayers(){
        alert("Welcome to the Amina's Tic Tac Toe!")
        let markConfirm = confirm("Player 1 would like to play with the mark 'X'?");
        if(markConfirm){
            player1 = playerFactory(1, "X");
            player2 = playerFactory(2, "O");
        } else {
            player1 = playerFactory(1, "O");
            player2 = playerFactory(2, "X");
        }
    }

    function winOrLose(player){
        let winArray = [
            /* Horizontal */
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        
            /* Vertical */
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            /* Diagonal */
            [0, 4, 8],
            [6, 4, 2],
        ]

        for(let i = 0; i < winArray.length; i++){
            let counter = 0;
            for(let j = 0; j < winArray[i].length; j++){
                if(gameBoard.gameboardArray[winArray[i][j]] === player.getMark()) counter++;
                if(counter === 3) return true;
                if(j === 2) counter = 0;
            }
        };
    }

    function endGame(player){
        alert(`Player ${player.getNumber()} wins!`);
        gameSpots.forEach(gameSpot => {gameSpot.removeEventListener("click", startGame)})
    }

    function startGame(event){
        // do it with playRecorder
        let verifyArray = 0;
        for(let i = 0; i < gameBoard.gameboardArray.length; i++){
            if(gameBoard.gameboardArray[i]){
                verifyArray++;
                if(verifyArray === 9) return;
            }
        }

        if( gameBoard.playRecorder[gameBoard.playRecorder.length-1] === player2.getMark() ||
            gameBoard.playRecorder[gameBoard.playRecorder.length-1] === undefined){
            
            gameBoard.gameboardArray[event.currentTarget.id] = player1.getMark();
            gameBoard.playRecorder.push(player1.getMark());
            
            if(gameBoard.playRecorder.length >= 3 && winOrLose(player1)){
                endGame(player1);
            }
        } else {
            gameBoard.gameboardArray[event.currentTarget.id] = player2.getMark();
            gameBoard.playRecorder.push(player2.getMark());

            if((gameBoard.playRecorder.length >= 3) && winOrLose(player2)){
                endGame(player2);
            }
        }

        event.currentTarget.textContent = gameBoard.gameboardArray[event.currentTarget.id];
        event.currentTarget.removeEventListener("click", startGame);
    }

    /* EXECUTING */

    definePlayers();

    gameSpots.forEach(gameSpot => {gameSpot.addEventListener("click", startGame)});

    return {
        
    }
}();