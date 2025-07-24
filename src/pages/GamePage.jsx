import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import PlayerRack from '../components/PlayerRack';
import TileTrack from '../components/TileRack';
import ScoreBoard from '../components/ScoreBoard';
import GameControls from '../components/GameControls';
import '../styles/GamePage.css';

const GamePage = () => {
  return (
    <div className="game-container">
      <div className="help-button-container">
        <Link to="/" className="help-button">
          <span className="help-icon">?</span>
          <span className="help-text">How to Play</span>
        </Link>
      </div>
      
      <div className="game-layout">
        <div className="left-panel">
          <GameBoard />
        </div>
        <div className="right-panel">
          <h2 className="panel-title">Scrabble Game</h2>
          <ScoreBoard />
          <PlayerRack />
          <GameControls />
          <TileTrack />
        </div>
      </div>
    </div>
  );
};

export default GamePage;