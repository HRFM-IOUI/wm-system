import React from 'react';
import GachaStageRenderer from './GachaStageRenderer';
import GachaResultModal from './GachaResultModal';

const GachaVisualStage = ({ isAnimating, results, onClose, username, onComplete }) => {
  return (
    <>
      {isAnimating && (
        <GachaStageRenderer
          username={username}
          onComplete={onComplete}
        />
      )}
      {results.length > 0 && (
        <GachaResultModal results={results} onClose={onClose} />
      )}
    </>
  );
};

export default GachaVisualStage;
