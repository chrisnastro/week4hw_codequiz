var highScore = document.querySelector("#highscore");
var clearScores = document.querySelector("#refresh");
var back = document.querySelector("#back");

clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var scoreList = document.createElement("list");
        scoreList.textContent = scores[i].initials + " " + scores[i].score;
        highScore.appendChild(scoreList);
    }
}

back.addEventListener("click", function () {
    window.location.replace("./index.html");
});