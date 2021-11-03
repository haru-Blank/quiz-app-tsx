import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  margin-bottom: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  p {
    font-size: 1rem;
  }
`;

type AnswerProps = {
  correct: boolean;
};

export const Answer = styled.p<AnswerProps>`
  padding: 1rem;
  background: ${(props) => (props.correct ? 'green' : 'red')};
`;
