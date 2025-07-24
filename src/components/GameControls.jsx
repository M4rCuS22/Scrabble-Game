import React from 'react';
import { useGameContext } from '../context/GameContext';
import '../styles/GameControls.css';

const GameControls = () => {
  const { state, submitWord, resetGame, clearError, shuffleRack, recallTiles } = useGameContext();
  
  const handleSubmitWord = () => {
    submitWord();
  };
  
  const handlePassTurn = () => {
    // First recall any tiles on the board
    if (state.currentMove.length > 0) {
      recallTiles();
    }
    
    // Pass turn without validation or scoring
    submitWord(true);
  };
  
  const handleShuffleRack = () => {
    shuffleRack();
  };
  
  const handleRecallTiles = () => {
    recallTiles();
  };
  
  // Disable shuffle if player has tiles on the board (current move)
  const isShuffleDisabled = state.currentMove.length > 0;
  
  // Only enable recall if there are tiles on the board for the current move
  const isRecallEnabled = state.currentMove.length > 0;
  
  return (
    <div className="game-controls">
      {state.error && (
        <div className="error-message">
          {state.error}
          <button className="close-error" onClick={clearError}>&times;</button>
        </div>
      )}
      
      <div className="controls-row">
        <button 
          className="control-button submit-button"
          onClick={handleSubmitWord}
          disabled={state.currentMove.length === 0}
        >
          Submit Word
        </button>
        
        <button 
          className="control-button recall-button"
          onClick={handleRecallTiles}
          disabled={!isRecallEnabled}
        >
          Recall Tiles
        </button>
      </div>
      
      <div className="controls-row">
        <button 
          className="control-button shuffle-button"
          onClick={handleShuffleRack}
          disabled={isShuffleDisabled}
          title={isShuffleDisabled ? "Cannot shuffle while tiles are on the board" : "Shuffle your tiles"}
        >
          Shuffle Tiles
        </button>
        
        <button 
          className="control-button pass-button"
          onClick={handlePassTurn}
        >
          Pass Turn
        </button>
      </div>
      
      <div className="controls-row">
        <button 
          className="control-button reset-button"
          onClick={resetGame}
          title="Reset the entire game"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;