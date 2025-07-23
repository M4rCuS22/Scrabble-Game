// Scoring service for calculating points in Scrabble

/**
 * Calculate the score for a word based on letter values and board multipliers
 * @param {Array} placedTiles - Array of placed tiles with their positions and values
 * @param {Object} boardState - Current state of the board with existing tiles
 * @param {Object} specialSquares - Special squares on the board (DW, TW, DL, TL)
 * @returns {number} - Total score for the word
 */
const calculateWordScore = (placedTiles, boardState, specialSquares) => {
  let wordScore = 0;
  let wordMultiplier = 1;
  
  // First pass: Calculate base letter scores and collect multipliers
  placedTiles.forEach(tile => {
    const { row, col, letter, points } = tile;
    const key = `${row},${col}`;
    let letterScore = parseInt(points);
    let letterMultiplier = 1;
    
    // Check if the tile is on a special square
    if (specialSquares[key]) {
      const special = specialSquares[key];
      
      if (special.type === 'dl') {
        letterMultiplier = 2;
      } else if (special.type === 'tl') {
        letterMultiplier = 3;
      } else if (special.type === 'dw') {
        wordMultiplier *= 2;
      } else if (special.type === 'tw') {
        wordMultiplier *= 3;
      }
    }
    
    // Add the letter score with any letter multipliers
    wordScore += letterScore * letterMultiplier;
  });
  
  // Apply word multipliers
  wordScore *= wordMultiplier;
  
  // Bonus for using all 7 tiles (50 points)
  if (placedTiles.length === 7) {
    wordScore += 50;
  }
  
  return wordScore;
};

/**
 * Identify all words formed by the newly placed tiles
 * @param {Array} placedTiles - Array of newly placed tiles
 * @param {Object} boardState - Current state of the board with existing tiles
 * @returns {Array} - Array of words formed (each word is an array of tile objects)
 */
const identifyWords = (placedTiles, boardState) => {
  // This is a simplified implementation
  // In a real game, you would need to check both horizontally and vertically
  // and handle cases where multiple words are formed
  
  // For now, we'll assume all placed tiles form a single word
  return [placedTiles];
};

export { calculateWordScore, identifyWords };