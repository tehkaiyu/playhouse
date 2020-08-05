import React from "react";
import { Flex, Button } from "components";
import { StepProps } from "features/game/gameSlice";

export const Step4Remote = ({ state, broadcast, name }: StepProps) => {
  const [firstPlayer] = state.players;
  return (
    <div>
      <h2>Question: {state.act} / 10</h2>
      {state.players.map((player) => (
        <Flex key={player.name} justifyContent="space-between" mb={3}>
          <span>{player.name}</span>
          <span>{player.score}</span>
        </Flex>
      ))}
      {firstPlayer && (
        <Button
          disabled={firstPlayer.name !== name}
          onClick={() => broadcast("act:next")}
        >
          {firstPlayer.name === name
            ? "Next Question"
            : `Waiting for ${firstPlayer.name}`}
        </Button>
      )}
    </div>
  );
};

export const Step4TV = ({ state }: StepProps) => {
  return (
    <div>
      <h2>Question: {state.act} / 10</h2>
      {state.players.map((player) => (
        <Flex key={player.name} justifyContent="space-between" mb={3}>
          <span>{player.name}</span>
          <span>{player.score}</span>
        </Flex>
      ))}
    </div>
  );
};