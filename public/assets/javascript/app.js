const idDiv = document.getElementById("id");
const id = idDiv.getAttribute("data-value");
const playerIdDiv = document.getElementById("player_id");
const playerId = playerIdDiv.getAttribute('data-value');
const scoreDBDiv = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const timesPlayedDiv = document.getElementById("times_played");
const timesPlayed = timesPlayedDiv.getAttribute('data-value');
console.log("timesPlayed: " + timesPlayed);
const ageDiv = document.getElementById("age");
const age = ageDiv.getAttribute('data-value');
const winsTextP = document.getElementById("winsText");
const lossesTextP = document.getElementById("lossesText");
const target1 = document.getElementById("target1");
const target2 = document.getElementById("target2");
const target3 = document.getElementById("target3");
const playerNumber = document.getElementById("playerNumber");
const targetNumber = document.getElementById("targetNumber");
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

let score = scoreDBDiv.getAttribute('data-value');
let randomNumber = 0;
let wins = 0;
let losses = 0;
let val1 = 0;
let val2 = 0;
let val3 = 0;

document.addEventListener('DOMContentLoaded', () => {
    setUpGame();
    gameNumbers();
});

resetBtn.addEventListener('click', () => {
    score = 0;
    updateScore(score);
});

function setUpGame() {
    targetNum = 0;
    playerNum = 0;
    randomNumber = randomNum(20, 1);
    targetNum = age * randomNumber;
    val1 = makeRange(age);
    val2 = makeRange(age);
    val3 = makeRange(age);
    winsTextP.innerText = "Wins: " + wins;
    lossesTextP.innerText = "Losses: " + losses;
    scoreDBDiv.innerText = "Score: " + score;
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
    if (playerNum >= targetNum + 1) {
        lose();
    }
    if (playerNum === targetNum) {
        win();
    }
}

function lose() {
    losses++;
    lossesTextP.innerText = "Losses: " + losses;
    matchScores();
    setUpGame();
}

function win() {
    wins++;
    winsTextP.innerText = "Wins: " + wins;
    matchScores();
    setUpGame();
}

function matchScores() {
    if (losses === 3) {
        score--;
        updateScore(score);
        wins = 0;
        losses = 0;
        winsTextP.innerText = "Wins: " + wins;
        lossesTextP.innerText = "Losses: " + losses;
    } else if (wins === 3) {
        score++;
        updateScore(score);
        wins = 0;
        losses = 0;
        winsTextP.innerText = "Wins: " + wins;
        lossesTextP.innerText = "Losses: " + losses;
    }
}

function updateScore(score) {
    let newScore = score;
    return axios.post('/restOfSite/game/updateScore/' + playerId, {
        score: newScore
    })
    .then((data) => {
        if (data.status === 200){
            return scoreDBDiv.innerText = "Score: " + score;
        } else {
            console.log("there has been a problem");
        }
    })
    .catch((err) => console.log(err));
}



