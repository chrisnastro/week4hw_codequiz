var score = 0;
var questIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questDiv = document.querySelector("#questDiv");
var container = document.querySelector("#container");
var secondsLeft = 61;
var holdInterval = 0;
var ulCreate = document.createElement("ul");

var questions = [
    {
        title: "What is the correct syntax for referring to an external script called \"app.js\"?",
        choices: [ "<script href=\"app.js\">", "<script name=\"app.js\">", "<script src=\"app.js\">", "<script file=\"app.js\">"],
        answer: "<script src=\"app.js\">"
    },
    {
        title: "How do you write a conditional statement for executing some statements only if \"i\" is equal to 5?",
        choices: ["if i = 5", "if i == 5 then", "if (i == 5)", "if i = 5 then"],
        answer: "if (i == 5)"
    },
    {
        title: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function:myFunction()", "function myFunction()", "create myFunction()" ],
        answer: "function myFunction()"
    },
    {
        title: "What is the output of this code?",
        choices: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
        answer: "\"object\""
    },
    {
        title: "Which method is used to add an element at the end of an array?",
        choices: ["array.push(element)", "array.pop(element)", "array.unshift(element)", "array.shift(element)"],
        answer: "array.push(element)"
    }
]

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                quizEnd();
                currentTime.textContent = "You ran out of time!";
            }
        }, 1000);
    }
    render(questIndex);
});

function render(questIndex) {
    questDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var questText = questions[questIndex].title;
        var choicesText = questions[questIndex].choices;
        questDiv.textContent = questText;
    }
    choicesText.forEach(function (newQuest) {
        var listQuest = document.createElement("li");
        listQuest.textContent = newQuest;
        questDiv.appendChild(ulCreate);
        ulCreate.appendChild(listQuest);
        listQuest.addEventListener("click", (checkAns));
    })
}

function checkAns(event) {
    var answer = event.target;
    if (answer.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (answer.textContent === questions[questIndex].answer) {
            score++;
            createDiv.textContent = "You answered correctly!"
        } else {
            secondsLeft = secondsLeft - 10;
            createDiv.textContent = "Incorrect! The correct answer is: " + questions[questIndex].answer;
        }
    }
    questIndex++;

    if (questIndex >= questions.length) {
        quizEnd();
        createDiv.textContent = "All done! Your score was " + score + " out of " + questions.length + "!";
    } else {
        render(questIndex);
    } questDiv.appendChild(createDiv);
}

function quizEnd() {
    questDiv.innerHTML = "";
    currentTime = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";
    questDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeLeft;
        questDiv.appendChild(createP2);
    }

    var initialBox = document.createElement("label");
    initialBox.setAttribute("id", "initialBox");
    initialBox.textContent = "Enter your initials: ";
    questDiv.appendChild(initialBox);

    var initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("id", "initials");
    initialInput.textContent = "";
    questDiv.appendChild(initialInput);

    var initialsEntered = document.createElement("button");
    initialsEntered.setAttribute("type", "submit");
    initialsEntered.setAttribute("id", "Submit");
    initialsEntered.textContent = "Submit";
    questDiv.appendChild(initialsEntered);


    initialsEntered.addEventListener("click", function () {
        var initials = initialInput.value;
        if (initials === null) {
            alert("Please Enter Your Initials!")
        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscores.html")
        }
    });
}