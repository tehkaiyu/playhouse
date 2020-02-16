import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import { SceneProps } from 'games/trivia/TriviaContext';

export const Scene2 = ({ state, broadcast }: SceneProps) => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section>
      <h2>{state.question}</h2>
      {state.submissions.map(submission => {
        return (
          <EndorsementButtons
            key={submission.id}
            disabled={submitted}
            onClick={() => {
              broadcast('player:endorse', {
                name: localStorage.getItem('name'),
                gameID: state.gameID,
                submissionID: submission.id,
                isAnswer: submission.name === 'IS_ANSWER'
              });
              setSubmitted(true);
            }}
          >
            {submission.content}
          </EndorsementButtons>
        );
      })}
    </section>
  );
};

const EndorsementButtons = styled(Button)`
  text-transform: uppercase;
`;