/* DOM VARIABLES */
const gameSpots = document.querySelectorAll(".gameSpot");



const playerFactory = (number, mark) => {
    if (number === 1 || number === 2) {
        if (mark === "O" || mark === "X") return {number, mark};
        else return "Invalid Mark";
    }
    else return "Invalid Number";
};

const gameBoard = function(){
    const gameboardArray = ["X", "X", "X", "O", "O", "O", "X", "X", "X"];
    
    return {

    }
}();

const gameController = function(){

}();

gameSpots.forEach(gameSpot => {
    gameSpot.addEventListener("click", function(){
        alert("Clicked");
    })
})
