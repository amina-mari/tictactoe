/* 
    Pseudocode



*/

/* DOM VARIABLES */
const gameSpots = document.querySelectorAll(".gameSpot");



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

    function startGame(event){
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
        } else {
            gameBoard.gameboardArray[event.currentTarget.id] = player2.getMark();
            gameBoard.playRecorder.push(player2.getMark());
        }

        event.currentTarget.textContent = gameBoard.gameboardArray[event.currentTarget.id];
        console.log(gameBoard.gameboardArray);
    }

    return {
        definePlayers,
        startGame
    }
}();

gameController.definePlayers();

gameSpots.forEach(gameSpot => {gameSpot.addEventListener("click", gameController.startGame)})
