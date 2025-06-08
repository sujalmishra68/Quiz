const questions = [
    {
        question: "What is the capital of France?",
        background: "bg-france",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        background: "bg-browser",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        background: "bg-css",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false }
        ]
    },
    {
        question: "What year was JavaScript launched?",
        background: "bg-js",
        answers: [
            { text: "1996", correct: false },
            { text: "1995", correct: true },
            { text: "1994", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        background: "bg-space",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        background: "bg-literature",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        background: "bg-chemistry",
        answers: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        background: "bg-japan",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.style.display = 'none';
    questionContainer.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    // Set background class for question container
    questionContainer.className = '';
    questionContainer.classList.add('question-container');
    if (question.background) {
        questionContainer.classList.add(question.background);
    }
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    // Remove any existing emoji
    Array.from(answerButtonsElement.children).forEach(btn => {
        const emojiSpan = btn.querySelector('.emoji');
        if (emojiSpan) {
            btn.removeChild(emojiSpan);
        }
    });
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
        // Add thumbs up emoji
        const emoji = document.createElement('span');
        emoji.classList.add('emoji');
        emoji.textContent = ' 👍';
        selectedButton.appendChild(emoji);
    } else {
        selectedButton.classList.add('wrong');
        // Add sad emoji
        const emoji = document.createElement('span');
        emoji.classList.add('emoji');
        emoji.textContent = ' 😞';
        selectedButton.appendChild(emoji);
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'inline-block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
});

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `${score} / ${questions.length}`;
    // Add celebration animation
    const celebration = document.createElement('div');
    celebration.classList.add('celebration');
    document.body.appendChild(celebration);

    // Add balloons
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        balloon.style.animationDuration = 4 + Math.random() * 3 + 's';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        celebration.appendChild(balloon);
    }

    // Add crackers
    for (let i = 0; i < 30; i++) {
        const cracker = document.createElement('div');
        cracker.classList.add('cracker');
        cracker.style.left = Math.random() * 100 + 'vw';
        cracker.style.top = Math.random() * 100 + 'vh';
        cracker.style.animationDelay = Math.random() * 2 + 's';
        celebration.appendChild(cracker);
    }
}

restartButton.addEventListener('click', startQuiz);

startQuiz();
