import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Button, Modal, SpriteAnimation } from "components";
import { scaleIn } from "styles/animations";
import { useAppSelector } from "app/hooks";
import { useGameChannel } from "features/game/GameProvider";
import { Player, PlayersGrid } from "features/game/components/PlayerGrid";

export const GameLobby = ({ isSpectate }: { isSpectate?: boolean }) => {
  const theme = useTheme();
  const history = useHistory();
  const gameState = useAppSelector((state) => state.game);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { broadcast } = useGameChannel();

  const onClickStart = () => {
    if (gameState.players.length < 2) {
      setIsModalOpen(true);
    } else {
      onStart();
    }
  };

  const onStart = () => {
    broadcast("start", { gameId: gameState.gameId });
  };

  useEffect(() => {
    if (gameState.scene) {
      history.push(`/game/${gameState.gameId}${isSpectate ? "/spectate" : ""}`);
    }
  }, [gameState.gameId, gameState.scene]);

  return (
    <LobbyContainer>
      <TitleContainer>
        <h1 className="title">
          <div>
            Invite friends to <span className="highlight">playhouse.gg</span>
          </div>
          <div>and enter room code:</div>
        </h1>
        <div className="game-id">{gameState.gameId}</div>
      </TitleContainer>
      <PlayersContainer>
        {gameState.players.map((p) => (
          <Player key={p.name} playerName={p.name}>
            <SpriteAnimation
              name="bubbleExplosion3"
              left={theme.media.isDesktop() ? -125 : -130}
              top={theme.media.isDesktop() ? 30 : -55}
            />
          </Player>
        ))}
      </PlayersContainer>
      {!isSpectate ? (
        <>
          <Button className="start-game-button" onClick={onClickStart}>
            Start game
          </Button>
          <Modal
            open={isModalOpen}
            title="Are you sure?"
            onRequestClose={() => setIsModalOpen(false)}
            maxWidth={300}
            closeButton
          >
            <StartModalBody>
              <TitleContainer>
                <p>This game is only fun with 2 or more players.</p>
                <p>
                  <span className="block">
                    Invite friends to{" "}
                    <span className="highlight">playhouse.gg</span>
                  </span>
                  <span className="block">and enter the room code:</span>
                </p>
                <div className="game-id">{gameState.gameId}</div>
              </TitleContainer>
              <Button className="start-game-button" onClick={onStart}>
                Start anyways
              </Button>
            </StartModalBody>
          </Modal>
        </>
      ) : (
        <Link className="join-button" to="/join">
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
  .start-game-button {
    margin: auto auto ${({ theme }) => theme.spacings(10)};
  }
  .join-button {
    display: block;
    text-align: center;
    text-decoration: underline;
    margin-top: auto;
  }
`;

const TitleContainer = styled.div`
  .title {
    margin: 0 0 ${({ theme }) => theme.spacings(5)};
  }
  .block {
    display: block;
  }
  .highlight {
    color: ${({ theme }) => theme.colors.purple};
  }
  .game-id {
    color: ${({ theme }) => theme.ui.alert.text};
    background: ${({ theme }) => theme.ui.alert.background};
    font-size: 5.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 30px 30px;
    line-height: 1;
    border-radius: 19px 22px 30% 16px / 19px 17px 14px 30px;
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }
`;

const PlayersContainer = styled(PlayersGrid)`
  .avatar {
    transform: scale(0);
    animation: ${scaleIn} 0.3s ease forwards 0.4s;
  }
`;

const StartModalBody = styled.div`
  p {
    margin: 0 0 ${({ theme }) => theme.spacings(3)};
  }
  .game-id {
    font-size: 2rem;
    padding: ${({ theme }) => theme.spacings(5)};
  }
  .start-game-button {
    width: 100%;
  }
`;
