import React, { useState } from 'react';
import { validateWord } from '../services/dictionaryService';
import { calculateWordScore, identifyWords } from '../services/scoringService';
import '../styles/WordValidator.css';

const WordValidator = ({ placedTiles, boardState, specialSquares, onValidationComplete }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [score, setScore] = useState(0);

  // Handle submit button click
  const handleSubmit = async () => {
    if (placedTiles.length === 0) {
      setValidationResult({
        valid: false,
        message: 'No tiles placed on the board.'
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Identify all words formed by the placed tiles
      const words = identifyWords(placedTiles, boardState);
      let totalScore = 0;
      let allWordsValid = true;
      
      // Validate each word and calculate score
      for (const wordTiles of words) {
        // Extract the word as a string
        const word = wordTiles.map(tile => tile.letter).join('');
        
        // Validate the word using the dictionary API
        const isValid = await validateWord(word);
        
        if (!isValid) {
          allWordsValid = false;
          setValidationResult({
            valid: false,
            message: `"${word}" is not a valid word.`
          });
          
          // Notify parent component that validation failed
          if (onValidationComplete) {
            onValidationComplete({
              valid: false,
              message: `"${word}" is not a valid word.`
            });
          }
          
          break;
        }
        
        // Calculate score for this word
        const wordScore = calculateWordScore(wordTiles, boardState, specialSquares);
        totalScore += wordScore;
      }
      
      // If all words are valid, update the score and validation result
      if (allWordsValid) {
        setScore(prevScore => prevScore + totalScore);
        setValidationResult({
          valid: true,
          message: `Valid word! You earned ${totalScore} points.`
        });
        
        // Notify parent component that validation is complete
        if (onValidationComplete) {
          onValidationComplete({
            valid: true,
            score: totalScore,
            words: words.map(wordTiles => wordTiles.map(tile => tile.letter).join(''))
          });
        }
      }
    } catch (error) {
      console.error('Error during word validation:', error);
      setValidationResult({
        valid: false,
        message: 'An error occurred during validation.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="word-validator">
      <button 
        className="submit-word-btn" 
        onClick={handleSubmit}
        disabled={isValidating || placedTiles.length === 0}
      >
        {isValidating ? 'Validating...' : 'Submit Word'}
      </button>
      
      {validationResult && (
        <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
          {validationResult.message}
        </div>
      )}
      
      <div className="score-display">
        Score: {score}
      </div>
    </div>
  );
};

export default WordValidator;