console.log("I'm in app.js");
// document.addEventListener('DOMContentLoaded', () => {
//     const nameDiv = document.getElementById("name");
//     const ageDiv = document.getElementById("age");
//     const idDiv = document.getElementById("id");
//     const fciDiv = document.getElementById("fci");
//     const name = nameDiv.getAttribute('data-value');
//     const age = ageDiv.getAttribute('data-value');
//     const id = idDiv.getAttribute('data-value');
//     const fci = fciDiv.getAttribute('data-value');
//     console.log(name, age, id, fci);
// });
const nameDiv = document.getElementById("name");
const name = nameDiv.getAttribute('data-value');
console.log(name);
const ageDiv = document.getElementById("age");
const age = ageDiv.getAttribute('data-value');
const randomNum = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
const makeRange = (age) => {
    if (age < 10) {
        return randomNum(10, 1);
    } else if (age < 20) {
        return randomNum(20, 1);
    } else {
        return randomNum(100, 1);
    }
};

let randomNumber = 0;
let score = 0;
let wins = 0;
let losses = 0;
let val1 = 0;
let val2 = 0;
let val3 = 0;

document.addEventListener('DOMContentLoaded', () => {
    setUpDivs();
    setUpGame();
    gameNumbers();
});

function setUpGame() {
    targetNum = 0;
    playerNum = 0;
    randomNumber = randomNum(20,1);
    targetNum = age * randomNumber;
    val1 = makeRange(age);
    val2 = makeRange(age);
    val3 = makeRange(age);
    scoreDiv.innerText = "Score: " + score;
    winsDiv.innerHTML = "<p>Wins: " + wins + "</p><div class='wins-losses-img-div wins-img-div'></div>";
    lossesDiv.innerHTML = "<p>Losses: " + losses + "</p><div class='wins-losses-img-div losses-img-div'></div>";
    playerNumber.innerText = "Player Number: " + playerNum;
    targetNumber.innerText = "Game Number: " + targetNum;
    target1.innerText = val1;
    target2.innerText = val2;
    target3.innerText = val3;
}

function gameNumbers() {
    target1.addEventListener('click', () => {
        play(val1);
    });
    target2.addEventListener('click', () => {
        play(val2);
    });
    target3.addEventListener('click', () => {
        play(val3);
    });
}

function play(val) {
    playerNum = playerNum + val;
    playerNumber.innerText = "Player Number: " + playerNum;
    match(playerNum, targetNum);
}

function match(playerNum, targetNum) {
    if (playerNum > targetNum) {
        lose();
    }
    if (playerNum === targetNum) {
        win();
    }
}

function lose() {
    losses++;
    lossesDiv.innerText = "Losses: " + losses;
    matchScores();
    setUpGame();
}

function win() {
    wins++;
    winsDiv.innerText = "Wins: " + wins;
    matchScores();
    setUpGame();
}

function matchScores() {
    console.log('matchedScores');
    if (losses === 3) {
        score--;
        wins = 0;
        losses = 0;
        scoreDiv.innerText = "Score: " + score;
        winsDiv.innerText = "Wins: " + wins;
        lossesDiv.innerText = "Losses: " + losses;
    } else if (wins === 3) {
        score++;
        wins = 0;
        losses = 0;
        scoreDiv.innerText = "Score: " + score;
        winsDiv.innerText = "Wins: " + wins;
        lossesDiv.innerText = "Losses: " + losses;
    }
}

function setUpDivs(){
    const scoreWrapper = document.createElement("div");
    scoreWrapper.setAttribute("id", "scoreWrapper");
    scoreWrapper.setAttribute("class", "score-wrapper");
    const scoreDiv = document.createElement("div");
    scoreDiv.setAttribute("id", "scoreDiv");
    scoreDiv.setAttribute("class", "score-div");
    scoreWrapper.appendChild(scoreDiv);

    const winsDiv = document.createElement("div");
    winsDiv.setAttribute("id", "winsDiv");
    winsDiv.setAttribute("class", "wins-and-losses-div wins-div");
    scoreWrapper.appendChild(winsDiv);

    const lossesDiv = document.createElement("div");
    lossesDiv.setAttribute("id", "lossesDiv");
    lossesDiv.setAttribute("class", "wins-and-losses-div losses-div");
    scoreWrapper.appendChild(lossesDiv);

    const targetWrapper = document.createElement("div");
    targetWrapper.setAttribute("id", "targetWrapper");
    targetWrapper.setAttribute("class", "target-wrapper");
    const targetNumber = document.createElement("div");
    targetNumber.setAttribute("id", "targetNumber");
    targetNumber.setAttribute("class", "target-number");
    targetWrapper.appendChild(targetNumber);
    const playerNumber = document.createElement("div");
    playerNumber.setAttribute("id", "playerNumber");
    playerNumber.setAttribute("class", "player-number");
    targetWrapper.appendChild(playerNumber);
    
    const numberWrapper = document.createElement("div");
    numberWrapper.setAttribute("id", "numberWrapper");
    numberWrapper.setAttribute("class", "number-wrapper");

    const target1 = document.createElement("button");
    target1.setAttribute("id", "target1");
    target1.setAttribute("class", "game-btn target1");
    numberWrapper.appendChild(target1);

    const target2 = document.createElement("button");
    target2.setAttribute("id", "target2");
    target2.setAttribute("class", "game-btn target2");
    numberWrapper.appendChild(target2);
    
    const target3 = document.createElement("button");
    target3.setAttribute("id", "target3");
    target3.setAttribute("class", "game-btn target3");
    numberWrapper.appendChild(target3);
    
    const gameDiv = document.getElementById("gameDiv");
    gameDiv.appendChild(scoreWrapper);
    gameDiv.appendChild(targetWrapper);
    gameDiv.appendChild(numberWrapper);
    
}