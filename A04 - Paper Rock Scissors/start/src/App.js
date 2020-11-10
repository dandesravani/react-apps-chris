import React from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choices = [
  { id: 1, name: 'rock', component: Rock, loosesTo: 2 },
  { id: 2, name: 'paper', component: Paper, loosesTo: 3 },
  { id: 3, name: 'scisscors', component: Scissors, loosesTo: 1 },
];

export default function App() {
  const [userChoice, setUserChoice] = React.useState(null);
  const [computerChoice, setComputerChoice] = React.useState(null);
  const [wins, setWins] = React.useState(0);
  const [losses, setLooses] = React.useState(0);
  const [gameState, setGameState] = React.useState(null);

  const handleUserChoice = (choice) => {
    const choosen = choices.find((c) => c.id === choice);
    setUserChoice(choosen);

    if (
      (choosen.name === 'rock' && computerChoice.name === 'scisscors') ||
      (choosen.name === 'scisscors' && computerChoice.name === 'paper') ||
      (choosen.name === 'paper' && computerChoice.name === 'rock')
    ) {
      setGameState('you win');
      setWins((wins) => wins + 1);
    } else if (choosen.id === computerChoice.id) {
      setGameState('draw');
    } else {
      setGameState('you lose');
      setLooses((looses) => looses + 1);
    }
  };

  React.useEffect(() => {
    const computerChoosen = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoosen);
  }, []);

  function renderComponent(choice) {
    const SelectedComponent = choice.component;
    return <SelectedComponent />;
  }
  function resetGame() {
    setUserChoice(null);
    setGameState(null);
    const computerChoosen = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoosen);
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Lose' : 'looses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div className={`game-state ${gameState}`}>
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>{gameState}</p>
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => resetGame()}>Play Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>you</div>
        <div />
        <div>computer</div>

        {/* buttons for my choice */}
        <div>
          <button className="rock" onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
