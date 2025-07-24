import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TutorialPage.css';

const TutorialPage = () => {
  return (
    <div className="tutorial-container">
      <h2>How to Play Scrabble</h2>
      
      {/* Simple visual guide */}
      <div className="visual-guide">
        <div className="guide-step">
          <div className="step-number">1</div>
          <div className="step-image tile-image"></div>
          <div className="step-text">Get 7 letter tiles</div>
        </div>
        <div className="guide-step">
          <div className="step-number">2</div>
          <div className="step-image drag-image"></div>
          <div className="step-text">Drag tiles to board</div>
        </div>
        <div className="guide-step">
          <div className="step-number">3</div>
          <div className="step-image word-image"></div>
          <div className="step-text">Form words</div>
        </div>
        <div className="guide-step">
          <div className="step-number">4</div>
          <div className="step-image score-image"></div>
          <div className="step-text">Score points</div>
        </div>
      </div>
      
      <div className="tutorial-section">
        <h3>Game Rules</h3>
        <ul className="simple-rules">
          <li>Form words on the board using your letter tiles</li>
          <li>First word must go through the center star</li>
          <li>New words must connect to existing words</li>
          <li>Colored squares give bonus points</li>
          <li>After placing a word, you get new tiles</li>
          <li>Game ends when all tiles are used</li>
        </ul>
      </div>
      
      <div className="tutorial-section">
        <h3>Special Squares</h3>
        <div className="special-squares">
          <div className="special-square tw-square">
            <div className="square-label">TW</div>
            <div className="square-desc">Triple Word Score</div>
          </div>
          <div className="special-square dw-square">
            <div className="square-label">DW</div>
            <div className="square-desc">Double Word Score</div>
          </div>
          <div className="special-square tl-square">
            <div className="square-label">TL</div>
            <div className="square-desc">Triple Letter Score</div>
          </div>
          <div className="special-square dl-square">
            <div className="square-label">DL</div>
            <div className="square-desc">Double Letter Score</div>
          </div>
        </div>
      </div>
      
      <Link to="/play" className="start-game-button">Start Playing</Link>
    </div>
  );
};

export default TutorialPage;