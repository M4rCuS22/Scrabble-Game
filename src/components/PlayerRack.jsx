import React from 'react';
import { useGameContext } from '../context/GameContext';
import '../styles/PlayerRack.css';

const PlayerRack = () => {
  const { state } = useGameContext();
  const playerTiles = state.playerRacks[state.currentPlayer] || [];
  
  // Create an array of 7 slots (filled or empty)
  const rackSlots = Array(7).fill(null);
  
  // Fill the slots with available tiles
  playerTiles.forEach((tile, index) => {
    rackSlots[index] = tile;
  });
  
  // Handle drag start event
  const handleDragStart = (e, tile, index) => {
    if (!tile) return; // Can't drag an empty slot
    
    // Set the data being dragged
    e.dataTransfer.setData('tileIndex', index);
    e.dataTransfer.setData('tileLetter', tile.letter);
    e.dataTransfer.setData('tilePoints', tile.points);
    
    // Add a class to style the tile being dragged
    e.target.classList.add('dragging');
  };
  
  // Handle drag end event
  const handleDragEnd = (e) => {
    // Remove the dragging class
    e.target.classList.remove('dragging');
  };
  
  return (
    <div className="player-rack-container">
      <h3>Player {state.currentPlayer + 1}'s Tiles</h3>
      <div className="player-rack">
        {rackSlots.map((tile, index) => (
          <div 
            className={`player-tile-slot ${tile ? 'has-tile' : 'empty-slot'}`}
            key={index}
          >
            {tile && (
              <div
                className="player-tile"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, tile, index)}
                onDragEnd={handleDragEnd}
              >
                <span className="tile-letter">{tile.letter === 'Blank' ? '' : tile.letter}</span>
                <span className="tile-points">{tile.points}</span>
                {tile.letter === 'Blank' && <span className="blank-label">Blank</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRack;