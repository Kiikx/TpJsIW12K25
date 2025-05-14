class Question {
    constructor(questionText, possibleAnswers, correctAnswer) {
        this.questionText = questionText;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }

    isCorrectAnswer(answer) {
        return answer === this.correctAnswer;
    }
}

export default Question;