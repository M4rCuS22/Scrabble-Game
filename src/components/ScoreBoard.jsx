import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/ScoreBoard.css';

const ScoreBoard = () => {
  const { state } = useGame();
  
  return (
    <div className="score-board">
      <h3>Score Board</h3>
      <div className="scores">
        {state?.scores?.map((score, index) => (
          <div 
            key={index} 
            className={`player-score ${index === state?.currentPlayer ? 'current-player' : ''}`}
          >
            <span className="player-name">Player {index + 1}</span>
            <span className="player-points">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;