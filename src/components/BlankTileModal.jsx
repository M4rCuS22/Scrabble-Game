import React, { useState } from 'react';
import '../styles/BlankTileModal.css';

const BlankTileModal = ({ onSelect, onCancel }) => {
  const [selectedLetter, setSelectedLetter] = useState('');
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const handleSelect = () => {
    if (selectedLetter) {
      onSelect(selectedLetter);
    }
  };
  
  return (
    <div className="blank-tile-modal-overlay">
      <div className="blank-tile-modal">
        <h3>Select a Letter for Blank Tile</h3>
        
        <div className="letter-grid">
          {letters.map(letter => (
            <button
              key={letter}
              className={`letter-button ${selectedLetter === letter ? 'selected' : ''}`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <div className="modal-actions">
          <button 
            className="confirm-button"
            onClick={handleSelect}
            disabled={!selectedLetter}
          >
            Confirm
          </button>
          <button 
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlankTileModal;