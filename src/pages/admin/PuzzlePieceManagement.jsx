import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagePuzzle from './ManagePuzzle';
import EditPuzzle from './EditPuzzle';

const PuzzlePieceManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagePuzzle/>}/>
      <Route path="/editPuzzle" element={<EditPuzzle/>}/>
    </Routes>
  );
};

export default PuzzlePieceManagement;