const timeEl = document.getElementById("time");
const startButton = document.getElementById('start-btn')
const optionsEl = document.getElementById('options')
const submitBtn = document.getElementById('submit')
const optA= document.getElementById("optA");
const optB = document.getElementById("optB");
const optC = document.getElementById("optC");

const questionContainer = document.getElementById('questions-container')
const questionElement = document.getElementById('question')

const StartpgEL = document.getElementById('startpg')
const endQuizEl = document.getElementById('endpg')
const scoreEl = document.getElementById('score')
const displayEl = document.getElementById('display')
const displayEl2 = document.getElementById('display2')

const NicknameEL = document.getElementById('nickname')
const scoresEl = document.getElementById('high-scores')
const newScore = document.getElementById('newScores')
const viewScoreList = document.getElementById('highscore')
const containerEl = document.getElementById('container')
const clear = document.getElementById("clear")



const questions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    options: [ "<javascript>", "<js>", "<script>"],
    correctAnswer: "<script"

}, {
    question: "Which of these tags would display the largest text?",
    options: [ "<p>",  "<h4>", "<h2>"], 
    correctAnswer: "<h2>"
    
}, {
    question: "What is the difference between HTML and CSS?",
    options: ["HTML gives a webpage structure. CSS provides styling.",  "here is no difference.",  "CSS is one type of HTML"],
    correctAnswer: "HTML gives a webpage structure. CSS provides styling." 
    
}, {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language",  "Home Tool Markup Language",  "Hyper Text Markup Language"], 
    correctAnswer: "Hyper Text Markup Language"

}, {
    question: "What does DOM stand for?",
    options: ["Do Over Mulligan", "Document Object Model", "Data Object Model",  "Document Option Model"], 
    correctAnswer: "Document Object Model"
}];




let questionCounter = 0;
let timeLeft = questions.length * 15;     
                                              



function countDown() {
                            
        if(timeLeft > 0){
            timeEl.textContent = "time:  " + timeLeft;
            timeLeft--
        }
        else {
            timeEl.textContent = "time:  " + timeLeft; 
            endQuiz();
        }
    }


var createQuestionElement = function(index) {

    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;

    optA.textContent = currentQuestion.options[0]
    optB.textContent = currentQuestion.options[1]
    optC.textContent = currentQuestion.options[2]

}

var checkAnswer = function(event) {
    var correctAnswer = questions[questionCounter].correctAnswer
    var currentAnswer = event.target.textContent   
    displayEl.classList.remove('hide') 
    displayEl2.classList.remove('hide')
    
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "Great Job!"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "Wrong answer!"
        timeLeft -= 15;
    }
    
    questionCounter++;
    if(questionCounter === questions.length){
        endQuiz();
    } else {
    createQuestionElement();
}
}

var startGame = function(){
    timeInterval = setInterval(countDown, 1000);
    startButton.classList.add('hide')
    StartpgEL.classList.add('hide')
    questionContainer.classList.remove('hide')

    countDown();
    createQuestionElement();
    }

var endQuiz = function(){
    clearInterval(timeInterval);
    questionContainer.classList.add('hide')
       endQuizEl.classList.remove('hide')
       scoreEl.textContent = "Your final score is " + timeLeft;
       timeEl.classList.add('hide')
   
       setTimeout(function() {
           displayEl.setAttribute("class", "hide");
       }, 1000);
       setTimeout(function() {
           displayEl2.setAttribute("class", "hide");
       }, 1000);
       highScore();
  }


  function highScore(){
    submitBtn.addEventListener("click", function(event) {
        
    
    var id = NicknameEL.value
    var score = timeLeft;
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    if(id.length > 0) {
        var newScore = {
            id,
            score
        }
        console.log(id)
        scoresEl.classList.remove('hide');
        endQuizEl.classList.add('hide');
        containerEl.classList.add('hide')
        viewScoreList.classList.add('hide')
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
           
        if(highscores !== undefined) {
            highscores.sort(function(a,b){
                return b.score - a.score
            })
            highscores.forEach(function(score){
                console.log(score)
                var li = document.createElement("li");
                li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
                var listEl = document.getElementById('newScores');
                listEl.appendChild(li)
            })
        }
    }
   
    
    
    
    
    
    console.log(highscores);
    
 })
  }

  function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

function viewHighScores(){
    startButton.classList.add('hide')
    StartpgEL.classList.add('hide')
    questionContainer.classList.add('hide')
    displayEl.classList.add('hide') 
    displayEl2.classList.add('hide')
    timeEl.classList.add('hide')
   
    scoresEl.classList.remove('hide')
    containerEl.classList.add('hide')
    viewScoreList.classList.add('hide')

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
   


highscores.sort(function(a,b){
    return b.score - a.score
})

highscores.forEach(function(score){
    var li = document.createElement("li");
    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
    var listEl = document.getElementById('newScores');
    listEl.appendChild(li)
})

console.log(highscores);

    
}


clear.onclick = clearHighscores;
startButton.addEventListener('click', startGame)
optA.addEventListener("click", checkAnswer)
optB.addEventListener("click", checkAnswer)
optC.addEventListener("click", checkAnswer)
viewScoreList.addEventListener("click", viewHighScores)