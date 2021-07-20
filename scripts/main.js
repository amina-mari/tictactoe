
const playerFactory = (number, mark, name) => {
    if ((number === 1 || number === 2 || number === 3) 
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
    const congratsPara = document.getElementById("congratulations");
    const buttonClose = document.getElementById("buttonClose");
    const buttonStart = document.getElementById("buttonStart");
    const p1NameInput = document.getElementById("p1Name");
    const p2NameInput = document.getElementById("p2Name");
    const p1MarkX = document.getElementById("p1MarkX");
    const p1MarkO = document.getElementById("p1MarkO");
    const cpuOptionYes = document.getElementById("cpuOptionYes");
    const cpuOptionNo = document.getElementById("cpuOptionNo");
    const divPlayer2 = document.querySelector(".divPlayer2");

    let player1 = "";

    let player2 = "";
    
    function verifyInputs(){
        if(p1NameInput.value 
        && (p1MarkX.checked || p1MarkO.checked)
        && (cpuOptionYes.checked || cpuOptionNo.checked)){
            const computerPlayer = cpuOptionYes.checked ? true : false;
            const p1NameTrimmed = p1NameInput.value.trim();
            const p1Mark = p1MarkX.checked ? 'X' : 'O';
            
            if(!computerPlayer && p2NameInput.value){
                const p2NameTrimmed = p2NameInput.value.trim();
                return {p1NameTrimmed, p2NameTrimmed, p1Mark, computerPlayer};
            } 
            else if(computerPlayer) return {p1NameTrimmed, p1Mark, computerPlayer};
            else return false;
        } else return false;
    }

    function clearInputs(){
        p1NameInput.value = "";
        p2NameInput.value = "";
        p1MarkO.checked = false;
        p1MarkX.checked = false;
        cpuOptionNo.checked = false;
        cpuOptionYes.checked = false;
    }

    function clearBoard(){
        gameSpots.forEach(gameSpot => {gameSpot.textContent = ""});
        gameBoard.gameboardArray = ["", "", "", "", "", "", "", "", ""];
        gameBoard.playRecorder = [];
    }

    function definePlayers(obj){
        if(obj.computerPlayer){
            if(obj.p1Mark === 'X'){
                player1 = playerFactory(1, "X", obj.p1NameTrimmed);
                player2 = playerFactory(3, "O", "Computer");
            } else {
                player1 = playerFactory(1, "O", obj.p1NameTrimmed);
                player2 = playerFactory(3, "X", "Computer");
            }
        } else {
            if(obj.p1Mark === 'X'){
                player1 = playerFactory(1, "X", obj.p1NameTrimmed);
                player2 = playerFactory(2, "O", obj.p2NameTrimmed);
            } else {
                player1 = playerFactory(1, "O", obj.p1NameTrimmed);
                player2 = playerFactory(2, "X", obj.p2NameTrimmed);
            }
        }
    }

    function getRandomSpot(){
        let randomSpot = Math.round(Math.random() * 9);
        let availableSpots = [];
        
        for(let i = 0; i < gameBoard.gameboardArray.length; i++){
            if(!(gameBoard.gameboardArray[i])) availableSpots.push(i);
        };

        console.log(availableSpots);

        for(let i = 0; i < availableSpots.length; i++){
            if(randomSpot === availableSpots[i]) {
                console.log("inside the function: " + randomSpot);
                return randomSpot;
            }
            
            else if(i === availableSpots.length-1){
                return getRandomSpot();
            } 
        }
    }

    function markBoard(player){
        let gameEnded = false;

        if(player.getNumber() !== 3){
            gameBoard.gameboardArray[event.currentTarget.id] = player.getMark();
            gameBoard.playRecorder.push(player.getMark());
            event.currentTarget.textContent = gameBoard.gameboardArray[event.currentTarget.id];
            event.currentTarget.removeEventListener("click", startGame);
        } else {
            const randomSpot = getRandomSpot();
            console.log(randomSpot);
            gameBoard.gameboardArray[randomSpot] = player.getMark();
            gameBoard.playRecorder.push(player.getMark());
            gameSpots.forEach(gameSpot => {
                if(gameSpot.id == randomSpot) {
                    gameSpot.textContent = gameBoard.gameboardArray[randomSpot];
                    gameSpot.removeEventListener("click", startGame);
                    console.log("Marked!");
                }
            });
        }

        if((gameBoard.playRecorder.length >= 3) && winOrLose(player)){
            gameEnded = true;
            winGame(player);
            return gameEnded;
        }

        if(gameBoard.playRecorder.length === 9) {
            gameEnded = true;
            drawGame();
            return gameEnded;
        };
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
        if(player.getNumber() !== 3){
            resultPara.innerHTML = `Player ${player.getNumber()} (<span>${player.getName()}</span>) win!`;
            congratsPara.textContent = "Congratulations!";
        } else {
            resultPara.innerHTML = `<span>${player.getName()}</span> win!`;
        }
        resultDiv.style.display = "flex";
        gameSpots.forEach(gameSpot => {gameSpot.removeEventListener("click", startGame)})
        
    }

    function drawGame(){
        resultPara.textContent = `It's a draw!`;
        congratsPara.textContent = "";
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

        if(player2.getNumber() === 3){
            if( gameBoard.playRecorder[gameBoard.playRecorder.length-1] === player2.getMark() ||
            gameBoard.playRecorder[gameBoard.playRecorder.length-1] === undefined){
                if(!(markBoard(player1))) markBoard(player2);
            }
        } else {
            if( gameBoard.playRecorder[gameBoard.playRecorder.length-1] === player2.getMark() ||
            gameBoard.playRecorder[gameBoard.playRecorder.length-1] === undefined){ 
                markBoard(player1);
            } else {
                markBoard(player2);
            }
        }
        

    }

    /* EXECUTING */

    cpuOptionYes.addEventListener("click", function(){
        divPlayer2.style.display = "none";
    });

    cpuOptionNo.addEventListener("click", function(){
        divPlayer2.style.display = "block";
    })

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