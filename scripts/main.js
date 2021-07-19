
const playerFactory = (number, mark, name) => {
    if ((number === 1 || number === 2) 
    &&  (mark === "O" || mark === "X")
    &&   name) {
        const getNumber = () => number;

        const getMark = () => mark;

        const getName = () => name;

        return {getNumber, getMark, getName};
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
    const resultDiv = document.querySelector(".result");
    const resultPara = document.getElementById("resultPara");
    const resultWinner = document.getElementById("resultWinner");
    const buttonClose = document.getElementById("buttonClose");
    const buttonStart = document.getElementById("buttonStart");
    const p1NameInput = document.getElementById("p1Name");
    const p2NameInput = document.getElementById("p2Name");
    const p1MarkX = document.getElementById("p1MarkX");
    const p1MarkO = document.getElementById("p1MarkO");

    let player1 = "";

    let player2 = "";
    
    function verifyInputs(){
        if(p1NameInput.value 
        && p2NameInput.value 
        && (p1MarkX.checked || p1MarkO.checked)){
            const p1NameTrimmed = p1NameInput.value.trim();
            const p2NameTrimmed = p2NameInput.value.trim();
            const p1Mark = p1MarkX.checked ? 'X' : 'O';

            return {p1NameTrimmed, p2NameTrimmed, p1Mark};
        } else return false;
    }

    function clearInputs(){
        p1NameInput.value = "";
        p2NameInput.value = "";
        p1MarkO.checked = false;
        p1MarkX.checked = false;
    }

    function clearBoard(){
        gameSpots.forEach(gameSpot => {gameSpot.textContent = ""});
    }

    function definePlayers(obj){

        if(obj.p1Mark === 'X'){
            player1 = playerFactory(1, "X", obj.p1NameTrimmed);
            player2 = playerFactory(2, "O", obj.p2NameTrimmed);
        } else {
            player1 = playerFactory(1, "O", obj.p1NameTrimmed);
            player2 = playerFactory(2, "X", obj.p2NameTrimmed);
        }
    }

    function markBoard(player){
        gameBoard.gameboardArray[event.currentTarget.id] = player.getMark();
        gameBoard.playRecorder.push(player.getMark());
        event.currentTarget.textContent = gameBoard.gameboardArray[event.currentTarget.id];

        if((gameBoard.playRecorder.length >= 3) && winOrLose(player)){
            winGame(player);
            return;
        }

        if(gameBoard.playRecorder.length === 9) drawGame();
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

    function winGame(player){
        resultPara.textContent = `Player ${player.getName()} win!`
        resultDiv.style.display = "flex";
        gameSpots.forEach(gameSpot => {gameSpot.removeEventListener("click", startGame)})
        gameBoard.gameboardArray = ["", "", "", "", "", "", "", "", ""];
        gameBoard.playRecorder = [];
    }

    function drawGame(){
        resultDiv.textContent = "";
        resultWinner.textContent = "It's a Draw!";
        resultDiv.style.display = "flex";
        gameSpots.forEach(gameSpot => {gameSpot.removeEventListener("click", startGame)})
        gameBoard.gameboardArray = ["", "", "", "", "", "", "", "", ""];
        gameBoard.playRecorder = [];
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
            markBoard(player1);
        } else {
            markBoard(player2);
        }

        event.currentTarget.removeEventListener("click", startGame);
    }

    /* EXECUTING */

    buttonStart.addEventListener("click", function(event){
        event.preventDefault();
        if(verifyInputs()){
            buttonStart.textContent = "Restart Game";

            const playerInfo = verifyInputs();
            definePlayers(playerInfo);
            clearInputs();
            clearBoard();
            gameSpots.forEach(gameSpot => {gameSpot.addEventListener("click", startGame)});
        } else return;
    });

    buttonClose.addEventListener("click", function(){
        resultDiv.style.display = "none";
    })

    return {
        
    }
}();