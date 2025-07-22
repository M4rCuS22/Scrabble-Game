import React from 'react';
import tileDistribution from '../data/tileDistribution';
import '../styles/TileTrack.css';

const TileTrack = () => {
  return (
    <div className="tile-track-container">
      <h2>Scrabble Tile Track</h2>
      <div className="tile-track-grid">
        {tileDistribution.map((tile, idx) => (
          <div className="tile" key={idx}>
            <span className="letter">{tile.letter}</span>
            <span className="count">x{tile.count}</span>
            <span className="points">{tile.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TileTrack;