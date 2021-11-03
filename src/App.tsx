import React, { useState } from 'react';

// ! components
import QuestionCard from './Components/QuestionCard';
import UserAnswer from './Components/UserAnswer';

//!  types
import { QuestionsState, Difficulty, fetchQuizQuestions } from './API';

// ! Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 2;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [result, setResult] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setResult(false);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // - User's answer
      const answer = e.currentTarget.value;

      // - check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      // - Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);

      // - save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <h1>React Quiz</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="show-result" onClick={() => setResult(true)}>
            Show result
          </button>
        ) : null}

        {!gameOver ? (
          <p className="score">
            Score {score} / {questions.length}
          </p>
        ) : null}

        {loading && <p>Loading Questions ...</p>}

        {!result && !loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {result &&
          userAnswers.map((userAnswer) => <UserAnswer {...userAnswer} />)}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
