import React from 'react';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';
import PlayerRack from './components/PlayerRack';
import TileRack from './components/TileRack';
import './styles/App.css';

function App() {
  return (
    <GameProvider>
      <div className="scrabble-app">
        <header className="app-header">
          <h1 className="app-title">Scrabble Game</h1>
          <p> UI Components</p>
        </header>
        
        <div className="demo-container">
          <h2>Game Board Component</h2>
          <GameBoard />
          
          <h2>Player Rack Component</h2>
          <PlayerRack />
          
          <h2>Tile Rack Component</h2>
          <TileRack />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
