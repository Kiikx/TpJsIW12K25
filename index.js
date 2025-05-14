import Question from './question.js';
let selectedAnswer = null;


let advancedPokemonQuestions = [
    new Question('Quel est le numéro national de Mewtwo dans le Pokédex ?', ['149', '150', '151', '152'], 2),
    new Question('Quel est le type secondaire de Dracaufeu dans sa forme Méga X ?', ['Dragon', 'Vol', 'Feu', 'Acier'], 1),
    new Question('Quelle capacité permet à Métamorph de copier les statistiques et attaques de son adversaire ?', ['Morphing', 'Imitation', 'Clone', 'Transfo'], 4),
    new Question('Quel Pokémon légendaire est connu pour avoir créé les continents ?', ['Kyogre', 'Groudon', 'Rayquaza', 'Dialga'], 2),
    new Question('Quel est le nom de l\'attaque signature de Lucario ?', ['Aurasphère', 'Close Combat', 'Poing Boost', 'Vitesse Extrême'], 1),
    new Question('Quel est le type unique de Spiritomb avant la génération 6 ?', ['Spectre', 'Ténèbres', 'Spectre/Ténèbres', 'Psy'], 3),
    new Question('Quel objet permet de faire évoluer Évoli en Noctali ?', ['Pierre Lune', 'Pierre Nuit', 'Pierre Ombre', 'Amour et Nuit'], 4),
    new Question('Quel est le Pokémon qui peut apprendre toutes les CT et CS ?', ['Mew', 'Arceus', 'Métamorph', 'Deoxys'], 1),
    new Question('Quel est le nom du champion de type Dragon dans la première génération ?', ['Peter', 'Lance', 'Drake', 'Cynthia'], 2),
    new Question('Quel est le taux de capture de base d\'un Pokémon légendaire comme Artikodin ?', ['3', '30', '45', '255'], 1)
];

let currentQuestionIndex = 0;
let score = 0;
let questionCount = advancedPokemonQuestions.length;

let userAnswers = [];

function displayQuestion(currentQuestion) {
    let questionText = document.getElementById('question');
    questionText.innerHTML = currentQuestion.questionText;

    let answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    currentQuestion.possibleAnswers.forEach((answer, index) => {
        let answerButton = document.createElement('button');
        answerButton.innerHTML = answer;
        answerButton.id = 'answerButton';
        answerButton.onclick = () => handleAnswerSelection(index + 1);
        answersContainer.appendChild(answerButton);
    });

    updateProgressBar();
}


function handleAnswerSelection(answerIndex) {
    selectedAnswer = answerIndex;

    let answerButtons = document.querySelectorAll('#answerButton');
    console.log(answerButtons);


    answerButtons.forEach(button => button.classList.remove('selected'));

    answerButtons[answerIndex - 1].classList.add('selected');
}

function handleNextQuestion() {

    if (selectedAnswer !== null) {
        userAnswers.push(selectedAnswer);
        if (advancedPokemonQuestions[currentQuestionIndex].isCorrectAnswer(selectedAnswer)) {
            score++;
        }

        currentQuestionIndex++;
        selectedAnswer = null;

        if (currentQuestionIndex < questionCount) {
            displayQuestion(advancedPokemonQuestions[currentQuestionIndex]);
        } else {
            displayScore();
        }

        if (currentQuestionIndex == questionCount - 1) {
            let nextButton = document.getElementById('next-button');
            nextButton.innerHTML = 'Valider le quiz';

        }
    } else {
        alert('Veuillez sélectionner une réponse avant de continuer.');
    }


}

function displayScore() {
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    let scoreText = document.createElement('p');
    scoreText.innerHTML = `Votre score est : ${score} / ${questionCount}`;
    quizContainer.appendChild(scoreText);

    let reportContainer = document.createElement('div');
    reportContainer.id = 'report-container';

    advancedPokemonQuestions.forEach((question, index) => {
        let questionReport = document.createElement('div');
        questionReport.classList.add('question-report');

        let questionText = document.createElement('p');
        questionText.innerHTML = `<strong>Question :</strong> ${question.questionText}`;
        questionReport.appendChild(questionText);

        let correctAnswer = document.createElement('p');
        correctAnswer.innerHTML = `<strong>Réponse correcte :</strong> ${question.possibleAnswers[question.correctAnswer - 1]}`;
        questionReport.appendChild(correctAnswer);

        let userAnswer = document.createElement('p');
        let userAnswerText = userAnswers[index] ? question.possibleAnswers[userAnswers[index] - 1] : 'Aucune réponse';
        userAnswer.innerHTML = `<strong>Votre réponse :</strong> ${userAnswerText}`;
        userAnswer.style.color = question.isCorrectAnswer(userAnswers[index]) ? 'green' : 'red';
        questionReport.appendChild(userAnswer);

        reportContainer.appendChild(questionReport);
    });

    quizContainer.appendChild(reportContainer);

    let restartButton = document.createElement('button');
    restartButton.innerHTML = 'Recommencer le quiz';
    restartButton.onclick = resetQuizz;
    quizContainer.appendChild(restartButton);
}

function resetQuizzDisplay() {
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizContainer.innerHTML = `
        <div id="progress-bar-container">
        <div id="progress-bar"></div>
        </div>
        <div id="question"></div>
        <div id="answers"></div>
        <button id="next-button" onclick="handleNextQuestion()">Suivant</button>

    `;
}

function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let progress = ((currentQuestionIndex) / questionCount) * 100;
    progressBar.style.width = `${progress}%`;
}

function resetQuizz() {
    score = 0;
    currentQuestionIndex = 0;
    resetQuizzDisplay();
    displayQuestion(advancedPokemonQuestions[currentQuestionIndex]);
}


function startQuizz() {

    let currentQuestionIndex = 0;

    resetQuizzDisplay();


    displayQuestion(advancedPokemonQuestions[currentQuestionIndex]);

}



window.startQuizz = startQuizz;
window.handleNextQuestion = handleNextQuestion;

