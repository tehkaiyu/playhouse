import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PageContainer, Navigation } from 'components';

import { TriviaProvider } from 'games/trivia/TriviaContext';
import { TriviaIntro } from 'games/trivia/TriviaIntro';
import { TriviaLobby } from 'games/trivia/TriviaLobby';
import { TriviaTV } from 'games/trivia/TriviaTV';
import { TriviaRemote } from 'games/trivia/TriviaRemote';

export const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <PageContainer size="large" align="center">
            <TriviaIntro />
          </PageContainer>
        </Route>
        <Route path="/trivia">
          <TriviaProvider>
            <Route exact path="/trivia/lobby">
              <PageContainer size="full">
                <TriviaLobby />
              </PageContainer>
            </Route>
            <Route exact path="/trivia/tv">
              <PageContainer size="large" align="center">
                <TriviaTV />
              </PageContainer>
            </Route>
            <Route exact path="/trivia/remote">
              <PageContainer size="small">
                <TriviaRemote />
              </PageContainer>
            </Route>
          </TriviaProvider>
        </Route>
      </Switch>
    </>
  );
};