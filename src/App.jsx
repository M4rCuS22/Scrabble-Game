import { useState } from 'react'
import GameBoard from './components/GameBoard'
import PlayerRack from './components/PlayerRack'
import TileTrack from './components/TileRack'
import './styles/App.css'

function App() {
  // State to track the currently dragged tile
  const [draggedTile, setDraggedTile] = useState(null);
  // State to track player score
  const [playerScore, setPlayerScore] = useState(0);
  
  // Handle tile being dragged from rack
  const handleTileDragged = (tile, index) => {
    setDraggedTile({ tile, rackIndex: index });
  };
  
  // Handle score updates from the game board
  const handleScoreUpdate = (points) => {
    setPlayerScore(prevScore => prevScore + points);
  };
  
  return (
    <div className="scrabble-app">
      <header className="app-header">
        <h1 className="app-title">Scrabble Game</h1>
      </header>
      
      <div className="score-container">
        <h2>Score: {playerScore}</h2>
      </div>
      
      <GameBoard onScoreUpdate={handleScoreUpdate} />
      <PlayerRack onTileDragged={handleTileDragged} />
      <TileTrack />
    </div>
  )
}

export default App