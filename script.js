var play = confirm("Do you want to play 'POP-Quiz?");
if (play) {
    alert("ok time to get started");
  }
  else {
    alert("You get to play anyway");
  }

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// questions
var questions = [
    new Question("What is the secret identity of Spider-man?", ["Bruce Wayne", "James Howlett","Peter Parker", "Clark Kent"], "Peter Parker"),
    new Question("Who is Beyonce married to?", ["Drake", "Will Smith", "Jay-Z", "Vanilla Ice"], "Jay-Z"),
    new Question("What is Luke Skywalkers Father's first name?", ["Anakin", "George","Chancelor", "Obi-Wan"], "Anakin"),
    new Question("Who is Naruto's Son?", ["Flash", "Boruto", "jr", "Trunks"], "Boruto"),
    new Question("Deadpool is based on what character", ["Donald Duck", "Deathstroke", "Batman"], "Deathstroke"),
    new Question("Who is the main protagonist in the legend of Zelda Series", ["Mario", "Ryu", "Link","Zelda"], "Link"),
    
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate()