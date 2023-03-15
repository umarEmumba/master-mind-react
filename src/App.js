import { createContext } from 'react';
import './App.css';
import Container from './components/common/Container';
import Game from './components/Game';
import GameRules from './components/GameRules';
import Header from './components/Header';
import { masterColors } from './utils';



function App() {
  const MasterColorsContext = createContext();
  return (
    
    <Container>
      <Header />
      <GameRules />
      <MasterColorsContext.Provider value={masterColors} >
        <Game />
      </MasterColorsContext.Provider>
    </Container>

  );
}

export default App;
