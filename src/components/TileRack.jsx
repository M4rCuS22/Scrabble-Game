import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import tileDistribution from '../data/tileDistibution';
import '../styles/TileRack.css';

const TileTrack = () => {
  const { state } = useGameContext();
  const [showDetails, setShowDetails] = useState(false);
  
  // Count remaining tiles by letter
  const remainingTileCount = {};
  tileDistribution.forEach(tile => {
    remainingTileCount[tile.letter] = tile.count;
  });
  
  // Subtract tiles that are on the board or in player racks
  Object.values(state.boardTiles).forEach(tile => {
    if (remainingTileCount[tile.letter]) {
      remainingTileCount[tile.letter]--;
    }
  });
  
  state.playerRacks.forEach(rack => {
    rack.forEach(tile => {
      if (remainingTileCount[tile.letter]) {
        remainingTileCount[tile.letter]--;
      }
    });
  });
  
  // Count total remaining tiles
  const totalRemaining = Object.values(remainingTileCount).reduce((sum, count) => sum + count, 0);
  
  return (
    <div className="tile-track-container">
      <div className="tile-track-header" onClick={() => setShowDetails(!showDetails)}>
        <h3>Remaining Tiles: {totalRemaining}</h3>
        <span className="toggle-icon">{showDetails ? '▲' : '▼'}</span>
      </div>
      
      {showDetails && (
        <div className="tile-track-details">
          <div className="tile-grid">
            {tileDistribution.map((tile, idx) => (
              <div 
                className={`mini-tile ${remainingTileCount[tile.letter] === 0 ? 'depleted' : ''}`} 
                key={idx}
              >
                <span className="mini-letter">{tile.letter}</span>
                <span className="mini-count">{remainingTileCount[tile.letter]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TileTrack;