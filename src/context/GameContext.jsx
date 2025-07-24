import React, { createContext, useContext, useReducer } from "react";
import tileDistribution from "../data/tileDistibution";

// Special squares configuration
export const specialSquares = {
  // Triple Word Score
  "0,0": { type: "tw", label: "TW" },
  "0,7": { type: "tw", label: "TW" },
  "0,14": { type: "tw", label: "TW" },
  "7,0": { type: "tw", label: "TW" },
  "7,14": { type: "tw", label: "TW" },
  "14,0": { type: "tw", label: "TW" },
  "14,7": { type: "tw", label: "TW" },
  "14,14": { type: "tw", label: "TW" },

  // Double Word Score
  "1,1": { type: "dw", label: "DW" },
  "2,2": { type: "dw", label: "DW" },
  "3,3": { type: "dw", label: "DW" },
  "4,4": { type: "dw", label: "DW" },
  "10,10": { type: "dw", label: "DW" },
  "11,11": { type: "dw", label: "DW" },
  "12,12": { type: "dw", label: "DW" },
  "13,13": { type: "dw", label: "DW" },
  "1,13": { type: "dw", label: "DW" },
  "2,12": { type: "dw", label: "DW" },
  "3,11": { type: "dw", label: "DW" },
  "4,10": { type: "dw", label: "DW" },
  "10,4": { type: "dw", label: "DW" },
  "11,3": { type: "dw", label: "DW" },
  "12,2": { type: "dw", label: "DW" },
  "13,1": { type: "dw", label: "DW" },

  // Triple Letter Score
  "1,5": { type: "tl", label: "TL" },
  "1,9": { type: "tl", label: "TL" },
  "5,1": { type: "tl", label: "TL" },
  "5,5": { type: "tl", label: "TL" },
  "5,9": { type: "tl", label: "TL" },
  "5,13": { type: "tl", label: "TL" },
  "9,1": { type: "tl", label: "TL" },
  "9,5": { type: "tl", label: "TL" },
  "9,9": { type: "tl", label: "TL" },
  "9,13": { type: "tl", label: "TL" },
  "13,5": { type: "tl", label: "TL" },
  "13,9": { type: "tl", label: "TL" },

  // Double Letter Score
  "0,3": { type: "dl", label: "DL" },
  "0,11": { type: "dl", label: "DL" },
  "2,6": { type: "dl", label: "DL" },
  "2,8": { type: "dl", label: "DL" },
  "3,0": { type: "dl", label: "DL" },
  "3,7": { type: "dl", label: "DL" },
  "3,14": { type: "dl", label: "DL" },
  "6,2": { type: "dl", label: "DL" },
  "6,6": { type: "dl", label: "DL" },
  "6,8": { type: "dl", label: "DL" },
  "6,12": { type: "dl", label: "DL" },
  "7,3": { type: "dl", label: "DL" },
  "7,11": { type: "dl", label: "DL" },
  "8,2": { type: "dl", label: "DL" },
  "8,6": { type: "dl", label: "DL" },
  "8,8": { type: "dl", label: "DL" },
  "8,12": { type: "dl", label: "DL" },
  "11,0": { type: "dl", label: "DL" },
  "11,7": { type: "dl", label: "DL" },
  "11,14": { type: "dl", label: "DL" },
  "12,6": { type: "dl", label: "DL" },
  "12,8": { type: "dl", label: "DL" },
  "14,3": { type: "dl", label: "DL" },
  "14,11": { type: "dl", label: "DL" },

  // Center square (star)
  "7,7": { type: "star", label: "★" },
};

// Create the context
const GameContext = createContext();

// Define action types
const PLACE_TILE = "PLACE_TILE";
const REMOVE_TILE_FROM_RACK = "REMOVE_TILE_FROM_RACK";
const DRAW_TILES = "DRAW_TILES";
const SUBMIT_WORD = "SUBMIT_WORD";
const NEXT_TURN = "NEXT_TURN";
const RESET_GAME = "RESET_GAME";
const SET_ERROR = "SET_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";
const SHOW_BLANK_MODAL = "SHOW_BLANK_MODAL";
const HIDE_BLANK_MODAL = "HIDE_BLANK_MODAL";
const SET_BLANK_TILE_LETTER = "SET_BLANK_TILE_LETTER";
const SHUFFLE_RACK = "SHUFFLE_RACK";
const RECALL_TILES = "RECALL_TILES";

// Game reducer function
function gameReducer(state, action) {
  switch (action.type) {
    case PLACE_TILE: {
      const { position, tile, rackIndex } = action.payload;
      return {
        ...state,
        boardTiles: {
          ...state.boardTiles,
          [position]: { ...tile, fromRack: rackIndex },
        },
        currentMove: [...state.currentMove, { position, tile }],
      };
    }

    case REMOVE_TILE_FROM_RACK: {
      const { playerIndex, tileIndex } = action.payload;
      const newPlayerRacks = [...state.playerRacks];
      newPlayerRacks[playerIndex] = newPlayerRacks[playerIndex].filter(
        (_, idx) => idx !== tileIndex
      );
      return {
        ...state,
        playerRacks: newPlayerRacks,
      };
    }

    case DRAW_TILES: {
      const { player, count } = action.payload;
      const newTiles = drawRandomTiles(count, state.remainingTiles);
      const updatedPlayerRacks = [...state.playerRacks];
      updatedPlayerRacks[player] = [
        ...updatedPlayerRacks[player],
        ...newTiles.tiles,
      ];

      return {
        ...state,
        playerRacks: updatedPlayerRacks,
        remainingTiles: newTiles.remaining,
      };
    }

    case SUBMIT_WORD: {
      const { score } = action.payload;
      const newScores = [...state.scores];
      newScores[state.currentPlayer] += score;

      return {
        ...state,
        scores: newScores,
        currentMove: [],
      };
    }

    case NEXT_TURN:
      return {
        ...state,
        currentPlayer: (state.currentPlayer + 1) % state.playerCount,
      };

    case RESET_GAME:
      return initializeGame(state.playerCount);

    case SET_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case SHOW_BLANK_MODAL:
      return {
        ...state,
        blankTileModal: {
          show: true,
          position: action.payload.position,
          rackIndex: action.payload.rackIndex,
        },
      };

    case HIDE_BLANK_MODAL:
      return {
        ...state,
        blankTileModal: {
          show: false,
          position: null,
          rackIndex: null,
        },
      };

    case SET_BLANK_TILE_LETTER:
      return {
        ...state,
        boardTiles: {
          ...state.boardTiles,
          [state.blankTileModal.position]: {
            letter: action.payload.letter,
            points: 0,
            isBlank: true,
            fromRack: state.blankTileModal.rackIndex,
          },
        },
        currentMove: [
          ...state.currentMove,
          {
            position: state.blankTileModal.position,
            tile: { letter: action.payload.letter, points: 0, isBlank: true },
          },
        ],
        blankTileModal: {
          show: false,
          position: null,
          rackIndex: null,
        },
      };

    case SHUFFLE_RACK: {
      // Use a different variable name to avoid conflict
      const currentPlayerIndex = action.payload.playerIndex;
      const shuffledRack = [...state.playerRacks[currentPlayerIndex]];

      // Simple shuffle
      for (let i = shuffledRack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledRack[i];
        shuffledRack[i] = shuffledRack[j];
        shuffledRack[j] = temp;
      }

      const newRacks = [...state.playerRacks];
      newRacks[currentPlayerIndex] = shuffledRack;

      return {
        ...state,
        playerRacks: newRacks,
      };
    }

    case RECALL_TILES: {
      // Get the current player's index
      const playerIndex = state.currentPlayer;

      // Get tiles from current move
      const tilesToReturn = state.currentMove.map((move) => move.tile);

      // Add tiles back to player's rack
      const updatedRack = [...state.playerRacks[playerIndex], ...tilesToReturn];
      const newPlayerRacks = [...state.playerRacks];
      newPlayerRacks[playerIndex] = updatedRack;

      // Remove tiles from board
      const newBoardTiles = { ...state.boardTiles };
      state.currentMove.forEach((move) => {
        delete newBoardTiles[move.position];
      });

      return {
        ...state,
        boardTiles: newBoardTiles,
        playerRacks: newPlayerRacks,
        currentMove: [],
        error: null,
      };
    }

    default:
      return state;
  }
}

// Helper function to draw random tiles
function drawRandomTiles(count, remainingTiles) {
  // Create a copy of the remaining tiles
  const tilePool = [...remainingTiles];
  const drawnTiles = [];

  // Draw random tiles
  for (let i = 0; i < count && tilePool.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * tilePool.length);
    drawnTiles.push(tilePool[randomIndex]);
    tilePool.splice(randomIndex, 1);
  }

  return {
    tiles: drawnTiles,
    remaining: tilePool,
  };
}

// Initialize the game state
function initializeGame(playerCount = 2) {
  // Create a pool of all available tiles based on their counts
  const tilePool = [];
  tileDistribution.forEach((tile) => {
    for (let i = 0; i < tile.count; i++) {
      tilePool.push({ ...tile });
    }
  });

  // Initialize player racks
  const playerRacks = [];
  for (let i = 0; i < playerCount; i++) {
    const result = drawRandomTiles(7, tilePool);
    playerRacks.push(result.tiles);
    tilePool.length = 0;
    tilePool.push(...result.remaining);
  }

  return {
    boardTiles: {},
    playerRacks,
    scores: Array(playerCount).fill(0),
    currentPlayer: 0,
    playerCount,
    remainingTiles: tilePool,
    currentMove: [],
    gameOver: false,
    error: null,
    blankTileModal: {
      show: false,
      position: null,
      rackIndex: null,
    },
  };
}

// Create the provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, 2, initializeGame);

  // Game actions
  const placeTile = (position, tile, rackIndex) => {
    // Check if this is a blank tile
    if (tile.letter === "Blank") {
      dispatch({
        type: SHOW_BLANK_MODAL,
        payload: { position, rackIndex },
      });

      // Remove the blank tile from rack
      dispatch({
        type: REMOVE_TILE_FROM_RACK,
        payload: { playerIndex: state.currentPlayer, tileIndex: rackIndex },
      });

      return;
    }

    // Regular tile placement
    dispatch({
      type: PLACE_TILE,
      payload: { position, tile, rackIndex },
    });

    dispatch({
      type: REMOVE_TILE_FROM_RACK,
      payload: { playerIndex: state.currentPlayer, tileIndex: rackIndex },
    });
  };

  // Find all words formed by the current move
  const findAllWords = () => {
    if (state.currentMove.length === 0) return [];

    const words = [];
    const boardTiles = state.boardTiles;

    // Check if all tiles are in a single row or column
    const positions = state.currentMove.map((move) => {
      const [row, col] = move.position.split(",").map(Number);
      return { row, col, position: move.position };
    });

    // Sort by row, then by column
    positions.sort((a, b) => (a.row === b.row ? a.col - b.col : a.row - b.row));

    // Check if all tiles are in the same row
    const sameRow = positions.every((pos) => pos.row === positions[0].row);

    // Sort by column, then by row for vertical word check
    positions.sort((a, b) => (a.col === b.col ? a.row - b.row : a.col - b.col));

    // Check if all tiles are in the same column
    const sameCol = positions.every((pos) => pos.col === positions[0].col);

    if (!sameRow && !sameCol) {
      return [{ word: "", positions: [] }]; // Invalid placement
    }

    // Find the main word (horizontal or vertical)
    if (sameRow) {
      // Find the horizontal word
      const row = positions[0].row;
      let minCol = positions[0].col;
      let maxCol = positions[positions.length - 1].col;

      // Extend left
      while (minCol > 0 && boardTiles[`${row},${minCol - 1}`]) {
        minCol--;
      }

      // Extend right
      while (maxCol < 14 && boardTiles[`${row},${maxCol + 1}`]) {
        maxCol++;
      }

      // Build the word
      let word = "";
      const wordPositions = [];
      for (let col = minCol; col <= maxCol; col++) {
        const position = `${row},${col}`;
        const tile = boardTiles[position];
        if (tile) {
          word += tile.letter;
          wordPositions.push(position);
        } else {
          // Gap in the word
          return [{ word: "", positions: [] }];
        }
      }

      if (word.length > 1) {
        words.push({ word, positions: wordPositions });
      }

      // Find vertical words formed by each tile in the current move
      for (const movePos of state.currentMove) {
        const [moveRow, moveCol] = movePos.position.split(",").map(Number);
        let minRow = moveRow;
        let maxRow = moveRow;

        // Extend up
        while (minRow > 0 && boardTiles[`${minRow - 1},${moveCol}`]) {
          minRow--;
        }

        // Extend down
        while (maxRow < 14 && boardTiles[`${maxRow + 1},${moveCol}`]) {
          maxRow++;
        }

        // If there are tiles above or below, we have a vertical word
        if (minRow < moveRow || maxRow > moveRow) {
          let vertWord = "";
          const vertPositions = [];
          for (let r = minRow; r <= maxRow; r++) {
            const position = `${r},${moveCol}`;
            const tile = boardTiles[position];
            if (tile) {
              vertWord += tile.letter;
              vertPositions.push(position);
            } else {
              // Gap in the word
              vertWord = "";
              break;
            }
          }

          if (vertWord.length > 1) {
            words.push({ word: vertWord, positions: vertPositions });
          }
        }
      }
    } else if (sameCol) {
      // Find the vertical word
      const col = positions[0].col;
      let minRow = positions[0].row;
      let maxRow = positions[positions.length - 1].row;

      // Extend up
      while (minRow > 0 && boardTiles[`${minRow - 1},${col}`]) {
        minRow--;
      }

      // Extend down
      while (maxRow < 14 && boardTiles[`${maxRow + 1},${col}`]) {
        maxRow++;
      }

      // Build the word
      let word = "";
      const wordPositions = [];
      for (let row = minRow; row <= maxRow; row++) {
        const position = `${row},${col}`;
        const tile = boardTiles[position];
        if (tile) {
          word += tile.letter;
          wordPositions.push(position);
        } else {
          // Gap in the word
          return [{ word: "", positions: [] }];
        }
      }

      if (word.length > 1) {
        words.push({ word, positions: wordPositions });
      }

      // Find horizontal words formed by each tile in the current move
      for (const movePos of state.currentMove) {
        const [moveRow, moveCol] = movePos.position.split(",").map(Number);
        let minCol = moveCol;
        let maxCol = moveCol;

        // Extend left
        while (minCol > 0 && boardTiles[`${moveRow},${minCol - 1}`]) {
          minCol--;
        }

        // Extend right
        while (maxCol < 14 && boardTiles[`${moveRow},${maxCol + 1}`]) {
          maxCol++;
        }

        // If there are tiles to the left or right, we have a horizontal word
        if (minCol < moveCol || maxCol > moveCol) {
          let horzWord = "";
          const horzPositions = [];
          for (let c = minCol; c <= maxCol; c++) {
            const position = `${moveRow},${c}`;
            const tile = boardTiles[position];
            if (tile) {
              horzWord += tile.letter;
              horzPositions.push(position);
            } else {
              // Gap in the word
              horzWord = "";
              break;
            }
          }

          if (horzWord.length > 1) {
            words.push({ word: horzWord, positions: horzPositions });
          }
        }
      }
    }

    return words;
  };

  // Validate all words formed using the Free Dictionary API
  const validateWords = async () => {
    const words = findAllWords();

    if (words.length === 0 || (words.length === 1 && words[0].word === "")) {
      dispatch({
        type: SET_ERROR,
        payload: {
          message: "Invalid tile placement. Tiles must form a continuous word.",
        },
      });
      return false;
    }

    // Check if this is the first move
    const isFirstMove =
      Object.keys(state.boardTiles).length === state.currentMove.length;

    // If it's the first move, check if it covers the center square
    if (isFirstMove) {
      // Check if any of the current move tiles are on the center square
      const centerCovered = state.currentMove.some(
        (move) => move.position === "7,7"
      );

      // If not on center, show error
      if (!centerCovered) {
        dispatch({
          type: SET_ERROR,
          payload: { message: "First word must cover the center square (★)" },
        });
        return false;
      }
    } else {
      // If not the first move, check if it connects to existing tiles
      const connectsToExisting = state.currentMove.some((move) => {
        const [row, col] = move.position.split(",").map(Number);
        return [
          `${row - 1},${col}`,
          `${row + 1},${col}`,
          `${row},${col - 1}`,
          `${row},${col + 1}`,
        ].some((pos) => {
          const tile = state.boardTiles[pos];
          return tile && !state.currentMove.some((m) => m.position === pos);
        });
      });

      if (!connectsToExisting) {
        dispatch({
          type: SET_ERROR,
          payload: { message: "New words must connect to existing tiles" },
        });
        return false;
      }
    }

    // Validate each word
    for (const { word, positions } of words) {
      if (word.length < 2) continue;

      try {
        // This is a simple API that returns 200 if the word exists
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        );

        if (!response.ok) {
          dispatch({
            type: SET_ERROR,
            payload: { message: `"${word}" is not a valid word` },
          });
          return false;
        }
      } catch (error) {
        console.error("Error validating word:", error);
        dispatch({
          type: SET_ERROR,
          payload: { message: "Error checking word. Please try again." },
        });
        return false;
      }
    }

    // All words are valid
    dispatch({ type: CLEAR_ERROR });
    return true;
  };

  // Calculate score for the current word
  const calculateScore = () => {
    if (state.currentMove.length === 0) return 0;

    let score = 0;
    let wordMultiplier = 1;

    state.currentMove.forEach(({ position, tile }) => {
      const [row, col] = position.split(",").map(Number);
      const key = `${row},${col}`;
      const specialSquare = specialSquares[key] || { type: "regular" };

      let letterScore = tile.points;

      // Apply letter multipliers
      if (specialSquare.type === "dl") letterScore *= 2;
      if (specialSquare.type === "tl") letterScore *= 3;

      // Add to total score
      score += letterScore;

      // Track word multipliers
      if (specialSquare.type === "dw") wordMultiplier *= 2;
      if (specialSquare.type === "tw") wordMultiplier *= 3;
    });

    // Apply word multipliers
    score *= wordMultiplier;

    // Bonus for using all 7 tiles
    if (state.currentMove.length === 7) score += 50;

    return score;
  };

  const submitWord = async (skipValidation = false) => {
    let score = 0;

    // If not skipping validation, validate words and calculate score
    if (!skipValidation) {
      // First validate all words formed
      const isValid = await validateWords();
      if (!isValid) return;

      // Calculate score
      score = calculateScore();
    }

    // Submit the word
    dispatch({
      type: SUBMIT_WORD,
      payload: { score },
    });

    // Draw new tiles to replace used ones
    const tilesNeeded = 7 - state.playerRacks[state.currentPlayer].length;
    if (tilesNeeded > 0) {
      dispatch({
        type: DRAW_TILES,
        payload: { player: state.currentPlayer, count: tilesNeeded },
      });
    }

    // Move to next player
    dispatch({ type: NEXT_TURN });
  };

  const resetGame = () => {
    dispatch({ type: RESET_GAME });
  };

  // Add a function to clear errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  // Handle blank tile letter selection
  const setBlankTileLetter = (letter) => {
    dispatch({
      type: SET_BLANK_TILE_LETTER,
      payload: { letter },
    });
  };

  // Hide blank tile modal
  const hideBlankTileModal = () => {
    dispatch({ type: HIDE_BLANK_MODAL });
  };

  // Shuffle the current player's rack
  const shuffleRack = () => {
    dispatch({
      type: SHUFFLE_RACK,
      payload: { playerIndex: state.currentPlayer },
    });
  };

  // Recall tiles from the current move
  const recallTiles = () => {
    dispatch({ type: RECALL_TILES });
  };

  // Expose the context value
  const contextValue = {
    state,
    placeTile,
    submitWord,
    resetGame,
    clearError,
    setBlankTileLetter,
    hideBlankTileModal,
    shuffleRack,
    recallTiles,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
