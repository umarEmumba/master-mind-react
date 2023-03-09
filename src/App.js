import './App.css';
import Container from './components/common/Container';
import Game from './components/Game';
import GameRules from './components/GameRules';
import Header from './components/Header';

function App() {
  return (
    <Container>
      <Header />
      <GameRules />
      <Game />
    </Container>
  );
}

export default App;
