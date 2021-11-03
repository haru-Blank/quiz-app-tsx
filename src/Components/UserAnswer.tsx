import React from 'react';
import { Answer, Wrapper } from './UserAnswer.styles';

type Props = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const UserAnswer: React.FC<Props> = ({
  question,
  answer,
  correct,
  correctAnswer,
}) => {
  return (
    <Wrapper>
      <p className="user-question">{question}</p>
      <Answer correct={correct}>{answer}</Answer>
      {!correct && (
        <Answer correct={!correct}>Correct Answer {correctAnswer}</Answer>
      )}
    </Wrapper>
  );
};

export default UserAnswer;
