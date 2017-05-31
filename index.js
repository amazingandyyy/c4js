var Plate = {};
var Row = 6;
var Col = 7;
var Player1 = "O"
var Player2 = "X" ;
var emptySymbl = '*'
var botInterval;
var AvailableNodeOptionList = [];
var totalStep;
start();

function initPlate() {
    totalStep = 0;
    for (i = 1; i <= Row; i++) {
        Plate[i] = {};
        for (j = 1; j <= Col; j++) {
            Plate[i][j] = emptySymbl;
        }
    }
    for (j = 1; j <= Col; j++) {
        AvailableNodeOptionList.push([Row, j]); // [[6,1], [6,2], [6,3]...[6,7]]
    }
    printPlate();
}

function start() {
    initPlate();
    play();
}

function play(){
    var playerCounter = true;
    botInterval = setInterval(function(){
        if(totalStep >= Row*Col) return gameFinished(); // draw happens, finish the game.
        if(playerCounter){
            addNode(Player1, randomLocation());
        }else{
            addNode(Player2, randomLocation());
        }
        playerCounter = !playerCounter;
    }, 100);
};

function randomLocation(){
    var random = getRandom();
    var result = [AvailableNodeOptionList[random][0], AvailableNodeOptionList[random][1]];
    AvailableNodeOptionList[random][0]--;
    if(result[0] <= 0) return randomLocation();
    return result;
}

function getRandom(){
    var length = AvailableNodeOptionList.length;
    var result = Math.floor(Math.random() * length);
    return result;
}

function printPlate(){
    console.log("      -    ")
    console.log(`======${emptySymbl}======`)
    var row;
    for (i = 1; i <= Row; i++) {
        row = [];
        for (j = 1; j <= Col; j++) {
            row.push(Plate[i][j]);
        }
        console.log(row.join(' '));
    }
    console.log("-------------");
}

function addNode(symbol, location){
    console.log("determinWinner", determinWinner(Plate))
    if(determinWinner(Plate) == emptySymbl){
        row = location[0];
        col = location[1];
        totalStep++;
        Plate[row][col] = symbol;
        return printPlate();
    }
    return gameFinished(determinWinner(Plate));
}

function gameFinished(winner){
    if (winner == Player1 || winner == Player2) {
        console.log("Winner is: player", winner, "!!!!");
        console.log("Good job :)");
    }else{
        console.log("No Winner");
        console.log("Still cool :)");
    }
    return clearInterval(botInterval);
}

function checkLine(a,b,c,d) {
    return ((a != emptySymbl) && (a ==b) && (a == c) && (a == d));
}

function determinWinner(plate) {
    // reference: https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
    pl = plate;
    // Check up
    for (r = 1; r <= 3; r++)
        for (c = 1; c <= 7; c++)
            if (checkLine(pl[r][c], pl[r+1][c], pl[r+2][c], pl[r+3][c]))
                return pl[r][c];

    // Check right
    for (r = 1; r <= 6; r++)
        for (c = 1; c <= 4; c++)
            if (checkLine(pl[r][c], pl[r][c+1], pl[r][c+2], pl[r][c+3]))
                return pl[r][c];

    // // Check down-right
    for (r = 1; r <= 3; r++)
        for (c = 1; c <= 4; c++)
            if (checkLine(pl[r][c], pl[r+1][c+1], pl[r+2][c+2], pl[r+3][c+3]))
                return pl[r][c];

    // // Check down-left
    for (r = 4; r <= 6; r++)
        for (c = 1; c <= 4; c++)
            if (checkLine(pl[r][c], pl[r-1][c+1], pl[r-2][c+2], pl[r-3][c+3]))
                return pl[r][c];

    return emptySymbl;
}
