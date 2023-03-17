import { createContext } from 'react';
import './App.css';
import Container from './components/common/Container';
import Game from './components/Game';
import GameRules from './components/GameRules';
import Header from './components/Header';
import ColorContextProvider from './contexts/SelectedColorContext';

function App() {
  return (
    <Container>
      <Header />
      <GameRules />
      <ColorContextProvider>
        <Game />
      </ColorContextProvider>
    </Container>
  );
}

export default App;
