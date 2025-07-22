import { useState } from 'react'
import GameBoard from './components/GameBoard'
import PlayerRack from './components/PlayerRack'
import TileTrack from './components/TileRack'
import './styles/App.css'

function App() {
  // State to track the currently dragged tile
  const [draggedTile, setDraggedTile] = useState(null);
  
  // Handle tile being dragged from rack
  const handleTileDragged = (tile, index) => {
    setDraggedTile({ tile, rackIndex: index });
  };
  
  return (
    <div className="scrabble-app">
      <header className="app-header">
        <h1 className="app-title">Scrabble Game</h1>
      </header>
      
      <GameBoard />
      <PlayerRack onTileDragged={handleTileDragged} />
      <TileTrack />
    </div>
  )
}

export default App