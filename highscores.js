var highScore = document.querySelector("#highScore");
var clearScores = document.querySelector("#clear");
var back = document.querySelector("#back");

clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var scores = localStorage.getItem("allScores");
scores = JSON.parse(scores);

if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var scoreList = document.createElement("li");
        scoreList.textContent = scores[i].initials + " " + scores[i].score;
        highScore.appendChild(scoreList);
    }
}

back.addEventListener("click", function () {
    window.location.replace("./index.html");
});