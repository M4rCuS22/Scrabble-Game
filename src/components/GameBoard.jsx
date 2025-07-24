import React from 'react';
import { useGameContext } from '../context/GameContext';
import { specialSquares } from '../context/GameContext';
import '../styles/GameBoard.css';

const GameBoard = () => {
  const { state, placeTile } = useGameContext();

  // Handle drag over event
  const handleDragOver = (e) => {
    // Prevent default to allow drop
    e.preventDefault();
    // Add a visual indicator for drop target
    e.target.classList.add('drag-over');
  };
  
  // Handle drag leave event
  const handleDragLeave = (e) => {
    // Remove the visual indicator
    e.target.classList.remove('drag-over');
  };
  
  // Handle drop event
  const handleDrop = (e, row, col) => {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const key = `${row},${col}`;
    // Check if the square already has a tile
    if (state.boardTiles[key]) return;
    
    // Get the tile data from the drag event
    const tileIndex = parseInt(e.dataTransfer.getData('tileIndex'));
    const letter = e.dataTransfer.getData('tileLetter');
    const points = parseInt(e.dataTransfer.getData('tilePoints'));
    
    if (!letter) return; // Ensure we have valid data
    
    // Update the board state with the new tile
    placeTile(key, { letter, points }, tileIndex);
    
    // Add visual feedback
    e.target.classList.add('tile-placed');
    setTimeout(() => {
      e.target.classList.remove('tile-placed');
    }, 300);
  };
  
  // Create the 15x15 board
  const renderBoard = () => {
    const board = [];
    
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const key = `${row},${col}`;
        const special = specialSquares[key] || { type: 'regular', label: '' };
        const tile = state.boardTiles[key];
        
        board.push(
          <div 
            key={key} 
            className={`board-square ${special.type} ${tile ? 'has-tile' : ''}`}
            data-row={row}
            data-col={col}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, row, col)}
          >
            {tile ? (
              <div className={`board-tile ${tile.isBlank ? 'blank-tile' : ''}`}>
                <span className="board-tile-letter">{tile.letter}</span>
                <span className="board-tile-points">{tile.points}</span>
                {tile.isBlank && <span className="blank-indicator">Blank</span>}
              </div>
            ) : special.label}
          </div>
        );
      }
    }
    
    return board;
  };

  return (
    <div className="game-board-container">
      <div className="game-board">
        {renderBoard()}
      </div>
    </div>
  );
};

export default GameBoard;