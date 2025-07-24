import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider, useGameContext } from './context/GameContext';
import TutorialPage from './pages/TutorialPage';
import GamePage from './pages/GamePage';
import BlankTileModal from './components/BlankTileModal';
import './styles/App.css';

// Wrapper component to use context
const AppContent = () => {
  const { state, setBlankTileLetter, hideBlankTileModal } = useGameContext();
  
  return (
    <div className="scrabble-app">
      <header className="app-header">
        <h1 className="app-title">Scrabble Game</h1>
      </header>
      
      <Routes>
        <Route path="/" element={<TutorialPage />} />
        <Route path="/play" element={<GamePage />} />
      </Routes>
      
      {state.blankTileModal.show && (
        <BlankTileModal 
          onSelect={setBlankTileLetter}
          onCancel={hideBlankTileModal}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;