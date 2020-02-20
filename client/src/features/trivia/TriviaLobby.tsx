import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Button } from 'components';
import { hashCode } from 'utils/stringUtils';
import { useTriviaChannel } from 'features/trivia/TriviaChannel';

export const TriviaLobby = () => {
  const history = useHistory();
  const { state: triviaState, broadcast } = useTriviaChannel();

  const onClickStart = () => {
    broadcast('start', { gameID: triviaState.gameID });
  };

  useEffect(() => {
    if (triviaState.act) {
      if (triviaState.isHost) {
        history.push(`/trivia/${triviaState.gameID}/tv`);
      } else {
        history.push(`/trivia/${triviaState.gameID}/remote`);
      }
    }
  }, [triviaState.gameID, triviaState.act, triviaState.isHost]);

  return (
    <LobbyContainer>
      {triviaState.isHost ? (
        <>
          <div className="title-container">
            <h1 className="title">
              Go to <span className="highlight">playhouse.gg</span>
            </h1>
            <h1 className="title">and enter the room code:</h1>
          </div>
          <div className="game-id">{triviaState.gameID}</div>
        </>
      ) : (
        <h1 className="title">Waiting for players to join...</h1>
      )}
      <LobbyPlayersContainer isHost={triviaState.isHost}>
        {triviaState.players.map(p => {
          const avatar = hashCode(p.name, 10);
          return (
            <div className="player" key={p.id}>
              <p>{p.name}</p>
              <img src={`/avatars/${avatar}.svg`} alt={p.name} />
            </div>
          );
        })}
      </LobbyPlayersContainer>
      {!triviaState.isHost ? (
        <>
          <Button className="start-game-button" onClick={onClickStart}>
            Start game
          </Button>
        </>
      ) : (
        <Link className="join-button" to="/">
          Or join the room on this device
        </Link>
      )}
    </LobbyContainer>
  );
};

const LobbyContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;

  .title-container {
    text-align: center;
    margin-top: ${({ theme }) => theme.spacings(2)};
  }
  .title {
    margin: 0 0 ${({ theme }) => theme.spacings(2)};
  }
  .highlight {
    color: ${({ theme }) => theme.colors.purple};
  }
  .game-id {
    color: #fff;
    background: ${({ theme }) => theme.colors.black};
    font-size: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 30px 30px;
    line-height: 1;
    border-radius: 19px 22px 30% 16px / 19px 17px 14px 30px;
  }
  .start-game-button {
    margin: ${({ theme }) => theme.spacings(4)} auto;
  }
  .join-button {
    display: block;
    text-align: center;
    text-decoration: underline;
    margin-top: auto;
  }
`;

type LobbyPlayersContainerProps = {
  isHost: boolean;
};
const renderTvStyles = () => {
  return css`
    position: absolute;
    display: flex;
    justify-content: space-between;
    left: ${({ theme }) => theme.spacings(8)};
    right: ${({ theme }) => theme.spacings(8)};
    bottom: 10%;

    .player {
      text-align: center;
      img {
        width: 70%;
      }
    }
  `;
};
const renderRemoteStyles = () => {
  return css`
    margin-top: ${({ theme }) => theme.spacings(4)};
    .player {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      margin-bottom: ${({ theme }) => theme.spacings(2)};

      p {
        margin-right: auto;
      }

      img {
        height: 50px;
        margin-right: ${({ theme }) => theme.spacings(2)};
      }
    }
  `;
};
const LobbyPlayersContainer = styled.section<LobbyPlayersContainerProps>`
  ${({ isHost }) => (isHost ? renderTvStyles() : renderRemoteStyles())}
`;