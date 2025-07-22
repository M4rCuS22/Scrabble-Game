import React, { useState, useEffect } from 'react';
import tileDistribution from '../data/tileDistibution';
import '../styles/PlayerRack.css';

const PlayerRack = ({ onTileDragged }) => {
  const [playerTiles, setPlayerTiles] = useState([]);
  
  // Function to draw random tiles from the distribution
  const drawRandomTiles = (count) => {
    // Create a pool of all available tiles based on their counts
    const tilePool = [];
    tileDistribution.forEach(tile => {
      for (let i = 0; i < tile.count; i++) {
        tilePool.push({ ...tile });
      }
    });
    
    // Shuffle the tile pool
    const shuffled = [...tilePool].sort(() => 0.5 - Math.random());
    
    // Take the first 'count' tiles
    return shuffled.slice(0, count);
  };
  
  // Initialize player's tiles on component mount
  useEffect(() => {
    setPlayerTiles(drawRandomTiles(7));
  }, []);
  
  // Handle drag start event
  const handleDragStart = (e, tile, index) => {
    // Set the data being dragged
    e.dataTransfer.setData('tileIndex', index);
    e.dataTransfer.setData('tileLetter', tile.letter);
    e.dataTransfer.setData('tilePoints', tile.points);
    
    // Add a class to style the tile being dragged
    e.target.classList.add('dragging');
    
    // If parent component provided a callback, call it
    if (onTileDragged) {
      onTileDragged(tile, index);
    }
  };
  
  // Handle drag end event
  const handleDragEnd = (e) => {
    // Remove the dragging class
    e.target.classList.remove('dragging');
  };
  
  // Remove a tile from the rack (will be used later when implementing drop)
  const removeTile = (index) => {
    setPlayerTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles.splice(index, 1);
      return newTiles;
    });
  };
  
  return (
    <div className="player-rack-container">
      <h3>Your Tiles</h3>
      <div className="player-rack">
        {playerTiles.map((tile, index) => (
          <div 
            className="player-tile" 
            key={index} 
            draggable="true"
            onDragStart={(e) => handleDragStart(e, tile, index)}
            onDragEnd={handleDragEnd}
          >
            <span className="tile-letter">{tile.letter}</span>
            <span className="tile-points">{tile.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRack;
