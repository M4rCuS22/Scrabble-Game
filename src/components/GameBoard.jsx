import React, { useState, useEffect } from 'react';
import '../styles/GameBoard.css';
import WordValidator from './WordValidator';

const GameBoard = ({ onScoreUpdate, onTilePlaced }) => {
  // State to track placed tiles on the board
  const [boardTiles, setBoardTiles] = useState({});
  // State to track newly placed tiles (for validation)
  const [newlyPlacedTiles, setNewlyPlacedTiles] = useState([]);
  // State to track if tiles are being placed in a valid direction
  const [placementDirection, setPlacementDirection] = useState(null); // 'horizontal', 'vertical', or null
  // Define special squares on the board
  const specialSquares = {
    // Triple Word Score
    '0,0': { type: 'tw', label: 'TW' },
    '0,7': { type: 'tw', label: 'TW' },
    '0,14': { type: 'tw', label: 'TW' },
    '7,0': { type: 'tw', label: 'TW' },
    '7,14': { type: 'tw', label: 'TW' },
    '14,0': { type: 'tw', label: 'TW' },
    '14,7': { type: 'tw', label: 'TW' },
    '14,14': { type: 'tw', label: 'TW' },
    
    // Double Word Score
    '1,1': { type: 'dw', label: 'DW' },
    '2,2': { type: 'dw', label: 'DW' },
    '3,3': { type: 'dw', label: 'DW' },
    '4,4': { type: 'dw', label: 'DW' },
    '10,10': { type: 'dw', label: 'DW' },
    '11,11': { type: 'dw', label: 'DW' },
    '12,12': { type: 'dw', label: 'DW' },
    '13,13': { type: 'dw', label: 'DW' },
    '1,13': { type: 'dw', label: 'DW' },
    '2,12': { type: 'dw', label: 'DW' },
    '3,11': { type: 'dw', label: 'DW' },
    '4,10': { type: 'dw', label: 'DW' },
    '10,4': { type: 'dw', label: 'DW' },
    '11,3': { type: 'dw', label: 'DW' },
    '12,2': { type: 'dw', label: 'DW' },
    '13,1': { type: 'dw', label: 'DW' },
    
    // Triple Letter Score
    '1,5': { type: 'tl', label: 'TL' },
    '1,9': { type: 'tl', label: 'TL' },
    '5,1': { type: 'tl', label: 'TL' },
    '5,5': { type: 'tl', label: 'TL' },
    '5,9': { type: 'tl', label: 'TL' },
    '5,13': { type: 'tl', label: 'TL' },
    '9,1': { type: 'tl', label: 'TL' },
    '9,5': { type: 'tl', label: 'TL' },
    '9,9': { type: 'tl', label: 'TL' },
    '9,13': { type: 'tl', label: 'TL' },
    '13,5': { type: 'tl', label: 'TL' },
    '13,9': { type: 'tl', label: 'TL' },
    
    // Double Letter Score
    '0,3': { type: 'dl', label: 'DL' },
    '0,11': { type: 'dl', label: 'DL' },
    '2,6': { type: 'dl', label: 'DL' },
    '2,8': { type: 'dl', label: 'DL' },
    '3,0': { type: 'dl', label: 'DL' },
    '3,7': { type: 'dl', label: 'DL' },
    '3,14': { type: 'dl', label: 'DL' },
    '6,2': { type: 'dl', label: 'DL' },
    '6,6': { type: 'dl', label: 'DL' },
    '6,8': { type: 'dl', label: 'DL' },
    '6,12': { type: 'dl', label: 'DL' },
    '7,3': { type: 'dl', label: 'DL' },
    '7,11': { type: 'dl', label: 'DL' },
    '8,2': { type: 'dl', label: 'DL' },
    '8,6': { type: 'dl', label: 'DL' },
    '8,8': { type: 'dl', label: 'DL' },
    '8,12': { type: 'dl', label: 'DL' },
    '11,0': { type: 'dl', label: 'DL' },
    '11,7': { type: 'dl', label: 'DL' },
    '11,14': { type: 'dl', label: 'DL' },
    '12,6': { type: 'dl', label: 'DL' },
    '12,8': { type: 'dl', label: 'DL' },
    '14,3': { type: 'dl', label: 'DL' },
    '14,11': { type: 'dl', label: 'DL' },
    
    // Center square (star)
    '7,7': { type: 'star', label: '★' }
  };

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
    
    // Get the tile data from the drag event
    const tileIndex = e.dataTransfer.getData('tileIndex');
    const letter = e.dataTransfer.getData('tileLetter');
    const points = e.dataTransfer.getData('tilePoints');
    
    if (!letter) return; // Ensure we have valid data
    
    // Check if placement is valid (in a line with existing tiles or first move)
    const key = `${row},${col}`;
    const isValidPlacement = validateTilePlacement(row, col);
    
    if (!isValidPlacement) {
      alert('Tiles must be placed in a straight line, adjacent to existing tiles.');
      return;
    }
    
    // Update the board state with the new tile
    setBoardTiles(prev => ({
      ...prev,
      [key]: { letter, points }
    }));
    
    // Add to newly placed tiles for validation
    setNewlyPlacedTiles(prev => [
      ...prev,
      { row, col, letter, points }
    ]);
    
    // Notify parent component that a tile was placed
    if (onTilePlaced) {
      onTilePlaced(parseInt(tileIndex));
    }
  };
  
  // Create the 15x15 board
  const renderBoard = () => {
    const board = [];
    
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const key = `${row},${col}`;
        const special = specialSquares[key] || { type: 'regular', label: '' };
        const tile = boardTiles[key];
        
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
              <div className="board-tile">
                <span className="board-tile-letter">{tile.letter}</span>
                <span className="board-tile-points">{tile.points}</span>
              </div>
            ) : special.label}
          </div>
        );
      }
    }
    
    return board;
  };

  // Validate that tiles are placed in a valid direction (horizontal or vertical line)
  const validateTilePlacement = (row, col) => {
    // If this is the first tile placed on the board or the first tile in this turn
    if (Object.keys(boardTiles).length === 0 || newlyPlacedTiles.length === 0) {
      return true;
    }
    
    // Check if the new tile is adjacent to any existing tile
    const adjacentPositions = [
      `${row-1},${col}`, // above
      `${row+1},${col}`, // below
      `${row},${col-1}`, // left
      `${row},${col+1}`  // right
    ];
    
    const isAdjacentToExisting = adjacentPositions.some(pos => boardTiles[pos]);
    
    if (!isAdjacentToExisting) {
      return false;
    }
    
    // If this is the second tile placed in this turn, determine the direction
    if (newlyPlacedTiles.length === 1) {
      const firstTile = newlyPlacedTiles[0];
      
      if (row === firstTile.row) {
        setPlacementDirection('horizontal');
      } else if (col === firstTile.col) {
        setPlacementDirection('vertical');
      } else {
        return false; // Not in a straight line
      }
      
      return true;
    }
    
    // For subsequent tiles, ensure they follow the established direction
    if (placementDirection === 'horizontal') {
      return row === newlyPlacedTiles[0].row;
    } else if (placementDirection === 'vertical') {
      return col === newlyPlacedTiles[0].col;
    }
    
    return false;
  };
  
  // Handle validation completion
  const handleValidationComplete = (result) => {
    if (result.valid) {
      // Clear newly placed tiles since they're now validated
      setNewlyPlacedTiles([]);
      setPlacementDirection(null);
      
      // Update score in parent component
      if (onScoreUpdate) {
        onScoreUpdate(result.score);
      }
    } else {
      // If invalid, remove the newly placed tiles from the board
      const updatedBoardTiles = { ...boardTiles };
      
      newlyPlacedTiles.forEach(tile => {
        const key = `${tile.row},${tile.col}`;
        delete updatedBoardTiles[key];
      });
      
      setBoardTiles(updatedBoardTiles);
      setNewlyPlacedTiles([]);
      setPlacementDirection(null);
    }
  };
  
  // Reset the current turn
  const handleResetTurn = () => {
    // Remove newly placed tiles from the board
    const updatedBoardTiles = { ...boardTiles };
    
    newlyPlacedTiles.forEach(tile => {
      const key = `${tile.row},${tile.col}`;
      delete updatedBoardTiles[key];
    });
    
    setBoardTiles(updatedBoardTiles);
    setNewlyPlacedTiles([]);
    setPlacementDirection(null);
  };

  return (
    <div className="game-board-container">
      <h2>Scrabble Board</h2>
      <div className="game-board">
        {renderBoard()}
      </div>
      
      <div className="game-controls">
        <WordValidator 
          placedTiles={newlyPlacedTiles}
          boardState={boardTiles}
          specialSquares={specialSquares}
          onValidationComplete={handleValidationComplete}
        />
        
        {newlyPlacedTiles.length > 0 && (
          <button className="reset-turn-btn" onClick={handleResetTurn}>
            Reset Turn
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;